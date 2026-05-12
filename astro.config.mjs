import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kzn.platinental.ru',
  trailingSlash: 'ignore',
  devToolbar: {
    enabled: false,
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'viewport',
  },
  vite: {
    plugins: [tailwind()],
  },
  experimental: {
    clientPrerender: true,
  },
});
