import { todayFrom } from './schedule';

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

export const MONTH_NAMES_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  prune: 'Prune',
  feed: 'Feed',
  water: 'Water',
  mulch: 'Mulch',
  spray: 'Spray',
  plant: 'Plant',
  harvest: 'Harvest',
  general: 'General',
};

export const CATEGORY_COLORS: Record<string, string> = {
  prune: 'bg-amber-50 text-amber-800',
  feed: 'bg-emerald-50 text-emerald-800',
  water: 'bg-sky-50 text-sky-800',
  mulch: 'bg-orange-50 text-orange-800',
  spray: 'bg-rose-50 text-rose-800',
  plant: 'bg-teal-50 text-teal-800',
  harvest: 'bg-violet-50 text-violet-800',
  general: 'bg-stone-100 text-stone-600',
};

export const TYPE_LABELS: Record<string, string> = {
  tree: 'Tree',
  shrub: 'Shrub',
  climber: 'Climber',
  perennial: 'Perennial',
  herb: 'Herb',
  groundcover: 'Groundcover',
  succulent: 'Succulent',
  grass: 'Grass',
  bulb: 'Bulb',
  annual: 'Annual',
  fern: 'Fern',
  palm: 'Palm',
  vegetable: 'Vegetable',
  fruit: 'Fruit',
};

export const HEALTH_STATUS_LABELS: Record<string, string> = {
  healthy: 'Healthy',
  good: 'Good',
  monitor: 'Monitor',
  struggling: 'Struggling',
  dormant: 'Dormant',
  establishing: 'Establishing',
  unknown: 'Unknown',
};

export const HEALTH_STATUS_COLORS: Record<string, string> = {
  healthy: 'bg-emerald-50 text-emerald-800',
  good: 'bg-emerald-50/60 text-emerald-700',
  monitor: 'bg-amber-50 text-amber-800',
  struggling: 'bg-red-50 text-red-800',
  dormant: 'bg-slate-100 text-slate-600',
  establishing: 'bg-teal-50 text-teal-800',
  unknown: 'bg-stone-100 text-stone-600',
};

export const HEALTH_STATUS_DOTS: Record<string, string> = {
  healthy: 'bg-emerald-400',
  good: 'bg-emerald-300',
  monitor: 'bg-amber-400',
  struggling: 'bg-red-400',
  dormant: 'bg-slate-300',
  establishing: 'bg-teal-400',
  unknown: 'bg-stone-300',
};

export const ATTENTION_STATUSES = ['struggling', 'monitor', 'establishing'];

export const SEASONAL_CONTEXT: Record<number, { headline: string; description: string }> = {
  1: { headline: 'Peak summer', description: 'Hot and dry. Deep water early morning, keep mulch topped up. Harvest summer fruit and herbs. Watch for heat stress on anything recently planted.' },
  2: { headline: 'Late summer', description: 'Still hot but days are shortening. Keep watering, deadhead spent flowers. Summer crops finishing up. Start thinking about autumn planting.' },
  3: { headline: 'Early autumn', description: 'Heat easing off. Great time to feed lawns and gardens, plant new shrubs and perennials. Ornamental grasses starting to brown — leave them for now.' },
  4: { headline: 'Autumn settling in', description: 'Deciduous plants dropping leaves, ornamental grasses going dormant. This is all normal. Good time to mulch, tidy up, and get winter-prep done.' },
  5: { headline: 'Late autumn', description: 'Growth slowing. Citrus still producing. Prune deciduous trees once leaves have dropped. Reduce watering as temperatures cool.' },
  6: { headline: 'Early winter', description: 'Most plants resting. Minimal watering needed unless very dry. Good time for structural pruning and garden planning.' },
  7: { headline: 'Mid-winter', description: 'Coldest month. Plants dormant or slow-growing. Prune roses and deciduous fruit trees. Plan spring planting. Leave frost-sensitive plants alone.' },
  8: { headline: 'Late winter', description: 'Days lengthening. Watch for early spring growth. Feed citrus, prepare garden beds. Start seeds undercover for spring planting.' },
  9: { headline: 'Early spring', description: 'Growth exploding. Feed everything, aerate lawns, plant new stock. Watch for pests waking up. Wattles and native shrubs flowering.' },
  10: { headline: 'Mid-spring', description: 'Peak planting time. Warm-season crops go in. Jasmine and other climbers pushing new growth hard. Stay on top of weeding.' },
  11: { headline: 'Late spring', description: 'Getting warmer. Increase watering. Summer annuals and herbs go in now. Prune spring-flowering shrubs after they finish.' },
  12: { headline: 'Early summer', description: 'Heat arriving. Mulch everything, set up consistent watering. Harvest stone fruit and berries. Watch for sun scorch on young plants.' },
};

