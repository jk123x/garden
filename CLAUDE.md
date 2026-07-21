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
- `getPlantsNeedingAttention()` returns `{ attention, later, unassessed }` — `attention` is today/week/ongoing (top "To do"), `later` is the muted "later" section below monthly tasks
- `getTasksForMonth()` is the core data helper
- Reusable components in `src/components/`: `HealthBadge.astro`, `AttentionCard.astro`

## What's next

- Photos needed: Passionfruit, Unknown Tree (Right Side), Echinacea Sombrero (Buffalo Lawn + Nature Strip now have photos)
- ID the unknown plants (right side tree, cinnamon wattle confirmation, small backyard citrus)
- Indoor plant health audit (28 plants still without healthStatus)
- Nature strip: second weeding pass once weeds regrow after May mow
- Buffalo lawn: ongoing winter grass (Poa annua) spot-pulling May–Aug
- **Feijoa removal:** Decision made May 2026 to remove entirely — fruit fly breeding host, grows too tall, too much maintenance. Gardener may do it Jul/Aug or Jay DIY. Once removed, delete or archive the YAML.
- **Gardener visit Jul/Aug 2026:** Booked for two jobs — (1) plant a climber on the west-facing black wall (gets extremely hot), (2) potentially remove the feijoa trees
- Deploy to Vercel
- **Cutting bed (old tomato bed):** standalone irrigated 1m² north-facing bed, hot/harsh part-sun, drains and dries in summer. Cat-safe cut-flower patch. **Planted May 2026:** Rudbeckia fulgida var. deamii + Echinacea (species type, variety TBC) alongside the existing Echinacea Sombrero (transplanted April). Sugarcane mulch applied. Salvia cut back. All establishing — leave alone through winter, rain handles watering. Deliberately avoided fancy Echinacea hybrids — short-lived/rot-prone, and Jay has prior echinacea-rot history. Care = cutting for the vase is the maintenance, cut old stems down late autumn, no extra water for the echinacea (rot risk), bed irrigation only.

## Dashboard rules

- The dashboard "To do" section is **data-driven** — pulled from plants with `urgency` set, displaying `nextAction`. Do not add hardcoded HTML lists to `index.astro`. To add a to-do item, edit the relevant plant YAML.
- Urgency tiers: `today` and `week` for imminent work, `ongoing` for continuous-but-important things (e.g. Feijoa fruit pickup — fruit fly garden health). All three render in the top "To do" box. `later` is for "do it when it pops up" stuff (lavender trim, winter grass spot-pulling) — renders in a muted "Later" section below the monthly tasks. If the work is already captured in the monthly tasks list, don't duplicate it as urgency at all.
- When Jay reports completed field work, clear `urgency` and `nextAction` on the plant so it drops off the dashboard. Then add a `log` entry with the date and what was done, and refresh `health` and `lastAssessed`.
- Tasks marked `completed: "<year>-<month>"` are hidden for the rest of that year. Use this for once-per-season jobs (mulch, cut-back, plant). For genuinely monthly-recurring tasks, leave `completed` unset.

## Watering and irrigation

The garden runs **garden-wide drip irrigation** that's switched off through autumn and winter (rain handles it) and back on for spring/summer. Do NOT add per-plant "reduce watering", "less water in winter", or "minimal watering" tasks — they're noise. Watering at the system level is Jay's call, not a per-plant decision.

Per-plant watering tasks should only exist for: (a) new plantings before they're hooked into drip, (b) plants with genuinely different water needs (succulents, drought-natives in pots), or (c) deep-watering during specific heat events.

## Logging field work

Plant YAMLs have a `log` field — array of `{ date, entry, category? }`. Use it for dated, one-off observations and work (weeding, pest sightings, repairs, infestations). Distinct from `tasks` (recurring monthly template) and `notes` (durable description). When Jay reports field work, append to the relevant plant's `log`, update `lastAssessed`, and refresh the `health` line if the state changed.
