const pesos = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

const fechaLargaFmt = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const fechaCortaFmt = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** 2500 → "$2,500" (sin sufijo; la vista agrega "MXN"). */
export function pesosMXN(monto: number): string {
  return pesos.format(monto).replace(/\s?MXN$/, '');
}

/** "2026-11-18" → "18 de noviembre de 2026" */
export function fechaLarga(iso: string): string {
  return fechaLargaFmt.format(new Date(`${iso}T00:00:00Z`));
}

/** "2026-11-18" → "18 nov 2026" */
export function fechaCorta(iso: string): string {
  return fechaCortaFmt.format(new Date(`${iso}T00:00:00Z`)).replace(/\./g, '');
}
