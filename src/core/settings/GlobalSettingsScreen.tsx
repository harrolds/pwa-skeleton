import React from 'react';
import { Card } from '../../shared/ui/Card';
import { Button } from '../../shared/ui/Button';
import { useI18n } from '../../shared/lib/i18n';
import { useNavigation } from '../../shared/lib/navigation/useNavigation';

export const GlobalSettingsScreen: React.FC = () => {
  const { goBack } = useNavigation();
  const { t } = useI18n();

  return (
    <Card>
      <div className="settings-section">
        <div>
          <h2 className="settings-layout__title">{t('settings.title')}</h2>
          <p className="settings-layout__description">{t('settings.global.description')}</p>
        </div>
        <div className="settings-actions">
          <Button type="button" variant="secondary" onClick={goBack}>
            {t('settings.back')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

