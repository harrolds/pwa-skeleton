import type { ComponentType } from 'react';
import { NotesModule } from '../modules/notes/NotesModule';

export interface ModuleDefinition {
  id: string;
  labelKey: string;
  routeBase: string;
  hasHomeWidget: boolean;
  hasSettings: boolean;
  settingsRoute?: string;
  component: ComponentType;
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
  },
];
