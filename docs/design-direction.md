# Platinental — Design Direction

Зафиксированные решения дизайн-системы, подтверждённые на главной странице (апрель 2026). Источник правды для всех последующих страниц.

---

## 1. Колор-система

| Роль | Значение | Где |
|------|----------|-----|
| `--surface-page` | cream `#FFFDF8` | основной фон страниц |
| `--surface-alt` | sand `#F5F0EB` | чередующиеся секции |
| `--surface-inverse` | ink `#0A0A0A` | цитата-мост, форма, stats |
| `--text-primary` | ink `#0A0A0A` | заголовки, body |
| `--text-muted` | ink-500 `#6B6B6B` | мелкий текст |
| `--accent` | champagne `#C4A882` | единственный хроматический цвет |
| `--accent-hover` | champagne-600 `#A88D6B` | hover на CTA, активные ссылки |

**Правило:** акцент используется только на интерактивных элементах (CTA, ссылки, eyebrow, цифры-числа). Никаких hero-фонов champagne. Никогда — красный, зелёный, синий.

**Чередование секций:**
cream → cream → sand → cream → ink(dark) → sand → cream → sand → cream → cream → ink(dark) → sand → cream. Ритм мягкий, без резких контрастов подряд.

---

## 2. Типографика

- **Display:** `Cormorant Garamond` (Google Fonts, cyrillic subset). Weights 300, 400, 500 italic + regular.
- **Body:** `Golos Text` (Google Fonts, cyrillic). Weights 400, 500, 600.
- **Правило:** заголовки почти всегда **italic 400** — это визуальный код бренда (Haute Couture). Body всегда regular.
- Отрицательный трекинг display: `-0.02em` (H1/H2), `-0.015em` (H3/H4/H5).
- Line-height: 1.05 у display, 1.15 у H3–H5, 1.6 у body.
- Fluid clamp: `--text-h1` 32→80px, `--text-display` 36→104px, `--text-h2` 36→56px.
- Каждое слово на своей строке разрешено и даже желательно в hero — это editorial-стиль.

---

## 3. Grid & spacing

- `--container-max` = 1280px.
- Gutters: 20px (mobile) → 32px (tablet ≥768) → 48px (desktop ≥1200).
- Baseline spacing = 8px. Vertical section padding: 80px (mobile) → 96px (desktop).
- Сетки: 3-колоночная для directions, 3×2 для procedures, 4-колоночная для principles / doctors / about-numbers.
- Breakpoints: 560 / 768 / 1024 / 1100 (nav) / 1200.

---

## 4. Компоненты (source of truth)

**Обязательный набор для любой страницы:**
- `Navigation` — sticky, liquid-glass blur при scroll > 24px, brand + 6 items + phone + CTA + burger.
- `Footer` — 4-colonкi, brand + links + medical disclaimer + ПДн-links.
- `SectionHeader` — eyebrow + title + lede. Display italic 400.
- `Button` — primary (dark) / secondary (outlined) / ghost (underlined) / inverse (cream on dark).

**Секции главной (13 шт., в этом порядке):**
1. `Hero` — eyebrow «THE PLATINENTAL · КАЗАНЬ», H1 italic, sub, 2 CTA, placeholder aside, stats-row.
2. `ServicesGrid` — 3 направления с photo-placeholder, описанием, CTA.
3. `Principles` — 4 карточки («Почему Platinental»).
4. `Procedures` — 6 карточек с ценами и категориями.
5. `QuoteBridge` — dark-секция с одной строкой на italic.
6. `AboutNumbers` — 4 цифры + цитата Искорнева + ссылка «О клинике».
7. `DoctorsPreview` — 4 врача с EN/RU специализацией + CTA + «все врачи».
8. `BeforeAfter` — горизонтальная карусель с 6 парными плейсхолдерами.
9. `Reviews` — 3 карточки со звёздами и цитатами.
10. `ConsultationValue` — узкая центрированная «от 5 000 ₽».
11. `FinalCTA` — dark-форма «Задайте вопрос врачу» с 152-ФЗ.
12. `FAQ` — details/summary, 6 вопросов.
13. `Contacts` — адрес / телефон / WhatsApp / режим + плейсхолдер Яндекс-карты.

