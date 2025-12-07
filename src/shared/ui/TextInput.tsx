import React from 'react';
import type { CSSProperties, InputHTMLAttributes } from 'react';
import { useTheme } from '../../core/theme/tokens';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ style, ...rest }, ref) => {
    const theme = useTheme();
    const { colors, radius, spacing, typography } = theme;

    const baseStyle: CSSProperties = {
      width: '100%',
      padding: `${spacing.sm} ${spacing.md}`,
      borderRadius: radius.md,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colors.border,
      backgroundColor: colors.surface,
      color: colors.text,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize.base,
      lineHeight: typography.lineHeight.normal,
      outline: 'none',
    };

    return <input ref={ref} {...rest} style={{ ...baseStyle, ...style }} />;
  }
);

TextInput.displayName = 'TextInput';
