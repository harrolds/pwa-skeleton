import type { ComponentType } from 'react';
import { NotesModule } from '../modules/notes/NotesModule';
import type { ScreenAction } from '../core/screenConfig';
import { registerHeaderActionHandler } from '../shared/lib/navigation/headerActionRegistry';

export interface ModuleDefinition {
  id: string;
  labelKey: string;
  routeBase: string;
  hasHomeWidget: boolean;
  hasSettings: boolean;
  settingsRoute?: string;
  component: ComponentType;
  headerActions?: {
    primaryActions?: ScreenAction[];
    menuActions?: ScreenAction[];
  };
}

export const moduleRegistry: ModuleDefinition[] = [
  {
    id: 'notes',
    labelKey: 'notes.title',
    routeBase: '/notes',
    hasHomeWidget: true,
    hasSettings: true,
    settingsRoute: '/settings/notes',
    component: NotesModule,
    headerActions: {
      primaryActions: [
        {
          id: 'notes-open-settings',
          labelKey: 'app.header.settings',
          icon: 'settings',
          onClick: { type: 'navigate', target: '/settings/notes' },
        },
        {
          id: 'notes-log-action',
          labelKey: 'notes.header.logAction',
          icon: 'menu',
          onClick: { type: 'custom', handlerId: 'notes:log-action' },
        },
      ],
      menuActions: [
        {
          id: 'notes-open-panel',
          labelKey: 'notes.header.menu.filter',
          onClick: { type: 'panel', panelId: 'notes-header-actions-demo' },
        },
      ],
    },
  },
];

registerHeaderActionHandler('notes:log-action', (action) => {
  // Demo-handling to prove custom handler wiring.
  // eslint-disable-next-line no-console
  console.log(`[header-action] custom handler invoked for ${action.id}`);
});
