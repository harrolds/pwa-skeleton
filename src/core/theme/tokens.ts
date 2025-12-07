import type React from 'react';

export const lightTheme = {
  colors: {
    primary: '#2563eb',
    secondary: '#64748b',
    background: '#f4f4f5',
    surface: '#ffffff',
    text: '#020617',
    accent: '#22c55e',
    border: '#e4e4e7',
    danger: '#ef4444',
  },
  typography: {
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    lineHeight: {
      normal: 1.5,
      snug: 1.4,
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
  },
  radius: {
    sm: '0.375rem',
    md: '0.75rem',
    pill: '9999px',
  },
  shadow: {
    sm: '0 1px 2px rgba(15, 23, 42, 0.06)',
    md: '0 4px 10px rgba(15, 23, 42, 0.10)',
  },
} as const;

export type LightTheme = typeof lightTheme;

export type ThemeColorKey = keyof typeof lightTheme.colors;

export const useTheme = (): typeof lightTheme => {
  // v1: enkel een statische light theme. In toekomstige versies kan dit een hook worden.
  return lightTheme;
};
