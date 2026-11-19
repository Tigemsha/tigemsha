#!/usr/bin/env node
/**
 * Arma el sitio de demos de la vitrina en .demos-dist/.
 *
 * Las demos no se construyen en el CI de Netlify: su código es privado y vive
 * solo en la Mac de Tigemsha. Se publican en un segundo sitio de Netlify
 * (tigemsha-demos) y tigemsha.com las sirve en /demos/<slug>/ con un proxy
 * (ver netlify.toml).
 *
 * Busca en LANDINGS_DIR (por defecto ../../code-projects/landings, relativo a
 * este repo) cada carpeta con landing.json y dist-demo/. El slug sale de
 * landing.json.
 *
 *   node scripts/collect-demos.mjs              arma .demos-dist/
 *   node scripts/collect-demos.mjs --local      además copia las demos a dist/demos/ (preview:full)
 *   node scripts/collect-demos.mjs --estricto   falla si no hay demos (deploy:demos: nunca publica un sitio vacío)
 *
 * Sin --estricto, si no hay demos avisa y termina sin error.
 */
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const salida = path.join(raiz, '.demos-dist');
const dist = path.join(raiz, 'dist');
const origen = path.resolve(process.env.LANDINGS_DIR ?? path.join(raiz, '../../code-projects/landings'));
const args = new Set(process.argv.slice(2));
const local = args.has('--local');
const estricto = args.has('--estricto');
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const HEADERS = `# Sitio de demos de tigemsha.com (lo arma scripts/collect-demos.mjs; no se edita a mano).
/*
  X-Robots-Tag: noindex, nofollow, noarchive
  Content-Security-Policy: frame-ancestors 'self' https://tigemsha.com https://www.tigemsha.com
  Referrer-Policy: same-origin
  X-Content-Type-Options: nosniff
  Permissions-Policy: accelerometer=(), autoplay=(), camera=(), clipboard-read=(), clipboard-write=(), display-capture=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=(), browsing-topics=()
`;

const ROBOTS = `User-agent: *
Disallow: /
`;

const INDEX = `<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="refresh" content="0; url=https://tigemsha.com/landings/">
<link rel="canonical" href="https://tigemsha.com/landings/">
<title>Landings a la venta · Tigemsha</title>
</head>
<body>
<p><a href="https://tigemsha.com/landings/">Ver las landings a la venta en tigemsha.com</a></p>
</body>
</html>
`;

const existe = async (ruta) => {
  try {
    await stat(ruta);
    return true;
  } catch {
    return false;
  }
};

const aviso = (texto) => console.warn(`⚠ collect-demos: ${texto}`);

function salir(texto) {
  console.error(`collect-demos: ${texto}`);
  process.exit(1);
}

async function slugsDeLaVitrina() {
  const datos = JSON.parse(await readFile(path.join(raiz, 'src/data/landings.json'), 'utf8'));
  return new Set(datos.map((l) => l.slug));
}

/** Lee cada landing y devuelve [{ nombre, slug, demo }] de las que tienen dist-demo/ válido. */
async function buscarDemos() {
  if (!(await existe(origen))) {
    aviso(`no encontré la carpeta de landings (${origen}).`);
    return [];
  }
  const carpetas = (await readdir(origen, { withFileTypes: true }))
    .filter((d) => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))
    .map((d) => path.join(origen, d.name))
    .sort();

  const demos = [];
  for (const carpeta of carpetas) {
    const nombre = path.basename(carpeta);
    const demo = path.join(carpeta, 'dist-demo');
    const config = path.join(carpeta, 'landing.json');
    if (!(await existe(demo))) continue;
    if (!(await existe(config))) {
      aviso(`${nombre}: tiene dist-demo/ pero no landing.json; la salto.`);
      continue;
    }
    let slug;
    try {
      slug = JSON.parse(await readFile(config, 'utf8')).slug;
    } catch (error) {
      aviso(`${nombre}: landing.json no se pudo leer (${error.message}); la salto.`);
      continue;
    }
    if (typeof slug !== 'string' || !SLUG.test(slug)) {
      aviso(`${nombre}: el slug "${slug}" no es válido; la salto.`);
      continue;
    }
    if (demos.some((d) => d.slug === slug)) {
      aviso(`${nombre}: el slug "${slug}" ya lo usa otra landing; la salto.`);
      continue;
    }
    demos.push({ nombre, slug, demo });
  }
  return demos;
}

async function main() {
  if (local && !(await existe(dist))) salir('no existe dist/. Corre primero `npm run build`.');

  const vitrina = await slugsDeLaVitrina();
  const demos = await buscarDemos();

  if (demos.length === 0 && estricto) {
    salir(`no hay demos en ${origen}. No publico un sitio de demos vacío.`);
  }

  await rm(salida, { recursive: true, force: true });
  await mkdir(path.join(salida, 'demos'), { recursive: true });
  await writeFile(path.join(salida, '_headers'), HEADERS);
  await writeFile(path.join(salida, 'robots.txt'), ROBOTS);
  await writeFile(path.join(salida, 'index.html'), INDEX);

  for (const { nombre, slug, demo } of demos) {
    if (!vitrina.has(slug)) {
      aviso(`${nombre}: el slug "${slug}" no está en src/data/landings.json; se publica, pero no tiene ficha.`);
    }
    // Sin source maps: la demo pública nunca lleva el código legible.
    await cp(demo, path.join(salida, 'demos', slug), {
      recursive: true,
      filter: (ruta) => !ruta.endsWith('.map'),
    });
    console.log(`✓ ${nombre} → .demos-dist/demos/${slug}/`);
  }

  for (const slug of vitrina) {
    if (!demos.some((d) => d.slug === slug)) {
      aviso(`la ficha "${slug}" no tiene demo; el visor mostrará la captura.`);
    }
  }

  if (local) {
    await rm(path.join(dist, 'demos'), { recursive: true, force: true });
    await cp(path.join(salida, 'demos'), path.join(dist, 'demos'), { recursive: true });
    console.log('✓ demos copiadas a dist/demos/ para la vista local.');
  }

  if (demos.length === 0) {
    aviso(`no hay demos en ${origen}. .demos-dist/ quedó sin demos.`);
    return;
  }
  console.log(`collect-demos: ${demos.length} demo(s) en .demos-dist/demos/.`);
}

main().catch((error) => salir(error.message));
