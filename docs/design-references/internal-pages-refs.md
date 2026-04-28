# Референсы дизайна внутренних страниц

Собрано из Exa и WebSearch, апрель 2026. Для использования при сборке Figma.

---

## Паттерны блоков для Platinental

### Hero внутренних страниц
- **Формула:** H1 (SEO) + Lead 2 предложения + CTA. Высота 300-400px, НЕ full-viewport.
- **Референс:** Prime Care Medical (pagesmith.ai) — asymmetric hero, typography overlapping imagery
- **Наш вариант:** Cream фон, Cormorant Italic H1, Sub в Inter/Formular, 1 CTA gold

### Сетка услуг — Bento Grid
- **Не одинаковые карточки!** Разные размеры для разных категорий:
  - Топ-3 процедуры: крупные карточки (2 колонки шириной)
  - Остальные: стандартные карточки (1 колонка)
- **Референс:** Prime Care "Services Bento Grid" — varied card sizes, rounded corners, subtle offsets
- **Наш вариант:** Warm grey фон, cream карточки, gold accent на CTA

### Карточки врачей
- **Фильтр по специальности** (Alpine.js или JS-табы)
- **Бейджи:** "Ординатура РНИМУ", "Обучение в США"
- **Референс:** Astro Medical Template — doctor directory with filtering, telemedicine badges
- **Наш вариант:** 4 в ряд desktop, скролл на мобайл. Фото 3:4, Gold CTA

