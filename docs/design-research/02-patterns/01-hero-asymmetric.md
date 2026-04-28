# Pattern 01 — Hero Asymmetric Two-Column

## Откуда

- **Bader** — split: product image left ~50%, brand-statement right.
- **Sturm** — text-left UPPERCASE H1 + body + 2 CTAs; product images right.
- **EWM Aesthetics Clinic** (compass) — H1 60-70% width upper-left; supporting paragraph + CTA bottom-right.
- **Lanserhof** — image full-bleed, текст в узкой колонке (~512px) anchored bottom-left.
- **Plastie** — text + CTA left, photo doctor right.

Универсальный паттерн в 5 из 8 Tier 1 рефов.

## Когда применять

- **Главная страница** (`Hero.astro`) — first viewport.
- **Service-pages** (`plastika.astro`, `kosmetologiya.astro`) — page-hero (300-400px).
- **About** (`about.astro`) — variant с architectural shot вместо product.
- **Concept** — variant с monument-card overlay (Maison Sisley pattern).

## Anti-pattern

❌ **Centered H1 над centered subtitle над центрированной CTA** — это generic «template hero» (Tier 3 СМ-Пластика).
❌ **H1 + image overlap** где photo — backdrop под текст. Photo должна быть **side**, не behind.
❌ **2-3 CTAs одинакового веса в hero** — должен быть один primary + один text-link secondary.

## Спецификация

### Геометрия (1440 desktop)

```
┌──────────────────────────────────────────────────┐
│  HEADER (transparent over hero)                   │
├─────────────────────────┬────────────────────────┤
│                         │                        │
│  [Eyebrow utility]      │                        │
│                         │                        │
│  H1 italic Cormorant    │     [PHOTO / Asset]    │
│  large, 2-3 lines       │     full-bleed right   │
│  (max 60-65% width)     │     ~50-55% viewport   │
│                         │                        │
│  ─── (60-100px gap)     │                        │
│                         │                        │
│  Lead 24-28px Golos     │                        │
│  Text 2-3 строки        │                        │
│                         │                        │
│  [CTA primary]          │                        │
│  Secondary text-link    │                        │
│                         │                        │
└─────────────────────────┴────────────────────────┘
```

- Container: `max-width: 1280px` outer; secchnap: `padding: 0 64px` desktop / 24px mobile.
- Text column: `flex-basis: 55%` desktop / `100%` mobile.
- Image column: `flex-basis: 45%` desktop / image **above** text on mobile.
- Vertical anchor: `align-items: end` desktop (text bottom-aligned), `start` mobile.

### Tailwind v4 skeleton

```astro
<section class="hero relative bg-[--color-cream] overflow-hidden">
  <div class="container max-w-[1280px] mx-auto px-6 lg:px-16 py-16 lg:py-24
              grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-12
              min-h-[80vh] lg:items-end">

    <!-- Left text column -->
    <div class="flex flex-col gap-8 lg:gap-12 max-w-[640px]">
      <!-- Eyebrow -->
      <p class="text-overline uppercase tracking-[0.20em] text-[--color-ink-secondary] text-sm">
        Платиненталь · Казань
      </p>

      <!-- H1 italic Cormorant -->
      <h1 class="font-display italic font-normal text-[--color-ink]
                 text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.01em]">
        Интеллигентная гармонизация
        <em class="not-italic font-display">внешности</em>
      </h1>

      <!-- Lead -->
      <p class="font-body text-[--color-ink] text-[clamp(1.125rem,1.6vw,1.5rem)] leading-[1.5] max-w-[520px]">
        Премиальная клиника пластической хирургии и косметологии в Казани.
        Без excess, без trends, на десятилетия.
      </p>

      <!-- CTAs -->
      <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <a href="#consultation" class="btn-primary">Записаться</a>
        <a href="#services" class="text-link italic">Узнать подробнее →</a>
      </div>
    </div>

    <!-- Right photo column (or substitute) -->
    <div class="relative aspect-[3/4] lg:aspect-auto lg:min-h-[600px]">
      <img src="/hero-architectural.jpg"
           alt="Интерьер клиники Платиненталь"
           class="absolute inset-0 w-full h-full object-cover" />
    </div>
  </div>
</section>
```

### Поведение

- **Hover на CTA primary** — фон darkens 10%, без translate.
- **Scroll** — header transitions от transparent к solid white-cream после ~80px scroll.
- **Mobile** — image выше text, full-width, aspect-ratio 3:4. Text column полная ширина.

### Substitute если фото нет

Когда image-asset недоступен:
1. **Architectural shot** — interior клиники на cream surface.
2. **Material close-up** — soft fabric, marble, cream surface texture (Track C из design-direction.md).
3. **Typographic monument** — большая italic Cormorant фраза (заменяет image, как у The Row).

## Привязка к прототипу

| Файл | Текущая реализация | Действие |
|---|---|---|
| `src/components/Hero.astro` | centered text+CTA | **переписать** под этот pattern |
| `src/components/HeroA.astro` ... `HeroD.astro` | A/B-варианты | удалить или сохранить только лучший в рабочих версиях |
| `src/pages/plastika.astro` page-hero | TBD | использовать pattern с `min-h: 60vh` (compact variant) |
| `src/pages/about.astro` | TBD | использовать с architectural shot |

## Verification

После реализации:
- [ ] Screenshot 1440 показывает асимметричное распределение text/image (55/45 или 60/40).
- [ ] Screenshot 375 показывает image выше text, full-width photo.
- [ ] H1 italic Cormorant с tight leading (1.05).
- [ ] Один primary CTA + один secondary text-link.
- [ ] Eyebrow uppercase + wide tracking 0.18-0.22em.
- [ ] Не похоже на Tier 3 hero (СМ/Форма/ИПХиК).
