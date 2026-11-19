import { sitio } from '../data/sitio';

/** Enlace de WhatsApp con el mensaje ya escrito (wa.me directo, sin acortadores). */
export function enlaceWhatsApp(texto: string): string {
  return `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(texto)}`;
}

interface LandingMensaje {
  codigo: string;
  giro: string;
  slug: string;
}

export const mensajes = {
  cotizar: 'Hola, quiero cotizar un proyecto de software con Tigemsha.',
  landings: 'Hola, quiero una landing para mi negocio. Mi giro es: ',
  laQuiero: (l: LandingMensaje) =>
    `Hola, quiero la landing ${l.codigo} (${l.giro}) para mi negocio. La vi en tigemsha.com/landings/${l.slug}`,
  pregunta: (l: LandingMensaje) =>
    `Hola, tengo una pregunta sobre la landing ${l.codigo} (${l.giro}).`,
} as const;