### Блок философии (About)
- **Split-scroll:** текст слева фиксирован, изображения справа скроллятся
- **Крупные цитаты:** Cormorant Italic 36px, accent color
- **Паттерн из Ресурсы/** как фоновый декор
- **Референс:** Prime Care "Philosophy Split-Scroll"

### Таблица цен
- **Табы по категориям** (sticky на мобайл)
- **Чередование строк:** cream/white
- **Цены выровнены вправо**, Cormorant Italic
- **Референс:** стандартный pricing table с категориями

### До/После
- **Слайдер с ручкой разделения** (не 2 фото рядом)
- **Референс:** Aurelia Dermatology — HIPAA-compliant galleries

### FAQ
- **Аккордеон** с анимацией раскрытия
- **Schema.org FAQPage** для SEO
- **Первый вопрос раскрыт** по умолчанию

---

## Общие принципы из исследования

1. **Calm confidence** — спокойная уверенность, не кричащий дизайн
2. **White space = luxury** — пустое пространство = премиум
3. **Trust early** — сертификации и бейджи выше фолда
4. **Mobile-first** — 57% не рекомендуют бизнес с плохим мобайлом
5. **Speed = professionalism** — Lighthouse 95+ обязателен
6. **Gentle CTAs** — "Запишитесь" лучше "КУПИТЬ СЕЙЧАС"

---

---

## Библиотека секций по типу

### Hero-секции
| Источник | URL | Что взять |
|---|---|---|
| 21st.dev Hero Section (dark) | https://21st.dev/community/components/s/dark-hero-section | Тёмные hero с анимацией |
| 21st.dev Minimal Hero | https://21st.dev/community/components/s/minimal-hero-section | Минималистичные hero |
| 21st.dev Animated Hero | https://21st.dev/community/components/s/animated-hero-section | Hero с анимацией |
| Aceternity Hero with Beams | https://ui.aceternity.com/blocks/hero-sections | Hero с световыми эффектами |
| Dribbble Aesthetic Clinic | https://dribbble.com/shots/25591357-Aesthetic-Clinic-Website-Design | Free consultation CTA, empathetic messaging |
| Dribbble Gallery Plastic Surgery | https://dribbble.com/shots/25620091-Gallery-Plastic-Surgery-Aesthetics-Web-Design | Layered CTA, beach photo, pink accents |
| Behance Doctor Bento Hero | https://www.behance.net/gallery/223935789/Doctor-Website-Hero-Section-UI-with-Bento-Grid-Layout | Bento grid hero for doctors |

### Bento Grid (услуги, фичи)
| Источник | URL | Что взять |
|---|---|---|
| Prime Care Medical | https://pagesmith.ai/templates/healthcare/prime-care-medical | Services Bento Grid с иконографикой |
| Aceternity Bento Grids | https://ui.aceternity.com/bento-grid | 6+ вариаций bento layouts |
| Shadcn Studio Bento | http://shadcnstudio.com/blocks/bento-grid/bento-grid | 24+ bento блока с кодом |
| Mockuuups Bento Examples | https://mockuuups.studio/blog/post/best-bento-grid-design-examples/ | Apple-style bento паттерны |
| Hers Healthcare Bento | https://www.unsection.com/section/hers-benefits-and-care-bento-grid-section-design | Healthcare bento секция |

### Карточки врачей
| Источник | URL | Что взять |
|---|---|---|
| Astro Medical Template | https://astro.build/themes/details/medical-hospital-clinic-website-template/ | Doctor directory с filtering, badges |
| Framer MedExpert | https://www.framer.com/blog/healthcare-website-design-examples/ | Whitespace-forward doctor profiles |

### Отзывы / Testimonials
| Источник | URL | Что взять |
|---|---|---|
| 21st.dev Testimonials | https://21st.dev/community/components/s/testimonials | Разные стили testimonials |
| Prime Care Detail-Zoom | https://pagesmith.ai/templates/healthcare/prime-care-medical | CSS-driven hover scaling на карточках |

### Pricing / Таблицы цен
| Источник | URL | Что взять |
|---|---|---|
| 21st.dev Pricing | https://21st.dev/community/components/s/pricing | Pricing section components |
| Shadcn Pricing | http://shadcnstudio.com/blocks/pricing | 20 pricing вариаций |

### FAQ
| Источник | URL | Что взять |
|---|---|---|
| Shadcn FAQ | http://shadcnstudio.com/blocks/faq | 19 FAQ вариаций |

### CTA / Формы
| Источник | URL | Что взять |
|---|---|---|
| 21st.dev CTA | https://21st.dev/community/components/s/calls-to-action | CTA секции |

### Философия / About (Split-Scroll)
| Источник | URL | Что взять |
|---|---|---|
| Prime Care Philosophy | https://pagesmith.ai/templates/healthcare/prime-care-medical | Sticky split-scroll |
| Devmart Premium Aesthetic | https://devmart.org/premium-aesthetic-clinic-website/ | Calm confidence, trust early |

---

## Dribbble / Behance — визуальные референсы

| Платформа | Поиск | URL |
|---|---|---|
| Dribbble | aesthetic clinic | https://dribbble.com/tags/aesthetic-clinic |
| Behance | medical aesthetic clinic | https://www.behance.net/search/projects/medical%20aesthetic%20clinic |
| Behance | medical website design | https://www.behance.net/search/projects/medical%20website%20design |
| Behance | Vitalea Aesthetic Medicine | https://www.behance.net/gallery/218626489/Vitalea-Aesthetic-Medicine-2025 |
| Behance | Neya Dermatology | (поиск "Neya dermatology" — 544 appreciations) |

---

## Полные шаблоны (Astro + Tailwind)

| Шаблон | URL | Стек | Что взять |
|---|---|---|---|
| Astro Medical | https://astro.build/themes/details/medical-hospital-clinic-website-template/ | Astro 6 + Tailwind | 60+ компонентов, doctor filtering, 16 страниц |
| Vitality | https://colorlib.com/wp/template/vitality/ | Astro 6 + Tailwind 4 | Dark mode, appointment booking |
| MEDILuxe | https://www.templatemonster.com/website-templates/mediluxe-premium-medical-amp-clinic-html-template-561370.html | HTML + Bootstrap 5 | 5 homepage вариаций |
| Aesthetica WP | https://dribbble.com/shots/24962737 | WordPress + Elementor | Cosmetic surgery + beauty clinic demos |

---

## Источники

- [Prime Care Medical Template](https://pagesmith.ai/templates/healthcare/prime-care-medical) — bento grid, split-scroll, asymmetric hero
- [Aurelia Dermatology](https://www.optimal.dev/demo/dermatology) — dual-track, board certification
- [Vivid Luxx](https://proteatech.dev/showcase/vivid-luxx) — luxury aesthetics, Next.js
- [Astro Medical Template](https://astro.build/themes/details/medical-hospital-clinic-website-template/) — 60+ components, doctor filtering
- [Vitality Template](https://colorlib.com/wp/template/vitality/) — Astro 6 + Tailwind 4, dark mode
- [21st.dev](https://21st.dev/) — UI components (Heros, Features, Testimonials, Pricing)
- [Aceternity UI](https://ui.aceternity.com/) — Bento grids, Hero sections, Feature sections
- [Shadcn Studio](http://shadcnstudio.com/) — 200+ blocks (bento, pricing, FAQ, testimonials)
- [Unsection](https://www.unsection.com/) — Секции по категориям и стилям
- [Framer Healthcare Examples](https://www.framer.com/blog/healthcare-website-design-examples/)
- [DesignRush Best Medical Designs](https://www.designrush.com/best-designs/websites/trends/best-medical-website-designs)
- [Dribbble Aesthetic Clinic](https://dribbble.com/tags/aesthetic-clinic)
- [Behance Medical Website Design](https://www.behance.net/search/projects/medical%20website%20design)
