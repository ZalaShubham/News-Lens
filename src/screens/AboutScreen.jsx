import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Colors, Radius } from '../theme';

const FEATURES = [
  {
    icon: '🗞',
    title: 'Story Clustering',
    desc: 'Articles describing the same event are merged into one story across outlets using TF-IDF vectors and average-link clustering.',
  },
  {
    icon: '📊',
    title: 'Bias Distribution',
    desc: 'A five-segment bar — Left / Lean Left / Center / Lean Right / Right — counted by outlet, not article.',
  },
  {
    icon: '👁‍🗨',
    title: 'Blindspots',
    desc: 'Stories widely covered by one side of the spectrum while largely ignored by the other.',
  },
  {
    icon: '📰',
    title: 'Side-by-Side Framing',
    desc: 'The actual headline each side ran — placed next to each other so you can see the framing difference.',
  },
  {
    icon: '🏢',
    title: 'Ownership Transparency',
    desc: 'The parent company behind every outlet, flagged when one company owns a big share of a story\'s coverage.',
  },
  {
    icon: '✅',
    title: 'Factuality',
    desc: 'An aggregate factuality reading for the outlets covering a story, derived from third-party ratings.',
  },
];

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.logoBox}>
        <View style={styles.logo}>
          <View style={styles.lens}>
            <View style={styles.lensCore} />
          </View>
          <View style={styles.lensHandle} />
        </View>
        <Text style={styles.appName}>NewsLens</Text>
        <Text style={styles.tagline}>AI Powered Personalized News Aggregator</Text>
      </View>

      {/* About paragraph */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>What is NewsLens?</Text>
        <Text style={styles.cardBody}>
          A news aggregator inspired by Ground News. It pulls the same story from across the political spectrum, shows you who covered it, how each side headlined it, who owns the outlets doing the covering — and which side isn't running the story at all.
        </Text>
        <Text style={[styles.cardBody, { marginTop: 8 }]}>
          Built on the MERN stack (MongoDB, Express, React, Node.js) with a Python pipeline powering the RSS fetching and story clustering.
        </Text>
      </View>

      {/* Features */}
      <Text style={styles.sectionHeading}>Features</Text>
      {FEATURES.map((f, i) => (
        <View key={i} style={styles.featureCard}>
          <Text style={styles.featureIcon}>{f.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.featureTitle}>{f.title}</Text>
            <Text style={styles.featureDesc}>{f.desc}</Text>
          </View>
        </View>
      ))}

      {/* Methodology */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔬 Methodology</Text>
        <Text style={styles.cardBody}>
          Clustering uses TF-IDF vectors with an inverted-index to find candidate pairs, then average-link clustering to group them. Summaries are extractive — sentences are ranked by cross-spectrum agreement. No external API keys required.
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: { padding: 16 },
  logoBox: {
    alignItems: 'center',
    paddingVertical: 28,
    marginBottom: 8,
  },
  logo: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 12,
    position: 'relative',
  },
  lens: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: Colors.left,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lensCore: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.center,
  },
  lensHandle: {
    position: 'absolute',
    width: 10,
    height: 3,
    right: 7,
    bottom: 10,
    backgroundColor: Colors.left,
    transform: [{ rotate: '45deg' }],
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textMain,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 4,
  },
  card: {
    backgroundColor: Colors.bgSurface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.lg,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textMain,
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textDim,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
    marginTop: 4,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    borderRadius: Radius.md,
    padding: 14,
    marginBottom: 8,
  },
  featureIcon: { fontSize: 22 },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textMain,
    marginBottom: 3,
  },
  featureDesc: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 18,
  },
});
