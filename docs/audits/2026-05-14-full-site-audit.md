# Полный аудит нового сайта The Platinental Казань

Дата: 2026-05-14  
Scope: новая Astro-сборка. Старый WordPress на `kzn.platinental.ru` не аудировался подробно.  
Артефакт: карта добивки перед сдачей сайта.

## Executive summary

Сайт собирается и типизируется без ошибок: `npm run check` — 0 errors / 0 warnings / 0 hints, `npm run build` — 25 страниц. На проверенных desktop/mobile viewport нет горизонтального скролла, на ключевых страницах по одному H1, формы содержат телефон и обязательный чекбокс согласия.

После fix-pass 2026-05-14 публичные ссылки на отсутствующие локальные документы/изображения убраны из rendered HTML, 404-страница закрыта `noindex, follow`, `/dokumenty/` канонизирован на `/documents/`, врачебные страницы получили `Physician` + `BreadcrumbList`, формы и клики получили события `reachGoal`-обвязки. Метрика подключается только после передачи `YANDEX_COUNTER_ID` / `PUBLIC_YANDEX_COUNTER_ID`; без реального ID скрипт счётчика не рендерится.

До сдачи остаются внешние/контентные блокеры: получить номер счётчика Метрики, реальные юридические файлы, актуальную ссылку Max, доступы к домену/DNS/хостингу/Метрике/Вебмастеру. Технически ещё желательно настроить настоящий серверный 301 для `/dokumenty/` на хостинге и добить тяжёлые PNG/WebP-версии ассетов.

## Verification log

- `npm run check` — passed, 62 files, 0 errors / 0 warnings / 0 hints.
- `npm run build` — passed, 25 pages generated.
- `dist` audit — проверены title, description, canonical, H1, JSON-LD, duplicates, sitemap, robots, локальные ссылки и размеры файлов.
- Playwright — проверены `/`, `/about/`, `/plastika/`, `/kosmetologiya/`, `/kosmecevtika/`, `/prices/`, `/doctors/`, `/doctors/vasilev/`, `/doctors/mamedov/`, `/doctors/babayan/`, `/contacts/`, `/documents/`, `/privacy/`, `/consent/`, `/terms/`, `/404` на 1440x900 и 375x812.
- Rendered text grep — запрещённые публичные формулировки не найдены на production-страницах; одно совпадение `Это не...` есть только на noindex/disallow review-странице.

## Fix pass 2026-05-14

Закрыто в коде:

- Убраны публичные 404 по `/before-after/mamedov-platysmoplasty-home.jpg` и `/doctors/mamedov/cases/01.jpg`: соответствующие кейсы/галерея временно не рендерятся.
- Юридические страницы больше не выводят ссылки скачивания на отсутствующие локальные файлы; для отсутствующих документов показывается честный статус `Файл готовим`.
- Добавлена условная Яндекс.Метрика и единый helper `window.platinentalReachGoal`; без ID счётчика скрипт не включается.
- Добавлены цели для submit форм, телефона, WhatsApp, Telegram, Max, цен, врачей и записи.
- 404-страница получила `noindex, follow`, canonical на главную и не выводит `MedicalClinic` JSON-LD.
- `/dokumenty/` получил `noindex, follow`, canonical `/documents/` и не выводит clinic schema.
- Врачебные страницы получили `Physician` и `BreadcrumbList` JSON-LD поверх общей сущности клиники.
- Переписаны проблемные title/description для основных, врачебных и legal-страниц.
- Sitemap получил legal pages и `lastmod`; `/review/` и `/dokumenty/` не добавлены.
- JPEG больше 500 KB в `public` оптимизированы lossless через `jpegtran`.

Осталось:

- Получить реальный ID Метрики и проверить события в интерфейсе Метрики.
- Получить/положить финальные юридические файлы, если клиент хочет именно скачиваемые документы.
- Оставить Max-кнопки на месте и заменить `https://max.ru` на актуальную ссылку чата после получения от клиента.
- Настроить серверный 301 `/dokumenty/` -> `/documents/` на финальном хостинге, если платформа позволяет.
- Дожать тяжёлые ассеты: PNG и WebP/AVIF-версии для крупных кейсов, если это не ухудшит качество.

## Findings

### P0. Публичные страницы ссылаются на отсутствующие файлы документов

**Problem:** В `public/documents` сейчас есть только `dogovor-oferta-onlajn-usluga.docx` и `soglasie.pdf`, но сайт ссылается на несколько отсутствующих документов.

**Evidence:** `src/data/legalDocuments.ts:1-61` содержит ссылки на:

