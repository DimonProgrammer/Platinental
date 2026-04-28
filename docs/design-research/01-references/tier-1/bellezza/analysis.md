# Bellezza — Deep Dive

**URL:** https://www.bellezza.ua/
**Captured:** 2026-04-27, 1440×900 / 1024×768 / 375×812
**Compass-rating (historical):** 5/5 (CIS comp, language-validated)
**Current state assessment:** ⚠️ **Сайт обновлён со времени Awwwards-награждения**. Сегодняшняя версия НЕ editorial, а conventional CIS-clinic с pink accent. Compass ссылался на ранее версию; нынешняя ближе к Tier 3 anti-patterns.

---

## 1. Tonal read

Сегодняшняя Bellezza — **CIS-стандарт**: hero asymmetric с photo врача-выполняющего-процедуру (LED маска), pink magenta accent (#C65299), bento-grid услуг с разными размерами карточек, отдельный photo команды (не индивидуальные карточки), news-cards 3-up. Premium здесь подаётся через **Playfair Display + Futura BookC + warm cream `#FBF7F2`**, но overall впечатление — «европейская клиника с CIS-локализацией», не Aesop/Sturm-grade editorial.

Три решения, **которые работают**:
1. **Playfair Display + Futura BookC для кириллицы** — это **главное доказательство**, что modern transitional serif хорошо рендерится в русском. Подтверждение нашего Cormorant + Golos выбора.
2. **Warm cream surface `#FBF7F2`** — близко к нашему `#FFFDF8`. CIS-аудитория одобряет тёплые neutrals.
3. **Bento-grid услуг** с разными размерами cards (не равные 3-up) — даёт hierarchy без excess decoration.

**Что НЕ работает (anti-patterns):**
- ❌ Pink magenta accent (`#C65299`) — saturated, instagram-pink, противоречит compass-rule «no saturated accent».
- ❌ Cookie banner pink full-width — тяжело.
- ❌ Hero photo «procedure-in-progress» (LED маска на лице) — медицински-clinical, не editorial.
- ❌ Doctor team photo как один shot — не позволяет фокусироваться на отдельных врачах.

**Вывод:** Bellezza-current — **mostly anti-pattern**, но **typography pair Playfair + Futura BookC = strong validation для нашего Cormorant + Golos выбора в кириллице**.

## 2. Layout & rhythm

| Параметр | Значение |
|---|---|
| Viewport reference | 1440px |
| Page scroll-height | 8183px |
| Section transitions | через color band (white ↔ warm cream) |

**Секционная структура:**
1. Pink notification top + Header
2. **Hero asymmetric**: text-left (Cormorant-style H1 «Клиника эстетической медицины и дерматологии»), photo-right (LED маска processed shot)
3. **About клиники**: split — team photo left + 4-column ranged stats/info right
4. **Popular services bento**: 6-7 cards разных размеров, с photo + title + brief
5. **«Дерматологи, косметологи, лицо и реабилитация»** — text-only band
6. **News 3-up**: 3 article cards
7. **Photo gallery** (interior shots)
8. **CTA «Запись на консультацию»**
9. **Other services** mini-grid
10. **Footer pink/grey**

## 3. Typography

| Role | Family | Size | Weight | LH | Tracking |
|---|---|---|---|---|---|
| H1 | PlayFair Display | 40px | **700** | 48px (1.20) | 0.8px |
| H2 | PlayFair Display | 36px | **700** | 43.2px (1.20) | 0.72px |
| Lead body | Futura BookC | 21px | 400 | 31.5px (1.50) | 0.18px |
| Body | Futura BookC | 16px | 400 | — | — |
| Button | Futura BookC | 14px | 400 | 21px (1.50) | 0.14px |

**Ключевые наблюдения для cyrillic:**
- **Playfair Display Bold (700) для H1/H2** — не italic, weight heavy. У Bellezza это даёт «luxury jewellery brand» feel.
- **Размеры скромные** — H1 40px (vs 60-100px у international refs). Это CIS-стиль: serif для elegance, но не overscaled.
- **Body lead 21px** — Futura book ширококэглим. Хорошо читается в русском.
- **Letter-spacing 0.02em на serif headlines** — subtle, но present.

**Conclusion:**
- ✅ Cormorant Italic 60-80px на 1440 в кириллице **более dramatic**, чем Playfair 40px Bold. Наш ход более «editorial premium», их — «conventional luxury».
- ✅ Golos Text 17-18px body будет читаться как Futura BookC 16-21px у Bellezza — наш choice валиден.
- ⚠️ Letter-spacing serif headlines — нам тоже стоит добавить subtle 0.01-0.02em для cyrillic.

## 4. Color & material

| Color | Hex | Role |
|---|---|---|
| `#FFFFFF` | white | Page bg |
| `#FBF7F2` | warm cream | Alt section bg ✓ |
| `#232323` | rgb(35,35,35) | H1 ink |
| `#333333` | body ink |
| `#C65299` | rgb(198,82,153) | Pink magenta accent ✗ |
| `#484848` | muted dark grey |
| `#ECEEEE` | borders |

**Photography treatment:** mixed — procedural shots (с медицинскими принадлежностями), team photo, gallery interior. Stocky-ish vs Sturm/Bader's curated quality. **Не наш референс для photography.**

## 5. Steals & pitfalls

### Что забираем (validated patterns)

1. **Playfair / Cormorant в кириллице работает** — финальное подтверждение нашего выбора Cormorant Italic.
2. **Cream surface `#FBF7F2`** — почти идентичный нашему `#FFFDF8`, calibration confirmed.
3. **Bento-grid услуг с разными размерами cards** — это compass-rule «top-3 large, others standard», валидно для CIS-аудитории.
4. **Letter-spacing 0.01-0.02em на cyrillic serif headlines** — добавить в наши tokens.
5. **Body lead 18-21px Futura/Golos** для cyrillic — комфортно читается mature-аудиторией.

### Что НЕ берём

- ❌ Pink magenta accent — вредит premium-positioning.
- ❌ Bold Playfair (weight 700) — у нас Cormorant Italic Regular.
- ❌ Procedural photography (LED маска) — не editorial.
- ❌ Pink cookie/notification bar full-width — назойливо.
- ❌ Team photo как один большой shot — мешает doctors-as-typography pattern.
- ❌ FAQ-like text-only band без визуальной структуры.

### Pitfalls

- Bellezza разработана локальным CIS-агентством, и заметна перешли «editorial → conventional». Это типично для CIS-клиник, которые получают Awwwards-нограждение, а потом переделывают сайт под «практичные требования бизнеса». **Мы не должны идти по этой траектории.**
- Pink accent — это **самый частый CIS-luxury color choice** для clinic-brands (наряду с teal). Compass был прав, исключая это для Платиненталь.

## Сводка

Bellezza-current = **cyrillic-typography validation reference** (Playfair Display = Cormorant работает), но в остальном — **anti-pattern** для современного editorial-premium. Не следовать паттернам compositionальным; брать только **technical validation для cyrillic**.

**Действие:** добавить в наши `tokens.css`:
- `--text-h1-letter-spacing-cyrillic: 0.015em` (опциональный override для русского)
- проверить, что Cormorant Italic Subset с cyrillic подключён правильно
