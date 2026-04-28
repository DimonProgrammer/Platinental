# GSAP Animation Patterns — Платиненталь

Подборка паттернов для премиального editorial-сайта. Стек: **GSAP 3.15 + ScrollTrigger + SplitText + Lenis + Astro 5**.

> **Тональность:** motion = rare, slow, restrained. Если хочется добавить анимацию — уберите её. Premium = restraint. Tier 3 перегружен motion. Мы в Tier 1 territory.

---

## Содержание

| # | Pattern | Применение |
|---|---|---|
| 0 | [Base setup — Lenis + GSAP](#0-base-setup) | Фундамент для всего |
| A | [Section fade reveal](#a-section-fade-reveal) | Каждая секция входит в viewport |
| B | [SplitText line reveal](#b-splittext-line-reveal) | Cormorant display H1/H2 |
| C | [Quote bridge scrub](#c-quote-bridge-scrub) | Full-bleed цитата через scroll-tied opacity |
| D | [Procedure list stagger](#d-procedure-list-stagger) | Editorial list — процедуры, числа |
| E | [Clip-path image reveal](#e-clip-path-image-reveal) | Фото врача, hero-фото |
| F | [Pinned service spread](#f-pinned-service-spread) | ServicesGrid → 3 surface-spread |
| G | [Nav scroll transition](#g-nav-scroll-transition) | Прозрачный → solid cream |

---

## Общие правила

```js
// ✅ Анимируем только transform + opacity (GPU)
gsap.to(el, { y: 0, opacity: 1 })

// ❌ НИКОГДА не анимируем layout-triggering properties
gsap.to(el, { width: '100%', height: '200px', top: '50px' }) // ← НЕЛЬЗЯ

// ✅ Easings — только из нашего набора
const EASE = {
  editorial: 'cubic-bezier(0.22, 1, 0.36, 1)', // hero, quote reveals
  out:       'power3.out',                       // hover, списки
  base:      'power2.out',                       // общие переходы
}

// ❌ НИКОГДА
// bounce, elastic, back — spring-эффекты (Tier 3 signature)
// scale на cards при hover
// translateY(-8px) на hover
// auto-rotate карусель
```

### Durability scale

```js
const DUR = {
  fast:      0.2,   // hover, focus
  base:      0.4,   // UI-transitions  
  slow:      0.8,   // section reveal (translateY + opacity)
  editorial: 1.2,   // SplitText lines, hero appear
  deep:      1.8,   // quote-bridge scrub window
}
```

### prefers-reduced-motion — обязательно

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (prefersReducedMotion) {
  // Показываем всё сразу без анимации
  document.querySelectorAll('.scroll-fade').forEach(el => {
    el.style.opacity = '1'
    el.style.transform = 'none'
  })
  return
}
```

---

## 0. Base Setup

Lenis + GSAP + ScrollTrigger. Ставить один раз глобально.

```js
// src/scripts/animations.js
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

// Lenis — smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

// Sync Lenis с GSAP ticker
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

export { lenis, gsap, ScrollTrigger, SplitText }
```

```astro
<!-- В BaseLayout.astro — один раз -->
<script>
  import '../scripts/animations.js'
</script>
```

### Почему Lenis, не ScrollSmoother

ScrollSmoother — GSAP Club plugin (платный был, сейчас бесплатный). Lenis проще настроить в Astro, меньше конфликтов с Astro View Transitions. Оба варианта дают premium scroll feel.

---

## A. Section Fade Reveal

**Применение:** Каждая секция — Procedures, Doctors, Reviews, ContactsValue, Footer. Едва заметный выезд снизу + fade. Это базовое motion-vocabulary сайта.

**Block structure:**
```html
<!-- Любой <section> или тяжёлый <div> -->
<section class="scroll-fade">
  <div class="container">
    <!-- контент -->
  </div>
</section>
```

**CSS:**
```css
.scroll-fade {
  opacity: 0;
  transform: translateY(24px);
}

/* После срабатывания IntersectionObserver или GSAP */
.scroll-fade.in-view {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .scroll-fade {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

**GSAP вариант (более гибкий, с stagger для дочерних элементов):**
```js
// Инициализировать после DOMContentLoaded
function initSectionFades() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  gsap.utils.toArray('.scroll-fade').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none', // play once, stay
        }
      }
    )
  })
}
```

**Вариант с stagger для группы (например, 3 принципа):**
```js
gsap.from('.principle-item', {
  opacity: 0,
  y: 20,
  duration: 0.8,
  stagger: 0.12, // 120ms между каждым
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.principles-section',
    start: 'top 75%',
  }
})
```

**Sourced from:** Adosa Real Estate animation system, Pell Mell editorial rhythm case study (Codrops 2026), adigital.agency data-reveal pattern.

---

## B. SplitText Line Reveal

**Применение:** Hero H1 (italic Cormorant), секционные H2, QuoteBridge headline. Самый эмоциональный момент появления текста — строка за строкой выезжает снизу из «маски».

> **ВАЖНО:** SplitText с мая 2025 **бесплатный**. Версия GSAP 3.15 (у нас) уже включает обновлённый SplitText с `mask`, `autoSplit`, `onSplit`. Никаких дополнительных лицензий.

**Block structure:**
```html
<h1 class="hero-heading split-lines">
  Интеллигентная гармонизация внешности
</h1>
```

**JS — базовый вариант (строки):**
```js
import { gsap, SplitText, ScrollTrigger } from '../scripts/animations.js'

function initHeadingReveal(selector = '.split-lines') {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll(selector).forEach(el => el.style.opacity = '1')
    return
  }

  // Ждём загрузку кастомных шрифтов (критично для Cormorant)
  document.fonts.ready.then(() => {
    document.querySelectorAll(selector).forEach((el) => {
      gsap.set(el, { opacity: 1 })

      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',     // оборачивает каждую строку overflow: clip
        autoSplit: true,   // пересплитивает при resize
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 105,   // слегка за маску снизу
            duration: 1.2,
            stagger: 0.1,    // 100ms между строками
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          })
        }
      })
    })
  })
}
```

**Hero H1 — без ScrollTrigger (играет при загрузке):**
```js
// Для главного hero — анимация при загрузке страницы, не по скроллу
document.fonts.ready.then(() => {
  gsap.set('.hero-heading', { opacity: 1 })

  SplitText.create('.hero-heading', {
    type: 'lines',
    mask: 'lines',
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: 105,
        duration: 1.4,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3, // небольшой delay после render
      })
    }
  })
})
```

**CSS — обязательно скрыть до загрузки шрифтов:**
```css
.split-lines {
  opacity: 0; /* JS покажет после fonts.ready */
}
```

**Anti-patterns:**
- Не использовать для body text — только display (≥ 28px Cormorant)
- Не разбивать по символам (chars) — слишком быстро мельтешит для editorial
- Не добавлять rotation или scale при reveal — только yPercent + opacity
- `stagger > 0.15` для H1 — уже слишком медленно

**Sourced from:** GSAP SplitText docs (2025, новая версия), jmarellanes serenity GitHub (expo.inOut shutter), Codrops Exat microsite case study.

---

## C. Quote Bridge Scrub

**Применение:** `QuoteBridge.astro` — полноэкранный тёмный spread с большой italic Cormorant цитатой. Текст проявляется через scrub: пользователь «разматывает» цитату прокруткой.

Inspirational reference: Codrops «Some On-Scroll Text Highlight Animations» (апрель 2024), текстовый scrub от Rauno «Blur reveal».

**Block structure:**
```html
<section class="quote-bridge bg-[--color-surface-inverse] py-[--gap-deep]">
  <div class="container max-w-[--container-default] mx-auto px-[--gutter-x]">
    <blockquote class="quote-scrub font-display italic text-[--color-cream]
                        text-[clamp(2rem,5.5vw,5rem)] leading-[1.08]
                        tracking-[-0.01em]">
      «Каждое решение принимается так,<br>
      чтобы через двадцать лет<br>
      вам нравился результат.»
    </blockquote>
    <cite class="mt-12 block text-[--text-eyebrow] tracking-[--tracking-eyebrow]
                  uppercase text-[--color-champagne]">
      Философия клиники
    </cite>
  </div>
</section>
```

**JS — вариант 1: opacity scrub (рекомендуется):**
```js
// Цитата плавно проявляется по мере скролла через секцию
gsap.fromTo('.quote-scrub',
  { opacity: 0.15 },
  {
    opacity: 1,
    ease: 'none', // linear — для scrub всегда none
    scrollTrigger: {
      trigger: '.quote-bridge',
      start: 'top 70%',
      end: 'center 40%',
      scrub: 1.5,  // 1.5s lag — цитата «дышит»
    }
  }
)
```

**JS — вариант 2: слово за словом по scroll (сильнее, но сложнее):**
```js
// Слова последовательно становятся непрозрачными по мере скролла
// Inspired by Codrops "Scroll-based Text Highlight"
document.fonts.ready.then(() => {
  const quote = document.querySelector('.quote-scrub')
  if (!quote) return

  const split = SplitText.create(quote, { type: 'words' })

  gsap.fromTo(split.words,
    { opacity: 0.2 },
    {
      opacity: 1,
      stagger: {
        each: 0.03,
        from: 'start',
      },
      ease: 'none',
      scrollTrigger: {
        trigger: '.quote-bridge',
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 2,
      }
    }
  )
})
```

**Выбор варианта:** Вариант 1 проще и надёжнее. Вариант 2 — если хочется более интерактивного «чтения». Для Platinental — сначала Вариант 1, потом оценить.

**Anti-patterns:**
- Не использовать `translateY` с `scrub` — будет качаться как качели
- Не делать scrub на мобильном без проверки (может лагать)
- Не применять к body text — только к display

---

## D. Procedure List Stagger

**Применение:** `Procedures.astro` (27 операций editorial list), Reviews (text-only стек отзывов), DoctorsPreview (вертикальный стек врачей).

Каждый list-item появляется последовательно при первом скролле к секции. Не повторяет при скролле обратно.

**Block structure:**
```html
<ul class="procedure-list">
  <li class="procedure-item border-t border-[--color-border-subtle]
              py-[--row-procedure-py] flex justify-between items-baseline">
    <span class="procedure-name font-display italic
                  text-[clamp(1.25rem,2vw,1.75rem)] text-[--color-ink]">
      Ринопластика
    </span>
    <span class="procedure-meta text-[--text-eyebrow] tracking-[--tracking-eyebrow]
                  uppercase text-[--color-ink-secondary]">
      от 2 ч
    </span>
  </li>
  <!-- ... -->
</ul>
```

**JS:**
```js
function initProcedureList() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.procedure-item').forEach(el => {
      el.style.opacity = '1'
    })
    return
  }

  // Все items в одной секции появляются вместе, с лёгким stagger
  document.querySelectorAll('.procedure-list').forEach((list) => {
    const items = list.querySelectorAll('.procedure-item')

    gsap.from(items, {
      opacity: 0,
      y: 12,
      duration: 0.6,
      stagger: 0.04, // быстро — не хочется ждать 27 позиций
      ease: 'power2.out',
      scrollTrigger: {
        trigger: list,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    })
  })
}
```

**CSS — hover italic → roman (Pattern 02, без GSAP):**
```css
.procedure-name {
  font-style: italic;
  transition: font-style 0.2s ease-out;
}

.procedure-item:hover .procedure-name {
  font-style: normal;
}

/* Hairline separator reveal */
.procedure-item {
  border-top: 1px solid var(--color-border-subtle);
  transition: border-color 0.2s ease-out;
}

.procedure-item:hover {
  border-top-color: var(--color-champagne-soft);
}
```

**Anti-patterns:**
- `stagger > 0.08` для длинных списков — пользователь ждёт вечность
- translateY > 16px — слишком драматично для текстовых строк
- hover translate/scale на items — Tier 3 signature

---

## E. Clip-Path Image Reveal

**Применение:** Hero фото (правая колонка Pattern 01), фото врача на странице `doctors/[slug].astro`, фото в секции BeforeAfter.

Фото «открывается» снизу вверх, как шторка поднимается. Subtle, не venetian blinds.

**Block structure:**
```html
<div class="image-reveal-wrapper overflow-hidden">
  <img
    src="/hero-photo.jpg"
    class="image-reveal w-full h-full object-cover"
    alt="Интерьер клиники"
  />
</div>
```

**CSS — начальное состояние:**
```css
.image-reveal {
  clip-path: inset(100% 0 0 0); /* скрыт снизу */
  transform: scale(1.05);        /* немного крупнее для parallax-feel при открытии */
  will-change: clip-path, transform;
}
```

**JS:**
```js
function initImageReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.image-reveal').forEach(el => {
      el.style.clipPath = 'inset(0% 0 0 0)'
      el.style.transform = 'scale(1)'
    })
    return
  }

  gsap.utils.toArray('.image-reveal').forEach((img) => {
    gsap.to(img, {
      clipPath: 'inset(0% 0 0 0)',
      scale: 1,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: img.closest('.image-reveal-wrapper'),
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    })
  })
}
```

**Hero — вариант без ScrollTrigger (при загрузке страницы):**
```js
// Hero photo — появляется при загрузке, synced с H1 reveal
const heroTl = gsap.timeline({ delay: 0.1 })

heroTl
  .to('.hero-photo', {
    clipPath: 'inset(0% 0 0 0)',
    scale: 1,
    duration: 1.4,
    ease: 'power3.out',
  })
  .from('.hero-eyebrow', {
    opacity: 0,
    y: 8,
    duration: 0.6,
    ease: 'power2.out',
  }, '-=0.8')
```

**Варианты clip-path reveal:**
```js
// Снизу вверх (рекомендуется для hero)
clipPath: 'inset(100% 0 0 0)' → 'inset(0% 0 0 0)'

// Слева направо (для горизонтальных элементов)
clipPath: 'inset(0 100% 0 0)' → 'inset(0 0% 0 0)'

// Сверху вниз (для quote separators)
clipPath: 'inset(0 0 100% 0)' → 'inset(0 0 0% 0)'
```

**Anti-patterns:**
- venetian blinds / staggered slats — слишком theatrical (Tier 2 territory)
- clip-path на мобильном без will-change — может лагать
- scale > 1.08 → заметно при открытии

**Sourced from:** jmarellanes/gsap serenity «Shutter Reveal» pattern, GSAP forum clip-path discussions, adigital.agency editorial patterns.

---

## F. Pinned Service Spread

**Применение:** `ServicesGrid.astro` — замена 3-card grid на 3 full-viewport spreads (01 Хирургия / 02 Косметология / 03 Космецевтика). Каждый spread занимает ~80vh. Пользователь скроллит, a одна секция «залипает» пока меняется контент.

> **Философский выбор:** Полный pin — драматичнее, но это scroll-snap pattern. Для Platinental рекомендуется **мягкий вариант**: просто три больших секции с поверхностной ротацией (cream/sand/ink), без жёсткого пиннинга. Пиннинг — как опция для будущего.

**Block structure (без пиннинга — рекомендуется):**
```html
<!-- Три секции подряд, каждая ~80vh -->
<section class="service-spread bg-[--color-cream] min-h-[80vh]
                 flex items-center py-[--gap-medium]">
  <div class="container max-w-[--container-wide] mx-auto px-[--gutter-x]">
    <span class="text-[--text-eyebrow] tracking-[--tracking-eyebrow] uppercase
                  text-[--color-ink-secondary] block mb-[--gap-eyebrow-to-h1]">
      01 — Хирургия
    </span>
    <h2 class="font-display italic text-[clamp(3rem,7vw,6rem)]
                leading-[1.05] text-[--color-ink] mb-[--gap-h2-to-body]">
      Пластическая хирургия
    </h2>
    <!-- mini procedure list -->
  </div>
</section>

<section class="service-spread bg-[--color-sand] min-h-[80vh] ...">
  <!-- 02 Косметология -->
</section>

<section class="service-spread bg-[--color-ink] min-h-[80vh] ...">
  <!-- 03 Космецевтика — inverse -->
</section>
```

**JS — анимация при входе в viewport:**
```js
gsap.utils.toArray('.service-spread').forEach((section, i) => {
  // Заголовок появляется
  const heading = section.querySelector('h2')
  const eyebrow = section.querySelector('.eyebrow')
  const list = section.querySelector('.mini-list')

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 65%',
      toggleActions: 'play none none none',
    }
  })

  tl.from(eyebrow, { opacity: 0, y: 8, duration: 0.5, ease: 'power2.out' })
    .from(heading, { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.2')
    .from(list?.children, {
      opacity: 0,
      y: 8,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out',
    }, '-=0.4')
})
```

**Вариант с пиннингом (более драматичный, для будущего):**
```js
// Секция залипает пока контент сменяется
// Реализация: одна .wrapper секция, внутри 3 .slide
const wrapper = document.querySelector('.services-pinned')
const slides = wrapper.querySelectorAll('.service-slide')

gsap.timeline({
  scrollTrigger: {
    trigger: wrapper,
    start: 'top top',
    end: `+=${slides.length * 100}%`,
    pin: true,
    scrub: 1,
  }
}).to(slides, {
  // Здесь логика смены через opacity или clipPath
})
```

**Sourced from:** GSAP ScrollTrigger pinning docs, CodePen pin-image-scrolling-text (lcottingham), GSAP Vault «Scroll Hijack Sections» concept.

---

## G. Nav Scroll Transition

**Применение:** `Navigation.astro` — прозрачный над hero, cream solid после скролла. Pattern реализован через ScrollTrigger или простой IntersectionObserver.

**Block structure:**
```html
<nav id="main-nav" class="nav-transparent fixed top-0 left-0 right-0 z-50
                            py-5 px-[--gutter-x] transition-colors duration-300">
  <!-- logo, links -->
</nav>
```

**CSS:**
```css
#main-nav {
  background-color: transparent;
  transition: background-color 0.3s ease-out,
              box-shadow 0.3s ease-out;
}

#main-nav.scrolled {
  background-color: var(--color-cream);
  /* Без box-shadow — premium не использует shadow на nav */
}
```

**JS — через GSAP ScrollTrigger:**
```js
ScrollTrigger.create({
  start: 'top -80px', // после 80px скролла
  end: 99999,
  onToggle: (self) => {
    document.getElementById('main-nav').classList.toggle('scrolled', self.isActive)
  }
})
```

**JS — лёгкий вариант без GSAP (достаточно для этого эффекта):**
```js
const nav = document.getElementById('main-nav')
let scrolled = false

window.addEventListener('scroll', () => {
  const shouldScrolled = window.scrollY > 80
  if (shouldScrolled !== scrolled) {
    scrolled = shouldScrolled
    nav.classList.toggle('scrolled', scrolled)
  }
}, { passive: true })
```

---

## Структуры блоков для вдохновения

Помимо конкретных анимаций — структуры и layout-паттерны из animation showcases, которые вдохновляют.

### 1. Pinned left + scrolling right (image stays, text updates)

```
┌─────────────────────────────────────────────────────┐
│  [Photo pinned] │  01 Хирургия                      │
│                 │  Первый текст...                   │
│                 │                                    │
│                 │  ↓ scroll                          │
│  [Photo pinned] │  02 Косметология                  │
│                 │  Второй текст...                   │
│                 │                                    │
│  [Photo pinned] │  03 Космецевтика                  │
│                 │  Третий текст...                   │
└─────────────────────────────────────────────────────┘
```

CodePen ref: `codepen.io/lcottingham/pen/xxPjmWo` — Pin Image + Scrolling Text Sections

**Применение у нас:** Страница `doctors.astro` — фото (или монограмма) слева фиксирована, справа прокручивается bio + credentials.

### 2. Stacked panels with content swap (pinned container)

```
┌──────────────────────────────┐
│  [Pinned section — вся 300vh]│
│                              │
│  Panel A: visible            │ ← scroll 0–100vh
│                              │
│  Panel B: fades in           │ ← scroll 100–200vh
│                              │
│  Panel C: fades in           │ ← scroll 200–300vh
└──────────────────────────────┘
```

Exat microsite (Codrops 2026): «stacked panels within a pinned scroll section. As the user scrolls, panels replace each other vertically, creating a clear sense of progression.»

**Применение у нас:** Services direction spreads если решить делать пиннинг.

### 3. Magazine reveal grid — каждый блок появляется отдельно

```
┌──────────┐  ┌──────────┐
│ блок A   │  │          │
│  ↑ fade  │  │ блок B   │
└──────────┘  │  ↑ fade  │
              └──────────┘
┌─────────────────────────┐
│ блок C  ↑ fade          │
└─────────────────────────┘
```

Pell Mell case study (Codrops 2026): «Almost every block appears progressively as you scroll. Animations are soft, slightly delayed, often staggered. This creates a rhythm that feels natural.»

**Применение у нас:** Reviews секция — каждый отзыв появляется с небольшим stagger.

### 4. Quote scrub — text appears word by word tied to scroll

```
«Каждое решение   ←── dim
принимается так,  ←── dim
чтобы через       ←── brightening
двадцать лет      ←── full opacity
вам нравился      ←── ...
результат.»       ←── ...
```

Codrops «On-Scroll Text Highlight Animations» (апрель 2024). Scroll progress = text reveal progress.

**Применение у нас:** QuoteBridge секция.

### 5. Hero — orchestrated timeline (text + image synced)

```
t=0.0s  nav появляется (opacity 0→1)
t=0.2s  eyebrow выезжает
t=0.4s  H1 line 1 открывается из маски
t=0.5s  H1 line 2 открывается из маски
t=0.6s  H1 line 3 открывается из маски
t=0.7s  hero-photo clip-path открывается снизу
t=0.9s  lead paragraph fade in
t=1.1s  CTA button появляется
```

Sourced from: jmarellanes/gsap serenity, adigital.agency hero orchestration pattern.

**Применение у нас:** `Hero.astro` — единственный тяжёлый timeline на странице. Всё остальное — ScrollTrigger по появлению.

---

## Что НЕ использовать

| Эффект | Почему нет |
|---|---|
| Scale on hover (cards) | Tier 3 signature, «сайт СМ-Пластики» |
| translateY на hover | Дёшево смотрится на тёмном фоне |
| box-shadow появляется на hover | Generic Bootstrap feeling |
| Parallax на images | Перегружено, Tier 3 |
| Venetian blinds slats reveal | Слишком theatrical, не editorial |
| Auto-rotate carousel | Tier 3 signature, compass запрещает |
| Scramble text (матрица) | ScrambleText — для cybertech, не клиника |
| Jello / elastic / spring | bounce = непремиальное |
| 3D cylinder/tube text | Гиперактивно, distract from content |
| Character-by-character (в body) | Slow, annoying для чтения |
| Blur text reveal (blurry) | Визуальный баг для медицины |
| Mouse-trail / cursor decoration | Клиника, а не портфолио |
| Scroll-snap full-viewport | Motion.md запрещает |
| Page transitions (Barba.js) | Лишнее для статического сайта |

---

## Реализация в Astro

### Структура файлов

```
src/
├── scripts/
│   ├── animations.ts      ← Lenis + GSAP setup (единственный импорт)
│   ├── hero-animation.ts  ← orchestrated hero timeline
│   ├── split-reveal.ts    ← SplitText utility
│   └── scroll-triggers.ts ← все ScrollTrigger для секций
└── styles/
    └── animations.css     ← .scroll-fade, .image-reveal CSS-base states
```

### Astro-паттерн: клиентский скрипт

```astro
---
// Hero.astro
---
<section class="hero ...">
  <h1 class="hero-heading split-lines" style="opacity:0">
    <!-- контент -->
  </h1>
  <div class="image-reveal-wrapper overflow-hidden">
    <img class="image-reveal ..." />
  </div>
</section>

<script>
  // Этот скрипт bundled Astro-ом, выполняется на клиенте
  import { initHeroAnimation } from '../scripts/hero-animation.ts'
  
  // После гидрации DOM
  document.addEventListener('astro:page-load', () => {
    initHeroAnimation()
  })
</script>
```

### Проверка prefers-reduced-motion

```ts
// src/scripts/animations.ts
export const REDUCED_MOTION = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

// В каждой функции:
if (REDUCED_MOTION) {
  // показать всё сразу без анимации
  return
}
```

---

## Приоритет внедрения

| Приоритет | Паттерн | Где | Сложность |
|---|---|---|---|
| 1 | Nav scroll transition (G) | Navigation.astro | ★☆☆ |
| 2 | Section fade (A) | Все секции | ★☆☆ |
| 3 | SplitText H1 (B) | Hero.astro | ★★☆ |
| 4 | Clip-path image (E) | Hero, doctors | ★★☆ |
| 5 | Procedure list stagger (D) | Procedures.astro | ★☆☆ |
| 6 | Quote bridge scrub (C) | QuoteBridge.astro | ★★☆ |
| 7 | Hero orchestrated timeline | Hero.astro | ★★★ |
| 8 | Pinned service spread (F) | ServicesGrid.astro | ★★★ |

**Правило:** начинать с 1–5 (базовый vocabulary), затем добавлять 6–8 как enhancement. Если нет времени — только 1–5 достаточно для премиального ощущения.

---

## Источники и референсы

- **GSAP SplitText docs (2025):** `gsap.com/docs/v3/Plugins/SplitText` — включая новый `mask`, `autoSplit`, `onSplit`
- **Codrops typography tag:** `tympanus.net/codrops/tag/typography/` — Blurry reveal, Text Highlight, 3D Scroll Text
- **Codrops Exat microsite (2026):** GSAP + SplitText + Lenis — «Not all motion is meant to be noticed»
- **Pell Mell editorial rhythm (Codrops 2026):** IntersectionObserver reveal, magazine flow без heavy GSAP
- **freefrontend SplitText gallery (2026):** 27 примеров с CodePen
- **jmarellanes/gsap serenity (GitHub):** Shutter reveal, kinetic typography, expo easing
- **adigital.agency article:** data-reveal attribute system, prefers-reduced-motion patterns
- **GSAP Vault «Scroll Hijack Sections»:** Word-by-word scrub tied to scroll progress
- **Adosa Real Estate (Mintlify docs):** Full animation system reference в Astro-окружении
- **Lenis GitHub (darkroomengineering):** GSAP ScrollTrigger integration pattern