- `/documents/liczenziya-vypiska.pdf`
- `/documents/politika-konfidenczialnosti.pdf`
- `/documents/soglasie-na-obrabotku-personalnyh-dannyh-oferta-onlajn-usluga.pdf`
- `/documents/svidetelstvo-o-postanovke-na-uchet.jpeg`
- `/documents/polzovatelskoe-soglashenie.pdf`

`dist` audit нашёл 12 отсутствующих document/image targets на `/documents/`, `/privacy/`, `/consent/`, `/terms/`.

**Risk:** Юридический блок выглядит готовым, но кнопки скачивания ведут в 404. Для медицинской клиники это риск доверия, модерации рекламы и 152-ФЗ.

**Fix:** Выполнено частично: публичные ссылки скачивания на отсутствующие файлы убраны, вместо них показывается `Файл готовим`. Для финальной сдачи нужно получить документы и положить их в `public/documents`, если клиент хочет скачиваемые версии.

### P0. На главной и странице Мамедова В.А. есть 404 по изображениям

**Problem:** Две публичные страницы пытаются загрузить удалённые изображения.

**Evidence:** Playwright на desktop и mobile:

- `/` → `404 /before-after/mamedov-platysmoplasty-home.jpg`
- `/doctors/mamedov/` → `404 /doctors/mamedov/cases/01.jpg`

`dist` audit также нашёл отсутствующую ссылку `/doctors/mamedov/cases/01.jpg`.

**Risk:** Видимые битые изображения, ошибки в console, хуже доверие и performance. Для сдачи это P0, потому что дефект виден пользователю.

**Fix:** Выполнено: отсутствующие кейсы/галерея Мамедова В.А. временно не рендерятся. Повторный `dist` audit не нашёл битых локальных ссылок.

### P0. Не подключена Яндекс.Метрика и цели конверсий

**Problem:** В коде не найдено `ym(`, `reachGoal`, `YANDEX_COUNTER_ID`, `astro-ym` или другой счётчик Метрики.

**Evidence:** `rg` по `src`, `package.json`, `astro.config.*` нашёл только текстовые упоминания consent/phone; Метрики и `reachGoal` нет. Формы сейчас открывают WhatsApp напрямую: `FinalCTA.astro:99-117`, `BookingModal.astro:165-185`.

**Risk:** Нельзя проверить заявки, звонки, клики WhatsApp/Telegram/Max, оптимизировать Яндекс.Директ и передать New Age рабочие цели. Сайт технически может быть опубликован, но маркетингово не готов к запуску.

**Fix:** Выполнено на уровне кода: Метрика подключается через `YANDEX_COUNTER_ID` / `PUBLIC_YANDEX_COUNTER_ID`, цели вызываются через `window.platinentalReachGoal`. Осталось получить реальный номер счётчика и проверить тестовые визиты/цели.

### P1. Schema.org слишком общая и местами неверная

**Problem:** `SiteLayout.astro` генерирует один `MedicalClinic` JSON-LD для всех страниц и ставит `url` текущей страницы.

**Evidence:** `src/layouts/SiteLayout.astro:27-49` — один объект `MedicalClinic`; `dist` audit показал `jsonLd=1` на каждой странице, включая врачей, документы и 404. В `dist/404.html` JSON-LD содержит `"@type":"MedicalClinic"` и `"url":"https://kzn.platinental.ru/404/"`.

**Risk:** Размытый entity-сигнал: поисковик видит клинику как отдельную сущность на каждом URL. Врачи не получают `Physician`, услуги не получают `MedicalProcedure`/`Service`, хлебные крошки не размечены.

**Fix:** Частично выполнено: `MedicalClinic` стал стабильной сущностью с `@id`, 404 и `/dokumenty/` исключены, врачебные страницы получили `Physician` и `BreadcrumbList`. Для направлений/услуг ещё нужен отдельный `Service`/`MedicalProcedure`.

### P1. SEO meta на ряде страниц требуют переписывания

**Problem:** Часть title слишком короткая, часть врачебных title слишком длинная, некоторые descriptions выходят за нормальный диапазон или слишком короткие.

**Evidence:** `dist` audit:

- short title: `/doctors/` 30, `/contacts/` 33, `/about/` 34, `/prices/` 35, `/kosmetologiya/` 37, `/kosmecevtika/` 37.
- long title: врачи 75-91 символ.
- long description: `/doctors/` 208, `/plastika/` 182.
- short legal descriptions: `/terms/` 57, `/privacy/` 76, `/consent/` 81.

