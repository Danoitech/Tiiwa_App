import { setToastListener } from '@/lib/toast';
import { useTheme } from '@/theme/ThemeProvider';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function ToastHost() {
  const [message, setMessage] = useState('');
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    setToastListener((next) => {
      setMessage(next);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => setMessage(''), 1600);
    });
    return () => {
      setToastListener(null);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!message) return null;

  return (
    <View pointerEvents="none" style={[styles.wrap, { bottom: 78 + insets.bottom }]}>
      <View style={[styles.pill, { backgroundColor: colors.ink }]}>
        <Text style={[styles.text, { color: colors.bg }]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  text: {
    fontSize: 12,
  },
});
