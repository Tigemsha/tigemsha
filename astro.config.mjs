// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitio estático. La CSP vive en public/_headers, así que nada se inlina:
// sin <style> ni <script> en línea, todo sale como archivo en /_astro/.
export default defineConfig({
  site: 'https://tigemsha.com',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
  },
  image: {
    responsiveStyles: false,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/demos/') && !page.endsWith('/404/'),
    }),
  ],
  vite: {
    build: {
      // Un solo CSS para todo el sitio: una petición que bloquea y queda en caché.
      cssCodeSplit: false,
      assetsInlineLimit: 0,
      sourcemap: false,
    },
  },
  devToolbar: { enabled: false },
});
