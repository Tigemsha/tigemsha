import type { ImageMetadata } from 'astro';
import fixingBrokenHouses from '../assets/portafolio/fixing-broken-houses.webp';
import granAlianza from '../assets/portafolio/gran-alianza-mexicana.webp';
import maresDePapel from '../assets/portafolio/mares-de-papel.webp';
import silva from '../assets/portafolio/soluciones-integrales-silva.webp';

export interface Caso {
  nombre: string;
  tipo: string;
  descripcion: string;
  imagen: ImageMetadata;
  alt: string;
  /** Texto de la barra del marco de navegador. */
  marco: string;
  /** `null` cuando no hay un enlace verificado. */
  enlace: { url: string; texto: string } | null;
  /** Los casos destacados salen en la home (1 o 2). */
  destacado: boolean;
}

export const casos: readonly Caso[] = [
  {
    nombre: 'Mares de papel',
    tipo: 'App web',
    descripcion:
      'Registro a los eventos culturales del Ayuntamiento de Mazarrón, en España. Eliges el evento, llenas el formulario y recibes tu entrada con código QR por correo.',
    imagen: maresDePapel,
    alt: 'Pantalla de inicio de Mares de papel, de la Concejalía de Cultura del Ayuntamiento de Mazarrón',
    marco: 'Mares de papel · Mazarrón',
    enlace: {
      url: 'https://lavozdemazarron.com/index.php/noticias/4730-codigos-qr-para-las-entradas-de-mares-de-papel',
      texto: 'La nota en La Voz de Mazarrón',
    },
    destacado: true,
  },
  {
    nombre: 'Fixing Broken Houses',
    tipo: 'Sitio web',
    descripcion: 'Sitio para una empresa de remodelación y construcción en Texas.',
    imagen: fixingBrokenHouses,
    alt: 'Página de inicio de Fixing Broken Houses',
    marco: 'fixingbrokenhouses.com',
    enlace: { url: 'https://fixingbrokenhouses.com', texto: 'fixingbrokenhouses.com' },
    destacado: true,
  },
  {
    nombre: 'Grupo Gran Alianza Mexicana',
    tipo: 'Sitio web',
    descripcion: 'Sitio institucional de una asociación política en México.',
    imagen: granAlianza,
    alt: 'Página de inicio de Grupo Gran Alianza Mexicana',
    marco: 'ggam-76598.web.app',
    enlace: { url: 'https://ggam-76598.web.app/', texto: 'ggam-76598.web.app' },
    destacado: false,
  },
  {
    nombre: 'Soluciones Integrales Silva',
    tipo: 'Sitio web',
    descripcion: 'Sitio corporativo de una empresa de energía, climatización e instalaciones.',
    imagen: silva,
    alt: 'Página de inicio de Soluciones Integrales Silva',
    marco: 'Soluciones Integrales Silva',
    // En el sitio anterior enlazaba a la URL de Grupo Gran Alianza Mexicana (duplicada).
    // Pendiente: Hindra confirma la URL real.
    enlace: null,
    destacado: false,
  },
];
