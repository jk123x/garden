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

export function getCurrentMonth(): number {
  return new Date().getMonth() + 1;
}

export function getTasksForMonth(
  plants: Array<{ id: string; data: { name: string; tasks: Array<{ months: number[]; task: string; category: string }> } }>,
  month: number,
) {
  return plants.flatMap((plant) =>
    plant.data.tasks
      .filter((task) => task.months.includes(month))
      .map((task) => ({
        plantId: plant.id,
        plantName: plant.data.name,
        ...task,
      }))
  );
}

export function getPlantsNeedingAttention(
  plants: Array<{ id: string; data: { name: string; location: string; indoor?: boolean; healthStatus?: string; health?: string; image?: string } }>,
) {
  const attention = plants
    .filter(p => p.data.healthStatus && ATTENTION_STATUSES.includes(p.data.healthStatus))
    .sort((a, b) => {
      const aIdx = ATTENTION_STATUSES.indexOf(a.data.healthStatus!);
      const bIdx = ATTENTION_STATUSES.indexOf(b.data.healthStatus!);
      return aIdx - bIdx;
    });
  const unassessed = plants.filter(p => !p.data.healthStatus || p.data.healthStatus === 'unknown');
  return { attention, unassessed };
}
