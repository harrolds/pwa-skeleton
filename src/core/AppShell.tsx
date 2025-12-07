import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from './router';

export const AppShell: React.FC = () => {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__header-left" aria-hidden="true" />
        <div className="app-shell__header-center">
          <span className="app-shell__title">PWA Skeleton</span>
        </div>
        <div className="app-shell__header-right">
          <Link
            to="/notifications"
            aria-label="Notificaties"
            className="app-shell__icon-button"
          >
            🔔
          </Link>
          <Link
            to="/settings"
            aria-label="Instellingen"
            className="app-shell__icon-button"
          >
            ⚙️
          </Link>
        </div>
      </header>
      <main className="app-shell__main">
        <AppRoutes />
      </main>
    </div>
  );
};
