/**
 * Servicios v2: cuándo corren las demostraciones. La coreografía vive en CSS;
 * este script solo pone estados:
 *
 *   [data-anima]  data-estado="espera": las animaciones quedan en su primer
 *                 cuadro, pausadas. Pasa a "corre" cuando entra en pantalla
 *                 (30 % visible). Fuera de pantalla lleva .fuera y se pausa.
 *   [data-grupo]  data-pausa (botón Pausar) y data-terminado (una demo de
 *                 una sola vez que ya acabó: queda "Repetir").
 *
 * Sin JS o con prefers-reduced-motion no se arma nada y se ve el estado final.
 */

const UMBRAL = 0.3;
const AVANCE_TEMAS_MS = 1100;

export function iniciarServicios(): void {
  const raiz = document.querySelector<HTMLElement>('[data-servicios]');
  if (!raiz) return;
  const mover = !matchMedia('(prefers-reduced-motion: reduce)').matches;

  raiz.querySelectorAll<HTMLElement>('[data-tabs]').forEach((web) => iniciarPestanas(web, mover));
  raiz.querySelectorAll<HTMLElement>('[data-temas]').forEach((caja) => iniciarTemas(caja, mover));
  raiz.querySelectorAll<HTMLElement>('[data-desliza]').forEach(iniciarDeslizable);
  if (!mover) return;

  const io = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        const el = e.target as HTMLElement;
        el.classList.toggle('fuera', !e.isIntersecting);
        if (el.dataset.estado === 'espera' && e.intersectionRatio >= UMBRAL) correr(el);
      }
    },
    { threshold: [0, UMBRAL] },
  );

  raiz.querySelectorAll<HTMLElement>('[data-anima]').forEach((el) => {
    el.dataset.estado = 'espera';
    io.observe(el);
  });
  raiz.querySelectorAll<HTMLElement>('[data-grupo]').forEach(iniciarGrupo);
  raiz.querySelectorAll<HTMLElement>('[data-vuelos]').forEach(iniciarVuelos);
}

function correr(el: HTMLElement): void {
  el.dataset.estado = 'corre';
  el.dispatchEvent(new CustomEvent('sv:corre'));
}

function animasDe(grupo: HTMLElement): HTMLElement[] {
  const lista = [...grupo.querySelectorAll<HTMLElement>('[data-anima]')];
  if (grupo.hasAttribute('data-anima')) lista.unshift(grupo);
  return lista;
}

/** Pausa/reanudar, repetir, fin de la demo y el paso actual (aria-current). */
function iniciarGrupo(grupo: HTMLElement): void {
  const controles = grupo.querySelector<HTMLElement>('[data-controles]');
  if (controles) controles.hidden = false;
  const texto = grupo.querySelector<HTMLElement>('[data-accion="pausa"] .control__texto');
  const pasos = [...grupo.querySelectorAll<HTMLElement>('[data-paso]')].map((p) => p.closest('li'));

  const marcarPaso = (i: number) =>
    pasos.forEach((li, j) => (j === i ? li?.setAttribute('aria-current', 'step') : li?.removeAttribute('aria-current')));

  const pausar = (si: boolean) => {
    grupo.toggleAttribute('data-pausa', si);
    if (texto) texto.textContent = (si ? texto.dataset.reanudar : texto.dataset.pausar) ?? '';
  };

  grupo.querySelector('[data-accion="pausa"]')?.addEventListener('click', () => {
    pausar(!grupo.hasAttribute('data-pausa'));
  });

  grupo.querySelector('[data-accion="repetir"]')?.addEventListener('click', () => {
    pausar(false);
    grupo.removeAttribute('data-terminado');
    marcarPaso(-1);
    for (const el of animasDe(grupo)) {
      delete el.dataset.estado;
      void el.offsetWidth; // quita las animaciones antes de volver a ponerlas
      correr(el);
    }
  });

  grupo.addEventListener('animationstart', (e) => {
    const paso = (e.target as HTMLElement).dataset.paso;
    if (paso !== undefined) marcarPaso(Number(paso));
  });

  grupo.addEventListener('animationend', (e) => {
    if (!(e.target as Element).hasAttribute('data-fin')) return;
    grupo.setAttribute('data-terminado', '');
    marcarPaso(-1);
  });
}

/** Una fila que se desliza solo es región enfocable (teclado) cuando de verdad desborda. */
function iniciarDeslizable(fila: HTMLElement): void {
  new ResizeObserver(() => {
    if (fila.scrollWidth > fila.clientWidth + 1) fila.tabIndex = 0;
    else fila.removeAttribute('tabindex');
  }).observe(fila);
}

