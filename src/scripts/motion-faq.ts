/**
 * Плавное раскрытие native <details> для .faq-item.
 * Перехватывает клик по <summary>, анимирует height + opacity,
 * по окончании выставляет height: auto чтобы контент дышал.
 */

const DURATION_MS = 480;
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setupFAQ = (detail: HTMLDetailsElement) => {
  if (detail.dataset.faqInit === '1') return;
  detail.dataset.faqInit = '1';

  const summary = detail.querySelector<HTMLElement>('summary');
  const content = detail.querySelector<HTMLElement>('.faq-a');
  if (!summary || !content) return;

  // Initial state — collapsed скрываем явно
  if (!detail.open) {
    content.style.height = '0';
    content.style.opacity = '0';
    content.style.overflow = 'hidden';
  } else {
    content.style.height = 'auto';
    content.style.opacity = '1';
  }

  let isAnimating = false;

  const animate = (from: number, to: number, opening: boolean, onDone: () => void) => {
    isAnimating = true;
    content.style.overflow = 'hidden';
    content.style.height = `${from}px`;
    content.style.opacity = opening ? '0' : '1';

    requestAnimationFrame(() => {
      content.style.transition = `height ${DURATION_MS}ms ${EASING}, opacity ${Math.round(DURATION_MS * 0.7)}ms ${EASING}`;
      content.style.height = `${to}px`;
      content.style.opacity = opening ? '1' : '0';
    });

    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'height') return;
      content.style.transition = '';
      isAnimating = false;
      onDone();
      content.removeEventListener('transitionend', onEnd);
    };
    content.addEventListener('transitionend', onEnd);
  };

  summary.addEventListener('click', (e) => {
    if (prefersReducedMotion()) return; // нативная мгновенная работа

    e.preventDefault();
    if (isAnimating) return;

    if (detail.open) {
      // Closing
      const currentHeight = content.scrollHeight;
      animate(currentHeight, 0, false, () => {
        detail.removeAttribute('open');
      });
    } else {
      // Opening — выставим [open] перед измерением scrollHeight
      detail.setAttribute('open', '');
      const targetHeight = content.scrollHeight;
      animate(0, targetHeight, true, () => {
        content.style.height = 'auto';
      });
    }
  });
};

const init = (root: ParentNode = document) => {
  root.querySelectorAll<HTMLDetailsElement>('.faq-item details').forEach(setupFAQ);
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init(), { once: true });
  } else {
    init();
  }
  document.addEventListener('astro:page-load', () => init());
}

export {};
