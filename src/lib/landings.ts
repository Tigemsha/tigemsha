/**
 * Vitrina "Landings a la venta": lee src/data/landings.json, lo valida con zod
 * y lo convierte en el modelo que usan las páginas: el tema por defecto, las
 * capturas ya importadas (astro:assets) y las rutas que salen del slug. Si algo
 * no cumple (campos, rutas de captura, contraste AA de un tema), el build falla.
 *
 * Prueba de escala: con TGM_LANDINGS=<ruta a un JSON> el build lee ese archivo
 * en lugar de landings.json (lo genera `npm run prueba:datos`, con 60 landings
 * ficticias, en .prueba/, que no se sube ni se publica).
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { ImageMetadata } from 'astro';
import { z } from 'astro/zod';
import datosReales from '../data/landings.json';
import proximasDatos from '../data/proximas.json';
import { type Idioma, rutaFicha } from '../i18n';
import { AA_TEXTO, contraste } from './contraste';

const capturas = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/landings/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

/** Familias de giros para los filtros de /landings. Las etiquetas viven en i18n. */
export const FAMILIAS = [
  'fitness',
  'salud',
  'belleza',
  'educacion',
  'servicios',
  'hogar',
  'eventos',
  'hospedaje',
] as const;
export type Familia = (typeof FAMILIAS)[number];

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Usa un color hex de 6 dígitos (#RRGGBB)');
const id = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Solo minúsculas, números y guiones');
const palabras = z.array(z.string().min(1).max(40)).max(24);

/** Pares texto/fondo que deben pasar AA en cada tema. */
const PARES_AA = [
  ['tinta', 'fondo'],
  ['tinta', 'superficie'],
  ['texto_acento', 'acento'],
] as const;

const esquemaTema = z
  .object({
    id,
    nombre: z.string().min(1).max(24),
    nombre_en: z.string().min(1).max(24).optional(),
    fondo: hex,
    superficie: hex,
    tinta: hex,
    acento: hex,
    texto_acento: hex,
  })
  .superRefine((tema, ctx) => {
    for (const [texto, fondo] of PARES_AA) {
      const ratio = contraste(tema[texto], tema[fondo]);
      if (ratio < AA_TEXTO) {
        ctx.addIssue({
          code: 'custom',
          message: `Tema "${tema.id}": ${texto} sobre ${fondo} da ${ratio.toFixed(2)}:1 y el mínimo AA es ${AA_TEXTO}:1`,
        });
      }
    }
  });

/** "src/assets/landings/…" → la imagen ya importada. */
const captura = z.string().transform((ruta, ctx) => {
  const imagen = capturas[`/${ruta.replace(/^\/+/, '')}`]?.default;
  if (!imagen) {
    ctx.addIssue({ code: 'custom', message: 'La captura no existe. Usa una ruta dentro de src/assets/landings/' });
    return z.NEVER;
  }
  return imagen;
});

/** Textos en inglés de la ficha (las demos siguen en español). */
const esquemaIngles = z.object({
  giro: z.string().min(1).max(40),
  nombre: z.string().min(1).max(40),
  resumen: z.string().min(1).max(200),
  para: z.string().min(1).max(200),
  plazo: z.string().min(1).max(40).optional(),
  incluye: z.array(z.string().min(1)).min(1).max(10),
  editable: z.array(z.string().min(1)).min(1).max(16),
  palabras_clave: palabras,
});

const esquemaLanding = z
  .object({
    codigo: z.string().regex(/^TGM-\d{3,4}$/, 'El código va como TGM-001'),
    slug: id,
    giro: z.string().min(1).max(40),
    nombre: z.string().min(1).max(40),
    familia: z.enum(FAMILIAS),
    fecha: z.iso.date(),
    precio_desde: z.number().int().positive(),
    mantenimiento_mes: z.number().int().nonnegative(),
    resumen: z.string().min(1).max(200),
    para: z.string().min(1).max(200),
    incluye: z.array(z.string().min(1)).min(1).max(10),
    editable: z.array(z.string().min(1)).min(1).max(16),
    /** Sinónimos para el buscador ("gym", "box", "crossfit"…). */
    palabras_clave: palabras,
    plazo: z.string().min(1).max(40),
    tema_por_defecto: id,
    temas: z.array(esquemaTema).min(1).max(6),
    captura_movil: captura,
    captura_escritorio: captura,
    ficha_tecnica: z.object({
      peso_kb: z.number().positive().nullable(),
      lighthouse_movil: z.number().int().min(0).max(100).nullable(),
    }),
    en: esquemaIngles,
  })
  .superRefine((l, ctx) => {
    const ids = l.temas.map((t) => t.id);
    if (new Set(ids).size !== ids.length) {
      ctx.addIssue({ code: 'custom', message: `${l.codigo}: hay temas con el mismo id` });
    }
  })
  .transform(({ captura_movil, captura_escritorio, ...l }, ctx) => {
    const tema = l.temas.find((t) => t.id === l.tema_por_defecto);
    if (!tema) {
      ctx.addIssue({
        code: 'custom',
        message: `${l.codigo}: tema_por_defecto "${l.tema_por_defecto}" no está en temas`,
      });
      return z.NEVER;
    }
    return {
      ...l,
      tema,
      imagenes: { movil: captura_movil, escritorio: captura_escritorio },
      /** Demo protegida (la publica scripts/collect-demos.mjs). Siempre en español. */
      demo: `/demos/${l.slug}/`,
    };
  });

const esquemaVitrina = z
  .array(esquemaLanding)
  .min(1)
  .superRefine((lista, ctx) => {
    for (const campo of ['codigo', 'slug'] as const) {
      const valores = lista.map((l) => l[campo]);
      const repetidos = valores.filter((v, i) => valores.indexOf(v) !== i);
      if (repetidos.length > 0) {
        ctx.addIssue({ code: 'custom', message: `${campo} repetido: ${repetidos.join(', ')}` });
      }
    }
  });

export type Tema = z.output<typeof esquemaTema>;
export type LandingDatos = z.output<typeof esquemaLanding>;

function leerDatos(): unknown {
  const ruta = process.env.TGM_LANDINGS;
  if (!ruta) return datosReales;
  const absoluta = path.resolve(process.cwd(), ruta);
  console.warn(`[vitrina] Usando datos de prueba: ${absoluta}`);
  return JSON.parse(readFileSync(absoluta, 'utf8'));
}

function cargar(): LandingDatos[] {
  const resultado = esquemaVitrina.safeParse(leerDatos());
  if (!resultado.success) {
    throw new Error(`src/data/landings.json no es válido:\n${z.prettifyError(resultado.error)}`);
  }
  return resultado.data.sort((a, b) => b.fecha.localeCompare(a.fecha) || b.codigo.localeCompare(a.codigo));
}

const datos = cargar();

/**
 * Una landing ya en el idioma de la página: giro, nombre y textos de la ficha
 * en inglés en /en/, y su ruta en ese idioma.
 */
export interface Landing extends LandingDatos {
  idioma: Idioma;
  href: string;
  /** Nombre del tema en el idioma de la página. */
  nombreTema: (tema: Tema) => string;
}

export function localizar(l: LandingDatos, idioma: Idioma): Landing {
  const base = { ...l, idioma, href: rutaFicha(idioma, l.slug) };
  if (idioma === 'es') return { ...base, nombreTema: (t) => t.nombre };
  return {
    ...base,
    giro: l.en.giro,
    nombre: l.en.nombre,
    resumen: l.en.resumen,
    para: l.en.para,
    plazo: l.en.plazo ?? l.plazo,
    incluye: l.en.incluye,
    editable: l.en.editable,
    nombreTema: (t) => t.nombre_en ?? t.nombre,
  };
}

/** Todas las landings (datos crudos, de la más reciente a la más antigua). */
export const todasLasLandings: readonly LandingDatos[] = datos;

/** Las landings en un idioma, de la más reciente a la más antigua. */
export function landingsEn(idioma: Idioma): Landing[] {
  return datos.map((l) => localizar(l, idioma));
}

/** El precio más bajo de la vitrina, para el copy ("desde $2,500 MXN"). */
/**
 * Los siguientes giros de la fila ("Sale pronto"). Nunca incluye un giro que ya
 * está publicado, aunque proximas.json se haya quedado atrás (npm run sync-proximas).
 */
export const proximas = proximasDatos.filter((p) => !datos.some((l) => l.slug === p.slug));

export const precioMinimo = Math.min(...datos.map((l) => l.precio_desde));

/** El mantenimiento mensual más bajo de la vitrina. */
export const mantenimientoMinimo = Math.min(...datos.map((l) => l.mantenimiento_mes));

/** Las familias que tienen al menos una landing, en el orden de FAMILIAS, con su cuenta. */
export const familiasConLandings: { familia: Familia; total: number }[] = FAMILIAS.map((familia) => ({
  familia,
  total: datos.filter((l) => l.familia === familia).length,
})).filter((f) => f.total > 0);
