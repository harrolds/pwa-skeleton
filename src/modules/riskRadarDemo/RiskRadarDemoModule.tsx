import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Card } from '../../shared/ui/Card';
import { TextInput } from '../../shared/ui/TextInput';
import { Button } from '../../shared/ui/Button';
import { Badge } from '../../shared/ui/Badge';
import { List, ListItem } from '../../shared/ui/List';
import { useI18n } from '../../shared/lib/i18n';
import { useNavigation } from '../../shared/lib/navigation/useNavigation';
import { get } from '../../shared/lib/api';
import { usePipeline, type PipelineDefinition } from '../../shared/lib/pipeline';
import { trackEvent } from '../../shared/lib/telemetry';
import { getValue } from '../../shared/lib/storage';
import {
  RISK_RADAR_SETTINGS_STORAGE_KEY,
  type RiskRadarSettings,
} from './RiskRadarDemoSettings';

interface RiskSourceItem {
  id: string;
  name: string;
  baseScore: number;
  volatility: number;
}

export interface RiskRadarResultItem {
  id: string;
  name: string;
  score: number;
  volatility: number;
  isHighRisk: boolean;
}

interface RiskPipelineInput {
  minScore: number;
  highRiskOnly: boolean;
  threshold: number;
}

interface RiskPipelineOutput {
  items: RiskRadarResultItem[];
}

const DATA_PATH = '/mock/risk-radar-demo.json';

const DEFAULT_SETTINGS: RiskRadarSettings = {
  threshold: 60,
  showHighRiskOnly: false,
};

const loadSettings = (): RiskRadarSettings => {
  const stored = getValue<RiskRadarSettings>(RISK_RADAR_SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS, ...(stored ?? {}) };
};

const riskRadarPipeline: PipelineDefinition<RiskPipelineInput, RiskPipelineOutput> = {
  id: 'risk-radar-demo',
  description: 'Fetch mock risk data, compute scores and filter based on user input.',
  run: async (input, ctx) => {
    ctx.track('riskradar_demo_pipeline_start', {
      minScore: input.minScore,
      highRiskOnly: input.highRiskOnly,
    });

    const data = await get<RiskSourceItem[]>(DATA_PATH);
    const scored = data.map<RiskRadarResultItem>((item) => {
      const score = Math.round(item.baseScore * (1 + item.volatility));
      return {
        id: item.id,
        name: item.name,
        score,
        volatility: item.volatility,
        isHighRisk: score >= input.threshold,
      };
    });

    const filtered = scored.filter((item) => {
      if (input.highRiskOnly && !item.isHighRisk) {
        return false;
      }
      return item.score >= input.minScore;
    });

    ctx.track('riskradar_demo_pipeline_success', {
      sourceCount: data.length,
      filteredCount: filtered.length,
    });

    return { items: filtered };
  },
};

export const RiskRadarDemoModule: React.FC = () => {
  const { t } = useI18n();
  const { openModuleSettings } = useNavigation();
  const [settings, setSettings] = useState<RiskRadarSettings>(loadSettings);
  const [minScore, setMinScore] = useState<number>(settings.threshold);
  const [highRiskOnly, setHighRiskOnly] = useState<boolean>(settings.showHighRiskOnly);
  const hasInitialized = useRef(false);

  const { run, lastJob, isRunning, error } = usePipeline<RiskPipelineInput, RiskPipelineOutput>(
    riskRadarPipeline,
  );

  const recalc = useCallback(
    async (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      const currentSettings = loadSettings();
      setSettings(currentSettings);

      const filterCount =
        (minScore > 0 ? 1 : 0) + (highRiskOnly ? 1 : 0) + (currentSettings.threshold ? 1 : 0);

      const job = await run({
        minScore: Number.isFinite(minScore) ? minScore : 0,
        highRiskOnly,
        threshold: currentSettings.threshold,
      });

      trackEvent('riskradar_demo_pipeline_run', {
        filterCount,
        itemCount: job.result?.items.length ?? 0,
      });
    },
    [highRiskOnly, minScore, run],
  );

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }
    hasInitialized.current = true;
    recalc().catch(() => {
      // handled by hook error state
    });
  }, [recalc]);

  const items = lastJob?.result?.items ?? [];

  const badgeForScore = useCallback(
    (score: number, isHighRisk: boolean) => (
      <Badge variant={isHighRisk ? 'accent' : 'outline'}>
        {t('modules.riskRadarDemo.list.scoreValue', { value: score })}
      </Badge>
    ),
    [t],
  );

  return (
    <section aria-labelledby="risk-radar-title">
      <Card>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
            marginBottom: 12,
          }}
        >
          <div>
            <h3 id="risk-radar-title" style={{ margin: 0 }}>
              {t('modules.riskRadarDemo.title')}
            </h3>
            <p style={{ margin: 0 }}>{t('modules.riskRadarDemo.description')}</p>
          </div>
          <Button variant="secondary" onClick={() => openModuleSettings('riskRadarDemo')}>
            {t('modules.riskRadarDemo.form.settingsCta')}
          </Button>
        </header>

        <form
          onSubmit={recalc}
          style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}
        >
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span>{t('modules.riskRadarDemo.form.minScoreLabel')}</span>
            <TextInput
              type="number"
              min={0}
              value={minScore}
              onChange={(event) => setMinScore(Number(event.target.value) || 0)}
              placeholder={t('modules.riskRadarDemo.form.minScorePlaceholder')}
            />
          </label>

          <label className="settings-checkbox" style={{ alignItems: 'center', gap: 8 }}>
            <input
              type="checkbox"
              checked={highRiskOnly}
              onChange={(event) => setHighRiskOnly(event.target.checked)}
            />
            <span>{t('modules.riskRadarDemo.settings.showHighRiskOnly')}</span>
          </label>

          <Button type="submit" variant="primary" disabled={isRunning}>
            {isRunning
              ? t('modules.riskRadarDemo.form.recalculateRunning')
              : t('modules.riskRadarDemo.form.recalculateButton')}
          </Button>
          {error && (
            <p className="settings-section__error" style={{ margin: 0 }}>
              {error}
            </p>
          )}
        </form>

        {items.length > 0 ? (
          <List aria-label={t('modules.riskRadarDemo.list.aria')}>
            {items.map((item) => (
              <ListItem
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 8,
                  border: '1px solid rgba(0,0,0,0.05)',
                  borderRadius: 8,
                }}
              >
                <div>
                  <strong>{item.name}</strong>
                  <p style={{ margin: 0 }}>
                    {t('modules.riskRadarDemo.list.header.volatility')}:{' '}
                    {item.volatility.toFixed(2)}
                  </p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 4,
                  }}
                >
                  {badgeForScore(item.score, item.isHighRisk)}
                  {item.isHighRisk && (
                    <Badge variant="accent">{t('modules.riskRadarDemo.list.highRisk')}</Badge>
                  )}
                </div>
              </ListItem>
            ))}
          </List>
        ) : (
          <p style={{ margin: 0 }}>{t('modules.riskRadarDemo.list.empty')}</p>
        )}
      </Card>
    </section>
  );
};
