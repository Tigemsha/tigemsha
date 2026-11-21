/**
 * Página /mercado-libre: el servicio de publicaciones para vendedores de
 * Mercado Libre México (línea CHAMBA, chambas/PLAN.md · Línea A).
 *
 * Solo en español: el servicio es para vendedores de México.
 * Los ejemplos son publicaciones reales de la tienda de Tigemsha (el "antes"
 * es lo que está publicado y el "después" es nuestra versión); no hay clientes,
 * cifras ni reseñas inventadas. Los precios los confirma Hindra.
 */
import luces from '../assets/mercado-libre/luces.jpg';
import pinas from '../assets/mercado-libre/pinas.jpg';
import pinzas from '../assets/mercado-libre/pinzas.jpg';

export const ml = {
  titulo: 'Publicaciones de Mercado Libre',
  descripcion:
    'Títulos, fichas técnicas y descripciones para tus publicaciones de Mercado Libre, listos para pegar. Muestra gratis y sin pedir tu contraseña.',

  hero: {
    etiqueta: 'Para vendedores de Mercado Libre',
    titulo: 'Publicaciones que sí se encuentran',
    sub: 'Título, ficha y descripción, listos para pegar en tu publicación.',
    cta: 'Pide tu muestra gratis',
    ctaSecundario: 'Ver paquetes',
    prueba: 'Nunca te pedimos tu contraseña',
    antes: 'Antes',
    despues: 'Después',
  },

  ejemplos: {
    titulo: 'Así cambia un título',
    sub: 'Tres publicaciones reales de nuestra tienda: hoy y con nuestro cambio.',
    lista: [
      {
        foto: pinzas,
        alt: 'Juego de dos pinzas de punta con mango negro',
        antes: 'Kit 2 Pinzas Mini Punta Y Universal Antideslizante Ele-gate',
        despues: 'Juego 2 Pinzas Punta Y Universal Ele-gate 13 Cm Bisutería',
        porque: '“Mini” traía pinzas para el cabello. “Bisutería” sí se busca.',
      },
      {
        foto: pinas,
        alt: 'Seis piñas navideñas con follaje y lazo rojo',
        antes: 'Set 6 Adornos Navideños Piña Con Follaje Esferas Y Lazo Rojo',
        despues: 'Set 6 Piñas Navideñas Adorno Árbol De Navidad Con Lazo Rojo',
        porque: 'Quien busca “esferas” quiere bolas, no piñas.',
      },
      {
        foto: luces,
        alt: 'Luz LED colgante con forma de muñeco de nieve',
        antes: 'Luz Led Colgante Navidad Muñeco De Nieve Decoración Ventana Blanco',
        despues: 'Adorno Navideño Muñeco De Nieve Colgante De Pilas Luz Led',
        porque: 'Ahora dice “de pilas”: no necesita enchufe.',
      },
    ],
  },

  incluye: {
    titulo: 'Qué te entregamos',
    sub: 'Todo en un documento, listo para copiar y pegar.',
    lista: [
      {
        icono: 'magnifying-glass',
        titulo: 'Título que se encuentra',
        texto: 'Con las palabras que la gente escribe en el buscador.',
      },
      {
        icono: 'check-circle',
        titulo: 'Ficha técnica completa',
        texto: 'Al 100 %, con datos confirmados de tu producto.',
      },
      {
        icono: 'receipt',
        titulo: 'Descripción que contesta',
        texto: 'Responde las 5 dudas que más hacen los compradores.',
      },
      {
        icono: 'package',
        titulo: 'Reglas de Mercado Libre',
        texto: 'Sin palabras prohibidas, datos de contacto ni enlaces.',
      },
    ],
  },

  paquetes: {
    titulo: 'Elige tu paquete',
    sub: 'Precio total en pesos, sin cargos extra.',
    recomendado: 'Recomendado',
    lista: [
      {
        nombre: 'Muestra',
        precio: 0,
        periodo: '',
        resumen: '1 publicación: título y descripción',
        puntos: ['Entrega en 1 a 2 días', 'Una por vendedor', 'Sin compromiso'],
        cta: 'Pedir mi muestra',
        mensaje: 'Hola, quiero la muestra gratis para una publicación de Mercado Libre. Este es el link: ',
        recomendado: false,
      },
      {
        nombre: 'Básico',
        precio: 1000,
        periodo: '',
        resumen: '10 publicaciones completas',
        puntos: ['Título, ficha y descripción', 'Entrega en 4 días', '2 rondas de cambios'],
        cta: 'Quiero el Básico',
        mensaje: 'Hola, me interesa el paquete Básico (10 publicaciones de Mercado Libre).',
        recomendado: true,
      },
      {
        nombre: 'Catálogo',
        precio: 3900,
        periodo: '',
        resumen: '50 publicaciones y reporte de palabras',
        puntos: ['Todo lo del Básico', 'Palabras clave de tu categoría', 'Entrega en 10 días, por tandas'],
        cta: 'Quiero el Catálogo',
        mensaje: 'Hola, me interesa el paquete Catálogo (50 publicaciones de Mercado Libre).',
        recomendado: false,
      },
      {
        nombre: 'Mensual',
        precio: 1900,
        periodo: 'al mes',
        resumen: 'Hasta 30 publicaciones nuevas al mes',
        puntos: ['Respuestas modelo a preguntas', 'Revisión de tus más vendidas', 'Cancelas cuando quieras'],
        cta: 'Quiero el Mensual',
        mensaje: 'Hola, me interesa el plan Mensual de publicaciones de Mercado Libre.',
        recomendado: false,
      },
    ],
  },

  pasos: {
    titulo: 'Cómo funciona',
    lista: [
      { titulo: 'Mándanos el link', texto: 'O la ficha de tu proveedor, por WhatsApp.' },
      { titulo: 'Te entregamos los textos', texto: 'Revisados con nuestra lista de calidad.' },
      { titulo: 'Tú los pegas', texto: 'En “Modificar”. Tu cuenta sigue siendo solo tuya.' },
    ],
  },

  preguntas: {
    titulo: 'Preguntas frecuentes',
    lista: [
      {
        pregunta: '¿Necesitan mi contraseña de Mercado Libre?',
        respuesta: 'No. Te entregamos los textos y tú los pegas en “Modificar”, o los pega quien lleve tu cuenta.',
      },
      {
        pregunta: '¿Esto me va a subir las ventas?',
        respuesta:
          'Quita los errores más comunes que hacen que una publicación no aparezca o no convenza. Pero el precio, las fotos, la reputación y el envío también cuentan, así que no prometemos ventas ni posiciones.',
      },
      {
        pregunta: '¿Usan inteligencia artificial?',
        respuesta:
          'Sí. Redactamos con herramientas de IA y revisamos cada publicación con una lista de calidad y las reglas de Mercado Libre antes de entregarla.',
      },
      {
        pregunta: '¿Inventan datos del producto?',
        respuesta: 'Nunca. Si un dato no está confirmado, no va en la ficha. Te preguntamos antes.',
      },
      {
        pregunta: '¿También hacen Amazon México?',
        respuesta: 'Sí, al mismo precio por publicación.',
      },
      {
        pregunta: '¿Traducen fichas de proveedores?',
        respuesta: 'Del inglés sí, va incluido. Del chino, solo si hay versión en inglés.',
      },
    ],
  },

  cierre: {
    titulo: 'Empieza con tu muestra',
    texto: 'Mándanos el link de una publicación y te la regresamos mejorada.',
    mensaje: 'Hola, quiero la muestra gratis para una publicación de Mercado Libre. Este es el link: ',
  },
} as const;
