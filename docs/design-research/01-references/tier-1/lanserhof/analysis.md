# Lanserhof — Deep Dive

**URL:** https://lanserhof.com/en/
**Captured:** 2026-04-27, 1440×900 / 1024×768 / 375×812
**Compass-rating:** 5/5 — closest brand-tonal cousin in actual medical-spa segment

---

## 1. Tonal read

Сайт читается **как архитектурный буклет санатория**, а не как медицинский. Главная встречает full-bleed cinematic shot (женщина у окна, глубокая тень, тёплый dim light), и поверх в узкой колонке — короткий positioning «World's Best Longevity Clinic», поданный как типографический artifact, а не как marketing claim. Никакой трёхкарточной сетки услуг, никаких иконок процедур.

Три решения, которые создают это ощущение:
1. **Дисциплина одной шрифтовой семьи** — везде Frutiger (humanist sans), никаких Garamond/serif. Premium достигается *precision-tracking* и uppercase, а не drama-italic.
2. **Узкая колонка текста на широком viewport** — hero-контент max-width 512px при viewport 1440 (около 35%). Огромное «дышащее» поле слева/справа.
3. **Чередование белых и dim-серых секций** — has-white-bg / has-grey-bg как ритм. Никаких contained карточек или shadows; разделение секций через bg-color, а не через chrome.

**Применимость к Платиненталь:** показывает альтернативный путь к premium — без italic Cormorant, через humanist sans + wide-tracked eyebrow + узкие text-блоки на широких viewports. Не противоречит нашей стратегии (Cormorant остаётся), но даёт understanding, что *spacing и tracking* делают больше работы, чем выбор семейства.

## 2. Layout & rhythm

| Параметр | Значение | Замечания |
|---|---|---|
| Viewport reference | 1440px | `body.offsetWidth = 1440` |
| Section horizontal padding | **64px** | На 1440 это ≈ 4.4% |
| Container inner max | 1312px | = 1440 − 128 (gutter) |
| Container inner padding | 16px | дополнительно к section padding |
| **Hero text max-width** | **512px** | КРИТИЧНО — узкая колонка на широком vp |
| Mobile padding (375) | падает до ~16-24px | стандартно |
| Section gap | varies, ~120-160px desktop | визуально оценено |

**Asymmetric / centered:** text-align: start (left). Hero-контент anchored bottom-left, image full-bleed. Это **не** centered hero. Pattern полностью совпадает с compass-рекомендацией «break the centered axis».

**Section transitions:** через bg-color (`has-white-bg` ↔ `has-grey-bg`). Ни одного visible divider или ruler. Просто color step.

**Вертикальный ритм:** 8px baseline просматривается (16, 24, 64). Spacing между секциями — большие, 120-160px на desktop, ужимается до 60-80px на 375.

## 3. Typography

| Role | Family | Size (1440) | LH | Tracking | Case | Style |
|---|---|---|---|---|---|---|
| H1 | Frutiger | 52.8px | 56px (1.06) | 1.6px (0.030em) | UPPERCASE | normal |
| H2 | Frutiger | 36px | 44px (1.22) | 1.6px (0.044em) | none | normal |
| Body | Frutiger | 18.4px | 24px (1.30) | normal | none | normal |
| Eyebrow link | Frutiger Bold | 14px | 14px (1.00) | 2.8px (**0.20em**) | UPPERCASE | normal |
| Lead caption | Frutiger | 14px | 20px (1.43) | normal | none | normal |

**Ключевые наблюдения:**
- **Только одна семья** — Frutiger. Bold выделяется через подключение `Frutiger Bold` файла, weight остаётся 400. Это редкий приём: семья «Light/Regular/Bold» подаются как разные fontFamily, а не через font-weight.
- **Tracking растёт с уменьшением размера**. H1 — 1.6px (subtle), H2 — 1.6px (заметнее в относительных), eyebrow — 2.8px (очень widely-tracked, signature move). Обратная классической CSS-логике, где large display tracks tighter.
- **H1 line-height 1.06** — почти solid, как и предсказывает compass для editorial display.
- **H1 uppercase** — это лансерхофский шов, который принципиально *альтернативен* Cormorant italic. Создаёт «холодный premium».