/** Posición de un elemento dentro de otro, sin contar transforms. */
function posicion(el: HTMLElement, base: HTMLElement): { x: number; y: number } {
  let x = 0;
  let y = 0;
  let nodo: HTMLElement | null = el;
  while (nodo && nodo !== base) {
    x += nodo.offsetLeft;
    y += nodo.offsetTop;
    nodo = nodo.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

/** Automatización: cada ficha vuela de su renglón del Excel a su lugar en el archivo. */
function iniciarVuelos(demo: HTMLElement): void {
  const lienzo = demo.querySelector<HTMLElement>('.lienzo');
  if (!lienzo) return;

  const medir = () => {
    for (const vuelo of demo.querySelectorAll<HTMLElement>('[data-vuelo]')) {
      const i = vuelo.dataset.vuelo;
      const fila = demo.querySelector<HTMLElement>(`[data-fila="${i}"]`);
      const lugar = demo.querySelector<HTMLElement>(`[data-slot="${i}"]`);
      const celda = fila?.children[1] as HTMLElement | undefined;
      if (!fila || !lugar || !celda) continue;
      const a = posicion(fila, lienzo);
      const b = posicion(lugar, lienzo);
      // La ficha despega con su texto encima del texto del renglón.
      const ficha = lugar.firstElementChild;
      const nombre = ficha?.querySelector('.registro__c');
      const desfase =
        ficha && nombre ? nombre.getBoundingClientRect().left - ficha.getBoundingClientRect().left : 0;
      const x0 = a.x + celda.offsetLeft + parseFloat(getComputedStyle(celda).paddingLeft) - desfase;
      const y0 = a.y + (fila.offsetHeight - lugar.offsetHeight) / 2;
      vuelo.style.width = `${lugar.offsetWidth}px`;
      vuelo.style.setProperty('--x0', `${x0}px`);
      vuelo.style.setProperty('--y0', `${y0}px`);
      vuelo.style.setProperty('--dx', `${b.x - x0}px`);
      vuelo.style.setProperty('--dy', `${b.y - y0}px`);
    }
  };

  let cuadro = 0;
  new ResizeObserver(() => {
    cancelAnimationFrame(cuadro);
    cuadro = requestAnimationFrame(medir);
  }).observe(lienzo);
}

/** Apps web: pestañas accesibles que avanzan solas hasta que la persona elige una. */
function iniciarPestanas(web: HTMLElement, mover: boolean): void {
  const pestanas = [...web.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const paneles = [...web.querySelectorAll<HTMLElement>('[data-panel]')];
  const lista = web.querySelector<HTMLElement>('[role="tablist"]');
  const url = web.querySelector<HTMLElement>('[data-url-vista]');
  const grupo = web.closest<HTMLElement>('[data-grupo]');
  if (!lista || pestanas.length === 0) return;

  web.setAttribute('data-js', '');
  lista.hidden = false;
  paneles.forEach((p) => p.setAttribute('role', 'tabpanel'));

  let actual = 0;
  const activar = (i: number, foco = false) => {
    actual = i;
    pestanas.forEach((p, j) => {
      p.setAttribute('aria-selected', String(j === i));
      p.tabIndex = j === i ? 0 : -1;
    });
    paneles.forEach((p, j) => {
      p.classList.toggle('activo', j === i);
      p.inert = j !== i;
    });
    if (url) url.textContent = pestanas[i]?.dataset.url ?? '';
    if (foco) pestanas[i]?.focus();
  };

  // Quien elige una pestaña toma el control: se acaba el recorrido automático.
  const tomarControl = () => {
    web.removeAttribute('data-auto');
    grupo?.removeAttribute('data-pausa');
    const controles = grupo?.querySelector<HTMLElement>('[data-controles]');
    if (controles) controles.hidden = true;
  };

  pestanas.forEach((p, i) =>
    p.addEventListener('click', () => {
      tomarControl();
      activar(i);
    }),
  );

  lista.addEventListener('keydown', (e) => {
    const n = pestanas.length;
    const destino: Record<string, number> = {
      ArrowRight: (actual + 1) % n,
      ArrowLeft: (actual - 1 + n) % n,
      Home: 0,
      End: n - 1,
    };
    const i = destino[e.key];
    if (i === undefined) return;
    e.preventDefault();
    tomarControl();
    activar(i, true);
  });

  activar(0);
  if (!mover) return;
  web.setAttribute('data-auto', '');
  web.addEventListener('animationend', (e) => {
    if (web.hasAttribute('data-auto') && (e.target as Element).hasAttribute('data-avance')) {
      activar((actual + 1) % pestanas.length);
    }
  });
}

/** Landings: la muestra pasa una vez por sus colores; las fichas de color se pueden tocar. */
function iniciarTemas(caja: HTMLElement, mover: boolean): void {
  const botones = [...caja.querySelectorAll<HTMLButtonElement>('[data-tema]')];
  const vista = caja.querySelector<HTMLElement>('[data-vista]');
  const fichas = caja.querySelector<HTMLElement>('[data-fichas]');
  if (!vista || botones.length === 0) return;
  if (fichas) fichas.hidden = false;

  let espera = 0;
  const poner = (id: string) => {
    vista.dataset.temaActivo = id;
    botones.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tema === id)));
  };
  botones.forEach((b) =>
    b.addEventListener('click', () => {
      clearTimeout(espera);
      poner(b.dataset.tema ?? '');
    }),
  );
  poner(botones[0]?.dataset.tema ?? '');
  if (!mover) return;

  const ids = botones.map((b) => b.dataset.tema ?? '');
  const anima = caja.closest<HTMLElement>('[data-anima]') ?? caja;
  anima.addEventListener(
    'sv:corre',
    () => {
      let i = 0;
      const avanzar = () => {
        i += 1;
        poner(ids[i % ids.length] ?? '');
        if (i < ids.length) espera = window.setTimeout(avanzar, AVANCE_TEMAS_MS);
      };
      espera = window.setTimeout(avanzar, AVANCE_TEMAS_MS + 300);
    },
    { once: true },
  );
}
