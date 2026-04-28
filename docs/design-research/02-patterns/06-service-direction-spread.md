# Pattern 06 — Service Direction Spread (01/02/03)

## Откуда

- **Compass synthesis** — «three full-viewport editorial spreads, each numbered (01 / 02 / 03) with a small uppercase utility label pinned left. Each spread carries one display-scale italic Cormorant phrase, a single paragraph of brand-voice prose, and a hairline-ruled index of the relevant procedures».
- **Bader** — large numbered editorial blocks (Science of TFC8 spread, Clinical Evidence 1-2-3).
- **Sturm** — Concerns matrix как direction-driven entry.

Этот pattern — **главная замена** для текущего ServicesGrid.astro (3 равные карточки).

## Когда применять

- **`index.astro`** на главной — три направления (Пластика, Косметология, Космецевтика) как три full-viewport spread'а.
- Может также применяться на `concept/index.astro`.

## Anti-pattern

❌ **3 равные карточки grid** с photo + title + body + CTA — это generic «service grid» (Tier 3 СМ, ИПХиК).
❌ **Service direction = section** в обычной paragraph-форме — слишком плоско, нет hierarchy.
❌ **Numbered list 1-2-3** в маленьком font — должны быть monumental.
❌ **Все три направления в одной странице scroll'a** одинаковой длины — одно может быть на dark inverse, другое на cream, третье ещё иначе.

## Спецификация

### Структура одного direction-spread

Каждый — **отдельная section, занимающая ≥80% viewport height** (но не 100vh — content driven):

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│  01 — Хирургия                       (eyebrow utility) │
│                                                        │
│       Архитектура                    (Cormorant Italic │
│       лица.                           60-100px)        │
│                                                        │
│       ─────                                            │
│                                                        │
│       Hands of three surgeons                          │
│       trained at ASPS-accredited                       │
│       institutions. 27 operations                      │
│       supported.                                       │
│       (lead Golos Text 24-28px)                        │
│                                                        │
│  ┌──────────────────────────────────────────────┐      │
│  │ БЛЕФАРОПЛАСТИКА          90 мин   от 120K   │      │
│  │ ─────────────────────────────────────────    │      │
│  │ ПЛАСТИКА НОСА           120 мин   от 180K   │      │
│  │ ─────────────────────────────────────────    │      │
│  │ ...                                          │      │
│  │ (procedures editorial list — Pattern 02)     │      │
│  └──────────────────────────────────────────────┘      │
│                                                        │
│       [→ Все операции]                                 │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Tailwind v4 skeleton

```astro
---
const directions = [
  {
    num: '01',
    label: 'Хирургия',
    headline: ['Архитектура', 'лица'],
    lead: 'Команда хирургов с ASPS/ISAPS-аккредитацией. 27 операций — от блефаропластики до полной abdominoplasty.',
    procedures: [...top4Procedures],
    href: '/plastika',
    surface: 'cream', // 'cream' | 'sand' | 'ink'
  },
  {
    num: '02',
    label: 'Косметология',
    headline: ['Тонкая', 'настройка'],
    lead: 'Аппаратные процедуры, инъекции, программы реабилитации. Без излишеств.',
    procedures: [...top4Cosm],
    href: '/kosmetologiya',
    surface: 'sand',
  },
  {
    num: '03',
    label: 'Космецевтика',
    headline: ['Уход за', 'результатом'],
    lead: 'Аптечная косметика клиники. Поддержание состояния после процедур.',
    procedures: [...top4Cosmec],
    href: '/kosmecevtika',
    surface: 'ink', // dark inverse
  },
];
---

<div class="service-directions">
  {directions.map(dir => (
    <section class={`direction-spread direction-${dir.surface} py-24 lg:py-40`}>
      <div class="container max-w-[1280px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[80px_1fr] gap-8 lg:gap-16">

        <!-- Left rail: number -->
        <div class="rail">
          <span class="font-mono text-sm uppercase tracking-[0.20em] text-current/60">
            {dir.num}
          </span>
        </div>

        <!-- Right: headline + lead + procedures + CTA -->
        <div class="content max-w-[780px]">

          <!-- Eyebrow -->
          <p class="text-sm uppercase tracking-[0.20em] text-current/60 mb-6">
            {dir.label}
          </p>

          <!-- Display Cormorant -->
          <h2 class="font-display italic text-[clamp(3rem,7vw,6rem)] leading-[1.05] tracking-[-0.01em] mb-12">
            {dir.headline[0]}<br/>
            <em class="not-italic font-display">{dir.headline[1]}.</em>
          </h2>

          <!-- Lead -->
          <p class="font-body text-current/85 text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.5] mb-16 max-w-[600px]">
            {dir.lead}
          </p>

          <!-- Procedures editorial mini-list (Pattern 02 compact variant) -->
          <ul class="proc-mini-list border-t border-current/15">
            {dir.procedures.map(p => (
              <li class="border-b border-current/15 py-4 lg:py-5 grid grid-cols-[1fr_auto] gap-x-6 items-baseline">
                <span class="font-display italic text-lg lg:text-xl leading-tight">
                  {p.name}
                </span>
                <span class="text-sm uppercase tracking-wide text-current/60 tabular-nums">
                  от {p.priceFrom}
                </span>
              </li>
            ))}
          </ul>

          <!-- CTA -->
          <a href={dir.href} class="inline-block mt-12 text-link italic">
            → Все операции направления
          </a>
        </div>
      </div>
    </section>
  ))}
</div>

<style>
  .direction-cream { background: var(--color-cream); color: var(--color-ink); }
  .direction-sand { background: var(--color-sand); color: var(--color-ink); }
  .direction-ink { background: var(--color-ink); color: var(--color-cream); }
</style>
```

### Surface rotation

3 направления чередуют surface для **rhythm**:
- **01 Хирургия** — cream (light, opening)
- **02 Косметология** — sand (mid-tone alt, transition)
- **03 Космецевтика** — ink (dark inverse, closing direction)

Это создаёт «direction-by-direction crescendo». Compass-rule «sections should dominate or disappear» соблюдается через color-shift.

### Mobile (375)

На mobile:
- Number rail скрывается, number входит как inline eyebrow рядом с label («01 — Хирургия»).
- Headline уменьшается до clamp 36-48px.
- Procedures list compact 2 lines per item (name above, price below).
- Padding vertical 80-120px.

## Привязка к прототипу

| Файл | Текущая реализация | Действие |
|---|---|---|
| `src/components/ServicesGrid.astro` | 3 равные карточки | **полностью заменить** на 3 direction-spread |
| `src/components/sections/Procedures.astro` | сетка | use Pattern 02 для отдельной страницы; не на главной |
| `src/data/plastika.ts`, `kosmetologiya.ts`, `kosmecevtika.ts` | check | подобрать top-4 процедуры для каждого направления |

## Verification

- [ ] 3 секции, каждая ≥80vh.
- [ ] Numbers (01/02/03) в utility-face caps.
- [ ] Display headlines italic Cormorant clamp 48-100px.
- [ ] Surface чередование: cream → sand → ink.
- [ ] Каждая секция содержит mini-procedures list (4-5 топ-операций).
- [ ] CTA italic underlined link, не filled button.
- [ ] Не похоже на Tier 3 service-grid.
