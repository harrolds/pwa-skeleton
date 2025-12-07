import React from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useTheme } from '../../core/theme/tokens';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: ReactNode;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const theme = useTheme();
  const { colors, radius, spacing, shadow, typography } = theme;

  if (!isOpen) {
    return null;
  }

  const overlayStyle: CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    zIndex: 50,
  };

  const containerStyle: CSSProperties = {
    width: '100%',
    maxWidth: '28rem',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    boxShadow: shadow.md,
    padding: spacing.lg,
  };

  const titleStyle: CSSProperties = {
    marginBottom: spacing.md,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  };

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true">
      <div style={containerStyle}>
        {title ? <div style={titleStyle}>{title}</div> : null}
        <div>{children}</div>
        {onClose ? (
          <div style={{ marginTop: spacing.lg, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="button" variant="secondary" onClick={onClose}>
              Sluiten
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
