/**
 * Respaldo de los revelados al hacer scroll para navegadores sin
 * scroll-driven animations (ver .revela en base.css). Con ellas, o con menos
 * movimiento, no hace nada: CSS se encarga y todo queda visible.
 *
 * Solo oculta lo que todavía no se ve al cargar, así que nada parpadea, y si
 * este script no llega, todo se queda visible.
 */
export function iniciarRevelados(): void {
  if (CSS.supports('animation-timeline: view()')) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const grupos = document.querySelectorAll<HTMLElement>('.revela');
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        const grupo = entrada.target as HTMLElement;
        if (!entrada.isIntersecting) continue;
        grupo.dataset.revela = 'visto';
        observador.unobserve(grupo);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  );

  const alto = window.innerHeight;
  for (const grupo of grupos) {
    // Lo que ya está en pantalla al cargar se queda como está.
    if (grupo.getBoundingClientRect().top < alto * 0.88) continue;
    grupo.dataset.revela = 'pendiente';
    observador.observe(grupo);
  }
}
