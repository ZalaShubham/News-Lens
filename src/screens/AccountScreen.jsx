import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useApp } from '../context/AppContext';
import { Colors, Radius } from '../theme';

export default function AccountScreen() {
  const { authUser, signOut } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{authUser?.name?.[0]?.toUpperCase() || '?'}</Text>
        </View>
        <Text style={styles.name}>{authUser?.name}</Text>
        <Text style={styles.email}>{authUser?.email}</Text>
      </View>

      <TouchableOpacity accessibilityRole="button" style={styles.signOut} onPress={signOut}>
        <Text style={styles.signOutText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg, padding: 16 },
  card: {
    alignItems: 'center',
    backgroundColor: Colors.bgSurface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: 24,
    marginTop: 8,
  },
  avatar: {
    width: 66, height: 66, borderRadius: 33,
    justifyContent: 'center', alignItems: 'center',
    backgroundColor: Colors.leftBg, borderColor: Colors.leftBorder, borderWidth: 1,
    marginBottom: 13,
  },
  avatarText: { color: '#bfdbfe', fontSize: 25, fontWeight: '700' },
  name: { color: Colors.textMain, fontSize: 18, fontWeight: '700' },
  email: { color: Colors.textMuted, fontSize: 13, marginTop: 5 },
  signOut: {
    alignItems: 'center',
    backgroundColor: Colors.bgSurface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: 13,
    marginTop: 14,
  },
  signOutText: { color: '#fca5a5', fontWeight: '700', fontSize: 13 },
});
