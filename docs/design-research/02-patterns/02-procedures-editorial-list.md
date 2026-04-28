# Pattern 02 — Procedures Editorial List

## Откуда

- **Aesop** — products как long editorial-spread, hairline между rows, hover changes type weight.
- **Maison Sisley** — services как text-only flow без card chrome.
- **Compass** — «procedures as a single ordered index; hairline rule between rows; hover state changes only the type weight or italicizes — no container chrome».

## Когда применять

- **`Procedures.astro`** на главной — replace текущей grid сетки.
- **`plastika.astro`** список 27 операций — **критический apply** (compass: «27 surgical operations should never appear as cards»).
- **`kosmetologiya.astro`** список процедур.
- **`prices.astro`** — общий список услуг с ценами.

## Anti-pattern

❌ **Equal-weight 3-card grid** с photo+title+price (Tier 3 СМ, ИПХиК, Форма).
❌ **Bento grid** с разными размерами cards для процедур — это для service-directions (Pattern 06), не для отдельных операций.
❌ **Hover effect на container** (shadow, lift, scale) — должно меняться только type.
❌ **Photo рядом с каждой процедурой** — это catalog feel.

## Спецификация

### Структура

Длинный indexed table-of-contents:

```
01    БЛЕФАРОПЛАСТИКА                          90 мин   ~120 000 ₽
      Подтяжка век. Возвращает свежий взгляд.
─────────────────────────────────────────────────────────────────
02    ПЛАСТИКА НОСА                           120 мин   ~180 000 ₽
      Эстетическая ринопластика по индивидуальной...
─────────────────────────────────────────────────────────────────
03    ...
```

- **Number** — 01, 02, 03... в utility-face caps, светло-серый, ~14px.
- **Procedure name** — Cormorant Italic 24-32px, weight regular OR Golos Text Display 22-26px regular case.
- **Brief** — Golos Text body 16-17px, secondary ink, max 1 line.
- **Meta (duration / price)** — utility-face uppercase или tabular numbers, right-aligned.
- **Hairline divider** — 1px `var(--color-border-soft)` (≈ `#E8E2D6`).

### Tailwind v4 skeleton

```astro
---
// data: array of { num, name, brief, duration, priceFrom }
const procedures = [...];
---

<section class="procedures bg-[--color-cream] py-24 lg:py-32">
  <div class="container max-w-[1100px] mx-auto px-6 lg:px-12">

    <!-- Section eyebrow -->
    <p class="text-sm uppercase tracking-[0.20em] text-[--color-ink-secondary] mb-12">
      Каталог операций
    </p>

    <!-- H2 italic -->
    <h2 class="font-display italic text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-16 max-w-[680px]">
      Двадцать семь операций пластической хирургии
    </h2>

    <!-- The list -->
    <ol class="list-none">
      {procedures.map((proc) => (
        <li class="group border-b border-[--color-border-soft] last:border-b-0
                   grid grid-cols-[60px_1fr] lg:grid-cols-[80px_minmax(280px,1fr)_120px_140px]
                   gap-x-6 lg:gap-x-12 items-baseline
                   py-6 lg:py-8 transition-all duration-300
                   hover:bg-[--color-sand]/30">

          <!-- Number -->
          <span class="font-mono text-sm text-[--color-ink-muted] tracking-wide">
            {proc.num}
          </span>

          <!-- Name + brief -->
          <div class="flex flex-col gap-2">
            <a href={`/operations/${proc.slug}`}
               class="font-display italic text-[clamp(1.25rem,2vw,1.875rem)]
                      leading-tight text-[--color-ink]
                      group-hover:not-italic transition-all">
              {proc.name}
            </a>
            <p class="font-body text-[--color-ink-secondary] text-base lg:text-lg leading-snug">
              {proc.brief}
            </p>
          </div>

          <!-- Duration (desktop only) -->
          <span class="hidden lg:block text-sm uppercase tracking-wide
                       text-[--color-ink-muted] tabular-nums">
            {proc.duration}
          </span>

          <!-- Price (desktop only) -->
          <span class="hidden lg:block text-right font-display italic
                       text-base lg:text-lg text-[--color-ink] tabular-nums">
            от {proc.priceFrom}
          </span>
        </li>
      ))}
    </ol>
  </div>
</section>
```

### Hover behavior

```css
/* Желаемое: italic → roman при hover, без других transforms */
.procedure-name {
  font-style: italic;
  transition: font-style 200ms ease-out;
}
.procedure-name:hover,
li:hover .procedure-name {
  font-style: normal;
}
```

Не используем translate, не используем scale, не меняем bg-color агрессивно. Subtle bg-tint допустим (как в snippet выше: `hover:bg-[--color-sand]/30`).

### Mobile (375)

На mobile скрываем колонки duration и price:
```
01
БЛЕФАРОПЛАСТИКА
Подтяжка век. Возвращает свежий взгляд.
от 120 000 ₽
─────────────
```

Price выводится отдельной строкой ниже brief, all duration убирается (или показывается через accordion-expand на tap).

## Привязка к прототипу

| Файл | Текущая реализация | Действие |
|---|---|---|
| `src/components/Procedures.astro` | сетка карточек | **полностью переписать** под этот pattern |
| `src/components/ServicesGrid.astro` | 3-card grid | НЕ ЭТО pattern (см. Pattern 06) |
| `src/pages/plastika.astro` | renders 27 ops | использовать этот pattern для main listing |
| `src/data/plastika.ts` | data structure | проверить наличие fields: `num`, `slug`, `name`, `brief`, `duration`, `priceFrom` |
| `src/pages/prices.astro` | TBD | этот pattern с прайс-вариацией |

## Verification

После реализации:
- [ ] Список процедур читается как content, не как catalog.
- [ ] Hairline rules между rows, без shadow.
- [ ] На hover меняется ТОЛЬКО font-style (italic → roman). Никаких transforms на container.
- [ ] Numbers (01, 02...) в utility-face, не в serif.
- [ ] Mobile показывает 2 строки на процедуру (name + brief), price ниже.
- [ ] Не похоже на каталог СМ-Пластика.
