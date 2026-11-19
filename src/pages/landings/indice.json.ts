import type { APIRoute } from 'astro';
import { generarIndice } from '../../lib/indice';

/** Índice compacto de la vitrina en español (búsqueda en el navegador). */
export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await generarIndice('es')), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
