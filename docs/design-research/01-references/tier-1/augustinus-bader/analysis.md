# Augustinus Bader — Deep Dive

**URL:** https://augustinusbader.com/
**Captured:** 2026-04-27, 1440×900 / 1024×768 / 375×812
**Compass-rating:** 5/5 — closest brand-architecture analogue для doctor-led skincare house

---

## 1. Tonal read

Bader — это **«scientific warmth»**. Пара DM Serif (display) + MaisonNeue (body) + blush-peach accent даёт ровно тот микс, что нам нужен: serif italic дисциплина для editorial moments + sans для clinical evidence. Чередование dark/light spreads создаёт **ритм научного журнала**, где после каждого издательского блока приходит «лабораторный» dark spread с numbered evidence или science-claim.

Три решения:
1. **DM Serif как display + MaisonNeue как body** — идентичная нашей **Cormorant + Golos** стратегия, но в более «pediatric» исполнении. DM Serif менее dramatic, чем Cormorant italic — это важный contrast.
2. **Blush/peach CTA на dark backgrounds** — warm accent работает как «единственная тёплая точка» в холодной dark spread. У нас champagne `#C4A882` будет работать аналогично.
3. **Dark inverse spreads каждые 3-4 секции** — не просто quote-bridge, а целые editorial blocks (Science of TFC8, Auto Replenish Benefits, Footer) на тёмном. Это даёт страница «дышит» через смену поверхности.

**Применимость:** Bader — это **самый прямой архитектурный референс** для главной Платиненталь. Их рh thm dark↔light соответствует нашему уже задуманному QuoteBridge inverse. Их founder-spotlight (B&W photo + blush bg + serif H2 + CTA) — это готовый pattern для нашего «Об основателе клиники» / about-spread.

## 2. Layout & rhythm

| Параметр | Значение |
|---|---|
| Viewport reference | 1440px |
| Page scroll-height | 7689px (длинный, ~12 секций) |
| Section transitions | смена bg-color: white ↔ dark navy ↔ blush ↔ tinted-grey |
| Hero | **asymmetric** — product image left + text/cookie right |

**Секционная структура (наблюдаемая):**
1. **Hero asymmetric**: split. Product cluster left (~50%), text + cookie banner right.
2. **Trending Products**: 3 cards 1×3 grid. Photo + name + benefit-line + price + SHOP NOW.
3. **Founder spotlight**: split. B&W founder portrait (~60%), blush bg + DM Serif H2 «Professor Augustinus Bader, MD, PhD» + body + CTA right.
4. **Multi-column editorial**: 4 столбца плотного body text (это редкий приём — обычно 2-3).
5. **Quote bridge dark**: inverse, italic quote.
6. **Clinical Evidence**: large numbered list 1-2-3 на light bg.
7. **Science of TFC8 dark spread**: full inverse, large display numbers + body.
8. **Drop illustration spread**: hand-drawn line illustration на light, минималистично.
9. **Skin Lab editorial card**: image + caption.
10. **Exclusive Club rewards** dark surface.
11. **Auto Replenish Benefits** dark surface, list.
12. **Reviews 3-up**.
13. **Footer dark navy**.

**Asymmetry применяется в:** Hero, Founder spotlight, Skin Lab — то есть везде, где есть narrative. Centered применяется в Trending Products, Reviews — где есть равные единицы (cards).

## 3. Typography

| Role | Family | Size | Weight | LH | Tracking |
|---|---|---|---|---|---|
| H1 | DM Serif | 30px | 400 | 36px (1.20) | normal |
| H2 | DM Serif | 24px | 500 | 28px (1.17) | normal |
| H3 | MaisonNeue | 20px | 500 | 28px (1.40) | normal |
| Body | MaisonNeue | 14px | 400 | 24px (1.71) | normal |
| Button | sans (Helvetica fallback) | 15px | **700** | 22.5px | 0.1px |
| Decorative | Mr Dafoe (script) | varies | 400 | — | — |

