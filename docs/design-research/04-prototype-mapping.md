# Prototype Mapping — что менять в каждом компоненте

Главный документ перехода. Для каждого компонента / страницы прототипа: **текущая реализация → проблема → новый pattern → конкретное действие**.

При пересборке UI пользователь сохраняет:
- **Маршруты** (`src/pages/*.astro` — все 12 страниц).
- **Контент** (тексты, имена, цены, описания — всё хардкодом в .astro и в `src/data/*.ts`).
- **Дизайн-токены палитры** (с калибровкой по `03-tokens-distilled/colors.md`).

Меняется **визуальный язык компонентов**.

---

## Главная (`src/pages/index.astro`)

11 секций. Каждая получает action:

### 1. Hero (`src/components/Hero.astro` + `HeroA/B/C/D.astro`)

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| centered text+CTA, image-led | generic centered template | Pattern 01 | **переписать** — asymmetric two-column, italic Cormorant H1 в left 55%, photo right 45% |

- Удалить `HeroA.astro`, `HeroB.astro`, `HeroC.astro`, `HeroD.astro` (тестовые варианты).
- `Hero.astro` стать единственным.
- Photo slot заполняем architectural shot (interior клиники, материалы) или typographic substitute если фото нет.

### 2. ServicesGrid (`src/components/ServicesGrid.astro`)

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| 3 равные карточки | equal-weight cards (compass anti-pattern) | **Pattern 06** | **полностью заменить** на 3 direction-spread |

- 01 Хирургия (cream surface) → 02 Косметология (sand) → 03 Космецевтика (ink dark inverse).
- Каждый — full-viewport (~80vh).
- Display headline italic Cormorant 60-100px.
- Mini-procedures list внутри (Pattern 02 compact).
- Surface rotation cream/sand/ink.

