# Garden Catalogue

Personal garden care app for tracking plants and seasonal tasks. Melbourne, Zone 10b.

**What this project is for (Jay, July 2026):** quick-reference guides. Jay grabs spare moments in the garden and wants to glance at a page and instantly know the next task and how to do it. Every page, card and nextAction should be written for that glance — task first, instructions inline, no context-hunting. Seamless is the bar.

## Stack

- Astro 6 + Tailwind CSS v4 (using `@theme` in global.css, no tailwind.config)
- Static site, deploys to Vercel
- Dev server: port 4325

## Data

- 42 plants as YAML files in `src/content/plants/` (Star Jasmine split into 3 fence sections; study bird's nest fern binned Jul 2026 and its YAML deleted; third muehlenbeckia — neighbour boundary fence — added Jul 2026)
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
- `/feeding` — Quick-reference feeding guide: 4 products with plant lists + doses, skip list, year timeline. Data in `FEEDING_PLAN`/`FEEDING_SKIPS`/`FEEDING_YEAR` in utils.ts
- `/playbook` — "Before the Baby" operations page: 15-min jobs, the 3 sessions with inline how-tos + gear, slippable list, gall wasp cheat sheet, done list. Data hardcoded in the page frontmatter. **Keep in sync**: when Jay reports work done, update the playbook lists AND the plant YAML. Delete or repurpose this page once the pre-baby window passes

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

- **Baby due ~12 Aug 2026** (revised from 4 Aug). Strategy set July 2026: front-load September's spring work into late July / early Aug because Jay is unavailable for early spring. The dashboard "To do" is the pre-baby punch list: winter prunes (passionfruit, olive, black eyed susan, lily turf, dianella — NOT frangipani, too high, dropped for good), a slow-release feed blitz replacing the September feeds — round 1 done 29 Jul (natives via Osmocote, plus Richgro on olive, frangipani, all three muehlenbeckias, passionfruit, jasmine back + west, bartlettina, caradonna; all their Sept feeds marked completed). Round 2 Richgro done 30 Jul (new bag bought): Mexican sage, black eyed susan, miscanthus, giant taro, strawberry, east jasmine gap near taro, achillea, lavender, lily turf, dichondra, native violets — all Sept feeds marked completed. Citrus/oil status 30 Jul: eco-oil round 1 done on orange + lime (second orange spray ~13-20 Aug, slippable; lime's Oct spring flush still needs its own oil — no residual). Orange + grapefruit fed (Experts Choice light). Gall wasp triple-checked — grapefruit clean, decision: no preventive treatments ever (contact spray useless without pests), annual winter check only. Remaining: lemon (light feed + scale check + harvest-then-gall-prune before end Sept). **31 Jul blitz:** olive winter prune DONE (~33%, crown-lift style; spring watershoot rub-off task added), lawn fed (Sudden Impact), lily turf sheared, bartlettina Multiguard down, fence-line clump near new muehlenbeckia cut to 5cm (vine priority), feijoa renovation cut STARTED (~1m, just below fence top — height revised up from 70-80cm after photo review; keep sub-cut foliage, finish remaining trunks). **Kangaroo paws: ink spot confirmed on front clumps 31 Jul** (the "dianellas by the banksia" were actually the paws) — full 5cm haircut is the pending treatment; April all-clear superseded. **New: `/field-notes` page** — annotated photos (percent-positioned pins/rings/cutlines defined in the page frontmatter, photos in `public/images/field/`); nav link added. Unrecorded plant flagged: big broad-leaf strappy fountain near the banksia (likely crinum or gymea) — ID when it flowers. New east jasmines accidentally over-fed 29 Jul, triaged same day (excess removed, flushed) — watch for leaf-edge browning into mid-Aug. Also: nature strip second pass (halfway 29 Jul), high-impact weeding spots (new item), jasmine tie audit (~50% done 29 Jul), rosemary dead-half removal, orange tree scale/oil + harvest + Epsom. Poa annua purge mostly done 21 Jul. Snail bait done 29 Jul. All three muehlenbeckias fed 29 Jul; the two front-fence ones also tidied/trimmed (Sept trims marked completed). **When Jay reports the feed blitz done, mark the September feed tasks `completed: "2026-08"`** so spring doesn't re-surface them.
- **Supplies sorted 22 Jul 2026:** Bunnings order placed — Osmocote Native 1kg (only low-P fert owned; natives get ONLY this), eco-oil RTU ×3, Multiguard 2.5kg (iron EDTA, cat-safe), sugarcane bale. Already owned: Sudden Impact for Lawns (buffalo), Experts Choice fruit & citrus ~7kg (citrus — light dose only, gall wasp caution). Epsom salts stocked. Second Richgro bag bought and used 30 Jul — nothing left to buy.
- **Spring while Jay is out:** irrigation turn-on in Sept is the one must-do (single tap/switch, drip extension to new jasmines already installed May). Everything else can slip.
- **Gardener is NOT coming** (confirmed July 2026). (1) west-facing black wall climber — deferred, replan later; (2) feijoa — **removal plan SCRAPPED 29 Jul 2026**: Jay is keeping them, hard DIY cutback to ~1m to trial as short managed shrubs (on the dashboard + playbook). The removal contractor that was in motion needs cancelling/repurposing if still booked. Permanent no-fruit regime: October flower-strip + Nov tip-trim.
- Indoor plants: Jay did a tidy-up July 2026, "mostly looking ok" — stale April/May urgency flags cleared. Full health audit (28 plants without healthStatus) still pending, low priority. **Exception — fern scale outbreak (confirmed 29 Jul 2026):** TWO Japanese holly ferns have Pinnaspis aspidistrae — black-pot plus one other (pot TBC; ask Jay and tag its YAML). The April "sori" verdict was wrong. Round 1 treated 29 Jul (fronds cut + alcohol), rounds 2-3 due at 7-10 day intervals as cloth wipes, bin if it persists. Collection inspected 29 Jul — everything else clear. Dashboard now surfaces urgent indoor items in the outdoor To do box with an "indoor" tag (index.astro). The study bird's nest fern that went lifeless and was binned July 2026 was possibly an earlier casualty (its "dryness" decline never responded to misting) — all remaining indoor ferns need inspection. No oils on ferns, ever.
- Photos needed: Passionfruit, Unknown Tree (Right Side), Echinacea Sombrero
- ID the unknown plants (right side tree, cinnamon wattle confirmation). Backyard citrus ID'd 29 Jul 2026: it's a grapefruit — YAML renamed to Grapefruit Tree. Citrus roster: lemon (front), grapefruit (back, fairly big), orange (needs love — scale/oil session), lime (renovation-pruned, no feed until 2027)
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
