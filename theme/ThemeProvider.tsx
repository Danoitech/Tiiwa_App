import { getMeta, setMeta } from '@/db/queries';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Appearance, useColorScheme } from 'react-native';
import { darkColors, lightColors, type ThemeColors } from './colors';

export type ThemePreference = 'system' | 'light' | 'dark';

type ThemeContextValue = {
  colors: ThemeColors;
  preference: ThemePreference;
  resolved: 'light' | 'dark';
  setPreference: (next: ThemePreference) => Promise<void>;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function asScheme(value: string | null | undefined): 'light' | 'dark' {
  if (value === 'dark' || value === 'light') return value;
  const native = Appearance.getColorScheme();
  return native === 'dark' ? 'dark' : 'light';
}

function applyNativeScheme(preference: ThemePreference) {
  Appearance.setColorScheme(preference === 'system' ? 'unspecified' : preference);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const hookScheme = useColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>('system');
  const [system, setSystem] = useState<'light' | 'dark'>(() => asScheme(Appearance.getColorScheme()));

  useEffect(() => {
    applyNativeScheme('system');
    getMeta('appearance')
      .then((value) => {
        if (value === 'light' || value === 'dark' || value === 'system') {
          setPreferenceState(value);
          applyNativeScheme(value);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setSystem(asScheme(hookScheme ?? Appearance.getColorScheme()));
  }, [hookScheme]);

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setSystem(asScheme(colorScheme));
    });
    return () => sub.remove();
  }, []);

  const resolved: 'light' | 'dark' = preference === 'system' ? system : preference;
  const palette = resolved === 'dark' ? darkColors : lightColors;

  const setPreference = useCallback(async (next: ThemePreference) => {
    setPreferenceState(next);
    applyNativeScheme(next);
    await setMeta('appearance', next);
  }, []);

  const value = useMemo(
    () => ({ colors: palette, preference, resolved, setPreference }),
    [palette, preference, resolved, setPreference]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export function useThemedStyles<T>(factory: (colors: ThemeColors) => T) {
  const theme = useTheme();
  const styles = useMemo(() => factory(theme.colors), [theme.colors]);
  return { colors: theme.colors, preference: theme.preference, resolved: theme.resolved, setPreference: theme.setPreference, styles };
}
