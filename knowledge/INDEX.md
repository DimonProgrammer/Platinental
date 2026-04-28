# Knowledge Index

Карта файлов базы знаний. Обновлять при добавлении нового файла.

## docs/prd/ — Требования к страницам (PRD)

| Файл | Страница |
| --- | --- |
| [01-doctors.md](../docs/prd/01-doctors.md) | /doctors/ — Врачи: карточки, профили, FAQ |
| [02-plastika.md](../docs/prd/02-plastika.md) | /plastika/ — Пластика: 27 операций, фильтр, FAQ |
| [03-kosmetologiya.md](../docs/prd/03-kosmetologiya.md) | /kosmetologiya/ — Косметология: 28 процедур, фильтр, FAQ |
| [04-about.md](../docs/prd/04-about.md) | /about/ — О клинике: философия, бренд, РНИМУ |
| [05-prices.md](../docs/prd/05-prices.md) | /prices/ — Цены: 200+ позиций по категориям |
| [06-contacts-documents-404.md](../docs/prd/06-contacts-documents-404.md) | Контакты + Документы + 404 |
| [07-kosmecevtika.md](../docs/prd/07-kosmecevtika.md) | /kosmecevtika/ — Космецевтика: каталог без e-commerce |

## docs/superpowers/specs/ — Текстовые прототипы

| Файл | Содержание |
| --- | --- |
| [2026-04-16-internal-pages-copy.md](../docs/superpowers/specs/2026-04-16-internal-pages-copy.md) | Черновики текстов всех внутренних страниц |

## docs/

| Файл | Содержание |
| --- | --- |
| [site-architecture.md](../docs/site-architecture.md) | Полная архитектура сайта: 7 страниц, 55 услуг, 3 направления, SEO, CTA, цели Метрики |
| [design-brief.md](../docs/design-brief.md) | Дизайн-бриф для Максима: палитра, типографика, референсы, must-have |
| [content-rules.md](../docs/content-rules.md) | Правила контента: тон, антиклише, юрид. требования (38-ФЗ, 152-ФЗ), SEO-шаблоны |
| [copywriting-prompts.md](../docs/copywriting-prompts.md) | **Система копирайтинга:** промпты для каждого типа текста, матрица JTBD, примеры до/после, заголовки под Директ |
| [brief-filled.md](../docs/brief-filled.md) | Заполненный бриф (11 вопросов) для согласования с клиентом |
| [questions-for-client.md](../docs/questions-for-client.md) | 16 вопросов клиенту, по приоритетам (блокирующие / важные / позже) |
| [project-context.md](../docs/project-context.md) | Контекст: роли команды, рабочий процесс, ссылки |

## knowledge/ — Фактические данные о клинике

| Файл | Содержание |
| --- | --- |
| [doctors.md](doctors.md) | Врачи клиники: ФИО, специализация, образование, цены консультаций. **Единственный источник правды по врачам** (состав меняется — всегда сверяться с этим файлом и `src/data/doctors.ts`). |
| [prices.md](prices.md) | Полный прайс: пластика лица/тела, косметология, консультации. Уточнить актуальность у клиента. |
| [brand-voice.md](brand-voice.md) | Философия бренда, цитаты с platinental.ru, готовые адаптации для Казани, стилистика |
| [reviews-research.md](reviews-research.md) | Исследование отзывов (апрель 2026): ПроДокторов, Yell.ru, Яндекс.Карты. Паттерны + риски + готовые формулировки для social proof. |
| [moscow-site-analysis.md](moscow-site-analysis.md) | Анализ текстов platinental.ru (Москва): готовые формулировки, паттерны подачи, что перенять и что НЕ переносить для Казани. |

## knowledge/marketing/ — Рынок и аудитория

| Файл | Содержание |
| --- | --- |
| [competitors-cosmetology.md](competitors-cosmetology.md) | 8 конкурентов по косметологии: URL, позиционирование, цены, выводы |
| [competitors-plastic-surgery.md](competitors-plastic-surgery.md) | 10 конкурентов по пластике: URL, особенности, ценовая карта, Корл как партнёр |
| [audience-jtbd.md](audience-jtbd.md) | 5 JTBD-сегментов ЦА: демография, триггеры, страхи, месседжи |

## Быстрый доступ по задаче

| Задача | Файл |
| --- | --- |
| Писать текст для страницы | `docs/copywriting-prompts.md` + `docs/content-rules.md` |
| Понять аудиторию и триггеры | `knowledge/audience-jtbd.md` |
| Понять конкурентов | `knowledge/competitors-*.md` |
| Спроектировать страницу | `docs/site-architecture.md` |
| Сделать дизайн | `docs/design-brief.md` |
| Проверить юридические требования | `docs/content-rules.md` (раздел "Юридические требования") |
| Узнать контакты/адрес/цены | `docs/site-architecture.md` → страницы врачей / цен |
