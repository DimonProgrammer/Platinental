# Typography — Distilled from Tier 1

Замеры font-size / line-height / tracking из `getComputedStyle` 8 Tier 1 сайтов, плюс recommendations для калибровки нашего `tokens.css` и применения в pattern-library.

## H1 size comparisons (1440 viewport)

| Site | H1 | LH | Tracking | Family |
|---|---|---|---|---|
| Lanserhof | 52.8px | 1.06 | 0.030em | Frutiger |
| Aesop | 36px | 1.40 | 0 | Suisse Int'l |
| Byredo | n/a (none) | — | — | — |
| La Prairie | 50px (Thin) | 1.16 | 0 | Roboto Thin |
| Bader | 30px | 1.20 | 0 | DM Serif |
| Sturm | 35px (UPPERCASE) | 1.29 | 0.014em | Europa |
| Maison Sisley | 50px (Thin) | 1.16 | 0 | Roboto Thin |
| Bellezza | 40px (Bold) | 1.20 | 0.020em | Playfair |

**Range:** 30-52px. **Median:** 40-44px.

**Лесок:** наша compass-recommendation для H1 italic Cormorant — clamp(40px, 6vw, 80-100px). Это значит **на high end (1440+) мы крупнее median'а**, но в italic это compensated subjectively (italic читается subtly меньше same-size roman).

**Recommendation:**
```css
--text-h1-size: clamp(2.5rem, 6vw, 5rem);   /* 40-80px */
--text-h1-leading: 1.05;                     /* tight, like Lanserhof */
--text-h1-tracking: -0.005em;                /* subtle compression */
```

## Body size comparisons

| Site | Body | LH | Tracking |
|---|---|---|---|
| Lanserhof | 18.4px | 1.30 | normal |
| Aesop | **12px** | normal | normal |
| Byredo | 14px | — | normal |
| La Prairie | 14px | — | normal |
| Bader | 14px | 1.71 | normal |
| Sturm | 14px | 1.30 | 0.018em |
| Maison Sisley | 16px | 1.50 | normal |
| Bellezza | 16-21px | 1.50 | 0.011em |

**Range:** 12-21px. **Western premium runs 14-16px, CIS runs 16-21px.**

**Recommendation для нас (Russian audience, mature 35-55):**
```css
--text-body-size: clamp(1rem, 1.1vw, 1.125rem);  /* 16-18px */
--text-body-leading: 1.6;                          /* generous для cyrillic */
--text-body-tracking: 0.005em;                     /* subtle для cyrillic clarity */
```

Body 16-18px на cream comfortable для long-form reading.

## Lead size comparisons

Crucial — у нас сейчас лид-параграф недоразвит.

| Site | Lead | LH | Notes |
|---|---|---|---|
| Aesop | 32px (Work Sans) | 1.60 | парадокс — lead больше H1 |
| Bader | (not distinct lead) | — | uses H3 |
| Sturm | 18px (lead H3) | 1.30 | small lead |
| Bellezza | 21px | 1.50 | mid-size |
| La Prairie | 18px | 1.33 | small lead |

**Recommendation:**
```css
--text-lead-size: clamp(1.25rem, 1.8vw, 1.75rem);  /* 20-28px */
--text-lead-leading: 1.5;
--text-lead-weight: 400;
--text-lead-color: var(--color-ink-secondary);     /* slight de-emphasis */
```

Lead-параграф 20-28px после H1 — это **новый уровень** в нашей hierarchy, которого сейчас нет в прототипе.

## Eyebrow / Utility caps comparisons

Это самый важный pattern across Tier 1 — wide-tracked uppercase 11-14px.

| Site | Size | Tracking | Weight | Notes |
|---|---|---|---|---|
| Lanserhof | 14px | **2.8px (0.20em)** | 400 | wide gold standard |
| Aesop | 15.84px | 1px (0.063em) | 700 | bold variant |
| Bader | n/a | — | — | uses sans H3 |
| La Prairie | 14px | 0.84px (0.06em) | 300 | light variant |
| Sturm | 15px | **3px (0.20em)** | 400 | matches Lanserhof |
| Maison Sisley | 14px | 1px (0.07em) | 500 | medium |
| Aman caption | 10px | **2px (0.20em)** | 400 | extreme small |

