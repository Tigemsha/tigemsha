/**
 * Visor de demos de la vitrina.
 *
 * Protocolo con la demo (detalle en README.md):
 *   visor → demo   { type: 'tgm-theme', theme: '<id>' }   (targetOrigin '*': el iframe es de origen opaco)
 *   demo  → visor  { type: 'tgm-ready', themes: ['rack', …] }  al cargar
 * El visor solo acepta mensajes cuyo `source` es su propio iframe.
 *
 * El estado vive en el DOM: el dispositivo en `data-dispositivo` del marco (CSS
 * decide su ancho lógico, `--w`), el tema elegido en el `aria-pressed` de su
 * ficha y la fase de la demo en `data-estado` del visor.
 */

/** El mismo corte en el que el estado 'auto' de VisorDemo pasa a escritorio. */
const ES_ESCRITORIO = '(min-width: 64rem)';

interface MensajeListo {
  type: 'tgm-ready';
  themes?: unknown;
}

function esMensajeListo(dato: unknown): dato is MensajeListo {
  return typeof dato === 'object' && dato !== null && 'type' in dato && dato.type === 'tgm-ready';
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

/** Marca con aria-pressed el botón del grupo cuyo `data-<clave>` es `valor`. */
function presionar(botones: HTMLButtonElement[], clave: 'tema' | 'dispositivo', valor: string): void {
  for (const boton of botones) {
    boton.setAttribute('aria-pressed', String(boton.dataset[clave] === valor));
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

  let iframe: HTMLIFrameElement | null = null;
  /** La ventana de la demo, desde que avisa con tgm-ready que ya escucha. */
  let demoLista: Window | null = null;

  const escalar = () => {
    const anchoLogico = Number.parseFloat(getComputedStyle(marco).getPropertyValue('--w'));
    // Ancho fraccional: con clientWidth (entero) queda una rendija de menos de 1 px.
    const escala = pantalla.getBoundingClientRect().width / anchoLogico;
    marco.style.setProperty('--escala', escala.toFixed(4));
  };

  const ponerDispositivo = (nuevo: string) => {
    marco.dataset.dispositivo = nuevo;
    presionar(botonesDispositivo, 'dispositivo', nuevo);
    escalar();
  };

  const aplicarTema = (id: string) => {
    presionar(botonesTema, 'tema', id);
    const nombre = botonesTema.find((b) => b.dataset.tema === id)?.dataset.nombre ?? id;
    if (raiz.dataset.estado === 'sin-demo') {
      aviso.textContent = `La demo en vivo todavía no está publicada. ${nombre} queda elegido.`;
      return;
    }
    // Antes de tgm-ready la demo no escucha: el tema queda marcado y se manda cuando avise.
    if (!demoLista) return;
    // Sin allow-same-origin el iframe tiene origen opaco: '*' es el único destino válido.
    demoLista.postMessage({ type: 'tgm-theme', theme: id }, '*');
    aviso.textContent = `Demo con la combinación ${nombre}.`;
  };

  window.addEventListener('message', (evento: MessageEvent) => {
    const ventana = iframe?.contentWindow;
    if (!ventana || evento.source !== ventana || !esMensajeListo(evento.data)) return;
    demoLista = ventana;
    const { themes } = evento.data;
    const temas = Array.isArray(themes) ? new Set(themes.filter((t): t is string => typeof t === 'string')) : null;
    const soporta = (id: string) => temas === null || temas.has(id);
    for (const boton of botonesTema) {
      boton.setAttribute('aria-disabled', String(!soporta(boton.dataset.tema ?? '')));
    }
    // El tema marcado, aunque lo hayan tocado antes de que la demo estuviera lista.
    const elegido = botonesTema.find((b) => b.getAttribute('aria-pressed') === 'true')?.dataset.tema;
    if (elegido && soporta(elegido)) aplicarTema(elegido);
  });

  const cargar = async () => {
    estado.textContent = 'Cargando la demo en vivo…';
    if (!(await demoPublicada(demo))) {
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
      if (boton.dataset.dispositivo) ponerDispositivo(boton.dataset.dispositivo);
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
  ponerDispositivo(matchMedia(ES_ESCRITORIO).matches ? 'escritorio' : 'celular');

  // La demo entra después de que la página terminó de cargar, para no competir con el LCP.
  if (document.readyState === 'complete') void cargar();
  else window.addEventListener('load', () => void cargar(), { once: true });
}

export function iniciarVisores(): void {
  for (const raiz of document.querySelectorAll<HTMLElement>('[data-visor]')) iniciar(raiz);
}
