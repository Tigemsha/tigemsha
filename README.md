# tigemsha.com

Sitio de Tigemsha: software a la medida para empresas en México y la vitrina **Landings a la venta**.

- **Stack:** Astro 7 (sitio estático), TypeScript estricto y CSS propio con tokens. Sin frameworks en el cliente.
- **Fuente:** Archivo variable (`@fontsource-variable/archivo`), autoalojada. El navegador solo descarga el subset latin.
- **JavaScript:** la home no manda JS. La ficha de cada landing carga solo el visor de la demo (`src/scripts/visor.ts`, menos de 3 KB).

## Requisitos

Node 24 (ver `.nvmrc`):

```sh
source ~/.nvm/nvm.sh && nvm use 24
npm install
```

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo. |
| `npm run check` | `astro check` (tipos y plantillas). |
| `npm run build` | `astro check` y build estático en `dist/`. Es lo que corre Netlify en cada push a `main`. |
| `npm run preview` | Sirve `dist/` en local (sin demos). |
| `npm run preview:full` | Copia las demos a `dist/demos/` y sirve `dist/`: la vista local completa, con el visor funcionando. Corre antes `npm run build`. |
| `npm run collect-demos` | Arma `.demos-dist/` con las demos de cada landing. Si no hay demos, avisa y no falla. |
| `npm run deploy:demos` | Arma `.demos-dist/` y lo publica en el sitio `tigemsha-demos`. Falla si no hay demos, para no publicar un sitio vacío. Requiere `netlify login`. |

El sitio principal **no** se publica desde aquí: se publica solo al hacer push a `main`.

## Estructura

```
src/
  data/landings.json     ← la vitrina: una entrada por landing
  data/sitio.ts          ← WhatsApp, Instagram y banderas (logos de clientes, domicilio)
  data/portafolio.ts     ← casos de software a medida
  data/preguntas.ts      ← preguntas frecuentes
  lib/landings.ts        ← valida landings.json con zod (y el contraste AA de cada tema)
  styles/tokens.css      ← tokens del DESIGN.md ("El muestrario")
  styles/base.css        ← reset, tipografía, botones y la entrada del hero
  components/            ← Tira, LandingDestacada, VisorDemo, CapturaMarcada…
  pages/                 ← /, /landings, /landings/[slug], /aviso-de-privacidad, 404
  scripts/visor.ts       ← visor de la demo (iframe, dispositivos y temas)
  assets/landings/<slug>/ ← capturas de cada landing (celular y escritorio)
public/
  _headers               ← cabeceras de Netlify (HSTS y protección de /demos/*); la CSP la agrega el build
  robots.txt             ← Disallow: /demos/
scripts/collect-demos.mjs ← arma .demos-dist/ (sitio de demos)
netlify.toml              ← build del CI y proxy de /demos/*
```

## Agregar una landing a la vitrina

1. Pon sus capturas en `src/assets/landings/<slug>/` (celular 780×1688 y escritorio 1440×900, PNG o WebP).
2. Agrega una entrada en `src/data/landings.json`:

```jsonc
{
  "codigo": "TGM-002",             // TGM-NNN, único
  "slug": "dentistas",             // igual al slug del landing.json de la landing
  "giro": "Dentistas",
  "nombre": "Sonrisa",             // nombre del modelo
  "fecha": "2026-11-19",
  "precio_desde": 2500,
  "mantenimiento_mes": 350,
  "resumen": "…",                  // 200 caracteres máximo
  "para": "…",
  "incluye": ["…"],
  "editable": ["…"],
  "plazo": "3 a 5 días hábiles",
  "tema_por_defecto": "claro",
  "temas": [
    { "id": "claro", "nombre": "Claro", "fondo": "#…", "superficie": "#…", "tinta": "#…", "acento": "#…", "texto_acento": "#…" }
  ],
  "captura_movil": "src/assets/landings/dentistas/movil.png",
  "captura_escritorio": "src/assets/landings/dentistas/escritorio.png",
  "ficha_tecnica": { "peso_kb": null, "lighthouse_movil": null }
}
```

La ruta de la ficha (`/landings/<slug>/`) y la de la demo (`/demos/<slug>/`) salen del `slug`. El build falla si falta un campo, si una captura no existe, si se repite un código o un slug, o si un tema no pasa AA (4.5:1) en tinta/fondo, tinta/superficie y texto_acento/acento. La vitrina se ordena sola por fecha y aguanta de 1 a 30 landings.

## Protocolo entre el visor y la demo

La ficha `/landings/<slug>` muestra la demo en un iframe:

```html
<iframe src="/demos/<slug>/" sandbox="allow-scripts" loading="lazy"
        referrerpolicy="same-origin" title="Demo en vivo de la landing TGM-001"></iframe>
```

Sin `allow-same-origin`, la demo corre con **origen opaco**: no puede leer cookies ni el DOM del sitio, y el sitio tampoco el de la demo. Se hablan solo con `postMessage`.

Antes de crear el iframe, el visor hace un `HEAD` a `/demos/<slug>/`. Si no existe, se queda el póster con marca de agua y un aviso.

### Mensajes

| Dirección | Mensaje | Cuándo |
| --- | --- | --- |
| demo → visor | `{ type: 'tgm-ready', themes: ['rack', 'acero', 'pino', 'noche'] }` | Al cargar la demo. `themes` son los ids de tema que la demo sabe aplicar. |
| visor → demo | `{ type: 'tgm-theme', theme: '<id>' }` | Cada vez que alguien toca una ficha de "Pruébala con otros colores". |

