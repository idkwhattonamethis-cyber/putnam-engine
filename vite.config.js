import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  // Tailwind is compiled into the bundle (it used to load from the CDN, which blocked
  // first paint and left the installed PWA unstyled offline). An empty `postcss` also
  // stops Vite walking up to any stray postcss.config.js outside the project.
  css: { postcss: {} },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Putnam Engine',
        short_name: 'Putnam',
        description: 'Putnam campaign execution engine — 120-week study, training, and diet tracker.',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        theme_color: '#F5EFE4',
        background_color: '#F5EFE4',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // the week bodies push the JS bundle past the 2 MB default
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],
})
