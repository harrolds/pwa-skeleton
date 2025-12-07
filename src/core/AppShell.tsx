import React from 'react';
import { AppRoutes } from './router';
import { useNavigation } from '../shared/lib/navigation/useNavigation';
import { Button } from '../shared/ui/Button';
import { useI18n } from '../shared/lib/i18n';

export const AppShell: React.FC = () => {
  const { openNotifications, openSettings } = useNavigation();
  const { t } = useI18n();

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__header-left" aria-hidden="true" />
        <div className="app-shell__header-center">
          <span className="app-shell__title">{t('app.title')}</span>
        </div>
        <div className="app-shell__header-right">
          <Button
            type="button"
            onClick={openNotifications}
            aria-label={t('app.header.notifications')}
            className="app-shell__icon-button"
            variant="ghost"
          >
            🔔
          </Button>
          <Button
            type="button"
            onClick={openSettings}
            aria-label={t('app.header.settings')}
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
