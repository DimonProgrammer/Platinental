# Pattern 08 — Section Rhythm & Whitespace

## Откуда

- **Aman** — vertical gap 200-300px между секциями (deep-breath).
- **Byredo** — single object in vast empty space, dramatic whitespace as composition.
- **La Prairie** — long-scroll editorial с consistent rhythm.
- **Bader** — dark/light alternation каждые 3-4 секции.
- **Compass** — «whitespace is the brand; treat empty vertical space between sections as a designed element with its own size hierarchy (a "small gap," "medium gap," and "deep breath" between major direction transitions)».

## Когда применять

Везде. Это **глобальный rule** для spacing scale между секциями.

## Anti-pattern

❌ **Все секции с одинаковым padding-y** — теряется hierarchy между primary/secondary moments.
❌ **Tight padding (<60px desktop)** — выглядит как catalog, не editorial.
❌ **Cards внутри секций с дополнительным padding** — double-spacing chaos.

## Spec — три уровня gap

### Small gap (between related blocks)

```
--gap-small: clamp(48px, 8vh, 80px);
```

- Между related sub-blocks (например, Procedures главный + filtered list).
- Между H2 и body внутри секции.
- Между cards в editorial list.

### Medium gap (between sections)

```
--gap-medium: clamp(96px, 14vh, 160px);
```

- Между обычными sections на главной (Services → Principles → Procedures).
- Между Hero и first content section.
- Default value для большинства section transitions.

### Deep-breath gap (между direction shifts)

```
--gap-deep: clamp(160px, 22vh, 280px);
```

- Перед / после **direction-spreads** (Pattern 06).
- Перед / после **quote-bridge** (Pattern 05).
- Перед footer.
- Между «сегментами» главной (Hero+Services / Doctors+Reviews / Consultation+FAQ — каждый segment отбит deep-breath).

### Применение

```astro
<style>
  :root {
    --gap-small: clamp(3rem, 8vh, 5rem);     /* 48-80px */
    --gap-medium: clamp(6rem, 14vh, 10rem);   /* 96-160px */
    --gap-deep: clamp(10rem, 22vh, 17.5rem);  /* 160-280px */
  }

  .section { padding-block: var(--gap-medium); }
  .section--breath { padding-block: var(--gap-deep); }
  .section--small { padding-block: var(--gap-small); }
</style>

<!-- Главная rhythm -->
<Hero />                                            <!-- gap-medium below -->
<ServicesDirections class="section--breath" />     <!-- deep -->
<Procedures class="section" />                      <!-- medium -->
<QuoteBridge class="section--breath" />            <!-- deep BEFORE & AFTER -->
<Doctors class="section" />                         <!-- medium -->
<Reviews class="section" />                         <!-- medium -->
<Consultation class="section--breath" />           <!-- deep before close -->
<Footer />
```

## Surface rotation

В дополнение к vertical rhythm, **alternation by surface**:

```
Hero            cream (page bg)
Direction 01    cream
Direction 02    sand (alt warm)
Direction 03    ink (dark inverse)         ← brings deep-breath gap
Doctors         cream
Quote-bridge    ink (inverse)              ← deep-breath before & after
Reviews         sand
Consultation    cream
FAQ             cream
Contacts        cream
Footer          ink
```

Не chaotic — **2-3 light spreads → 1 dark spread → light → dark close**. Совпадает с Bader rhythm.

## Container width

```css
:root {
  --container-narrow: 720px;   /* monument cards, focused content */
  --container-default: 1100px; /* main editorial */
  --container-wide: 1280px;    /* hero, direction spreads */
  --container-bleed: 100%;     /* quote, full-bleed images */
}
```

Use:
- Hero: `--container-wide`
- Direction spreads: `--container-wide`
- Procedures editorial: `--container-default`
- Quote-bridge: `--container-bleed`
- About / Concept paragraph: `--container-narrow`

## Привязка к прототипу

| Файл | Действие |
|---|---|
| `src/styles/tokens.css` | добавить `--gap-small`, `--gap-medium`, `--gap-deep`, `--container-*` |
| `src/components/Container.astro` | поддержать `variant: narrow / default / wide / bleed` prop |
| `src/components/sections/*.astro` | применить класс `section`, `section--breath`, или `section--small` per spec |

## Verification

- [ ] Spacing между секциями увеличивается на ключевых breaks (перед / после direction-spreads, quote-bridge).
- [ ] Глобально нет hardcoded margin-top / padding-y, всё через variables.
- [ ] Mobile сохраняет rhythm (clamp гарантирует minimum).
- [ ] Surface rotation: 2-3 light → 1 dark → light → close dark.
- [ ] Не похоже на дешёвую плотность Tier 3.
