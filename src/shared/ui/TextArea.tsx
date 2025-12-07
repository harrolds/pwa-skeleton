import React from 'react';
import type { CSSProperties, TextareaHTMLAttributes } from 'react';
import { useTheme } from '../../core/theme/tokens';

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ style, rows = 4, ...rest }, ref) => {
    const theme = useTheme();
    const { colors, radius, spacing, typography } = theme;

    const baseStyle: CSSProperties = {
      width: '100%',
      minHeight: '5rem',
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
      resize: 'vertical',
      outline: 'none',
    };

    return <textarea ref={ref} rows={rows} {...rest} style={{ ...baseStyle, ...style }} />;
  }
);

TextArea.displayName = 'TextArea';
