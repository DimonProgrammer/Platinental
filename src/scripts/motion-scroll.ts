import Lenis from 'lenis';

let lenis: Lenis | null = null;
let rafId: number | null = null;

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isCoarsePointer = (): boolean =>
  window.matchMedia('(pointer: coarse)').matches;

const init = () => {
  if (lenis) return; // singleton
  if (prefersReducedMotion()) return; // ничего не подменяем

  lenis = new Lenis({
    duration: 1.4,
    // editorial easing — длинный settling, без bounce
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    // На тач-устройствах оставляем нативный скролл — он быстрее и привычнее
    syncTouch: false,
    touchMultiplier: 1,
    wheelMultiplier: 1,
  });

  const raf = (time: number) => {
    lenis!.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);

  // На coarse pointer (мобила) Lenis активен но без force-smooth
  if (isCoarsePointer()) {
    lenis.options.smoothWheel = false;
  }
};

const destroy = () => {
  if (rafId !== null) cancelAnimationFrame(rafId);
  rafId = null;
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
  // Astro View Transitions: при swap страницы — пересоздаём
  document.addEventListener('astro:before-swap', destroy);
  document.addEventListener('astro:page-load', () => {
    if (!lenis) init();
  });
}
