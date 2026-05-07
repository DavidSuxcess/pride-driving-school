import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://davidsuxcess.github.io',
  base: '/pride-driving-school',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
  build: {
    assets: 'astro-assets',
  },
});
