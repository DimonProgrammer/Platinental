# Pattern 04 — Sticky Section Labels (Left-Rail)

## Откуда

- **Lanserhof** — small uppercase eyebrow pinned to upper left while content scrolls.
- **Bader** — subtle scroll-spy label на длинных editorial pages.
- **La Prairie** — section markers в gutter.
- **Compass** — «one-word or two-word section labels (e.g., "01 — Surgery", "02 — Cosmetology") pinned left; labels updated via scroll-spy as section enters viewport».

## Когда применять

- **`index.astro`** на главной — label «01 / 02 / 03» по мере scroll'а через 11 секций.
- **Длинные внутренние страницы** (`plastika.astro`, `about.astro`) — label по разделу.
- **`prices.astro`** — текущий блок.

**Не применять** для коротких страниц (< 3 виртуальных страниц).

## Anti-pattern

❌ **Sticky top nav** с full-width chrome — это generic «back to top» pattern, не editorial.
❌ **Floating progress bar** — слишком utility.
❌ **Labels с CTA** внутри — должны быть pure markers, не interactive.

## Спецификация

### Геометрия

```
┌────────────────────────────────────────────────┐
│                                                │
│  01 — ВРАЧИ                                    │
│       ─────────────────                        │
│                              [Section content] │
│                                                │
│       (Label sticks here while section scrolls)│
│                                                │
└────────────────────────────────────────────────┘
```

- Label position: `sticky` top: 24px (или после header height + 24px).
- Label width: ~140px column в left rail.
- Label appears only on lg breakpoint (≥1024px). На mobile — section eyebrow внутри content.
- Update via IntersectionObserver: когда section входит в viewport, label switches.

### CSS

```css
.section-rail {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 48px;
  padding: 0 64px;
  max-width: 1440px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .section-rail {
    grid-template-columns: 1fr;
    padding: 0 24px;
  }
}

.rail-label {
  position: sticky;
  top: 100px; /* below header */
  align-self: start;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0.20em;
  text-transform: uppercase;
  color: var(--color-ink-secondary);
  height: fit-content;
}

@media (max-width: 1024px) {
  .rail-label {
    position: static;
    margin-bottom: 16px;
  }
}
```

### Astro skeleton

```astro
<!-- index.astro главная -->
<main class="main">
  <Hero />

  <section id="services" class="section-rail">
    <div class="rail-label">01 — Направления</div>
    <div class="rail-content">
      <ServicesGrid />
    </div>
  </section>

  <section id="principles" class="section-rail">
    <div class="rail-label">02 — Принципы</div>
    <div class="rail-content">
      <Principles />
    </div>
  </section>

  <section id="procedures" class="section-rail">
    <div class="rail-label">03 — Каталог операций</div>
    <div class="rail-content">
      <Procedures />
    </div>
  </section>

  <!-- ...etc -->
</main>
```

### IntersectionObserver alternative (single floating label)

Вместо per-section sticky можно один floating label, который меняет text по scroll-spy:

```astro
<aside class="floating-rail">
  <span id="rail-label" class="rail-label">01 — НАПРАВЛЕНИЯ</span>
</aside>

<script>
  const sections = document.querySelectorAll('section[id]');
  const label = document.getElementById('rail-label');
  const labels = {
    services: '01 — Направления',
    principles: '02 — Принципы',
    procedures: '03 — Каталог операций',
    doctors: '04 — Врачи',
    quote: '05 — Философия',
    reviews: '06 — Отзывы',
    consultation: '07 — Консультация',
    faq: '08 — FAQ',
    contacts: '09 — Контакты'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        if (labels[id]) label.textContent = labels[id];
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));
</script>

<style>
  .floating-rail {
    position: fixed;
    top: 50%;
    left: 24px;
    transform: translateY(-50%);
    z-index: 10;
    pointer-events: none;
  }
  @media (max-width: 1024px) {
    .floating-rail { display: none; }
  }
</style>
```

Floating variant elegantly решает: один markers, всегда видим, обновляется на scroll. **Рекомендуем floating** для главной.

## Привязка к прототипу

| Файл | Действие |
|---|---|
| `src/layouts/Layout.astro` | добавить slot для floating-rail (опционально) |
| `src/pages/index.astro` | добавить ID каждой секции + единый floating-rail |
| `src/pages/plastika.astro` | per-section sticky labels (длинная страница) |

## Verification

- [ ] На desktop ≥1024px виден label слева.
- [ ] Label обновляется при scroll'е через секции.
- [ ] На mobile label не показан (или внутри content).
- [ ] Не interferes с CTA кнопками или WhatsApp floating button.
- [ ] Subtle, не отвлекает.
