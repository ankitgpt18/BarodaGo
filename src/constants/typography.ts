/**
 * BarodaGo Typography System
 * Sayaji Civic Framework
 *
 * Font Roles:
 *  - Bricolage Grotesque → Display & Headings (expressive, municipal signage feel)
 *  - Plus Jakarta Sans   → Body & Controls (humanist, high reading speed)
 *  - Space Mono          → Civic telemetry (OTP, ticket refs, ledger data)
 */

export const FontFamily = {
  display: "'Bricolage Grotesque', sans-serif",
  body:    "'Plus Jakarta Sans', sans-serif",
  mono:    "'Space Mono', monospace",
} as const;

/**
 * Typography presets — map directly to the DESIGN.md spec.
 * Each preset returns a CSS-in-JS style object.
 */
export const TypePreset = {
  displayLg: {
    fontFamily: FontFamily.display,
    fontSize: '44px',
    fontWeight: 800,
    lineHeight: '52px',
    letterSpacing: '-0.03em',
  },
  displayLgMobile: {
    fontFamily: FontFamily.display,
    fontSize: '32px',
    fontWeight: 800,
    lineHeight: '38px',
    letterSpacing: '-0.02em',
  },
  headlineLg: {
    fontFamily: FontFamily.display,
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: '40px',
    letterSpacing: '-0.02em',
  },
  headlineLgMobile: {
    fontFamily: FontFamily.display,
    fontSize: '24px',
    fontWeight: 700,
    lineHeight: '30px',
    letterSpacing: '-0.01em',
  },
  headlineMd: {
    fontFamily: FontFamily.display,
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '26px',
    letterSpacing: '-0.01em',
  },
  headlineSm: {
    fontFamily: FontFamily.display,
    fontSize: '17px',
    fontWeight: 600,
    lineHeight: '22px',
    letterSpacing: '0em',
  },
  bodyLg: {
    fontFamily: FontFamily.body,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    letterSpacing: '-0.01em',
  },
  bodyMd: {
    fontFamily: FontFamily.body,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '0em',
  },
  bodySm: {
    fontFamily: FontFamily.body,
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
    letterSpacing: '0.01em',
  },
  labelCodeLg: {
    fontFamily: FontFamily.mono,
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '20px',
    letterSpacing: '0.05em',
  },
  labelCodeSm: {
    fontFamily: FontFamily.mono,
    fontSize: '11px',
    fontWeight: 400,
    lineHeight: '14px',
    letterSpacing: '0.08em',
  },
  labelUi: {
    fontFamily: FontFamily.body,
    fontSize: '12px',
    fontWeight: 700,
    lineHeight: '16px',
    letterSpacing: '0.04em',
  },
} as const;
