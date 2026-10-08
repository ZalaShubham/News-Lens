import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ── API base URL ──────────────────────────────────────────────────────────────
// Point to the MERN backend running on your local machine.
// When testing on a real Android device, replace with your PC's LAN IP.
// When using Expo Go in an emulator, 10.0.2.2 maps to the host's localhost.
export const API_BASE = 'http://10.0.2.2:5000';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [stories, setStories] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('rank');
  const [minOutlets, setMinOutlets] = useState('2');

  // Reading history for My Bias
  const [readHistory, setReadHistory] = useState([]);

  // Load read history from AsyncStorage on mount
  useEffect(() => {
    AsyncStorage.getItem('groundish_reading_history').then(raw => {
      if (raw) {
        try { setReadHistory(JSON.parse(raw)); } catch {}
      }
    });
  }, []);

  const fetchStories = async () => {
    try {
      setError(null);
      const params = new URLSearchParams({
        q: search,
        sort,
        min_outlets: minOutlets,
        limit: '100',
      }).toString();
      const res = await fetch(`${API_BASE}/api/stories?${params}`);
      const data = await res.json();
      setStories(data.stories || []);
      setMeta(data.meta || null);
    } catch (e) {
      setError('Could not reach the server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchStories();
  }, [search, sort, minOutlets]);

  const handleRefresh = async (onDone) => {
    setRefreshing(true);
    try {
      await fetch(`${API_BASE}/api/refresh`, { method: 'POST' });
      const poll = setInterval(async () => {
        try {
          const res = await fetch(`${API_BASE}/api/status`);
          const status = await res.json();
          if (!status.refreshing) {
            clearInterval(poll);
            setRefreshing(false);
            fetchStories();
            onDone?.();
          }
        } catch {
          clearInterval(poll);
          setRefreshing(false);
        }
      }, 3000);
    } catch {
      setRefreshing(false);
    }
  };

  const trackBias = async (story) => {
    if (!story) return;
    setReadHistory(prev => {
      const filtered = prev.filter(s => s.id !== story.id);
      const updated = [story, ...filtered].slice(0, 50);
      AsyncStorage.setItem('groundish_reading_history', JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = async () => {
    setReadHistory([]);
    await AsyncStorage.removeItem('groundish_reading_history');
  };

  return (
    <AppContext.Provider value={{
      stories, meta, loading, refreshing, error,
      search, setSearch, sort, setSort, minOutlets, setMinOutlets,
      handleRefresh, fetchStories,
      readHistory, trackBias, clearHistory,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
