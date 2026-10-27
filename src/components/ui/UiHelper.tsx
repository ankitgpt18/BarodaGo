import React from 'react';
import AppColors from '../../constants/colors';
import { FontFamily } from '../../constants/typography';

/**
 * CivicText — Reusable text component
 * Mirrors Blinkit's UiHelper.CustomText pattern.
 */
interface CivicTextProps {
  text: string;
  color?: string;
  fontWeight?: number | string;
  fontSize?: number | string;
  fontFamily?: 'display' | 'body' | 'mono';
  letterSpacing?: string;
  lineHeight?: string;
  className?: string;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'label';
  uppercase?: boolean;
}

export function CivicText({
  text,
  color = AppColors.onSurface,
  fontWeight = 400,
  fontSize = 14,
  fontFamily = 'body',
  letterSpacing,
  lineHeight,
  className = '',
  as: Tag = 'span',
  uppercase = false,
}: CivicTextProps) {
  const family = fontFamily === 'display' ? FontFamily.display
    : fontFamily === 'mono' ? FontFamily.mono
    : FontFamily.body;

  return (
    <Tag
      className={className}
      style={{
        fontFamily: family,
        fontWeight,
        fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize,
        color,
        letterSpacing,
        lineHeight,
        textTransform: uppercase ? 'uppercase' : undefined,
        margin: 0,
      }}
    >
      {text}
    </Tag>
  );
}

/**
 * CivicButton — Primary, Secondary, and Danger buttons
 * Mirrors Blinkit's inline ElevatedButton pattern.
 */
interface CivicButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export function CivicButton({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  className = '',
}: CivicButtonProps) {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: FontFamily.body,
    fontWeight: 700,
    borderRadius: '8px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease',
    width: fullWidth ? '100%' : undefined,
    opacity: disabled ? 0.5 : 1,
  };

  const sizeMap = {
    sm: { height: '36px', padding: '0 16px', fontSize: '12px' },
    md: { height: '44px', padding: '0 20px', fontSize: '14px' },
    lg: { height: '52px', padding: '0 24px', fontSize: '16px' },
  };

  const variantMap: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: AppColors.secondaryBright,
      color: AppColors.onSecondary,
    },
    secondary: {
      backgroundColor: 'transparent',
      color: AppColors.primaryContainer,
      border: `1.5px solid ${AppColors.primaryContainer}`,
    },
    danger: {
      backgroundColor: AppColors.errorBright,
      color: AppColors.onError,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: AppColors.primaryContainer,
    },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        ...baseStyles,
        ...sizeMap[size],
        ...variantMap[variant],
      }}
    >
      {icon && iconPosition === 'left' && icon}
      {label}
      {icon && iconPosition === 'right' && icon}
    </button>
  );
}

/**
 * StatusPill — Category and status chips
 * Active state: solid Banyan Green fill. Inactive: Cream Linen surface with sand border.
 */
interface StatusPillProps {
  label: string;
  active?: boolean;
  color?: 'green' | 'red' | 'amber' | 'default';
  onClick?: () => void;
  size?: 'sm' | 'md';
  count?: number;
}

export function StatusPill({
  label,
  active = false,
  color = 'default',
  onClick,
  size = 'sm',
  count,
}: StatusPillProps) {
  const colorStyles: Record<string, { bg: string; text: string }> = {
    default: {
      bg: active ? AppColors.primaryContainer : AppColors.surfaceContainerLow,
      text: active ? AppColors.onPrimary : AppColors.onSurface,
    },
    green: {
      bg: active ? AppColors.primaryContainer : AppColors.primarySurface,
      text: active ? AppColors.onPrimary : AppColors.primaryContainer,
    },
    red: {
      bg: active ? AppColors.secondaryBright : AppColors.secondaryFixed,
      text: active ? AppColors.onSecondary : AppColors.secondary,
    },
    amber: {
      bg: active ? AppColors.tertiaryBright : AppColors.tertiaryFixed,
      text: active ? AppColors.onTertiary : AppColors.tertiaryContainer,
    },
  };

  const { bg, text } = colorStyles[color];
  const isSmall = size === 'sm';

  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: bg,
        color: text,
        border: active ? 'none' : `1px solid ${AppColors.sandBorder}`,
        borderRadius: '9999px',
        padding: isSmall ? '4px 10px' : '6px 14px',
        fontSize: isSmall ? '11px' : '12px',
        fontWeight: 700,
        fontFamily: FontFamily.body,
        letterSpacing: '0.04em',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.15s ease',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
      {count !== undefined && (
        <span
          style={{
            backgroundColor: active ? 'rgba(255,255,255,0.25)' : AppColors.sandBorder,
            borderRadius: '9999px',
            padding: '1px 6px',
            fontSize: '10px',
            fontWeight: 600,
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/**
 * CivicTextField — Input field with warm sand background
 * Mirrors Blinkit's UiHelper.CustomTextField pattern.
 */
interface CivicTextFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

export function CivicTextField({
  value,
  onChange,
  placeholder = 'Search...',
  icon,
  suffixIcon,
}: CivicTextFieldProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        height: '44px',
        backgroundColor: AppColors.sand,
        border: `1px solid ${AppColors.sandBorder}`,
        borderRadius: '8px',
        padding: '0 12px',
        width: '100%',
        transition: 'border-color 0.15s ease, background-color 0.15s ease',
      }}
    >
      {icon && <span style={{ color: AppColors.textMuted, flexShrink: 0 }}>{icon}</span>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          backgroundColor: 'transparent',
          fontFamily: FontFamily.body,
          fontSize: '14px',
          color: AppColors.onSurface,
        }}
      />
      {suffixIcon && <span style={{ color: AppColors.textMuted, flexShrink: 0 }}>{suffixIcon}</span>}
    </div>
  );
}

/**
 * CivicImage — Image wrapper with consistent sizing and border radius
 * Mirrors Blinkit's UiHelper.CustomImage pattern.
 */
interface CivicImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  borderRadius?: string;
  objectFit?: React.CSSProperties['objectFit'];
  className?: string;
}

export function CivicImage({
  src,
  alt = '',
  width,
  height,
  borderRadius = '6px',
  objectFit = 'cover',
  className = '',
}: CivicImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        width,
        height,
        borderRadius,
        objectFit,
        display: 'block',
      }}
    />
  );
}

/**
 * CivicDivider — Ticket stub perforation line or simple divider
 */
export function CivicDivider({ perforated = false }: { perforated?: boolean }) {
  if (perforated) {
    return <div className="ticket-perforation" />;
  }
  return (
    <div style={{
      height: '1px',
      backgroundColor: AppColors.sandBorder,
      width: '100%',
    }} />
  );
}

/**
 * CivicAvatar — User profile circle
 */
interface CivicAvatarProps {
  name?: string;
  size?: number;
  src?: string;
}

export function CivicAvatar({ name = 'U', size = 36, src }: CivicAvatarProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          objectFit: 'cover',
          border: `2px solid ${AppColors.sandBorder}`,
        }}
      />
    );
  }

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: AppColors.primaryContainer,
        color: AppColors.onPrimary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FontFamily.body,
        fontWeight: 700,
        fontSize: size * 0.38,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

/**
 * MonoCode — Monospaced civic telemetry text (ticket numbers, OTP, timestamps)
 */
export function MonoCode({
  text,
  color = AppColors.primaryContainer,
  fontSize = 11,
  className = '',
}: {
  text: string;
  color?: string;
  fontSize?: number;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        fontFamily: FontFamily.mono,
        fontSize,
        fontWeight: 700,
        letterSpacing: '0.05em',
        color,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {text}
    </span>
  );
}
