# Фото-план Platinental

Глубокая проработка визуального ассета: что нужно, откуда брать, как нормализовать.

## Файлы

| # | Файл | Что внутри |
|---|---|---|
| 00 | [`00-overview.md`](00-overview.md) | Стратегия: тон, треки A/B/C, treatment, антитоп |
| 01 | [`01-homepage-slots.md`](01-homepage-slots.md) | Все image-слоты главной (H1, S1–S3, D1–D4, BA, CV) с описаниями и ratios |
| 02 | [`02-doctors-normalization.md`](02-doctors-normalization.md) | Workflow приведения 8 портретов с kzn.platinental.ru к единому стилю через ИИ |
| 03 | [`03-stock-sources.md`](03-stock-sources.md) | Источники: Unsplash / Pexels / Cosmos.so / AI-gen — лицензии и доступность из РФ |
| 04 | [`04-ai-prompts.md`](04-ai-prompts.md) | Готовые промпты для ИИ (нормализация врачей + ambient imagery) |
| 05 | [`05-asset-checklist.md`](05-asset-checklist.md) | Списки P0/P1/P2 — что найти/сгенерить и в каком порядке |

## Связи

- **Контент-документ:** [`docs/content/homepage.md`](../content/homepage.md)
- **Дизайн-стратегия:** [`docs/design-research/00-synthesis-v2.md`](../design-research/00-synthesis-v2.md)
- **Визуальное направление (старая память):** `~/.claude/projects/.../memory/project_visual_content_direction.md`
- **Контакт фотографа:** @aleksa_chernyshova (см. `CLAUDE.md` → Gotchas)

## Порядок работы

1. Прочитать `00-overview.md` — общая логика.
2. Открыть `01-homepage-slots.md` рядом с `docs/content/homepage.md` — сопоставить слоты.
3. Для портретов врачей — `02-doctors-normalization.md`.
4. Для AI-генерации — `04-ai-prompts.md` (готовые промпты копируются в Midjourney/Flux/Nano Banana).
5. По мере получения ассетов — отмечать в `05-asset-checklist.md`.
