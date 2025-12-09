import React, { useCallback, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Card } from '../../shared/ui/Card';
import { TextInput } from '../../shared/ui/TextInput';
import { TextArea } from '../../shared/ui/TextArea';
import { Button } from '../../shared/ui/Button';
import { Badge } from '../../shared/ui/Badge';
import { List, ListItem } from '../../shared/ui/List';
import { useI18n } from '../../shared/lib/i18n';
import { validateRequired } from '../../shared/lib/forms';
import { useNavigation } from '../../shared/lib/navigation/useNavigation';
import { getItems, setItems } from '../../shared/lib/storage';
import { trackEvent } from '../../shared/lib/telemetry';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const STORAGE_KEY = 'notes';

const createNote = (title: string, content: string): Note => {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: title.trim(),
    content: content.trim(),
    createdAt: new Date().toISOString(),
  };
};

export const NotesModule: React.FC = () => {
  const { t } = useI18n();
  const { openModuleSettings } = useNavigation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState<Note[]>(() => getItems<Note>(STORAGE_KEY));

  const hasNotes = notes.length > 0;

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const trimmedTitle = title.trim();
      const trimmedContent = content.trim();

      const hasTitle = validateRequired(trimmedTitle);
      const hasContent = validateRequired(trimmedContent);

      if (!hasTitle && !hasContent) {
        return;
      }

      const nextNote = createNote(trimmedTitle, trimmedContent);
      const nextNotes = [nextNote, ...notes];

      setNotes(nextNotes);
      setItems<Note>(STORAGE_KEY, nextNotes);
      trackEvent('notes_saved', {
        id: nextNote.id,
        titleLength: trimmedTitle.length,
        contentLength: trimmedContent.length,
        hasTitle: trimmedTitle.length > 0,
        hasContent: trimmedContent.length > 0,
      });

      setTitle('');
      setContent('');
    },
    [title, content, notes]
  );

  const noteCountLabel = useMemo(() => {
    return `${t('notes.countLabelPrefix')} ${notes.length}`;
  }, [notes.length, t]);

  return (
    <section aria-labelledby="notes-module-title">
      <Card>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <div>
            <h3 id="notes-module-title" style={{ margin: 0 }}>
              {t('notes.title')}
            </h3>
            <p style={{ margin: 0 }}>{t('notes.description')}</p>
          </div>
          <Badge variant="accent">{noteCountLabel}</Badge>
        </header>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}
        >
          <label>
            <span style={{ display: 'block', marginBottom: 4 }}>{t('notes.form.titleLabel')}</span>
            <TextInput
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={t('notes.form.titlePlaceholder')}
            />
          </label>
          <label>
            <span style={{ display: 'block', marginBottom: 4 }}>{t('notes.form.contentLabel')}</span>
            <TextArea
              rows={3}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder={t('notes.form.contentPlaceholder')}
            />
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            <Button type="submit" variant="primary" fullWidth>
              {t('notes.form.addButton')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => openModuleSettings('notes')}
            >
              {t('notes.form.settingsCta')}
            </Button>
          </div>
        </form>

        {hasNotes ? (
          <List aria-label={t('notes.list.ariaLabel')}>
            {notes.map((note) => (
              <ListItem key={note.id}>
                <strong>{note.title || t('notes.item.untitled')}</strong>
                {note.content && (
                  <p style={{ marginTop: 4, marginBottom: 0 }}>
                    {note.content}
                  </p>
                )}
              </ListItem>
            ))}
          </List>
        ) : (
          <p style={{ margin: 0 }}>{t('notes.emptyState')}</p>
        )}
      </Card>
    </section>
  );
};
