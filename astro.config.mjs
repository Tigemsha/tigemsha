// @ts-check
import { appendFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * CSP del sitio: sin JS ni CSS en línea (este build no inlina nada).
 * connect-src 'self' permite que el visor revise si la demo existe;
 * frame-src 'self' permite el iframe de /demos/<slug>/.
 */
const CSP =
  "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; upgrade-insecure-requests";

/**
 * La CSP no puede ir en /* porque llegaría a /demos/* (ver public/_headers):
 * va ruta por ruta. Al terminar el build, esta integración agrega a
 * dist/_headers una regla por cada HTML que generó Astro, así que una página
 * nueva nunca sale sin CSP.
 *   carpeta/…/index.html → /carpeta y /carpeta/*
 *   index.html, 404.html → /, /index.html y /404.html
 * @returns {import('astro').AstroIntegration}
 */
function cspPorRuta() {
  return {
    name: 'tigemsha:csp-por-ruta',
    hooks: {
      'astro:build:done': async ({ dir, assets }) => {
        const raiz = fileURLToPath(dir);
        const rutas = new Set();
        for (const archivo of [...assets.values()].flat()) {
          const relativo = path.relative(raiz, fileURLToPath(archivo)).split(path.sep).join('/');
          if (!relativo.endsWith('.html')) continue;
          const [primero, ...resto] = relativo.split('/');
          if (resto.length > 0) {
            rutas.add(`/${primero}`).add(`/${primero}/*`);
          } else {
            if (relativo === 'index.html') rutas.add('/');
            rutas.add(`/${relativo}`);
          }
        }
        const reglas = [...rutas].sort().map((ruta) => `${ruta}\n  Content-Security-Policy: ${CSP}\n`);
        await appendFile(
          new URL('_headers', dir),
          `\n# CSP de cada página (la agrega astro.config.mjs al construir; no se edita a mano).\n${reglas.join('')}`,
        );
      },
    },
  };
}

// Sitio estático. La CSP va en dist/_headers (ver cspPorRuta), así que nada se
// inlina: sin <style> ni <script> en línea, todo sale como archivo en /_astro/.
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
    cspPorRuta(),
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
