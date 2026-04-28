# Marcus Medical — marcusmedical.com

**Captured:** 2026-04-27, 1440
**Compass-rating:** 4/5

## Что увидено

Marcus Medical — facial plastic surgery practice. Главная использует **monochrome muted palette** (sage greens + grey-cream), большие portrait photos моделей, и **М wordmark monumentally** — буква М как floating brand-mark в section dividers.

Pacing — slow editorial. **Sage green как accent surface** (#5A7570-ish) — это уникальный среди наших referенсов choice, но вид «medical with refinement» здесь работает через color-discipline.

## Структура

1. Top: split image (две portrait photos)
2. Section title: «MARCUS MEDICAL» wordmark
3. Body block с serif-bold paragraph + image
4. **Big M letter** floating, plus brand-name
5. **«Especially for the» / «Body»** text + standing portrait
6. Sage green «Gallery» heading section
7. Editorial body block on sage bg
8. Dr. Marcus brief bio block on sage darker
9. Tab navigation + Atttorney section
10. Footer

## Tokens (визуально)

- Sage green primary accent — `~#5A7570`
- Cream / off-white page bg — `~#F0EBE3`
- Ink — dark grey/black
- Display — serif (italic не выраженный, regular)

## Что забираем

1. **Single-letter monumental mark** (буква М) — для нашей Платиненталь можем взять «P» как floating section-divider мотив.
2. **Quote-bridge на color-shift surface** (sage green здесь = champagne/sand для нас) — для QuoteBridge.astro.
3. **Editorial body block внутри tinted surface** — текстовая колонка ширина ~620px на цветном bg.
4. **Doctor bio как essay** (compass note: «doctor bio set as a quote-pulled essay with credentials as marginalia») — реализовано здесь как «Dr. Marcus» block с serif-italic body на sage.

## Что НЕ берём

- ❌ Sage green — у нас champagne `#C4A882`.
- ❌ Heavy reliance на model portraits — у нас нет.

## Применимость

Marcus = **monumental wordmark + editorial-on-tinted-surface** patterns. Берём оба для главной (M-as-divider → P-as-divider) и QuoteBridge.
