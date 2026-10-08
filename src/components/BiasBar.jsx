import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../theme';

/**
 * BiasBar — a coloured horizontal bar split into Left / Center / Right segments.
 * Mirrors the web app's .bias-bar-track component.
 */
export default function BiasBar({ breakdown, showLegend = true }) {
  const { left = 0, center = 0, right = 0 } = breakdown || {};

  return (
    <View style={styles.container}>
      {showLegend && (
        <View style={styles.legend}>
          <LegendItem color={Colors.left} label={`${left}% L`} />
          <LegendItem color={Colors.center} label={`${center}% C`} />
          <LegendItem color={Colors.right} label={`${right}% R`} />
        </View>
      )}
      <View style={styles.track}>
        {left > 0 && <View style={[styles.segment, { flex: left, backgroundColor: Colors.left }]} />}
        {center > 0 && <View style={[styles.segment, { flex: center, backgroundColor: Colors.center }]} />}
        {right > 0 && <View style={[styles.segment, { flex: right, backgroundColor: Colors.right }]} />}
      </View>
    </View>
  );
}

function LegendItem({ color, label }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <View style={{ color: Colors.textDim }}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  track: {
    height: 7,
    backgroundColor: '#1e293b',
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  segment: {
    height: 7,
  },
});
