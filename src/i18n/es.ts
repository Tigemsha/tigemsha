/**
 * Diccionario en español (idioma por defecto). en.ts tiene la misma forma.
 * Reglas de copy (DIRECCION.md v2): historias del negocio del cliente, sin
 * jerga, sin signos de exclamación y en minúsculas de oración.
 */
export const es = {
  locale: 'es-MX',

  meta: {
    inicioTitulo: 'Software a la medida para que tu negocio trabaje solo',
    inicioDescripcion:
      'Hacemos que las tareas que se repiten en tu negocio se hagan solas: facturas, inventario, citas y reportes. Sistemas a la medida, apps y landings. Trabajamos en México, Estados Unidos y España.',
    ogAlt: 'Tigemsha: tu negocio, trabajando solo',
  },

  nav: {
    saltar: 'Saltar al contenido',
    inicioAria: 'Tigemsha, ir al inicio',
    principal: 'Principal',
    landings: 'Landings',
    landingsCorto: 'Landings',
    servicios: 'Servicios',
    clientes: 'Clientes',
    preguntas: 'Preguntas',
    whatsapp: 'WhatsApp',
    whatsappAria: 'Escribir a Tigemsha por WhatsApp',
  },

  idioma: {
    etiqueta: 'Idioma',
    nombres: { es: 'Español', en: 'English' },
  },

  hero: {
    titulo: 'Tu negocio, trabajando solo.',
    rotaInicio: 'Una computadora',
    rota: [
      'captura tus facturas',
      'cuenta tu inventario',
      'agenda tus citas',
      'arma tus reportes',
      'avisa a quien te debe',
    ],
    rotaAccesible:
      'Una computadora captura tus facturas, cuenta tu inventario, agenda tus citas, arma tus reportes y avisa a quien te debe.',
    sub: 'Lo que hoy alguien de tu equipo copia, cuenta o contesta a mano, lo dejamos funcionando solo. Sistemas a la medida, apps y landings para tu negocio.',
    ctaPrincipal: 'Cuéntanos qué te quita tiempo',
    ctaSecundario: 'Ver landings',
    prueba: 'Trabajamos con empresas en México, Estados Unidos y España.',
    pausar: 'Pausar la animación',
    repetir: 'Ver el antes otra vez',
  },

  antesDespues: {
    aria: 'Animación: facturas, un Excel con errores y notas sueltas se acomodan solas en un panel ordenado con facturas capturadas, inventario, citas de hoy y cobranza.',
    factura: 'Factura',
    monto: '$1,240.00',
    sat: 'SAT',
    excel: ['Cliente', 'Monto', '¿Pagó?'],
    excelFilas: [
      ['Ruiz', '#¡REF!', '?'],
      ['López', '3,400', 'sí?'],
      ['Ruiz', '1,240', '??'],
    ],
    nota: '¿Ya pagó Ruiz?',
    mensajes: '37 sin leer',
    panel: 'Tu negocio hoy',
    filas: [
      { tema: 'Facturas de noviembre', valor: '200 capturadas' },
      { tema: 'Inventario', valor: '3 por acabarse' },
      { tema: 'Citas de hoy', valor: '12 confirmadas' },
      { tema: 'Cobranza', valor: '4 avisos enviados' },
    ],
    ventas: 'Ventas de la semana',
    aviso: 'Reporte de ventas listo',
    ejemplo: 'Ejemplo',
  },

  personajes: {
    titulo: '¿Quién hace esto en tu negocio?',
    sub: 'Seguro conoces a alguien así. Toca cada tarjeta para ver cómo queda cuando ese trabajo lo hace una computadora.',
    hoy: 'Hoy',
    ahora: 'Con Tigemsha',
    verAhora: 'Ver cómo queda',
    verAntes: 'Ver cómo era',
    horas: 'horas al mes de vuelta',
    estimacion: 'Estimación',
    nota: 'Las horas son una estimación hecha con tareas parecidas. En tu negocio pueden ser más o menos.',
    cierre:
      '¿Quién es la Anita de tu negocio? Cuéntanos qué tarea se repite y te decimos cómo dejarla funcionando sola.',
    cta: 'Cuéntanos qué te quita tiempo',
    lista: [
      {
        id: 'anita',
        nombre: 'Anita',
        puesto: 'Contabilidad',
        cifra: '200 facturas al mes',
        dolor:
          'Cada mes copia las facturas del SAT a Excel, una por una. Si se equivoca en un número, el cierre no cuadra.',
        ahora:
          'Las facturas se descargan del SAT y llegan solas a su Excel cada mañana. Anita solo revisa que todo esté bien.',
        horas: 12,
        cta: 'Tengo una Anita',
        mensaje:
          'Hola, en mi negocio alguien copia las facturas del SAT a Excel a mano (como Anita). ¿Me ayudan a que se haga solo?',
      },
      {
        id: 'luis',
        nombre: 'Luis',
        puesto: 'Inventario',
        cifra: 'Conteo en libreta cada semana',
        dolor:
          'Cuenta cajas con una libreta y se entera de que un producto se acabó cuando un cliente lo pide.',
        ahora:
          'Cada venta descuenta del inventario. Cuando algo está por acabarse, a Luis le llega un aviso por WhatsApp.',
        horas: 10,
        cta: 'Tengo un Luis',
        mensaje:
          'Hola, en mi negocio el inventario se cuenta a mano y se nos acaban productos sin aviso (como Luis). ¿Me ayudan?',
      },
      {
        id: 'marta',
        nombre: 'Marta',
        puesto: 'Citas',
        cifra: '80 WhatsApps al día',
        dolor:
          'Contesta mensajes todo el día para agendar, mover y confirmar citas. Entre uno y otro, se le cruzan dos clientes.',
        ahora:
          'Tus clientes eligen su horario en un enlace y reciben solos su confirmación y su recordatorio. Marta atiende a quien llega.',
        horas: 25,
        cta: 'Tengo una Marta',
        mensaje:
          'Hola, en mi negocio alguien agenda las citas a mano por WhatsApp todo el día (como Marta). ¿Me ayudan a que se haga solo?',
      },
      {
        id: 'jorge',
        nombre: 'Jorge',
        puesto: 'Reportes',
        cifra: 'Cada lunes, toda la mañana',
        dolor:
          'Junta las ventas de tres hojas de cálculo para armar el reporte de la semana. Cuando lo termina, ya es hora de comer.',
        ahora:
          'El lunes a las 8:00 el reporte de ventas ya está en su correo, con gráficas. Jorge llega a decidir, no a copiar.',
        horas: 12,
        cta: 'Tengo un Jorge',
        mensaje:
          'Hola, en mi negocio armamos los reportes a mano cada semana (como Jorge). ¿Me ayudan a que salgan solos?',
      },
    ],
  },

  vitrina: {
    titulo: 'Landings listas para tu negocio.',
    tenue: 'Una nueva cada 2 días.',
    sub: (precio: string, plazo: string) =>
      `Las ves funcionando, eliges colores y la publicamos con tus datos en ${plazo}. Desde ${precio} MXN.`,
    buscarEtiqueta: 'Buscar una plantilla por giro',
    placeholder: 'Busca una plantilla para tu negocio, p. ej. Gimnasio',
    buscar: 'Buscar',
    resumen: (publicadas: number, enCamino: number) =>
      `${publicadas === 1 ? '1 publicada' : `${publicadas} publicadas`} · ${enCamino} en camino`,
    resultados: (n: number, q: string) =>
      n === 1 ? `1 plantilla para “${q}”` : `${n} plantillas para “${q}”`,
    sinResultados: (q: string) => `Ninguna plantilla para “${q}” todavía`,
    carrusel: 'Landings a la venta',
    anterior: 'Anterior',
    siguiente: 'Siguiente',
    verTodas: (n: number) => `Ver todas las landings (${n})`,
    vacioTitulo: '¿No está tu giro? Te la hacemos.',
    vacioTexto: (plazo: string) => `Dinos qué negocio tienes y la armamos con tus datos en ${plazo}.`,
    vacioProxima: (giro: string) => `${giro} ya está en la fila. Pídela y te avisamos cuando salga.`,
    vacioCta: 'Pedir mi landing',
    pideTitulo: '¿No está tu giro?',
    pideTexto: 'Te la hacemos con tus datos, tu logo y tus colores.',
    pideCta: 'Pedir mi giro',
    salePronto: 'Sale pronto',
    proximaCta: 'Avísame',
    proximaAria: (giro: string) => `Avísame cuando salga la landing de ${giro}`,
    desde: 'desde',
    modelo: 'Modelo',
    verDemo: 'Ver demo',
    tarjetaAria: (codigo: string) => `: ver demo y precio de ${codigo}`,
    colores: 'Combinaciones de color',
  },

  landingsPagina: {
    titulo: 'Landings a la venta',
    descripcion: (precio: string) =>
      `Landings listas para negocios. Míralas funcionando, pruébalas con otros colores y la publicamos con tus datos. Desde ${precio} MXN.`,
    sub: (precio: string) =>
      `Landings listas para negocios. Las ves funcionando, eliges la combinación de color y la publicamos con tus datos. Desde ${precio} MXN.`,
    filtros: 'Filtrar por familia',
    todas: 'Todas',
    orden: 'Ordenar',
    ordenNuevas: 'Más nuevas',
    ordenAZ: 'De la A a la Z',
    contador: (n: number, total: number) =>
      n === total ? `${total === 1 ? '1 landing' : `${total} landings`}` : `${n} de ${total} landings`,
    mostrarMas: 'Mostrar más',
    unaNuevaCadaDia: 'Una nueva cada 2 días',
  },

  familias: {
    fitness: 'Fitness',
    salud: 'Salud',
    belleza: 'Belleza',
    educacion: 'Educación',
    servicios: 'Servicios',
    hogar: 'Hogar',
    eventos: 'Eventos',
    hospedaje: 'Hospedaje',
  },

  clientes: {
    titulo: 'Empresas con las que hemos trabajado',
    sub: 'Trabajamos con empresas en México, Estados Unidos y España.',
    tambien: 'También: Mares de Papel (España) y Soluciones Integrales Silva.',
    pausar: 'Pausar los logos',
    marcas: 'Los nombres y logos son marcas de sus dueños.',
  },

  redes: {
    titulo: 'Aprende con nosotros',
    sub: 'Subimos tips de tecnología explicados fácil, alertas de seguridad y humor para devs.',
    seguirInstagram: 'Seguir en Instagram',
    seguirTiktok: 'Seguir en TikTok',
    postAria: (tema: string) => `Post de Instagram: ${tema}`,
    tiktokTitulo: 'Deploy en viernes',
    tiktokTexto: 'El primer video de humor para devs en nuestro TikTok.',
    tiktokCta: 'Ver el video',
    posts: {
      'ig-nextjs-seguridad': 'alerta de seguridad, ¿tu web en Next.js está al día?',
      'ig-structuredclone': 'tip de JavaScript, deja de clonar objetos con JSON.parse',
      'ig-github-cli': 'herramienta, 6 comandos de GitHub CLI que te ahorran clics',
      'ig-java4shell': 'alerta de seguridad, Java4Shell: parchea tu Java hoy',
      'ig-automatizar-empresa': 'para empresas, 5 tareas que tu empresa sigue haciendo a mano',
      'ig-vale-la-pena-automatizar': 'para empresas, ¿vale la pena automatizar esa tarea?',
    },
  },

  preguntas: {
    titulo: 'Preguntas frecuentes',
    ayuda: 'Si tu duda no está aquí,',
    ayudaEnlace: 'pregúntanos por WhatsApp',
    landing: (plazo: string, mantenimiento: string) => [
      {
        pregunta: '¿El código es mío?',
        respuesta:
          'Sí. Al pagar te entregamos el código fuente de tu landing, ya con tus datos, para que la publiques donde quieras. La demo de la vitrina se queda en tigemsha.com con marca de agua.',
      },
      {
        pregunta: '¿Dónde se aloja?',
        respuesta: `Es un sitio estático: funciona en Netlify, Vercel, Cloudflare Pages o en el hosting que ya tengas. Si contratas el mantenimiento, desde ${mantenimiento} MXN al mes, nosotros la publicamos y la mantenemos en línea.`,
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
    ],
    software: {
      pregunta: '¿Cómo cotizan un proyecto de software a medida?',
      respuesta:
        'Nos cuentas por WhatsApp qué tarea quieres que se haga sola y quién la hace hoy. Con eso te proponemos el alcance, el plazo y el precio por escrito antes de empezar.',
    },
  },

  cierre: {
    titulo: 'Cuéntanos qué te quita tiempo',
    texto:
      'Escríbenos por WhatsApp. Si es una landing, dinos el código y tu giro; si es otra cosa, cuéntanos qué tarea se repite en tu negocio y quién la hace hoy.',
    whatsapp: 'Escribir por WhatsApp',
    aviso: 'Lo que nos mandes se usa solo para atenderte. Lee el',
    avisoEnlace: 'aviso de privacidad',
  },

  pie: {
    aria: 'Pie de página',
    enlaces: {
      landings: 'Landings a la venta',
      servicios: 'Servicios',
      preguntas: 'Preguntas frecuentes',
      aviso: 'Aviso de privacidad',
    },
    redes: 'Redes y contacto',
    instagram: 'Instagram de Tigemsha',
    tiktok: 'TikTok de Tigemsha',
    whatsapp: 'WhatsApp de Tigemsha',
    correo: 'Correo de Tigemsha',
    legal: (anio: number) =>
      `© ${anio} Tigemsha. Las demos de la vitrina son muestras con marca de agua; prohibida su copia o redistribución.`,
  },

  flotante: 'Escribir por WhatsApp',

  ficha: {
    migas: 'Ruta',
    titulo: (giro: string) => `Landing para ${giro}`,
    tituloPagina: (giro: string, codigo: string) => `Landing para ${giro} ${codigo}`,
    descripcion: (resumen: string, precio: string) =>
      `${resumen} Desde ${precio} MXN. Mírala funcionando y pruébala con otros colores.`,
    modelo: 'Modelo',
    publicada: 'Publicada el',
    demoAria: 'Demo en vivo',
    precioTitulo: 'Precio y compra',
    desde: 'desde',
    mantenimiento: 'Mantenimiento:',
    alMes: 'MXN al mes',
    laQuiero: 'La quiero para mi negocio',
    laQuieroCorto: 'La quiero',
    pregunta: 'Tengo una pregunta',
    plazo: 'Plazo',
    plazoSufijo: 'desde que tenemos tus datos',
    para: 'Para',
    incluye: 'Qué incluye',
    codigoTuyo: 'El código fuente, a tu nombre, al pagar',
    tecnica: 'Ficha técnica',
    tecnicaTexto:
      'Todo lo que cambia de un negocio a otro vive en un archivo de configuración. Para adaptarla a tu negocio no se toca el diseño.',
    editable: 'Qué se puede editar',
    datos: 'Datos técnicos',
    peso: 'Peso de la página',
    lighthouse: 'Lighthouse en celular',
    deCien: 'de 100',
    pendiente: 'Se mide al publicar la demo',
    tecnologia: 'Tecnología',
    tecnologiaValor: 'HTML y CSS estáticos hechos con Astro, casi sin JavaScript',
    hosting: 'Hosting',
    hostingValor: 'Cualquier hosting estático: Netlify, Vercel, Cloudflare Pages o el tuyo',
    otras: 'Otras landings',
    cierreTitulo: 'Pídela para tu negocio',
    cierreTexto: (codigo: string) =>
      `Mándanos un WhatsApp con el código ${codigo}. Te decimos qué datos necesitamos y cuándo queda lista.`,
    barraAria: 'Comprar esta landing',
    demoEnEspanol: 'La demo está en español, como la recibe tu cliente en México.',
  },

  visor: {
    dispositivos: 'Tamaño de pantalla de la demo',
    celular: 'Celular',
    tablet: 'Tablet',
    escritorio: 'Escritorio',
    abrir: 'Abrir la demo en otra pestaña',
    temasTitulo: 'Pruébala con otros colores',
    temasNota:
      'Cada combinación cambia los colores de la demo en vivo. Al comprarla eliges una o nos pides los colores de tu marca.',
    cargando: 'Cargando la demo en vivo…',
    sinDemo: 'La demo en vivo se publica pronto. Mientras, mira la captura.',
    sinDemoTema: (nombre: string) => `La demo en vivo todavía no está publicada. ${nombre} queda elegido.`,
    conTema: (nombre: string) => `Demo con la combinación ${nombre}.`,
    iframe: (codigo: string) => `Demo en vivo de la landing ${codigo}`,
  },

  captura: {
    alt: (vista: 'movil' | 'escritorio', codigo: string, giro: string) =>
      `Captura en ${vista === 'movil' ? 'celular' : 'escritorio'} de la landing ${codigo} para ${giro}`,
    sello: 'Muestra',
  },

  error404: {
    titulo: 'Página no encontrada',
    descripcion: 'Esta dirección no existe en tigemsha.com.',
    h1: 'Esta página no existe',
    texto: 'Puede que el enlace esté mal escrito o que la página haya cambiado de lugar. Desde aquí puedes seguir:',
    landings: 'Ver landings a la venta',
    inicio: 'Ir al inicio',
    ayuda: '¿Buscabas algo en particular?',
    ayudaEnlace: 'Escríbenos por WhatsApp',
  },

  whatsapp: {
    hero: 'Hola, quiero que una tarea de mi negocio se haga sola. Hoy nos quita tiempo: ',
    cotizar: 'Hola, quiero cotizar un proyecto de software con Tigemsha.',
    contacto: 'Hola, quiero cotizar con Tigemsha.',
    personajes: 'Hola, en mi negocio hay una tarea que se repite y quiero que se haga sola: ',
    privacidad: 'Hola, tengo una solicitud sobre mis datos personales (aviso de privacidad).',
    landings: 'Hola, quiero una landing para mi negocio. Mi giro es: ',
    busqueda: (q: string) =>
      `Hola, busqué una landing para "${q}" en tigemsha.com y no la encontré. ¿Me la hacen?`,
    proxima: (giro: string) =>
      `Hola, quiero la landing para ${giro} cuando salga. Avísenme, por favor.`,
    flotante: 'Hola, vi tigemsha.com y quiero platicar de mi negocio.',
    laQuiero: (codigo: string, giro: string, url: string) =>
      `Hola, quiero la landing ${codigo} (${giro}) para mi negocio. La vi en ${url}`,
    pregunta: (codigo: string, giro: string) =>
      `Hola, tengo una pregunta sobre la landing ${codigo} (${giro}).`,
  },
} as const;
