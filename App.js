import React from 'react';
import { ActivityIndicator, StatusBar, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppProvider } from './src/context/AppContext';
import StoriesScreen from './src/screens/StoriesScreen';
import BlindspotsScreen from './src/screens/BlindspotsScreen';
import SourcesScreen from './src/screens/SourcesScreen';
import MyBiasScreen from './src/screens/MyBiasScreen';
import AboutScreen from './src/screens/AboutScreen';
import AccountScreen from './src/screens/AccountScreen';
import AuthScreen from './src/screens/AuthScreen';
import { Colors } from './src/theme';
import { useApp } from './src/context/AppContext';

const Tab = createBottomTabNavigator();

// Tab icon component
function TabIcon({ emoji, focused }) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{emoji}</Text>
  );
}

// Badge-aware blindspot icon
function BlindspotIcon({ focused }) {
  const { stories } = useApp();
  const count = stories.filter(s => s.blindspot).length;
  return (
    <View>
      <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>👁‍🗨</Text>
      {count > 0 && (
        <View style={styles.tabBadge}>
          <Text style={styles.tabBadgeText}>{count > 99 ? '99+' : count}</Text>
        </View>
      )}
    </View>
  );
}

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.bgSurface,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: Colors.textMain,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 17,
        },
        headerTitle: () => null,
        tabBarStyle: {
          backgroundColor: Colors.tabBar,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.tabInactive,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 2,
        },
        headerLeft: () => (
          <View style={styles.brand}>
            <View style={styles.logo}>
              <View style={styles.lens}>
                <View style={styles.lensCore} />
              </View>
              <View style={styles.lensHandle} />
            </View>
            <View>
              <Text style={styles.brandName}>NewsLens India</Text>
              <Text style={styles.tagline}>Multi-Perspective Indian & Global News</Text>
            </View>
          </View>
        ),
      }}
    >
      <Tab.Screen
        name="Stories"
        component={StoriesScreen}
        options={{
          title: 'Top Stories',
          tabBarLabel: 'Stories',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📰" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Blindspots"
        component={BlindspotsScreen}
        options={{
          title: 'Blindspots',
          tabBarLabel: 'Blindspots',
          tabBarIcon: ({ focused }) => <BlindspotIcon focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Sources"
        component={SourcesScreen}
        options={{
          title: 'Sources Directory',
          tabBarLabel: 'Sources',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📡" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="MyBias"
        component={MyBiasScreen}
        options={{
          title: 'My Reading Bias',
          tabBarLabel: 'My Bias',
          tabBarIcon: ({ focused }) => <TabIcon emoji="📈" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About & Method',
          tabBarLabel: 'About',
          tabBarIcon: ({ focused }) => <TabIcon emoji="ℹ️" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Account',
          tabBarLabel: 'Account',
          tabBarIcon: ({ focused }) => <TabIcon emoji="👤" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { authLoading, authUser } = useApp();

  if (authLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={Colors.accent} />
      </View>
    );
  }

  if (!authUser) return <AuthScreen />;
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
      <AppContent />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
  },
  tabBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: Colors.right,
    borderRadius: 9999,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  tabBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#fff',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 14,
  },
  logo: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bgCard,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  lens: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.left,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lensCore: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.center,
  },
  lensHandle: {
    position: 'absolute',
    width: 7,
    height: 2,
    right: 3,
    bottom: 6,
    backgroundColor: Colors.left,
    transform: [{ rotate: '45deg' }],
  },
  brandName: {
    color: Colors.textMain,
    fontSize: 15,
    fontWeight: '800',
  },
  tagline: {
    color: Colors.textMuted,
    fontSize: 8,
  },
});
