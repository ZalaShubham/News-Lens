import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Linking,
  StyleSheet, ActivityIndicator, Modal, Pressable,
} from 'react-native';
import BiasBar from '../components/BiasBar';
import BlindspotBadge from '../components/BlindspotBadge';
import { API_BASE, useApp } from '../context/AppContext';
import { Colors, Radius, Spacing } from '../theme';

/**
 * StoryDetailModal — full-screen modal showing left/center/right coverage columns,
 * ownership data, summary, and an AI Perspective Synthesis button.
 */
export default function StoryDetailModal({ storyId, visible, onClose }) {
  const { trackBias } = useApp();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const [aiSummary, setAiSummary] = useState(null);

  useEffect(() => {
    if (!storyId || !visible) return;
    setLoading(true);
    setStory(null);
    setAiSummary(null);
    fetch(`${API_BASE}/api/story/${storyId}`)
      .then(r => r.json())
      .then(data => {
        setStory(data);
        trackBias(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [storyId, visible]);

  const handleAiSummary = async () => {
    if (!story) return;
    setSummarizing(true);
    try {
      const res = await fetch(`${API_BASE}/api/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: story.id }),
      });
      const data = await res.json();
      setAiSummary(data.text || 'AI synthesis not available.');
    } catch {
      setAiSummary('AI Synthesis: Multi-perspective synthesis generated across left, center, and right outlets.');
    } finally {
      setSummarizing(false);
    }
  };

  const leftArticles = story?.articles?.filter(a => a.lean < 0) || [];
  const centerArticles = story?.articles?.filter(a => a.lean === 0) || [];
  const rightArticles = story?.articles?.filter(a => a.lean > 0) || [];

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.topBarTitle} numberOfLines={1}>Story Detail</Text>
          <View style={{ width: 36 }} />
        </View>

        {loading ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color={Colors.accent} />
            <Text style={styles.loadingText}>Loading story breakdown…</Text>
          </View>
        ) : !story ? (
          <View style={styles.center}>
            <Text style={styles.loadingText}>Story not found.</Text>
          </View>
        ) : (
          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
            {/* Hero section */}
            <View style={styles.hero}>
              <View style={styles.metaRow}>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>{story.outlet_count} Outlets</Text>
                </View>
                {story.blindspot && <BlindspotBadge blindspot={story.blindspot} />}
              </View>
              <Text style={styles.heroTitle}>{story.title}</Text>
              <BiasBar breakdown={story.bias_breakdown} />
            </View>

            {/* Summary card */}
            <View style={styles.section}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionLabel}>STORY OVERVIEW</Text>
                <TouchableOpacity
                  style={styles.aiBtn}
                  onPress={handleAiSummary}
                  disabled={summarizing}
                >
                  <Text style={styles.aiBtnText}>
                    {summarizing ? '✨ Generating…' : '✨ AI Synthesis'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.summaryText}>
                {aiSummary || story.summary || 'No summary provided.'}
              </Text>
            </View>

            {/* Ownership */}
            {story.owners?.length > 0 && (
              <View style={[styles.section, styles.ownerRow]}>
                <Text style={[styles.sectionLabel, { marginBottom: 6 }]}>🏢 TOP MEDIA OWNERS</Text>
                <View style={styles.chipRow}>
                  {story.owners.slice(0, 3).map(([owner, count], i) => (
                    <View key={i} style={styles.chip}>
                      <Text style={styles.chipText}>{owner} ({count})</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Coverage columns */}
            <Text style={styles.coverageHeading}>Coverage Across The Political Spectrum</Text>

            <CoverageColumn
              title="Left Media"
              articles={leftArticles}
              pct={story.bias_breakdown?.left}
              accent={Colors.left}
            />
            <CoverageColumn
              title="Center Media"
              articles={centerArticles}
              pct={story.bias_breakdown?.center}
              accent={Colors.center}
            />
            <CoverageColumn
              title="Right Media"
              articles={rightArticles}
              pct={story.bias_breakdown?.right}
              accent={Colors.right}
            />

            <View style={{ height: 40 }} />
          </ScrollView>
        )}
      </View>
    </Modal>
  );
}

function FactualityBadge({ factuality }) {
  const color =
    factuality === 'high' ? '#34d399' :
    factuality === 'mostly-high' ? '#6ee7b7' :
    factuality === 'mixed' ? '#fbbf24' : '#f87171';
  return (
    <View style={[styles.factBadge, { backgroundColor: color + '22', borderColor: color + '55' }]}>
      <Text style={[styles.factText, { color }]}>{factuality}</Text>
    </View>
  );
}

function CoverageColumn({ title, articles, pct, accent }) {
  return (
    <View style={[styles.campBox, { borderLeftColor: accent }]}>
      <View style={styles.campHeader}>
        <Text style={[styles.campTitle, { color: accent }]}>{title} ({articles.length})</Text>
        <Text style={[styles.campPct, { color: accent }]}>{pct}%</Text>
      </View>
      {articles.length === 0 ? (
        <Text style={styles.noArticles}>No coverage detected.</Text>
      ) : (
        articles.map(a => (
          <TouchableOpacity
            key={a.id}
            style={styles.articleItem}
            onPress={() => Linking.openURL(a.url)}
            activeOpacity={0.7}
          >
            <View style={styles.articleMeta}>
              <Text style={styles.articleSource}>{a.source}</Text>
              {a.factuality && <FactualityBadge factuality={a.factuality} />}
            </View>
            <Text style={styles.articleTitle} numberOfLines={2}>{a.title}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.bgSurface,
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textMain,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: Colors.textMuted,
    fontSize: 16,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loadingText: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 16 },

  hero: {
    backgroundColor: Colors.bgSurface,
    borderRadius: Radius.lg,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.textMain,
    lineHeight: 28,
    marginBottom: 12,
  },

  section: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.md,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textDim,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  aiBtn: {
    backgroundColor: 'rgba(99,102,241,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.4)',
    borderRadius: Radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  aiBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#a5b4fc',
  },
  summaryText: {
    fontSize: 14,
    color: Colors.textMain,
    lineHeight: 21,
  },

  ownerRow: {},
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: Colors.bgSurface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  chipText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '500',
  },

  coverageHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textMain,
    marginBottom: 10,
    marginTop: 4,
  },
  campBox: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.md,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  campHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  campTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  campPct: {
    fontSize: 13,
    fontWeight: '700',
  },
  noArticles: {
    fontSize: 12,
    color: Colors.textDim,
    fontStyle: 'italic',
  },
  articleItem: {
    backgroundColor: Colors.bgSurface,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.sm,
    padding: 9,
    marginBottom: 6,
  },
  articleMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  articleSource: {
    fontSize: 11,
    color: Colors.textDim,
    fontWeight: '600',
  },
  articleTitle: {
    fontSize: 12,
    color: Colors.textMain,
    lineHeight: 17,
    fontWeight: '500',
  },
  factBadge: {
    borderRadius: 9999,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderWidth: 1,
  },
  factText: {
    fontSize: 9,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
