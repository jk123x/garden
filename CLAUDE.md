# Garden Catalogue

Personal garden care app for tracking plants and seasonal tasks. Melbourne, Zone 10b.

## Stack

- Astro 6 + Tailwind CSS v4 (using `@theme` in global.css, no tailwind.config)
- Static site, deploys to Vercel
- Dev server: port 4325

## Data

- 39 plants as YAML files in `src/content/plants/`
- Schema in `src/content.config.ts` — name, type, indoor/outdoor, location, health, notes, monthly care tasks
- 4 unknown plants still need ID (front yard shrubs, ground covers, right side tree, front hanging indoor)

## Design

- "Botanical almanac" aesthetic — Crimson Pro (serif display) + DM Sans (body) via Google Fonts
- Warm parchment palette with terracotta accent (`#c4613a`), olive green for outdoor/active states
- All colors defined as CSS custom properties in `src/styles/global.css`
- 17px base font size, generous line-height, readability-first
- Staggered fade-up animations on page load (`.animate-in` class)
- Jay rejected dark mode — prefers light with larger text

## Pages

- `/` — Dashboard: current month tasks grouped by category, "coming up" preview
- `/plants` — Grid with type filters, indoor/outdoor toggle
- `/plants/[slug]` — Detail page with 12-month care calendar
- `/calendar` — Full year view, tasks grouped by plant per month

## Key patterns

- Indoor/outdoor toggle persisted in localStorage, filters via `data-indoor` attributes
- Plant type filters on `/plants` use `data-type` + `data-typeHidden` for visibility
- Category colors defined in `src/lib/utils.ts` as Tailwind class strings
- `getTasksForMonth()` in utils.ts is the core data helper

## What's next

- Photo audit session: Jay sends plant photos, assess health, save to `public/images/plants/`
- Update health fields based on photo assessment
- ID the 4 unknown plants
- Deploy to Vercel
