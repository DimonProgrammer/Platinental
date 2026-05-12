# Аудит AI-сетапа Платиненталь

Дата: 2026-05-07  
Задача: оценить текущий Codex/skills/MCP/Obsidian setup перед правками структуры и текстов от ЛПРа.  
Граница аудита: не менять `AGENTS.md`, `.codex/config.toml`, skills, Obsidian-структуру и код сайта. Единственное изменение в рамках задачи - этот отчет.

## Current state

### Инструкции и память

- `AGENTS.md` - главный project guidance для Codex, 250 строк. В нем смешаны факты о клинике, дизайн-правила, workflow, Obsidian-команды, TickTick, decisions и gotchas.
- `MEMORY.md` - актуальная проектная память на 86 строк. Содержит состояние v3, визуальные решения, проверку от 2026-05-01 и список следующих работ.
- `memory/MEMORY.md` - старая локальная память на 38 строк. В ней остались устаревшие факты: стек `TBD`, ссылка на `~/.claude/skills`, палитра и акцент `TBD`.
- `.codex/config.toml` - repo-local MCP config. Подключает Context7, Exa и TickTick. В файле лежат реальные секреты Exa и TickTick.
- `.claude/agents/design-reviewer.md` и `.codex/agents/design-reviewer.toml` - есть оба формата агента. Фактический readable prompt найден в `.claude/agents/design-reviewer.md`; он ссылается на Playwright MCP tools с claude-plugin namespace.

### MCP и harness

- Global `~/.codex/config.toml` уже содержит Exa, Pencil, Context7, frontend-design, Playwright, Superpowers, Figma, GitHub, Vercel, Notion и Browser Use.
- Repo `.codex/config.toml` дублирует Context7 и Exa, добавляет TickTick, но хранит токены в tracked/visible project config.
- `AGENTS.md` требует Exa для веб-поиска, Context7 для документации и Playwright visual check после любого frontend-изменения.
- В `package.json` есть `npm run check`, `npm run build`, `npm run deploy`, `npm run ship`. `deploy` идет через Vercel, хотя проектные решения говорят о Beget/Timeweb как целевом российском хостинге.

### Skills inventory

- В `~/.agents/skills` найдено 67 пользовательских skills. В начальном контексте Codex видит только часть из-за budget на список skills, поэтому перегруженный набор снижает надежность implicit invocation.
- Обязательный проектный skill `static-site-ru` есть и подходит: формы, 152-ФЗ, Yandex-first SEO, статический сайт на российском хостинге.
- Есть релевантные skills: `frontend-design`, `editor`, `copy-validator`, `deep-research`, `ads-*`, `code-review`, `code-reviewer`, `technical-writer`, `skill-creator`, `webapp-testing`.
- В `AGENTS.md` указан `copywrite`, но такого skill в найденном списке нет. Реальные ближайшие skills - `editor`, `copy-validator`, `content-creator`.

### Obsidian readiness

- В проекте есть папка `daily/`, но файлов daily notes не найдено.
- В проекте пока нет `raw/` и `wiki/`.
- У проекта уже есть `knowledge/` как source of truth по фактам клиники и `docs/` как рабочие гайды. Это не заменяет Obsidian wiki, но дает сильный seed.
- Рабочий образец найден в `/Users/dima/Downloads/Projects/Jarvis/CLAUDE.md`: `raw/` неизменяемый слой, `wiki/` как управляемый слой, `wiki/index.md`, `wiki/log.md`, entity/concept/source/synthesis страницы и правила ingest/query/lint.

### Content workflow

