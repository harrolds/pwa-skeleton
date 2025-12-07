import {
  APP_NAME,
  APP_SHORT_NAME,
  APP_DESCRIPTION,
  THEME_COLOR,
  BACKGROUND_COLOR
} from './appConfig';

export const pwaManifest = {
  name: APP_NAME,
  short_name: APP_SHORT_NAME,
  description: APP_DESCRIPTION,
  theme_color: THEME_COLOR,
  background_color: BACKGROUND_COLOR,
  display: 'standalone',
  start_url: '/',
  orientation: 'portrait',
  icons: [
    {
      src: '/icons/pwa-192x192.png',
      sizes: '192x192',
      type: 'image/png'
    },
    {
      src: '/icons/pwa-512x512.png',
      sizes: '512x512',
      type: 'image/png'
    }
  ]
} as const;