export interface FeedGroup {
  dose: string;
  plants: string[];
}

export interface FeedProduct {
  id: string;
  name: string;
  timing: string;
  accent: string;      // tailwind classes for the label accent bar
  chip: string;        // tailwind classes for plant chips
  note?: string;
  groups: FeedGroup[];
}

export const FEEDING_PLAN: FeedProduct[] = [
  {
    id: 'native',
    name: 'Osmocote Native',
    timing: 'Once a year, late winter',
    accent: 'bg-terra',
    chip: 'bg-terra-soft text-terra',
    note: 'Low phosphorus. The only fertiliser the natives ever get; regular fertiliser harms them. Controlled-release, so going early costs nothing: it waits for warm soil.',
    groups: [
      { dose: 'Standard dose', plants: ['Banksia', 'Cinnamon Wattle', 'Kangaroo Paw', 'Westringia', 'Cushion Bush', 'Chalk Sticks', 'Dianellas', 'Native Daisies'] },
    ],
  },
  {
    id: 'richgro',
    name: 'Richgro All Purpose',
    timing: 'Late winter round, then a December top-up on the six climbers',
    accent: 'bg-olive',
    chip: 'bg-olive-soft text-olive',
    note: 'Conventional fertiliser. Applied too early, winter rain leaches it past sleeping roots, so hold the winter round until the last calm weekend before spring. Check the bag before December.',
    groups: [
      { dose: 'Normal dose', plants: ['Mexican Sage', "Salvia 'Caradonna'", 'Black Eyed Susan', 'Miscanthus', 'Bartlettina', 'Olive Tree', 'Native Frangipani', 'Giant Taro', 'Strawberry', 'Muehlenbeckia ×3', 'Star Jasmine (back)', 'Star Jasmine (west)'] },
      { dose: 'Generous, heavy feeder', plants: ['Passionfruit'] },
      { dose: 'Light dose', plants: ['Star Jasmine (east): wide around the 2 new plants, never against stems', 'Achillea', 'Lavender', 'Lily Turf', 'Dichondra', 'Native Violets'] },
    ],
  },
  {
    id: 'citrus',
    name: 'Experts Choice Fruit & Citrus',
    timing: 'Light doses in late winter, December and March',
    accent: 'bg-amber-500',
    chip: 'bg-amber-50 text-amber-800',
    note: 'Light dose only. Lush nitrogen-fed growth is exactly what gall wasps lay eggs into, and the hard-pruned trees will flush hard anyway. Not the lime until autumn 2027.',
    groups: [
      { dose: 'Light dose', plants: ['Lemon Tree', 'Citrus Tree (orange)', 'Grapefruit Tree'] },
    ],
  },
  {
    id: 'liquid',
    name: 'PowerFeed PRO Tomatoes & Vegetables (liquid)',
    timing: 'Indoor plants monthly Sept to Feb; outdoor conditionals in September',
    accent: 'bg-sky-600',
    chip: 'bg-sky-50 text-sky-800',
    note: 'Fish, compost and seaweed concentrate. The 1.2L bottle makes 540L, so full rate is about 2ml per litre and half strength is 1ml per litre (10ml in a 9L can). Always onto moist soil, never dry. It smells fishy for a day, so dose indoor plants in the laundry or outside. Not for the natives. The Eco-Seaweed powder on the same shelf is a tonic, not a feed: good after repotting or heat stress, but it does not replace this.',
    groups: [
      { dose: 'Half strength, monthly', plants: ['All indoor plants except succulents', 'Cast irons: once now, once in March', 'Kentia: every second month'] },
      { dose: 'Quarter strength', plants: ['String of Pearls'] },
      { dose: 'Half strength, one can, only if shoots are showing', plants: ['Rosemary', 'Echinacea (both)', "Rudbeckia 'Deamii'"] },
    ],
  },
  {
    id: 'lawn',
    name: 'Sudden Impact for Lawns',
    timing: 'Late winter, mid-summer and late March',
    accent: 'bg-emerald-600',
    chip: 'bg-emerald-50 text-emerald-800',
    note: 'The late-March feed is the one that holds buffalo colour through winter.',
    groups: [
      { dose: 'Bag rate', plants: ['Buffalo Lawn'] },
    ],
  },
];