- Источники правды уже есть: `knowledge/INDEX.md`, `knowledge/doctors.md`, `knowledge/prices.md`, `knowledge/brand-voice.md`, `knowledge/audience-jtbd.md`, `docs/content-rules.md`, `docs/copywriting-prompts.md`.
- `knowledge/INDEX.md` прямо говорит: для написания текста использовать `docs/copywriting-prompts.md` + `docs/content-rules.md`; факты по врачам - `knowledge/doctors.md`; цены - `knowledge/prices.md`.
- `docs/content-rules.md` содержит сильные правила: экспертный тон, антиклише, юридические запреты, источники фактов, запрет выдумывать врачей/цены/адреса/лицензии/статистику.
- `docs/copywriting-prompts.md` частично устарел: hero-промпт содержит "20+ лет бренд", "московские корни", "6 пластических хирургов, 1 косметолог" и адрес. Это конфликтует с подтвержденным позиционированием и правилом не писать конкретное число врачей в копирайте.

## Findings

### P0 - реальные секреты лежат в repo-local `.codex/config.toml`

Файл: `.codex/config.toml`, строки 8-20.  
Эффект: Exa API key и TickTick access/client secrets доступны в рабочем дереве проекта. Даже если `.codex/` сейчас untracked, это высокий риск случайного коммита, архивации или передачи проекта подрядчику.  
Рекомендация: вынести секреты в user-level `~/.codex/config.toml`, env vars или отдельный gitignored local config; repo config должен содержать только имена серверов без секретов.

### P0 - copywriting prompt генерирует запрещенное позиционирование

Файл: `docs/copywriting-prompts.md`, строки 85-90 и пример на строках 104-106.  
Эффект: AI получает "московские корни", фиксированное число врачей и адрес как вводные для hero. Это прямо провоцирует тексты, которые нарушают `AGENTS.md` строки 9-16 и контентное правило не выдумывать/не фиксировать состав команды.  
Рекомендация: перед правками ЛПРа создать content gate: любой текст сначала проходит fact-check against `knowledge/brand-voice.md`, `knowledge/doctors.md`, `knowledge/prices.md`, затем anti-AI edit against `docs/content-rules.md`.

### P1 - `AGENTS.md` перегружен и смешивает behavior contract с энциклопедией

Файл: `AGENTS.md`, 250 строк.  
Эффект: в одном auto-loaded файле лежат факты, workflow, vault-команды, TickTick, решения, gotchas, skill table и инфраструктура. Официальная модель Codex рекомендует держать `AGENTS.md` небольшим project guidance; repeatable workflow выносить в skills, а внешние системы - в MCP. Исследование SAAS также фиксирует принцип "behavior contract, not documentation".  
Рекомендация: после аудита сократить `AGENTS.md` до правил, которые должны менять поведение всегда; подробные design/content/dev workflows вынести в project skills и ссылочные docs.

### P1 - конфликт `.claude`, `.Codex`, `.codex` и фактических путей

Файлы: `AGENTS.md` строки 73, 106, 110, 130; `MEMORY.md` строки 3, 50, 62, 79, 83.  
Эффект: инструкции ссылаются на `.Codex/agents/design-reviewer.md`, `~/.Codex/skills`, `~/.claude/settings.json`, `~/.claude/plans`, хотя текущая Codex-среда использует `~/.codex`, `.codex/` и skills из `~/.agents/skills`. Это снижает надежность следования инструкциям.  
Рекомендация: оставить совместимость только там, где реально нужен Claude Code; для Codex прописать canonical paths: `~/.codex/config.toml`, `.codex/config.toml`, `~/.agents/skills`, `.agents/skills`.

### P1 - repo `deploy` противоречит 152-ФЗ hosting decision

Файлы: `package.json` script `deploy`; `AGENTS.md` строки 87-98, 222-229; `MEMORY.md` строка 70.  
Эффект: `npm run ship` вызывает `npx vercel --prod --yes`, но проектные правила говорят о Beget/Timeweb как целевом российском хостинге. Для рекламного медицинского сайта с персональными данными это риск неверного deploy workflow.  
Рекомендация: до реального запуска разделить `build-preview` и `deploy-prod`; production deploy не должен отправлять формы или персональные данные на зарубежную инфраструктуру.

