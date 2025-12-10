import type { ScreenConfig } from '../core/screenConfig';

/**
 * Central registry for screen configuration used by the app shell.
 */
export const screenConfigs: ScreenConfig[] = [
  {
    id: 'home',
    route: '/',
    titleKey: 'home.title',
    menuActions: [
      {
        id: 'home-demo-panel',
        labelKey: 'home.header.menu.demoPanel',
        onClick: { type: 'panel', panelId: 'notes-header-actions-demo', props: { from: 'home' } },
      },
      {
        id: 'home-demo-custom',
        labelKey: 'home.header.menu.customAction',
        onClick: { type: 'custom', handlerId: 'notes:log-action' },
      },
    ],
    actions: [
      {
        id: 'openNotifications',
        labelKey: 'app.header.notifications',
        icon: 'notifications',
        navigationTarget: 'notifications',
      },
      {
        id: 'openSettings',
        labelKey: 'app.header.settings',
        icon: 'settings',
        navigationTarget: 'settings',
      },
    ],
  },
  {
    id: 'notifications',
    route: '/notifications',
    titleKey: 'notifications.title',
    actions: [
      {
        id: 'goBack',
        labelKey: 'common.back',
        icon: 'back',
        navigationTarget: 'home',
      },
    ],
  },
  {
    id: 'settings',
    route: '/settings',
    titleKey: 'settings.title',
    actions: [
      {
        id: 'goBack',
        labelKey: 'common.back',
        icon: 'back',
        navigationTarget: 'home',
      },
    ],
  },
  {
    id: 'notes',
    route: '/notes',
    titleKey: 'home.module.notes.title',
    moduleId: 'notes',
  },
];

/**
 * Resolve the screen configuration for a given path.
 */
export const getScreenConfigByPath = (path: string): ScreenConfig | undefined => {
  const normalizedPath = path || '/';
  return screenConfigs.find((screen) => screen.route === normalizedPath);
};
