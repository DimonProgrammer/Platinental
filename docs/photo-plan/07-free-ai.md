# 07 · Бесплатные AI-генераторы фото

Альтернативы платному Midjourney под наш premium editorial use case. Все в порядке от лучшего к худшему по качеству.

**Легенда:** ✅ из РФ без VPN · ⚠️ через VPN · ❌ заблокирован

| Сервис | Качество | Лицензия | Доступ из РФ | Лимиты |
|---|---|---|---|---|
| **FLUX.1 Schnell** на HuggingFace | ★★★★★ | Apache 2.0 (commercial OK) | ✅ | без жёстких лимитов |
| **Krea AI** (free tier) | ★★★★ | commercial OK | ⚠️ | ~50 ген/день |
| **Bing Image Creator** (DALL·E 3) | ★★★★ | commercial OK | ⚠️ | 15 быстрых/день, потом slow |
| **Google AI Studio** (Imagen 3) | ★★★★ | commercial OK | ⚠️ | free tier |
| **Leonardo.ai** | ★★★ | commercial OK | ⚠️ | 150 tokens/день |
| **Pollinations.ai** | ★★★ | commercial OK | ✅ | без лимитов |
| **NightCafe** | ★★★ | commercial OK | ⚠️ | 5 кредитов/день |
| **Playground AI** | ★★★ | commercial OK | ⚠️ | 50 ген/день |

---

## 🥇 FLUX.1 Schnell на HuggingFace — главный выбор

**Почему лучший:** open-source FLUX Schnell — **самая мощная** бесплатная модель 2026 года. На уровне Midjourney v6, иногда лучше для editorial. Apache 2.0 = commercial OK без подвохов. Из РФ работает напрямую.