export const FEEDING_SKIPS: Array<{ plant: string; reason: string }> = [
  { plant: 'Lime Tree', reason: 'recovering from the gall renovation prune. No feed until autumn 2027' },
  { plant: 'Feijoa', reason: 'cut to 1m. No feed while it re-establishes; lean keeps regrowth manageable' },
  { plant: 'Rosemary', reason: 'recovering from dieback, and prefers lean soil anyway. One half-strength can in September is the ceiling' },
  { plant: 'Echinacea (cutting bed + Sombrero)', reason: 'rot risk. Feed only once new basal growth shows in spring' },
  { plant: "Rudbeckia 'Deamii'", reason: 'same rule as the echinacea' },
  { plant: 'Dusty Miller', reason: 'never needs feeding' },
];

export const FEEDING_YEAR: Array<{ months: number[]; when: string; label: string; detail: string }> = [
  { months: [8, 9], when: 'Late winter', label: 'The big round', detail: 'Everything above, one lap. Normally a September job; in 2026 it was front-loaded to late July and August for the baby.' },
  { months: [9], when: 'September', label: 'Conditionals only', detail: 'Cutting-bed echinacea, rudbeckia and rosemary get one can of half-strength PowerFeed, and only if new basal growth has appeared. Indoor monthly PowerFeed starts.' },
  { months: [12], when: 'December', label: 'Summer top-up', detail: 'Citrus (light), passionfruit, buffalo lawn, and the growth-push Richgro on all six climbers.' },
  { months: [3], when: 'March', label: 'Autumn round', detail: 'Citrus, buffalo lawn, olive and all three jasmine runs. The lime rejoins here in 2027.' },
];

export function getCurrentMonth(): number {
  return todayFrom().month;
}

export function getTasksForMonth(
  plants: Array<{ id: string; data: { name: string; tasks: Array<{ months: number[]; task: string; category: string; completed?: string }> } }>,
  month: number,
) {
  const year = new Date().getFullYear();
  const yearTag = String(year);
  return plants.flatMap((plant) =>
    plant.data.tasks
      .filter((task) => task.months.includes(month) && !(task.completed && task.completed.startsWith(yearTag)))
      .map((task) => ({
        plantId: plant.id,
        plantName: plant.data.name,
        ...task,
      }))
  );
}

const URGENCY_ORDER = ['today', 'week', 'ongoing'];

export function getPlantsNeedingAttention<P extends { data: { urgency?: string; readyFrom?: string; dueBy?: string; healthStatus?: string } }>(
  plants: P[],
  todayIso: string = todayFrom().iso,
) {
  const flagged = plants
    .filter(p => p.data.urgency && URGENCY_ORDER.includes(p.data.urgency))
    .sort((a, b) => URGENCY_ORDER.indexOf(a.data.urgency!) - URGENCY_ORDER.indexOf(b.data.urgency!));
  // ISO date strings compare correctly as plain strings
  const attention = flagged.filter(p => !p.data.readyFrom || p.data.readyFrom <= todayIso);
  const waiting = flagged
    .filter(p => p.data.readyFrom && p.data.readyFrom > todayIso)
    .sort((a, b) => a.data.readyFrom!.localeCompare(b.data.readyFrom!));
  const later = plants.filter(p => p.data.urgency === 'later');
  const unassessed = plants.filter(p => !p.data.healthStatus || p.data.healthStatus === 'unknown');
  return { attention, waiting, later, unassessed };
}
