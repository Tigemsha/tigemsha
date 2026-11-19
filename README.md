# tigemsha.com

Sitio de Tigemsha: software a la medida para empresas (México, Estados Unidos y España) y la vitrina **Landings a la venta**.

- **Stack:** Astro 7 (sitio estático), TypeScript estricto y CSS propio con tokens. Sin frameworks en el cliente.
- **Idiomas:** español en `/` (por defecto) e inglés en `/en/`. Ver [Idiomas](#idiomas).
- **Fuente:** Archivo variable (`@fontsource-variable/archivo`), autoalojada. El navegador solo descarga el subset latin.
- **JavaScript:** módulos chicos por componente, sin librerías (presupuesto v2: 40 KB gzip por página). Hoy: home ≈ 7 KB gzip, `/landings` ≈ 4 KB, ficha ≈ 2 KB. Todo el contenido se ve sin JS.
- **Animación:** solo `transform` y `opacity`; revelados con scroll-driven animations (`@supports`) y respaldo con IntersectionObserver (`src/scripts/revela.ts`). Con `prefers-reduced-motion` todo queda visible y quieto.

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
| `npm run sync-proximas` | Regenera `src/data/proximas.json` (los siguientes 5 giros de `../investigacion/segmentos.json` que no están publicados). Corre en la Mac de Tigemsha; el resultado se sube. |
| `npm run build:prueba` | Construye la vitrina con 60 landings ficticias en `.prueba/dist` (no se sube ni se publica). Sirve para probar el buscador y `/landings` a escala. |
| `npm run preview:prueba` | Sirve `.prueba/dist`. Astro 7 solo admite un `preview` a la vez: detén el otro antes. |
| `npm run collect-demos` | Arma `.demos-dist/` con las demos de cada landing. Si no hay demos, avisa y no falla. |
| `npm run deploy:demos` | Arma `.demos-dist/` y lo publica en el sitio `tigemsha-demos`. Falla si no hay demos, para no publicar un sitio vacío. Requiere `netlify login`. |

El sitio principal **no** se publica desde aquí: se publica solo al hacer push a `main`.

## Estructura

```
src/
  i18n/                  ← es.ts (por defecto), en.ts (misma forma, tipada) y rutas por idioma
  data/landings.json     ← la vitrina: una entrada por landing (con su inglés en `en`)
  data/proximas.json     ← los siguientes 5 giros (lo genera scripts/sync-proximas.mjs)
  data/sitio.ts          ← WhatsApp, correo, Instagram, TikTok y banderas
  lib/landings.ts        ← valida landings.json con zod (y el contraste AA de cada tema); localiza por idioma
  lib/busqueda.ts        ← normalizar y puntuar (lo usan el build y el navegador)
  lib/indice.ts          ← índice compacto de la vitrina (/landings/indice.json)
  styles/tokens.css      ← tokens del DESIGN.md ("El muestrario") y de movimiento
  styles/base.css        ← reset, tipografía, botones, entrada del hero y revelados (.revela)
  vistas/                ← cada página una vez (Inicio, Landings, Ficha, NoEncontrada); pages/ y pages/en/ solo las llaman
  components/inicio/     ← Hero (+ AntesDespues), Personajes, Clientes, Redes
  components/servicios/  ← <Servicios lang totalLandings /> (demos animadas de cada servicio)
  components/vitrina/    ← Vitrina (buscador, carrusel o rejilla, estado vacío) y TarjetaLanding
  scripts/               ← visor, vitrina, carrusel, personajes, hero, marquesina, revela, flotante
  assets/landings/<slug>/ ← capturas de cada landing (celular y escritorio)
  assets/clientes/       ← logos en grises (sacados de main)
  assets/redes/          ← portadas reales de @tigemsha
public/
  _headers               ← cabeceras de Netlify (HSTS y protección de /demos/*); la CSP la agrega el build
  robots.txt             ← Disallow: /demos/
scripts/collect-demos.mjs ← arma .demos-dist/ (sitio de demos)
scripts/sync-proximas.mjs ← proximas.json desde la investigación
scripts/vitrina-prueba.mjs ← 60 landings ficticias para probar la escala
netlify.toml              ← build del CI, proxy de /demos/* y 404 de /en/*
```

## Idiomas

- Español en `/` e inglés en `/en/` (`i18n` de `astro.config.mjs`, `prefixDefaultLocale: false`). Cada página existe en los dos: `/`, `/landings/`, `/landings/<slug>/`, `/aviso-de-privacidad/` ↔ `/en/privacy-notice/` y la 404 (`/404.html` y `/en/404/`, que Netlify sirve para lo que no existe bajo `/en/`).
- Los textos viven en `src/i18n/es.ts` y `src/i18n/en.ts`. `en.ts` se tipa con la forma de `es.ts`: si falta una clave, el build falla.
- `Base.astro` pone `lang`, `hreflang` (es-MX, en y x-default) y `og:locale`. El selector ES/EN de la cabecera lleva a la misma página en el otro idioma.
- Los mensajes de WhatsApp van en el idioma de la página. Las demos de las landings siguen en español.

## Buscador de la vitrina

- `src/lib/busqueda.ts` normaliza (sin acentos ni mayúsculas) y exige que cada palabra buscada aparezca en el giro o en los sinónimos (`palabras_clave` en español e inglés, el modelo, el código y la familia), como inicio o pedazo de palabra, o con un error de dedo en palabras de 5 letras o más. Las coincidencias en el giro pesan el doble.
- La home trae las 12 más recientes en un carrusel (scroll-snap, flechas, arrastre y teclado) y al final las próximas de la fila. `/landings` trae 24 y "Mostrar más" agrega de 24 en 24; familias, orden y búsqueda quedan en la URL (`?q=gym&familia=fitness&orden=az`).
- Si el HTML ya trae todas las landings, el navegador no baja nada. Si hay más, baja `/landings/indice.json` (o `/en/landings/indice.json`) la primera vez que alguien busca y pinta las tarjetas que faltan con el `<template>` de la página. Con 61 landings pesa 4 KB comprimido.
- Sin resultados: "¿No está tu giro? Te la hacemos", con el WhatsApp prellenado con lo buscado y aviso si ese giro está en `proximas.json`.

## Agregar una landing a la vitrina

1. Pon sus capturas en `src/assets/landings/<slug>/` (celular 780×1688 y escritorio 1440×900, PNG o WebP).
2. Agrega una entrada en `src/data/landings.json`:

```jsonc
{
  "codigo": "TGM-002",             // TGM-NNN, único
  "slug": "dentistas",             // igual al slug del landing.json de la landing
  "giro": "Dentistas",
  "nombre": "Sonrisa",             // nombre del modelo
  "familia": "salud",              // fitness | salud | belleza | educacion | servicios | hogar | eventos | hospedaje
  "fecha": "2026-11-19",
  "precio_desde": 2500,
  "mantenimiento_mes": 350,
  "resumen": "…",                  // 200 caracteres máximo
  "para": "…",
  "incluye": ["…"],
  "editable": ["…"],
  "palabras_clave": ["dentista", "dental", "ortodoncia"],   // sinónimos para el buscador
  "plazo": "3 a 5 días hábiles",
  "tema_por_defecto": "claro",
  "temas": [
    { "id": "claro", "nombre": "Claro", "fondo": "#…", "superficie": "#…", "tinta": "#…", "acento": "#…", "texto_acento": "#…" }
  ],
  "captura_movil": "src/assets/landings/dentistas/movil.png",
  "captura_escritorio": "src/assets/landings/dentistas/escritorio.png",
  "ficha_tecnica": { "peso_kb": null, "lighthouse_movil": null },
  "en": {                          // la ficha en inglés (la demo sigue en español)
    "giro": "Dentists", "nombre": "Smile", "resumen": "…", "para": "…",
    "plazo": "3 to 5 business days", "incluye": ["…"], "editable": ["…"],
    "palabras_clave": ["dentist", "dental"]
  }
}
```

Cada tema puede llevar `nombre_en`. Después corre `npm run sync-proximas` para que el giro salga de "Próximas".

La ruta de la ficha (`/landings/<slug>/`) y la de la demo (`/demos/<slug>/`) salen del `slug`. El build falla si falta un campo, si una captura no existe, si se repite un código o un slug, o si un tema no pasa AA (4.5:1) en tinta/fondo, tinta/superficie y texto_acento/acento. La vitrina se ordena sola por fecha y aguanta cientos de landings (pruébalo con `npm run build:prueba`).

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
- La CSP del sitio va en cada ruta de Astro y no en `/*`, porque Netlify junta las cabeceras de todas las reglas que coinciden y la CSP del sitio bloquearía el JS en línea de las demos. No se escribe a mano: la integración `cspPorRuta` de `astro.config.mjs` la agrega al final de `dist/_headers`, una regla por cada página que genera el build, así que una página nueva sale con CSP sin tocar nada. El build no inlina CSS ni JS, así que la CSP no necesita `'unsafe-inline'`. Los textos que usa el buscador van en un `<script type="application/json">` (un dato que no se ejecuta, así que `script-src 'self'` no lo bloquea) y el índice se pide con `fetch` al mismo origen (`connect-src 'self'`). Ningún componente usa `style=""` ni `define:vars`.
- Para `/demos/*`, las cabeceras que cuentan son las del sitio de demos (`.demos-dist/_headers`), que pasan por el proxy. `public/_headers` repite las de `ARQUITECTURA.md` §Vitrina como respaldo; ambas políticas son compatibles.
