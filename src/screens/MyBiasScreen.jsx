import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import StoryDetailModal from '../components/StoryDetailModal';
import { useApp } from '../context/AppContext';
import { Colors, Radius } from '../theme';

const LEAN_COLORS = {
  left: '#3b82f6',
  lean_left: '#93c5fd',
  center: '#a1a1aa',
  lean_right: '#fca5a5',
  right: '#ef4444',
};

export default function MyBiasScreen() {
  const { readHistory, clearHistory } = useApp();
  const [selectedStoryId, setSelectedStoryId] = useState(null);

  // Compute stats
  const total = readHistory.length;
  const counts = { left: 0, center: 0, right: 0 };
  readHistory.forEach(s => {
    const b = s.bias_breakdown || {};
    counts.left += b.left || 0;
    counts.center += b.center || 0;
    counts.right += b.right || 0;
  });
  const sum = counts.left + counts.center + counts.right || 1;
  const pLeft = Math.round((counts.left / sum) * 100);
  const pCenter = Math.round((counts.center / sum) * 100);
  const pRight = Math.round((counts.right / sum) * 100);

  const handleClear = () => {
    Alert.alert('Clear History', 'Are you sure you want to clear your reading history?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: clearHistory },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Bias summary card */}
      <View style={styles.biasCard}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>📊 My Reading Bias</Text>
          {total > 0 && (
            <TouchableOpacity onPress={handleClear} style={styles.clearBtn}>
              <Text style={styles.clearBtnText}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>
        {total === 0 ? (
          <Text style={styles.emptyBias}>
            Start reading stories to track your bias profile.
          </Text>
        ) : (
          <>
            <Text style={styles.biasCaption}>{total} stories read</Text>
            <View style={styles.biasBarTrack}>
              {pLeft > 0 && (
                <View style={[styles.biasSegment, { flex: pLeft, backgroundColor: Colors.left }]} />
              )}
              {pCenter > 0 && (
                <View style={[styles.biasSegment, { flex: pCenter, backgroundColor: Colors.center }]} />
              )}
              {pRight > 0 && (
                <View style={[styles.biasSegment, { flex: pRight, backgroundColor: Colors.right }]} />
              )}
            </View>
            <View style={styles.legendRow}>
              <LegendItem color={Colors.left} label={`${pLeft}% Left`} />
              <LegendItem color={Colors.center} label={`${pCenter}% Center`} />
              <LegendItem color={Colors.right} label={`${pRight}% Right`} />
            </View>
          </>
        )}
      </View>

      {/* Reading history list */}
      {readHistory.length === 0 ? (
        <View style={styles.center}>
          <Text style={{ fontSize: 48 }}>📰</Text>
          <Text style={styles.emptyText}>No reading history yet.</Text>
          <Text style={styles.emptySubText}>Open any story to start tracking.</Text>
        </View>
      ) : (
        <FlatList
          data={readHistory}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.historyItem}
              onPress={() => setSelectedStoryId(item.id)}
              activeOpacity={0.75}
            >
              <View style={styles.historyMeta}>
                <DominantLeanBadge breakdown={item.bias_breakdown} />
                <Text style={styles.historyOutlets}>{item.outlet_count} outlets</Text>
              </View>
              <Text style={styles.historyTitle} numberOfLines={2}>{item.title}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
      )}

      <StoryDetailModal
        storyId={selectedStoryId}
        visible={!!selectedStoryId}
        onClose={() => setSelectedStoryId(null)}
      />
    </View>
  );
}

function DominantLeanBadge({ breakdown }) {
  const { left = 0, center = 0, right = 0 } = breakdown || {};
  let label = 'Center';
  let slug = 'center';
  if (left >= center && left >= right) { label = 'Left'; slug = 'left'; }
  else if (right >= center && right >= left) { label = 'Right'; slug = 'right'; }
  const color = LEAN_COLORS[slug];
  return (
    <View style={[styles.badge, { backgroundColor: color + '22', borderColor: color + '55' }]}>
      <Text style={[styles.badgeText, { color }]}>{label}</Text>
    </View>
  );
}

function LegendItem({ color, label }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  biasCard: {
    backgroundColor: Colors.bgSurface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: 16,
    margin: 12,
    marginBottom: 0,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textMain,
  },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.3)',
  },
  clearBtnText: {
    fontSize: 12,
    color: '#f87171',
    fontWeight: '600',
  },
  emptyBias: {
    color: Colors.textDim,
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 10,
  },
  biasCaption: {
    fontSize: 12,
    color: Colors.textDim,
    marginBottom: 8,
  },
  biasBarTrack: {
    height: 10,
    backgroundColor: '#1e293b',
    borderRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 8,
  },
  biasSegment: { height: 10 },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    color: Colors.textDim,
  },
  list: { padding: 12, paddingTop: 12 },
  historyItem: {
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.md,
    padding: 12,
    marginBottom: 8,
  },
  historyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  badge: {
    borderRadius: 9999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  historyOutlets: {
    fontSize: 11,
    color: Colors.textDim,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMain,
    lineHeight: 20,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingBottom: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textMain,
  },
  emptySubText: {
    fontSize: 13,
    color: Colors.textDim,
  },
});
