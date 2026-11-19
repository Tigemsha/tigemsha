/**
 * Tarjetas de personajes (Personajes.astro).
 *
 * Estado en el DOM: `data-cara` ("hoy" | "ahora") es la cara en reposo y
 * `data-hover` la muestra de paso mientras el mouse está encima.
 *   - Mouse: al pasar se voltea; al salir regresa a su reposo.
 *   - Botón (clic, toque o teclado): cambia el reposo y el foco pasa al botón
 *     de la otra cara, para que el teclado no se quede en una cara escondida.
 *   - Táctil: cada tarjeta se voltea sola una vez, después de 1.2 s en pantalla,
 *     si nadie la tocó antes.
 * La primera vez que se ve la cara "ahora", las horas cuentan desde 0.
 */
const ESPERA_AUTOMATICA = 1200;
const DURACION_CUENTA = 900;

function contar(el: HTMLElement): void {
  const meta = Number(el.dataset.cuenta);
  if (!Number.isFinite(meta) || el.dataset.contado) return;
  el.dataset.contado = '';
  const inicio = performance.now();
  const paso = (ahora: number) => {
    const avance = Math.min(1, (ahora - inicio) / DURACION_CUENTA);
    const suavizado = 1 - (1 - avance) ** 3;
    el.textContent = String(Math.round(meta * suavizado));
    if (avance < 1) requestAnimationFrame(paso);
  };
  el.textContent = '0';
  requestAnimationFrame(paso);
}

export function iniciarPersonajes(): void {
  const lista = document.querySelector<HTMLElement>('[data-personajes]');
  if (!lista) return;
  const conMovimiento = matchMedia('(prefers-reduced-motion: no-preference)').matches;
  if (!conMovimiento) return;
  const tactil = matchMedia('(hover: none)').matches;

  const tocadas = new WeakSet<HTMLElement>();

  const mostrarAhora = (persona: HTMLElement) => {
    const cuenta = persona.querySelector<HTMLElement>('[data-cuenta]');
    if (cuenta) contar(cuenta);
  };

  for (const persona of lista.querySelectorAll<HTMLElement>('[data-persona]')) {
    let ignorarHover = false;

    persona.addEventListener('pointerenter', (e) => {
      if (e.pointerType !== 'mouse' || ignorarHover) return;
      persona.dataset.hover = '';
      mostrarAhora(persona);
    });
    persona.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse') return;
      ignorarHover = false;
      delete persona.dataset.hover;
    });

    for (const boton of persona.querySelectorAll<HTMLButtonElement>('[data-voltear]')) {
      boton.addEventListener('click', () => {
        const destino = boton.dataset.voltear === 'ahora' ? 'ahora' : 'hoy';
        tocadas.add(persona);
        // Un clic con el mouse encima manda sobre el hover hasta que salga.
        if (persona.dataset.hover !== undefined) ignorarHover = true;
        delete persona.dataset.hover;
        persona.dataset.cara = destino;
        if (destino === 'ahora') mostrarAhora(persona);
        const otro = persona.querySelector<HTMLButtonElement>(
          `[data-voltear="${destino === 'ahora' ? 'hoy' : 'ahora'}"]`,
        );
        otro?.focus({ preventScroll: true });
      });
    }
  }

  if (!tactil || !('IntersectionObserver' in window)) return;
  const temporizadores = new Map<Element, number>();
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        const persona = entrada.target as HTMLElement;
        if (entrada.isIntersecting) {
          if (temporizadores.has(persona)) continue;
          temporizadores.set(
            persona,
            window.setTimeout(() => {
              observador.unobserve(persona);
              if (tocadas.has(persona)) return;
              persona.dataset.cara = 'ahora';
              mostrarAhora(persona);
            }, ESPERA_AUTOMATICA),
          );
        } else {
          window.clearTimeout(temporizadores.get(persona));
          temporizadores.delete(persona);
        }
      }
    },
    { threshold: 0.6 },
  );
  for (const persona of lista.querySelectorAll('[data-persona]')) observador.observe(persona);
}
