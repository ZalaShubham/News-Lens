import React, { useState } from 'react';
import {
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { useApp } from '../context/AppContext';
import { Colors, Radius } from '../theme';

export default function AuthScreen() {
  const { authenticate, continueAsGuest, authStartupError } = useApp();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(authStartupError);
  const [submitting, setSubmitting] = useState(false);
  const isSignup = mode === 'signup';

  const submit = async () => {
    setError(null);
    if (isSignup && !name.trim()) {
      setError('Enter your name.');
      return;
    }
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    setSubmitting(true);
    try {
      await authenticate(mode, {
        ...(isSignup ? { name: name.trim() } : {}),
        email: email.trim(),
        password,
      });
    } catch (authError) {
      setError(authError.message);
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = () => {
    setMode(isSignup ? 'login' : 'signup');
    setError(null);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.brand}>
          <View style={styles.logo}><Text style={styles.logoText}>◉</Text></View>
          <Text style={styles.appName}>NewsLens India</Text>
          <Text style={styles.tagline}>Multi-Perspective Indian & Global News</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>{isSignup ? 'Create your account' : 'Welcome back'}</Text>
          <Text style={styles.description}>
            {isSignup ? 'Sign up to explore Indian news across the spectrum.' : 'Sign in to access your Indian news dashboard.'}
          </Text>

          {isSignup && (
            <View style={styles.fieldGroup}>
              <Text style={styles.label}>NAME</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor={Colors.textDim}
                autoCapitalize="words"
                autoComplete="name"
                textContentType="name"
                maxLength={80}
                returnKeyType="next"
              />
            </View>
          )}

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={Colors.textDim}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              maxLength={254}
              returnKeyType="next"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder={isSignup ? 'At least 8 characters' : 'Your password'}
              placeholderTextColor={Colors.textDim}
              secureTextEntry
              autoCapitalize="none"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              textContentType={isSignup ? 'newPassword' : 'password'}
              maxLength={128}
              returnKeyType="go"
              onSubmitEditing={submit}
            />
          </View>

          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity
            accessibilityRole="button"
            style={[styles.submitButton, submitting && styles.disabled]}
            onPress={submit}
            disabled={submitting}
          >
            {submitting
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.submitText}>{isSignup ? 'Create account' : 'Sign in'}</Text>}
          </TouchableOpacity>

          {/* Instant Guest / Explore India Mode */}
          <TouchableOpacity
            style={styles.guestButton}
            onPress={() => continueAsGuest()}
            activeOpacity={0.8}
          >
            <Text style={styles.guestButtonText}>⚡ Continue as Guest (Explore Indian News)</Text>
          </TouchableOpacity>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            </Text>
            <TouchableOpacity onPress={switchMode} disabled={submitting}>
              <Text style={styles.switchAction}>{isSignup ? 'Sign in' : 'Sign up'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 22,
    paddingVertical: 32,
  },
  brand: { alignItems: 'center', marginBottom: 26 },
  logo: {
    width: 54, height: 54, borderRadius: 17,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: Colors.bgCard, borderWidth: 1, borderColor: Colors.border,
    marginBottom: 10,
  },
  logoText: { color: Colors.left, fontSize: 36, lineHeight: 42, fontWeight: '700' },
  appName: { color: Colors.textMain, fontSize: 26, fontWeight: '800' },
  tagline: { color: Colors.textMuted, fontSize: 13, marginTop: 4 },
  card: {
    backgroundColor: Colors.bgSurface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Radius.lg,
    padding: 20,
  },
  heading: { color: Colors.textMain, fontSize: 21, fontWeight: '700' },
  description: { color: Colors.textMuted, fontSize: 13, marginTop: 5, marginBottom: 20 },
  fieldGroup: { marginBottom: 15 },
  label: { color: Colors.textDim, fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 7 },
  input: {
    color: Colors.textMain,
    backgroundColor: Colors.bg,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Radius.md,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 14,
  },
  errorBox: {
    backgroundColor: Colors.rightBg,
    borderColor: Colors.rightBorder,
    borderWidth: 1,
    borderRadius: Radius.md,
    padding: 11,
    marginBottom: 14,
  },
  errorText: { color: '#fca5a5', fontSize: 12, lineHeight: 18 },
  submitButton: {
    minHeight: 46,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    borderRadius: Radius.md,
    marginTop: 2,
  },
  guestButton: {
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.45)',
    borderRadius: Radius.md,
    marginTop: 10,
  },
  guestButtonText: {
    color: '#c7d2fe',
    fontSize: 13,
    fontWeight: '700',
  },
  switchRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 18 },
  switchText: { color: Colors.textMuted, fontSize: 12 },
  switchAction: { color: '#a5b4fc', fontSize: 12, fontWeight: '700' },
});
