# Platinental — MEMORY

Краткая шпаргалка по состоянию проекта и важным решениям. Дополняет `CLAUDE.md` (инструкции) и `docs/design-direction.md` (дизайн-система).

## Design Research (завершено 2026-04-28)

- **`docs/design-research/`** — полный аудит 8 Tier 1 + 7 Tier 2 + 5 Tier 3 референсов через Playwright. Скриншоты + analysis.md + tokens.json на каждый сайт.
- **Pattern library** — 8 паттернов с Tailwind v4 / Astro кодом в `docs/design-research/02-patterns/`
- **Токены откалиброваны** — `#FFFEF2` cream (было `#FFFDF8`), `#1A1F2A` ink (было `#0A0A0A`), eyebrow tracking `0.20em`
- **GSAP паттерны** — 7 анимационных паттернов с готовым кодом в `05-gsap-animations.md`
- **Synthesis v2** — финальная стратегия в `docs/design-research/00-synthesis-v2.md`
- **Prototype mapping** — каждый компонент → паттерн → действие в `04-prototype-mapping.md`
- **design-system/platinental/MASTER.md** помечен DEPRECATED

## Обновления 2026-04-30

- Фото врача Тулатовой заменено на новый цветной портрет: `public/doctors/tulatova/photo.png` теперь взят из `Врачи в цвете/Тулатова new.png` и используется на карточках/странице врача через существующее поле `photo`.
- Временная цветная партия портретов врачей подключена для всех 9 врачей в `src/data/doctors.ts`: `public/doctors/{meloyan,tulatova,vasilev,mamedov,mardanova,brechko,gritsay,sorvin,babayan}/photo.png`. Добавлено поле `photoFrame` для 4/5-кропа на главной, `/doctors` и страницах врачей; `docs/photo-plan/05-asset-checklist.md` обновлён под фактическую команду из 9 врачей. Полный pipeline `src/assets/doctors/final/` остаётся следующим этапом после согласования.
- На главной добавлен блок акции `src/components/v3/sections/Promotions.astro`: лид-магнит “План гармонизации внешности перед консультацией”, CTA открывает форму записи с preset `План гармонизации внешности`, fallback — WhatsApp. Основное изображение: `src/assets/photos/promo-consultation-plan.png`; альтернативный более muted sage вариант сохранён как `src/assets/photos/promo-consultation-plan-sage.png`.
- На главной добавлен интерактивный quiz `src/components/v3/sections/ConsultationQuiz.astro`: 5 вопросов + обучающие подсказки + чек-лист, финальный CTA передаёт ответы в `BookingModal` и формирует WhatsApp-сообщение.
- Для стабильной локальной сборки зафиксированы рабочие зависимости под текущий Astro/Vite: `sharp@0.34.5`, `vite@6.4.2`, восстановлены нативные optional-пакеты Rollup/Tailwind/Lightning CSS/Sharp/esbuild.
- Мобильная адаптация главной проверена и доработана: hero-фото теперь заполняет рамку без внутренней белой полосы (`object-fit: cover`), закрытое мобильное меню сделано `inert`, основные touch-targets в шапке/CTA/футере расширены до 44px, Astro dev toolbar отключён в `astro.config.mjs` для чистого предпросмотра.
- Для цен добавлен общий форматтер `src/lib/formatText.ts`: суммы рендерятся с неразрывными пробелами (`5&nbsp;000&nbsp;₽`), чтобы знак рубля не переносился отдельно в карточках, прайсах, FAQ и CTA.
- На главную добавлен компактный блок `DecisionCompass.astro` после hero: маршруты для рекламного трафика “навигатор консультации / прайс / врачи / документы”; hero proof-strip обновлён на `2011`, три направления и лицензию.
- Во всех v3 местах с `Instagram*` добавлена юридическая подпись: Meta признана экстремистской и запрещена на территории РФ.
- Проверки 2026-05-01: `npm run check` — 0 errors, 0 warnings, 7 existing hints; `npm run build` — успешно. HTML в `dist/` содержит ссылки на портреты врачей и страницы 9 врачей. Playwright/Chromium визуальная проверка в этой сессии не завершилась: bundled Chromium зависал, системный Chrome падал с `SIGABRT/EPERM`; нужна ручная проверка в браузере или повторный Playwright после очистки окружения.

## v3 — параллельная пересборка Главной (2026-04-28)

