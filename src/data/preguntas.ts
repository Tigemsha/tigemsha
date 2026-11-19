import { mantenimientoMinimo } from '../lib/landings';
import { pesosMXN } from '../lib/formato';

export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

/**
 * Preguntas frecuentes sobre la compra de una landing.
 * Pendiente: Hindra confirma exclusividad, qué cubre el mantenimiento y los plazos.
 */
export function preguntasLanding(plazo: string): Pregunta[] {
  return [
    {
      pregunta: '¿El código es mío?',
      respuesta:
        'Sí. Al pagar te entregamos el código fuente de tu landing, ya con tus datos, para que la publiques donde quieras. La demo de la vitrina se queda en tigemsha.com con marca de agua.',
    },
    {
      pregunta: '¿Dónde se aloja?',
      respuesta: `Es un sitio estático: funciona en Netlify, Vercel, Cloudflare Pages o en el hosting que ya tengas. Si contratas el mantenimiento, desde ${pesosMXN(mantenimientoMinimo)} MXN al mes, nosotros la publicamos y la mantenemos en línea.`,
    },
    {
      pregunta: '¿Puedo usar mi dominio?',
      respuesta:
        'Sí. Si ya tienes dominio, lo conectamos. Si no tienes, te ayudamos a registrarlo a tu nombre; el costo anual del dominio se paga aparte, directo al registrador.',
    },
    {
      pregunta: '¿Puedo pedir cambios después?',
      respuesta:
        'Sí. Textos, fotos, colores, horarios, precios y WhatsApp viven en un archivo de configuración, así que se cambian sin tocar el diseño. Los cambios de estructura o secciones nuevas se cotizan aparte.',
    },
    {
      pregunta: '¿Cuánto tarda?',
      respuesta: `${plazo} desde que nos mandas tu logo, fotos, horarios y precios. Si te falta algo, te decimos qué y te dejamos los espacios listos.`,
    },
  ];
}

/** Preguntas de la home: las de la compra más una sobre software a medida. */
export function preguntasHome(plazo: string): Pregunta[] {
  return [
    ...preguntasLanding(plazo),
    {
      pregunta: '¿Cómo cotizan un proyecto de software a medida?',
      respuesta:
        'Nos cuentas por WhatsApp qué proceso quieres resolver y quién lo va a usar. Con eso te proponemos el alcance, el plazo y el precio por escrito antes de empezar.',
    },
  ];
}
