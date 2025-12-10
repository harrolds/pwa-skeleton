import React from 'react';
import { Card } from '../../shared/ui/Card';
import { Button } from '../../shared/ui/Button';
import { useI18n } from '../../shared/lib/i18n';
import { useNavigation } from '../../shared/lib/navigation/useNavigation';
import { useThemeController } from '../theme/ThemeProvider';
import { usePanels } from '../../shared/lib/panels';
import { usePipeline, demoPipeline, type DemoPipelineOutput } from '../../shared/lib/pipeline';

export const GlobalSettingsScreen: React.FC = () => {
  const { goBack } = useNavigation();
  const { t } = useI18n();
  const { preference, resolvedMode, setPreference } = useThemeController();
  const { openLeftPanel, openBottomSheet } = usePanels();
  const {
    run: runDemoPipeline,
    lastJob: lastDemoJob,
    isRunning: isDemoRunning,
    error: demoError,
  } = usePipeline<{ refresh?: boolean }, DemoPipelineOutput>(demoPipeline);

  const themeOptions: Array<{ value: 'system' | 'light' | 'dark'; label: string }> = [
    { value: 'system', label: t('settings.theme.system') },
    { value: 'light', label: t('settings.theme.light') },
    { value: 'dark', label: t('settings.theme.dark') },
  ];

  return (
    <>
      <Card>
        <div className="settings-section">
          <div>
            <h2 className="settings-layout__title">{t('settings.title')}</h2>
            <p className="settings-layout__description">{t('settings.global.description')}</p>
          </div>
          <div className="settings-actions">
            <Button type="button" onClick={() => openLeftPanel('demo-settings')}>
              Open demo panel
            </Button>
            <Button type="button" variant="secondary" onClick={() => openBottomSheet('demo-settings')}>
              Open demo sheet
            </Button>
            <Button type="button" variant="secondary" onClick={goBack}>
              {t('settings.back')}
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="settings-section">
          <div className="settings-field">
            <h3 className="settings-layout__section-title">{t('settings.theme.title')}</h3>
            <p className="settings-layout__description">{t('settings.theme.description')}</p>
          </div>

          <div className="settings-field" role="radiogroup" aria-label={t('settings.theme.title')}>
            {themeOptions.map((option) => (
              <label key={option.value} className="settings-radio">
                <input
                  type="radio"
                  name="themePreference"
                  value={option.value}
                  checked={preference === option.value}
                  onChange={() => setPreference(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>

          <p className="settings-layout__muted">
            {t('settings.theme.active', {
              value:
                resolvedMode === 'dark' ? t('settings.theme.dark') : t('settings.theme.light'),
            })}
          </p>
        </div>
      </Card>

      <Card>
        <section className="settings-section">
          <h2 className="settings-section__title">{t('settings.pipelineDemo.title')}</h2>
          <p className="settings-section__description">{t('settings.pipelineDemo.description')}</p>

          <div className="settings-section__row">
            <Button type="button" onClick={() => runDemoPipeline({ refresh: true })} disabled={isDemoRunning}>
              {isDemoRunning ? t('settings.pipelineDemo.buttonRunning') : t('settings.pipelineDemo.buttonLabel')}
            </Button>
          </div>

          {demoError && (
            <p className="settings-section__error">
              {t('settings.pipelineDemo.errorPrefix')} {demoError}
            </p>
          )}

          {lastDemoJob?.result && (
            <div className="settings-section__result">
              <p>
                {t('settings.pipelineDemo.resultMessage')}{' '}
                <strong>{lastDemoJob.result.uppercasedMessage}</strong>
              </p>
              <p>
                {t('settings.pipelineDemo.resultTimestamp')}{' '}
                <code>{lastDemoJob.result.timestamp}</code>
              </p>
              <p>
                {t('settings.pipelineDemo.resultStatus')}{' '}
                <code>{lastDemoJob.status}</code>
              </p>
            </div>
          )}
        </section>
      </Card>
    </>
  );
};

