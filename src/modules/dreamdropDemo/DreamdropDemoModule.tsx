import React, { useCallback, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Card } from '../../shared/ui/Card';
import { TextInput } from '../../shared/ui/TextInput';
import { TextArea } from '../../shared/ui/TextArea';
import { Button } from '../../shared/ui/Button';
import { Badge } from '../../shared/ui/Badge';
import { useI18n } from '../../shared/lib/i18n';
import { useNavigation } from '../../shared/lib/navigation/useNavigation';
import { getItems, setItems, getValue } from '../../shared/lib/storage';
import { runAiTask, type AiRequest, type AiResult } from '../../shared/lib/ai';
import { trackEvent } from '../../shared/lib/telemetry';
import { DREAMDROP_SETTINGS_STORAGE_KEY, type DreamdropSettings } from './DreamdropDemoSettings';

type Mood = 'calm' | 'neutral' | 'intense';

interface DreamEntry {
  id: string;
  title: string;
  text: string;
  mood: Mood;
  createdAt: string;
}

const STORAGE_KEY = 'modules.dreamdropDemo.entries';
const DEFAULT_SETTINGS: DreamdropSettings = {
  enableAi: true,
  autoSummarize: false,
  intensity: 'medium',
};

const loadSettings = (): DreamdropSettings => {
  const stored = getValue<DreamdropSettings>(DREAMDROP_SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS);
  return { ...DEFAULT_SETTINGS, ...(stored ?? {}) };
};

const createEntry = (title: string, text: string, mood: Mood): DreamEntry => ({
  id: `${Date.now()}`,
  title,
  text,
  mood,
  createdAt: new Date().toISOString(),
});

