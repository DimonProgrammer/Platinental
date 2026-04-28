# Byredo — Deep Dive

**URL:** https://www.byredo.com/eu_en/
**Captured:** 2026-04-27, 1440×900 / 1024×768 / 375×812
**Compass-rating:** 5/5 для tonal calibration

---

## 1. Tonal read

Byredo — это **противоположность Aesop по pages-as-articles philosophy**. У Byredo главная страница это не «страница», а одна **обложка**: hero с stencil-wordmark и product cluster, и сразу footer. Высота скролла на 1440 viewport — всего **1365px**, то есть фактически один экран и хвост. Это «single object in vast empty space» в чистом виде.

Три решения:
1. **Pure white + pure black** — единственный Tier 1 ref без cream'а. Премиум здесь не через тёплость, а через **photographic + stencil-typography texture**.
2. **Stencil wordmark «BYREDO»** наложен на product photography — текст полупрозрачный, читается как watermark, не headline. Это сигнал «brand prevenient over message».
3. **Главная как cover, а не как page** — никакой попытки рассказать о брендах/сериях/историях. Один image-spread = visit.

**Применимость для Платиненталь:** Byredo — это **anti-strategy** для нашей главной. Мы НЕ можем делать «cover-only» главную, потому что наш user приходит за информацией о hospitals и нам нужно вести его в направления. Но **Byredo's gallery-pages** (где они показывают одну серию или один продукт на скролл-стоп) — это потенциальная модель для **наших direction-spreads** (Pattern 06).

## 2. Layout & rhythm

| Параметр | Значение |
|---|---|
| Page scroll-height (1440) | **1365px** — фактически 1 viewport + footer |
| Sections | 5 (включая footer и cookie-banner) |
| Hero height | ~715px (full viewport minus header) |
| Footer | начинается ~715px |
| Approach | **No content scrolling**. Главная = hero + footer. |

Это совершенно нетипичная homepage-стратегия. Внутри коллекций (`/perfumes`, `/by-collection`) Byredo использует чуть больше скролла, но всё равно выдержан принцип **«one product per viewport»**.

## 3. Typography

| Role | Family | Size | LH | Tracking | Case |
|---|---|---|---|---|---|
| H2 | byredoSans | 12px | 28px (2.33) | 0.3px | UPPERCASE |
| P | byredoSans | 12px | 16px (1.33) | 0.3px | UPPERCASE |
| Link | byredoSans | 14px | 20px (1.43) | 0.35px | none |
| Button | byredoSans | 12px | 12px (1.0) | 0.6px (0.05em) | UPPERCASE |
| Body root | byredoSans | 14px | — | — | — |

**Ключевые наблюдения:**
- **Всё micro-typography**. Самое крупное — 14px (links). Display moves только через images.
- **Single-family discipline** — byredoSans везде. Stencil-вариант (`byredoStencil`) только в logo.
- **Uppercase почти везде**. Это сигнал «catalog», но смягчён мелким размером.
- **Tracking слабый, но систематичный** — 0.3-0.6px. Не Lanserhof's 2.8px wide-tracking. Это subtle wide.

**Conclusion:** Byredo's typography НЕ применима к нашему case. Они полагаются на product photography + brand-stencil как display element. Без сильного product photography такой подход не работает.

## 4. Color & material

| Color | Hex | Role |
|---|---|---|
| `#FFFFFF` | rgb(255, 255, 255) | Page bg (NOT cream) |
| `#000000` | rgb(0, 0, 0) | Ink — pure black |
| `#4D564F` | rgb(77, 86, 79) | Secondary text — forest-grey-green |
| `rgba(0,0,0,0.75)` | — | Overlays |

**Photography treatment:** product cluster shots на neutral grey background (silver-mirror surface), tonal желтоватый highlight на bottle caps. Минималистично, но текстурно.

## 5. Steals & pitfalls

### Что забираем

1. **Single-product-per-viewport pattern** — для нашего `kosmecevtika` каталога (детальные карточки), где каждый продукт получает свой scroll-stop с большим breathing room вокруг.
2. **Product photography style** — изолированный продукт + neutral grey background + soft shadows вокруг. Без models, без lifestyle. Очень applicable для космецевтики.
3. **Footer на page-bg color** (не tinted), с полным contact/services dump в 3-4 колонки. Это легко повторяется.

### Что НЕ годится

- ❌ **Pure white + pure black** — у нас cream `#FFFDF8` + ink (warmer dark). Не теряем.
- ❌ **Single-screen homepage** — наша главная должна провести user'а через 11 секций.
- ❌ **Все uppercase 12px** — слишком austere, нечитаемо для 35-55 audience.
- ❌ **Stencil/wordmark-as-watermark** — у Платиненталь логотип stable, не вариант.

### Pitfalls

- Byredo's pages для отдельных perfume series (e.g. `/perfumes/mojave-ghost`) — это «editorial product spread». Стоит посмотреть отдельно для inspiration на наших `kosmecevtika` детальных карточках, но не на главной.
- Cookie banner у Byredo занимает весь footer — это им сходит, потому что нет реального content ниже hero. Нам не подходит.

## Сводка применимости

Byredo учит нас **дисциплине пустоты на product-уровне**, но не на homepage-уровне. Берём для деталей космецевтики (Pattern 02 пересмотрен под product cards), не берём для главной.
