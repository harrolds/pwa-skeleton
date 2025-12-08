export interface HomeWidgetConfig {
  id: string;
  moduleId: string;
  priority?: number;
  span?: 1 | 2;
}

export const homeWidgets: HomeWidgetConfig[] = [
  {
    id: 'notesWidget',
    moduleId: 'notes',
    priority: 1,
    span: 2,
  },
];
