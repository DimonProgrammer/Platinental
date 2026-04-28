# Synthesis v2 — Дизайн-стратегия Платиненталь

Обновлённая стратегия на основе глубокого изучения 8 Tier 1 референсов, 7 Tier 2, Tier 3 анти-паттернов, и дистилляции токенов. Дополняет и местами заменяет `docs/design-direction.md`.

> **Формула:** Lanserhof × Aesop × Augustinus Bader — с поправкой на русскоязычную аудиторию 35–55, кириллицу и казанский премиум-рынок.

---

## 1. Где мы находимся на рынке

**Нейтральная территория:** ни один российский сайт пластической клиники не работает в aesthetic-territory cream + champagne + editorial italic serif. Это и есть наша возможность.

| Конкурент | Palette | Type | Motion | Tier |
|---|---|---|---|---|
| СМ-Пластика | белый + magenta `#A03075` | bold sans | карусели, pop-ups | 3 |
| ИПХиК | белый + teal | bold sans | auto-rotate | 3 |
| Форма | белый + orange `#F37027` | bold sans | scroll-reveal everywhere | 3 |
| **Платиненталь** | cream + champagne | Cormorant italic + Golos | rare, slow | **1** |

Ни один из конкурентов не использует:
- тёплый cream фон как primary surface
- editorial italic serif для display
- champagne как акцент (вместо тёмного золота или magenta)
- три-уровневый секционный ритм whitespace
- hairline-rules вместо карточек

**Вывод:** мы не догоняем — мы работаем в другой категории.

---

## 2. Brand Formula

```
Платиненталь = Lanserhof (restraint, type-led) 
             × Aesop (warm cream, editorial body) 
             × Augustinus Bader (evidence-based, numbered proof)
             + Maison Sisley (monument-card brand statement)
             + казанская самоидентичность (не «ещё один филиал»)
```

**Что это означает практически:**

- **Lanserhof:** никаких hero-каруселей. Один заголовок. Один CTA. Прозрачность через restraint.
- **Aesop:** тёплый cream как воздух вокруг контента. Lead-параграф 20-24px — голос, а не функция.
- **Augustinus Bader:** numbered manifesto «01 / 02 / 03» вместо bullets. Principle = evidence, не marketing.
- **Maison Sisley:** один короткий brand-statement в центре страницы О клинике — типографический монумент.

---

## 3. Palette — финальная

```css
:root {
  /* Surfaces */
  --color-cream:   #FFFEF2;   /* primary bg — warm cream (Aesop territory) */
  --color-sand:    #F5F0EB;   /* alt section bg */
  --color-ink:     #1A1F2A;   /* primary text — warm dark (not pure #000) */
  --color-white:   #FFFFFF;   /* product cards only */
  --color-surface-inverse: #1A1F2A; /* = ink — для dark секций */

  /* Ink tones */
  --color-ink-secondary: #4A4F5C;  /* secondary text */
  --color-ink-muted:     #8A8E96;  /* placeholders, captions */

  /* Accent */
  --color-champagne:      #C4A882;  /* CTA, accents */
  --color-champagne-soft: #DECCB0;  /* hover, soft borders */
  --color-champagne-deep: #A88B66;  /* active state */

  /* Borders */
  --color-border-subtle: #E8E2D6;
  --color-border-soft:   #D6CFC4;
}
```

**Правила применения:**

- Cream → Sand → Ink — ротация поверхностей по секциям. Никогда два Ink подряд.
- Champagne — только на CTA, ссылках, и акцентах. Никаких champagne backgrounds.
- Никаких red, magenta, teal, orange. Никаких saturated акцентов.
- Inverse (Ink bg) → только 2-3 секции на странице: QuoteBridge + Footer. Не более.

**Откалиброванный ink `#1A1F2A` vs текущий `#0A0A0A`:**
- `#0A0A0A` — too cold, too hard, contrast ratio 19.8:1 (over-strong)
- `#1A1F2A` — warm dark, 16.4:1 с cream (всё равно AAA), ближе к европейскому premium

---

## 4. Typography — финальная шкала

```css
:root {
  /* Display (Cormorant Garamond Italic ONLY) */
  --text-display: clamp(3rem, 7vw, 6rem);       /* ServicesGrid directions, 48-96px */
  --text-h1:      clamp(2.5rem, 6vw, 5rem);     /* hero H1, 40-80px */
  --text-h2:      clamp(2rem, 4vw, 3.5rem);     /* section H2, 32-56px */

  /* Sans (Golos Text) */
  --text-h3:      clamp(1.25rem, 1.8vw, 1.75rem); /* sub-headers, 20-28px */
  --text-lead:    clamp(1.25rem, 1.6vw, 1.5rem);  /* lead para, 20-24px — NEW */
  --text-body:    clamp(1rem, 1.1vw, 1.125rem);    /* body, 16-18px */
  --text-small:   0.875rem;                        /* 14px */

  /* Utility */
  --text-eyebrow: clamp(0.75rem, 0.9vw, 0.875rem); /* 12-14px CAPS */
  --text-caption: 0.75rem;

  /* Leading */
  --leading-display: 1.05;
  --leading-h2:      1.10;
  --leading-h3:      1.30;
  --leading-lead:    1.50;
  --leading-body:    1.65;  /* generous для кириллицы */

  /* Tracking */
  --tracking-display:  -0.005em;
  --tracking-h2:        0;
  --tracking-body:      0.005em;   /* +0.005em для cyrillic clarity */
  --tracking-eyebrow:   0.20em;   /* SIGNATURE — 5/8 Tier 1 сайтов */
}
```