**Conclusion для нас:** Cormorant italic остаётся. Но **wide-tracked uppercase Frutiger-style eyebrow (0.18-0.22em letter-spacing)** забираем как универсальный utility face. Уже частично есть в `tokens.css`, но spacing нужно увеличить.

## 4. Color & material

**Палитра (с пипетки + computed):**

| Color | Hex | Role |
|---|---|---|
| `#2C2F38` | rgb(44, 47, 56) | Ink — primary text. Не #000, не #0A0A0A, тёплый dark blue-grey. |
| `#FFFFFF` | rgb(255, 255, 255) | Page bg |
| `#F7F7F7` | rgb(247, 247, 247) | Alt section bg (warm grey) |
| `rgba(44, 47, 56, 0.3)` | — | Image overlays / shadows |

**Photography treatment:** full-bleed cinematic. Тёплое, low-key (deep shadows, golden window-light). Большая часть фото — **архитектура и атмосфера**, не лица крупным планом. Когда лица — они *повёрнуты к свету*, мы видим спину или профиль, не frontal smile. Это compass-наблюдение «imagery weighted toward architecture and atmosphere» — подтверждено.

**Ink-on-cream contrast:** их `#2C2F38` на `#FFFFFF` даёт ratio ≈ **13.4:1** (WCAG AAA с большим запасом). Наш текущий `#0A0A0A` на `#FFFDF8` ≈ 19.8:1 — мы более жёсткие. Имеет смысл подвинуть наш ink ближе к `#1A1F2A` для тёплости.

## 5. Steals & pitfalls

### Что забираем (привязка к компонентам прототипа)

1. **Hero pattern с узкой текстовой колонкой (~512-560px) на full-bleed image** — для `Hero.astro`. H1 anchored bottom-left, image занимает всю ширину viewport.
2. **Eyebrow utility face: wide-tracked uppercase 14px, letter-spacing 0.20em** — для всех section labels во всех компонентах. Сейчас в tokens.css есть `--text-overline`, но tracking стоит увеличить до 0.18-0.22em.
3. **Section transition через bg-color чередование** (cream / warm-grey), без shadows/dividers — для главной (`index.astro`), все секции должны просто отбивать bg.
4. **Footer на dark surface (`#2C2F38`)** с простой grid из ссылок — `Footer.astro`. Без аккорда, без лого-зоны хвоста.
5. **Ink #1A1F2A (потеплеть)** — рассмотреть калибровку `--color-ink` в нашем tokens.css в сторону тёплого dark.

### Что НЕ годится для нас

- ❌ **Полная замена Cormorant на Frutiger** — Lanserhof держит немецкую longevity-эстетику через humanist sans. Платиненталь — пластика/эстетика, женская audience, нам нужна warmer-italic-drama Cormorant.
- ❌ **Uppercase H1** — слишком cold и corporate для нашей audience. Italic Cormorant с tight leading даст ту же editorial-confidence, но warmer.
- ❌ **Зависимость от cinematic landscape photography** — у Платиненталь не будет таких архитектурных шотов на этапе запуска. Нужен **typographic substitute** — full-viewport quote-spreads вместо image-spreads.
- ❌ **Cookie banner на 1/3 viewport** — назойливо, у нас не должно быть.

### Pitfalls

- Lanserhof работает на огромных enterprise-масштабах (3 локации, longevity-conferences). Мы не должны перенимать их **информационную плотность нижнего колонтитула** — там много бизнес-направлений.
- Их PromoBox slider (компактные тёмные карточки с прайсингом «from 6.965 EUR p.P») — это transactional pattern, который нам менее нужен. У нас прайс не скрывается за слайдером.