Reglas:

- **El visor** manda con `targetOrigin '*'`, porque el origen opaco del iframe no se puede nombrar. Solo acepta mensajes cuyo `event.source` sea su propio iframe (el `event.origin` llega como `"null"`). Las fichas de temas que no estén en `themes` quedan deshabilitadas. Si alguien toca una ficha antes de `tgm-ready`, el tema se aplica en cuanto llega.
- **La demo** solo acepta `tgm-theme` si `event.origin` es `https://tigemsha.com` (o `http://localhost:*` en desarrollo) y si `theme` es un id conocido. Para aplicarlo cambia sus variables CSS, por ejemplo con `document.documentElement.dataset.theme = theme`. Al cargar responde con `window.parent.postMessage({ type: 'tgm-ready', themes }, '*')`.

Ejemplo del lado de la demo:

```js
const TEMAS = ['rack', 'acero', 'pino', 'noche'];
const PERMITIDO = /^(https:\/\/tigemsha\.com|http:\/\/localhost:\d+)$/;

addEventListener('message', (e) => {
  if (!PERMITIDO.test(e.origin)) return;
  const { type, theme } = e.data ?? {};
  if (type === 'tgm-theme' && TEMAS.includes(theme)) document.documentElement.dataset.theme = theme;
});

if (window.parent !== window) window.parent.postMessage({ type: 'tgm-ready', themes: TEMAS }, '*');
```

### Lo que necesita el build de demo

- La demo corre con origen opaco, así que sus fuentes, scripts de módulo e imágenes con `crossorigin` se piden con CORS. `/demos/*` responde `Access-Control-Allow-Origin: *` para que no fallen. Inlinar las fuentes (data URI) sigue siendo lo recomendado: ahorra peticiones.
- Sin source maps (`collect-demos` además descarta los `.map`).
- Rutas relativas o con base `/demos/<slug>/`: la demo se sirve en esa ruta, tanto en `tigemsha-demos` como en tigemsha.com.
- Marca de agua, `noindex` y el aviso de licencia, como dice `ARQUITECTURA.md` §Vitrina.

## Deploy

Hay dos sitios en Netlify:

| Sitio | Qué publica | Cómo se publica |
| --- | --- | --- |
| `tigemsha` (tigemsha.com) | Este repo (`dist/`) | Netlify CI en cada push a `main`. `netlify.toml` fija `npm run build`, `publish = "dist"` y Node 24, y manda sobre el panel. |
| `tigemsha-demos` ([tigemsha-demos.netlify.app](https://tigemsha-demos.netlify.app)) | `.demos-dist/` | `npm run deploy:demos`, desde la Mac donde viven las landings. |

Las demos **no se construyen en el CI** ni se suben a este repo (que es público): su código vive solo en los repos privados de cada landing. `netlify.toml` hace un proxy:

```toml
[[redirects]]
  from = "/demos/*"
  to = "https://tigemsha-demos.netlify.app/demos/:splat"
  status = 200
  force = true
```

Así la URL pública sigue siendo `tigemsha.com/demos/<slug>/`, del mismo origen que el visor, y la CSP del sitio (`frame-src 'self'`) no cambia.

### Publicar una demo nueva

1. En la landing: `npm run build:demo` (genera `dist-demo/`) y que su `landing.json` tenga el `slug`.
2. Aquí: `npm run deploy:demos`. Arma `.demos-dist/` con:
   - `demos/<slug>/`, copiado del `dist-demo/` de cada landing en `../../code-projects/landings/*/` (o en `LANDINGS_DIR`), sin archivos `.map`;
   - `_headers` para todo el sitio de demos: `X-Robots-Tag: noindex, nofollow, noarchive`, `Content-Security-Policy: frame-ancestors 'self' https://tigemsha.com https://www.tigemsha.com`, `Referrer-Policy: same-origin`, `X-Content-Type-Options: nosniff` y una `Permissions-Policy` restrictiva, y `Access-Control-Allow-Origin: *` en `/demos/*` (la demo corre con origen opaco);
   - `robots.txt` con `Disallow: /`;
   - un `index.html` que manda a `https://tigemsha.com/landings/`.
3. Agrega su entrada en `src/data/landings.json` con sus capturas y haz push a `main` (lo hace el coordinador).

Para probar todo en local: `npm run build && npm run preview:full` y abre `/landings/<slug>/`.

## Seguridad

`public/_headers` define:

- Para todo el sitio: HSTS, `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy` y COOP.
- La CSP del sitio va en cada ruta de Astro y no en `/*`, porque Netlify junta las cabeceras de todas las reglas que coinciden y la CSP del sitio bloquearía el JS en línea de las demos. No se escribe a mano: la integración `cspPorRuta` de `astro.config.mjs` la agrega al final de `dist/_headers`, una regla por cada página que genera el build, así que una página nueva sale con CSP sin tocar nada. El build no inlina CSS ni JS, así que la CSP no necesita `'unsafe-inline'`.
- Para `/demos/*`, las cabeceras que cuentan son las del sitio de demos (`.demos-dist/_headers`), que pasan por el proxy. `public/_headers` repite las de `ARQUITECTURA.md` §Vitrina como respaldo; ambas políticas son compatibles.
