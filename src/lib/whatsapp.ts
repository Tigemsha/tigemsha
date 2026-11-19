import { sitio } from '../data/sitio';
import type { Landing } from './landings';

/** Enlace de WhatsApp con el mensaje ya escrito (wa.me directo, sin acortadores). */
export function enlaceWhatsApp(texto: string): string {
  return `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(texto)}`;
}

type LandingMensaje = Pick<Landing, 'codigo' | 'giro' | 'slug'>;

/** Todos los mensajes prellenados del sitio. */
export const mensajes = {
  cotizar: 'Hola, quiero cotizar un proyecto de software con Tigemsha.',
  contacto: 'Hola, quiero cotizar con Tigemsha.',
  privacidad: 'Hola, tengo una solicitud sobre mis datos personales (aviso de privacidad).',
  landings: 'Hola, quiero una landing para mi negocio. Mi giro es: ',
  laQuiero: (l: LandingMensaje) =>
    `Hola, quiero la landing ${l.codigo} (${l.giro}) para mi negocio. La vi en tigemsha.com/landings/${l.slug}`,
  pregunta: (l: LandingMensaje) =>
    `Hola, tengo una pregunta sobre la landing ${l.codigo} (${l.giro}).`,
} as const;