---

## 5. Motion

- Бюджет: ≤50 KB JS. На главной — ноль зависимостей motion (чистый CSS + IntersectionObserver в BaseLayout).
- Reveal: opacity 0→1 + translateY 24→0, 420ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
- Hover: translateY -4px, 240ms.
- `prefers-reduced-motion: reduce` → все transitions = 0ms.
- Transform + opacity только. Никогда width/height/top/left.

---

## 6. Editorial photography — Track A & C

**Решение подтверждено 2026-04-24.** Подробности: `docs/superpowers/specs/2026-04-24-visual-tonality-decision.md`

### Track A — Editorial B&W body fragments (Paolo Roversi / Sarah Moon)

- Сюжеты: шея, ключица, плечо, профиль — без лица, без улыбки, без décolleté
- **Тональность: T2 Low-Key** — `filter: grayscale(100%) brightness(0.78) contrast(1.18);`
- Слоты: карточки ServicesGrid (`.direction__photo--*`), QuoteBridge bg, ambient-слоты внутренних страниц
- Формат в карточках: `aspect-ratio: 4/3`, `object-fit: cover`, `object-position: center top`

### Track C — Material & light (Hiroshi Sugimoto / Kinfolk)

- Сюжеты: фактуры тканей, стекло, вода, рассеянный свет — без людей
- Без фильтра тональности — натуральные тона (кремовые, тёплые нейтральные)
- Слоты: QuoteBridge bg (альтернатива), Procedures bg, connective tissue

### Временные плейсхолдеры (до замены реальными фото)

- Фото врачей — cream→ink градиенты с monogram-инициалами, film-grain pass → заменить (@aleksa_chernyshova)
- Hero aside — B/A слайдер с реальными кейсами (не ambient, не Track A)
- Before/After — парные dark/light gradient-плейсхолдеры → заменить на согласованные кейсы
- Яндекс-карта — SVG-сетка с champagne-точкой → embed Я.Карты

---

## 7. Что запрещено (напоминание)

- Красный акцент.
- Gradient backgrounds на full-section (только на hero-art SVG canvas).
- Stock photo с улыбающимися моделями.
- Более 2-х CTA на одном экране.
- Autoplay video/audio.
- Иконочные «наборы из 200 иконок» — только минимум SVG.
- Чекаут/корзина в космецевтике.
- Ссылки на Корл или упоминание аренды ОЗ.

---

## 8. Responsive / Accessibility

- Zero horizontal scroll на 375px проверено.
- Tap targets ≥ 44×44 (nav, CTA, form inputs, WhatsApp).
- WCAG AA контрасты: primary (ink на cream) OK, muted (ink-500 на cream) OK, accent (champagne) — для декоративных элементов, не для body-текста.
- `:focus-visible` → accent-ring через `box-shadow`.
- Landmarks: `<main>`, `<header>`, `<footer>`, все `<section aria-label/labelledby>`.

---

## 9. Ссылки на файлы

- `DESIGN.md` — базовая дизайн-философия, цветовые роли.
- `src/styles/tokens.css` — все CSS-переменные.
- `src/styles/global.css` — reset, reveal, grain, @theme.
- `.claude/agents/design-reviewer.md` — subagent для QA.
- `wireframes/homepage-v2.html` — прототип, источник копирайтинга.
- `knowledge/brand-voice.md` + `knowledge/doctors.md` — факты и тон.

---

*Любые правки цвет-токенов, шрифтов, сетки должны отражаться и в `tokens.css`, и в этом файле. Синхронизация обязательна.*