**Ключевые наблюдения:**
- **DM Serif weight 400-500** — Bader использует относительно тонкие weights serif'а. Не 700 black. Это создаёт «editorial article» feel.
- **H1 30px** — это очень скромный размер для display! Bader не делает 60-100px hero. У них display tonально близок к article H1, не billboard.
- **H3 переключается на sans** — четкая граница «display=serif, sublevel=sans».
- **Button 700 weight** — sans-CTA bold, в отличие от обычного 400-500. Для contrast против тонкого serif.
- **Декоративный script-font (Mr Dafoe)** — для special headlines типа «Created by science». Очень «boutique-bakery» feel, нам не нужен.

**Conclusion:** Bader подтверждает наш **Cormorant + Golos** выбор как valid ход. Но даёт важную калибровку:
- **H1 не нужно делать гигантским** (60-100px) — даже 30-44px италик Cormorant читается как display, если разместить в правильном контексте (узкая колонка, breathing room вокруг).
- **Bold sans CTA (15-16px weight 700) на blush/peach background** — наша champagne кнопка должна быть схожей dimensionally.

## 4. Color & material

| Color | Hex | Role |
|---|---|---|
| `#FFFFFF` | white | Page bg |
| `#151515` | rgb(21,21,21) | Ink h1/body — почти black |
| `#111827` | rgb(17,24,39) | Ink h2 — slate-800 |
| `#D6D6D6` | rgb(214,214,214) | Borders / subdued |
| `#F4E5D9` (~estimated) | blush-peach | Accent CTA/spotlight bg |
| Dark navy footer | ~`#0A1530` | Footer + dark spreads |

**Photography treatment:**
- Founder portrait — B&W, профессиональный, **looking off-camera** (не frontal smile).
- Product shots — clean, slight shadow, soft warm light.
- Lifestyle absent. Нет «happy customer» снимков.

## 5. Steals & pitfalls

### Что забираем

1. **Dark/light rhythm каждые 3-4 секции** — для главной Платиненталь явно подтверждает наш QuoteBridge inverse и расширяет его на «full dark editorial spread» concept (например, Принципы клиники могут быть dark spread, не просто paragraph).
2. **Founder spotlight pattern** (B&W portrait + blush bg + serif H2 + body + CTA) — для нашего «Об основателе» / Andrei Iskornev / Andrei Vasiliev блока. Готовый pattern.
3. **Numbered evidence lists 1-2-3 на dark surface** — для нашего блока «Принципы» или «Почему мы» на главной. Lower decorative, higher rationale.
4. **Multi-column editorial body** (4 cols на 1440) — для блока «Об клинике» / «История». Premium press release feel.
5. **Bold sans CTA на blush bg** — наша champagne кнопка должна быть solid filled (не outlined), 700 weight, ~15-16px.

### Что НЕ годится

- ❌ **DM Serif вместо Cormorant** — Cormorant italic больше брендовый, Bader's DM Serif ближе к article-feel. Наша premium positioning ближе к Sturm (см. ниже).
- ❌ **Скриптовые декоративные шрифты** (Mr Dafoe) — pretentious, нам не нужно.
- ❌ **Heavy sans body 400** — у нас Golos Text 400 будет чуть теплее, MaisonNeue холодноватый.
- ❌ **Multi-column body 4-up на 1440** — для русского текста с длинными словами 4 колонки будут жмуриться. Для нас 2-3 columns max.

### Pitfalls

- Bader использует Mr Dafoe и Lato как «дополнительные» шрифты помимо DM Serif + MaisonNeue. Это **избыточная семья** — у нас правило две основных + одна utility, не больше.
- Cookie banner у Bader накладывается прямо в hero — это плохой UX, не повторяем.

## Сводка

Bader — **самый прямой эталон архитектуры главной**. Берём ритм dark/light spreads, founder pattern, numbered evidence, multi-column editorial. НЕ берём DM Serif (сохраняем Cormorant), не берём декоративные шрифты.
