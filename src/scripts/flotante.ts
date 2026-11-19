/**
 * Botón flotante de WhatsApp (WhatsAppFlotante.astro). Visible cuando:
 * el hero (o el primer bloque de la página) ya salió de pantalla, el cierre
 * todavía no entra y no hay un campo de texto con el teclado abierto.
 */
export function iniciarFlotante(): void {
  const boton = document.querySelector<HTMLElement>('[data-flotante]');
  if (!boton || !('IntersectionObserver' in window)) return;

  const inicio = document.querySelector('main > :first-child');
  const cierre = document.querySelector('[data-cierre]') ?? document.querySelector('footer');
  let inicioVisible = true;
  let cierreVisible = false;
  let escribiendo = false;

  const actualizar = () => {
    boton.dataset.visible = String(!inicioVisible && !cierreVisible && !escribiendo);
  };

  const observador = new IntersectionObserver((entradas) => {
    for (const entrada of entradas) {
      if (entrada.target === inicio) inicioVisible = entrada.isIntersecting;
      if (entrada.target === cierre) cierreVisible = entrada.isIntersecting;
    }
    actualizar();
  });
  if (inicio) observador.observe(inicio);
  if (cierre) observador.observe(cierre);

  const esCampo = (el: EventTarget | null) =>
    el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement;
  document.addEventListener('focusin', (e) => {
    escribiendo = esCampo(e.target);
    actualizar();
  });
  document.addEventListener('focusout', () => {
    escribiendo = false;
    actualizar();
  });
}
