# 02 · Нормализация портретов врачей

**Контекст:** в `src/data/doctors.ts` 7 врачей с фото-путями `/doctors/<slug>/photo.<ext>`. Сами фото лежат в `public/doctors/<slug>/photo.{png,jpg}` и **взяты с kzn.platinental.ru**. Часть из них в едином стиле (3/4, нейтральный фон), часть — в **другом стиле** (B&W, нестандартный ракурс, плотный задний план). Это разрушает Pattern 03 (typographic spread) и delivers «странички 5-летней давности» feel.

**Задача:** привести все 7 портретов к единому визуальному voice через ИИ — не меняя личность, не «улучшая» лицо.

---

## Список 7 врачей и источники

| # | Slug | ФИО | Source URL (kzn.platinental.ru) | Текущий путь в проекте | Приоритет |
|---|---|---|---|---|---|
| 1 | `meloyan` | Мелоян Мхитар Мисакович | https://kzn.platinental.ru/specialist/mhitar-meloyan/ | `public/doctors/meloyan/photo.png` | **P0 — главная** |
| 2 | `tulatova` | Тулатова Регина Тимуровна | https://kzn.platinental.ru/specialist/regina-tulatova/ | `public/doctors/tulatova/photo.jpg` | **P0 — главная** |
| 3 | `mamedov` | Мамедов Вахид Аждарович | https://kzn.platinental.ru/specialist/1077/ | `public/doctors/mamedov/photo.png` | **P0 — главная** |
| 4 | `vasilev` | Васильев Максим Николаевич | https://kzn.platinental.ru/specialist/maksim-vasilev/ | `public/doctors/vasilev/photo.png` | **P0 — главная** |
| 5 | `mardanova` | Марданова Дженнет | https://kzn.platinental.ru/specialist/dzhennet-mardanova/ | `public/doctors/mardanova/photo.png` | P1 — `/doctors` |
| 6 | `brechko` | Бречко Мария | https://kzn.platinental.ru/specialist/brechko-mariya/ | `public/doctors/brechko/photo.png` | P1 — `/doctors` |
| 7 | `gritsay` | Грицай Олеся | https://kzn.platinental.ru/specialist/olesya-griczaj/ | `public/doctors/gritsay/photo.jpg` | P1 — `/doctors` |

> **Примечание:** некоторые URL могут отличаться — sourceSlug в `doctors.ts` основан на текущей структуре сайта. Если URL не отвечает — искать через поисковую страницу kzn.platinental.ru или через web.archive.org.

---

## Workflow нормализации

### Шаг 1 · Скачать все 8 оригиналов

Утилита (зависит от того, есть ли уже в `public/doctors/<slug>/`):

```bash
# Если фото уже в public/doctors/ — их используем как baseline.
# Если нет — скачиваем с kzn.platinental.ru через curl или browser.
for slug in meloyan tulatova mamedov vasilev mardanova brechko gritsay; do
  ls -la "public/doctors/$slug/" 2>/dev/null
done
```

Если оригиналы устарели (на сайте обновились) — пересохранить.

### Шаг 2 · Аудит — единый стиль или разнобой?

**Критерии единого стиля:**
- Ракурс: 3/4 head turn (или фронтальный), плечи в кадре.
- Свет: мягкий, фронтальный или 45°.
- Фон: нейтральный, светлый (cream / light grey), без интерьера.
- Цвет: цветной (не B&W).
- Кроп: headshot, верхняя треть тела.
- Выражение: нейтральное или лёгкая улыбка губами.

**Создать таблицу аудита:**

| Slug | Ракурс OK? | Свет OK? | Фон OK? | Цвет OK? | Решение |
|---|---|---|---|---|---|
| meloyan | TBD | TBD | TBD | TBD | TBD |
| tulatova | TBD | TBD | TBD | TBD | TBD |
| mamedov | TBD | TBD | TBD | TBD | TBD |
| vasilev | TBD | TBD | TBD | TBD | TBD |
| mardanova | TBD | TBD | TBD | TBD | TBD |
| brechko | TBD | TBD | TBD | TBD | TBD |
| gritsay | TBD | TBD | TBD | TBD | TBD |

**Решения:**
- `OK as-is` — фото подходит, только treatment (LUT) поверх.
- `normalize-bg` — фон менять (ИИ inpaint).
- `normalize-color` — B&W → цветной (ИИ image-to-image).
- `normalize-crop` — re-crop в 3/4.
- `regenerate-full` — полная нормализация ИИ.
- `reshoot` — фото испорчено, нужна пересъёмка (контакт @aleksa_chernyshova).

### Шаг 3 · ИИ-нормализация для разнобойных

#### Tools (приоритет)

