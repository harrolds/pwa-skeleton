import type { ComponentType } from 'react';
import { NotesModule } from '../modules/notes/NotesModule';

export interface ModuleDefinition {
  id: string;
  labelKey: string;
  routeBase: string;
  hasHomeWidget: boolean;
  hasSettings: boolean;
  component: ComponentType;
}

export const moduleRegistry: ModuleDefinition[] = [
  {
    id: 'notes',
    labelKey: 'notes.title',
    routeBase: '/notes',
    hasHomeWidget: true,
    hasSettings: true,
    component: NotesModule,
  },
];
