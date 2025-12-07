import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppShell } from './AppShell';

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
        <h1 style={{ marginBottom: '0.75rem' }}>PWA Skeleton v1</h1>
        <p style={{ marginBottom: '0.75rem' }}>
          Deze PWA is geoptimaliseerd voor gebruik op een mobiel toestel of tablet in portretstand.
        </p>
        <p style={{ marginBottom: '1.25rem' }}>
          Open deze pagina op je telefoon of scan de QR-code hieronder om de app te gebruiken.
        </p>
        <div
          aria-label="QR-code placeholder"
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
          QR-code
        </div>
      </div>
    </div>
  );
};

export const AppRoot: React.FC = () => {
  const isDesktopBlocked = useDesktopBlock();

  if (isDesktopBlocked) {
    return <DesktopBlockScreen />;
  }

  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
};
