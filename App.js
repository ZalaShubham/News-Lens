import React from 'react';
import { StatusBar, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AppProvider } from './src/context/AppContext';
import StoriesScreen from './src/screens/StoriesScreen';
import BlindspotsScreen from './src/screens/BlindspotsScreen';
import SourcesScreen from './src/screens/SourcesScreen';
import MyBiasScreen from './src/screens/MyBiasScreen';
import AboutScreen from './src/screens/AboutScreen';
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
          <View style={styles.headerLogo}>
            <View style={styles.logo}>
              <View style={[styles.logoBar, { backgroundColor: Colors.left }]} />
              <View style={[styles.logoBar, { backgroundColor: Colors.center }]} />
              <View style={[styles.logoBar, { backgroundColor: Colors.right }]} />
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
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={Colors.bg} />
        <AppTabs />
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
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
  headerLogo: {
    paddingLeft: 14,
  },
  logo: {
    flexDirection: 'row',
    gap: 3,
    backgroundColor: '#0f172a',
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  logoBar: {
    width: 5,
    height: 14,
    borderRadius: 2,
  },
});
