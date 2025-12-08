export const APP_NAME = 'PWA Skeleton v1';
export const APP_SHORT_NAME = 'Skeleton v1';
export const APP_DESCRIPTION = 'Baseline PWA skeleton for the PWA Factory.';
export const THEME_COLOR = '#111827';
export const BACKGROUND_COLOR = '#000000';

export type FooterMenuItem = {
  id: string;
  route: string;
  labelKey: string;
  icon: string;
};

export const footerMenu: FooterMenuItem[] = [
  { id: 'home', route: '/', labelKey: 'nav.home', icon: 'home' },
  { id: 'notifications', route: '/notifications', labelKey: 'nav.notifications', icon: 'notifications' },
  { id: 'settings', route: '/settings', labelKey: 'nav.settings', icon: 'settings' },
];
