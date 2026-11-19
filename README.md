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
| `npm run build` | `astro check` y build estático en `dist/`. |
| `npm run preview` | Sirve `dist/` en local. |
| `npm run collect-demos` | Copia el `dist-demo/` de cada landing a `dist/demos/<slug>/`. |
| `npm run deploy` | `build` + `collect-demos` + `netlify deploy --prod --dir=dist`. Requiere `netlify login` y `netlify link`. |

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
  _headers               ← cabeceras de Netlify (CSP, HSTS y protección de /demos/*)
  robots.txt             ← Disallow: /demos/
scripts/collect-demos.mjs
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
  "demo": "/demos/dentistas/",     // siempre /demos/<slug>/
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

El build falla si falta un campo, si una captura no existe, si se repite un código o un slug, o si un tema no pasa AA (4.5:1) en tinta/fondo, tinta/superficie y texto_acento/acento. La vitrina se ordena sola por fecha y aguanta de 1 a 30 landings.

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

- Las **fuentes van inlinadas** (data URI) en el CSS de la demo. Una petición de fuente desde un origen opaco es CORS y `/demos/*` no abre CORS.
- Sin source maps (`collect-demos` además descarta los `.map`).
- Marca de agua, `noindex` y el aviso de licencia, como dice `ARQUITECTURA.md` §Vitrina.

## Seguridad

`public/_headers` define:

- Para todo el sitio: HSTS, `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy` y COOP.
- La CSP del sitio va en cada ruta de Astro y no en `/*`, porque Netlify junta las cabeceras de todas las reglas que coinciden y la CSP del sitio bloquearía el JS en línea de las demos. **Si agregas una página, agrega su ruta en `_headers`.** El build no inlina CSS ni JS (`astro.config.mjs`), así que la CSP no necesita `'unsafe-inline'`.
- Para `/demos/*`: `X-Robots-Tag: noindex, nofollow, noarchive`, `frame-ancestors 'self'`, `Referrer-Policy: same-origin` y una `Permissions-Policy` restrictiva.

Las demos **no se suben a este repo**, que es público. `collect-demos` las copia en el deploy desde `../../code-projects/landings/*/dist-demo` (o desde `LANDINGS_DIR`).
