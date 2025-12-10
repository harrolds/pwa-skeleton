import React, { useState } from 'react';
import { Card } from '../../shared/ui/Card';
import { TextInput } from '../../shared/ui/TextInput';
import { Button } from '../../shared/ui/Button';
import { useI18n } from '../../shared/lib/i18n';
import { getValue, setValue } from '../../shared/lib/storage';
import { trackEvent } from '../../shared/lib/telemetry';

export type RiskRadarSettings = {
  threshold: number;
  showHighRiskOnly: boolean;
};

export const RISK_RADAR_SETTINGS_STORAGE_KEY = 'modules.riskRadarDemo.settings';

const DEFAULT_SETTINGS: RiskRadarSettings = {
  threshold: 60,
  showHighRiskOnly: false,
};

const loadSettings = (): RiskRadarSettings => {
  const stored = getValue<RiskRadarSettings>(RISK_RADAR_SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS, ...(stored ?? {}) };
};

export const RiskRadarDemoSettings: React.FC = () => {
  const { t } = useI18n();
  const [settings, setSettings] = useState<RiskRadarSettings>(loadSettings);
  const [saved, setSaved] = useState(false);

  return (
    <Card>
      <form
        className="settings-section"
        onSubmit={(event) => {
          event.preventDefault();
          setValue<RiskRadarSettings>(RISK_RADAR_SETTINGS_STORAGE_KEY, settings);
          trackEvent('riskradar_demo_settings_saved', {
            threshold: settings.threshold,
            showHighRiskOnly: settings.showHighRiskOnly,
          });
          setSaved(true);
        }}
      >
        <div>
          <h3 className="settings-layout__section-title">{t('modules.riskRadarDemo.settings.title')}</h3>
          <p className="settings-layout__muted">{t('modules.riskRadarDemo.settings.description')}</p>
        </div>

        <label className="settings-field" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
          <span>{t('modules.riskRadarDemo.settings.thresholdLabel')}</span>
          <TextInput
            type="number"
            min={0}
            value={settings.threshold}
            onChange={(event) => {
              setSettings((prev) => ({ ...prev, threshold: Number(event.target.value) || 0 }));
              setSaved(false);
            }}
          />
        </label>

        <label className="settings-field">
          <span>{t('modules.riskRadarDemo.settings.showHighRiskOnly')}</span>
          <div className="settings-checkbox">
            <input
              type="checkbox"
              checked={settings.showHighRiskOnly}
              onChange={(event) => {
                setSettings((prev) => ({ ...prev, showHighRiskOnly: event.target.checked }));
                setSaved(false);
              }}
            />
          </div>
        </label>

        <div className="settings-actions">
          <Button type="submit">{t('settings.save')}</Button>
        </div>

        {saved && (
          <p className="settings-layout__muted" style={{ margin: 0 }}>
            {t('modules.riskRadarDemo.settings.saved')}
          </p>
        )}
      </form>
    </Card>
  );
};

