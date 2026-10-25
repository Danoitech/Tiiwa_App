export type ThemeColors = {
  ink: string;
  inkDim: string;
  bg: string;
  card: string;
  cardSoft: string;
  amber: string;
  amberDeep: string;
  mint: string;
  mintDeep: string;
  peach: string;
  peachDeep: string;
  onAccent: string;
  danger: string;
  divider: string;
};

export const lightColors: ThemeColors = {
  ink: '#4A4E51',
  inkDim: '#8B8F92',
  bg: '#FAFAF6',
  card: '#FFFFFF',
  cardSoft: '#F2EFE7',
  amber: '#E8A63D',
  amberDeep: '#FFF1C6',
  mint: '#2E9C89',
  mintDeep: '#D9F5EE',
  peach: '#D9713C',
  peachDeep: '#FFDBB5',
  onAccent: '#2E2A27',
  danger: '#E0685E',
  divider: 'rgba(74,78,81,0.08)',
};

export const darkColors: ThemeColors = {
  ink: '#F2EFE7',
  inkDim: '#A8A49A',
  bg: '#1A1915',
  card: '#26241F',
  cardSoft: '#322F28',
  amber: '#E8A63D',
  amberDeep: '#3D3218',
  mint: '#3DB8A3',
  mintDeep: '#1A3D36',
  peach: '#E07D4A',
  peachDeep: '#3D2A1C',
  onAccent: '#2E2A27',
  danger: '#E0685E',
  divider: 'rgba(242,239,231,0.08)',
};

/** Default / light tokens. Screens should read live colors from `useTheme()`. */
export const colors = lightColors;
