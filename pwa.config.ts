import packageInfo from './package.json';
import { VitePWAOptions } from 'vite-plugin-pwa/dist';

export const pwaConfig: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  injectRegister: false,
  pwaAssets: { disabled: false, config: true, htmlPreset: '2023', overrideManifestIcons: true },
  manifest: {
    id: packageInfo.title,
    name: packageInfo.title,
    short_name: packageInfo.title,
    theme_color: '#f26522',
    background_color: '#181818',
    description: '一个金融数据查询终端，它简单、高效、灵活。',
    icons: [
      {
        src: 'logo64.png',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: 'logo192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'logo512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'logo512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: 'demo.jpg',
        type: 'image/jpg',
        sizes: '1252x775',
        form_factor: 'wide',
      },
    ],
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,svg,png,svg,ico}'],
    cleanupOutdatedCaches: true,
    clientsClaim: true,
  },
  injectManifest: {
    globPatterns: ['**/*.{js,css,html,svg,png,svg,ico}'],
  },
  devOptions: {
    enabled: true,
  },
};
