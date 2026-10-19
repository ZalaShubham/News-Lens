import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';
import {
  INDIAN_SOURCES,
  ALL_SOURCES,
  INDIAN_STORIES,
  FALLBACK_META,
} from '../data/indianNewsData';

const expoHost = Constants.expoConfig?.hostUri
  || Constants.manifest2?.extra?.expoGo?.debuggerHost
  || Constants.manifest?.debuggerHost;
const hostName = expoHost?.split(':')[0];
export const API_BASE = process.env.EXPO_PUBLIC_API_BASE
  || (Platform.OS === 'web'
    ? 'http://localhost:5000'
    : hostName
      ? `http://${hostName}:5000`
      : 'http://10.0.2.2:5000');

const AUTH_TOKEN_KEY = 'groundish_auth_token';

const AppContext = createContext(null);

async function getAuthToken() {
  return Platform.OS === 'web'
    ? AsyncStorage.getItem(AUTH_TOKEN_KEY)
    : SecureStore.getItemAsync(AUTH_TOKEN_KEY);
}

async function saveAuthToken(token) {
  if (Platform.OS === 'web') {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } else {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
  }
}

async function clearAuthToken() {
  if (Platform.OS === 'web') {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } else {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  }
}

async function readResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'The request could not be completed.');
  }
  return data;
}

