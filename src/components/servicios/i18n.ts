/**
 * Textos de la sección de servicios (v2) en español e inglés.
 * Regla de voz: historias de negocios reales, sin jerga. Si aparece una palabra
 * técnica ("base de datos"), se explica con el ejemplo de al lado.
 * Los datos de las demostraciones son ficticios y se marcan como "Ejemplo".
 */

export type Idioma = 'es' | 'en';

export interface TextoServicio {
  titulo: string;
  definicion: string;
  historia: { nombre: string; resto: string };
  solucion: { entrada: string; texto: string };
  tambien?: string;
  pregunta: string;
  pista: string;
  boton: string;
  /** Mensaje prellenado de WhatsApp: dice de qué servicio viene. */
  mensaje: string;
  /** Qué pasa en la demostración, para lectores de pantalla. */
  descripcion: string;
}

type Fila = readonly [string, string];

export interface Textos {
  titulo: string;
  tituloTenue: string;
  intro: string;
  indice: string;
  indiceCorto: readonly [string, string, string, string];
  ejemplo: string;
  datosEjemplo: string;
  controles: { pausar: string; reanudar: string; repetir: string };
  automatizacion: TextoServicio & {
    pasosNombre: string;
    pasos: readonly [string, string, string, string];
    demoNombre: string;
    archivo: string;
    columnas: readonly [string, string];
    filas: readonly [Fila, Fila, Fila, Fila, Fila];
    db: { titulo: string; sub: string; guardadas: string; pie: string };
    motor: { titulo: string; cuando: string; dia: string; estados: readonly [string, string, string] };
    pdf: { titulo: string; semana: string; total: string };
    wa: { app: string; ahora: string; titulo: string; texto: string; adjunto: string };
  };
  web: TextoServicio & {
    demoNombre: string;
    pestanasNombre: string;
    pestanas: readonly [
      { nombre: string; corto: string; url: string; descripcion: string },
      { nombre: string; corto: string; url: string; descripcion: string },
      { nombre: string; corto: string; url: string; descripcion: string },
    ];
    marca: string;
    navNegocio: readonly [string, string, string, string];
    navCliente: readonly [string, string, string];
    inv: {
      titulo: string;
      sucursal: string;
      buscar: string;
      kpis: readonly [string, string, string];
      alerta: string;
      alertaDato: string;
      alertaAccion: string;
      columnas: readonly [string, string, string];
      productos: readonly [string, string, string, string, string];
      estados: { quedan: string; ok: string; surtir: string };
      grafica: string;
      dias: readonly [string, string, string, string, string, string];
    };
    portal: {
      saludo: string;
      sub: string;
      pedido: string;
      detalle: string;
      llega: string;
      pasos: readonly [string, string, string, string];
      lista: readonly [Fila, Fila, Fila];
      estados: readonly [string, string, string];
      grafica: string;
      meses: readonly string[];
    };
    pos: {
      titulo: string;
      sub: string;
      buscar: string;
      productos: readonly [Fila, Fila, Fila, Fila, Fila, Fila];
      ticket: string;
      lineas: readonly [Fila, Fila, Fila];
      total: string;
      cobrar: string;
      aviso: string;
    };
  };
  moviles: TextoServicio & {
    demoNombre: string;
    deslizar: string;
    cita: {
      titulo: string;
      descripcion: string;
      app: string;
      pantalla: string;
      servicio: string;
      detalle: string;
      dias: readonly [Fila, Fila, Fila, Fila];
      horarios: readonly [string, string, string, string];
      ocupado: string;
      boton: string;
      confirmada: string;
      cuando: string;
      con: string;
      recordatorio: string;
      calendario: string;
    };
    puntos: {
      titulo: string;
      descripcion: string;
      app: string;
      tarjeta: string;
      nombre: string;
      pts: string;
      faltanAntes: string;
      faltanDespues: string;
      aviso: string;
      historial: readonly [readonly [string, string, string], readonly [string, string, string], readonly [string, string, string]];
    };
    pedido: {
      titulo: string;
      descripcion: string;
      app: string;
      estado: string;
      llega: string;
      min: string;
      pasos: readonly [string, string, string];
      repartidor: string;
      vehiculo: string;
      tienda: string;
      casa: string;
    };
  };
  landings: TextoServicio & {
    publicadas: (n: number) => string;
    precioDesde: string;
    precio: string;
    cadaDia: string;
    verLandings: string;
    muestra: {
      titulo: string;
      descripcion: string;
      prueba: string;
      temas: readonly [Fila, Fila, Fila, Fila];
      negocio: string;
      lema: string;
      boton: string;
      planes: readonly [Fila, Fila, Fila];
      horario: string;
    };
  };
}

