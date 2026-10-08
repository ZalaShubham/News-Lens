// Groundish News — Design Tokens (mirrors the web app's CSS variables)
export const Colors = {
  bg: '#090d16',
  bgSurface: '#111726',
  bgCard: '#151d30',
  bgCardHover: '#1c263e',
  border: '#232e48',
  borderSubtle: '#1a2236',
  textMain: '#f1f5f9',
  textMuted: '#94a3b8',
  textDim: '#64748b',

  left: '#3b82f6',
  leftBg: 'rgba(59,130,246,0.15)',
  leftBorder: 'rgba(59,130,246,0.4)',

  center: '#a1a1aa',
  centerBg: 'rgba(161,161,170,0.12)',
  centerBorder: 'rgba(161,161,170,0.35)',

  right: '#ef4444',
  rightBg: 'rgba(239,68,68,0.15)',
  rightBorder: 'rgba(239,68,68,0.4)',

  accent: '#6366f1',
  accentHover: '#4f46e5',
  warning: '#f59e0b',
  success: '#10b981',

  // Factuality
  high: '#34d399',
  mostlyHigh: '#6ee7b7',
  mixed: '#fbbf24',
  low: '#f87171',

  // Tab bar
  tabBar: '#0d1221',
  tabActive: '#6366f1',
  tabInactive: '#475569',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
};

export const Radius = {
  sm: 6,
  md: 10,
  lg: 14,
  full: 9999,
};

export const Typography = {
  fontFamily: 'System',
  heading: { fontWeight: '700', color: Colors.textMain },
  body: { color: Colors.textMuted, lineHeight: 22 },
  caption: { fontSize: 12, color: Colors.textDim },
};
