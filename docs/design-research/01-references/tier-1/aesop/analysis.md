# Aesop — Deep Dive

**URL:** https://www.aesop.com/
**Captured:** 2026-04-27, 1440×900 / 1024×768 / 375×812
**Compass-rating:** 5/5 — структурный модельный референс для text-heavy minimalism

---

## 1. Tonal read

Aesop читается **как издательский каталог апотекаря XIX века**. Cream page bg `#FFFEF2` (самый тёплый из всех Tier 1 рефов), плотная сетка product-карточек после full-bleed cinematic hero, и масса пустого пространства между секциями. Отличие от Lanserhof — Aesop **продаёт продукт**, поэтому есть e-commerce primitives (cards, prices, add-to-cart). Но они поданы как editorial spreads, не как catalog grid.

Три решения:
1. **Cream-on-ink-grey, не cream-on-black** — body color #333333 (soft warm dark grey), не pure black. На креме это даёт «typewriter-on-paper» feel, не «design system on cream».
2. **Триплетная типографическая иерархия** — большой H1 (36px), очень крупный lead-параграф (32px), и **micro 12px** body. Промежуточные размеры почти отсутствуют. Контраст между уровнями огромный.
3. **Полное отсутствие shadows / rounded corners заметных размеров** — границы карточек hairline, разделение через cream alt-shade `#F6F5E8`.

**Применимость для Платиненталь:** Aesop = эталон того, как **продавать (космецевтика!) без e-commerce-визуала**. Их product-карточки максимально близки к нашему будущему `kosmecevtika`-каталогу.

## 2. Layout & rhythm

| Параметр | Значение |
|---|---|
| Viewport reference | 1440px |
| Section width | fluid 100% (нет фиксированного container max) |
| Hero overlay padding | ~24-40px |
| Product card grid | 3-up на 1440 desktop, 2-up на 1024, 1-up на 375 |
| Product card aspect | photo ~3:4, тонкая hairline граница, без shadow |

**Подход к layout:**
- Aesop **не использует** глобальный `--container-max`. Каждый section управляет своей шириной и padding'ом. Это даёт **content-driven layout** — где-то узкая editorial column (`~620px центр`), где-то grid full-bleed.
- Section transitions: чередование `#FFFEF2` (default cream) и `#F6F5E8` (alt cream). Иногда вкрапления `#000` (dark editorial spreads).

**Asymmetric / centered:** mixed. Hero centered overlay. Product cards = grid centered. Editorial split-spreads (text+image) = asymmetric. Aesop **не догматичен** в одной манере.

## 3. Typography

| Role | Family | Size (1440) | LH | Tracking | Case |
|---|---|---|---|---|---|
| H1 | Suisse Int'l | 36px | 50.4px (1.40) | normal | none |
| H2 | Suisse Int'l | 30px | 39.9px (1.33) | normal | none |
| Lead paragraph | Work Sans | 32px | 51.2px (1.60) | normal | none |
| Eyebrow / H3 | Suisse Int'l | 15.84px | 22.18px (1.40) | 1px | UPPERCASE, weight 700 |
| Body | Suisse Int'l | 12px | normal | normal | none |
| Logo wordmark | Zapf-Humanist (~Optima) | varies | — | — | sentence |

**Ключевые наблюдения:**
- **Без serif'а в макете**. Только Optima-clone в логотипе — это работает потому, что Optima сама по себе — humanist sans с serif-feel пропорциями. Сигнал «intelligent restraint» без действительно serif декорации.
- **H1 36px, LH 1.40** — на cream это «book-spread» feeling, не «hero billboard». Очень тихий H1.
- **Lead 32px Work Sans** — это парадокс: lead больше H1 «по визуальному импакту», и LH 1.60 даёт ему «article-quote» качество. На фоне 12px body этот lead становится центральным элементом.
- **Body 12px** — экстремально мелко по нашим меркам. Рискованный приём, работает потому что Aesop's audience — design-literate, и SuisseIntl рендерится на retina идеально.

**Conclusion для нас:** Aesop модель типографики применима частично — **наша Cormorant italic заменяет их Optima в задачах brand-feel**, но **их principle of triple-tier hierarchy (display/lead/micro) и крупный lead-параграф 28-32px** — это то, чего у нас в прототипе сейчас НЕТ. Промежуточный H2-уровень в прототипе слишком близок к H1, надо разделить через крупный lead.

## 4. Color & material

| Color | Hex | Role |
|---|---|---|
| `#FFFEF2` | rgb(255, 254, 242) | Page bg — warmest cream |
| `#F6F5E8` | rgb(246, 245, 232) | Alt section bg (also warm cream tone) |
| `#333333` | rgb(51, 51, 51) | Ink — soft dark grey |
| `#CA432F` | rgb(202, 67, 47) | Accent red — used SPARINGLY (sale tags, limited badges) |
| `#000000` | rgb(0, 0, 0) | Dark editorial overlays (hero, panel inverts) |

**Сравнение с нашими токенами:**
| Платиненталь | Aesop | Дельта |
|---|---|---|
| `--color-cream: #FFFDF8` | `#FFFEF2` | +6 на жёлтый канал, теплее |
| `--color-ink: #0A0A0A` | `#333333` | мы на 6 stops холоднее/жёстче |
| `--color-champagne: #C4A882` | `#CA432F` (red, иной семейство) | разные стратегии accent |

**Photography treatment:** mixed. Часть — full-bleed dark cinematic (model + product), часть — clean studio shots на тёплых фонах с растениями. Никаких «smile-portrait» стоков.

## 5. Steals & pitfalls

### Что забираем

1. **Cream calibration** — рассмотреть калибровку нашего `#FFFDF8` в сторону Aesop's `#FFFEF2` (теплее на ~1 stop). Не критично, но даст более premium feel.
2. **Soft-warm ink `#1A1F2A` или `#2C2F38`** вместо `#0A0A0A` — это уже флаг от Lanserhof'а тоже. Подтверждается.
3. **Triple-tier hierarchy** — display (60-80px H1) / **lead (28-32px)** / micro (12-14px utility). Сейчас в прототипе lead-уровень слабо выражен.
4. **Product/service cards без shadow, hairline border 1px** — для `kosmecevtika.ts` каталога, для service-cards если оставим.
5. **Cream alt-section bg (`#F6F5E8`)** — у нас уже есть `--color-sand: #F5F0EB`, очень близко. Подтверждение.
6. **Lead-параграф крупный (28-32px), отдельный font (Work Sans / у нас Golos Text Display)** — для формирующего sub-text на каждой странице.

### Что НЕ годится

- ❌ **Без serif в макете** — у нас Cormorant italic как brand-anchor, не отказываемся.
- ❌ **Body 12px** — слишком мелко для русского текста и audience 35-55 лет. Держим 16-18px.
- ❌ **Red accent** — заменяем на наш champagne `#C4A882`.
- ❌ **Sparse navigation top bar** с микро-текстом — слишком austere, у нас навигация должна быть чуть friendlier.

### Pitfalls

- Aesop's content-driven layout (где каждая секция своей ширины) **сложнее в коде**, чем глобальный container. Решение: всё-таки иметь глобальный `--container-max` (~1280px), но позволять отдельным секциям делать `full-bleed` через утилиту.
- Aesop не имеет doctor-cards и service-procedure lists. Для этих компонентов смотрим Sturm и Sisley.
