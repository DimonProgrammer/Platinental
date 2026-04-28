# 03 · Источники ассетов

## Сводная таблица

| Источник | Что брать | Лицензия | Из РФ | Качество для нас |
|---|---|---|---|---|
| **Unsplash** | Track C: material, light, interior | Free, commercial | ✅ Да | ★★★★ |
| **Pexels** | Track C: ambient | Free, commercial | ✅ Да | ★★★ |
| **Cosmos.so** | Только мудборд / inspiration | Только inspiration, не для production | ✅ Да | ★★★★★ |
| **Pinterest** | Только мудборд / inspiration | Только inspiration | ✅ Да | ★★★ |
| **Unsplash+** (платный) | Track A premium B&W | Paid (с подпиской) | ⚠️ Только через VPN+чужая карта | ★★★★ |
| **Stocksy / Twenty20 / Death to Stock** | Track A premium | Paid | ❌ Оплата из РФ закрыта | ★★★★★ |
| **AdobeStock** | Track A | Paid + per-asset | ⚠️ Через VPN+карта | ★★★★ |
| **Getty / Shutterstock** | — | Paid + per-asset | ❌ Оплата закрыта | ★★ (избито) |
| **Midjourney v7** | Track A custom | Pro plan = commercial OK | ⚠️ Через VPN | ★★★★ |
| **Flux Pro / Kontext** | Track B (нормализация врачей) | Через API (commercial OK) | ⚠️ Через API + посредник | ★★★★★ |
| **Nano Banana 2** | Любая правка | Commercial OK | ⚠️ Через VPN | ★★★ |
| **Krea AI** | Real-time gen | Commercial OK | ⚠️ Через VPN | ★★★ |

**Легенда:** ✅ работает прямо из РФ. ⚠️ нужны VPN/посредник/чужая карта. ❌ оплата невозможна.

---

## Подробно по источникам

### Unsplash (✅ свободно)
**URL:** https://unsplash.com
**Лицензия:** Unsplash License — free for commercial use, без указания автора (но рекомендовано). [Лицензия](https://unsplash.com/license).

**Сильные темы для нас:**
- `architecture interior light` — для H1 hero (если нет своего фото клиники).
- `serum drop skin macro` — для S2.
- `ceramic jar minimalism` — для S3.
- `linen texture warm light` — для дивайдеров.

**Поиск-запросы (английский):**
```
warm interior natural light minimal
serum drop water skin macro
ceramic skincare jar still life
neutral apothecary product
soft window light bedroom
white linen texture
female collarbone profile black and white editorial
hand profile editorial
```

**Фильтры:** ориентация Portrait, цвет «warm/beige».

**Подводный камень:** Unsplash наводнён «Lifestyle stock» с улыбающимися людьми. Берём только material/light, фигуры — выборочно.

---

### Pexels (✅ свободно)
**URL:** https://pexels.com
**Лицензия:** Pexels License — free commercial.

**Темы:** перекрывается с Unsplash. Иногда уникальные кадры material macro.

---

### Cosmos.so (✅ для inspiration)
**URL:** https://cosmos.so
**Лицензия:** **только мудборд / референс**. Большинство контента — это репост чужих авторских работ. **Не использовать в production.**

**Применение:** мудборд с тегом `editorial-bw-body` или `aesop-look`, и потом по моду найти аналог на Unsplash или сгенерить.

---

### Pinterest (✅ для inspiration)
**Применение:** только сборка мудборда. На production — никогда.

---

### Stocksy (❌ из РФ)
**URL:** https://stocksy.com
**Цена:** $15–$50 за файл.
**Качество:** одно из лучших для editorial premium (особенно body fragments B&W).

**Альтернатива:** AI-gen Midjourney v7 в стиле Stocksy.

---

### Midjourney v7 (⚠️ через VPN)
**URL:** https://midjourney.com
**Цена:** $30–$60/мес (Standard / Pro).
**Лицензия:** Pro plan включает commercial use.

**Сильные темы:**
- Track A: B&W body fragments, editorial portraits (без identifying features).
- Track C: material macros, atmospheric interiors.

**Параметры качества:**
```
--v 7 --style raw --ar 4:5 --quality 2
```

**Под кириллицу** не подходит (текст не нужен в фото).

---

### Flux Pro Kontext (⚠️ через API + посредник)
**URL:** https://blackforestlabs.ai (Black Forest Labs Flux)
**Цена:** $0.04 / generation
**Лицензия:** commercial OK.

**Сила:** identity-preserving image-to-image edit. **Лучший выбор для нормализации врачей** (см. `02-doctors-normalization.md`).

**Доступ из РФ:** через API, оплата через посредника (Replicate, Fal.ai через прокси).

**Параметры:**
- `strength: 0.30–0.40` для сохранения личности.
- `prompt strength: 7.0`.

---

### Nano Banana 2 (⚠️ через VPN)
**URL:** https://gemini.google.com/banana или через MCP-плагин (упоминается в MEMORY.md).
**Лицензия:** commercial OK (Google Gemini Pro).
**Сила:** быстрая правка фона и цвета.
**Слабость:** identity preservation хуже, чем Flux Kontext.

---

## Антитоп — НЕ использовать

❌ **Shutterstock / Getty:**
- Избитые «medical clinic» стоки.
- Дорого + оплата из РФ закрыта.
- Очень узнаваемая «sok-фотография».

❌ **Любые «happy people in white coats»:**
- Tier 3 anti-pattern.
- В нашей дизайн-системе строго запрещено.

❌ **Бренды-конкуренты в кадре:**
- Никаких этикеток Vichy / La Roche-Posay / Dr. Sturm в S3 (космецевтика).
- Только blank-флаконы или AI-gen с нейтральной упаковкой.

❌ **Stock «hands holding face cream»:**
- Cliché. Если нужен product shot — снимать или AI-gen с editorial-логикой.

---

## Workflow выбора источника

```
1. Нужен ассет под слот → проверить, есть ли у клиента.
2. Если нет → Unsplash/Pexels.
3. Если не нашли → Midjourney v7 (Track A/C) или Flux Pro (Track B).
4. Если не получилось → пересъёмка (контакт фотографа).
```

**Никогда:**
- Не использовать Pinterest-картинку в production.
- Не использовать Cosmos.so в production.
- Не использовать «model release не указан».

---

## Бюджет

| Категория | Кол-во ассетов | Источник | Примерный cost |
|---|---|---|---|
| Track A (5–6 кадров для главной) | 5–6 | Unsplash + Midjourney | $30 (Midjourney 1 мес) |
| Track B (8 врачей) | 8 нормализаций | Flux Pro Kontext | ~$2 (8 × $0.04 × 5 итераций) |
| Track C (4–5 кадров для главной) | 4–5 | Unsplash | $0 |
| BeforeAfter (12 кадров, 6 кейсов) | от клиента | — | $0 |

**Итого:** ~$32 (один месяц Midjourney + микропотраченное на Flux).

Если решили пересъёмка вместо ИИ-нормализации врачей — добавляется фотосессия (TBD по бюджету).
