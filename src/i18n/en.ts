/**
 * English dictionary. Same shape as es.ts (the type is checked at build time).
 * The landing demos stay in Spanish: they are built for businesses in Mexico.
 */
import type { Diccionario } from './index';

export const en: Diccionario = {
  locale: 'en-US',

  meta: {
    inicioTitulo: 'Custom software so your business runs itself',
    inicioDescripcion:
      'We make the repetitive work in your business happen on its own: invoices, inventory, appointments and reports. Custom systems, apps and landing pages. We work with companies in Mexico, the United States and Spain.',
    ogAlt: 'Tigemsha: your business, running itself',
  },

  nav: {
    saltar: 'Skip to content',
    inicioAria: 'Tigemsha, go to home page',
    principal: 'Main',
    landings: 'Landing pages',
    landingsCorto: 'Landings',
    servicios: 'Services',
    clientes: 'Clients',
    preguntas: 'FAQ',
    whatsapp: 'WhatsApp',
    whatsappAria: 'Message Tigemsha on WhatsApp',
  },

  idioma: {
    etiqueta: 'Language',
    nombres: { es: 'Español', en: 'English' },
  },

  hero: {
    titulo: 'Your business, running itself.',
    rotaInicio: 'A computer',
    rota: [
      'enters your invoices',
      'counts your inventory',
      'books your appointments',
      'builds your reports',
      'reminds who owes you',
    ],
    rotaAccesible:
      'A computer enters your invoices, counts your inventory, books your appointments, builds your reports and reminds who owes you.',
    sub: 'What someone on your team copies, counts or answers by hand today, we set up to run on its own. Custom systems, apps and landing pages for your business.',
    ctaPrincipal: 'Tell us what eats your time',
    ctaSecundario: 'See landing pages',
    prueba: 'We work with companies in Mexico, the United States and Spain.',
    pausar: 'Pause the animation',
    repetir: 'Show the before again',
  },

  antesDespues: {
    aria: 'Animation: invoices, a spreadsheet full of errors and loose notes arrange themselves into a tidy dashboard with entered invoices, inventory, today’s appointments and collections.',
    factura: 'Invoice',
    monto: '$1,240.00',
    sat: 'TAX',
    excel: ['Client', 'Amount', 'Paid?'],
    excelFilas: [
      ['Ruiz', '#REF!', '?'],
      ['Lopez', '3,400', 'yes?'],
      ['Ruiz', '1,240', '??'],
    ],
    nota: 'Did Ruiz pay?',
    mensajes: '37 unread',
    panel: 'Your business today',
    filas: [
      { tema: 'November invoices', valor: '200 entered' },
      { tema: 'Inventory', valor: '3 running low' },
      { tema: 'Today’s appointments', valor: '12 confirmed' },
      { tema: 'Collections', valor: '4 reminders sent' },
    ],
    ventas: 'Sales this week',
    aviso: 'Sales report ready',
    ejemplo: 'Example',
  },

  personajes: {
    titulo: 'Who does this in your business?',
    sub: 'You probably know someone like this. Tap each card to see what changes when a computer does that work.',
    hoy: 'Today',
    ahora: 'With Tigemsha',
    verAhora: 'See what changes',
    verAntes: 'See how it was',
    horas: 'hours a month back',
    estimacion: 'Estimate',
    nota: 'Hours are an estimate based on similar tasks. In your business they may be more or less.',
    cierre:
      'Who is the Anita in your business? Tell us which task keeps repeating and we will tell you how to make it run on its own.',
    cta: 'Tell us what eats your time',
    lista: [
      {
        id: 'anita',
        nombre: 'Anita',
        puesto: 'Accounting',
        cifra: '200 invoices a month',
        dolor:
          'Every month she copies invoices from the tax portal into Excel, one by one. One wrong number and the books don’t balance.',
        ahora:
          'Invoices download from the tax portal and land in her spreadsheet every morning. Anita only checks that everything looks right.',
        horas: 12,
        cta: 'I have an Anita',
        mensaje:
          'Hi, someone in my business copies invoices into Excel by hand (like Anita). Can you help make it happen on its own?',
      },
      {
        id: 'luis',
        nombre: 'Luis',
        puesto: 'Inventory',
        cifra: 'Weekly count in a notebook',
        dolor:
          'He counts boxes with a notebook and finds out a product ran out when a customer asks for it.',
        ahora:
          'Every sale updates the inventory. When something is running low, Luis gets a WhatsApp alert.',
        horas: 10,
        cta: 'I have a Luis',
        mensaje:
          'Hi, in my business we count inventory by hand and run out of products without warning (like Luis). Can you help?',
      },
      {
        id: 'marta',
        nombre: 'Marta',
        puesto: 'Appointments',
        cifra: '80 WhatsApps a day',
        dolor:
          'She answers messages all day to book, move and confirm appointments. Between one and the next, two clients get double-booked.',
        ahora:
          'Your clients pick a time from a link and get their confirmation and reminder on their own. Marta looks after whoever walks in.',
        horas: 25,
        cta: 'I have a Marta',
        mensaje:
          'Hi, someone in my business books appointments by hand on WhatsApp all day (like Marta). Can you help make it happen on its own?',
      },
      {
        id: 'jorge',
        nombre: 'Jorge',
        puesto: 'Reports',
        cifra: 'Every Monday, all morning',
        dolor:
          'He pulls sales from three spreadsheets to build the weekly report. By the time he finishes, it’s lunchtime.',
        ahora:
          'On Monday at 8:00 the sales report is already in his inbox, with charts. Jorge comes in to decide, not to copy.',
        horas: 12,
        cta: 'I have a Jorge',
        mensaje:
          'Hi, in my business we build reports by hand every week (like Jorge). Can you help make them come out on their own?',
      },
    ],
  },

  vitrina: {
    titulo: 'Landing pages ready for your business.',
    tenue: 'A new one every day.',
    sub: (precio: string, plazo: string) =>
      `See them working, pick the colors and we publish it with your details in ${plazo}. From ${precio} MXN.`,
    buscarEtiqueta: 'Search templates by type of business',
    placeholder: 'Search a template for your business, e.g. Gym',
    buscar: 'Search',
    resumen: (publicadas: number, enCamino: number) =>
      `${publicadas} published · ${enCamino} on the way`,
    resultados: (n: number, q: string) =>
      n === 1 ? `1 template for “${q}”` : `${n} templates for “${q}”`,
    sinResultados: (q: string) => `No template for “${q}” yet`,
    carrusel: 'Landing pages for sale',
    anterior: 'Previous',
    siguiente: 'Next',
    verTodas: (n: number) => `See all landing pages (${n})`,
    vacioTitulo: 'Your business isn’t here? We’ll build it.',
    vacioTexto: (plazo: string) => `Tell us what business you have and we build it with your details in ${plazo}.`,
    vacioProxima: (giro: string) => `${giro} is already in line. Ask for it and we will let you know when it’s out.`,
    vacioCta: 'Request my landing page',
    pideTitulo: 'Your business isn’t here?',
    pideTexto: 'We build it with your details, your logo and your colors.',
    pideCta: 'Request my business',
    salePronto: 'Coming soon',
    proximaCta: 'Notify me',
    proximaAria: (giro: string) => `Notify me when the landing page for ${giro} is out`,
    desde: 'from',
    modelo: 'Model',
    verDemo: 'See demo',
    tarjetaAria: (codigo: string) => `: see demo and price of ${codigo}`,
    colores: 'Color schemes',
  },

  landingsPagina: {
    titulo: 'Landing pages for sale',
    descripcion: (precio: string) =>
      `Landing pages ready for businesses. See them working, try other colors and we publish yours with your details. From ${precio} MXN.`,
    sub: (precio: string) =>
      `Landing pages ready for businesses. See them working, choose a color scheme and we publish it with your details. From ${precio} MXN.`,
    filtros: 'Filter by category',
    todas: 'All',
    orden: 'Sort',
    ordenNuevas: 'Newest',
    ordenAZ: 'A to Z',
    contador: (n: number, total: number) =>
      n === total
        ? `${total === 1 ? '1 landing page' : `${total} landing pages`}`
        : `${n} of ${total} landing pages`,
    mostrarMas: 'Show more',
    unaNuevaCadaDia: 'A new one every day',
  },

  familias: {
    fitness: 'Fitness',
    salud: 'Health',
    belleza: 'Beauty',
    educacion: 'Education',
    servicios: 'Services',
    hogar: 'Home',
    eventos: 'Events',
    hospedaje: 'Hospitality',
  },

  clientes: {
    titulo: 'Companies we have worked with',
    sub: 'We work with companies in Mexico, the United States and Spain.',
    tambien: 'Also: Mares de Papel (Spain) and Soluciones Integrales Silva.',
    pausar: 'Pause the logos',
    marcas: 'Names and logos are trademarks of their owners.',
  },

  redes: {
    titulo: 'Learn with us',
    sub: 'We post tech tips explained simply, security alerts and humor for developers (in Spanish).',
    seguirInstagram: 'Follow on Instagram',
    seguirTiktok: 'Follow on TikTok',
    postAria: (tema: string) => `Instagram post: ${tema}`,
    tiktokTitulo: 'Deploy on a Friday',
    tiktokTexto: 'The first developer humor video on our TikTok.',
    tiktokCta: 'Watch the video',
    posts: {
      'ig-nextjs-seguridad': 'security alert, is your Next.js site up to date?',
      'ig-structuredclone': 'JavaScript tip, stop cloning objects with JSON.parse',
      'ig-github-cli': 'tool, 6 GitHub CLI commands that save you clicks',
      'ig-java4shell': 'security alert, Java4Shell: patch your Java today',
      'ig-automatizar-empresa': 'for businesses, 5 tasks your company still does by hand',
      'ig-vale-la-pena-automatizar': 'for businesses, is it worth automating that task?',
    },
  },

  preguntas: {
    titulo: 'Frequently asked questions',
    ayuda: 'If your question isn’t here,',
    ayudaEnlace: 'ask us on WhatsApp',
    landing: (plazo: string, mantenimiento: string) => [
      {
        pregunta: 'Is the code mine?',
        respuesta:
          'Yes. When you pay, we hand you the source code of your landing page, already with your details, so you can publish it wherever you want. The showcase demo stays on tigemsha.com with a watermark.',
      },
      {
        pregunta: 'Where is it hosted?',
        respuesta: `It’s a static site: it works on Netlify, Vercel, Cloudflare Pages or the hosting you already have. If you hire maintenance, from ${mantenimiento} MXN a month, we publish it and keep it online.`,
      },
      {
        pregunta: 'Can I use my own domain?',
        respuesta:
          'Yes. If you already have a domain, we connect it. If you don’t, we help you register one in your name; the yearly domain fee is paid separately, straight to the registrar.',
      },
      {
        pregunta: 'Can I ask for changes later?',
        respuesta:
          'Yes. Text, photos, colors, hours, prices and WhatsApp live in a configuration file, so they change without touching the design. New sections or structural changes are quoted separately.',
      },
      {
        pregunta: 'How long does it take?',
        respuesta: `${plazo} from when you send us your logo, photos, hours and prices. If something is missing, we tell you what and leave the spaces ready.`,
      },
    ],
    software: {
      pregunta: 'How do you quote a custom software project?',
      respuesta:
        'Tell us on WhatsApp which task you want to run on its own and who does it today. With that we send you the scope, timeline and price in writing before we start.',
    },
  },

  cierre: {
    titulo: 'Tell us what eats your time',
    texto:
      'Message us on WhatsApp. For a landing page, send us the code and your type of business; for anything else, tell us which task keeps repeating in your business and who does it today.',
    whatsapp: 'Message on WhatsApp',
    aviso: 'What you send us is only used to help you. Read the',
    avisoEnlace: 'privacy notice',
  },

  pie: {
    aria: 'Footer',
    enlaces: {
      landings: 'Landing pages for sale',
      servicios: 'Services',
      preguntas: 'FAQ',
      aviso: 'Privacy notice',
    },
    redes: 'Social and contact',
    instagram: 'Tigemsha on Instagram',
    tiktok: 'Tigemsha on TikTok',
    whatsapp: 'Tigemsha on WhatsApp',
    correo: 'Email Tigemsha',
    legal: (anio: number) =>
      `© ${anio} Tigemsha. Showcase demos are watermarked samples; copying or redistributing them is prohibited.`,
  },

  flotante: 'Message on WhatsApp',

  ficha: {
    migas: 'Breadcrumb',
    titulo: (giro: string) => `Landing page for ${giro}`,
    tituloPagina: (giro: string, codigo: string) => `Landing page for ${giro} ${codigo}`,
    descripcion: (resumen: string, precio: string) =>
      `${resumen} From ${precio} MXN. See it working and try it in other colors.`,
    modelo: 'Model',
    publicada: 'Published on',
    demoAria: 'Live demo',
    precioTitulo: 'Price and purchase',
    desde: 'from',
    mantenimiento: 'Maintenance:',
    alMes: 'MXN a month',
    laQuiero: 'I want it for my business',
    laQuieroCorto: 'I want it',
    pregunta: 'I have a question',
    plazo: 'Timeline',
    plazoSufijo: 'from when we have your details',
    para: 'For',
    incluye: 'What’s included',
    codigoTuyo: 'The source code, in your name, when you pay',
    tecnica: 'Technical sheet',
    tecnicaTexto:
      'Everything that changes from one business to another lives in a configuration file. Adapting it to your business never touches the design.',
    editable: 'What you can edit',
    datos: 'Technical details',
    peso: 'Page weight',
    lighthouse: 'Lighthouse on mobile',
    deCien: 'out of 100',
    pendiente: 'Measured when the demo is published',
    tecnologia: 'Technology',
    tecnologiaValor: 'Static HTML and CSS built with Astro, almost no JavaScript',
    hosting: 'Hosting',
    hostingValor: 'Any static hosting: Netlify, Vercel, Cloudflare Pages or your own',
    otras: 'Other landing pages',
    cierreTitulo: 'Get it for your business',
    cierreTexto: (codigo: string) =>
      `Send us a WhatsApp with the code ${codigo}. We tell you what details we need and when it will be ready.`,
    barraAria: 'Buy this landing page',
    demoEnEspanol: 'The demo is in Spanish, the way your customers in Mexico see it. We can translate it.',
  },

  visor: {
    dispositivos: 'Demo screen size',
    celular: 'Phone',
    tablet: 'Tablet',
    escritorio: 'Desktop',
    abrir: 'Open the demo in a new tab',
    temasTitulo: 'Try it in other colors',
    temasNota:
      'Each scheme changes the colors of the live demo. When you buy it you pick one or send us your brand colors.',
    cargando: 'Loading the live demo…',
    sinDemo: 'The live demo is coming soon. Meanwhile, see the screenshot.',
    sinDemoTema: (nombre: string) => `The live demo isn’t published yet. ${nombre} is selected.`,
    conTema: (nombre: string) => `Demo with the ${nombre} scheme.`,
    iframe: (codigo: string) => `Live demo of landing page ${codigo}`,
  },

  captura: {
    alt: (vista: 'movil' | 'escritorio', codigo: string, giro: string) =>
      `${vista === 'movil' ? 'Phone' : 'Desktop'} screenshot of landing page ${codigo} for ${giro}`,
    sello: 'Sample',
  },

  error404: {
    titulo: 'Page not found',
    descripcion: 'This address doesn’t exist on tigemsha.com.',
    h1: 'This page doesn’t exist',
    texto: 'The link may be mistyped or the page may have moved. You can continue from here:',
    landings: 'See landing pages for sale',
    inicio: 'Go to home page',
    ayuda: 'Looking for something in particular?',
    ayudaEnlace: 'Message us on WhatsApp',
  },

  whatsapp: {
    hero: 'Hi, I want a task in my business to run on its own. Today this takes up our time: ',
    cotizar: 'Hi, I would like a quote for a software project with Tigemsha.',
    contacto: 'Hi, I would like a quote from Tigemsha.',
    personajes: 'Hi, there is a repetitive task in my business that I want to run on its own: ',
    privacidad: 'Hi, I have a request about my personal data (privacy notice).',
    landings: 'Hi, I want a landing page for my business. My type of business is: ',
    busqueda: (q: string) =>
      `Hi, I searched for a landing page for "${q}" on tigemsha.com and couldn’t find it. Can you build it?`,
    proxima: (giro: string) =>
      `Hi, I want the landing page for ${giro} when it’s out. Please let me know.`,
    flotante: 'Hi, I saw tigemsha.com and want to talk about my business.',
    laQuiero: (codigo: string, giro: string, url: string) =>
      `Hi, I want landing page ${codigo} (${giro}) for my business. I saw it at ${url}`,
    pregunta: (codigo: string, giro: string) =>
      `Hi, I have a question about landing page ${codigo} (${giro}).`,
  },
};
