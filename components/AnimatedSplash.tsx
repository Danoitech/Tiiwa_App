import { BrandLockup } from '@/components/BrandLockup';
import { useTheme } from '@/theme/ThemeProvider';
import { StyleSheet, View } from 'react-native';

export function AnimatedSplash() {
  const { colors } = useTheme();
  return (
    <View style={[styles.wrap, { backgroundColor: colors.bg }]}>
      <BrandLockup />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
