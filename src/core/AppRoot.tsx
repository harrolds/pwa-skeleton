import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppShell } from './AppShell';
import { I18nProvider, useI18n } from '../shared/lib/i18n';

const DESKTOP_MIN_WIDTH = 1024;

const getIsDesktopLike = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.innerWidth >= DESKTOP_MIN_WIDTH;
};

const useDesktopBlock = (): boolean => {
  const [isBlocked, setIsBlocked] = React.useState<boolean>(() => getIsDesktopLike());

  React.useEffect(() => {
    const handleResize = () => {
      setIsBlocked(getIsDesktopLike());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isBlocked;
};

const DesktopBlockScreen: React.FC = () => {
  const { t } = useI18n();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div style={{ maxWidth: 480, textAlign: 'center' }}>
        <h1 style={{ marginBottom: '0.75rem' }}>{t('desktopBlock.title')}</h1>
        <p style={{ marginBottom: '0.75rem' }}>
          {t('desktopBlock.description.primary')}
        </p>
        <p style={{ marginBottom: '1.25rem' }}>
          {t('desktopBlock.description.secondary')}
        </p>
        <div
          aria-label={t('desktopBlock.qr.placeholder')}
          style={{
            width: 160,
            height: 160,
            margin: '0 auto',
            borderRadius: 16,
            border: '2px dashed #999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
          }}
        >
          {t('desktopBlock.qr.label')}
        </div>
      </div>
    </div>
  );
};

export const AppRoot: React.FC = () => {
  const isDesktopBlocked = useDesktopBlock();

  if (isDesktopBlocked) {
    return (
      <I18nProvider>
        <DesktopBlockScreen />
      </I18nProvider>
    );
  }

  return (
    <I18nProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </I18nProvider>
  );
};
