/**
 * Кастомный курсор: champagne dot + ring, lerp lag.
 * Только на pointer:fine (десктоп с мышью), не на тачскринах.
 * Уважает prefers-reduced-motion.
 */

const HOVER_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-v3-cursor-hover]';

const isFinePointer = (): boolean =>
  window.matchMedia('(pointer: fine)').matches;
const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let mounted = false;

const init = () => {
  if (mounted) return;
  if (!isFinePointer() || prefersReducedMotion()) return;

  const cursor = document.querySelector<HTMLElement>('[data-v3-cursor]');
  if (!cursor) return;

  mounted = true;
  document.documentElement.classList.add('v3-cursor-active');

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let cx = mx;
  let cy = my;

  let darkCheckTick = 0;
  const handleMove = (e: MouseEvent) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.opacity = '1';
    // Surface detection — раз в 3 кадра, чтобы не дёргать elementFromPoint каждый mousemove
    if (++darkCheckTick % 3 !== 0) return;
    const below = document.elementFromPoint(mx, my);
    const isDark = !!below?.closest?.('.v3-surface-ink');
    cursor.classList.toggle('is-on-dark', isDark);
  };

  const handleLeave = () => {
    cursor.style.opacity = '0';
  };

  const handleEnter = () => {
    cursor.style.opacity = '1';
  };

  document.addEventListener('mousemove', handleMove, { passive: true });
  document.addEventListener('mouseleave', handleLeave);
  document.addEventListener('mouseenter', handleEnter);

  // Hover state — делегируем через event capture
  const handleOver = (e: MouseEvent) => {
    const target = e.target as Element | null;
    if (target?.closest?.(HOVER_SELECTOR)) {
      cursor.classList.add('is-hover');
    }
  };
  const handleOut = (e: MouseEvent) => {
    const target = e.target as Element | null;
    if (target?.closest?.(HOVER_SELECTOR)) {
      cursor.classList.remove('is-hover');
    }
  };
  document.addEventListener('mouseover', handleOver, { passive: true });
  document.addEventListener('mouseout', handleOut, { passive: true });

  // Click feedback — мгновенное сжатие
  document.addEventListener('mousedown', () => cursor.classList.add('is-down'), { passive: true });
  document.addEventListener('mouseup', () => cursor.classList.remove('is-down'), { passive: true });

  // RAF lerp
  const lerp = 0.18;
  const loop = () => {
    cx += (mx - cx) * lerp;
    cy += (my - cy) * lerp;
    cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
  // Astro View Transitions: курсор-DOM persists в body, но классы обновляем
  document.addEventListener('astro:page-load', () => {
    if (!mounted) init();
  });
}