**Cormorant Garamond — правила применения:**

1. **ТОЛЬКО italic** (font-style: italic). Roman Cormorant — не используем.
2. **ТОЛЬКО display** (H1, H2, display) — никогда для body, lead, eyebrow.
3. **ТОЛЬКО ≥ 28px** — ниже 28px italic Cormorant некрасив в кириллице.
4. **leading 1.05–1.10** — tight как у европейских editorial сайтов.
5. **+0.01em tracking** для кириллицы — compensate за увеличенные кегли букв.
6. **font-weight: 400** — Regular. Никогда 700 (Bold Italic = CIS conventional).

**Golos Text — правила:**

- body: 400 (Regular)
- eyebrow/utility: 400, uppercase, 0.20em tracking
- lead: 400, или 300 Light на dark surface для элегантности
- Никогда 700 на основных текстах (только eyebrow buttons если нужно)

---

## 5. Spacing & Rhythm

```css
:root {
  /* Containers */
  --container-narrow:  45rem;       /* 720px — monument cards */
  --container-default: 68.75rem;   /* 1100px — editorial content */
  --container-wide:    80rem;       /* 1280px — hero, direction spreads */
  --container-bleed:   100%;
  --gutter-x: clamp(1.5rem, 4vw, 4rem);  /* 24-64px */

  /* Three-tier section rhythm */
  --gap-small:  clamp(3rem, 8vh, 5rem);       /* 48-80px — между связанными блоками */
  --gap-medium: clamp(6rem, 14vh, 10rem);      /* 96-160px — между секциями */
  --gap-deep:   clamp(10rem, 22vh, 17.5rem);  /* 160-280px — direction transitions */

  /* Element gaps */
  --gap-eyebrow-to-h1:    clamp(1rem, 2vw, 2rem);
  --gap-h1-to-lead:       clamp(1.5rem, 2.5vw, 3rem);
  --gap-h2-to-body:       clamp(2rem, 3vw, 3rem);
  --gap-content-to-cta:   clamp(2rem, 4vw, 4rem);

  /* Component */
  --hero-text-max:    clamp(20rem, 40vw, 40rem);  /* 320-640px — text column */
  --row-procedure-py: clamp(1rem, 1.5vw, 1.75rem);
  --card-padding:     clamp(1.25rem, 2vw, 2rem);
}
```

**Ритм поверхностей (surface rotation schedule):**

```
cream   → ServicesGrid (spread 01)
sand    → ServicesGrid (spread 02)
ink     → ServicesGrid (spread 03) + QuoteBridge
cream   → Procedures + DoctorsPreview
sand    → Reviews или ConsultationValue
ink     → Footer
```

---

## 6. Motion — финальные правила

**Vocabulary (редкий, медленный, сдержанный):**

| Элемент | Animation | Duration | Easing |
|---|---|---|---|
| Hero H1 SplitText | lines yPercent 105→0 + stagger | 1.2-1.4s | power3.out |
| Section enter | opacity 0→1 + translateY 24→0 | 0.8s | cubic-bezier(0.22,1,0.36,1) |
| Image clip-path reveal | inset(100%→0%) | 1.2s | power3.out |
| Quote bridge | opacity 0.15→1 scrub | scroll-tied | none (scrub) |
| Procedure list items | opacity 0→1 + y 12→0 stagger | 0.6s + 0.04s stagger | power2.out |
| Nav scroll | bg transparent→cream | 0.3s | ease-out |
| CTA hover | bg-color darken | 0.24s | ease-out |
| Procedure hover | font-style italic→normal | 0.2s | ease-out |

**Запрещено (не обсуждается):**

- scale на cards hover
- translateY на cards hover
- box-shadow на hover
- parallax images
- auto-rotate carousel
- page transitions (View Transitions Astro — OK только если opacity-only)
- cursor decorations / mouse-trail
- scroll-snap full-viewport
- bounce / spring / elastic easings

---

## 7. Компонентные паттерны — сводка

### Hero (Pattern 01)
- 55/45 grid: text left, photo right
- H1 italic Cormorant clamp(2.5rem, 6vw, 5rem), tight leading 1.05
- Text column max-width: clamp(20rem, 40vw, 40rem)
- Photo: architectural shot клиники или typographic substitute
- SplitText line reveal при загрузке, clip-path reveal на photo одновременно

