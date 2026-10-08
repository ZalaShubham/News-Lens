import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme';

/**
 * BlindspotBadge — a small pill showing ⬛ Left Blindspot or ⬛ Right Blindspot.
 */
export default function BlindspotBadge({ blindspot }) {
  if (!blindspot) return null;
  const isLeft = blindspot === 'left';
  return (
    <View style={[styles.badge, isLeft ? styles.left : styles.right]}>
      <Text style={[styles.text, isLeft ? styles.leftText : styles.rightText]}>
        {isLeft ? '◀ Left Blindspot' : 'Right Blindspot ▶'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
  },
  left: {
    backgroundColor: Colors.leftBg,
    borderColor: Colors.leftBorder,
  },
  right: {
    backgroundColor: Colors.rightBg,
    borderColor: Colors.rightBorder,
  },
  text: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  leftText: { color: '#60a5fa' },
  rightText: { color: '#f87171' },
});
