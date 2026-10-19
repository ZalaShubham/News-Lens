import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { Colors, Radius } from '../theme';

const LEAN_COLORS = {
  left: '#3b82f6',
  lean_left: '#93c5fd',
  center: '#a1a1aa',
  lean_right: '#fca5a5',
  right: '#ef4444',
};

const FACT_COLORS = {
  high: '#34d399',
  'mostly-high': '#6ee7b7',
  mixed: '#fbbf24',
  low: '#f87171',
};

export default function SourcesScreen() {
  const { getSourcesList } = useApp();
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sourceRegion, setSourceRegion] = useState('IN'); // 'IN' by default

  useEffect(() => {
    let active = true;
    getSourcesList()
      .then(data => {
        if (active) setSources(data || []);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const regionFiltered = sources.filter(s => {
    if (sourceRegion === 'IN') return s.country === 'IN';
    if (sourceRegion === 'WORLD') return s.country !== 'IN';
    return true;
  });

  const filtered = search.trim()
    ? regionFiltered.filter(s =>
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.lean_label?.toLowerCase().includes(search.toLowerCase()) ||
        s.owner?.toLowerCase().includes(search.toLowerCase())
      )
    : regionFiltered;

  return (
    <View style={styles.container}>
      {/* Category Tabs: India vs Global vs All */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, sourceRegion === 'IN' && styles.tabActive]}
          onPress={() => setSourceRegion('IN')}
        >
          <Text style={[styles.tabText, sourceRegion === 'IN' && styles.tabTextActive]}>
            🇮🇳 India Channels ({sources.filter(s => s.country === 'IN').length || '25+'})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, sourceRegion === 'WORLD' && styles.tabActive]}
          onPress={() => setSourceRegion('WORLD')}
        >
          <Text style={[styles.tabText, sourceRegion === 'WORLD' && styles.tabTextActive]}>
            🌐 Global Outlets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, sourceRegion === 'ALL' && styles.tabActive]}
          onPress={() => setSourceRegion('ALL')}
        >
          <Text style={[styles.tabText, sourceRegion === 'ALL' && styles.tabTextActive]}>
            All
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Indian news channels, owners…"
          placeholderTextColor={Colors.textDim}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.accent} />
          <Text style={styles.loadingText}>Loading verified news channels…</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <SourceRow source={item} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No sources found matching your search.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

function SourceRow({ source }) {
  const leanColor = LEAN_COLORS[source.lean_slug] || Colors.textDim;
  const factColor = FACT_COLORS[source.factuality] || Colors.textDim;
  const isIndia = source.country === 'IN';

  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={styles.nameRow}>
          {isIndia && <Text style={styles.flagIcon}>🇮🇳</Text>}
          <Text style={styles.sourceName}>{source.name}</Text>
        </View>
        <Text style={styles.owner} numberOfLines={1}>
          🏢 {source.owner || 'Independent'}
        </Text>
      </View>
      <View style={styles.rowRight}>
        <View style={[styles.badge, { backgroundColor: leanColor + '22', borderColor: leanColor + '66' }]}>
          <Text style={[styles.badgeText, { color: leanColor }]}>{source.lean_label}</Text>
        </View>
        {source.factuality && (
          <View style={[styles.badge, { backgroundColor: factColor + '22', borderColor: factColor + '66' }]}>
            <Text style={[styles.badgeText, { color: factColor }]}>{source.factuality}</Text>
          </View>
        )}
        {source.article_count != null && (
          <Text style={styles.artCount}>{source.article_count} arts</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 10,
    gap: 6,
  },
  tab: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: Radius.md,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.18)',
    borderColor: Colors.accent,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  tabTextActive: {
    color: '#a5b4fc',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgSurface,
    marginHorizontal: 12,
    marginTop: 10,
    marginBottom: 8,
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
  list: { paddingHorizontal: 12, paddingBottom: 20 },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 8,
  },
  loadingText: { color: Colors.textMuted, fontSize: 13 },
  emptyText: { color: Colors.textDim },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.md,
    padding: 12,
    marginBottom: 8,
  },
  rowLeft: { flex: 1, marginRight: 10 },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 3,
  },
  flagIcon: { fontSize: 13 },
  sourceName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMain,
    flexShrink: 1,
  },
  owner: {
    fontSize: 11,
    color: Colors.textDim,
  },
  rowRight: {
    alignItems: 'flex-end',
    gap: 4,
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
    textTransform: 'capitalize',
  },
  artCount: {
    fontSize: 10,
    color: Colors.textDim,
    marginTop: 2,
  },
});
