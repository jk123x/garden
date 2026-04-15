# Garden Catalogue

Personal garden care app for tracking plants and seasonal tasks. Melbourne, Zone 10b.

## Stack

- Astro 6 + Tailwind CSS v4 (using `@theme` in global.css, no tailwind.config)
- Static site, deploys to Vercel
- Dev server: port 4325

## Data

- 41 plants as YAML files in `src/content/plants/` (Star Jasmine split into 3 fence sections)
- Schema in `src/content.config.ts` — name, type, indoor/outdoor, location, health, healthStatus (enum), lastAssessed, notes, monthly care tasks
- `healthStatus` enum: healthy, good, monitor, struggling, dormant, establishing, unknown
- All outdoor plants assessed April 2026 with photos
- 4 outdoor plants still need photos: Buffalo Lawn, Passionfruit, Unknown Tree (Right Side), Echinacea Sombrero
- Cinnamon Wattle variety still needs confirmation

## Design

- "Botanical almanac" aesthetic — Crimson Pro (serif display) + DM Sans (body) via Google Fonts
- Warm parchment palette with terracotta accent (`#c4613a`), olive green for outdoor/active states
- All colors defined as CSS custom properties in `src/styles/global.css`
- 17px base font size, generous line-height, readability-first
- Staggered fade-up animations on page load (`.animate-in` class)
- Jay rejected dark mode — prefers light with larger text

## Pages

- `/` — Dashboard: seasonal context banner, "needs attention" section, "needs assessment" chips, current month tasks grouped by category, "coming up" preview
- `/plants` — Grid with type filters, health status filters, indoor/outdoor toggle, health dot indicators
- `/plants/[slug]` — Detail page with health badge, assessment date, rich notes, 12-month care calendar
- `/calendar` — Full year view, tasks grouped by plant per month

## Key patterns

- Indoor/outdoor toggle persisted in localStorage, filters via `data-indoor` attributes
- Plant type filters on `/plants` use `data-type` + `data-typeHidden` for visibility
- Health status filters on `/plants` use `data-health` + `data-healthHidden` for visibility
- Category colors defined in `src/lib/utils.ts` as Tailwind class strings
- Health status colors/labels/dots also in utils.ts (same pattern as categories)
- `SEASONAL_CONTEXT` in utils.ts — Melbourne-specific seasonal notes for all 12 months
- `getPlantsNeedingAttention()` returns `{ attention, unassessed }` based on `healthStatus` enum
- `getTasksForMonth()` is the core data helper
- Reusable components in `src/components/`: `HealthBadge.astro`, `AttentionCard.astro`

## What's next

- Photos needed: Buffalo Lawn, Passionfruit, Unknown Tree (Right Side), Echinacea Sombrero, Nature Strip
- ID the unknown plants (right side tree, cinnamon wattle confirmation, small backyard citrus)
- Indoor plant health audit (28 plants still without healthStatus)
- Deploy to Vercel
