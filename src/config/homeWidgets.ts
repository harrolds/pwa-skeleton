export interface HomeWidgetConfig {
  id: string;
  moduleId: string;
  labelKey: string;
  priority?: number;
  span?: 1 | 2;
}

export const homeWidgets: HomeWidgetConfig[] = [
  {
    id: 'notesWidget',
    moduleId: 'notes',
    labelKey: 'home.module.notes.title',
    priority: 1,
    span: 2,
  },
];
