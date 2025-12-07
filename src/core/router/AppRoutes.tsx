import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useNavigation } from '../../shared/lib/navigation/useNavigation';
import { Button } from '../../shared/ui/Button';
import { useI18n } from '../../shared/lib/i18n';

const HomeScreen: React.FC = () => {
  const { openNotifications, openSettings } = useNavigation();
  const { t } = useI18n();

  return (
    <div>
      <h2>{t('home.title')}</h2>
      <p>{t('home.description')}</p>
      <div>
        <Button type="button" onClick={openNotifications}>
          {t('home.goToNotifications')}
        </Button>
        <Button type="button" onClick={openSettings} variant="secondary">
          {t('home.goToSettings')}
        </Button>
      </div>
    </div>
  );
};

const NotificationsScreen: React.FC = () => {
  const { goBack } = useNavigation();
  const { t } = useI18n();

  return (
    <div>
      <h2>{t('notifications.title')}</h2>
      <p>{t('notifications.description')}</p>
      <Button type="button" onClick={goBack} variant="secondary">
        {t('common.back')}
      </Button>
    </div>
  );
};

const SettingsScreen: React.FC = () => {
  const { goBack } = useNavigation();
  const { t } = useI18n();

  return (
    <div>
      <h2>{t('settings.title')}</h2>
      <p>{t('settings.description')}</p>
      <Button type="button" onClick={goBack} variant="secondary">
        {t('common.back')}
      </Button>
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
