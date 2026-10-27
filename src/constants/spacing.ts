/**
 * BarodaGo Spacing System
 * Sayaji Civic Framework
 *
 * Based on 4px/8px rhythm.
 */

export const Spacing = {
  xs:  '0.25rem',   // 4px
  sm:  '0.5rem',    // 8px
  md:  '1rem',      // 16px
  lg:  '1.5rem',    // 24px
  xl:  '2rem',      // 32px
  xxl: '3rem',      // 48px

  gutter:        '1rem',
  gutterDesktop: '1.5rem',
  margin:        '1rem',
  marginDesktop: '3rem',
} as const;

export const Rounded = {
  sm:      '0.25rem',   // 4px
  DEFAULT: '0.5rem',    // 8px
  md:      '0.75rem',   // 12px
  lg:      '1rem',      // 16px
  xl:      '1.5rem',    // 24px
  xxl:     '2rem',      // 32px — civic sheet radii
  full:    '9999px',
} as const;

export const Elevation = {
  /** Card resting on the cream linen floor */
  card: '0 4px 16px -2px rgba(22, 56, 40, 0.06)',
  /** Floating layer — action drawers, modals */
  floating: '0 -8px 32px 0 rgba(22, 56, 40, 0.12)',
  /** Hover state bump */
  hover: '0 8px 24px -4px rgba(22, 56, 40, 0.10)',
  /** None */
  none: 'none',
} as const;
