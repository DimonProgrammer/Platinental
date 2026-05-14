const goalByHref = (href: string): string | null => {
  if (href.startsWith('tel:')) return 'phone_click';
  if (href.includes('wa.me')) return 'whatsapp_click';
  if (href.includes('t.me')) return 'telegram_click';
  if (href.includes('max.ru')) return 'max_click';
  if (href === '/prices' || href === '/prices/') return 'price_view';
  if (href.startsWith('/doctors/')) return 'doctor_page_click';
  return null;
};

const reachGoal = (goal: string, params?: Record<string, string>) => {
  window.platinentalReachGoal?.(goal, params);
};

const initAnalyticsGoals = (root: ParentNode = document) => {
  if (root === document && document.documentElement.dataset.analyticsGoalsBound === '1') return;
  if (root === document) document.documentElement.dataset.analyticsGoalsBound = '1';

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target.closest('a, button') : null;
    if (!(target instanceof HTMLElement)) return;

    if (target.matches('[data-booking-open], a[href="#form"]')) {
      reachGoal('booking_open', { source: target.textContent?.trim() ?? '' });
    }

    if (target instanceof HTMLAnchorElement) {
      const href = target.getAttribute('href') ?? '';
      const goal = goalByHref(href);
      if (goal) reachGoal(goal, { href });
    }
  }, { capture: true });
};

declare global {
  interface Window {
    __PLATINENTAL_METRIKA_ID?: number;
    platinentalReachGoal?: (goal: string, params?: Record<string, unknown>) => void;
  }
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAnalyticsGoals(), { once: true });
  } else {
    initAnalyticsGoals();
  }
  document.addEventListener('astro:page-load', () => initAnalyticsGoals());
}

export {};
