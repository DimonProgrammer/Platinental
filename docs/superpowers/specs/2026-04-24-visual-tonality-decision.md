# Visual Tonality Decision — Track A Editorial B&W

**Дата:** 2026-04-24  
**Статус:** Подтверждено клиентом/пользователем  
**Решение: T2 — Low-Key Dramatic B&W**

---

## Тест

Одна фотография (Unsplash `h28TMf4Qhko` — профиль шеи и плеча) в трёх CSS-тональностях:

| Вариант | Фильтр | Характер |
|---------|--------|----------|
| T1 High-Key | `grayscale(100%) brightness(1.35) contrast(0.78)` | Светлый, минимальный контраст, много белого |
| **T2 Low-Key** | `grayscale(100%) brightness(0.78) contrast(1.18)` | Глубокие тени, драматичный, высокий контраст |
| T3 Warm Mono | `sepia(55%) saturate(18%) brightness(1.05) contrast(0.88)` | Тёплая монохромия, sepia-оттенок |

## Выбор: T2

CSS-фильтр для всех Track A editorial-фотографий:

```css
filter: grayscale(100%) brightness(0.78) contrast(1.18);
```

## Применение

**Track A слоты** (editorial B&W body fragments):
- `ServicesGrid` — карточки направлений (`.direction__photo--a`, `--b`, `--c`)
- `QuoteBridge` — фоновое editorial-изображение (если используется)
- Любые ambient editorial-слоты на внутренних страницах

**Track C слоты** (material & light) — без этого фильтра, натуральные тона.

## Замечание по контексту

Тест проводился на фоне ServicesGrid (cream `#FFFDF8`). T2 создаёт высокий контраст между тёмным изображением и светлым фоном — это допустимо, так как карточки имеют `border-radius` и `overflow: hidden`, визуально изолируя фото.

При интеграции: убедиться, что `object-fit: cover` + `object-position: center top` сохраняет ключевую часть кадра (шея, ключица, плечо — без лица).

---

*Тестовые файлы удалены: `src/pages/test-tonality.astro`, `public/test-tonality/`*
