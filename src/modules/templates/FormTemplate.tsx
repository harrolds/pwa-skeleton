/**
 * Basisformulier-template. Vervang validatie-, submit- en error-handling door
 * project-specifieke logica. Integreer hier indien nodig telemetry (trackEvent),
 * navigatie (useNavigation) of API-calls (get/post). Deze component wordt pas
 * zichtbaar zodra hij als module of widget is aangesloten.
 */
import React, { useState } from 'react';
import type { FormEvent } from 'react';
import { Card } from '../../shared/ui/Card';
import { TextInput } from '../../shared/ui/TextInput';
import { TextArea } from '../../shared/ui/TextArea';
import { Button } from '../../shared/ui/Button';
import { validateRequired } from '../../shared/lib/forms';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export const FormTemplate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasTitle = validateRequired(title);
    const hasDescription = validateRequired(description);

    if (!hasTitle && !hasDescription) {
      // TODO: vervang dit door expliciete validatiefeedback in een echte module.
      return;
    }

    try {
      setSubmitState('submitting');

      // TODO: vervang dit blok door de echte submit-logica (API-call, storage, usw.).
      // Beispiel:
      //   await api.post('/my-endpoint', { title, description });

      // Simpele demo-delay om async-flow te illustreren.
      await new Promise((resolve) => setTimeout(resolve, 300));

      setSubmitState('success');
      setTitle('');
      setDescription('');
    } catch (error) {
      // TIP: voeg hier logging/telemetry toe (logging.error, trackEvent, enz.).
      setSubmitState('error');
    } finally {
      // In een echte module kun je hier aanvullende state-resets doen.
    }
  };

  const isSubmitting = submitState === 'submitting';

  return (
    <section aria-label="Formular module template">
      <Card>
        <h2 style={{ marginTop: 0, marginBottom: 8 }}>Form Template</h2>
        <p style={{ marginTop: 0, marginBottom: 16 }}>
          Dies ist ein Basisformular-Template mit Titel und Beschreibung.
          Ersetze Felder, Validierung und Submit-Logik für dein eigenes Modul.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 4 }}>
              Titel
            </label>
            <TextInput
              name="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Titel eingeben"
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 4 }}>
              Beschreibung
            </label>
            <TextArea
              name="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Beschreibung eingeben"
              rows={4}
            />
          </div>

          {/* TODO: voeg hier extra formularelementen toe (Select, Checkboxen, usw.). */}

          <div style={{ display: 'flex', gap: 8 }}>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Senden…' : 'Senden'}
            </Button>
          </div>

          {submitState === 'success' && (
            <p style={{ marginTop: 12, marginBottom: 0 }}>
              Formular wurde erfolgreich gesendet (Demo-Status).
            </p>
          )}

          {submitState === 'error' && (
            <p style={{ marginTop: 12, marginBottom: 0 }}>
              Es ist ein Fehler beim Senden aufgetreten (Demo-Status).
            </p>
          )}
        </form>
      </Card>
    </section>
  );
};

/**
 * Hoe deze template als module te activeren (optioneel, voor dev):
 * 1. Importeer deze component in `src/config/moduleRegistry.ts`.
 * 2. Voeg een `ModuleDefinition` toe met een eigen `id`, `labelKey` en `routeBase`.
 * 3. (Optioneel) voeg het module-id toe aan `homeWidgets` of navigatie, indien je het zichtbaar wilt maken.
 *
 * Standaard blijven templates onzichtbaar voor eindgebruikers en hebben ze geen impact op de huidige flow.
 */

