import { useTheme } from '@/theme/ThemeProvider';
import { type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Screen({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  return (
    <View style={[styles.screen, { backgroundColor: colors.bg, paddingTop: insets.top + 8 }, style]}>
      {children}
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  color,
  textColor,
  disabled,
}: {
  label: string;
  onPress: () => void;
  color?: string;
  textColor?: string;
  disabled?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.primary, { backgroundColor: disabled ? colors.cardSoft : color ?? colors.mint }]}
    >
      <Text style={[styles.primaryText, { color: disabled ? colors.inkDim : textColor ?? colors.onAccent }]}>{label}</Text>
    </Pressable>
  );
}

export function GhostButton({ label, onPress }: { label: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable onPress={onPress} style={styles.ghost}>
      <Text style={[styles.ghostText, { color: colors.inkDim }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  primary: {
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  ghost: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  ghostText: {
    fontSize: 12,
  },
});
