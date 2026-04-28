# Design Research — Навигационная карта

Результат глубокого аудита 26 дизайн-референсов: 8 Tier 1, 7 Tier 2, 5 Tier 3 анти-паттернов. Подготовлено для пересборки визуального языка Платиненталь с сохранением структуры страниц и текстов.

---

## С чего начать

| Нужно | Читать |
|---|---|
| Понять общее направление | [00-synthesis-v2.md](00-synthesis-v2.md) |
| Конкретный компонент → что делать | [04-prototype-mapping.md](04-prototype-mapping.md) |
| CSS-сниппет для паттерна | [02-patterns/](02-patterns/) |
| Реальные hex-значения токенов | [03-tokens-distilled/colors.md](03-tokens-distilled/colors.md) |
| GSAP анимации с кодом | [05-gsap-animations.md](05-gsap-animations.md) |
| Deep dive по конкретному референсу | [01-references/tier-1/](01-references/tier-1/) |

---

## Структура

```
docs/design-research/
├── README.md                          ← вы здесь
├── 00-synthesis-v2.md                 ← обновлённое направление + все финальные значения
├── 01-references/
│   ├── tier-1/                        ← deep dive, 8 сайтов (скриншоты + analysis + tokens)
│   │   ├── lanserhof/
│   │   ├── aesop/
│   │   ├── byredo/
│   │   ├── la-prairie/
│   │   ├── augustinus-bader/
│   │   ├── dr-sturm/
│   │   ├── maison-sisley/
│   │   └── bellezza/
│   ├── tier-2/                        ← быстрые конспекты
│   │   ├── the-row.md
│   │   ├── aman.md
│   │   ├── polene.md
│   │   ├── marcus-medical.md
│   │   ├── garth-fisher.md
│   │   ├── skinfinity.md              ← недоступен, задокументирован
│   │   └── plastie.md
│   └── tier-3-anti-patterns/
│       └── анализ.md                  ← что у конкурентов общего и чего избегать
├── 02-patterns/                       ← reusable паттерны с HTML/CSS/Tailwind кодом
│   ├── README.md
│   ├── 01-hero-asymmetric.md
│   ├── 02-procedures-editorial-list.md
│   ├── 03-doctor-typographic-spread.md
│   ├── 04-sticky-section-labels.md
│   ├── 05-quote-fullbleed.md
│   ├── 06-service-direction-spread.md
│   ├── 07-cormorant-typography-rules.md
│   └── 08-section-rhythm-whitespace.md
├── 03-tokens-distilled/               ← выжимка из замеров 8 Tier 1 сайтов
│   ├── colors.md
│   ├── typography.md
│   ├── spacing-rhythm.md
│   └── motion.md
├── 04-prototype-mapping.md            ← каждый компонент → проблема → паттерн → действие
└── 05-gsap-animations.md             ← GSAP паттерны с кодом (Lenis, SplitText, ScrollTrigger)
```

---

## Tier 1 — Ключевые находки

| Сайт | Главная находка |
|---|---|
| **Lanserhof** | eyebrow tracking **0.20em** (gold standard), type-only, 0 иконок |
| **Aesop** | cream `#FFFEF2`, lead-параграф **32px** (крупнее H1!), micro body 12px |
| **Byredo** | single-screen cover, 1365px total height, pure commitment to restraint |
| **La Prairie** | weight 300 Light как primary для display, italic 100–700 range |
| **Augustinus Bader** | numbered evidence lists, dark/light rhythm, founder B&W portrait |
| **Dr. Sturm** | «ABOUT DR. STURM» как монумент, filterable concerns matrix |
| **Maison Sisley** | monument-card pattern, 3545px total page, архитектурный interior hero |
| **Bellezza** | Playfair Display + Futura = **кириллица validated**, magenta = анти-паттерн |

---

## Pattern Library — индекс

| Pattern | Применение в прототипе |
|---|---|
| [01 Hero Asymmetric](02-patterns/01-hero-asymmetric.md) | `Hero.astro` |
| [02 Editorial List](02-patterns/02-procedures-editorial-list.md) | `Procedures.astro`, `plastika.astro`, `prices.astro` |
| [03 Doctor Typographic](02-patterns/03-doctor-typographic-spread.md) | `doctors.astro`, `doctors/[slug].astro` |
| [04 Sticky Labels](02-patterns/04-sticky-section-labels.md) | `prices.astro`, длинные страницы |
| [05 Quote Full-Bleed](02-patterns/05-quote-fullbleed.md) | `QuoteBridge.astro`, `FinalCTA.astro` |
| [06 Service Spreads](02-patterns/06-service-direction-spread.md) | `ServicesGrid.astro` |
| [07 Cormorant Rules](02-patterns/07-cormorant-typography-rules.md) | все страницы |
| [08 Section Rhythm](02-patterns/08-section-rhythm-whitespace.md) | все страницы |

---

## GSAP Animation Budget

7 паттернов с готовым кодом в [05-gsap-animations.md](05-gsap-animations.md):

| Priority | Pattern | Complexity |
|---|---|---|
| 1 | Nav scroll transition (transparent → cream) | ★☆☆ |
| 2 | Section fade reveal (.scroll-fade) | ★☆☆ |
| 3 | SplitText line reveal (H1 Cormorant) | ★★☆ |
| 4 | Clip-path image reveal (shutter up) | ★★☆ |
| 5 | Procedure list stagger | ★☆☆ |
| 6 | Quote bridge scrub (scroll-tied opacity) | ★★☆ |
| 7 | Hero orchestrated timeline | ★★★ |

---

## Финальные токены (quick reference)

```css
--color-cream:           #FFFEF2   /* primary bg */
--color-sand:            #F5F0EB   /* alt sections */
--color-ink:             #1A1F2A   /* primary text (was #0A0A0A) */
--color-champagne:       #C4A882   /* accent */
--color-surface-inverse: #1A1F2A   /* dark sections */
--tracking-eyebrow:      0.20em    /* SIGNATURE */
--gap-small:  clamp(3rem,  8vh, 5rem)      /* 48-80px */
--gap-medium: clamp(6rem, 14vh, 10rem)     /* 96-160px */
--gap-deep:   clamp(10rem, 22vh, 17.5rem)  /* 160-280px */
```

---

## Связь с другими документами

| Документ | Статус | Отношение |
|---|---|---|
| `docs/design-direction.md` | **действующий** | Synthesis v2 уточняет и дополняет |
| `DESIGN.md` | **действующий** | глобальные правила, этот раздел — глубже |
| `src/styles/tokens.css` | **требует обновления** | применить значения из 03-tokens-distilled/ |
| `design-system/platinental/MASTER.md` | **DEPRECATED** | устаревшая киберпанк-палитра, игнорировать |
