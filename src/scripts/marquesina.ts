/**
 * Botón de pausa de la marquesina de clientes. El hover y el foco ya la pausan
 * con CSS; el botón la deja quieta hasta que se vuelva a tocar (WCAG 2.2.2).
 */
export function iniciarMarquesina(): void {
  const boton = document.querySelector<HTMLButtonElement>('[data-marquesina-pausa]');
  const seccion = boton?.closest<HTMLElement>('section');
  if (!boton || !seccion) return;
  boton.addEventListener('click', () => {
    const pausada = seccion.dataset.marquesinaPausada === undefined;
    if (pausada) seccion.dataset.marquesinaPausada = '';
    else delete seccion.dataset.marquesinaPausada;
    boton.setAttribute('aria-pressed', String(pausada));
  });
}
