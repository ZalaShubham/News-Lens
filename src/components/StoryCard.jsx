import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Animated
} from 'react-native';
import BiasBar from './BiasBar';
import BlindspotBadge from './BlindspotBadge';
import { Colors, Radius, Spacing } from '../theme';

/**
 * StoryCard — tappable card shown in the stories list.
 * Mirrors the web app's .story-card component.
 */
export default function StoryCard({ story, onPress }) {
  const {
    title,
    summary,
    outlet_count,
    blindspot,
    bias_breakdown,
    framing = [],
    owners = [],
  } = story;

  const topOwner = owners[0]?.[0];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(story)}
      activeOpacity={0.75}
    >
      {/* Meta badges row */}
      <View style={styles.badgeRow}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>📰 {outlet_count} outlets</Text>
        </View>
        {blindspot && <BlindspotBadge blindspot={blindspot} />}
        {topOwner && (
          <View style={styles.chip}>
            <Text style={styles.chipText} numberOfLines={1}>
              🏢 {topOwner.length > 20 ? topOwner.slice(0, 18) + '…' : topOwner}
            </Text>
          </View>
        )}
      </View>

      {/* Title */}
      <Text style={styles.title} numberOfLines={3}>{title}</Text>

      {/* Summary */}
      {summary ? (
        <Text style={styles.summary} numberOfLines={3}>{summary}</Text>
      ) : null}

      {/* Framing previews (left vs right headlines) */}
      {framing.length > 0 && (
        <View style={styles.framingContainer}>
          {framing.slice(0, 2).map((f, i) => (
            <View
              key={i}
              style={[
                styles.framingRow,
                f.lean_slug === 'left' ? styles.framingLeft
                  : f.lean_slug === 'right' ? styles.framingRight
                  : styles.framingCenter,
              ]}
            >
              <Text style={styles.framingSource} numberOfLines={1}>
                {f.source || f.article?.source}:
              </Text>
              <Text style={styles.framingHeadline} numberOfLines={1}>
                {' '}{f.title || f.article?.title}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Bias bar */}
      <BiasBar breakdown={bias_breakdown} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
    alignItems: 'center',
  },
  chip: {
    backgroundColor: Colors.bgSurface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  chipText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textMain,
    lineHeight: 22,
    marginBottom: 8,
  },
  summary: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 19,
    marginBottom: 12,
  },
  framingContainer: {
    marginBottom: 10,
    gap: 5,
  },
  framingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgSurface,
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderLeftWidth: 3,
    borderLeftColor: Colors.center,
  },
  framingLeft: { borderLeftColor: Colors.left },
  framingCenter: { borderLeftColor: Colors.center },
  framingRight: { borderLeftColor: Colors.right },
  framingSource: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMain,
  },
  framingHeadline: {
    fontSize: 11,
    color: Colors.textMuted,
    flexShrink: 1,
  },
});
