# Pattern 07 — Cormorant Typography Rules

## Откуда

- **Bellezza** — Playfair Display Bold для cyrillic clinic — confirmed что transitional serif работает в русском.
- **Polène** — Cormorant + Canela + Sackers Gothic three-typeface system.
- **Hôtel Weekend** — Cormorant Italic для display **specifically**, не Roman.
- **Compass synthesis** — «reserve Cormorant exclusively for hero/quote/section-opener moments — never for body or even sub-headlines», «Cormorant's italic specifically (not roman) for hero — this is the move that makes the typeface feel like editorial voice rather than wedding invitation».
- **Made Good Designs guide** (compass cite) — «Cormorant Garamond is not recommended for body text. Display typeface designed for large sizes; high stroke contrast causes hairline strokes to disappear at small sizes.»

## Когда применять

- **Везде где Cormorant** — этот pattern обязателен к чтению перед любым H1/H2/quote/display moment.
- Используется как **rule sheet** для всех других patterns.

## Spec

### Когда Cormorant работает

✅ **Hero H1** — italic, ≥40px, tight leading 1.05-1.10.
✅ **Section openers H2** — italic, 32-72px.
✅ **Quote-bridge** — italic, 48-100px clamp.
✅ **Doctor quote** — italic, 24-32px.
✅ **Procedure name** в editorial list — italic, 20-32px.
✅ **Display moments** в footer / about — italic, large.
✅ **Numbers / stats** в editorial context (not metric grid) — italic.

### Когда Cormorant НЕ работает

❌ **Body paragraphs** — high stroke contrast делает body-size unreadable.
❌ **Buttons / CTAs** — потеряются на small sizes.
❌ **Form labels / inputs** — utility face only.
❌ **Captions, eyebrows** — too small.
❌ **Navigation** — utility face only.
❌ **Pricing tables** — tabular numbers нужны.
❌ **Footer fine print** — sans only.

### Italic vs Roman

**Default = italic** для display. Роман used только для:
- Стилевой контраст внутри H1: «**Архитектура** *лица*» (где Roman emphasizes).
- Captions внутри editorial где italic уже использован (избежать double italic).

Compass rule: italic = «editorial voice», roman = «wedding invitation». Italic делает Cormorant работающим.

### Размер scale

| Role | Min (375) | Max (1440+) | Clamp |
|---|---|---|---|
| Hero H1 | 40px | 80-100px | `clamp(2.5rem, 6vw, 5rem)` |
| Section H2 | 32px | 48-72px | `clamp(2rem, 4vw, 3.5rem)` |
| Direction headline | 48px | 96px | `clamp(3rem, 7vw, 6rem)` |
| Quote-bridge | 32px | 80-100px | `clamp(2rem, 5.5vw, 5rem)` |
| Procedure name | 20px | 32px | `clamp(1.25rem, 2vw, 2rem)` |
| Doctor monogram | 64px | 144px | `clamp(4rem, 12vw, 9rem)` |

### Leading

| Size | Leading | Notes |
|---|---|---|
| 80px+ | 1.00-1.05 (almost solid) | display drama |
| 48-72px | 1.05-1.10 | tight editorial |
| 32-48px | 1.10-1.20 | moderate |
| 20-32px | 1.25-1.35 | comfortable |

Compass: «line-height tight enough that the lines almost touch — italic legs of one line should nearly graze the ascenders of the next».

### Tracking

| Size | Tracking | Why |
|---|---|---|
| 80px+ | -0.01em (slightly negative) | display compression |
| 48-72px | -0.005em / 0 | neutral |
| 32-48px | 0 | neutral |
| <32px | +0.005em (subtle wide) | small-size clarity |

В кириллице add +0.01em к baseline (Bellezza precedent).

### Font weight

- **Use 400 (Regular Italic) only** для display.
- **Не использовать 700 (Bold Italic)** — это «wedding invitation» territory (Bellezza anti-pattern).
- **Не использовать Light** — Cormorant Light Italic слишком хрупкий на медиум-размерах.

### Color

- На cream: `var(--color-ink)` `#1A1F2A` (after calibration).
- На dark inverse: `var(--color-cream)` `#FFFDF8`.
- **Никогда** в saturated color (champagne, red, etc).
- **Champagne можно** только для **single-letter accent** или **подчёркивания одного слова** в headline.

### Cyrillic specifics

- **Cormorant Garamond** имеет cyrillic subset через Google Fonts. Subset must be loaded.
- Add `+0.01em` letter-spacing к baseline для Cyrillic readability.
- Test что `й`, `ё`, `ц`, `щ` рендерятся корректно — иногда custom-cuts путают diacritics.
- Italic style для cyrillic — **проверить что подключён**, обычно нужно отдельно.

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap&subset=cyrillic-ext,cyrillic,latin');
```

### Substitutes если Cormorant fails

- **Editorial New** (Pangram Pangram) — paid альтернатива с лучшим cyrillic rendering, variable axis.
- **Playfair Display** — free, cyrillic OK, но bolder strokes (Bellezza style).
- **EB Garamond** — free, тоньше Cormorant, может быть too delicate.

Default: **Cormorant Garamond Italic**, Editorial New если budget позволяет.

## Привязка к прототипу

| Файл | Действие |
|---|---|
| `src/styles/tokens.css` | проверить `--font-display` подключение, добавить cyrillic subset |
| `src/layouts/Layout.astro` | font-preload links для Cormorant cyrillic |
| Все компоненты с H1/H2 | применить эти rules |

## Verification

- [ ] Cormorant используется ТОЛЬКО для display (≥20px) и quotes.
- [ ] Italic style — default, Roman только для emphasis-внутри-italic.
- [ ] Cyrillic letter-spacing +0.01em.
- [ ] Body нигде не set in Cormorant.
- [ ] Buttons, forms, navigation — НЕ Cormorant.
- [ ] Не Bold (700) Cormorant — только Regular Italic.
- [ ] Tight leading на large sizes (1.05-1.10).

## Связанные patterns

- Pattern 01 (Hero) — H1 italic Cormorant.
- Pattern 02 (Procedures editorial list) — procedure names italic.
- Pattern 03 (Doctor) — quote italic.
- Pattern 05 (Quote bridge) — full-bleed italic.
- Pattern 06 (Direction spreads) — display headlines italic.
