/**
 * Búsqueda de la vitrina. La usan el build (para armar el índice) y el
 * navegador (para filtrar), así que no importa nada de Astro ni de Node.
 *
 * - Sin acentos ni mayúsculas: "Clínica" = "clinica".
 * - Sinónimos: cada landing trae sus palabras_clave ("gym", "box", "crossfit").
 * - Todas las palabras de la búsqueda tienen que aparecer (Y lógico), como
 *   inicio o pedazo de una palabra, o con un error de dedo en palabras largas.
 */

/** Texto → minúsculas sin acentos, solo letras y números separados por un espacio. */
export function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/** Palabras que no ayudan a buscar ("landing para mi gimnasio" → "gimnasio"). */
const VACIAS = new Set([
  'a', 'al', 'de', 'del', 'el', 'en', 'la', 'las', 'los', 'mi', 'mis', 'para', 'por', 'un', 'una', 'y',
  'landing', 'landings', 'pagina', 'plantilla', 'negocio',
  'an', 'and', 'for', 'my', 'of', 'the', 'page', 'template', 'business',
]);

export function terminos(consulta: string): string[] {
  const todas = normalizar(consulta).split(' ').filter(Boolean);
  const utiles = todas.filter((p) => !VACIAS.has(p));
  return utiles.length > 0 ? utiles : todas;
}

/** Distancia de edición con tope: corta en cuanto pasa de `tope`. */
function distancia(a: string, b: string, tope: number): number {
  if (Math.abs(a.length - b.length) > tope) return tope + 1;
  let previa = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const actual = [i];
    let minimo = i;
    for (let j = 1; j <= b.length; j++) {
      const valor = Math.min(
        (previa[j] ?? 0) + 1,
        (actual[j - 1] ?? 0) + 1,
        (previa[j - 1] ?? 0) + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
      actual.push(valor);
      if (valor < minimo) minimo = valor;
    }
    if (minimo > tope) return tope + 1;
    previa = actual;
  }
  return previa[b.length] ?? tope + 1;
}

/**
 * Qué tan bien coincide un término con un texto ya normalizado:
 * 3 = una palabra empieza con él, 2 = está dentro de una palabra,
 * 1 = con un error de dedo (palabras de 5 letras o más), 0 = no coincide.
 */
function puntuar(termino: string, palabras: readonly string[]): number {
  let mejor = 0;
  for (const palabra of palabras) {
    if (palabra.startsWith(termino)) return 3;
    if (termino.length >= 3 && palabra.includes(termino)) mejor = Math.max(mejor, 2);
    else if (
      mejor === 0 &&
      termino.length >= 5 &&
      (distancia(termino, palabra, 1) <= 1 || distancia(termino, palabra.slice(0, termino.length), 1) <= 1)
    ) {
      mejor = 1;
    }
  }
  return mejor;
}

/**
 * Puntaje de una entrada para una búsqueda: 0 si algún término no aparece.
 * Las coincidencias en el giro pesan el doble que las de las palabras clave.
 */
export function puntaje(terminosBusqueda: readonly string[], giro: string, claves: string): number {
  if (terminosBusqueda.length === 0) return 1;
  const enGiro = giro.split(' ');
  const enClaves = claves.split(' ');
  let total = 0;
  for (const termino of terminosBusqueda) {
    const p = Math.max(puntuar(termino, enGiro) * 2, puntuar(termino, enClaves));
    if (p === 0) return 0;
    total += p;
  }
  return total;
}
