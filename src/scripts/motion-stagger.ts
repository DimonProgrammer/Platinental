import { inView } from 'motion';

const STAGGER_INITIAL_MS = 140;
const STAGGER_STEP_MS = 140;
const REVEAL_MARGIN = '0px 0px -10% 0px';
const SAFETY_VIEWPORT_MS = 600;
const INIT_FLAG = 'v3Init';

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealStaggerChildren = (container: HTMLElement) => {
  Array.from(container.children).forEach((child, i) => {
    const el = child as HTMLElement;
    el.style.transitionDelay = `${STAGGER_INITIAL_MS + i * STAGGER_STEP_MS}ms`;
    el.classList.add('is-visible');
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
    if (el.getBoundingClientRect().top < vh) el.classList.add('is-visible');
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
    inView(el, () => el.classList.add('is-visible'), { margin: REVEAL_MARGIN });
  });
};

const init = (root: ParentNode = document) => {
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
