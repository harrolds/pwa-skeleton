import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const HomeScreen: React.FC = () => {
  return (
    <div>
      <h2>Home</h2>
      <p>Dit is het standaard startscherm van de Skeleton v1 PWA.</p>
    </div>
  );
};

const NotificationsScreen: React.FC = () => {
  return (
    <div>
      <h2>Notifications</h2>
      <p>Hier komen notificaties en meldingen te staan.</p>
    </div>
  );
};

const SettingsScreen: React.FC = () => {
  return (
    <div>
      <h2>Settings</h2>
      <p>Hier kunnen basisinstellingen voor de app worden beheerd.</p>
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
