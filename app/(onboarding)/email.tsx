import { useAuth } from '@/auth/AuthProvider';
import { sendOtp } from '@/auth/otp';
import { Screen } from '@/components/ui';
import type { ThemeColors } from '@/theme/colors';
import { useThemedStyles } from '@/theme/ThemeProvider';
import { router } from 'expo-router';
import { Mail } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function EmailScreen() {
  const { colors, styles } = useThemedStyles((c) => emailStyles(c));
  const { setEmail } = useAuth();
  const [email, setEmailValue] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  async function send() {
    if (!valid || busy) return;
    setBusy(true);
    setError(null);
    try {
      const result = await sendOtp(email, 'onboarding');
      await setEmail(email, false);
      router.push({
        pathname: '/otp',
        params: { email: email.trim().toLowerCase(), purpose: 'onboarding', devCode: result.devCode ?? '' },
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not send a code.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <Screen style={styles.wrap}>
      <View style={styles.header}>
        <Text style={styles.kicker}>RECOVERY EMAIL</Text>
        <Text style={styles.title}>If you forget the PIN</Text>
        <Text style={styles.body}>
          We only use this to send a one-time code. Daily unlock is still the PIN, and it works offline.
        </Text>
      </View>

      <View style={styles.field}>
        <Mail size={18} color={colors.inkDim} strokeWidth={1.8} />
        <TextInput
          value={email}
          onChangeText={(value) => {
            setEmailValue(value);
            if (error) setError(null);
          }}
          placeholder="you@email.com"
          placeholderTextColor={colors.inkDim}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          style={styles.input}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable
        onPress={send}
        disabled={!valid || busy}
        style={[styles.send, (!valid || busy) && styles.sendDisabled]}
      >
        <Text style={[styles.sendText, (!valid || busy) && styles.sendTextDisabled]}>
          {busy ? 'Sending…' : 'Send code'}
        </Text>
      </Pressable>
    </Screen>
  );
}

function emailStyles(c: ThemeColors) {
  return StyleSheet.create({
  wrap: {
    paddingHorizontal: 28,
    paddingBottom: 24,
  },
  header: {
    paddingTop: 20,
    marginBottom: 36,
  },
  kicker: {
    fontSize: 11,
    letterSpacing: 1.8,
    color: c.inkDim,
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    color: c.ink,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 12,
  },
  body: {
    fontSize: 15,
    color: c.inkDim,
    lineHeight: 22,
    maxWidth: 320,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 56,
    paddingHorizontal: 20,
    borderRadius: 999,
    backgroundColor: c.card,
    shadowColor: c.ink,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: c.ink,
    paddingVertical: 0,
  },
  error: {
    color: c.danger,
    fontSize: 12,
    marginTop: 10,
  },
  send: {
    height: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: c.mint,
    marginTop: 16,
  },
  sendDisabled: {
    backgroundColor: c.cardSoft,
  },
  sendText: {
    fontSize: 15,
    fontWeight: '500',
    color: c.onAccent,
  },
  sendTextDisabled: {
    color: c.ink,
  },
  });
}