### Services (Pattern 06)
- Три секции ~80vh каждая
- Surface rotation: cream / sand / ink
- Numbered 01 / 02 / 03 eyebrow
- Display headline italic Cormorant clamp(3rem, 7vw, 6rem)
- Mini-procedures list внутри (Pattern 02 compact)
- Stagger reveal при входе в viewport

### Procedures (Pattern 02)
- Indexed editorial list с hairline rules
- Имя процедуры: italic Cormorant 24px
- Meta (время / категория): eyebrow sans 12px
- Hover: italic → roman на имени
- Не карточки, не grid

### Doctors (Pattern 03)
- Vertical typographic stack
- Initials как монограмма (36px italic Cormorant) ← photo-ready (принимает фото без layout shift)
- Имя: italic Cormorant 28-36px
- Специальность: eyebrow sans
- Individual page: half-spread, quote + essay + credentials marginalia

### Quote Bridge (Pattern 05)
- Full-bleed dark surface #1A1F2A
- Italic Cormorant clamp(2rem, 5.5vw, 5rem)
- Текст почти касается viewport edges (container: bleed или wide)
- Scroll-tied opacity reveal (scrub)
- Author + title в utility caps champagne цвет

### Navigation
- Logo center, 5 links left, 1-2 utility right
- Transparent over hero → solid cream after scroll (0.3s ease-out)
- Mobile: full-screen overlay (не hamburger drawer)

### Footer
- Dark inverse surface #1A1F2A
- 3-4 sparse columns
- Generous padding: clamp(4rem, 8vw, 6rem)
- Без duplicate navigation

---

## 8. Секционный стек главной страницы

```
1. Hero          [cream]    Pattern 01 — asymmetric 55/45
2. ServicesGrid  [cream→sand→ink] Pattern 06 — 3×80vh spreads
3. Principles    [ink]      Pattern 04+08 — numbered editorial 1-2-3
4. Procedures    [cream]    Pattern 02 — editorial list top-10
5. QuoteBridge   [ink]      Pattern 05 — full-bleed italic
6. DoctorsPreview [sand]   Pattern 03 — typographic stack
7. BeforeAfter   [cream]    Pattern 08 — single slider
8. Reviews       [cream]    Pattern 02+08 — text-only quote stack
9. ConsultationValue [sand] Pattern 06 variant — compact
10. FinalCTA     [ink]      Pattern 05+08 — dark italic headline
11. FAQ          [cream]    accordion с hairline rules
12. Contacts     [cream]    editorial listing, map minimal
```

---

## 9. Что изменилось vs design-direction.md

`docs/design-direction.md` остаётся действующим документом. Synthesis v2 уточняет и добавляет:

| Тема | design-direction.md | Synthesis v2 |
|---|---|---|
| Ink color | #0A0A0A | **→ #1A1F2A** (warm dark, calibrated) |
| Cream color | #FFFDF8 | **→ #FFFEF2** (1 stop warmer, Aesop level) |
| Eyebrow tracking | не указано точно | **→ 0.20em** (confirmed 5/8 Tier 1 сайтов) |
| Lead paragraph | нет как уровня | **→ clamp(1.25rem, 1.6vw, 1.5rem)** (новый уровень) |
| Section rhythm | нет системы | **→ three-tier: small/medium/deep** |
| ServicesGrid | 3 cards → needs rethink | **→ Pattern 06: 3×80vh spreads** |
| Motion | restraint (общо) | **→ конкретный budget с duration/easing scale** |
| GSAP | упоминается | **→ 7 конкретных паттернов с кодом** |
| Cormorant rules | italic for display | **→ 5 конкретных правил, включая кириллику** |

---

## 10. Принципы нашей дифференциации

**«Архитектурная» эстетика, а не медицинская.**
Белые халаты, смайлы, красные кресты — Tier 3. Мы ближе к Lanserhof: пространство как медицина.

**Типографический монумент вместо иконок.**
Где Tier 3 ставит иконку «✓», мы ставим `01` — большую, italic, Cormorant.

**Молчание как контент.**
Секции разделены не dividers и не иконками — просто воздухом (gap-deep). Пустое пространство = уверенность.

**Редакционный список вместо карточки.**
Список из 27 процедур — не страшный каталог, а содержание журнала. Hairline rules. Italic names. Без thumbnails.

**Монограмма вместо аватара.**
Врач без профессионального фото — не проблема. «АИ» в italic Cormorant 36px — личность, характер. Готов принять фото без перестройки layout.

---

## Verification checklist

Перед деплоем каждой страницы прогнать через design-reviewer agent:

- [ ] Нет 3-card grids
- [ ] Нет avatar-grids  
- [ ] Нет saturated accents (red/magenta/teal/orange)
- [ ] Нет stats strips с круглыми числами («1000+ операций»)
- [ ] Нет procedural photography (хирургические сцены)
- [ ] Cormorant только italic, только ≥28px, только display
- [ ] Eyebrow tracking 0.20em
- [ ] Three-tier section rhythm применён
- [ ] prefers-reduced-motion работает
- [ ] Ink: #1A1F2A, Cream: #FFFEF2
- [ ] Нет box-shadow на hover
- [ ] Нет scale на hover cards
