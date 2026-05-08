# Platinental — Design Direction

Зафиксированные решения дизайн-системы, подтверждённые в актуальной коричневой версии сайта (2026-05-07). Источник правды для всех последующих страниц: `src/styles/tokens.css`.

---

## 1. Колор-система

| Роль | Значение | Где |
|------|----------|-----|
| `--v3-cream` | warm cream `#FBF8F4` | основной фон страниц |
| `--v3-cream-alt` | warm off-cream `#F6F0EA` | мягкие переходы поверхностей |
| `--v3-sand` | beige sand `#EFE7DF` | чередующиеся секции |
| `--v3-surface-card` | porcelain `#FFFDF9` | карточки, формы, вложенные поверхности |
| `--v3-ink` | warm brown ink `#685C54` | заголовки, body, тёмные CTA |
| `--v3-ink-secondary` | slate taupe `#616F84` | вторичный текст, подписи |
| `--v3-champagne` | rose taupe `#917271` | акцент, focus, hover, micro-UI |
| `--v3-champagne-deep` | deep rose taupe `#7B6261` | hover, активные ссылки |

**Правило:** коричневая палитра утверждена как актуальная. Не возвращать sage/green, black-red московскую эстетику или TBD-акцент. Красный по-прежнему запрещён.

**Чередование секций:**
cream → sand → cream → sand → warm ink/dark CTA → cream. Ритм мягкий, тёплый, без резких контрастов подряд.

---

## 2. Типографика

- **Display:** `ZapfHumnst BT`, fallback `Georgia, serif`.
- **Body/UI:** `Formular`, fallback `-apple-system`, `Inter`, `system-ui`, `sans-serif`.
- **Правило:** курсив не является активным кодом бренда. `em/i/cite` в v3-системе намеренно нормализованы в normal style.
- Letter-spacing у display = `0`; у body = `0.005em`; у eyebrow = `0.20em`.
- Line-height: 1.05 у display/H1, 1.10 у H2, 1.65 у body.
- Fluid clamp: `--v3-text-h1` 28→48px, `--v3-text-display` 32→56px, `--v3-text-h2` 22→36px.
- Hero может быть многострочным, но без искусственного отрицательного tracking и без возврата к Cormorant/Golos.

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
- `SectionHeader` — eyebrow + title + lede. Display regular через `ZapfHumnst BT`.
- `Button` — primary (dark) / secondary (outlined) / ghost (underlined) / inverse (cream on dark).
- Радиусы: не копируем референсы один в один, но системно уходим от жёсткой геометрии. Кнопки, фото-контейнеры, карточки и плашки используют мягкие скругления `16–32px`.

**Секции главной (актуальный порядок в `src/pages/index.astro`):**
1. `Hero` — коричневая premium-hero, тёплый фон, главный editorial-образ.
2. `DecisionCompass` — быстрый выбор направления.
3. `ConsultationQuiz` — интерактивный подбор маршрута.
4. `ServicesGrid` — 3 направления.
5. `Principles` — принципы клиники.
6. `Procedures` — ключевые процедуры.
7. `Promotions` — актуальные предложения.
8. `QuoteBridge` — эмоциональный editorial-мост.
9. `DoctorsPreview` — превью врачей.
10. `BeforeAfter` — результаты/кейсы при наличии согласий.
11. `Reviews` — отзывы с проверяемыми источниками.
12. `ConsultationValue` — ценность консультации.
13. `FinalCTA` — форма записи с 152-ФЗ.
14. `FAQ` — вопросы.
15. `Contacts` — адрес, телефон, мессенджеры, карта.

---

## 5. Motion

- Актуальная motion-система утверждена и подключается глобально в `SiteLayout.astro`: `motion-stagger`, `motion-scroll` (Lenis), `motion-faq`, `motion-quote` (GSAP/SplitType).
- Базовый reveal в tokens: `--v3-duration-slow: 1500ms`, shutter/hairline: `--v3-duration-deep: 2000ms`.
- Motion должен оставаться редким, медленным и editorial. Не добавлять новые motion-зависимости без явной задачи.
- `prefers-reduced-motion: reduce` обязателен: transitions/animations отключаются или сокращаются до 0.01ms.
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

- Фото врачей без исходников — осознанный editorial fallback, но не имитация незагруженного фото. При появлении фотосессии заменить.
- Hero — текущий коричневый editorial-образ считается актуальным.
- Before/After — только согласованные кейсы с письменным согласием.
- Яндекс-карта — embed с понятным fallback на адрес и маршрут.

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
