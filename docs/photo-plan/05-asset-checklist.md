# 05 · Asset Checklist

Список всего, что нужно собрать. Приоритеты:

- **P0** — обязательно к запуску главной (без них она с плейсхолдерами).
- **P1** — обязательно для остальных страниц (внутренние страницы и `/doctors`).
- **P2** — «приятно бы иметь», без них живём.

---

## P0 — Главная (`/v3`)

### Hero · H1
- [ ] **H1** — Architectural shot ИЛИ B&W body fragment (4/5, 2160×2700)
- [ ] Source: Unsplash / AI-gen — попробовать оба варианта, A/B-test с клиентом

### ServicesGrid · S1–S3
- [ ] **S1** — Хирургия, B&W body fragment (4/5, 1620×2025)
- [ ] **S2** — Косметология, material macro «капля сыворотки» (4/5, 1620×2025)
- [ ] **S3** — Космецевтика, product still life «3 unbranded jars» (4/5, 1620×2025)

### DoctorsPreview · D1–D4
- [x] **D1 · Бабаян Арсен Викторович** — цветной портрет в `public/doctors/babayan/photo.png`
- [x] **D2 · Мелоян Мхитар Мисакович** — цветной портрет в `public/doctors/meloyan/photo.png`
- [x] **D3 · Тулатова Регина Тимуровна** — цветной портрет в `public/doctors/tulatova/photo.png`
- [x] **D4 · Васильев Максим Николаевич** — цветной портрет в `public/doctors/vasilev/photo.png`

> Факт 2026-05-01: временно публикуем цветные портреты из партии `Врачи в цвете/` через `public/doctors/<slug>/photo.png` и индивидуальные `photoFrame` в `src/data/doctors.ts`. Полный pipeline `src/assets/doctors/final/` оставлен как будущая нормализация после согласования с клиентом.

---

## P1 — Внутренние страницы

### `/doctors` (полный листинг — 9 врачей)
- [x] **D5 · Мамедов Вахид Аждарович** — цветной портрет в `public/doctors/mamedov/photo.png`
- [x] **D6 · Марданова Дженнет Мевлютовна** — цветной портрет в `public/doctors/mardanova/photo.png`
- [x] **D7 · Бречко Мария Александровна** — цветной портрет в `public/doctors/brechko/photo.png`
- [x] **D8 · Грицай Олеся Анатольевна** — цветной портрет в `public/doctors/gritsay/photo.png`
- [x] **D9 · Сорвин Владимир Андреевич** — цветной портрет в `public/doctors/sorvin/photo.png`

### `/doctors/[slug]` (страницы каждого врача)
- [x] **D1-hero** … **D9-hero** — текущий hero использует те же цветные портреты с CSS-кропом 4/5

### BeforeAfter (главная + plastika/kosmetologiya)
- [ ] **BA-1** Ринопластика (before + after, 1/1, ≥1200×1200) — **от клиента**
- [ ] **BA-2** Блефаропластика (before + after) — от клиента
- [ ] **BA-3** Маммопластика (before + after) — от клиента
- [ ] **BA-4** SMAS-лифтинг (before + after) — от клиента
- [ ] **BA-5** Абдоминопластика (before + after) — от клиента
- [ ] **BA-6** Контурная пластика (before + after) — от клиента
- [ ] Согласие пациентов в письменной форме — **критическая блокировка**

### `/plastika`, `/kosmetologiya`, `/kosmecevtika`
- [ ] **PL-hero** — wide editorial shot для page-hero
- [ ] **KS-hero** — то же
- [ ] **KC-hero** — product hero

### `/about`
- [ ] **AB-hero** — architectural interior клиники (если есть свой shot — обязательно использовать)
- [ ] **AB-detail** (опц) — деталь интерьера

### `/contacts`
- [ ] Минимальная карта (greyscale Yandex.Maps embedding или статичный SVG) — это не фото, но визуальный ассет

---

## P2 — Опциональное

- [ ] **CV-1** — Consultation ambient (стол, блокнот, свет) — 3/4
- [ ] **DIVIDER-1** — текстура для дивайдеров между секциями (16/9, ambient)
- [ ] **404-art** — что-то для страницы 404 (italic Cormorant + тонкий graphics)
- [ ] **OG-image** — 1200×630 для Open Graph (генерируется отдельно)

---

## Критические блокировки

| Блокировка | Кто решает | Срок |
|---|---|---|
| Согласие пациентов на before/after | Клиент клиники | До запуска BeforeAfter в production |
| Согласие врачей на ИИ-нормализацию | Клиент + врачи | До D-day |
| Бюджет Midjourney $30 | Клиент | До start генерации |
| Доступ к API Flux Pro / посредник | Dima | До нормализации врачей |

---

## Прогресс по этапам

### Этап 1 · Сетап (≤ 2 дня)
- [ ] Завести Midjourney Pro account (через VPN+посредник)
- [ ] Завести доступ к Flux Pro Kontext (через Replicate / Fal.ai)
- [x] Добавить текущую цветную партию врачей → `Врачи в цвете/` и `public/doctors/<slug>/photo.png`

### Этап 2 · Генерация P0 (≤ 5 дней)
- [x] Подключить временную цветную партию врачей на главную и `/doctors`
- [ ] Прогнать audit-таблицу из `02-doctors-normalization.md` для 9 врачей
- [ ] Сгенерить S1, S2, S3, H1 через Midjourney (по 4–6 итераций каждый)
- [ ] Нормализовать D1–D4 через Flux Pro Kontext
- [ ] Применить единый LUT ко всем 9 ассетам
- [ ] Согласовать с клиентом

### Этап 3 · Деплой
- [ ] Конвертировать в AVIF/WebP/JPEG
- [x] Залить временную цветную партию в `public/doctors/<slug>/photo.png`
- [x] Обновить компоненты с реальными портретами вместо монограмм/плейсхолдеров
- [ ] Visual regression Playwright

### Этап 4 · P1
- [ ] Нормализовать D5–D9
- [ ] Получить before/after от клиента
- [ ] Сгенерить page-hero для plastika/kosmetologiya/kosmecevtika
- [ ] Architectural shot для /about (или AI substitute)

---

## Definition of Done

Главная считается «фото-готова» когда:

1. ✅ В `src/assets/photos/` лежат 8 файлов: H1, S1, S2, S3, D1, D2, D3, D4 — в исходном размере + AVIF/WebP/JPEG.
2. ✅ Все они прогнаны через единый LUT (визуально «одна серия»).
3. ✅ Клиент согласовал визуал.
4. ✅ Размер каждого AVIF ≤ 200KB на 2× retina.
5. ✅ Все имеют alt-текст в коде.
6. ✅ В Playwright скрине нет ни одного `<ImagePlaceholder>`.

Текущий промежуточный DoD для партии врачей: все 9 карточек врачей имеют цветные портреты, страницы `/doctors` и `/doctors/[slug]` используют 4/5 кроп через `photoFrame`, сборка и Playwright-проверка должны проходить без layout-регрессий.
