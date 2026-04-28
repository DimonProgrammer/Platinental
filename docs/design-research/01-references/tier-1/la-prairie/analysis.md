# La Prairie — Deep Dive

**URL:** https://www.laprairie.com/en-us/
**Captured:** 2026-04-27, 1440×900 / 1024×768 / 375×812
**Compass-rating:** 5/5

---

## 1. Tonal read

La Prairie — это **«Swissness as restraint»** в чистом виде. Hero с продуктом на blue gradient (signature серый-голубой подоложек), затем длинный scroll (10500+px) из editorial spreads, product spotlights, feature articles. Тон — **архитектурный peace**, где Peter Zumthor встречает clinical research. Премиум через **wide tracking + light weight uppercase**, а не через display drama.

Три решения:
1. **Display через weight 300 (Light)** — H2 = 32px, weight 300, uppercase, letter-spacing 0.10em. Это **противоположный** ход от обычной display-стратегии (heavy/regular). Light на uppercase создаёт «engraved on metal plate» feeling.
2. **Custom font-family с italic вариантами во всех weights** (100-700). Это позволяет italic emphasis в любом контексте без подключения второго fontFace.
3. **Длинный scroll storytelling** — главная это маршрут через 8-10 editorial spreads, каждый со своим heroом и contained narrative. Не «cover» (Byredo) и не «catalog» (Aesop).

**Применимость к Платиненталь:** La Prairie показывает **альтернативу italic Cormorant** — H1/H2 могут быть **Light + uppercase + wide-tracking** (с использованием Inter Light или Golos Text Light в нашем стеке). Это второй путь к premium, который мы НЕ должны игнорировать. Его можно применить **внутри** italic Cormorant стратегии — например, мелкие eyebrow-tags делать La Prairie-style (Light, uppercase, wide tracking).

## 2. Layout & rhythm

| Параметр | Значение |
|---|---|
| Viewport reference | 1440px |
| Page scroll-height | **10509px** — long-scroll editorial |
| Sections | много, каждый ~600-1000px высоты |
| Section transitions | через bg-image, не через bg-color |
| Hero | full-bleed product gradient + центральный overlay text |

**Подход:** La Prairie использует **«article-spreads»** — каждая секция = отдельный editorial. Между ними нет visible dividers, но есть смена композиции (left-text/right-image → centered-text-only → product grid → ...).

**Ритм:** vertical rhythm не строгий 8px (видно из 22px line-height у 14px body — это 1.57). Но spacing между секциями консистентный, ~80-120px.

## 3. Typography

| Role | Family | Size | Weight | LH | Tracking | Case |
|---|---|---|---|---|---|---|
| H2 (display) | La Prairie | 32px | **300** | 40px (1.25) | 3.2px (0.10em) | UPPERCASE |
| H3 / Lead | La Prairie | 14px | 300 | 22px (1.57) | 0.84px (0.06em) | none |
| p (on image) | La Prairie | 18px | 300 | 24px (1.33) | 1.26px (0.07em) | none |
| Link | La Prairie | 14px | 300 | 22px (1.57) | 0.84px | UPPERCASE |
| Body root | La Prairie | 14px | 300 | — | — | — |

**Ключевые наблюдения:**
- **Weight 300 — primary** для всего макета. Это очень редкий выбор, обычно 400 — primary. Light создаёт «engraved» quality, особенно с uppercase.
- **Tracking систематически wide** — 0.06-0.10em везде. Не только eyebrows, body тоже tracks.
- **Большие гарнитуры Light + Italic** позволяют редкий приём: **Light Italic** для emphasis. У нас Cormorant italic близко к этому, но cормoрант italic — это «editorial swing», а La Prairie italic — это «soft scientific aside».

**Conclusion:** **Light weight (200-300) у нашего sans-серого** (Golos Text 300) недоиспользован в прототипе. Сейчас Golos Text 400 — primary. Стоит добавить 300 как опцию для display moments, особенно для eyebrows и captions, где нужна «aristocratic» нота.

## 4. Color & material

| Color | Hex | Role |
|---|---|---|
| `#FFFFFF` | rgb(255, 255, 255) | Page bg |
| `#3E3E47` | rgb(62, 62, 71) | Ink — slate-blue-grey |
| Hero-gradient | blue-grey gradient | Signature surface |
| Footer | dark navy | Inverse surface |

**Photography treatment:** Product photography с **soft fog backgrounds** — bottle on misty grey-blue gradient. Lifestyle shots — close-up tactile (skin, water, glass), не lifestyle scenarios. Никаких «smile-models».

## 5. Steals & pitfalls

### Что забираем

1. **Display через weight 300 + uppercase + wide-tracking 0.10em** — для secondary display moments (например, eyebrows секций, статус-теги). Это альтернатива нашему Cormorant italic для cases где italic был бы избыточен.
2. **Long-scroll editorial structure** — наша главная (`index.astro` с 11 секциями) уже это делает. Подтверждение, что мы на верном пути.
3. **Smaller body 14px + wider tracking 0.06em** — рассмотреть для secondary text (captions, footnotes), где плотность нужна.
4. **Italic across all weights** — если Golos Text не имеет full italic-mat, рассмотреть подключение Inter (есть полная italic linguistic support включая cyrillic).

### Что НЕ годится

- ❌ **Pure white page bg** — у нас cream `#FFFDF8`, не сдаём.
- ❌ **Body 14px на 1440** — для русского текста и mature audience оставляем 16-18px.
- ❌ **Полностью uppercase H2** — у нас italic Cormorant Roman case как brand-anchor.
- ❌ **Slate-grey ink** (`#3E3E47`) — слишком в blue tone, у нас ink должен быть warmer (после Lanserhof/Aesop calibration → `#1A1F2A` или `#2C2F38`).

### Pitfalls

- La Prairie ОЧЕНЬ depends на heavy product photography (10+ heroов на главной). У нас фотобанка нет. Нужен typographic substitute — full-viewport quote-spreads вместо product-spreads.
- Footer dark navy — рассмотреть, но у нас dark-ink footer должен быть warmer, не корпоративный navy.

## Сводка

La Prairie — **calibration reference** для:
- Light weight (300) как display option;
- Wide tracking (0.06-0.10em) как универсальный premium signal;
- Italic во всех weights как expressivity tool.
