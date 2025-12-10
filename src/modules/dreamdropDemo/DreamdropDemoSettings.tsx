import React, { useState } from 'react';
import { Card } from '../../shared/ui/Card';
import { Button } from '../../shared/ui/Button';
import { useI18n } from '../../shared/lib/i18n';
import { getValue, setValue } from '../../shared/lib/storage';
import { trackEvent } from '../../shared/lib/telemetry';

export type DreamdropSettings = {
  enableAi: boolean;
  autoSummarize: boolean;
  intensity: 'low' | 'medium' | 'high';
};

export const DREAMDROP_SETTINGS_STORAGE_KEY = 'modules.dreamdropDemo.settings';

const DEFAULT_SETTINGS: DreamdropSettings = {
  enableAi: true,
  autoSummarize: false,
  intensity: 'medium',
};

const loadSettings = (): DreamdropSettings => {
  const stored = getValue<DreamdropSettings>(DREAMDROP_SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS, ...(stored ?? {}) };
};

export const DreamdropDemoSettings: React.FC = () => {
  const { t } = useI18n();
  const [settings, setSettings] = useState<DreamdropSettings>(loadSettings);
  const [saved, setSaved] = useState(false);

  return (
    <Card>
      <form
        className="settings-section"
        onSubmit={(event) => {
          event.preventDefault();
          setValue<DreamdropSettings>(DREAMDROP_SETTINGS_STORAGE_KEY, settings);
          trackEvent('dreamdrop_demo_settings_saved', {
            enableAi: settings.enableAi,
            autoSummarize: settings.autoSummarize,
            intensity: settings.intensity,
          });
          setSaved(true);
        }}
      >
        <div>
          <h3 className="settings-layout__section-title">{t('modules.dreamdropDemo.settings.title')}</h3>
          <p className="settings-layout__muted">{t('modules.dreamdropDemo.settings.description')}</p>
        </div>

        <label className="settings-field">
          <span>{t('modules.dreamdropDemo.settings.enableAi')}</span>
          <div className="settings-checkbox">
            <input
              type="checkbox"
              checked={settings.enableAi}
              onChange={(event) => {
                setSettings((prev) => ({ ...prev, enableAi: event.target.checked }));
                setSaved(false);
              }}
            />
          </div>
        </label>

        <label className="settings-field">
          <span>{t('modules.dreamdropDemo.settings.autoSummarize')}</span>
          <div className="settings-checkbox">
            <input
              type="checkbox"
              checked={settings.autoSummarize}
              onChange={(event) => {
                setSettings((prev) => ({ ...prev, autoSummarize: event.target.checked }));
                setSaved(false);
              }}
            />
          </div>
        </label>

        <label className="settings-field" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
          <span>{t('modules.dreamdropDemo.settings.intensityLabel')}</span>
          <select
            value={settings.intensity}
            onChange={(event) => {
              setSettings((prev) => ({ ...prev, intensity: event.target.value as DreamdropSettings['intensity'] }));
              setSaved(false);
            }}
            style={{ padding: 8, borderRadius: 8, width: '100%' }}
          >
            <option value="low">{t('modules.dreamdropDemo.settings.intensityLow')}</option>
            <option value="medium">{t('modules.dreamdropDemo.settings.intensityMedium')}</option>
            <option value="high">{t('modules.dreamdropDemo.settings.intensityHigh')}</option>
          </select>
        </label>

        <div className="settings-actions">
          <Button type="submit">{t('settings.save')}</Button>
        </div>

        {saved && (
          <p className="settings-layout__muted" style={{ margin: 0 }}>
            {t('modules.dreamdropDemo.settings.saved')}
          </p>
        )}
      </form>
    </Card>
  );
};

