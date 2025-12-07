import React from 'react';
import type { CSSProperties, ButtonHTMLAttributes } from 'react';
import { useTheme } from '../../core/theme/tokens';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  fullWidth,
  style,
  children,
  ...rest
}) => {
  const theme = useTheme();
  const { colors, radius, spacing, typography, shadow } = theme;

  let backgroundColor = colors.primary;
  let color = '#ffffff';
  let borderColor = colors.primary;

  if (variant === 'secondary') {
    backgroundColor = colors.surface;
    color = colors.text;
    borderColor = colors.border;
  }

  if (variant === 'ghost') {
    backgroundColor = 'transparent';
    color = colors.text;
    borderColor = 'transparent';
  }

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: radius.md,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor,
    backgroundColor,
    color,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.snug,
    cursor: 'pointer',
    width: fullWidth ? '100%' : undefined,
    boxShadow: variant === 'ghost' ? 'none' : shadow.sm,
    transition:
      'background-color 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease, transform 0.1s ease',
  };

  const [isPressed, setIsPressed] = React.useState(false);

  const composedStyle: CSSProperties = {
    ...baseStyle,
    ...(isPressed
      ? {
          transform: 'translateY(1px)',
          boxShadow: variant === 'ghost' ? 'none' : shadow.md,
        }
      : null),
    ...style,
  };

  return (
    <button
      type={rest.type ?? 'button'}
      {...rest}
      style={composedStyle}
      onMouseDown={(event) => {
        setIsPressed(true);
        rest.onMouseDown?.(event);
      }}
      onMouseUp={(event) => {
        setIsPressed(false);
        rest.onMouseUp?.(event);
      }}
      onMouseLeave={(event) => {
        setIsPressed(false);
        rest.onMouseLeave?.(event);
      }}
    >
      {children}
    </button>
  );
};
