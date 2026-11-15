import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Konfigurasi Vite untuk UKMSync PWA
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'icons/*.png'],
      manifest: {
        name: 'UKMSync — Sketch Sports Hub',
        short_name: 'UKMSync',
        description: 'Aplikasi Manajemen UKM dan Scoreboard Multi-Sport Teknik Komputer Undip',
        theme_color: '#527D48',
        background_color: '#F7F8F5',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/icons/iconapp.jpg',
            sizes: '192x192',
            type: 'image/jpeg',
          },
          {
            src: '/icons/iconapp.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
          },
        ],
      },
      workbox: {
        // Strategi caching untuk assets statis
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 tahun
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 tahun
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Cache API calls dengan NetworkFirst strategy
            urlPattern: /\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5, // 5 menit
              },
              networkTimeoutSeconds: 10,
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
