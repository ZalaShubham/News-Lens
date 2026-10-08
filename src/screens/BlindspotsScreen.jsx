import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity,
} from 'react-native';
import StoryCard from '../components/StoryCard';
import StoryDetailModal from '../components/StoryDetailModal';
import { useApp } from '../context/AppContext';
import { Colors, Radius, Spacing } from '../theme';

export default function BlindspotsScreen() {
  const { stories } = useApp();
  const [activeSide, setActiveSide] = useState('all');
  const [selectedStoryId, setSelectedStoryId] = useState(null);

  const rightBlindspots = stories.filter(s => s.blindspot === 'right');
  const leftBlindspots = stories.filter(s => s.blindspot === 'left');
  const filtered =
    activeSide === 'right' ? rightBlindspots
    : activeSide === 'left' ? leftBlindspots
    : stories.filter(s => s.blindspot);

  return (
    <View style={styles.container}>
      {/* Explainer */}
      <View style={styles.explainerCard}>
        <Text style={styles.explainerTitle}>👁‍🗨 Media Blindspots</Text>
        <Text style={styles.explainerBody}>
          A <Text style={{ fontWeight: '700', color: Colors.textMain }}>Blindspot</Text> occurs when a story is widely covered by one side of the spectrum while being largely ignored by the other.
        </Text>
      </View>

      {/* Filter chips */}
      <View style={styles.filterRow}>
        <FilterChip
          label={`All (${rightBlindspots.length + leftBlindspots.length})`}
          active={activeSide === 'all'}
          onPress={() => setActiveSide('all')}
        />
        <FilterChip
          label={`Right (${rightBlindspots.length})`}
          active={activeSide === 'right'}
          onPress={() => setActiveSide('right')}
          accent={Colors.right}
        />
        <FilterChip
          label={`Left (${leftBlindspots.length})`}
          active={activeSide === 'left'}
          onPress={() => setActiveSide('left')}
          accent={Colors.left}
        />
      </View>

      {/* Stories */}
      {filtered.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.emptyText}>No blindspot stories found.</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <StoryCard story={item} onPress={s => setSelectedStoryId(s.id)} />
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

function FilterChip({ label, active, onPress, accent }) {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        active && styles.chipActive,
        active && accent && { backgroundColor: accent + '22', borderColor: accent + '99' },
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.chipText,
        active && { color: accent ?? '#a5b4fc' },
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  explainerCard: {
    backgroundColor: Colors.bgSurface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: 16,
    margin: 12,
    marginBottom: 0,
  },
  explainerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textMain,
    marginBottom: 6,
  },
  explainerBody: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 19,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.bgCard,
  },
  chipActive: {
    backgroundColor: 'rgba(99,102,241,0.15)',
    borderColor: Colors.accent,
  },
  chipText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: { color: Colors.textDim, fontSize: 14 },
  list: { paddingHorizontal: 12, paddingBottom: 20 },
});
