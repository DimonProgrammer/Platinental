# Pattern 05 — Quote Full-Bleed Italic

## Откуда

- **Aman** — slow reveal, single phrase per major section opener.
- **The Row** — typography "not decorative; architectural".
- **Bader** — quote-bridge на dark inverse spread каждые 3-4 секции.
- **Garth Fisher** — italic serif quote на pure black.
- **Compass** — «giant italic quote should be allowed to break out of the column grid and sit in true full-bleed type».

## Когда применять

- **`QuoteBridge.astro`** на главной — ключевой break между Procedures и Doctors / между Doctors и Reviews.
- **`about.astro`** — manifesto-like statement на dark surface.
- **Опционально:** `concept/index.astro` финальный quote.

## Anti-pattern

❌ **Quote как small italic в paragraph** среди body — теряет вес.
❌ **Quote с photo автора** sidebar — слишком biographical.
❌ **Multiple quotes carousel** — это testimonial pattern, не quote-bridge.
❌ **Quote с скорой animation reveal** — должна быть медленной, contemplative.

## Спецификация

### Геометрия

```
┌──────────────────────────────────────────────────────┐  
│                                                      │
│  «Мы работаем с теми кому                            │
│   нужна не другая внешность,                         │
│   а уверенность в своей.»                            │
│                                                      │
│  ─ Андрей Искорнев                                   │
│  УЧРЕДИТЕЛЬ И ИДЕЙНЫЙ ВДОХНОВИТЕЛЬ                  │
│                                                      │
└──────────────────────────────────────────────────────┘
```

- **Surface inverse**: `var(--color-ink)` background (warm dark `#1A1F2A` после calibration).
- **Text color**: `var(--color-cream)` или slight warm white `#FBF7F2`.
- **Quote text**: italic Cormorant 48-80px (clamp), regular weight, tight leading 1.10.
- **Margin от viewport edges**: minimal — text может почти касаться edges (compass: «leading edge of the first letter touching the left viewport edge»).
- **Padding vertical**: 120-200px desktop, 80-100px mobile (deep-breath gap).
- **Author**: 12-14px utility-face uppercase tracking 0.20em.
- **Title under author**: also utility-face caps.

### Tailwind v4 skeleton

```astro
<section class="quote-bridge bg-[--color-ink] text-[--color-cream]
                py-32 lg:py-48 overflow-hidden">
  <div class="container max-w-[1440px] mx-auto px-4 lg:px-8">

    <blockquote class="font-display italic font-normal leading-[1.10]
                       text-[clamp(2rem,5.5vw,5rem)] tracking-[-0.01em]
                       max-w-[1280px]">
      «Мы работаем с теми, кому нужна не другая
      внешность, а уверенность в своей.»
    </blockquote>

    <footer class="mt-12 lg:mt-16 flex flex-col gap-1">
      <cite class="font-display italic text-[clamp(1.125rem,1.5vw,1.5rem)] text-[--color-cream] not-italic font-body uppercase tracking-[0.20em]">
        — Андрей Искорнев
      </cite>
      <span class="text-xs uppercase tracking-[0.20em] text-[--color-cream]/60">
        Учредитель и идейный вдохновитель
      </span>
    </footer>

  </div>
</section>
```

### Animation (subtle)

Compass: «animation should be confined to micro-movement of italic stress (a slow hover-tilt, or a scroll-tied subtle slant shift) rather than reveal animation».

Реализация:

```css
.quote-bridge blockquote {
  /* slight italic stress on view */
  transition: transform 1200ms cubic-bezier(0.22, 1, 0.36, 1),
              opacity 800ms ease-out;
}

@media (prefers-reduced-motion: no-preference) {
  .quote-bridge blockquote {
    opacity: 0;
    transform: translateY(20px);
  }
  .quote-bridge.in-view blockquote {
    opacity: 1;
    transform: translateY(0);
  }
}
```

С IntersectionObserver добавляем `.in-view` при появлении в viewport. Очень subtle reveal. **Никаких** scale, никаких dramatic transforms.

### Variants

**Variant A — Light surface, dark ink** (для main):
- BG: `var(--color-cream)`
- Text: `var(--color-ink)`
- Quote только italic Cormorant, без border
- Используется как **opening statement** в beginning страницы

**Variant B — Dark inverse** (для middle of page break):
- BG: `var(--color-ink)`
- Text: cream
- Используется для **mid-page break** (как у Bader).

Обе variants могут существовать одновременно — Variant A в начале, Variant B в середине.

## Привязка к прототипу

| Файл | Текущая реализация | Действие |
|---|---|---|
| `src/components/QuoteBridge.astro` | inverted dark | **расширить** до full-bleed type per pattern |
| `src/components/sections/AboutNumbers.astro` | TBD | возможно заменить на Variant A quote |

## Verification

- [ ] Quote text занимает ~80-100% viewport width на desktop, не contained 1280px.
- [ ] Italic Cormorant clamp 32-80px.
- [ ] Author + title в utility-face uppercase 0.20em tracking.
- [ ] Reveal subtle (translateY + opacity), без scale.
- [ ] BG warm dark `#1A1F2A`, не pure black `#000`.
- [ ] Padding vertical 120+px desktop — feel of deep-breath.
