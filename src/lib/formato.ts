import type { Idioma } from '../i18n';

const LOCALES: Record<Idioma, string> = { es: 'es-MX', en: 'en-US' };

const pesos = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

/** 2500 → "$2,500" (sin sufijo; la vista agrega "MXN"). Igual en los dos idiomas. */
export function pesosMXN(monto: number): string {
  return pesos.format(monto).replace(/\s?MXN$/, '');
}

const fmt = (idioma: Idioma, opciones: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(LOCALES[idioma], { ...opciones, timeZone: 'UTC' });

const largas = { es: fmt('es', { day: 'numeric', month: 'long', year: 'numeric' }), en: fmt('en', { day: 'numeric', month: 'long', year: 'numeric' }) };
const cortas = { es: fmt('es', { day: 'numeric', month: 'short', year: 'numeric' }), en: fmt('en', { day: 'numeric', month: 'short', year: 'numeric' }) };

const fecha = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** "2026-11-18" → "18 de noviembre de 2026" · "November 18, 2026" */
export function fechaLarga(iso: string, idioma: Idioma = 'es'): string {
  return largas[idioma].format(fecha(iso));
}

/** "2026-11-18" → "18 nov 2026" · "Nov 18, 2026" */
export function fechaCorta(iso: string, idioma: Idioma = 'es'): string {
  return cortas[idioma].format(fecha(iso)).replace(/\./g, '');
}