**Risk:** Потеря релевантности коммерческим запросам и обрезанные сниппеты. Для Яндекса важны ясные title с гео и интентом.

**Fix:** Выполнено для найденных проблемных страниц. Повторный audit не нашёл дублей title/description.

### P1. Дубли `/documents/` и `/dokumenty/`

**Problem:** Генерируются две страницы документов с одинаковым title/description, при этом `/dokumenty/` canonical указывает на `/documents` без trailing slash.

**Evidence:** `dist` audit:

- duplicate title: `Документы и лицензии — The Platinental Казань` x2.
- duplicate description: `Лицензия на медицинскую деятельность...` x2.
- `/dokumenty/` canonical: `https://kzn.platinental.ru/documents`.

**Risk:** Дублирование и неаккуратная canonical-форма. После запуска может создать лишнюю URL-ветку и диагностические предупреждения в Вебмастере.

**Fix:** Частично выполнено: `/dokumenty/` закрыт `noindex, follow`, canonical указывает на `/documents/`, страница не попадает в sitemap и делает клиентский переход на `/documents/`. Для идеального запуска нужен серверный 301 на хостинге.

### P1. 404-страница не закрыта от индексации в сгенерированном HTML

**Problem:** `dist/404.html` не содержит `<meta name="robots" content="noindex...">`, canonical указывает на `/404/`, и туда же вставлен `MedicalClinic`.

**Evidence:** `SiteLayout.astro:25-26` ставит `noindex` только если `Astro.url.pathname === '/404'`; в сгенерированном `dist/404.html` meta robots отсутствует, canonical — `https://kzn.platinental.ru/404/`.

**Risk:** 404-страница не должна выглядеть как индексируемая полноценная страница клиники.

**Fix:** Выполнено: `src/pages/404.astro` передаёт `robots="noindex, follow"`, canonical `/`, `includeClinicSchema={false}`.

### P1. Тяжёлые изображения в `public`

**Problem:** В сборку попадает много изображений больше 500 KB, часть — 1-4 MB.

**Evidence:** крупнейшие файлы:

- `/doctors/mamedov/cases/05.jpg` — 4103 KB.
- `/doctors/mamedov/cases/10.jpg` — 3773 KB.
- `/doctors/vasilev/cases/04.jpg` — 1785 KB.
- `/before-after/vasilev-platysmoplasty.jpg` — 1490 KB.
- `/quote/iskornev-portrait-2026.png` — 1380 KB.
- PNG-фото врачей: 656-925 KB.

**Risk:** Медленный LCP/загрузка кейсов на мобильном трафике из Директа. Яндекс учитывает качество посадочной и поведенческие сигналы.

**Fix:** Частично выполнено: JPEG больше 500 KB оптимизированы lossless через `jpegtran`. PNG и WebP/AVIF-варианты остаются отдельной задачей.

### P1. Forms track no success state and rely on WhatsApp popup

**Problem:** Финальные формы и модалка не отправляют данные на backend/CRM, а открывают WhatsApp через `window.open`.

**Evidence:** `FinalCTA.astro:104-117` и `BookingModal.astro:165-185` собирают `FormData` и открывают `wa.me`. В форме FinalCTA после submit нет reset/успешного состояния; модалка временно меняет текст кнопки и закрывается.

**Risk:** Если popup заблокирован или пользователь не завершил переход в WhatsApp, заявка не сохранится. Без Метрики событие тоже не фиксируется.

**Fix:** Частично выполнено: `reachGoal` добавлен перед переходом в WhatsApp; FinalCTA сбрасывает форму и возвращает кнопку после клика. Надёжное серверное сохранение заявок остаётся отдельным решением.

### P1. Max ведёт на общий `https://max.ru`

**Problem:** В публичных CTA Max-ссылки пока ведут не в чат клиники.

**Evidence:** `FinalCTA.astro:34`, а также повторяющиеся ссылки в `Contacts`, `Navigation`, врачебных страницах. Вопрос клиенту уже зафиксирован в `docs/questions-for-client.md`.

**Risk:** Пользователь уходит не в клинику, а на общий сервис. Это снижает конверсию и выглядит как недонастроенная кнопка.

**Fix:** По решению пользователя Max оставить. После получения актуальной ссылки заменить текущий `https://max.ru` на ссылку чата клиники.

### P2. Sitemap минимальный и не включает legal pages

**Problem:** `sitemap.xml` содержит 19 URL без `lastmod` и не включает `/privacy/`, `/consent/`, `/terms/`, `/dokumenty/`, `/review/`.

**Evidence:** `src/pages/sitemap.xml.ts:6-21` явно перечисляет static routes и врачей. `dist/sitemap.xml` содержит главные коммерческие страницы и врачей.