### P1 - Obsidian-команды описаны, но проектная wiki не создана

Файл: `AGENTS.md` строки 156-188; файловая система проекта.  
Эффект: Codex получает команды `/today`, `/trace`, `/connect`, `/graduate`, но в проекте нет `wiki/index.md`, `wiki/log.md`, `raw/` и daily notes. Это создает ложное ожидание работающего vault workflow.  
Рекомендация: либо временно пометить Obsidian-команды как planned, либо создать минимальную project wiki отдельным шагом.

### P2 - `memory/MEMORY.md` устарел и конфликтует с root `MEMORY.md`

Файл: `memory/MEMORY.md`, строки 10-21 и 28.  
Эффект: старая память говорит "Стек TBD", "провайдер TBD", `~/.claude/skills`, хотя root `MEMORY.md` и `AGENTS.md` уже фиксируют Astro 5 + Tailwind v4, текущий visual state и Codex setup.  
Рекомендация: после аудита оставить один canonical memory index или явно пометить `memory/MEMORY.md` как legacy.

### P2 - visual QA agent содержит устаревшие/сомнительные content checks

Файл: `.claude/agents/design-reviewer.md`, строки 62-66.  
Эффект: агент должен проверять наличие "американский бренд" и ASPS/ISAPS/IPRAS credentials, хотя `AGENTS.md` запрещает "американский бренд" и уточняет, что ASPS/ISAPS/IPRAS - личные квалификации конкретных врачей, не признак международной сети.  
Рекомендация: обновить роль design-reviewer так, чтобы content check искал запрещенные формулировки, а не требовал их присутствия.

### P2 - skill table содержит отсутствующий skill и лишние broad skills

Файл: `AGENTS.md`, строки 112-130.  
Эффект: `copywrite` не найден; `fullstack-developer`, `ui-ux-pro-max`, `content-creator`, `master-router` и широкие рекламные skills могут вызываться не к месту.  
Рекомендация: сделать короткую таблицу project-relevant skills и перенести расширенный каталог в отдельный reference doc или project skill.

## Skills matrix

| Skill / group | Classification | Когда использовать | Комментарий |
| --- | --- | --- | --- |
| `static-site-ru` | keep | Любая верстка, формы, SEO, 152-ФЗ, российский хостинг | Обязательный project skill. |
| `frontend-design` | keep | UI-компоненты, страницы, визуальная система | Использовать вместе с design docs и visual check. |
| `editor` | keep | Редактура русских текстов после fact-check | Главный кандидат против "ИИшных" текстов. |
| `copy-validator` | keep | Финальная проверка текста на штампы, тон, риск обещаний | Лучше как gate перед внедрением текста в Astro. |
| `deep-research` | explicit-only | Новые факты, конкуренты, медицина, правила рекламы | Только когда нужен research; веб-поиск через Exa. |
| `ads`, `ads-audit`, `ads-landing`, `ads-yandex` отсутствует | explicit-only | Посадки под Яндекс Директ, рекламная релевантность, офферы | Нет отдельного Yandex skill; использовать `ads`/`ads-landing` осторожно. |
| `ads-google`, `ads-meta`, `ads-tiktok`, `ads-linkedin`, `ads-youtube` | ignore | Не использовать для текущего проекта без явного запроса | Каналы не являются текущим фокусом. |
| `code-review`, `code-reviewer` | keep | Ревью перед ship, поиск регрессий и missing tests | Для UI отдельно нужен design-reviewer/Playwright. |
| `webapp-testing`, `gstack`/`qa` | explicit-only | Браузерная QA-проверка | Не смешивать с mandatory Playwright visual protocol. |
| `technical-writer` | keep | Аудиты, гайды, setup docs | Использован для этого документа. |
| `skill-creator` | candidate for project skill | Создание `platinental-content-editor`, `platinental-visual-qa`, `platinental-ship` | Не создавать до завершения аудита. |
| `fullstack-developer` | explicit-only | Только если появится backend/forms API | Сейчас сайт статический. |
| `ui-ux-pro-max`, `ux-designer`, `ui-scout` | explicit-only | Стратегические UX-решения и референсы | Не для рядовых правок текста. |
| `content-creator`, `dotcom-secrets`, `funnel-*` | ignore | Не использовать для медицинского premium copy без явного запроса | Высокий риск "пошлого" продающего тона. |
| `fact-checker` | candidate for project skill | Проверка фактов врачей, цен, лицензии, адреса | Лучше встроить в project content gate. |

