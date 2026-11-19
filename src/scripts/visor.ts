/**
 * Visor de demos de la vitrina.
 *
 * Protocolo con la demo (detalle en README.md):
 *   visor → demo   { type: 'tgm-theme', theme: '<id>' }   (targetOrigin '*': el iframe es de origen opaco)
 *   demo  → visor  { type: 'tgm-ready', themes: ['rack', …] }  al cargar
 * El visor solo acepta mensajes cuyo `source` es su propio iframe.
 */

type Dispositivo = 'celular' | 'tablet' | 'escritorio';

const ANCHO_LOGICO: Record<Dispositivo, number> = {
  celular: 390,
  tablet: 768,
  escritorio: 1280,
};

const ES_ESCRITORIO = '(min-width: 64rem)';

function esDispositivo(valor: string | undefined): valor is Dispositivo {
  return valor === 'celular' || valor === 'tablet' || valor === 'escritorio';
}

interface MensajeListo {
  type: 'tgm-ready';
  themes?: unknown;
}

function esMensajeListo(dato: unknown): dato is MensajeListo {
  return typeof dato === 'object' && dato !== null && (dato as { type?: unknown }).type === 'tgm-ready';
}

async function demoPublicada(url: string): Promise<boolean> {
  try {
    const respuesta = await fetch(url, { method: 'HEAD', cache: 'no-store' });
    const tipo = respuesta.headers.get('content-type') ?? '';
    return respuesta.ok && tipo.includes('text/html');
  } catch {
    return false;
  }
}

function iniciar(raiz: HTMLElement): void {
  const demo = raiz.dataset.demo;
  const codigo = raiz.dataset.codigo ?? '';
  const marco = raiz.querySelector<HTMLElement>('[data-visor-marco]');
  const pantalla = marco?.querySelector<HTMLElement>('.visor__pantalla');
  const estado = raiz.querySelector<HTMLElement>('[data-visor-estado]');
  const aviso = raiz.querySelector<HTMLElement>('[data-visor-aviso]');
  const grupo = raiz.querySelector<HTMLElement>('[data-visor-dispositivos]');
  const abrir = raiz.querySelector<HTMLElement>('[data-visor-abrir]');
  const botonesDispositivo = Array.from(raiz.querySelectorAll<HTMLButtonElement>('button[data-dispositivo]'));
  const botonesTema = Array.from(raiz.querySelectorAll<HTMLButtonElement>('button[data-tema]'));
  if (!demo || !marco || !pantalla || !estado || !aviso) return;

  let dispositivo: Dispositivo = matchMedia(ES_ESCRITORIO).matches ? 'escritorio' : 'celular';
  let iframe: HTMLIFrameElement | null = null;
  let lista = false;
  let sinDemo = false;
  let temaPendiente: string | null = null;

  const escalar = () => {
    // Ancho fraccional: con clientWidth (entero) queda una rendija de menos de 1 px.
    const escala = pantalla.getBoundingClientRect().width / ANCHO_LOGICO[dispositivo];
    marco.style.setProperty('--escala', escala.toFixed(4));
  };

  const ponerDispositivo = (nuevo: Dispositivo) => {
    dispositivo = nuevo;
    marco.dataset.dispositivo = nuevo;
    for (const boton of botonesDispositivo) {
      boton.setAttribute('aria-pressed', String(boton.dataset.dispositivo === nuevo));
    }
    escalar();
  };

  const marcarTema = (id: string) => {
    for (const boton of botonesTema) {
      boton.setAttribute('aria-pressed', String(boton.dataset.tema === id));
    }
  };

  const aplicarTema = (id: string) => {
    marcarTema(id);
    const nombre = botonesTema.find((b) => b.dataset.tema === id)?.dataset.nombre ?? id;
    if (sinDemo) {
      aviso.textContent = `La demo en vivo todavía no está publicada. ${nombre} queda elegido.`;
      return;
    }
    if (!iframe?.contentWindow || !lista) {
      temaPendiente = id;
      return;
    }
    // Sin allow-same-origin el iframe tiene origen opaco: '*' es el único destino válido.
    iframe.contentWindow.postMessage({ type: 'tgm-theme', theme: id }, '*');
    aviso.textContent = `Demo con la combinación ${nombre}.`;
  };

  window.addEventListener('message', (evento: MessageEvent) => {
    if (!iframe || evento.source !== iframe.contentWindow || !esMensajeListo(evento.data)) return;
    lista = true;
    const temas = Array.isArray(evento.data.themes)
      ? new Set(evento.data.themes.filter((t): t is string => typeof t === 'string'))
      : null;
    for (const boton of botonesTema) {
      const soportado = !temas || temas.has(boton.dataset.tema ?? '');
      boton.setAttribute('aria-disabled', String(!soportado));
    }
    const elegido =
      temaPendiente ?? botonesTema.find((b) => b.getAttribute('aria-pressed') === 'true')?.dataset.tema;
    temaPendiente = null;
    if (elegido && (!temas || temas.has(elegido))) aplicarTema(elegido);
  });

  const cargar = async () => {
    estado.textContent = 'Cargando la demo en vivo…';
    if (!(await demoPublicada(demo))) {
      sinDemo = true;
      raiz.dataset.estado = 'sin-demo';
      estado.textContent = 'La demo en vivo se publica pronto. Mientras, mira la captura.';
      abrir?.setAttribute('hidden', '');
      return;
    }
    const nuevo = document.createElement('iframe');
    nuevo.className = 'visor__iframe';
    nuevo.title = `Demo en vivo de la landing ${codigo}`;
    nuevo.setAttribute('sandbox', 'allow-scripts');
    nuevo.setAttribute('loading', 'lazy');
    nuevo.setAttribute('referrerpolicy', 'same-origin');
    nuevo.addEventListener(
      'load',
      () => {
        raiz.dataset.estado = 'cargada';
        estado.textContent = '';
      },
      { once: true },
    );
    nuevo.src = demo;
    iframe = nuevo;
    pantalla.append(nuevo);
  };

  for (const boton of botonesDispositivo) {
    boton.addEventListener('click', () => {
      if (esDispositivo(boton.dataset.dispositivo)) ponerDispositivo(boton.dataset.dispositivo);
    });
  }

  for (const boton of botonesTema) {
    boton.addEventListener('click', () => {
      if (boton.getAttribute('aria-disabled') === 'true') return;
      if (boton.dataset.tema) aplicarTema(boton.dataset.tema);
    });
  }

  new ResizeObserver(escalar).observe(pantalla);
  grupo?.removeAttribute('hidden');
  ponerDispositivo(dispositivo);

  // La demo entra después de que la página terminó de cargar, para no competir con el LCP.
  if (document.readyState === 'complete') void cargar();
  else window.addEventListener('load', () => void cargar(), { once: true });
}

export function iniciarVisores(): void {
  for (const raiz of document.querySelectorAll<HTMLElement>('[data-visor]')) iniciar(raiz);
}