**Прямой линк:**
- 🔗 [FLUX.1 [schnell] · HuggingFace Space](https://huggingface.co/spaces/black-forest-labs/FLUX.1-schnell)

**Альтернативные интерфейсы (та же модель, другой UI):**
- [Mage.space](https://www.mage.space/) — попроще
- [Replicate FLUX](https://replicate.com/black-forest-labs/flux-schnell) — есть free credits
- [Fal.ai FLUX](https://fal.ai/models/fal-ai/flux/schnell) — самый быстрый рендер

**Как пользоваться:**
1. Открыл [HuggingFace Space](https://huggingface.co/spaces/black-forest-labs/FLUX.1-schnell).
2. Вставил промпт из [`04-ai-prompts.md`](04-ai-prompts.md).
3. Параметры: `width: 768`, `height: 960` (для 4/5), `num_inference_steps: 4`, `guidance_scale: 3.5`.
4. Генерируешь 4-6 итераций, выбираешь лучший.
5. Скачиваешь PNG → конвертируешь в AVIF/WebP/JPEG.

**Важно:** Schnell оптимизирован на скорость (4 шага). Для самого высокого качества используй `FLUX.1 [dev]` — но он медленнее и не на каждой бесплатной площадке.

---

## 🥈 Krea AI — лучше всего для real-time editing

**Сила:** real-time canvas — двигаешь камеру, изменяется кадр на лету. Хорош для подбора композиции.

**Free tier:** ~50 генераций в день.

🔗 [krea.ai](https://www.krea.ai)

**Доступ из РФ:** через VPN.

---

## 🥉 Bing Image Creator (DALL·E 3) — для product still life

**Сила:** DALL·E 3 отлично с product photography (S3 — баночки), editorial portraits, simple compositions. Очень устойчив к промптам на русском.

**Free tier:** 15 «boosted» генераций в день, потом замедляется (~1 минута на кадр).

🔗 [bing.com/images/create](https://www.bing.com/images/create)

**Доступ из РФ:** через VPN (любой).

**Подвох:** иногда отказывается генерировать «medical aesthetic» темы — обходим формулировкой «editorial / wellness / spa».

---

## Google AI Studio — Imagen 3

**Сила:** Imagen 3 от Google — strong editorial quality, особенно interiors и material macros.

🔗 [aistudio.google.com](https://aistudio.google.com/) → выбрать «Image generation».

**Free tier:** есть, ограничения по Vertex AI.

**Доступ из РФ:** через VPN.

---

## Leonardo.ai

**Free tier:** 150 tokens в день (~10-15 кадров на FLUX, больше на их собственных моделях Phoenix/Anime XL).

🔗 [leonardo.ai](https://app.leonardo.ai/)

**Сила:** хорошая библиотека пресетов («Cinematic Editorial», «Aesop product»).

---

## Pollinations.ai — без аккаунта вообще

**Сила:** работает БЕЗ регистрации. Просто URL → картинка.

🔗 [pollinations.ai](https://pollinations.ai)

**Пример URL для генерации:**
```
https://image.pollinations.ai/prompt/Editorial%20interior%20clinic%20warm%20light%20Aesop%20style?width=768&height=960&model=flux
```

Замени текст между `prompt/` и `?` на свой запрос (URL-encoded).

**Минус:** качество ниже HuggingFace FLUX, но если нужен fast preview — норм.

---

## Workflow на бесплатных моделях

**Для нашего проекта рекомендую:**

1. **Architectural / Material / Product still life** (H1, S2, S3, CV, dividers) — **HuggingFace FLUX.1 Schnell**. Open-source, без лимитов, качество отличное.

2. **Editorial detail / face profile** (S1) — **HuggingFace FLUX.1 Schnell** + **Bing DALL·E 3** для второго мнения.

3. **Doctor portraits (D1-D8) — НЕ генерируй на FLUX/DALL·E** для production. Identity-preservation бесплатно практически невозможно. Используй **real photoshoot** (контакт `@aleksa_chernyshova`). FLUX можно для **inspiration / референсов** свету и фону.

4. **Before/After (BA)** — **только клиент**, AI не используем (юр. риск + согласие пациентов).

---

## Бесплатно делать identity-preserving правки (для нормализации фотографий врачей)

Это сложнее. Бесплатные варианты:

### a) FLUX Kontext через HuggingFace
- Модель `black-forest-labs/FLUX.1-Kontext` — image-to-image edit с identity preservation.
- 🔗 [FLUX.1 Kontext Space](https://huggingface.co/spaces/black-forest-labs/FLUX.1-Kontext-dev)
- Загружаешь оригинал → промпт «replace background with cream, keep face exactly» → результат.
- Лучше Nano Banana, но всё ещё требует 3-5 итераций.

### b) Photopea (бесплатный Photoshop в браузере)
- 🔗 [photopea.com](https://www.photopea.com)
- Поддерживает inpainting через выделение → AI fill (внутри есть Generative Fill).
- Полный контроль, нулевой риск изменения лица.

### c) Stable Diffusion с ControlNet (локально)
- Если есть GPU 8GB+ — самый мощный вариант, бесплатно навсегда.
- Установка через [ComfyUI](https://github.com/comfyanonymous/ComfyUI) или [Automatic1111 WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui).
- ControlNet «depth» + «canny» сохраняет геометрию лица идеально.
- Кривая обучения 2-3 часа.

---

## Промпт-инжиниринг — что добавлять для бесплатных моделей

Бесплатные модели иногда «теряют тон». Чтобы получать premium editorial look:

```
[твой промпт], shot on Kodak Portra 400, fine film grain, soft natural window light,
warm cream and beige palette, magazine quality, Aesop aesthetic, Lanserhof mood,
desaturated colors, low contrast, peaceful and quiet,
--no neon, harsh flash, blue light, oversaturated colors, AI artifacts, deformed, watermark, text
```

**Параметры:**
- FLUX: `steps: 4`, `guidance: 3.5`
- DALL·E 3: только промпт, no params
- Imagen 3: `negative_prompt`, `aspect_ratio: 4:5`

---

## Чеклист после генерации

Перед тем как использовать в production:

- [ ] Нет AI-артефактов (искажённые руки, зубы, пальцы, странная геометрия).
- [ ] Нет фейковых брендов на упаковке (на S3).
- [ ] Composition не «ИИ-симметрично» (бесплатные модели любят центрировать).
- [ ] Палитра в нашем диапазоне (cream/beige/warm grey, без неоновых).
- [ ] Размер ≥ 1620×2025 для S-слотов, ≥ 2160×2700 для H1.
- [ ] Прогнал через LUT из [`treatment.md`](treatment.md).
- [ ] Конвертирован в AVIF/WebP/JPEG.

---

## Если бюджет всё-таки появится

| Сервис | Cost | Зачем платить |
|---|---|---|
| Midjourney v7 Pro | $30/мес | Лучшее качество editorial, более стабильный output |
| Replicate FLUX dev | $0.05/ген | FLUX dev (полная версия, не schnell) — на 15-20% качественнее |
| Adobe Firefly | $5/мес | Generative Fill в Photoshop |

Но FLUX.1 Schnell на HuggingFace перекрывает 90% наших нужд бесплатно.
