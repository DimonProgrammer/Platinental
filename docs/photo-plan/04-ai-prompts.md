# 04 · AI промпты — копи-паст готовые

Готовые промпты под каждый слот. Тестировать по 3–4 итерации, выбирать лучший вариант.

---

## A. Hero — Slot H1

### A1. Architectural / интерьер клиники (Midjourney v7)

```
Editorial interior photograph of a luxury aesthetic clinic, soft warm window light from
left, cream and beige color palette, polished marble counter detail, fluted ceramic vase
with single twig, minimalist Aesop-inspired aesthetic, shallow depth of field,
fine film grain, 1/3 architectural framing, calm and silent mood, warm shadows,
no people, magazine quality, fashion photography style
--v 7 --style raw --ar 4:5 --quality 2
```

### A2. Editorial body fragment B&W (Midjourney v7)

```
Black and white editorial photograph of a young woman's neck and collarbone in profile,
soft side light from window, fine film grain like Kodak Tri-X 400, low key warm shadows,
smooth skin without retouch, peaceful mood, neutral expression, no face visible,
shoulder partially in frame, fashion editorial style like Mario Sorrenti, 4:5 vertical,
quiet and contemplative
--v 7 --style raw --ar 4:5 --quality 2 --no jewelry, watermark, text
```

---

## B. Сервисные spreads

### S1 — Пластическая хирургия (Track A, B&W body)

```
Black and white fine art editorial photograph of a woman's profile and jawline,
shoulder visible, soft natural window light from left, warm low-contrast tone,
fine grain, peaceful neutral expression with eyes closed, no makeup, neutral hair,
shoulder partially clothed in cream-colored cotton, fashion magazine quality,
inspired by Augustinus Bader and Lanserhof aesthetic, 4:5 vertical, quiet mood
--v 7 --style raw --ar 4:5 --quality 2 --no smile, jewelry, text
```

### S2 — Косметология (Track C, material macro)

```
Editorial close-up macro photograph of a single transparent serum drop on warm
cream-colored skin surface, soft side light from window, monochromatic warm palette,
shallow depth of field, fine film grain, minimal composition, magazine quality,
inspired by Aesop product photography, no props, cream and golden tones
--v 7 --style raw --ar 4:5 --quality 2
```

### S3 — Космецевтика (Track C, product still life)

```
Editorial still life photograph of three minimalist unbranded skincare jars in
cream and beige tones, arranged on dark warm-grey surface, soft side light, single
small pampas grass twig, deep shadows, minimalist apothecary aesthetic, fine grain,
no logos or text on labels, monochromatic warm palette, magazine quality, 4:5 vertical
--v 7 --style raw --ar 4:5 --quality 2 --no logos, brand, text
```

---

## D. Doctor normalization (Flux Pro Kontext)

### D1 · Generic template (substitute the source image of each doctor)

```
INPUT: Original photograph from kzn.platinental.ru (single doctor headshot).

PROMPT:
"Professional editorial portrait, same person, identical face features (do not alter
identity, do not retouch face), neutral cream background (#FAF6EE plain), soft natural
front-key light from upper left, fill light from right, color photo, 3/4 head turn,
shoulders visible, relaxed neutral expression with closed lips or very subtle smile,
warm magazine tone, fine grain, dressed in neutral cream or charcoal-grey blouse/shirt,
medical professional dignity, no jewelry larger than ear stud, indoor setting, soft
focus background, magazine editorial quality, raw RAW look."

NEGATIVE:
"altered face, different person, beauty filter, smooth porcelain skin retouch, AI hands,
synthetic look, harsh shadow, blue light, B&W, cropped chin, cartoon, beauty queen makeup,
bright colors, white coat with stethoscope, surgery setting, blue scrubs, hospital room"

PARAMETERS:
- Mode: image-to-image
- Strength: 0.30–0.40 (low — preserve identity)
- Steps: 30–40
- CFG: 7.0
- Seed: lock for consistency between iterations
```

### D2 · Nano Banana 2 (alternative)

```
"Replace background with plain warm cream color (#FAF6EE). Soft front light. Color photo.
Keep the person's face exactly as it is — do not change facial features."
```

> **Iteration:** генерируй 4–6 вариантов на одного врача, выбирай лучший. Если все плохие — попробуй другую модель (Flux → Nano → Photoshop Generative Fill вручную).

---

## C. Ambient / decorative slots

### C1 — Quote bridge background (опц)

```
Black and white ambient editorial photograph, abstract warm light pattern through
sheer linen curtain, soft bokeh, calm atmosphere, fine grain, minimalist composition,
high-key warm tone, no people, no objects, just light and texture, 16:9 wide
--v 7 --style raw --ar 16:9 --quality 2
```

### C2 — Consultation ambient

```
Editorial overhead photograph of a clean wooden desk with linen-bound notebook,
fountain pen, single ceramic cup with tea, single dried flower, warm natural window
light, cream color palette, fine grain, minimalist Aesop aesthetic, 3:4 vertical
--v 7 --style raw --ar 3:4 --quality 2 --no laptop, screen
```

### C3 — Footer / divider (опц)

```
Macro detail of warm cream silk fabric folds in soft natural light, monochromatic
beige palette, peaceful texture, fine film grain, 16:9 ambient texture
--v 7 --style raw --ar 16:9 --quality 2
```

---

## Universal negative-tags (добавлять везде)

```
--no logos, brand names, text, watermark, signatures,
   stock photo cliche, smiling people, happy family, white coat,
   scrubs, surgery tools, syringe, injection, needle, blood,
   harsh studio flash, ringlight reflection, blue clinical lighting,
   grass green color, neon, magenta, teal,
   AI artifacts, malformed hands, deformed face
```

---

## Iteration tracking

После каждой партии генераций — записывать в `treatment-log.md`:

```
2026-04-29 · Slot S2 · MJ v7
- Prompt v1 → 4 variants → best #2 (warm tone OK, focus tight)
- Prompt v2 (added "single drop") → 4 variants → best #1 (more graphic)
- Final: variant #1 from prompt v2 → upscale → LUT applied → src/assets/photos/s2-koshtetologiya.jpg
```

---

## Когда промпт не работает

1. **Все варианты «почти, но не то»** → менять одну переменную за итерацию (свет / palette / композиция).
2. **Лицо у врача меняется** → снижать `strength` Flux до 0.20–0.25, но фон может перестать меняться. Тогда — два прохода: первый только фон, второй только treatment.
3. **Нет «магазинного» feel** → добавить `--style raw` и `--quality 2`, убрать всякие `cinematic`, `dramatic`.
4. **Слишком saturated** → добавить в негативы `vibrant, saturated colors`.
5. **Получается «AI face»** → применять MJ только для body fragments без identifying features. Для портретов — Flux Pro Kontext с image-to-image.
