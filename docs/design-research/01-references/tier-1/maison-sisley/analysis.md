# Maison Sisley — Deep Dive

**URL:** https://www.sisley-paris.com/en-INT/maison-sisley/
**Captured:** 2026-04-27, 1440×900 / 1024×768 / 375×812
**Compass-rating:** 5/5 — premium beauty house tone applied to treatment services

---

## 1. Tonal read

Maison Sisley — это **«concept page»**, не «catalog page». Главная страница Sisley.com — обычный e-commerce, но `/maison-sisley/` это отдельный мини-сайт о beauty-institute концепции. **Pageheight 3545px** — это вдвое короче типичного e-com home (~7000-10000px). Один hero, одно interior photo, два параграфа, location selector. И всё.

Три решения:
1. **Hero как architectural shot, не лицо** — interior of Sisley salon (golden globe lights, ottoman, art wall). Подтверждение compass-наблюдения.
2. **Brand wordmark MAISON sisley** поднят как central monument над hero — это logo + wordmark играют роль H1, не текстовый title.
3. **Roboto Thin 50px H1** — выбор Thin (weight 100-200 area) для editorial display. Похоже на La Prairie's weight 300 strategy, но ещё легче.

**Применимость:** Maison Sisley — **прямой образец** для нашей About-страницы или philosophy-блока. Их «hero=interior, monument=wordmark, paragraph 1=brand statement, paragraph 2=longer description, location selector» — это готовая формула для нашего «О клинике».

## 2. Layout & rhythm

| Параметр | Значение |
|---|---|
| Viewport reference | 1440px |
| Page scroll-height | **3545px** — короткая, focused |
| Sections | hero + brand monument + paragraph 1 + interior photo + paragraph 2 + locations CTA + newsletter + footer |
| Approach | linear, vertical, single-column-centric |

**Секционная структура:**
1. **Header** (search bar + nav + login)
2. **Hero band**: full-width interior photograph (~600px высота). На неё накладывается central white card-monument (~620px wide) с MAISON SISLEY wordmark + первый параграф brand statement.
3. **Interior photo**: внутри центрального monument-blocка — большое interior фото золотых globe-lights и арт-комнаты. Это photo-INSIDE-monument, не behind-monument. Креативный приём.
4. **Body paragraph**: 2-3 строки centered, max-width ~600-700px.
5. **Section "Our exceptional locations"** — uppercase eyebrow «INSTITUTES AND STORES», H2 «Our exceptional locations», dropdown «Choose a country».
6. **Newsletter dark band**: dark surface, white text, subscribe form.
7. **Footer**: light grey surface, 4-col link grid.

**Asymmetry/centered:** ВСЕ centered. Это исключение из правила «break the centered axis» — но работает здесь, потому что **content is sparse и monument-like**, не narrative.

## 3. Typography

| Role | Family | Size | Weight | LH | Tracking | Case |
|---|---|---|---|---|---|---|
| H1 | Roboto **Thin** | 50px | 400 | 58px (1.16) | normal | none |
| H2 | Roboto Medium | 14px | 400 | 20px (1.43) | normal | none |
| H3 / eyebrow | Roboto Medium | 14px | 500 | 26px (1.86) | 1px (0.07em) | UPPERCASE |
| Body | Roboto Light | 16px | 400 | 24px (1.50) | normal | none |
| Link | Roboto Light | 12px | 400 | 19.2px (1.60) | normal | none |
| Button | Roboto Bold | 12px | 400 | 12px (1.0) | 1px (0.083em) | UPPERCASE |

**Ключевые наблюдения:**
- **H1 50px Thin** — drama через size, не через weight. Минималистический подход.
- **H2 как eyebrow** — снова семантический trick: H2 семантически, но визуально — small label. Уже видели у Sturm и La Prairie.
- **Eyebrow LH 1.86** — это много для small text, что даёт «engraved metal» feel.
- **Available Playfair Display, but НЕ используется на странице** — есть подгрузка, но не применена. Sisley держит maison-page на чистом Roboto.

**Conclusion для нас:** Sisley — менее интересный Type reference, чем Sturm/Bader. **Ho structurally** — это эталон для нашей `about.astro` и `concept/index.astro`.

## 4. Color & material

| Color | Hex | Role |
|---|---|---|
| white | #FFFFFF | Page bg |
| black | #000000 | Ink |
| dark navy/grey | ~#1A1A1A | Newsletter dark surface |
| light grey | ~#F4F4F4 | Footer surface |

Очень small palette — **black и white only** plus два neutral greys. Sisley полностью отказывается от тёплых тонов на этой странице. Это противоположно Aesop/Bader.

## 5. Steals & pitfalls

### Что забираем

1. **Hero=architectural shot pattern** — для нашего about, philosophy, concept-страниц. Используем interior shots клиники (если будут) или architectural photo как заместитель portrait.
2. **Central monument card на full-bleed photo** — pattern: photo full-bleed, поверх в центре white/cream card с brand-statement. Очень элегантный move для нашей `about.astro`.
3. **Photo INSIDE monument** — креативный приём: вместо фото-под-card делать фото-внутри-card. Создаёт «illuminated manuscript» feel.
4. **Linear simple structure для focused pages** — наш `concept/index.astro` (отдельная concept-страница) должен быть так же short, focused, monument-driven, не списком функций.
5. **Location selector dropdown** — для нашей `contacts.astro` или footer locations link можем использовать вместо листинга городов.

### Что НЕ годится

- ❌ **Sans-only Roboto** — у нас Cormorant italic + Golos Text стек.
- ❌ **Pure white + black** — у нас cream + warm-ink.
- ❌ **Слишком короткая страница** — наша главная не должна быть 3545px. Концепт-страница может, главная — нет.
- ❌ **Centered axis всё** — у нас asymmetric break нужно сохранить для главной.

### Pitfalls

- Maison Sisley — это **отдельная sub-site** внутри Sisley.com. Не тот же tone что и main Sisley homepage. Мы должны хорошо понимать, какие страницы у нас будут «monument-like» (about, concept), а какие «editorial-spreads» (главная, услуги).

## Сводка

Maison Sisley = **paradigm для our About и Concept-страниц**: short, focused, architectural hero, monument card, paragraph х2, location selector. На главной — НЕ использовать. Главная — Bader-like multi-spread editorial.