export const DreamdropDemoModule: React.FC = () => {
  const { t } = useI18n();
  const { openModuleSettings } = useNavigation();

  const [title, setTitle] = useState('');
  const [dreamText, setDreamText] = useState('');
  const [mood, setMood] = useState<Mood>('neutral');
  const [entries, setEntries] = useState<DreamEntry[]>(() => getItems<DreamEntry>(STORAGE_KEY));
  const [aiResult, setAiResult] = useState<AiResult | undefined>(undefined);
  const [aiError, setAiError] = useState<string | undefined>(undefined);
  const [isAiRunning, setIsAiRunning] = useState(false);
  const [settings, setSettings] = useState<DreamdropSettings>(loadSettings);

  const moodOptions: Array<{ value: Mood; label: string }> = useMemo(
    () => [
      { value: 'calm', label: t('modules.dreamdropDemo.form.moodCalm') },
      { value: 'neutral', label: t('modules.dreamdropDemo.form.moodNeutral') },
      { value: 'intense', label: t('modules.dreamdropDemo.form.moodIntense') },
    ],
    [t],
  );

  const latestEntry = entries[0];
  const latestMoodLabel = useMemo(() => {
    if (!latestEntry) return '';
    return moodOptions.find((option) => option.value === latestEntry.mood)?.label ?? latestEntry.mood;
  }, [latestEntry, moodOptions]);

  const preparedPrompt = useMemo(() => {
    const trimmedText = dreamText.trim();
    const trimmedTitle = title.trim();
    if (!trimmedText) return '';

    return [
      `Title: ${trimmedTitle || t('modules.dreamdropDemo.form.defaultTitle')}`,
      `Mood: ${mood}`,
      `Intensity: ${settings.intensity}`,
      'Dream:',
      trimmedText,
    ].join('\n');
  }, [dreamText, title, mood, settings.intensity, t]);

  const refreshSettings = useCallback(() => {
    setSettings(loadSettings());
  }, []);

  const persistEntries = useCallback(
    (nextEntries: DreamEntry[]) => {
      setEntries(nextEntries);
      setItems<DreamEntry>(STORAGE_KEY, nextEntries);
    },
    [setEntries],
  );

  const handleSummarize = useCallback(
    async (
      inputText?: string,
      inputTitle?: string,
      inputMood?: Mood,
      customSettings?: DreamdropSettings,
    ) => {
      const text = (inputText ?? dreamText).trim();
      if (!text) return;

      const titleValue = (inputTitle ?? title).trim();
      const moodValue = inputMood ?? mood;
      const resolvedSettings = customSettings ?? settings;

      if (!resolvedSettings.enableAi) {
        return;
      }

      setIsAiRunning(true);
      setAiError(undefined);

      const request: AiRequest = {
        type: 'summarization',
        input: [
          `Task: dreamdrop_demo_summary`,
          `Title: ${titleValue || t('modules.dreamdropDemo.form.defaultTitle')}`,
          `Mood: ${moodValue}`,
          `Intensity: ${resolvedSettings.intensity}`,
          'Dream:',
          text,
        ].join('\n'),
        options: {
          metadata: {
            task: 'dreamdrop_demo_summary',
            mood: moodValue,
            intensity: resolvedSettings.intensity,
          },
        },
      };

      try {
        const result = await runAiTask(request);
        setAiResult(result);
        trackEvent('dreamdrop_demo_ai_summary', {
          hasTitle: titleValue.length > 0,
          inputLength: text.length,
          mood: moodValue,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setAiError(message);
      } finally {
        setIsAiRunning(false);
      }
    },
    [dreamText, mood, settings, t, title],
  );

  const handleSave = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmedText = dreamText.trim();
      if (!trimmedText) {
        return;
      }

      const trimmedTitle = title.trim();
      const entry = createEntry(trimmedTitle, trimmedText, mood);
      const nextEntries = [entry, ...entries].slice(0, 5);
      persistEntries(nextEntries);

      trackEvent('dreamdrop_demo_saved', {
        hasTitle: trimmedTitle.length > 0,
        inputLength: trimmedText.length,
        mood,
      });

      const latestSettings = loadSettings();
      setSettings(latestSettings);

      setTitle('');
      setDreamText('');

      if (latestSettings.enableAi && latestSettings.autoSummarize) {
        await handleSummarize(trimmedText, trimmedTitle, mood, latestSettings);
      }
    },
    [dreamText, entries, handleSummarize, mood, persistEntries, title],
  );

  return (
    <section aria-labelledby="dreamdrop-demo-title">
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
            <h3 id="dreamdrop-demo-title" style={{ margin: 0 }}>
              {t('modules.dreamdropDemo.title')}
            </h3>
            <p style={{ margin: 0 }}>{t('modules.dreamdropDemo.description')}</p>
          </div>
          <Button variant="secondary" onClick={() => openModuleSettings('dreamdropDemo')}>
            {t('modules.dreamdropDemo.form.settingsCta')}
          </Button>
        </header>

        <form
          onSubmit={handleSave}
          style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}
        >
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span>{t('modules.dreamdropDemo.form.titleLabel')}</span>
            <TextInput
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={t('modules.dreamdropDemo.form.titlePlaceholder')}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span>{t('modules.dreamdropDemo.form.dreamLabel')}</span>
            <TextArea
              rows={4}
              value={dreamText}
              onChange={(event) => setDreamText(event.target.value)}
              placeholder={t('modules.dreamdropDemo.form.dreamPlaceholder')}
            />
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span>{t('modules.dreamdropDemo.form.moodLabel')}</span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {moodOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={option.value === mood ? 'primary' : 'secondary'}
                  onClick={() => setMood(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button type="submit" variant="primary">
              {t('modules.dreamdropDemo.form.saveButton')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleSummarize()}
              disabled={!settings.enableAi || isAiRunning || !preparedPrompt}
            >
              {isAiRunning
                ? t('modules.dreamdropDemo.form.summarizeRunning')
                : t('modules.dreamdropDemo.form.summarizeButton')}
            </Button>
            <Button type="button" variant="ghost" onClick={refreshSettings}>
              {t('modules.dreamdropDemo.form.refreshSettings')}
            </Button>
          </div>

          {aiError && (
            <p className="settings-section__error" style={{ margin: 0 }}>
              {aiError}
            </p>
          )}
        </form>

        {latestEntry && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <strong>{t('modules.dreamdropDemo.output.lastSaved')}</strong>
            <p style={{ margin: 0 }}>
              {latestEntry.title || t('modules.dreamdropDemo.form.defaultTitle')} •{' '}
              <Badge variant="accent">{latestMoodLabel}</Badge>
            </p>
            <p style={{ margin: '4px 0 0' }}>{latestEntry.text}</p>
          </div>
        )}
      </Card>

      <Card style={{ marginTop: 12 }}>
        <header style={{ marginBottom: 8 }}>
          <h4 style={{ margin: 0 }}>{t('modules.dreamdropDemo.output.summaryTitle')}</h4>
          {!settings.enableAi && (
            <p className="settings-layout__muted" style={{ margin: 0 }}>
              {t('modules.dreamdropDemo.output.aiDisabled')}
            </p>
          )}
        </header>
        {aiResult ? (
          <p style={{ margin: 0 }}>{aiResult.text}</p>
        ) : (
          <p style={{ margin: 0 }}>{t('modules.dreamdropDemo.output.noSummary')}</p>
        )}
      </Card>
    </section>
  );
};

