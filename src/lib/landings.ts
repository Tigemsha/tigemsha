/**
 * Vitrina "Landings a la venta": lee src/data/landings.json, lo valida con zod
 * y lo convierte en el modelo que usan las páginas: el tema por defecto, las
 * capturas ya importadas (astro:assets) y las rutas que salen del slug. Si algo
 * no cumple (campos, rutas de captura, contraste AA de un tema), el build falla.
 */
import type { ImageMetadata } from 'astro';
import { z } from 'astro/zod';
import datos from '../data/landings.json';
import { AA_TEXTO, contraste } from './contraste';

const capturas = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/landings/**/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

const hex = z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Usa un color hex de 6 dígitos (#RRGGBB)');
const id = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'Solo minúsculas, números y guiones');

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

const esquemaLanding = z
  .object({
    codigo: z.string().regex(/^TGM-\d{3}$/, 'El código va como TGM-001'),
    slug: id,
    giro: z.string().min(1).max(40),
    nombre: z.string().min(1).max(40),
    fecha: z.iso.date(),
    precio_desde: z.number().int().positive(),
    mantenimiento_mes: z.number().int().nonnegative(),
    resumen: z.string().min(1).max(200),
    para: z.string().min(1).max(200),
    incluye: z.array(z.string().min(1)).min(1).max(10),
    editable: z.array(z.string().min(1)).min(1).max(16),
    plazo: z.string().min(1).max(40),
    tema_por_defecto: id,
    temas: z.array(esquemaTema).min(1).max(6),
    captura_movil: captura,
    captura_escritorio: captura,
    ficha_tecnica: z.object({
      peso_kb: z.number().positive().nullable(),
      lighthouse_movil: z.number().int().min(0).max(100).nullable(),
    }),
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
      /** Ficha en la vitrina. */
      href: `/landings/${l.slug}/`,
      /** Demo protegida (la publica scripts/collect-demos.mjs). */
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
export type Landing = z.output<typeof esquemaLanding>;

function cargar(): Landing[] {
  const resultado = esquemaVitrina.safeParse(datos);
  if (!resultado.success) {
    throw new Error(`src/data/landings.json no es válido:\n${z.prettifyError(resultado.error)}`);
  }
  return resultado.data.sort((a, b) => b.fecha.localeCompare(a.fecha) || b.codigo.localeCompare(a.codigo));
}

/** Todas las landings, de la más reciente a la más antigua. */
export const landings: readonly Landing[] = cargar();

/** El precio más bajo de la vitrina, para el copy ("desde $2,500 MXN"). */
export const precioMinimo = Math.min(...landings.map((l) => l.precio_desde));

/** El mantenimiento mensual más bajo de la vitrina. */
export const mantenimientoMinimo = Math.min(...landings.map((l) => l.mantenimiento_mes));