### 3. Principles (`src/components/sections/Principles.astro`)

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| neutral block of items | undefined | Pattern 04 + 08 | **переработать** как numbered editorial 1-2-3 на dark inverse spread (Bader's «The Science of TFC8» model) |

Принципы: «Без excess» / «Без trends» / «На десятилетия» — большие numbered headings + body. На dark surface для contrast.

### 4. Procedures (`src/components/sections/Procedures.astro`)

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| сетка карточек | card grid | **Pattern 02** | **полностью переписать** как editorial list с hairline-rules |

На главной — preview top-10 операций; полный list (27) на `plastika.astro`.

### 5. QuoteBridge (`src/components/sections/QuoteBridge.astro`)

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| inverted dark с quote в колонке | в colonne | **Pattern 05** | **расширить** до full-bleed type, italic Cormorant 80-100px clamp |

Quote text почти касается viewport edges. Author + title в utility-face caps.

### 6. AboutNumbers (`src/components/sections/AboutNumbers.astro` если есть, иначе пропускаем)

Number-стат-strip (40+ операций / 25+ лет / 10+ хирургов). **Удалить** если в данный момент содержит «1000+ операций» или подобное generic. **Заменить** на text-only manifesto (Maison Sisley pattern) или встроить в ServicesDirections.

### 7. DoctorsPreview (`src/components/sections/DoctorsPreview.astro`)

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| mini-cards 3-up с avatars | grid avatar с CTAs (Tier 3) | **Pattern 03** | **переписать** как vertical typographic stack без avatar — initials как mini-monogram |

```
ХИРУРГИ КЛИНИКИ

01 — А.И. ИСКОРНЕВ      пластический хирург, к.м.н.
02 — Р.Г. ГАРАЕВ        пластический хирург
03 — М.А. МАМЕДОВ       пластический хирург

[→ Все врачи команды]
```

### 8. BeforeAfter (`src/components/sections/BeforeAfter.astro`)

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| TBD | до/после галерея | Pattern 08 (rhythm) | **сохранить single слайдер** (compass: «No before/after grids beyond the single hero slider»). Положить под Procedures как **second hero** moment |

Не grid из множества. Один слайдер with handle.

### 9. Reviews (`src/components/sections/Reviews.astro`)

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| TBD reviews carousel | conventional | Pattern 02 + 08 | **переработать** как text-only quote stack с author + date marginalia |

Без stars. Без photo автора. Только text quote + name + date.

### 10. ConsultationValue (`src/components/sections/ConsultationValue.astro`)

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| TBD | callout ценности консультации | Pattern 06 variant | **оформить** как compact direction-spread — italic headline + 3 bullet points в editorial |

### 11. FinalCTA (`src/components/sections/FinalCTA.astro`)

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| TBD | call-to-action | Pattern 05 + 08 | **переработать** на dark inverse surface — italic headline «Запишитесь на консультацию» + form prelude |

### 12. FAQ (`src/components/sections/FAQ.astro`)

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| accordion | OK | минимальная корректировка | **сохранить** accordion, но: hairline rules между rows, hover italic→roman (Pattern 02 hover), open state — italic body внутри |

### 13. Contacts (`src/components/sections/Contacts.astro`)

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| address + map + form | basic | Pattern 08 | **переработать**: address в italic Cormorant editorial-style, не как corporate listing. Map — minimal styling (greyscale если возможно). Form — Pattern 02 hairline-fields. |

---

## Внутренние страницы

### `src/pages/plastika.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| Hero + 27 procedures + doctors | TBD | Pattern 01 (compact hero) + Pattern 02 (full editorial list) | **переписать**: page-hero 60vh + длинный editorial list 27 операций по Pattern 02. Doctor preview снизу (Pattern 03 stack). |

### `src/pages/kosmetologiya.astro`

Аналогично Plastika, но procedures меньше. **Pattern 01 + Pattern 02**.

### `src/pages/kosmecevtika.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| products grid | catalog feel | Pattern 02 + Byredo single-product-per-viewport для individual product pages | **mini-catalog по pattern 02 на главной странице раздела**, individual product cards использовать Aesop-стиль hairline borders (`tier-1/aesop` analysis) |

### `src/pages/doctors.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| listing grid | avatar grid (Tier 3) | **Pattern 03** | **переписать** как vertical typographic stack — каждый врач занимает 1/2 viewport height с monogram + role + click-to-bio |

### `src/pages/doctors/[slug].astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| individual doctor page | TBD | **Pattern 03** | **полная half-spread**: monogram (or photo) left + quote + essay + credentials marginalia right |

### `src/pages/prices.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| pricing table | tabs | Pattern 02 | **переписать** как editorial-list с группировкой по разделам (через sticky labels Pattern 04) |

### `src/pages/about.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| about content | TBD | Maison Sisley pattern | **переработать** как short focused brand page — architectural hero, monument-card brand-statement, 2 paragraphs body |

### `src/pages/contacts.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| contacts info + map | basic | Pattern 08 + minimal | **rework**: contacts editorial-listing, map minimal greyscale, form clean fields |

### `src/pages/documents.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| documents page | basic | Pattern 02 simplified | **просто editorial list документов** с hairline rules + download icons |

### `src/pages/concept/index.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| concept landing | TBD | Maison Sisley + Aman | **переработать** как short focused page — architectural shot hero, monument card, 2 quotes, locations selector style |

### `src/pages/404.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| basic 404 | minimal | Patterns 05 + 08 | **переработать**: full-viewport italic Cormorant «Эта страница ускользнула от нас.» + back-to-home text-link |

---

## Глобальные компоненты

### `src/components/Navigation.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| top nav | TBD | Bader / Aesop minimal | **simplify**: logo center, 5 links left, 1-2 utility right. Transparent over hero, solid cream after scroll. Mobile — full-screen overlay menu (не hamburger drawer). |

### `src/components/Footer.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| dense links | possibly Tier 3-style | Pattern 08 | **переписать**: dark inverse surface (warm dark `#1A1F2A`), 3-4 columns sparse links + contacts + soc, не более. Без duplicate navigation. Lanserhof-style. |

### `src/components/Container.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| basic wrapper | OK | Pattern 08 | **расширить** с variants: `narrow`, `default`, `wide`, `bleed` — per spacing-rhythm.md |

### `src/components/SectionHeader.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| eyebrow + h2 wrapper | OK | Pattern 07 | **calibrate**: eyebrow tracking 0.20em, H2 italic Cormorant. |

### `src/components/Button.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| TBD | varies | Bader CTA + Pattern 01 | **переработать**: primary = champagne filled solid, italic-link-style secondary. Никаких rounded corners > 4px. Никаких shadows. |

### `src/components/cards/DoctorCardBrief.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| brief card | avatar grid item | Pattern 03 | **заменить** на typographic-row компонент (для DoctorsPreview stack) |

### `src/components/cards/DoctorCardFull.astro`

| Текущее | Проблема | Pattern | Действие |
|---|---|---|---|
| full doctor card | varies | **Pattern 03** | **полностью переписать** под half-spread |

---

## Концептуальные компоненты (изолированы)

### `src/components/concept/*.astro`

ConceptHero, ConceptServices, ConceptDoctors, ConceptCTA, ConceptProcedures, ConceptQuote — это **отдельная страница `concept/index.astro`**, которая пока используется как тест.

**Действие:**
- ConceptHero → объединить с Hero.astro (один pattern).
- ConceptServices → проверить, что он использует Pattern 06.
- ConceptDoctors → Pattern 03 stack.
- ConceptQuote → Pattern 05.
- ConceptCTA → Pattern 05 (closing).
- ConceptProcedures → Pattern 02.

После согласования — concept-страница может быть **отдельной brand-narrative**, но компоненты должны переиспользоваться с главной.

---

## Шаги реализации (high-level)

1. **Обновить `src/styles/tokens.css`** per `03-tokens-distilled/*.md` (palette + type + spacing + motion).
2. **Перебросить data** при необходимости (`src/data/doctors.ts` add `quote`, `essay`, `initials`).
3. **Реализовать patterns** один за другим в порядке impact:
   - Pattern 06 (ServicesGrid replacement) — **highest impact**.
   - Pattern 01 (Hero) — first impression.
   - Pattern 02 (Procedures editorial list) — кардинальный change для plastika/kosmetologiya.
   - Pattern 03 (Doctors) — second-impression after hero.
   - Pattern 05 (Quote-bridge full-bleed) — emotional anchor.
   - Pattern 08 (Spacing rhythm) — глобальный effect.
   - Pattern 04 (Sticky labels) — polish.
   - Pattern 07 (Cormorant rules) — везде применяется.
4. **Audit Tier 3 anti-patterns** — после каждой страницы прогон через design-reviewer agent с prompt: «Проверь, не выглядит ли это как СМ-Пластика / Форма».
5. **Visual regression** через Playwright screenshots на 1440 / 1024 / 375 для каждой страницы.

## Verification global

- [ ] Каждая страница из 12 (включая 404 и concept) переработана хотя бы по 1 pattern.
- [ ] `tokens.css` обновлён, новые tokens применены.
- [ ] design-reviewer agent дал зелёный свет.
- [ ] Не осталось 3-card grids.
- [ ] Не осталось avatar-grids.
- [ ] Не осталось saturated accents (red/magenta/teal/orange).
- [ ] Не осталось stats strips «1000+ операций».
- [ ] Не осталось procedural photography (как у Tier 3).
- [ ] Cormorant Italic применён только для display, не для body.
- [ ] Spacing rhythm — three-tier (small/medium/deep) применён.
