/**
 * Datos de la marca. Lo que Hindra debe confirmar está marcado como "Pendiente".
 */
export const sitio = {
  nombre: 'Tigemsha',
  url: 'https://tigemsha.com',
  /** Número en formato wa.me: país + 1 + número, sin espacios ni signos. */
  whatsapp: '5215569418799',
  /** El mismo número, como se muestra en el aviso de privacidad. */
  telefono: '+52 1 55 6941 8799',
  correo: 'tigemsha@gmail.com',
  instagram: 'tigemsha',
  tiktok: 'tigemsha',
  /** El primer video de TikTok ("Deploy en viernes"). */
  tiktokVideo: 'https://www.tiktok.com/@tigemsha/video/7709630212824157446',
  /**
   * Logos de clientes (Liverpool, Nestlé, Banco Azteca, Elektra, Grupo Salinas,
   * GAM, Ayuntamiento de Mazarrón y Fixing Broken Houses). Con `false` la
   * sección de clientes no se publica.
   */
  mostrarClientes: true,
  /**
   * Pendiente: domicilio para oír y recibir notificaciones (LFPDPPP, art. 15).
   * Mientras sea `null`, el aviso de privacidad pide solicitarlo por WhatsApp.
   */
  domicilio: null as string | null,
  /** Fecha de la última actualización del aviso de privacidad (ISO). */
  avisoActualizado: '2026-11-19',
} as const;

export const instagramUrl = `https://www.instagram.com/${sitio.instagram}/`;
export const tiktokUrl = `https://www.tiktok.com/@${sitio.tiktok}`;
export const correoUrl = `mailto:${sitio.correo}`;
