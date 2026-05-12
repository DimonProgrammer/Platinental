# AI Index — Platinental Kazan

## Active Production Surface
- Stack: Astro 5, TailwindCSS v4, TypeScript.
- Layout: `src/layouts/SiteLayout.astro`.
- Site components: `src/components/site/`.
- Tokens and global site utilities: `src/styles/tokens.css`.
- Data sources: `src/data/doctors.ts`, `src/data/prices.ts`, `src/data/plastika.ts`, `src/data/kosmetologiya.ts`, `src/data/kosmecevtika.ts`.
- Content source of truth: `knowledge/`, starting with `knowledge/INDEX.md`.

## Routes
- Public pages: `/`, `/about`, `/contacts`, `/doctors`, `/doctors/[slug]`, `/documents`, `/kosmecevtika`, `/kosmetologiya`, `/plastika`, `/prices`, `/404.html`.
- Generated technical routes: `/robots.txt`, `/sitemap.xml`.
- `/concept/*` is intentionally removed from `src/pages` and archived.

## Editing Rules
- Read `AGENTS.md`, `DESIGN.md`, `docs/design-direction.md`, and the relevant `knowledge/` file before changing content or UI.
- Keep runtime asset filenames Latin-only.
- Do not invent doctors, prices, addresses, legal facts, reviews, or clinic claims.
- Preserve the internal `v3-*` CSS namespace unless a dedicated visual refactor explicitly replaces it; it is now only a CSS namespace, not a filesystem boundary.
- Add new reusable production UI under `src/components/site/sections/` or `src/components/site/` depending on scope.

## Archive Policy
- `_archive/2026-05-07-ai-refactor/` stores historical/source-like material removed from the active tree.
- Do not import from `_archive`.
- Do not put regenerable output there; `dist/`, `.astro/`, Playwright outputs, ZIP builds, and temp folders are ignored instead.
- Archived concept pages are design history only and must not be restored to `src/pages` without an explicit product decision.

## Verification
- Type/AST check: `npm run check`.
- Static build: `npm run build`.
- After frontend changes, run Playwright visual checks at desktop `1440x900`, tablet `1024x768`, and mobile `375x812`.
- Confirm console errors are zero before calling UI work done.