| Tool | Сила | Слабость | Когда |
|---|---|---|---|
| **Flux Pro Kontext** | Лучшее сохранение лица | Платный, через API | Замена фона / света |
| **Nano Banana 2** | Хорошо для простых правок | Менее точное лицо | Быстрая ретушь |
| **Midjourney v7 (--cref)** | Сильный стиль | Может «лизнуть» лицо | Только для пересъёмки as-if-original |
| **Photoshop Generative Fill** | Контроль | Без identity preservation | Точечный inpainting фона |

> **Критично:** **identity preservation должен быть 100%.** Это реальные люди. Не «улучшаем глаза», не «выпрямляем нос», не «удаляем веснушки». Только: фон, свет, кроп, цвет.

#### Промпты — см. [`04-ai-prompts.md`](04-ai-prompts.md)

#### Параметры:

```
Doctor normalization (Flux Pro Kontext)

Input: оригинал с kzn.platinental.ru
Mode: image-to-image edit, identity-preserving
Strength: 0.35 (низкая — сохраняем лицо)
Prompt:
  "Professional editorial headshot, same person, identical face features (do not alter identity),
   neutral cream background (#FAF6EE), soft natural front light from left,
   color photo, 3/4 head turn, warm magazine tones, fine grain,
   shoulders in frame, relaxed neutral expression. Magazine quality, raw RAW look."
Negative:
  "altered face, different person, beauty filter, smooth skin retouch, synthetic look,
   harsh shadow, blue light, B&W, cropped chin, cartoon, AI hands"
```

### Шаг 4 · Финальный treatment

После нормализации все 8 фото прогоняем через **один LUT**, чтобы они «звучали» одинаково.

- Lightroom preset / Capture One style / Camera Raw .xmp.
- Сохранить в `docs/photo-plan/treatment.xmp` (после первой партии).
- Параметры:
  - Temperature: warm (+5–8 mireds).
  - Tint: neutral (0).
  - Exposure: 0 ± individual.
  - Contrast: −10.
  - Highlights: −15.
  - Shadows: +10.
  - Whites: −5.
  - Blacks: +5.
  - Saturation: −10.
  - Vibrance: −5.
  - Grain: 12 (size 25, roughness 50).
  - Sharpening: 25 (mask 30).

### Шаг 5 · Crop targets

| Контекст | Размер max | Кроп |
|---|---|---|
| DoctorsPreview thumbnail (главная) | 1350×1800 (3/4) | Headshot — голова + плечи. Глаза примерно на 1/3 сверху. |
| `doctors.astro` listing | 1350×1800 (3/4) | То же. |
| `doctors/[slug].astro` hero | 2160×2700 (4/5) | Half-body — голова + торс до пояса. |
| Footer/credit thumbnails (опц) | 600×600 (1/1) | Square crop с лицом по центру. |

Из одного исходника генерируем все три варианта через Astro `<Image>` (`densities={[1, 2]}`).

### Шаг 6 · Согласование

ИИ-нормализация — это редактирование уже опубликованного снимка. Формально это допустимо в рамках авторских прав (если оригинал был согласован пациентом-публиковать-как-врача). Но прежде чем публиковать на новом сайте:

1. Показать врачу финальный кадр.
2. Подтвердить с клиентом.
3. **Не менять ничего лица** — только окружение.

Если врач говорит «не похоже на меня» — откатываемся к оригиналу или назначаем пересъёмку.

### Шаг 7 · Pipeline в репозитории

```
src/assets/doctors/
├── _originals/                  ← скачанные с kzn.platinental.ru, не публикуем
│   ├── meloyan-original.png
│   └── …
├── _normalized/                 ← после ИИ, до treatment
│   ├── meloyan-normalized.png
│   └── …
└── final/                       ← после LUT, готовы к Astro <Image>
    ├── meloyan.jpg
    ├── tulatova.jpg
    └── …
```

В коде:
```astro
import meloyan from '~/assets/doctors/final/meloyan.jpg';
<Image src={meloyan} alt="Доктор Мелоян Мхитар Мисакович" widths={[450, 900, 1350]} sizes="(min-width: 1024px) 25vw, 50vw" />
```

`public/doctors/<slug>/photo.{png,jpg}` — оставить как **fallback** для legacy и для существующего прототипа на `/`.

---

## Fallback: пересъёмка

Если ИИ-нормализация роняет узнаваемость (≥2 врача из 8) или клиент против ИИ — заказываем студийную пересъёмку.

- Контакт: **@aleksa_chernyshova** (см. `CLAUDE.md` Gotchas).
- Брифинг фотографа: один день в студии, 8 портретов, fixed setup (cream backdrop + Profoto soft box 45° + Profoto fill).
- Бюджет: уточнить.

---

## Что выдать клиенту

Для согласования отправляем PDF с:
1. Оригиналом (с kzn).
2. Нормализованной версией (3/4, cream backdrop, цветная).
3. Финалом с LUT.

Мини-сравнение «до/после» по каждому врачу. Если согласовано — публикуем.
