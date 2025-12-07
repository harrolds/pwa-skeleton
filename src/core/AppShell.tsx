import React from 'react';
import { AppRoutes } from './router';
import { useNavigation } from '../shared/lib/navigation/useNavigation';
import { Button } from '../shared/ui/Button';

export const AppShell: React.FC = () => {
  const { openNotifications, openSettings } = useNavigation();

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__header-left" aria-hidden="true" />
        <div className="app-shell__header-center">
          <span className="app-shell__title">PWA Skeleton</span>
        </div>
        <div className="app-shell__header-right">
          <Button
            type="button"
            onClick={openNotifications}
            aria-label="Notificaties"
            className="app-shell__icon-button"
            variant="ghost"
          >
            🔔
          </Button>
          <Button
            type="button"
            onClick={openSettings}
            aria-label="Instellingen"
            className="app-shell__icon-button"
            variant="ghost"
          >
            ⚙️
          </Button>
        </div>
      </header>
      <main className="app-shell__main">
        <AppRoutes />
      </main>
    </div>
  );
};
