/**
 * Idiomas del sitio: español por defecto en `/` e inglés en `/en/`
 * (i18n de astro.config.mjs con prefixDefaultLocale: false).
 *
 * Cada idioma tiene su diccionario (es.ts, en.ts). El de inglés se tipa con la
 * forma del de español, así que si falta una clave el build falla.
 */
import { en } from './en';
import { es } from './es';

export const idiomas = ['es', 'en'] as const;
export type Idioma = (typeof idiomas)[number];
export const idiomaPorDefecto: Idioma = 'es';

/** Texto literal → string; funciones y arreglos conservan su forma. */
type Ensanchar<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends (...args: infer A) => infer R
        ? (...args: A) => Ensanchar<R>
        : T extends readonly (infer U)[]
          ? readonly Ensanchar<U>[]
          : T extends object
            ? { readonly [K in keyof T]: Ensanchar<T[K]> }
            : T;

export type Diccionario = Ensanchar<typeof es>;

const diccionarios: Record<Idioma, Diccionario> = { es, en };

export function t(idioma: Idioma): Diccionario {
  return diccionarios[idioma];
}

/** `lang` del <html> y de los enlaces. */
export const etiquetaLang: Record<Idioma, string> = { es: 'es-MX', en: 'en' };

/** Locale de Open Graph. */
export const localeOg: Record<Idioma, string> = { es: 'es_MX', en: 'en_US' };

/** Páginas con ruta propia por idioma. */
const rutas = {
  es: { inicio: '/', landings: '/landings/', aviso: '/aviso-de-privacidad/' },
  en: { inicio: '/en/', landings: '/en/landings/', aviso: '/en/privacy-notice/' },
} as const satisfies Record<Idioma, Record<string, string>>;

export type Pagina = keyof (typeof rutas)['es'];

export function ruta(idioma: Idioma, pagina: Pagina): string {
  return rutas[idioma][pagina];
}

/** Ficha de una landing: /landings/<slug>/ o /en/landings/<slug>/. */
export function rutaFicha(idioma: Idioma, slug: string): string {
  return `${rutas[idioma].landings}${slug}/`;
}

/** Índice compacto de la vitrina para la búsqueda en el navegador. */
export function rutaIndice(idioma: Idioma): string {
  return `${rutas[idioma].landings}indice.json`;
}

/** La misma página en cada idioma (para hreflang y el selector ES/EN). */
export type Alternas = Record<Idioma, string>;

export function alternasDe(pagina: Pagina): Alternas {
  return { es: rutas.es[pagina], en: rutas.en[pagina] };
}

export function alternasFicha(slug: string): Alternas {
  return { es: rutaFicha('es', slug), en: rutaFicha('en', slug) };
}
