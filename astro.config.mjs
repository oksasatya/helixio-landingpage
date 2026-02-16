// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://helixio.app',
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'id',
        locales: {
          id: 'id',
          en: 'en',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  server:{
    port: 3000,
  }
});