## Harness matrix

| Tool / harness | Purpose | Current status | Risk | Recommendation |
| --- | --- | --- | --- | --- |
| Exa MCP | Web search/fetch | Global и repo config подключены | Repo config содержит API key | Оставить Exa как обязательный web search, секрет вынести из repo. |
| Context7 | Документация библиотек | Global и repo config подключены | `@latest` может менять поведение | Оставить; для критичных задач фиксировать версии docs manually. |
| Playwright MCP / CLI | Visual loop и browser QA | Plugin включен; AGENTS описывает CLI protocol | Инструкции смешивают CLI и MCP; previous MEMORY фиксирует сбои Chromium | Оставить hybrid: MCP для exploration, CLI/screenshots для repeatable evidence. |
| Superpowers | Plan/TDD/review workflows | Plugin включен global | Может конфликтовать с Default/Plan режимом Codex app | Использовать как методологию и skills, не как обязательный auto-flow для малых задач. |
| Browser Use | In-app browser interaction | Plugin включен | Дублирует Playwright для localhost | Использовать только при явном запросе открыть/кликать в браузере. |
| GitHub | PR/issues/repo work | Plugin включен | Не нужен для текущего локального аудита | Оставить для ship/review, не использовать для контента без задачи. |
| Vercel | Deploy/previews | Plugin включен; `package.json` deploy на Vercel | Конфликт с 152-ФЗ production hosting | Разрешить preview-only; production deploy пересмотреть. |
| Figma/Pencil | Design references/prototypes | Включены/упомянуты | Может тащить новый дизайн вместо утвержденного | Использовать только для новых дизайн-решений, не для copy edits. |
| TickTick MCP | Tasks | Repo config подключен с tokens | Секреты в repo config; команды в AGENTS предполагают active workflow | Вынести в user config; в project AGENTS оставить только project_id без токенов. |

## Obsidian recommendation

Создавать отдельную project wiki внутри Платиненталя, не смешивать с Jarvis. Jarvis-образец переносить как структуру, не как содержимое.

Минимальная схема:

```text
raw/
  sources/          # клиентские брифы, правки ЛПРа, выгрузки, web fetch summaries
  web-clipped/      # статьи, конкуренты, документы
  assets/           # скриншоты, PDF, изображения для анализа
wiki/
  entities/         # клиника, врачи, ЛПР, конкуренты, инструменты
  concepts/         # позиционирование, anti-ai-copy, 152-fz, direct-landing
  sources/          # one source = one summary
  synthesis/        # ответы и выводы по задачам
  content/          # редакторские решения по страницам и блокам
  index.md
  log.md
daily/
  YYYY-MM-DD.md
```

Правила для project wiki:

- `knowledge/` остается source of truth для фактов, которые идут на сайт.
- `wiki/` хранит историю мышления, источники, противоречия и синтезы.
- Любой ingest правок ЛПРа создает `wiki/sources/<date>-lpr-feedback.md`, обновляет `wiki/content/<page>.md`, затем при необходимости обновляет `knowledge/`.
- Любой нетривиальный вывод сохраняется в `wiki/synthesis/`.
- `wiki/log.md` обязателен для каждого ingest/query.

## Content workflow risk

Почему тексты стали "ИИшными":

