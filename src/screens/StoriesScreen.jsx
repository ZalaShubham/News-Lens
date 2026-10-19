import React, { useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TextInput,
  TouchableOpacity, ActivityIndicator, RefreshControl,
} from 'react-native';
import StoryCard from '../components/StoryCard';
import StoryDetailModal from '../components/StoryDetailModal';
import { useApp } from '../context/AppContext';
import { Colors, Radius, Spacing } from '../theme';

const SORT_OPTIONS = [
  { label: 'Rank', value: 'rank' },
  { label: 'Newest', value: 'newest' },
  { label: 'Outlets', value: 'outlets' },
  { label: 'Left ↑', value: 'left' },
  { label: 'Right ↑', value: 'right' },
];

const OUTLET_OPTIONS = ['1', '2', '3', '5'];

export default function StoriesScreen() {
  const {
    stories, loading, refreshing,
    region, setRegion,
    search, setSearch,
    sort, setSort,
    minOutlets, setMinOutlets,
    handleRefresh, error,
  } = useApp();

  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  return (
    <View style={styles.container}>
      {/* Region selector tabs (India vs All) */}
      <View style={styles.regionBar}>
        <TouchableOpacity
          style={[styles.regionTab, region === 'IN' && styles.regionTabActive]}
          onPress={() => setRegion('IN')}
        >
          <Text style={[styles.regionTabText, region === 'IN' && styles.regionTabTextActive]}>
            🇮🇳 India News
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.regionTab, region === 'ALL' && styles.regionTabActive]}
          onPress={() => setRegion('ALL')}
        >
          <Text style={[styles.regionTabText, region === 'ALL' && styles.regionTabTextActive]}>
            🌐 All / Global
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Indian & global stories…"
          placeholderTextColor={Colors.textDim}
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
        <TouchableOpacity
          onPress={() => setShowFilters(f => !f)}
          style={[styles.filterToggle, showFilters && styles.filterToggleActive]}
        >
          <Text style={styles.filterToggleText}>⚙ Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Filter panel */}
      {showFilters && (
        <View style={styles.filterPanel}>
          <Text style={styles.filterLabel}>Sort by</Text>
          <View style={styles.chipRowFilter}>
            {SORT_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.filterChip, sort === opt.value && styles.filterChipActive]}
                onPress={() => setSort(opt.value)}
              >
                <Text style={[styles.filterChipText, sort === opt.value && styles.filterChipTextActive]}>
                  {opt.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.filterLabel}>Min outlets</Text>
          <View style={styles.chipRowFilter}>
            {OUTLET_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt}
                style={[styles.filterChip, minOutlets === opt && styles.filterChipActive]}
                onPress={() => setMinOutlets(opt)}
              >
                <Text style={[styles.filterChipText, minOutlets === opt && styles.filterChipTextActive]}>
                  {opt}+
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Result count row */}
      <View style={styles.resultRow}>
        <View style={styles.countBadge}>
          <Text style={styles.resultCount}>
            {region === 'IN' ? '🇮🇳 India Coverage: ' : ''}{stories.length} stories
          </Text>
        </View>
        {refreshing && (
          <Text style={styles.refreshingText}>⟳ Refreshing news feeds…</Text>
        )}
      </View>

      {/* Non-blocking error notice (if any and list is empty) */}
      {error && stories.length === 0 && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>ℹ Showing offline curated stories</Text>
        </View>
      )}

      {/* Stories list */}
      {loading && stories.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.accent} />
          <Text style={styles.loadingText}>Loading Indian news clusters…</Text>
        </View>
      ) : (
        <FlatList
          data={stories}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <StoryCard story={item} onPress={s => setSelectedStoryId(s.id)} />
          )}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => handleRefresh()}
              tintColor={Colors.accent}
              colors={[Colors.accent]}
            />
          }
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No stories found for this search.</Text>
            </View>
          }
        />
      )}

      {/* Story detail modal */}
      <StoryDetailModal
        storyId={selectedStoryId}
        visible={!!selectedStoryId}
        onClose={() => setSelectedStoryId(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  regionBar: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 10,
    gap: 8,
  },
  regionTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: Radius.md,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  regionTabActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.18)',
    borderColor: Colors.accent,
  },
  regionTabText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  regionTabTextActive: {
    color: '#a5b4fc',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgSurface,
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 0,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  searchIcon: { fontSize: 14, color: Colors.textDim },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textMain,
    paddingVertical: 4,
  },
  filterToggle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterToggleActive: {
    backgroundColor: 'rgba(99,102,241,0.15)',
    borderColor: Colors.accent,
  },
  filterToggleText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  filterPanel: {
    backgroundColor: Colors.bgSurface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    padding: 14,
    marginHorizontal: 12,
    marginTop: 8,
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textDim,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
    marginTop: 4,
  },
  chipRowFilter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.bgCard,
  },
  filterChipActive: {
    backgroundColor: 'rgba(99,102,241,0.2)',
    borderColor: Colors.accent,
  },
  filterChipText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: '#a5b4fc',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultCount: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  refreshingText: {
    fontSize: 12,
    color: Colors.warning,
  },
  errorBox: {
    backgroundColor: 'rgba(99,102,241,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.3)',
    borderRadius: Radius.md,
    marginHorizontal: 12,
    padding: 8,
    marginBottom: 6,
  },
  errorText: {
    color: '#a5b4fc',
    fontSize: 12,
  },
  list: { paddingHorizontal: 12, paddingBottom: 20 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  loadingText: { color: Colors.textMuted, fontSize: 13 },
  emptyText: { color: Colors.textDim, fontSize: 14 },
});
