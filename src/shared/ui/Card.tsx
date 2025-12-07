import React from 'react';
import type { CSSProperties, HTMLAttributes } from 'react';
import { useTheme } from '../../core/theme/tokens';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ style, children, ...rest }) => {
  const theme = useTheme();
  const { colors, radius, spacing, shadow } = theme;

  const baseStyle: CSSProperties = {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    boxShadow: shadow.sm,
  };

  return (
    <div {...rest} style={{ ...baseStyle, ...style }}>
      {children}
    </div>
  );
};