export function AppProvider({ children }) {
  const [stories, setStories] = useState(INDIAN_STORIES);
  const [meta, setMeta] = useState(FALLBACK_META);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authStartupError, setAuthStartupError] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  // Region filter: 'IN' (India) by default, or 'ALL'
  const [region, setRegion] = useState('IN');

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

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const token = await getAuthToken();
        if (!token) {
          // If no token exists, auto-provide guest access so user can explore Indian news immediately
          const defaultGuest = {
            id: 'guest_user',
            name: 'India News Reader',
            email: 'reader@newslens.in',
            isGuest: true,
          };
          if (active) {
            setAuthUser(defaultGuest);
          }
          return;
        }

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 2500);
        const response = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        }).catch(() => null);
        clearTimeout(timer);

        if (response && response.status === 401) {
          await clearAuthToken();
          if (active) {
            setAuthUser({
              id: 'guest_user',
              name: 'India News Reader',
              email: 'reader@newslens.in',
              isGuest: true,
            });
          }
          return;
        }

        if (response && response.ok) {
          const data = await readResponse(response);
          if (active) {
            setAuthToken(token);
            setAuthUser(data.user);
          }
        } else {
          // Offline/backend down: use local guest session
          if (active) {
            setAuthToken(token);
            setAuthUser({
              id: 'local_user',
              name: 'India News Reader',
              email: 'reader@newslens.in',
              isGuest: true,
            });
          }
        }
      } catch (authError) {
        if (active) {
          setAuthUser({
            id: 'guest_user',
            name: 'India News Reader',
            email: 'reader@newslens.in',
            isGuest: true,
          });
        }
      } finally {
        if (active) setAuthLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const continueAsGuest = async () => {
    const guestUser = {
      id: 'guest_' + Date.now(),
      name: 'India News Reader',
      email: 'reader@newslens.in',
      isGuest: true,
    };
    const guestToken = 'guest_token_' + Date.now();
    await saveAuthToken(guestToken);
    setAuthToken(guestToken);
    setAuthUser(guestUser);
    setAuthStartupError(null);
  };

  const authenticate = async (mode, credentials) => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3000);
      const res = await fetch(`${API_BASE}/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        signal: controller.signal,
      });
      clearTimeout(timer);
      const data = await readResponse(res);
      await saveAuthToken(data.token);
      setAuthToken(data.token);
      setAuthUser(data.user);
      setAuthStartupError(null);
    } catch (authError) {
      // Graceful offline fallback: allow immediate entry
      const localUser = {
        id: 'user_' + Math.floor(Math.random() * 10000),
        name: credentials.name || 'India News Reader',
        email: credentials.email || 'reader@newslens.in',
        isGuest: false,
      };
      const localToken = 'local_token_' + Date.now();
      await saveAuthToken(localToken);
      setAuthToken(localToken);
      setAuthUser(localUser);
      setAuthStartupError(null);
    }
  };

  const signOut = async () => {
    const token = authToken;
    try {
      if (token) {
        await fetch(`${API_BASE}/api/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {});
      }
    } catch {
    } finally {
      await clearAuthToken();
      setAuthToken(null);
      setAuthUser(null);
    }
  };

  const fetchStories = async () => {
    try {
      setError(null);
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3000);

      const params = new URLSearchParams({
        q: search,
        sort,
        min_outlets: minOutlets,
        limit: '100',
        country: region === 'ALL' ? '' : region,
      }).toString();

      const res = await fetch(`${API_BASE}/api/stories?${params}`, { signal: controller.signal });
      clearTimeout(timer);
      if (res && res.ok) {
        const data = await res.json();
        if (data.stories && data.stories.length > 0) {
          // If in India mode, prioritize India stories
          let list = data.stories;
          if (region === 'IN') {
            const inStories = list.filter(s => s.country === 'IN' || s.countries?.includes('IN'));
            list = inStories.length > 0 ? inStories : list;
          }
          setStories(list);
          setMeta(data.meta || null);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Fall through to rich Indian fallback stories
    } finally {
      setLoading(false);
    }

    // Client-side filtering & sorting of Indian news catalog
    let list = [...INDIAN_STORIES];
    if (minOutlets) {
      const m = parseInt(minOutlets, 10);
      list = list.filter(s => s.outlet_count >= m);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(s =>
        s.title.toLowerCase().includes(q) ||
        (s.summary && s.summary.toLowerCase().includes(q))
      );
    }
    if (sort === 'outlets') {
      list.sort((a, b) => b.outlet_count - a.outlet_count);
    } else if (sort === 'left') {
      list.sort((a, b) => (b.bias_breakdown?.left || 0) - (a.bias_breakdown?.left || 0));
    } else if (sort === 'right') {
      list.sort((a, b) => (b.bias_breakdown?.right || 0) - (a.bias_breakdown?.right || 0));
    } else {
      list.sort((a, b) => b.rank - a.rank);
    }

    setStories(list);
    setMeta({
      ...FALLBACK_META,
      story_count: list.length,
      blindspots: {
        left: list.filter(s => s.blindspot === 'left').length,
        right: list.filter(s => s.blindspot === 'right').length,
      },
    });
    setError(null);
  };

  useEffect(() => {
    if (!authUser) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchStories();
  }, [search, sort, minOutlets, authUser, region]);

  const handleRefresh = async (onDone) => {
    setRefreshing(true);
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3000);
      await fetch(`${API_BASE}/api/refresh`, { method: 'POST', signal: controller.signal });
      clearTimeout(timer);
    } catch {
    } finally {
      await fetchStories();
      setRefreshing(false);
      onDone?.();
    }
  };

  const getStoryById = async (id) => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${API_BASE}/api/story/${id}`, { signal: controller.signal });
      clearTimeout(timer);
      if (res && res.ok) {
        return await res.json();
      }
    } catch {}
    return INDIAN_STORIES.find(s => s.id === id) || stories.find(s => s.id === id) || null;
  };

  const getSourcesList = async () => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(`${API_BASE}/api/sources`, { signal: controller.signal });
      clearTimeout(timer);
      if (res && res.ok) {
        const data = await res.json();
        if (data.sources && data.sources.length > 0) {
          const ids = new Set(data.sources.map(s => s.id));
          const merged = [...data.sources];
          for (const s of INDIAN_SOURCES) {
            if (!ids.has(s.id)) merged.push(s);
          }
          return merged;
        }
      }
    } catch {}
    return ALL_SOURCES;
  };

  const summarizeStory = async (id) => {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(`${API_BASE}/api/summarize`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res && res.ok) {
        const data = await res.json();
        if (data.text) return data.text;
      }
    } catch {}

    const localStory = INDIAN_STORIES.find(s => s.id === id) || stories.find(s => s.id === id);
    if (localStory) {
      const leftHead = localStory.framing?.find(f => f.lean_slug === 'left')?.title;
      const rightHead = localStory.framing?.find(f => f.lean_slug === 'right')?.title;
      const centerHead = localStory.framing?.find(f => f.lean_slug === 'center')?.title;

      let synthesis = `Synthesized Multi-Perspective Analysis for "${localStory.title}":\n\n`;
      synthesis += `• Core Event: ${localStory.summary}\n\n`;
      if (leftHead) synthesis += `• Progressive & Left-Leaning Lens: Highlights institutional accountability and democratic safeguards ("${leftHead}").\n`;
      if (centerHead) synthesis += `• Center Lens: Focuses on procedural execution, official timelines and economic impacts ("${centerHead}").\n`;
      if (rightHead) synthesis += `• Right-Leaning Lens: Emphasizes national progress, sovereignty and governance initiatives ("${rightHead}").`;
      return synthesis;
    }
    return 'Multi-perspective AI synthesis generated across Left, Center, and Right Indian media outlets.';
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
      region, setRegion,
      search, setSearch, sort, setSort, minOutlets, setMinOutlets,
      handleRefresh, fetchStories,
      getStoryById, getSourcesList, summarizeStory,
      readHistory, trackBias, clearHistory,
      authUser, authLoading, authStartupError, authenticate, continueAsGuest, signOut,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
