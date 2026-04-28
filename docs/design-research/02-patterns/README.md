# Pattern Library — индекс

8 переиспользуемых дизайн-паттернов, извлечённых из Tier 1 deep-dive. Каждый файл — самостоятельный документ со спецификацией, HTML-скелетом, CSS-сниппетом (Tailwind v4) и привязкой к компонентам прототипа.

| # | Pattern | Откуда | Для каких компонентов |
|---|---|---|---|
| 01 | [Hero Asymmetric Two-Column](01-hero-asymmetric.md) | Bader, Sturm, EWM, Plastie, Lanserhof | `Hero.astro`, `plastika.astro` hero, все service-pages |
| 02 | [Procedures Editorial List](02-procedures-editorial-list.md) | Aesop, Sisley | `Procedures.astro`, `kosmetologiya.astro`, `prices.astro` |
| 03 | [Doctor Typographic Spread](03-doctor-typographic-spread.md) | Sturm, Marcus Medical, Garth Fisher | `DoctorCardFull.astro`, `doctors/[slug].astro`, `DoctorsPreview.astro` |
| 04 | [Sticky Section Labels (Left-Rail)](04-sticky-section-labels.md) | Lanserhof, Bader, La Prairie | `index.astro`, длинные внутренние страницы |
| 05 | [Quote Full-Bleed Italic](05-quote-fullbleed.md) | Aman, The Row, Bader | `QuoteBridge.astro` |
| 06 | [Service Direction Spread (01/02/03)](06-service-direction-spread.md) | синтез compass + Bader | `ServicesGrid.astro` (replace) |
| 07 | [Cormorant Typography Rules](07-cormorant-typography-rules.md) | Bellezza, compass | global tokens + все display moments |
| 08 | [Section Rhythm & Whitespace](08-section-rhythm-whitespace.md) | Aman, Byredo, La Prairie | global section spacing scale |

## Как использовать

1. Перед редизайном компонента **прочитай** соответствующий pattern.
2. **Скопируй HTML/CSS skeleton** как базу.
3. **Адаптируй** под content прототипа (все тексты остаются, меняется только структура и стилизация).
4. **Проверь** через `design-reviewer` agent перед закрытием.

## Связь с tokens

Все patterns используют:
- `src/styles/tokens.css` — палитра, шрифты, fluid-clamp размеры
- `docs/design-research/03-tokens-distilled/` — обновлённые правила tracking, weight, rhythm после deep-dive

Если в pattern указано значение, отсутствующее в `tokens.css`, оно должно быть добавлено в pre-implementation шаге.

## Negative space

Tier 3 anti-patterns — **противоположный список**. Если новый компонент похож на СМ-Пластика / Форма / ИПХиК — он сделан НЕправильно, независимо от того, насколько близко к Tier 1 ему хочется быть.
