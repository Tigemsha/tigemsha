/**
 * Carrusel de la vitrina (home). La base es scroll horizontal nativo con
 * scroll-snap: con el dedo y el trackpad ya funciona sin este script. Esto
 * agrega flechas, arrastre con el mouse (con inercia y snap a la tarjeta más
 * cercana) y teclado (flechas, Inicio y Fin con el foco en la pista).
 */
export interface Carrusel {
  /** Recalcula si hay desborde y qué flechas aplican (después de filtrar). */
  actualizar(): void;
  /** Vuelve a la primera tarjeta, sin animar (después de filtrar). */
  alInicio(): void;
}

const UMBRAL_ARRASTRE = 6;
/** Cuánto "sigue" la pista después de soltarla: velocidad (px/ms) × este tiempo. */
const INERCIA_MS = 140;

export function iniciarCarrusel(raiz: HTMLElement): Carrusel | null {
  const pista = raiz.querySelector<HTMLElement>('[data-carrusel-pista]');
  const controles = raiz.querySelector<HTMLElement>('[data-carrusel-controles]');
  const anterior = raiz.querySelector<HTMLButtonElement>('[data-carrusel-anterior]');
  const siguiente = raiz.querySelector<HTMLButtonElement>('[data-carrusel-siguiente]');
  if (!pista || !controles || !anterior || !siguiente) return null;

  const reducido = matchMedia('(prefers-reduced-motion: reduce)');
  const comportamiento = (): ScrollBehavior => (reducido.matches ? 'auto' : 'smooth');

  const items = () =>
    Array.from(pista.querySelectorAll<HTMLElement>(':scope > ul > li')).filter((li) => !li.hidden);

  /** scrollLeft en el que cada tarjeta queda al inicio (respeta el scroll-padding). */
  const posiciones = () => {
    const caja = pista.getBoundingClientRect();
    const relleno = Number.parseFloat(getComputedStyle(pista).scrollPaddingLeft) || 0;
    const max = pista.scrollWidth - pista.clientWidth;
    return items().map((li) =>
      Math.min(max, Math.max(0, pista.scrollLeft + li.getBoundingClientRect().left - caja.left - relleno)),
    );
  };

  const irA = (objetivo: number, behavior: ScrollBehavior = comportamiento()) => {
    const lista = posiciones();
    if (lista.length === 0) return;
    const cercana = lista.reduce((a, b) => (Math.abs(b - objetivo) < Math.abs(a - objetivo) ? b : a));
    pista.scrollTo({ left: cercana, behavior });
  };

  const mover = (direccion: 1 | -1) => {
    const lista = posiciones();
    const actual = pista.scrollLeft;
    const destino =
      direccion === 1 ? lista.find((p) => p > actual + 2) : [...lista].reverse().find((p) => p < actual - 2);
    pista.scrollTo({ left: destino ?? (direccion === 1 ? pista.scrollWidth : 0), behavior: comportamiento() });
  };

  const actualizar = () => {
    const max = pista.scrollWidth - pista.clientWidth;
    controles.hidden = max <= 2;
    anterior.disabled = pista.scrollLeft <= 2;
    siguiente.disabled = pista.scrollLeft >= max - 2;
  };

  let pendiente = false;
  pista.addEventListener(
    'scroll',
    () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        pendiente = false;
        actualizar();
      });
    },
    { passive: true },
  );
  new ResizeObserver(actualizar).observe(pista);

  anterior.addEventListener('click', () => mover(-1));
  siguiente.addEventListener('click', () => mover(1));

  pista.addEventListener('keydown', (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const acciones: Record<string, () => void> = {
      ArrowRight: () => mover(1),
      ArrowLeft: () => mover(-1),
      Home: () => pista.scrollTo({ left: 0, behavior: comportamiento() }),
      End: () => pista.scrollTo({ left: pista.scrollWidth, behavior: comportamiento() }),
    };
    const accion = acciones[e.key];
    if (!accion) return;
    e.preventDefault();
    accion();
  });

  // Arrastre con el mouse. El dedo y el trackpad usan el scroll nativo.
  let arrastre: { id: number; x: number; scroll: number; activo: boolean; t: number; v: number } | null = null;
  let suprimirClic = false;

  pista.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || arrastre) return;
    arrastre = { id: e.pointerId, x: e.clientX, scroll: pista.scrollLeft, activo: false, t: e.timeStamp, v: 0 };
  });

  pista.addEventListener('pointermove', (e) => {
    if (!arrastre || e.pointerId !== arrastre.id) return;
    const dx = e.clientX - arrastre.x;
    if (!arrastre.activo) {
      if (Math.abs(dx) < UMBRAL_ARRASTRE) return;
      arrastre.activo = true;
      pista.setPointerCapture(e.pointerId);
      pista.dataset.arrastrando = '';
    }
    const antes = pista.scrollLeft;
    pista.scrollLeft = arrastre.scroll - dx;
    const dt = Math.max(1, e.timeStamp - arrastre.t);
    arrastre.v = (pista.scrollLeft - antes) / dt;
    arrastre.t = e.timeStamp;
  });

  const soltar = (e: PointerEvent) => {
    if (!arrastre || e.pointerId !== arrastre.id) return;
    const { activo, v } = arrastre;
    arrastre = null;
    if (!activo) return;
    suprimirClic = true;
    delete pista.dataset.arrastrando;
    if (pista.hasPointerCapture(e.pointerId)) pista.releasePointerCapture(e.pointerId);
    irA(pista.scrollLeft + v * INERCIA_MS);
  };
  pista.addEventListener('pointerup', soltar);
  pista.addEventListener('pointercancel', soltar);

  // Un arrastre no es un clic: no abre la tarjeta donde se soltó.
  pista.addEventListener(
    'click',
    (e) => {
      if (!suprimirClic) return;
      suprimirClic = false;
      e.preventDefault();
      e.stopPropagation();
    },
    true,
  );
  pista.addEventListener('dragstart', (e) => e.preventDefault());

  actualizar();
  return {
    actualizar,
    alInicio: () => {
      pista.scrollTo({ left: 0, behavior: 'auto' });
      actualizar();
    },
  };
}