- Генератор получает слишком общий creative prompt и недостаточно жесткий fact gate.
- `docs/copywriting-prompts.md` содержит устаревшие вводные, которые провоцируют forbidden claims.
- Нет отдельного этапа "редактор против AI-маркеров" перед внедрением в `.astro`.
- Нет механизма diff-by-intent: что именно правит ЛПР, какую структуру он меняет, какие старые блоки должны умереть.
- Контентные правила есть, но они справочные; они не оформлены как обязательный workflow skill.

Минимальный gate перед следующими правками:

1. `Fact pass`: сверить врачей, цены, адрес, лицензию, позиционирование с `knowledge/`.
2. `Structure pass`: сохранить правку ЛПРа как решение по странице/блоку.
3. `Anti-AI edit`: убрать AI-маркеры из `docs/copywriting-prompts.md` строк 48-65 и клише из `docs/content-rules.md` строк 18-31.
4. `Legal pass`: проверить 38-ФЗ/323-ФЗ/152-ФЗ правила из `docs/content-rules.md` строк 35-72.
5. `Implementation pass`: только после этого переносить текст в Astro.

## Next setup backlog

Не выполнять в рамках этого аудита:

1. Убрать секреты из `.codex/config.toml`, перенести TickTick/Exa в user-level config или env.
2. Сократить `AGENTS.md` до behavior contract и поправить устаревшие пути `.Codex/.claude/.codex`.
3. Исправить `docs/copywriting-prompts.md`: убрать "московские корни", фиксированное число врачей, неподтвержденные/опасные формулировки.
4. Создать project skill `platinental-content-editor`: fact pass, anti-AI edit, legal pass, implementation handoff.
5. Создать project wiki skeleton `raw/`, `wiki/`, `wiki/index.md`, `wiki/log.md`.
6. Обновить design-reviewer content checks: искать forbidden claims, а не требовать запрещенные формулировки.
7. Разделить preview deploy и production deploy с учетом Beget/Timeweb и 152-ФЗ.
8. Создать короткую `docs/ai-harness-guide.md` или `memory/skills-guide.md` с фактической матрицей skills.

## Verification

- Конфиги, skills, Obsidian-структура и код сайта не изменялись.
- Внешняя модель Codex учтена: `AGENTS.md` - для durable behavior guidance; skills - для повторяемых workflow; MCP - для внешних систем; subagents - для специализированной делегации.
- Секреты в `.codex/config.toml` отмечены как P0 без копирования значений.
- Все ключевые выводы привязаны к локальным путям и строкам.

Внешние источники:

- [Codex customization](https://developers.openai.com/codex/concepts/customization) - `AGENTS.md`, memories, skills, MCP и subagents как разные слои настройки.
- [Custom instructions with AGENTS.md](https://developers.openai.com/codex/guides/agents-md) - Codex discovery order, global/project scopes, limit and nested overrides.
- [Agent Skills](https://developers.openai.com/codex/skills) - progressive disclosure, skill locations, implicit invocation and best practices.
- [Playwright MCP](https://playwright.dev/docs/getting-started-mcp) - accessibility snapshots, browser interaction, screenshots, console/network/storage.
- [Obsidian as a Personal OS for AI Coding Agents](https://www.railly.dev/blog/agentic-second-brain/) - vault as persistence layer, `AGENTS.md`/`CLAUDE.md` as personality layer, project context files.

Локальные источники:

- `AGENTS.md`
- `MEMORY.md`
- `memory/MEMORY.md`
- `.codex/config.toml`
- `.claude/agents/design-reviewer.md`
- `knowledge/INDEX.md`
- `docs/content-rules.md`
- `docs/copywriting-prompts.md`
- `/Users/dima/Downloads/Projects/Jarvis/CLAUDE.md`
- `/Users/dima/Downloads/Projects/SAAS для Огней/docs/superpowers/specs/2026-04-22-project-methodology/research-topics.md`
- `/Users/dima/Downloads/Projects/SAAS для Огней/docs/superpowers/specs/2026-04-22-project-methodology/research-practitioners.md`
