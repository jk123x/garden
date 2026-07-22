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

- **Baby due ~4 Aug 2026.** Strategy set July 2026: front-load September's spring work into late July / early Aug because Jay is unavailable for early spring. The dashboard "To do" is the pre-baby punch list: winter prunes (passionfruit, olive, black eyed susan, lily turf, dianella — NOT frangipani, too high, dropped for good), a slow-release feed blitz replacing the September feeds (citrus / native low-P / general + lawn), nature strip second pass, jasmine tie audit (~25% done 21 Jul), feijoa decision, rosemary dead-half removal, orange tree scale/oil + harvest + Epsom. Poa annua purge mostly done 21 Jul. **When Jay reports the feed blitz done, mark the September feed tasks `completed: "2026-08"`** so spring doesn't re-surface them.
- **Supplies sorted 22 Jul 2026:** Bunnings order placed — Osmocote Native 1kg (only low-P fert owned; natives get ONLY this), eco-oil RTU ×3, Multiguard 2.5kg (iron EDTA, cat-safe), sugarcane bale. Already owned: Sudden Impact for Lawns (buffalo), Richgro All Purpose 5kg (beds), Experts Choice fruit & citrus ~7kg (citrus — light dose only, gall wasp caution). Epsom salts stocked.
- **Spring while Jay is out:** irrigation turn-on in Sept is the one must-do (single tap/switch, drip extension to new jasmines already installed May). Everything else can slip.
- **Gardener is NOT coming** (confirmed July 2026). The two booked jobs are unassigned: (1) west-facing black wall climber — deferred, replan later; (2) feijoa removal — now DIY cut-and-paint to stumps, or one-off contractor. Once dead/removed, delete or archive the YAML.
- Indoor plants: Jay did a tidy-up July 2026, "mostly looking ok" — stale April/May urgency flags cleared. Full health audit (28 plants without healthStatus) still pending, low priority.
- Photos needed: Passionfruit, Unknown Tree (Right Side), Echinacea Sombrero
- ID the unknown plants (right side tree, cinnamon wattle confirmation, small backyard citrus)
- Cutting bed: establishing through winter, leave alone, no feed for echinacea until new growth shows (rot risk)
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
