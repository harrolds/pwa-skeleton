/**
 * Template voor list/detail-modules. Vervang types, fetch-logica, foutafhandeling,
 * telemetry en navigatie door project-specifieke implementaties. Deze component
 * verschijnt niet in de UI totdat hij via moduleRegistry en/of widgets wordt gekoppeld.
 */
import React, { useCallback, useMemo, useState } from 'react';
import { Card } from '../../shared/ui/Card';
import { List, ListItem } from '../../shared/ui/List';
import { Button } from '../../shared/ui/Button';

interface TemplateItem {
  id: string;
  title: string;
  description?: string;
}

// TIP: vervang deze demo-lijst door eigen data (API-call, storage, enz.).
//     Dit is alleen een template voor module-ontwikkeling.
const demoItems: TemplateItem[] = [
  { id: '1', title: 'Demo item A', description: 'Kurze Beschreibung für Item A.' },
  { id: '2', title: 'Demo item B', description: 'Kurze Beschreibung für Item B.' },
  { id: '3', title: 'Demo item C', description: 'Optionaler beschreibender Text.' },
];

export const ListDetailTemplate: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const items = useMemo<TemplateItem[]>(() => {
    // TODO: vervang deze memo indien nodig door eigen data-loadinglogica.
    return demoItems;
  }, []);

  const selectedItem = useMemo<TemplateItem | null>(
    () => items.find((item) => item.id === selectedId) ?? null,
    [items, selectedId]
  );

  const handleSelect = useCallback((id: string) => {
    // TIP: voeg hier eventueel telemetry of navigatie toe (trackEvent, useNavigation).
    setSelectedId(id);
  }, []);

  return (
    <section aria-label="List/detail module template">
      <Card>
        <h2 style={{ marginTop: 0, marginBottom: 8 }}>List/Detail Template</h2>
        <p style={{ marginTop: 0, marginBottom: 16 }}>
          Dies ist ein Beispiel-Modul mit einer Liste und einer Detail-Ansicht.
          Ersetze Inhalt, Datentypen und Layout für dein eigenes Modul.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 220px' }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Liste</h3>
            <List>
              {items.map((item) => (
                <ListItem key={item.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                    <div>
                      <strong>{item.title}</strong>
                      {item.description ? (
                        <p style={{ marginTop: 4, marginBottom: 0 }}>{item.description}</p>
                      ) : null}
                    </div>
                    <Button type="button" onClick={() => handleSelect(item.id)}>
                      Detail
                    </Button>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>

          <div style={{ flex: '1 1 220px' }}>
            <h3 style={{ marginTop: 0, marginBottom: 8 }}>Detail</h3>
            {selectedItem ? (
              <div>
                <p style={{ marginTop: 0, marginBottom: 8 }}>
                  <strong>{selectedItem.title}</strong>
                </p>
                {selectedItem.description ? (
                  <p style={{ marginTop: 0, marginBottom: 8 }}>{selectedItem.description}</p>
                ) : null}

                {/* TODO: voeg hier module-specifieke acties toe (Buttons, Formular, Navigation, usw.). */}
              </div>
            ) : (
              <p style={{ marginTop: 0, marginBottom: 0 }}>
                Wähle ein Item in der Liste, um Details zu sehen.
              </p>
            )}
          </div>
        </div>
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

