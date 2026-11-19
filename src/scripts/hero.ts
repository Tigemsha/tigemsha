/**
 * Controles del hero: pausar la frase que rota (y la escena, si sigue en
 * curso) y repetir la escena "antes → después" desde el principio.
 */
export function iniciarHero(): void {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const pausa = hero?.querySelector<HTMLButtonElement>('[data-hero-pausa]');
  const repetir = hero?.querySelector<HTMLButtonElement>('[data-hero-repetir]');
  const escena = hero?.querySelector<HTMLElement>('[data-escena]');
  if (!hero || !pausa || !repetir || !escena) return;

  pausa.addEventListener('click', () => {
    const pausada = hero.dataset.pausa !== 'true';
    hero.dataset.pausa = String(pausada);
    pausa.setAttribute('aria-pressed', String(pausada));
  });

  repetir.addEventListener('click', () => {
    hero.dataset.pausa = 'false';
    pausa.setAttribute('aria-pressed', 'false');
    for (const animacion of escena.getAnimations({ subtree: true })) {
      animacion.cancel();
      animacion.play();
    }
  });
}
