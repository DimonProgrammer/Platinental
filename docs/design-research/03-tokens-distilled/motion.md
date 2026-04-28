# Motion — Distilled from Tier 1

Все Tier 1 сайты — **слабо анимированы**. Это критическое наблюдение: premium = restraint в motion. Никакого hero-carousel, scrolling-reveal-everywhere, scaling-on-hover.

## Motion observations across Tier 1

| Site | Motion presence | Notes |
|---|---|---|
| Lanserhof | minimal | hero image static, link hover underline only |
| Aesop | minimal | product carousel manual, card hover subtle |
| Byredo | almost none | static cover |
| La Prairie | subtle | scroll-revealed editorial cards (opacity fade) |
| Bader | subtle | scroll-tied opacity, no transforms |
| Sturm | moderate | product carousel, lifestyle bg parallax (subtle) |
| Maison Sisley | none | static |
| Aman | **slow image transitions** between sections |
| The Row | none | purely static |
| Bellezza | moderate | conventional CIS-clinic interactions |
| Tier 3 (СМ, ИПХиК, Форма) | high | sliders, popups, scroll-reveal на всём |

**Insight:** premium = **restrained motion**. Tier 3 is loud with motion. Платиненталь должна быть в Tier 1 territory.

## Compass-rule (cited)

«Animation should be confined to micro-movement of italic stress (a slow hover-tilt, or a scroll-tied subtle slant shift) rather than reveal animation. This is the Aman / The Row move — slowness as a tonal signature.»

## Motion budget — recommended

### Allowed motion

| Element | Animation | Duration | Easing |
|---|---|---|---|
| Page load | content opacity fade-in | 600-800ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Section enter viewport | translateY(20px) → 0 + opacity | 800ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Hover на CTA primary | bg-color darken 10% | 240ms | ease-out |
| Hover на text-link | underline thicken / italic→roman | 200ms | ease-out |
| Hover на procedure-list row | font-style italic → roman | 200ms | ease-out |
| Quote-bridge scroll-tied | opacity 0 → 1 | 1200ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Header scroll | bg transition transparent → solid | 300ms | ease-out |
| Form input focus | border-color shift | 160ms | ease-out |

### NOT allowed

❌ **Scale on hover** на cards / containers.
❌ **TranslateY on hover** для cards.
❌ **Box-shadow appears on hover** для cards.
❌ **Carousel auto-rotate** (manual control only).
❌ **Parallax scroll** на images.
❌ **Loading skeletons** — premium loads fast or shows nothing.
❌ **Mouse-trail effects** или cursor decorations.
❌ **Page transitions** между routes (Astro view-transitions OK if subtle, иначе нет).
❌ **Scroll-snap full-viewport** sections — слишком dramatic.
❌ **Floating WhatsApp** button с pulse animation (ставим static).

## Easing scale

```css
:root {
  /* Functional */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);     /* deceleration, default */
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);    /* для smooth reveals */

  /* Editorial (slower, more contemplative) */
  --ease-editorial: cubic-bezier(0.22, 1, 0.36, 1); /* для quote, hero reveal */

  /* Avoid */
  /* No bounce, no spring, no elastic. */
}
```

## Duration scale

```css
:root {
  --duration-instant: 100ms;       /* form interactions */
  --duration-fast: 200ms;          /* hover, focus */
  --duration-base: 300ms;          /* component transitions */
  --duration-slow: 600ms;          /* section reveal */
  --duration-editorial: 1200ms;    /* quote-bridge, hero-load */
}
```

## Reduced motion

**Critical:** все non-essential animations должны respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

И при этом hover-state colors остаются — это functional, not decorative.

## Performance

Motion should not cost performance:
- **Use `transform` and `opacity`** only (GPU-accelerated).
- **Avoid animating** `width`, `height`, `padding`, `margin`, `top/left`.
- **No motion JS libraries** beyond Astro defaults (нет GSAP, Framer Motion, etc).
- **Use IntersectionObserver** for scroll-tied reveals, не scroll event handlers.

## Implementation patterns

### Scroll-tied opacity fade

```javascript
// pseudocode
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.scroll-fade').forEach(el => observer.observe(el));
```

```css
.scroll-fade {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--duration-slow) var(--ease-editorial),
              transform var(--duration-slow) var(--ease-editorial);
}
.scroll-fade.in-view {
  opacity: 1;
  transform: translateY(0);
}
```

### Hover italic → roman (Pattern 02)

```css
.procedure-name {
  font-style: italic;
  transition: font-style var(--duration-fast) var(--ease-out);
}
li:hover .procedure-name {
  font-style: normal;
}
```

### CTA hover

```css
.btn-primary {
  background-color: var(--color-champagne);
  transition: background-color var(--duration-fast) var(--ease-out);
}
.btn-primary:hover {
  background-color: var(--color-champagne-deep);
}
```

## Action items

1. **Update `src/styles/tokens.css`** с motion variables (`--ease-*`, `--duration-*`).
2. **Audit** существующие компоненты — убрать любые scale/translate на cards.
3. **Add** scroll-fade utility class в global styles.
4. **Test** prefers-reduced-motion path.
5. **Bench** Lighthouse — motion НЕ должен снижать perf score.
6. **Lock** — никакого hero-carousel auto-rotate.

## Сводка

Motion = **rare, slow, restrained**. Если хочется добавить animation — **уберите** её, ваш сайт станет premium. Это compass-rule.
