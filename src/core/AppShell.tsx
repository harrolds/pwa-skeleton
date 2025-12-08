import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppRoutes } from './router';
import { AppFooter } from './AppFooter';
import { useNavigation } from '../shared/lib/navigation/useNavigation';
import { Button } from '../shared/ui/Button';
import { useI18n } from '../shared/lib/i18n';
import type { ScreenAction } from './screenConfig';
import { getScreenConfigByPath } from '../config/navigation';

export const AppShell: React.FC = () => {
  const location = useLocation();
  const { goTo, goBack, openNotifications, openSettings } = useNavigation();
  const { t } = useI18n();

  const screenConfig = getScreenConfigByPath(location.pathname);
  const titleKey = screenConfig?.titleKey ?? 'app.title';

  const handleActionClick = (action: ScreenAction) => {
    if (action.navigationTarget) {
      switch (action.navigationTarget) {
        case 'home':
        case 'notifications':
        case 'settings':
          goTo(action.navigationTarget);
          return;
        default:
          goTo(action.navigationTarget);
          return;
      }
    }

    switch (action.id) {
      case 'openNotifications':
        openNotifications();
        return;
      case 'openSettings':
        openSettings();
        return;
      case 'goBack':
        goBack();
        return;
      default:
        return;
    }
  };

  const getActionIcon = (action: ScreenAction): string => {
    switch (action.icon) {
      case 'notifications':
        return '🔔';
      case 'settings':
        return '⚙️';
      case 'back':
        return '←';
      default:
        return '⋯';
    }
  };

  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__header-left" aria-hidden="true" />
        <div className="app-shell__header-center">
          <span className="app-shell__title">{t(titleKey)}</span>
        </div>
        <div className="app-shell__header-right">
          {screenConfig?.actions?.map((action) => (
            <Button
              key={action.id}
              type="button"
              onClick={() => handleActionClick(action)}
              aria-label={t(action.labelKey)}
              className="app-shell__icon-button"
              variant="ghost"
            >
              <span aria-hidden="true">{getActionIcon(action)}</span>
            </Button>
          ))}
        </div>
      </header>
      <main className="app-shell__main">
        <AppRoutes />
      </main>
      <AppFooter />
    </div>
  );
};
