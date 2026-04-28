# Pattern 03 — Doctor Typographic Spread

## Откуда

- **Sturm** — «ABOUT DR. STURM» как large typographic monument; doctor имя как brand-mark, не как portrait grid.
- **Marcus Medical** — single-letter М floats как brand divider; doctor bio = essay.
- **Compass** — «doctor presentation as a quiet portrait-with-essay rather than a card grid», «doctor bio set as a quote-pulled essay with credentials as marginalia».
- **Critically:** у нас сейчас НЕТ профессиональных фото врачей. Этот паттерн **photo-ready, но не photo-dependent**.

## Когда применять

- **`DoctorCardFull.astro`** — карточка одного врача на странице `doctors/[slug].astro`.
- **`DoctorsPreview.astro`** на главной — preview команды.
- **`doctors.astro`** листинг — каждый врач = half-spread, не avatar grid.

## Anti-pattern

❌ **Avatar grid 4-up** с photo + имя + специальность + кнопка (Tier 3 СМ, ИПХиК).
❌ **Single team photo** как один shot (Bellezza — anti-pattern).
❌ **Carousel из avatars** с arrows.
❌ **Photo обязательно** — слот для photo есть, но дизайн работает без него.

## Спецификация

### Базовая half-spread (one doctor on `doctors/[slug].astro`)

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  [Eyebrow: 01 — пластический хирург]             │
│                                                  │
│  ┌──────────────────────────┬─────────────────┐  │
│  │                          │                 │  │
│  │   А.И.                   │  «...quote      │  │
│  │   ИСКОРНЕВ               │   from doctor   │  │
│  │   (Cormorant Italic      │   in italic     │  │
│  │   80-120px monogram)     │   Cormorant     │  │
│  │                          │   24-30px»      │  │
│  │   PORTRAIT SLOT          │                 │  │
│  │   (или текстовая         │  Body essay     │  │
│  │   maquette с initials)   │  3-5 параграфов │  │
│  │                          │  Golos Text     │  │
│  │                          │  18px LH 1.6    │  │
│  └──────────────────────────┴─────────────────┘  │
│                                                  │
│  CREDENTIALS marginalia (uppercase utility):     │
│  · к.м.н., 1989                                  │
│  · ASPS, ISAPS                                   │
│  · РНИМУ им. Пирогова, ординатура 2015          │
│  · 2400+ операций                                │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Tailwind v4 skeleton

```astro
---
const { doctor } = Astro.props;
// doctor: { initials, lastName, firstName, role, photo, quote, essay, credentials, ops }
---

<article class="doctor-spread bg-[--color-cream] py-20 lg:py-32">
  <div class="container max-w-[1280px] mx-auto px-6 lg:px-12">

    <!-- Eyebrow -->
    <p class="text-sm uppercase tracking-[0.20em] text-[--color-ink-secondary] mb-8">
      {doctor.role}
    </p>

    <!-- Two-column main -->
    <div class="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-20">

      <!-- LEFT: Typographic monument or photo -->
      <div class="relative">
        {doctor.photo ? (
          <img src={doctor.photo} alt={doctor.firstName + ' ' + doctor.lastName}
               class="w-full aspect-[3/4] object-cover" />
        ) : (
          <!-- Typographic substitute: large initials + lastname -->
          <div class="w-full aspect-[3/4] flex flex-col justify-center bg-[--color-sand]/40 p-8">
            <span class="font-display italic text-[clamp(4rem,12vw,9rem)] leading-none
                         text-[--color-ink]">
              {doctor.initials}
            </span>
            <span class="font-display italic text-[clamp(2rem,5vw,4rem)] leading-tight
                         text-[--color-ink] mt-4 tracking-tight">
              {doctor.lastName}
            </span>
          </div>
        )}
      </div>

      <!-- RIGHT: quote + essay + credentials -->
      <div class="flex flex-col gap-10">

        <!-- Pulled quote -->
        <blockquote class="font-display italic text-[clamp(1.5rem,2.5vw,2rem)]
                            leading-[1.3] text-[--color-ink] border-l-2 border-[--color-champagne] pl-6">
          «{doctor.quote}»
        </blockquote>

        <!-- Essay body -->
        <div class="prose-essay font-body text-base lg:text-lg leading-[1.65] text-[--color-ink-secondary]
                    max-w-[560px]">
          <Fragment set:html={doctor.essay} />
        </div>

        <!-- Credentials marginalia -->
        <ul class="list-none mt-4 space-y-2 border-t border-[--color-border-soft] pt-6">
          {doctor.credentials.map(c => (
            <li class="font-body text-sm uppercase tracking-[0.10em] text-[--color-ink-muted]">
              · {c}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</article>
```

### `DoctorsPreview.astro` на главной

Compact variant: 3-4 врача показаны как **vertical typographic stack** (без photo), на full-bleed cream surface:

```
ВРАЧИ КЛИНИКИ

01 — А.И. ИСКОРНЕВ      пластический хирург, к.м.н.
02 — Р.Г. ГАРАЕВ        пластический хирург
03 — М.А. МАМЕДОВ       пластический хирург
...

[Узнать о команде →]
```

В Aesop/Sisley editorial-list-стиле, но для doctors.

### Initials как monogram (если photo нет)

```css
.doctor-monogram {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(4rem, 12vw, 9rem);
  line-height: 1;
  color: var(--color-ink);
  letter-spacing: -0.02em;
}
```

Это **визуальная маркировка** доктора. Когда photo появится — initials заменяются на фото в том же контейнере.

## Привязка к прототипу

| Файл | Текущая реализация | Действие |
|---|---|---|
| `src/components/DoctorCardFull.astro` | card layout | **переписать** как half-spread |
| `src/components/DoctorCardBrief.astro` | mini-card | заменить на typographic-row stack |
| `src/components/DoctorsPreview.astro` | mini-cards 3-up | переписать как editorial stack (Pattern 02 variant) |
| `src/pages/doctors/[slug].astro` | renders DoctorCardFull | использовать new pattern |
| `src/pages/doctors.astro` | listing | заменить grid на vertical stack |
| `src/data/doctors.ts` | check fields | добавить поля: `quote`, `essay`, `initials` если нет |

## Verification

- [ ] При отсутствии photo страница doctor выглядит **monumentally** (большие инициалы как brand-mark).
- [ ] При наличии photo тот же контейнер занимается фото без layout-shift.
- [ ] Quote выделена italic Cormorant с champagne left-border.
- [ ] Credentials в utility-face caps в нижней marginalia.
- [ ] Listing страница doctors **не grid 4-up** — vertical typographic stack.
- [ ] Не похоже на 4-up avatar grid Tier 3.
