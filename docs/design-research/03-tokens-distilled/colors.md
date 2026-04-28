# Colors — Distilled from Tier 1

Сводная таблица реальных hex-значений, замеренных через `getComputedStyle`. Используется для калибровки нашего `src/styles/tokens.css`.

## Page bg comparisons

| Site | Hex | Hue | Применимость |
|---|---|---|---|
| **Платиненталь (текущ)** | `#FFFDF8` | warm cream, slight yellow | baseline |
| Lanserhof | `#FFFFFF` (alt: `#F7F7F7`) | pure white + soft warm grey | другая стратегия |
| Aesop | `#FFFEF2` (alt: `#F6F5E8`) | warmest cream | теплее нас на 1 stop |
| Byredo | `#FFFFFF` | pure white | без cream |
| La Prairie | `#FFFFFF` | pure white | без cream |
| Bader | `#FFFFFF` (alt blush sections) | white + warm accents | mixed |
| Sturm | `#FFFFFF` | pure white | без cream |
| Maison Sisley | `#FFFFFF` | pure white | без cream |
| Bellezza | `#FFFFFF` (alt `#FBF7F2`) | white + warm cream alt | близко к нам |

**Вывод:** только Aesop и Bellezza используют warm cream как primary surface. Все остальные — pure white. **Это даёт нам уникальный warm cream territory.** Не сдавать.

**Recommended calibration:** оставить наш `#FFFDF8` или подвинуть к `#FFFEF2` (Aesop's cream — теплее на 1 stop). Дельта незаметна, но даст более premium feel.

## Ink (primary text) comparisons

| Site | Hex | Tone | WCAG ratio с cream |
|---|---|---|---|
| **Платиненталь (текущ)** | `#0A0A0A` | near-pure black | 19.8:1 (over-strong) |
| Lanserhof | `#2C2F38` | warm dark blue-grey | 13.4:1 |
| Aesop | `#333333` | soft dark grey | 12.6:1 |
| Bader (h1) | `#151515` | almost black | 18.4:1 |
| Bader (h2) | `#111827` | slate-800 | 17.2:1 |
| La Prairie | `#3E3E47` | slate-blue-grey | 11.8:1 |
| Sturm | `#000000` | pure black | 21:1 |
| Bellezza (h1) | `#232323` | dark grey | 16.5:1 |

**Recommended calibration для нашего `--color-ink`:**
- **Сейчас:** `#0A0A0A` (too cold, too hard)
- **Recommended:** `#1A1F2A` (warm dark, between Lanserhof и Bader)
- **Ratio с `#FFFDF8`:** ~16.4:1 (still WCAG AAA huge margin)
- **Эффект:** мягче читается, теплее tonally, ближе к European premium ink standard.

## Accent comparisons

| Site | Accent hex | Family | Note |
|---|---|---|---|
| **Платиненталь (current)** | `#C4A882` | champagne | finalized |
| Lanserhof | none / soft gold highlights | — | accent через image, не color |
| Aesop | `#CA432F` | red | sparingly used |
| Bader | `#F4E5D9` (estimated) | blush/peach | warm |
| La Prairie | dark navy + soft blue-grey gradients | cool | Swiss feel |
| Sturm | `#D9A773` (bronze, observed) | warm bronze | lifestyle accents |
| Bellezza | `#C65299` | magenta | anti-pattern для нас |
| Tier 3 (СМ) | `#A03075` | magenta | anti-pattern |
| Tier 3 (Форма) | `#F37027` | orange | anti-pattern |

**Recommended:** наш `#C4A882` champagne — **valid и unique**. Близок к Bader's blush и Sturm's bronze, но не идентичен. Это **дифференцирующая color story** для CIS-рынка (никто из российских клиник не работает в champagne territory).

## Alt surface (alt section bg)

| Site | Hex | Use |
|---|---|---|
| **Платиненталь (текущ)** | `#F5F0EB` (sand) | section alt |
| Lanserhof | `#F7F7F7` | warm grey alt |
| Aesop | `#F6F5E8` | warm cream alt (close to us) |
| Bellezza | `#FBF7F2` | warm cream alt |

**Recommended:** наш `#F5F0EB` чуть более жёлтый чем у Aesop/Bellezza. **Можно оставить** — это создаёт чуть более «warm sand» feel против их «warm cream». Различие subtle.

## Borders / dividers

| Site | Hex | Note |
|---|---|---|
| **Платиненталь (текущ)** | `#E8E2D6` (subtle warm) | baseline |
| Lanserhof | varies, light grey ~`#E5E5E5` | cool |
| Aesop | `#E0DDD0` ish (estimated) | warm |
| Bader | `#D6D6D6` | neutral |

**Recommended:** держать наш warm border — соответствует cream surface.

## Inverse surface (dark)

| Site | Hex | Use |
|---|---|---|
| **Платиненталь (текущ)** | `#0A0A0A` (= ink) | inverse sections |
| Lanserhof footer | `#2C2F38` | warm dark navy |
| Bader Science of TFC8 | `#0A1530` (estimated) | dark navy |
| Sisley newsletter | `#1A1A1A` | warm dark |

**Recommended calibration для `--color-surface-inverse`:**
- **Сейчас:** `#0A0A0A` (= ink, может быть pure black)
- **Recommended:** `#1A1F2A` (= calibrated ink) ИЛИ `#15192A` (slightly bluer dark navy для footer/quote-bridge)
- **Effect:** warm dark, никогда не pure `#000`.

## Final palette recommendations

```css
:root {
  /* Core surfaces */
  --color-cream: #FFFEF2;        /* slightly warmer than current #FFFDF8 */
  --color-sand: #F5F0EB;          /* keep current */
  --color-ink: #1A1F2A;           /* warm dark, calibrated from #0A0A0A */
  --color-ink-secondary: #4A4F5C;  /* mid grey — для secondary text */
  --color-ink-muted: #8A8E96;     /* subdued */
  --color-white: #FFFFFF;          /* pure white для product cards */
  --color-surface-inverse: #1A1F2A; /* same as ink, warm dark */

  /* Accent */
  --color-champagne: #C4A882;      /* keep — unique для CIS */
  --color-champagne-soft: #DECCB0;  /* tint для hover, soft borders */
  --color-champagne-deep: #A88B66;  /* shade для active, focus */

  /* Borders */
  --color-border-subtle: #E8E2D6;  /* keep warm */
  --color-border-soft: #D6CFC4;    /* slightly stronger */

  /* Reserved (anti-pattern blocked) */
  /* --color-red: NOT USED */
  /* --color-magenta: NOT USED */
  /* --color-saturated-anything: NOT USED */
}
```

## Action items

1. **Update `src/styles/tokens.css`**: подвинуть `--color-cream` к `#FFFEF2`, `--color-ink` к `#1A1F2A`.
2. **Add** `--color-ink-secondary`, `--color-ink-muted`, `--color-champagne-soft`, `--color-champagne-deep`.
3. **Test** все existing components на новой палитре через design-reviewer.
4. **Lock** — никаких saturated accents (red, magenta, teal, orange).
