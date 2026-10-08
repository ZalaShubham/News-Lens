import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator,
} from 'react-native';
import { API_BASE } from '../context/AppContext';
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
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/sources`)
      .then(r => r.json())
      .then(data => setSources(data.sources || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = search.trim()
    ? sources.filter(s =>
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.lean_label?.toLowerCase().includes(search.toLowerCase()) ||
        s.owner?.toLowerCase().includes(search.toLowerCase())
      )
    : sources;

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search sources…"
          placeholderTextColor={Colors.textDim}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.accent} />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <SourceRow source={item} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>No sources found.</Text>
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

  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <Text style={styles.sourceName}>{source.name}</Text>
        <Text style={styles.owner} numberOfLines={1}>{source.owner || '—'}</Text>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgSurface,
    margin: 12,
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
  },
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
  sourceName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMain,
    marginBottom: 3,
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
