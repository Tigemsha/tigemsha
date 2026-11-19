#!/usr/bin/env node
/**
 * Junta las demos de la vitrina en dist/demos/<slug>/.
 *
 * Busca en LANDINGS_DIR (por defecto ../../code-projects/landings, relativo a
 * este repo) cada carpeta con landing.json y dist-demo/. El slug sale de
 * landing.json. Las demos nunca se suben al repo: solo se copian al publicar.
 *
 * Si no hay demos, avisa y termina sin error.
 */
import { cp, readdir, readFile, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(raiz, 'dist');
const origen = path.resolve(process.env.LANDINGS_DIR ?? path.join(raiz, '../../code-projects/landings'));
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const existe = async (ruta) => {
  try {
    await stat(ruta);
    return true;
  } catch {
    return false;
  }
};

const aviso = (texto) => console.warn(`⚠ collect-demos: ${texto}`);

async function slugsDeLaVitrina() {
  const datos = JSON.parse(await readFile(path.join(raiz, 'src/data/landings.json'), 'utf8'));
  return new Set(datos.map((l) => l.slug));
}

async function main() {
  if (!(await existe(dist))) {
    console.error('collect-demos: no existe dist/. Corre primero `npm run build`.');
    process.exit(1);
  }

  if (!(await existe(origen))) {
    aviso(`no encontré la carpeta de landings (${origen}). Publico sin demos.`);
    return;
  }

  const vitrina = await slugsDeLaVitrina();
  const carpetas = (await readdir(origen, { withFileTypes: true }))
    .filter((d) => d.isDirectory() && !d.name.startsWith('_') && !d.name.startsWith('.'))
    .map((d) => path.join(origen, d.name))
    .sort();

  const copiadas = [];
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
    if (!vitrina.has(slug)) {
      aviso(`${nombre}: el slug "${slug}" no está en src/data/landings.json; se copia, pero no tiene ficha.`);
    }

    const destino = path.join(dist, 'demos', slug);
    await rm(destino, { recursive: true, force: true });
    // Sin source maps: la demo pública nunca lleva el código legible.
    await cp(demo, destino, { recursive: true, filter: (ruta) => !ruta.endsWith('.map') });
    copiadas.push(slug);
    console.log(`✓ ${nombre} → dist/demos/${slug}/`);
  }

  for (const slug of vitrina) {
    if (!copiadas.includes(slug)) aviso(`la ficha "${slug}" no tiene demo; el visor mostrará la captura.`);
  }

  if (copiadas.length === 0) {
    aviso(`no hay demos en ${origen}. Publico sin demos.`);
    return;
  }
  console.log(`collect-demos: ${copiadas.length} demo(s) en dist/demos/.`);
}

main().catch((error) => {
  console.error(`collect-demos: ${error.message}`);
  process.exit(1);
});