- **Прототип на `/` не трогали** — рабочая версия осталась как была (`src/components/sections/`, `src/pages/index.astro`).
- **Новая Главная на `/v3`** — собрана с нуля по `00-synthesis-v2.md`. Изоляция через `[data-v3]` контейнер + префикс токенов `--v3-*`.
- **Файлы v3:**
  - `src/styles/tokens-v3.css` (откалиброванные ink `#1A1F2A` / cream `#FFFEF2`, three-tier gaps, eyebrow tracking 0.20em, lead 20-24px)
  - `src/layouts/V3Layout.astro` (минимальный, IntersectionObserver reveal + 1.5s safety)
  - `src/components/v3/ImagePlaceholder.astro` (универсальный плейсхолдер с slot, ratio, tone, source)
  - `src/components/v3/sections/{Navigation, Hero, ServicesGrid, Principles, Procedures, QuoteBridge, DoctorsPreview, BeforeAfter, Reviews, ConsultationValue, FinalCTA, FAQ, Contacts, Footer}.astro` — 14 компонентов
  - `src/pages/v3/index.astro` — связывает всё
- **Контент-документ:** `docs/content/homepage.md` — 1-в-1 копирайт прототипа, source of truth.
- **Фото-план:** `docs/photo-plan/{README, 00-overview, 01-homepage-slots, 02-doctors-normalization, 03-stock-sources, 04-ai-prompts, 05-asset-checklist}.md` (7 файлов). Workflow для нормализации врачей с kzn.platinental.ru через Flux Pro Kontext.
- **Скрины baseline:** `.playwright-mcp/homepage/v3-{desktop-1440, tablet-1024, mobile-375}-fullpage.png` + viewport-shots.
- **Console на /v3 — чисто (0 errors).**

## Состояние на 17 апреля 2026

- **Astro 5.18 + Tailwind v4** — инициализирован, dev-сервер стартует на <http://localhost:4321>
- **Главная страница** собрана на 13 компонентных секциях из `src/components/sections/`, копирайт и структура — 1-в-1 с `wireframes/homepage-v2.html`
- **Акцент:** champagne `#C4A882` (финал pending client sign-off)
- **Шрифты:** Cormorant Garamond italic (display) + Golos Text (body) — Google Fonts cyrillic subset
- **Screenshots baseline:** `.playwright-mcp/homepage/v2-*.png` (desktop-1440, tablet-1024, mobile-375)
- **Design-reviewer subagent:** `.claude/agents/design-reviewer.md` (Haiku-model)

## Ключевые решения

- Прототипы `wireframes/*.html` → визуал заменять, но **копирайт, структуру секций, цены и факты брать 1-в-1**.
- Акцент используется только на интерактивных элементах и декоративных деталях (eyebrow, number-бейджи, ссылки).
- Motion — CSS-only с IntersectionObserver + 1.5s safety timeout (для fullPage screenshots).
- Nav breakpoint — 1100px (на 1024 пункты переносились на 2 строки).
- `hyphens: manual` (не auto) для заголовков — иначе «косме-тологии» режется посреди слова.

## Что дальше (не сделано)

- **MCPs для dev-workflow** (требуют согласия на правки `~/.claude/settings.json`):
  - Chrome DevTools MCP (Lighthouse, LCP-профилирование)
  - shadcn MCP + Magic UI MCP (библиотека готовых компонент)
  - Nano Banana 2 MCP (AI-hero и портреты врачей)
- Остальные страницы: `/plastika`, `/kosmetologiya`, `/kosmecevtika`, `/doctors`, `/prices`, `/about`, `/contacts`, `/documents`, `/404`
- Реальная фотосессия врачей (контакт @aleksa_chernyshova)
- Yandex Metrica + JSON-LD `MedicalBusiness` (framework готов в `BaseLayout`)
- Формы с server-side submission (сейчас mailto/WhatsApp)
- Деплой на Beget/Timeweb

## Визуальный контент (утверждено 2026-04-23)

- **Трек A** (editorial B&W body fragments) + **Трек C** (material & light) — ambient imagery для декоративных слотов главной
- Распределение Role 2: A несёт нарратив (hero aside + 3 direction cards), C — фон/переходы (quote bridge + 6 procedures + dividers). Всего 11–12 ассетов
- Разрешённые сюжеты A: шея/ключица/плечо/спина, руки, лицо в editorial-ракурсах. **Запрещено:** декольте, лица анфас, улыбки
- Источник: Cosmos.so + Pinterest для мудборда → Unsplash/Pexels для C (materials/light) → AI-gen или мини-съёмка для A (body fragments). Премиальные стоки исключены (оплата из РФ невозможна).
- Тональность: TBD через сравнительный тест T1/T2/T3 в hero-слоте. Рекомендация — T3 warm monochrome
- План: `~/.claude/plans/melodic-swimming-rabin.md` (до Фазы 1 — потом решение мигрирует в `docs/design-direction.md` §6)

## Связь с глобальной памятью

- `~/.claude/projects/.../memory/MEMORY.md` — индекс
- `project_platinental_stack.md` — детали стека
- `feedback_prototype_is_source_of_truth.md` — правило про прототип
- `project_visual_content_direction.md` — визуальное направление A+C (этот брейншторм)
