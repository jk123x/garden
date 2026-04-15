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
