/**
 * Índice compacto de la vitrina: lo genera el build (/landings/indice.json y
 * /en/landings/indice.json) y lo lee src/scripts/vitrina.ts para buscar en el
 * navegador. Lleva solo lo que pinta una tarjeta y lo que se busca, ya
 * normalizado, para aguantar cientos de landings en pocos KB comprimidos.
 */
import { getImage } from 'astro:assets';
import { type Idioma, t } from '../i18n';
import { normalizar } from './busqueda';
import { pesosMXN } from './formato';
import { type Familia, type Landing, type LandingDatos, landingsEn, proximas, todasLasLandings } from './landings';

/** La captura de la tarjeta: 240 px de ancho lógico (480 en pantallas 2x). */
export const ANCHOS_TARJETA = [240, 480];
export const SIZES_TARJETA = '(min-width: 64rem) 264px, 244px';

export interface EntradaIndice {
  /** slug */
  s: string;
  /** código */
  c: string;
  /** giro en el idioma de la página */
  g: string;
  /** nombre del modelo */
  n: string;
  /** fecha ISO */
  f: string;
  /** familia */
  m: Familia;
  /** precio "desde", ya con formato */
  p: string;
  /** ruta de la ficha */
  h: string;
  /** giro normalizado (pesa más en la búsqueda) */
  q: string;
  /** todo lo demás que se busca, normalizado: sinónimos en los dos idiomas, modelo, código, familia */
  k: string;
  /** hasta 4 temas: [fondo, superficie, tinta, acento] */
  t: string[][];
  /** captura: srcset AVIF, srcset WebP, src de respaldo, ancho, alto y alt */
  i: { a: string; w: string; s: string; an: number; al: number; alt: string };
}

export interface ProximaIndice {
  /** giro en el idioma de la página */
  g: string;
  /** nombre y sinónimos normalizados */
  k: string;
}

export interface Indice {
  v: 1;
  l: EntradaIndice[];
  px: ProximaIndice[];
}

/** Lo que se busca de una landing: sinónimos y nombres en los dos idiomas, normalizado. */
export function clavesDe(l: LandingDatos, idioma: Idioma): { q: string; k: string } {
  const giro = idioma === 'es' ? l.giro : l.en.giro;
  const resto = [
    idioma === 'es' ? l.en.giro : l.giro,
    l.nombre,
    l.en.nombre,
    l.codigo,
    l.slug.replace(/-/g, ' '),
    t('es').familias[l.familia],
    t('en').familias[l.familia],
    ...l.palabras_clave,
    ...l.en.palabras_clave,
  ];
  return { q: normalizar(giro), k: normalizar(resto.join(' ')) };
}

export function proximasDe(idioma: Idioma): ProximaIndice[] {
  return proximas.map((p) => ({
    g: idioma === 'es' ? p.nombre : p.nombre_en,
    k: normalizar(
      [p.nombre, p.nombre_en, p.slug.replace(/-/g, ' '), ...p.palabras_clave, ...p.palabras_clave_en].join(' '),
    ),
  }));
}

async function entrada(l: Landing): Promise<EntradaIndice> {
  const imagen = l.imagenes.movil;
  const opciones = { src: imagen, widths: ANCHOS_TARJETA, sizes: SIZES_TARJETA };
  const [avif, webp] = await Promise.all([
    getImage({ ...opciones, format: 'avif' }),
    getImage({ ...opciones, format: 'webp' }),
  ]);
  // Los sinónimos salen de los datos crudos: la landing localizada ya trae el giro traducido.
  const crudo = todasLasLandings.find((x) => x.slug === l.slug) ?? l;
  return {
    s: l.slug,
    c: l.codigo,
    g: l.giro,
    n: l.nombre,
    f: l.fecha,
    m: l.familia,
    p: pesosMXN(l.precio_desde),
    h: l.href,
    ...clavesDe(crudo, l.idioma),
    t: l.temas.slice(0, 4).map((tema) => [tema.fondo, tema.superficie, tema.tinta, tema.acento]),
    i: {
      a: avif.srcSet.attribute,
      w: webp.srcSet.attribute,
      s: webp.src,
      an: imagen.width,
      al: imagen.height,
      alt: t(l.idioma).captura.alt('movil', l.codigo, l.giro.toLowerCase()),
    },
  };
}

export async function generarIndice(idioma: Idioma): Promise<Indice> {
  const lista = await Promise.all(landingsEn(idioma).map(entrada));
  return { v: 1, l: lista, px: proximasDe(idioma) };
}
