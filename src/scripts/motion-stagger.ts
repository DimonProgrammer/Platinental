import { inView } from 'motion';

const STAGGER_INITIAL_MS = 140;
const STAGGER_STEP_MS = 140;
const REVEAL_DURATION_MS = 1050;
const REVEAL_MARGIN = '0px 0px -10% 0px';
const SAFETY_VIEWPORT_MS = 600;
const INIT_FLAG = 'v3Init';
const ANIMATED_FLAG = 'v3Animated';

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const playSoftReveal = (el: HTMLElement, delay = 0) => {
  if (el.dataset[ANIMATED_FLAG] === '1') {
    el.classList.add('is-visible');
    return;
  }

  el.dataset[ANIMATED_FLAG] = '1';

  if (prefersReducedMotion() || typeof el.animate !== 'function') {
    el.classList.add('is-visible');
    return;
  }

  el.style.willChange = 'transform, opacity';
  const animation = el.animate(
    [
      { opacity: 0, transform: 'translate3d(0, 1.25rem, 0)' },
      { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    ],
    {
      duration: REVEAL_DURATION_MS,
      delay,
      easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
      fill: 'both',
    },
  );

  animation.addEventListener('finish', () => {
    el.classList.add('is-visible');
    animation.cancel();
    el.style.willChange = '';
  }, { once: true });
};

const revealStaggerChildren = (container: HTMLElement) => {
  Array.from(container.children).forEach((child, i) => {
    const el = child as HTMLElement;
    playSoftReveal(el, STAGGER_INITIAL_MS + i * STAGGER_STEP_MS);
  });
};

const revealAll = (root: ParentNode) => {
  root.querySelectorAll<HTMLElement>('[data-v3-stagger]').forEach((c) => {
    Array.from(c.children).forEach((el) => (el as HTMLElement).classList.add('is-visible'));
  });
  root.querySelectorAll<HTMLElement>('[data-v3-reveal]').forEach((el) => {
    el.classList.add('is-visible');
  });
};

/**
 * Safety: после короткой задержки force-reveal только тех элементов,
 * которые УЖЕ в viewport. Всё, что ниже скролла — оставляем для inView.
 */
const safetyRevealInViewport = () => {
  const vh = window.innerHeight;
  document.querySelectorAll<HTMLElement>('[data-v3-reveal]:not(.is-visible)').forEach((el) => {
    if (el.getBoundingClientRect().top < vh) playSoftReveal(el);
  });
  document.querySelectorAll<HTMLElement>('[data-v3-stagger]').forEach((container) => {
    if (container.getBoundingClientRect().top < vh) {
      const allRevealed = Array.from(container.children).every((c) =>
        (c as HTMLElement).classList.contains('is-visible'),
      );
      if (!allRevealed) revealStaggerChildren(container);
    }
  });
};

const initObservers = (root: ParentNode) => {
  root.querySelectorAll<HTMLElement>('[data-v3-stagger]').forEach((container) => {
    if (container.dataset[INIT_FLAG] === '1') return;
    container.dataset[INIT_FLAG] = '1';
    inView(container, () => revealStaggerChildren(container), { margin: REVEAL_MARGIN });
  });
  root.querySelectorAll<HTMLElement>('[data-v3-reveal]').forEach((el) => {
    if (el.dataset[INIT_FLAG] === '1') return;
    el.dataset[INIT_FLAG] = '1';
    inView(el, () => playSoftReveal(el), { margin: REVEAL_MARGIN });
  });
};

const init = (root: ParentNode = document) => {
  document.documentElement.classList.add('v3-motion-bound');

  if (prefersReducedMotion()) {
    revealAll(root);
    return;
  }
  try {
    initObservers(root);
  } catch {
    revealAll(root);
    return;
  }
  // Не «глобальный» reveal-all — только для in-viewport, на случай если
  // inView не успел сработать. Ниже-фолда оставляем для scroll-trigger.
  window.setTimeout(safetyRevealInViewport, SAFETY_VIEWPORT_MS);
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init(), { once: true });
  } else {
    init();
  }
  // Astro View Transitions: при переходе между страницами re-init
  // (dedup через data-v3Init защищает от двойного binding)
  document.addEventListener('astro:page-load', () => init());
}