const filasVentas = [
  ['Abarrotes Lupita', '$12,480'],
  ['Farmacia San José', '$8,950'],
  ['Tienda Don Beto', '$15,200'],
  ['Mini súper La Esquina', '$6,730'],
  ['Papelería Ana', '$4,320'],
] as const;

export const textos: Record<Idioma, Textos> = {
  es: {
    titulo: 'Software a la medida, contado con tu negocio.',
    tituloTenue: 'Cuatro historias que tal vez te suenan.',
    intro:
      'No necesitas saber de tecnología. Te contamos qué le pasa a alguien como tú, qué haríamos y cómo se ve funcionando.',
    indice: 'Servicios',
    indiceCorto: ['Automatización', 'Apps web', 'Apps móviles', 'Sitios y landings'],
    ejemplo: 'Ejemplo',
    datosEjemplo: 'Datos de ejemplo',
    controles: { pausar: 'Pausar', reanudar: 'Reanudar', repetir: 'Repetir' },

    automatizacion: {
      titulo: 'Automatización de procesos',
      definicion: 'El trabajo que se repite cada semana, hecho solo por una computadora.',
      historia: {
        nombre: 'Anita',
        resto:
          ' lleva la administración de una distribuidora. Cada mes copia 200 facturas del SAT a Excel, renglón por renglón, y cada lunes llega a las 8 a armar con ellas el reporte de ventas que le manda al dueño por WhatsApp. Se le va la mañana entera, y si se equivoca en una celda nadie lo nota hasta fin de mes.',
      },
      solucion: {
        entrada: 'Lo que hacemos:',
        texto:
          ' le enseñamos a una computadora a hacer ese mismo trabajo, sola y sin errores. Las ventas se guardan en un archivo ordenado que nunca se pierde; eso es una base de datos. Cada lunes a las 8:00 se arma el reporte en PDF y te llega un WhatsApp. Anita usa esa mañana para cobrar.',
      },
      tambien:
        'Lo mismo sirve para los recordatorios de cobranza, el corte de caja o el conteo de inventario de cada semana.',
      pregunta: '¿Te pasa esto?',
      pista: 'Cuéntanos qué tarea se repite en tu negocio y te decimos si una computadora la puede hacer sola.',
      boton: 'Escríbenos por WhatsApp',
      mensaje:
        'Hola, vi la historia de Anita en tigemsha.com. Quiero que una tarea de mi negocio se haga sola. La tarea es: ',
      descripcion:
        'Demostración animada con datos de ejemplo, en cuatro pasos. Uno: cinco ventas salen volando del Excel de Anita. Dos: se guardan en un archivo ordenado, la base de datos, que pasa de 1,243 a 1,248 ventas guardadas. Tres: el lunes a las 8:00 se enciende solo un motor con reloj. Cuatro: sale un reporte de ventas en PDF por $47,680 y llega un WhatsApp que dice: Reporte de ventas listo.',
      pasosNombre: 'Pasos de la demostración',
      pasos: [
        'Las ventas salen del Excel',
        'Se guardan en un archivo ordenado',
        'Lunes 8:00: el motor arranca solo',
        'Sale el reporte y llega por WhatsApp',
      ],
      demoNombre: 'la demostración de automatización',
      archivo: 'ventas-semana-47.xlsx',
      columnas: ['Cliente', 'Total'],
      filas: filasVentas,
      db: {
        titulo: 'Archivo ordenado',
        sub: 'Base de datos',
        guardadas: 'ventas guardadas',
        pie: 'Respaldado, nunca se pierde',
      },
      motor: {
        titulo: 'Motor automático',
        cuando: 'Cada lunes 8:00',
        dia: 'Lun',
        estados: ['En espera', 'Trabajando', 'Listo'],
      },
      pdf: { titulo: 'Reporte de ventas', semana: 'Semana 47', total: 'Total' },
      wa: {
        app: 'WhatsApp',
        ahora: 'ahora',
        titulo: '✅ Reporte de ventas listo',
        texto: 'Semana 47: $47,680 en ventas. Te dejo el PDF.',
        adjunto: 'reporte-semana-47.pdf',
      },
    },

    web: {
      titulo: 'Apps web',
      definicion: 'Un sistema hecho para tu negocio que abres en el navegador, sin instalar nada.',
      historia: {
        nombre: 'Luis',
        resto:
          ' tiene una tlapalería con dos sucursales. Su inventario vive en una libreta y en la memoria del encargado: se entera de que se acabó el cemento cuando un cliente lo pide. Y sus clientes grandes le marcan todo el día para preguntar si su pedido ya salió.',
      },
      solucion: {
        entrada: 'Lo que hacemos:',
        texto:
          ' un sistema a tu medida que se abre en la computadora o en el celular. Ves tu inventario al momento y te avisa cuando algo se está acabando; tus clientes revisan solos cómo va su pedido; en el mostrador cobras y el inventario se descuenta solo.',
      },
      tambien: 'También hacemos agendas, cotizadores, control de rutas y tableros para el dueño.',
      pregunta: '¿Te pasa esto?',
      pista: 'Cuéntanos cómo llevas hoy tu inventario, tus pedidos o tu caja.',
      boton: 'Escríbenos por WhatsApp',
      mensaje:
        'Hola, vi los ejemplos de apps web en tigemsha.com. Quiero un sistema para mi negocio. Hoy lo llevo en: ',
      descripcion:
        'Demostración animada de tres sistemas de ejemplo para la Tlapalería Luis dentro de un navegador. Cambia sola de pestaña cada pocos segundos; puedes elegir una pestaña o pausar.',
      demoNombre: 'el recorrido por los sistemas',
      pestanasNombre: 'Sistemas de ejemplo',
      pestanas: [
        {
          nombre: 'Inventario',
          corto: 'Inventario',
          url: 'tlapalerialuis.app/inventario',
          descripcion:
            'Ejemplo de inventario: 1,284 productos y $412,580 en bodega. Aparece una alerta: del cemento gris de 50 kg quedan 3. Una gráfica muestra las salidas de cada día.',
        },
        {
          nombre: 'Portal de clientes',
          corto: 'Clientes',
          url: 'tlapalerialuis.app/pedidos',
          descripcion:
            'Ejemplo de portal de clientes: la Constructora Ríos ve que su pedido 1042, de 40 bultos de cemento, va en camino y llega hoy a la 1:30 pm. Abajo están sus pedidos anteriores y una gráfica de sus compras del año, $186,400.',
        },
        {
          nombre: 'Punto de venta',
          corto: 'Caja',
          url: 'tlapalerialuis.app/caja',
          descripcion:
            'Ejemplo de punto de venta: se agregan al ticket 2 bultos de cemento, una pintura blanca de 19 litros y 3 brochas. El total es $1,875, se cobra y aparece el aviso: venta registrada, el inventario se actualizó solo.',
        },
      ],
      marca: 'Tlapalería Luis',
      navNegocio: ['Inventario', 'Pedidos', 'Caja', 'Reportes'],
      navCliente: ['Mis pedidos', 'Facturas', 'Mi cuenta'],
      inv: {
        titulo: 'Inventario',
        sucursal: 'Sucursal Centro',
        buscar: 'Buscar producto',
        kpis: ['Productos', 'Valor en bodega', 'Por surtir'],
        alerta: 'Cemento gris 50 kg:',
        alertaDato: 'quedan 3',
        alertaAccion: 'Pedir 40 más',
        columnas: ['Producto', 'Existencia', 'Estado'],
        productos: ['Cemento gris 50 kg', 'Tubo PVC ½"', 'Pintura blanca 19 L', 'Varilla 3/8"', 'Clavo 2½" (kg)'],
        estados: { quedan: 'Quedan 3', ok: 'Suficiente', surtir: 'Por surtir' },
        grafica: 'Salidas por día',
        dias: ['L', 'M', 'M', 'J', 'V', 'S'],
      },
      portal: {
        saludo: 'Hola, Constructora Ríos',
        sub: 'Tus pedidos de noviembre',
        pedido: 'Pedido #1042',
        detalle: '40 bultos de cemento gris',
        llega: 'Llega hoy, 1:30 pm',
        pasos: ['Recibido', 'Preparando', 'En camino', 'Entregado'],
        lista: [
          ['#1039', 'Tubería PVC ½"'],
          ['#1036', 'Pintura blanca 19 L × 6'],
          ['#1031', 'Varilla 3/8" × 120'],
        ],
        estados: ['Entregado', 'Entregado', 'Facturado'],
        grafica: 'Tus compras de 2026',
        meses: ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N'],
      },
      pos: {
        titulo: 'Caja 1',
        sub: 'Sucursal Centro',
        buscar: 'Escanear o buscar',
        productos: [
          ['Cemento', '$245'],
          ['Pintura 19 L', '$1,190'],
          ['Brocha 3"', '$65'],
          ['Tubo PVC', '$38'],
          ['Clavo kg', '$42'],
          ['Martillo', '$189'],
        ],
        ticket: 'Ticket',
        lineas: [
          ['2 × Cemento gris 50 kg', '$490'],
          ['1 × Pintura blanca 19 L', '$1,190'],
          ['3 × Brocha 3"', '$195'],
        ],
        total: 'Total',
        cobrar: 'Cobrar',
        aviso: 'Venta registrada. El inventario se actualizó solo.',
      },
    },

    moviles: {
      titulo: 'Apps móviles',
      definicion: 'Tu negocio en el celular de tus clientes, con tu nombre y tu logo.',
      historia: {
        nombre: 'Marta',
        resto:
          ' tiene una estética. Contesta 80 WhatsApps al día, casi todos para preguntar si hay lugar el sábado, y entre mensaje y mensaje se le pasa anotar citas. Además, sus clientas frecuentes siempre pierden la tarjeta de sellos de cartón.',
      },
      solucion: {
        entrada: 'Lo que hacemos:',
        texto:
          ' una app con el nombre de tu negocio, para iPhone y Android. Tus clientas apartan su cita y les llega la confirmación; juntan puntos sin tarjeta de papel; y si vendes a domicilio, ven en el mapa por dónde va su pedido. Tú dejas de contestar lo mismo todo el día.',
      },
      pregunta: '¿Te pasa esto?',
      pista: 'Cuéntanos qué te preguntan tus clientes todos los días.',
      boton: 'Escríbenos por WhatsApp',
      mensaje:
        'Hola, vi los ejemplos de apps móviles en tigemsha.com. Quiero una app para mi negocio. Mis clientes siempre me preguntan: ',
      descripcion: 'Tres pantallas de ejemplo de apps móviles, animadas.',
      demoNombre: 'las pantallas',
      deslizar: 'Desliza para ver las tres pantallas',
      cita: {
        titulo: 'Reserva de cita',
        descripcion:
          'Reserva de cita: la clienta elige el sábado 23 a las 11:30, toca Confirmar cita y aparece Cita confirmada, con aviso por WhatsApp un día antes.',
        app: 'Estética Marta',
        pantalla: 'Agenda tu cita',
        servicio: 'Corte y peinado',
        detalle: '60 min · $350',
        dias: [
          ['Jue', '21'],
          ['Vie', '22'],
          ['Sáb', '23'],
          ['Dom', '24'],
        ],
        horarios: ['10:00', '11:30', '13:00', '16:30'],
        ocupado: 'Ocupado',
        boton: 'Confirmar cita',
        confirmada: 'Cita confirmada',
        cuando: 'Sábado 23 · 11:30',
        con: 'Corte y peinado con Marta',
        recordatorio: 'Te recordamos un día antes por WhatsApp.',
        calendario: 'Agregar al calendario',
      },
      puntos: {
        titulo: 'Tarjeta de puntos',
        descripcion:
          'Tarjeta de puntos: Sofía suma 30 puntos por su visita y pasa de 120 a 150; se llena su octavo sello y le faltan 2 visitas para un corte gratis.',
        app: 'Estética Marta',
        tarjeta: 'Clienta frecuente',
        nombre: 'Sofía R.',
        pts: 'puntos',
        faltanAntes: 'Te faltan',
        faltanDespues: 'visitas para un corte gratis',
        aviso: '+30 puntos por tu visita de hoy',
        historial: [
          ['Hoy', 'Tinte', '+30'],
          ['2 nov', 'Corte', '+20'],
          ['18 oct', 'Manicure', '+15'],
        ],
      },
      pedido: {
        titulo: 'Seguimiento de pedido',
        descripcion:
          'Seguimiento de pedido: en el mapa, Beto avanza en moto desde la pastelería hasta la casa del cliente, y la llegada baja de 9 a 4 minutos.',
        app: 'Pastelería Mimí',
        estado: 'Tu pastel va en camino',
        llega: 'Llega en',
        min: 'min',
        pasos: ['Preparado', 'En camino', 'Entregado'],
        repartidor: 'Beto',
        vehiculo: 'en moto',
        tienda: 'Pastelería',
        casa: 'Tu casa',
      },
    },

    landings: {
      titulo: 'Sitios y landings',
      definicion: 'Una página para que te encuentren en internet y te escriban.',
      historia: {
        nombre: 'Pepe',
        resto:
          ' abrió su gimnasio hace un año. Quien lo busca en internet solo encuentra una página de Facebook sin precios ni horarios, y los interesados terminan inscribiéndose en el de la otra cuadra.',
      },
      solucion: {
        entrada: 'Lo que hacemos:',
        texto:
          ' una landing lista para tu negocio, desde $2,500 MXN. Es una página que abre rápido en el celular, con tus precios, tu horario, cómo llegar y un botón que abre WhatsApp. Publicamos una nueva cada 2 días para un giro distinto, y la ves funcionando antes de pagar.',
      },
      pregunta: '¿Te pasa esto?',
      pista: 'Elige una de la vitrina o pídenos la de tu giro.',
      boton: 'Pedir la de mi giro',
      mensaje: 'Hola, vi las landings en tigemsha.com y quiero una para mi negocio. Mi giro es: ',
      descripcion:
        'Muestra animada de una landing para gimnasios que cambia entre cuatro combinaciones de color: rack, acero, pino y noche.',
      publicadas: (n) => (n === 1 ? 'landing publicada' : 'landings publicadas'),
      precioDesde: 'Lista para tu negocio desde',
      precio: '$2,500 MXN',
      cadaDia: 'Una nueva cada 2 días',
      verLandings: 'Ver las landings',
      muestra: {
        titulo: 'Muestra: landing para gimnasios',
        descripcion:
          'Muestra de una landing para gimnasios con sus planes y el botón de WhatsApp, en cuatro combinaciones de color.',
        prueba: 'Pruébala con otros colores',
        temas: [
          ['rack', 'Rack'],
          ['acero', 'Acero'],
          ['pino', 'Pino'],
          ['noche', 'Noche'],
        ],
        negocio: 'Tu gimnasio',
        lema: 'Entrena cerca de casa',
        boton: 'Pide tu pase de cortesía',
        planes: [
          ['Mensual', '$650'],
          ['Trimestral', '$1,750'],
          ['Anual', '$6,200'],
        ],
        horario: 'Abierto ahora · cierra 22:00',
      },
    },
  },

  en: {
    titulo: 'Custom software, told through your business.',
    tituloTenue: 'Four stories that may sound familiar.',
    intro:
      'You don’t need to know anything about technology. We tell you what happens to someone like you, what we’d build, and how it looks working.',
    indice: 'Services',
    indiceCorto: ['Automation', 'Web apps', 'Mobile apps', 'Websites and landing pages'],
    ejemplo: 'Example',
    datosEjemplo: 'Sample data',
    controles: { pausar: 'Pause', reanudar: 'Resume', repetir: 'Replay' },

    automatizacion: {
      titulo: 'Process automation',
      definicion: 'The work that repeats every week, done by a computer on its own.',
      historia: {
        nombre: 'Anita',
        resto:
          ' runs the office at a wholesale distributor. Every month she copies 200 tax invoices into a spreadsheet, row by row, and every Monday at 8 she uses them to build the sales report she sends the owner on WhatsApp. It takes her whole morning, and if she mistypes a cell nobody notices until the end of the month.',
      },
      solucion: {
        entrada: 'What we do:',
        texto:
          ' we teach a computer to do that same work, on its own and without mistakes. Sales are saved in an organized file that never gets lost; that’s what a database is. Every Monday at 8:00 the report is built as a PDF and you get a WhatsApp message. Anita spends that morning collecting payments.',
      },
      tambien:
        'The same works for payment reminders, the end-of-day cash count or the weekly stock count.',
      pregunta: 'Sound familiar?',
      pista: 'Tell us which task repeats in your business and we’ll tell you whether a computer can do it on its own.',
      boton: 'Message us on WhatsApp',
      mensaje:
        'Hi, I saw Anita’s story on tigemsha.com. I’d like a task in my business to run on its own. The task is: ',
      descripcion:
        'Animated demo with sample data, in four steps. One: five sales fly out of Anita’s spreadsheet. Two: they are saved in an organized file, the database, which goes from 1,243 to 1,248 saved sales. Three: on Monday at 8:00 an engine with a clock switches on by itself. Four: a $47,680 sales report comes out as a PDF and a WhatsApp message arrives saying: Sales report ready.',
      pasosNombre: 'Demo steps',
      pasos: [
        'Sales leave the spreadsheet',
        'They’re saved in an organized file',
        'Monday 8:00: the engine starts itself',
        'The report goes out on WhatsApp',
      ],
      demoNombre: 'the automation demo',
      archivo: 'sales-week-47.xlsx',
      columnas: ['Customer', 'Total'],
      filas: filasVentas,
      db: {
        titulo: 'Organized file',
        sub: 'Database',
        guardadas: 'sales saved',
        pie: 'Backed up, never lost',
      },
      motor: {
        titulo: 'Automatic engine',
        cuando: 'Every Monday 8:00',
        dia: 'Mon',
        estados: ['Waiting', 'Working', 'Done'],
      },
      pdf: { titulo: 'Sales report', semana: 'Week 47', total: 'Total' },
      wa: {
        app: 'WhatsApp',
        ahora: 'now',
        titulo: '✅ Sales report ready',
        texto: 'Week 47: $47,680 in sales. PDF attached.',
        adjunto: 'report-week-47.pdf',
      },
    },

    web: {
      titulo: 'Web apps',
      definicion: 'A system built for your business that opens in the browser, nothing to install.',
      historia: {
        nombre: 'Luis',
        resto:
          ' owns a hardware store with two locations. His inventory lives in a notebook and in his manager’s head: he finds out the cement ran out when a customer asks for it. And his big customers call all day to ask whether their order has shipped.',
      },
      solucion: {
        entrada: 'What we do:',
        texto:
          ' a system made to measure that opens on a computer or a phone. You see your stock at a glance and it warns you when something is running low; customers check their own order status; at the counter you ring up sales and the stock updates itself.',
      },
      tambien: 'We also build schedulers, quote builders, route tracking and dashboards for owners.',
      pregunta: 'Sound familiar?',
      pista: 'Tell us how you keep track of inventory, orders or sales today.',
      boton: 'Message us on WhatsApp',
      mensaje:
        'Hi, I saw the web app examples on tigemsha.com. I’d like a system for my business. Today I keep track of it with: ',
      descripcion:
        'Animated demo of three sample systems for Luis Hardware inside a browser. It switches tabs on its own every few seconds; you can pick a tab or pause it.',
      demoNombre: 'the systems tour',
      pestanasNombre: 'Sample systems',
      pestanas: [
        {
          nombre: 'Inventory',
          corto: 'Inventory',
          url: 'luishardware.app/inventory',
          descripcion:
            'Sample inventory: 1,284 products and $412,580 in stock. An alert appears: only 3 bags of 50 kg gray cement left. A chart shows units out each day.',
        },
        {
          nombre: 'Customer portal',
          corto: 'Customers',
          url: 'luishardware.app/orders',
          descripcion:
            'Sample customer portal: Ríos Construction sees that order 1042, 40 bags of cement, is on the way and arrives today at 1:30 pm. Below are their past orders and a chart of this year’s purchases, $186,400.',
        },
        {
          nombre: 'Point of sale',
          corto: 'Checkout',
          url: 'luishardware.app/checkout',
          descripcion:
            'Sample point of sale: 2 bags of cement, a 19-liter can of white paint and 3 brushes are added to the receipt. The total is $1,875, it gets charged and a notice appears: sale saved, stock updated itself.',
        },
      ],
      marca: 'Luis Hardware',
      navNegocio: ['Inventory', 'Orders', 'Checkout', 'Reports'],
      navCliente: ['My orders', 'Invoices', 'My account'],
      inv: {
        titulo: 'Inventory',
        sucursal: 'Downtown store',
        buscar: 'Search products',
        kpis: ['Products', 'Stock value', 'To restock'],
        alerta: 'Gray cement 50 kg:',
        alertaDato: 'only 3 left',
        alertaAccion: 'Order 40 more',
        columnas: ['Product', 'In stock', 'Status'],
        productos: ['Gray cement 50 kg', 'PVC pipe ½"', 'White paint 19 L', 'Rebar 3/8"', 'Nails 2½" (kg)'],
        estados: { quedan: '3 left', ok: 'In stock', surtir: 'Restock' },
        grafica: 'Units out per day',
        dias: ['M', 'T', 'W', 'T', 'F', 'S'],
      },
      portal: {
        saludo: 'Hi, Ríos Construction',
        sub: 'Your November orders',
        pedido: 'Order #1042',
        detalle: '40 bags of gray cement',
        llega: 'Arrives today, 1:30 pm',
        pasos: ['Received', 'Packing', 'On the way', 'Delivered'],
        lista: [
          ['#1039', 'PVC pipe ½"'],
          ['#1036', 'White paint 19 L × 6'],
          ['#1031', 'Rebar 3/8" × 120'],
        ],
        estados: ['Delivered', 'Delivered', 'Invoiced'],
        grafica: 'Your purchases in 2026',
        meses: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N'],
      },
      pos: {
        titulo: 'Register 1',
        sub: 'Downtown store',
        buscar: 'Scan or search',
        productos: [
          ['Cement', '$245'],
          ['Paint 19 L', '$1,190'],
          ['Brush 3"', '$65'],
          ['PVC pipe', '$38'],
          ['Nails kg', '$42'],
          ['Hammer', '$189'],
        ],
        ticket: 'Receipt',
        lineas: [
          ['2 × Gray cement 50 kg', '$490'],
          ['1 × White paint 19 L', '$1,190'],
          ['3 × Brush 3"', '$195'],
        ],
        total: 'Total',
        cobrar: 'Charge',
        aviso: 'Sale saved. Stock updated itself.',
      },
    },

    moviles: {
      titulo: 'Mobile apps',
      definicion: 'Your business on your customers’ phones, with your name and your logo.',
      historia: {
        nombre: 'Marta',
        resto:
          ' runs a beauty salon. She answers 80 WhatsApp messages a day, most of them asking whether there’s an opening on Saturday, and between messages she forgets to write appointments down. On top of that, her regulars keep losing their paper punch cards.',
      },
      solucion: {
        entrada: 'What we do:',
        texto:
          ' an app with your business’s name, for iPhone and Android. Customers book their appointment and get a confirmation; they collect points without a paper card; and if you deliver, they see on a map where their order is. You stop answering the same questions all day.',
      },
      pregunta: 'Sound familiar?',
      pista: 'Tell us what your customers ask you every day.',
      boton: 'Message us on WhatsApp',
      mensaje:
        'Hi, I saw the mobile app examples on tigemsha.com. I’d like an app for my business. My customers always ask me: ',
      descripcion: 'Three animated sample screens of mobile apps.',
      demoNombre: 'the screens',
      deslizar: 'Swipe to see all three screens',
      cita: {
        titulo: 'Appointment booking',
        descripcion:
          'Appointment booking: the customer picks Saturday 23 at 11:30, taps Confirm appointment and sees Appointment confirmed, with a WhatsApp reminder the day before.',
        app: 'Marta’s Salon',
        pantalla: 'Book an appointment',
        servicio: 'Cut and style',
        detalle: '60 min · $350',
        dias: [
          ['Thu', '21'],
          ['Fri', '22'],
          ['Sat', '23'],
          ['Sun', '24'],
        ],
        horarios: ['10:00', '11:30', '13:00', '16:30'],
        ocupado: 'Booked',
        boton: 'Confirm appointment',
        confirmada: 'Appointment confirmed',
        cuando: 'Saturday 23 · 11:30',
        con: 'Cut and style with Marta',
        recordatorio: 'We’ll remind you on WhatsApp the day before.',
        calendario: 'Add to calendar',
      },
      puntos: {
        titulo: 'Rewards card',
        descripcion:
          'Rewards card: Sofía earns 30 points for her visit and goes from 120 to 150; her eighth stamp fills in and she is 2 visits away from a free haircut.',
        app: 'Marta’s Salon',
        tarjeta: 'Regular client',
        nombre: 'Sofía R.',
        pts: 'points',
        faltanAntes: 'Only',
        faltanDespues: 'visits to a free haircut',
        aviso: '+30 points for today’s visit',
        historial: [
          ['Today', 'Hair color', '+30'],
          ['Nov 2', 'Haircut', '+20'],
          ['Oct 18', 'Manicure', '+15'],
        ],
      },
      pedido: {
        titulo: 'Order tracking',
        descripcion:
          'Order tracking: on the map, Beto rides his motorbike from the bakery to the customer’s home, and the arrival time drops from 9 to 4 minutes.',
        app: 'Mimí Bakery',
        estado: 'Your cake is on its way',
        llega: 'Arrives in',
        min: 'min',
        pasos: ['Ready', 'On the way', 'Delivered'],
        repartidor: 'Beto',
        vehiculo: 'on a motorbike',
        tienda: 'Bakery',
        casa: 'Home',
      },
    },

    landings: {
      titulo: 'Websites and landing pages',
      definicion: 'A page so people find you online and message you.',
      historia: {
        nombre: 'Pepe',
        resto:
          ' opened his gym a year ago. Anyone who looks him up online only finds a Facebook page with no prices or hours, and interested people end up joining the gym down the street.',
      },
      solucion: {
        entrada: 'What we do:',
        texto:
          ' a landing page ready for your business, from $2,500 MXN. It’s a page that loads fast on a phone, with your prices, your hours, directions and a button that opens WhatsApp. We publish a new one every other day for a different kind of business, and you see it working before you pay.',
      },
      pregunta: 'Sound familiar?',
      pista: 'Pick one from the showcase or ask us for one for your kind of business.',
      boton: 'Ask for one for my business',
      mensaje: 'Hi, I saw the landing pages on tigemsha.com and I’d like one for my business. My business is: ',
      descripcion:
        'Animated sample of a landing page for gyms that switches between four color schemes: rack, steel, pine and night.',
      publicadas: (n) => (n === 1 ? 'landing page published' : 'landing pages published'),
      precioDesde: 'Ready for your business from',
      precio: '$2,500 MXN',
      cadaDia: 'A new one every other day',
      verLandings: 'See the landing pages',
      muestra: {
        titulo: 'Sample: landing page for gyms',
        descripcion:
          'Sample of a landing page for gyms with its plans and WhatsApp button, in four color schemes.',
        prueba: 'Try it in other colors',
        temas: [
          ['rack', 'Rack'],
          ['acero', 'Steel'],
          ['pino', 'Pine'],
          ['noche', 'Night'],
        ],
        negocio: 'Your gym',
        lema: 'Train close to home',
        boton: 'Get your free day pass',
        planes: [
          ['Monthly', '$650'],
          ['Quarterly', '$1,750'],
          ['Yearly', '$6,200'],
        ],
        horario: 'Open now · closes 22:00',
      },
    },
  },
};
