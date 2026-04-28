# Polène — polene-paris.com

**Captured:** 2026-04-27, 1440
**Compass-rating:** 4/5 (Cormorant + Canela + Sackers reference в compass)

## Что увидено

Polène — French maroquinerie. Главная: image-led editorial spreads, мощный hero с моделью на берегу + сумкой. Section opener «SACS / BIJOUX / PETITE MAROQUINERIE» — три **серифных слова** в столбик-листинг — это main hero после photos.

Используют **Primary, Secondary, Tertiary** font system (тип-faces переименованы в семантические роли). Primary — display sans 250-300 weight (light). Secondary — body serif. Tertiary — utility.

Page-height 6705px. Pacing aman-like — много vertical white space между минимальными content-blocками.

## Tokens

- **Display: Primary (sans, weight 250-300!)** — light-weight sans для display, La Prairie-style.
- **Body: Secondary (serif, weight 300-400)**.
- **Utility: Tertiary (sans, weight 500)**, используется в caption-roles 8px (!).
- **Body 16px** — это правильный размер.
- **H2 в utility-роли 8px** — это **footer-meta**, не actual H2.

## Что забираем

1. **Three-tier semantic naming**: Primary/Secondary/Tertiary вместо «display/body/utility». Это отличный паттерн для нашего tokens.css — переименовать `--text-display`, `--text-body`, `--text-overline` в более flexible role-based naming.
2. **Hero-after-hero pattern**: photo (full-bleed model+bag) → text-only spread (SACS / BIJOUX / PETITE MAROQUINERIE) → photo grid → text-product-spread. Чередование visual ↔ typographic.
3. **Light-weight (250-300) sans для display** — confirmed third time после La Prairie и Sturm.
4. **Three-typeface system** (display sans + body serif + utility sans) — наша Cormorant + Golos + (Inter as utility?) система.

## Что НЕ берём

- ❌ Polène's display sans (Light Maison-Neue style) — у нас Cormorant italic как brand-anchor.
- ❌ Маленькие captions 8px — слишком мелкие.

## Применимость

Polène = **typography hierarchy reference**. Three-tier naming, light display weight, image-text-image rhythm.
