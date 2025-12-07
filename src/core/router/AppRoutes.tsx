import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigation } from '../../shared/lib/navigation/useNavigation';

const HomeScreen: React.FC = () => {
  const { openNotifications, openSettings } = useNavigation();

  return (
    <div>
      <h2>Home</h2>
      <p>Dit is het standaard startscherm van de Skeleton v1 PWA.</p>
      <div>
        <button type="button" onClick={openNotifications}>
          Ga naar notificaties
        </button>
        <button type="button" onClick={openSettings}>
          Ga naar instellingen
        </button>
      </div>
    </div>
  );
};

const NotificationsScreen: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <div>
      <h2>Notifications</h2>
      <p>Hier komen notificaties en meldingen te staan.</p>
      <button type="button" onClick={goBack}>
        Terug
      </button>
    </div>
  );
};

const SettingsScreen: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <div>
      <h2>Settings</h2>
      <p>Hier kunnen basisinstellingen voor de app worden beheerd.</p>
      <button type="button" onClick={goBack}>
        Terug
      </button>
    </div>
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/notifications" element={<NotificationsScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