**Critical pattern:** **5 из 8 сайтов используют tracking 0.20em** на small uppercase. Это **the eyebrow signature**.

**Recommendation:**
```css
--text-eyebrow-size: clamp(0.75rem, 0.9vw, 0.875rem);   /* 12-14px */
--text-eyebrow-tracking: 0.20em;                         /* WIDE */
--text-eyebrow-weight: 400;
--text-eyebrow-case: uppercase;
--text-eyebrow-color: var(--color-ink-secondary);
```

Confirm что наш текущий `--text-overline` имеет 0.18-0.22em tracking, не просто uppercase.

## Display weight observations

| Site | Display weight | Style |
|---|---|---|
| Lanserhof | 400 (regular) | uppercase |
| Aesop | 400 | normal case |
| La Prairie | **300 (Light)** | uppercase + wide tracking |
| Sisley H1 | **100-200 (Thin)** | normal |
| Bader | 400 | normal |
| Sturm | 400 | uppercase |
| Bellezza | **700 (Bold)** | normal |

**Insight:** **lighter weights (200-400) preferred** в premium territory. Bold (700) — Bellezza territory (CIS clinic-luxury). Heavy weight = «conventional luxury», light/regular weight = «editorial premium».

**Для нашего Cormorant:** держим **400 (Regular Italic)**. Не используем 500/700 (italic).

**Для Golos Text body:** добавить вариант **300 (Light)** для display moments (например, large lead на dark surface). Сейчас в проекте только 400.

## Tracking principles

| Size range | Tracking | Why |
|---|---|---|
| Display 60-100px | -0.01 to 0 | compress dramatic |
| H2 32-60px | 0 | neutral |
| Body 16-18px | +0.005em | subtle wide для cyrillic |
| Eyebrow 12-14px caps | **0.20em** | premium signature |
| Mono/numbers | 0 | tabular standard |

**Cyrillic adjustment:** add +0.01em к baseline tracking для ВСЕХ кеглей <40px. Bellezza precedent + Polène precedent. Для display ≥40px — без изменений (italic Cormorant in cyrillic OK).

## Final type scale recommendations

```css
:root {
  /* Display */
  --text-display: clamp(3rem, 7vw, 6rem);       /* direction headlines 48-96px */
  --text-h1: clamp(2.5rem, 6vw, 5rem);          /* hero H1 40-80px */
  --text-h2: clamp(2rem, 4vw, 3.5rem);          /* section H2 32-56px */

  /* Sub-display (sans, our Golos) */
  --text-h3: clamp(1.25rem, 1.8vw, 1.75rem);    /* sub-headers 20-28px */

  /* Lead — NEW in our system */
  --text-lead: clamp(1.25rem, 1.6vw, 1.5rem);   /* 20-24px */

  /* Body */
  --text-body-large: clamp(1rem, 1.2vw, 1.125rem);  /* 16-18px */
  --text-body: 1rem;                                /* 16px */
  --text-body-small: 0.875rem;                      /* 14px */

  /* Utility */
  --text-eyebrow: clamp(0.75rem, 0.9vw, 0.875rem); /* 12-14px caps */
  --text-caption: 0.75rem;                         /* 12px */
  --text-meta: 0.6875rem;                          /* 11px small caps */

  /* Leading */
  --leading-display: 1.05;
  --leading-h2: 1.10;
  --leading-h3: 1.30;
  --leading-lead: 1.50;
  --leading-body: 1.65;
  --leading-eyebrow: 1.40;

  /* Tracking */
  --tracking-display: -0.005em;
  --tracking-h2: 0;
  --tracking-body: 0.005em;
  --tracking-eyebrow: 0.20em;
}
```

## Action items

1. **Update `src/styles/tokens.css`**:
   - Add `--text-lead`, `--text-display` если нет.
   - Calibrate `--text-eyebrow-tracking` to 0.20em.
   - Add `--leading-*` variables.
2. **Add** Golos Text 300 weight subscription if absent.
3. **Verify** Cormorant cyrillic subset подключён.
4. **Test** все display moments на новой шкале — должна быть видна 4-уровневая hierarchy: Display → H1 → H2 → Lead → Body.
