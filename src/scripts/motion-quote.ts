import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

const INIT_FLAG = 'quoteInit';

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let registered = false;

const ensurePlugins = () => {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
};

const initQuoteBridge = (root: ParentNode = document) => {
  const sections = root.querySelectorAll<HTMLElement>('[data-quote-bridge]');

  sections.forEach((section) => {
    if (section.dataset[INIT_FLAG] === '1') return;
    section.dataset[INIT_FLAG] = '1';

    const kicker = section.querySelector<HTMLElement>('.quote-kicker');
    const heading = section.querySelector<HTMLElement>('[data-quote-heading]');
    const footnote = section.querySelector<HTMLElement>('.quote-footnote');
    const accentShell = section.querySelector<HTMLElement>('.hc-shell');
    const orbit = section.querySelector<HTMLElement>('.quote-orbit');

    if (!heading || !kicker || !footnote || !accentShell) return;

    if (prefersReducedMotion()) {
      section.classList.add('is-visible');
      gsap.set([kicker, footnote, orbit], { clearProps: 'all' });
      return;
    }

    ensurePlugins();

    const split = new SplitType(heading, {
      types: 'lines,words',
      tagName: 'span',
    });

    gsap.set(kicker, { opacity: 0, y: 18 });
    gsap.set(footnote, { opacity: 0, y: 20 });
    gsap.set(split.words, { yPercent: 112, opacity: 0, rotate: 0.001, willChange: 'transform, opacity' });
    gsap.set(accentShell, { '--hc-reveal-scale': 0 } as gsap.TweenVars);
    gsap.set(accentShell, { willChange: 'transform' });

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      scrollTrigger: {
        trigger: section,
        start: 'top 72%',
        once: true,
      },
    });

    timeline
      .fromTo(
        orbit,
        { opacity: 0, scale: 0.88, rotate: -10 },
        { opacity: 0.9, scale: 1, rotate: 0, duration: 1.4, ease: 'power2.out' },
        0,
      )
      .to(
        kicker,
        { opacity: 1, y: 0, duration: 0.7 },
        0.08,
      )
      .to(
        split.words,
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.018,
          ease: 'power4.out',
        },
        0.12,
      )
      .fromTo(
        accentShell,
        { '--hc-reveal-scale': 0 } as gsap.TweenVars,
        { '--hc-reveal-scale': 1, duration: 0.9, ease: 'power3.out' } as gsap.TweenVars,
        0.55,
      )
      .to(
        footnote,
        { opacity: 1, y: 0, duration: 0.8 },
        0.95,
      );

    if (orbit) {
      gsap.to(orbit, {
        yPercent: -16,
        xPercent: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.1,
        },
      });
    }

    ScrollTrigger.refresh();
  });
};

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initQuoteBridge(), { once: true });
  } else {
    initQuoteBridge();
  }

  document.addEventListener('astro:page-load', () => initQuoteBridge());
}

export {};
