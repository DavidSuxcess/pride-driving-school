import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://davidsuxcess.github.io',
  base: '/pride-driving-school',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [react()],
  build: {
    assets: 'astro-assets',
  },
});
