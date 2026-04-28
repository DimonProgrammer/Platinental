# Spacing & Rhythm — Distilled from Tier 1

## Container width comparisons

| Site | Container max | Side padding | Content effective |
|---|---|---|---|
| Lanserhof | 1312px | 64px | ~1184px |
| Aesop | fluid 100% | section-driven | varies |
| Byredo | varies | 24-48px | varies |
| La Prairie | varies | 40px | varies |
| Bader | 1280px | 40-64px | ~1152px |
| Sturm | 1280px | 32-48px | ~1184px |
| Maison Sisley | 720px monument | 40px | 640px |
| Bellezza | 1200px | 32px | 1136px |

**Median container:** **~1280px** with 40-64px side padding.

**Recommendation:**
```css
--container-narrow: 720px;     /* monument cards (Sisley pattern) */
--container-default: 1100px;   /* main editorial */
--container-wide: 1280px;      /* hero, direction spreads */
--container-bleed: 100%;       /* quote-bridge full-bleed */

--gutter-x: clamp(1.5rem, 4vw, 4rem);  /* 24-64px */
```

## Section vertical padding

| Site | Sections — typical py | Comments |
|---|---|---|
| Lanserhof | ~120-160px | confirmed Aman precedent |
| Aesop | ~80-120px | mid |
| Byredo | n/a (single section) | — |
| La Prairie | ~80-100px | between editorial spreads |
| Bader | ~96-128px | mid-large |
| Sturm | ~64-96px | shorter |
| Aman | **200-300px** | extreme deep-breath |
| The Row | minimal — single image | — |

**Distillation:**
- **Most sites:** 80-120px desktop section padding-y (= clamp(96px, 14vh, 160px) approximately).
- **Premium accents (Aman):** 200-300px deep-breath.

**Three-tier scale (Pattern 08 cite):**
```css
--gap-small: clamp(3rem, 8vh, 5rem);     /* 48-80px — between related blocks */
--gap-medium: clamp(6rem, 14vh, 10rem);   /* 96-160px — between sections */
--gap-deep: clamp(10rem, 22vh, 17.5rem);  /* 160-280px — direction transitions */
```

## Element spacing within sections

| Spacing type | Western sites | Our recommendation |
|---|---|---|
| Eyebrow → H1 | 24-48px | `--gap-eyebrow-to-h1: clamp(1rem, 2vw, 2rem)` |
| H1 → Lead | 32-64px | `--gap-h1-to-lead: clamp(1.5rem, 2.5vw, 3rem)` |
| Lead → CTAs | 48-80px | `--gap-content-to-cta: clamp(2rem, 4vw, 4rem)` |
| Section H2 → body | 48-72px | `--gap-h2-to-body: clamp(2rem, 3vw, 3rem)` |
| Card → card (in editorial list) | hairline-rule + 16-32px py | per Pattern 02 |

## 8px baseline grid

Большинство сайтов следуют 8px baseline (некоторые 4px). Наша current `tokens.css` likely уже на 8px.

**Recommendation:** держать 8px baseline для всех discrete spacing. Fluid clamps снижают точность baseline, но это acceptable для top-level rhythm. Mathematical precision matters for cards and form elements, не для section padding.

## Hero text column width

Compass cite: «hero content max-width 512px при viewport 1440 (около 35%)».

| Site | Hero text max-width (1440) | Ratio |
|---|---|---|
| Lanserhof | 512px | 35% |
| Bader | ~640px | 44% |
| Sturm | ~580px | 40% |
| Plastie | ~560px | 39% |

**Recommendation:**
```css
--hero-text-max: clamp(20rem, 40vw, 40rem);  /* 320-640px — narrow editorial column */
```

В hero text column **никогда не fluid 100%**. Limit к 35-45% viewport на desktop.

## Procedure list row height

Pattern 02 — каждая row procedure list:

```css
--row-procedure-py: clamp(1rem, 1.5vw, 1.75rem);  /* 16-28px each side, total 32-56px row */
```

С хайрлайном 1px и type 24px italic — visual row height ~80-100px desktop, что comfortable.

## Card padding (when cards used at all)

При Pattern 06 mini-procedure list или kosmecevtika cards:

```css
--card-padding: clamp(1.25rem, 2vw, 2rem);  /* 20-32px */
```

Без double padding (если карточка внутри секции с padding-y, sub-padding минимальный).

## Footer padding

| Site | Footer py | px |
|---|---|---|
| Lanserhof | 80-120px py | 64-80px px |
| Bader | 64-96px py | 32-48px px |
| Sturm | 96px py | 48-64px px |
| Bellezza | 48-72px py | 32px px |

**Recommendation:** `padding: clamp(4rem, 8vw, 6rem) clamp(2rem, 4vw, 4rem)` — generous but не overwhelming.

## Final spacing recommendations

```css
:root {
  /* Containers */
  --container-narrow: 45rem;    /* 720px */
  --container-default: 68.75rem; /* 1100px */
  --container-wide: 80rem;      /* 1280px */
  --container-bleed: 100%;
  --gutter-x: clamp(1.5rem, 4vw, 4rem);

  /* Section vertical rhythm (3 tiers) */
  --gap-small: clamp(3rem, 8vh, 5rem);
  --gap-medium: clamp(6rem, 14vh, 10rem);
  --gap-deep: clamp(10rem, 22vh, 17.5rem);

  /* Element spacing */
  --gap-eyebrow-to-h1: clamp(1rem, 2vw, 2rem);
  --gap-h1-to-lead: clamp(1.5rem, 2.5vw, 3rem);
  --gap-h2-to-body: clamp(2rem, 3vw, 3rem);
  --gap-content-to-cta: clamp(2rem, 4vw, 4rem);

  /* Component spacing */
  --hero-text-max: clamp(20rem, 40vw, 40rem);
  --row-procedure-py: clamp(1rem, 1.5vw, 1.75rem);
  --card-padding: clamp(1.25rem, 2vw, 2rem);
}
```

## Action items

1. **Update `src/styles/tokens.css`** с three-tier section rhythm (`--gap-small/medium/deep`).
2. **Add** container variants (narrow / default / wide / bleed).
3. **Add** element-level gaps (eyebrow-to-h1, etc).
4. **Audit** existing components — заменить hardcoded margins/paddings на these variables.
5. **Test** на mobile (375): clamps должны давать comfortable spacing — no <24px section padding.
