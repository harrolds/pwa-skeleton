import React, { useState } from 'react';
import { Card } from '../../shared/ui/Card';
import { TextInput } from '../../shared/ui/TextInput';
import { Button } from '../../shared/ui/Button';
import { useI18n } from '../../shared/lib/i18n';

export const NotesSettings: React.FC = () => {
  const { t } = useI18n();
  const [autoFocusEnabled, setAutoFocusEnabled] = useState(true);
  const [defaultTitle, setDefaultTitle] = useState('');

  return (
    <Card>
      <form
        className="settings-section"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div>
          <h3 className="settings-layout__section-title">{t('modules.notes.settings.title')}</h3>
          <p className="settings-layout__muted">{t('modules.notes.settings.description')}</p>
        </div>

        <label className="settings-field">
          <span>{t('modules.notes.settings.autoFocusLabel')}</span>
          <div className="settings-checkbox">
            <input
              type="checkbox"
              checked={autoFocusEnabled}
              onChange={(event) => setAutoFocusEnabled(event.target.checked)}
            />
            <span className="settings-layout__muted">
              {autoFocusEnabled
                ? t('modules.notes.settings.autoFocusOn')
                : t('modules.notes.settings.autoFocusOff')}
            </span>
          </div>
        </label>

        <label className="settings-field">
          <span>{t('modules.notes.settings.defaultTitleLabel')}</span>
          <TextInput
            value={defaultTitle}
            onChange={(event) => setDefaultTitle(event.target.value)}
            placeholder={t('modules.notes.settings.defaultTitlePlaceholder')}
          />
        </label>

        <div className="settings-actions">
          <Button type="submit">{t('settings.save')}</Button>
        </div>
      </form>
    </Card>
  );
};

