import { pwaManifest } from '../../config/pwa';

export const pwaOptions = {
  registerType: 'autoUpdate',
  manifest: pwaManifest,
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}']
  },
  devOptions: {
    enabled: true
  }
} as const;
