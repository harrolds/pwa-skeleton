import React from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { useTheme } from '../../core/theme/tokens';

type BadgeVariant = 'default' | 'accent' | 'outline';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'default', style, children, ...rest }) => {
  const theme = useTheme();
  const { colors, radius, spacing, typography } = theme;

  let backgroundColor: CSSProperties['backgroundColor'] = colors.background;
  let borderColor: CSSProperties['borderColor'] = 'transparent';
  let color: CSSProperties['color'] = colors.text;

  if (variant === 'accent') {
    backgroundColor = colors.accent;
    color = '#ffffff';
  }

  if (variant === 'outline') {
    backgroundColor = 'transparent';
    borderColor = colors.border;
  }

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: radius.pill,
    backgroundColor,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor,
    color,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.lineHeight.normal,
    whiteSpace: 'nowrap',
  };

  return (
    <span {...rest} style={{ ...baseStyle, ...style }}>
      {children}
    </span>
  );
};
