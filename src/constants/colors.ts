/**
 * BarodaGo Color System
 * Sayaji Civic Framework — inspired by the governance legacy of Vadodara
 *
 * Palette anchored on natural pigments, civic botanicals, and traditional Gujarati dyes.
 * Mirrors the Blinkit pattern of a single AppColors constant file.
 */

const AppColors = {
  // ── Primary — Banyan Green ──────────────────────────────────
  primary:          '#002214',
  primaryContainer: '#163828',
  primaryMid:       '#2C4D3C',
  primaryLight:     '#436653',
  primarySurface:   '#C5EBD4',
  primaryMuted:     '#7EA28D',
  onPrimary:        '#FFFFFF',
  inversePrimary:   '#AACFB8',

  // ── Secondary — Gulal Vermillion ────────────────────────────
  secondary:          '#B7160A',
  secondaryContainer: '#DB3322',
  secondaryBright:    '#D83120',
  secondaryPressed:   '#B82414',
  onSecondary:        '#FFFFFF',
  secondaryFixed:     '#FFDAD4',

  // ── Tertiary — Haldi Saffron ────────────────────────────────
  tertiary:           '#2B1900',
  tertiaryContainer:  '#472C00',
  tertiaryBright:     '#E69D1E',
  tertiaryDim:        '#FFB950',
  tertiaryLight:      '#D18B00',
  onTertiary:         '#FFFFFF',
  tertiaryFixed:      '#FFDDB3',

  // ── Surfaces — Cream Linen ──────────────────────────────────
  background:           '#FEF9EF',
  surface:              '#FEF9EF',
  surfaceDim:           '#DEDAD0',
  surfaceBright:        '#FEF9EF',
  surfaceContainerLow:  '#F8F3E9',
  surfaceContainer:     '#F2EDE3',
  surfaceContainerHigh: '#EDE8DE',
  surfaceContainerMax:  '#E7E2D8',
  surfaceWhite:         '#FFFFFF',

  // ── Neutral — Sand / Tan ────────────────────────────────────
  sand:       '#EFEAE0',
  sandBorder: '#E6DEC8',
  sandDark:   '#D9D3C5',

  // ── On Surface — Text ──────────────────────────────────────
  onSurface:        '#1D1C16',
  onSurfaceVariant: '#414843',
  textMuted:        '#727973',
  textLight:        '#9C9690',
  inverseSurface:   '#32302A',
  inverseOnSurface: '#F5F0E6',

  // ── Outline & Borders ──────────────────────────────────────
  outline:        '#727973',
  outlineVariant: '#C1C8C2',
  surfaceTint:    '#436653',
  border:         '#E6DEC8',
  borderLight:    '#EFEAE0',

  // ── Error & Alert ──────────────────────────────────────────
  error:            '#BA1A1A',
  errorBright:      '#D32F2F',
  onError:          '#FFFFFF',
  errorContainer:   '#FFDAD6',
  onErrorContainer: '#93000A',

  // ── Functional ─────────────────────────────────────────────
  success:     '#2E7D32',
  successLight:'#4CAF50',
  info:        '#1565C0',
  infoLight:   '#42A5F5',

  // ── Shadows (rgba values) ──────────────────────────────────
  shadowCard:     'rgba(22, 56, 40, 0.06)',
  shadowFloating: 'rgba(22, 56, 40, 0.12)',
  shadowHover:    'rgba(22, 56, 40, 0.10)',
} as const;

export default AppColors;
