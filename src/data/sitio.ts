/**
 * Datos de la marca. Lo que Hindra debe confirmar está marcado como "Pendiente".
 */
export const sitio = {
  nombre: 'Tigemsha',
  url: 'https://tigemsha.com',
  descripcion:
    'Software a la medida para empresas en México: automatización de procesos, apps web y móviles, y landings listas para tu negocio.',
  /** Número en formato wa.me: país + 1 + número, sin espacios ni signos. */
  whatsapp: '5215569418799',
  instagram: 'tigemsha',
  /**
   * Pendiente: Hindra confirma el permiso para mostrar los logos de Liverpool,
   * Nestlé y Banco Azteca. Con `false` la sección de clientes no se publica.
   */
  mostrarClientes: true,
  /**
   * Pendiente: domicilio para oír y recibir notificaciones (LFPDPPP, art. 15).
   * Mientras sea `null`, el aviso de privacidad pide solicitarlo por WhatsApp.
   */
  domicilio: null as string | null,
  /** Fecha de la última actualización del aviso de privacidad (ISO). */
  avisoActualizado: '2026-11-18',
} as const;

export const instagramUrl = `https://www.instagram.com/${sitio.instagram}/`;
