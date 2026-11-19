import { sitio } from '../data/sitio';

/** Enlace de WhatsApp con el mensaje ya escrito (wa.me directo, sin acortadores). */
export function enlaceWhatsApp(texto: string): string {
  return `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(texto)}`;
}

/** Enlace de WhatsApp sin mensaje (pie de página). */
export const whatsappDirecto = `https://wa.me/${sitio.whatsapp}`;