**Risk:** Не критично для индексации, но юридические страницы могут хуже обнаруживаться поисковиком и Вебмастером. `lastmod` помог бы диагностике после релиза.

**Fix:** Выполнено: legal pages добавлены, `lastmod` добавлен, `/review/` и `/dokumenty/` не включены.

### P2. Review-страница остаётся публично доступной

**Problem:** `/review/2026-05-08/` отдает 200, хотя закрыта `noindex, nofollow` и запрещена в `robots.txt`.

**Evidence:** `dist` содержит `/review/2026-05-08/index.html`, robots meta `noindex, nofollow`; grep rendered text нашёл там внутреннюю фразу `Это не финальный production-хостинг...`.

**Risk:** Индексация заблокирована, но страница доступна по прямой ссылке. Для production-сдачи это служебный артефакт.

**Fix:** Перед финальным запуском удалить из production-сборки или оставить только в preview-среде. Если оставлять, убедиться, что нет ссылок из навигации/sitemap.

### P2. Базовая accessibility-проверка в порядке, но нужен ручной проход

**Problem:** Автоматический smoke-test подтвердил H1/form/overflow, но не проверял клавиатурные сценарии, focus trap модалки, screen-reader labels и contrast детально.

**Evidence:** Playwright: на проверенных страницах один H1, горизонтального overflow нет, формы имеют required consent и tel input. Детального axe/Lighthouse accessibility audit не запускалось.

**Risk:** Могут остаться мелкие UX/accessibility дефекты, особенно в модалке, меню и quiz.

**Fix:** После P0/P1 исправлений прогнать Lighthouse/accessibility или ручной keyboard pass: header, burger, modal open/close, forms, quiz, lightbox.

## What is OK

- `npm run check` и `npm run build` проходят.
- 25 страниц генерируются.
- У проверенных HTML-страниц ровно один H1.
- На проверенных desktop/mobile viewport нет горизонтального скролла.
- Формы содержат обязательный чекбокс согласия и телефонное поле.
- `robots.txt` доступен в сборке и закрывает `/review/`.
- Sitemap содержит основные коммерческие страницы и врачей.
- На production-страницах rendered text grep не нашёл запрещённые фразы `американский бренд`, `международный бренд`, `филиал`, `методика Искорнева`, `не просто`, `TODO`, `рабочая версия`.

## Backlog

### P0 before handoff

- [x] Убрать публичные ссылки на отсутствующие документы: лицензия, политика, онлайн-согласие, свидетельство, пользовательское соглашение.
- [x] Починить публичный 404 по `/before-after/mamedov-platysmoplasty-home.jpg`.
- [x] Починить публичный 404 по `/doctors/mamedov/cases/01.jpg`.
- [x] Добавить код Метрики и `reachGoal` для ключевых конверсий.
- [x] Повторно прогнать Playwright smoke-test: `/`, `/doctors/mamedov/`, `/documents/`, `/privacy/`, `/consent/`, `/terms/`.
- [ ] Получить реальный ID Метрики и проверить цели на боевом счётчике.
- [ ] Получить финальные юридические файлы и вернуть скачивание там, где это требуется.

### P1 before launch

- [x] Развести schema.org для organization, physician и breadcrumbs на врачебных страницах.
- [ ] Добавить service/procedure schema для направлений и услуг.
- [x] Переписать короткие/длинные title и descriptions.
- [x] Частично решить дубль `/documents/` и `/dokumenty/`: canonical/noindex/client redirect.
- [ ] Настроить серверный 301 `/dokumenty/` -> `/documents/` на хостинге.
- [x] Исправить 404 meta robots/canonical/schema.
- [x] Оптимизировать тяжёлые JPEG lossless.
- [ ] Дожать тяжёлые PNG и WebP/AVIF-версии без заметной потери качества.
- [x] Добавить события Метрики на WhatsApp-submit и ключевые клики.
- [ ] Заменить Max-ссылку на реальный чат после подтверждения клиента.

### P2 after launch

- [x] Добавить legal pages и `lastmod` в sitemap.
- [ ] Убрать `/review/2026-05-08/` из production-сборки или оставить только в preview.
- [ ] Прогнать Lighthouse/PageSpeed по главной, направлениям, врачу, ценам и контактам.
- [ ] Прогнать accessibility/keyboard pass по меню, модалке, quiz, lightbox и формам.
- [ ] После получения доступов проверить Яндекс.Вебмастер, индексацию, sitemap, robots, SSL и цели Метрики.
