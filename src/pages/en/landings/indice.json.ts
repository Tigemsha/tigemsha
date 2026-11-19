import type { APIRoute } from 'astro';
import { generarIndice } from '../../../lib/indice';

/** Compact showcase index in English (client-side search). */
export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await generarIndice('en')), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
