// Pure date-placement logic shared by the dashboard's build step and its
// client script, so a page built last week still sorts correctly today.

export const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;
export const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
] as const;

export interface Today {
  iso: string;
  year: number;
  month: number; // 1-12
  day: number;
}

export function todayFrom(d: Date = new Date()): Today {
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return { iso: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`, year, month, day };
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function nextMonthOf(month: number): number {
  return month === 12 ? 1 : month + 1;
}

export function formatShortDate(iso: string): string {
  const [, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS_SHORT[m - 1]}`;
}

export interface TaskLike {
  months: number[];
  day?: number;
  byDay?: number;
  completed?: string;
  repeat?: 'monthly';
}

export type Placement = 'now' | 'wait' | 'pool';

// A once-a-season job (completed "2026-09") stays hidden for the rest of that
// year. A `repeat: monthly` job is only hidden for the month it was completed
// in, so a monthly shear done 7 Oct comes back on 1 Nov.
export function isDone(task: TaskLike, today: Today): boolean {
  if (!task.completed) return false;
  if (task.repeat === 'monthly') return task.completed === today.iso.slice(0, 7);
  return task.completed.startsWith(String(today.year));
}

export function placeTask(task: TaskLike, today: Today): Placement {
  if (isDone(task, today)) return 'pool';
  if (task.months.includes(today.month)) {
    return task.day && today.day < task.day ? 'wait' : 'now';
  }
  return 'pool';
}

// How far a task's window runs past `fromMonth`: steps = 0 means it closes
// this month (most urgent).
export function windowEnd(months: number[], fromMonth: number): { endMonth: number; steps: number } {
  let end = fromMonth;
  let steps = 0;
  while (steps < 11 && months.includes(nextMonthOf(end))) {
    end = nextMonthOf(end);
    steps++;
  }
  return { endMonth: end, steps };
}

// Sort key for "Do now": window close first, then the byDay inside it.
export function deadlineKey(task: TaskLike, today: Today): number {
  return windowEnd(task.months, today.month).steps * 31 + (task.byDay ?? 31);
}

export type ChipTone = 'urgent' | 'late' | 'muted';
export interface Chip { text: string; tone: ChipTone }

export function taskChip(task: TaskLike, placement: Placement, today: Today): Chip {
  const cur = MONTHS_SHORT[today.month - 1];
  if (placement === 'wait') return { text: `from ${task.day} ${cur}`, tone: 'muted' };
  // A Do-now row is this month's job. The chip never points past the current
  // month, even when the task's months run on: a monthly shear listed Oct-Mar
  // is due again by the end of each of those months, not by 31 Mar.
  const closesThisMonth = windowEnd(task.months, today.month).steps === 0;
  const label = `${task.byDay ?? daysInMonth(today.year, today.month)} ${cur}`;
  if (task.byDay && today.day > task.byDay) return { text: `was due ${label}`, tone: 'late' };
  return { text: `by ${label}`, tone: closesThisMonth ? 'urgent' : 'muted' };
}

export interface DatedItem { readyFrom?: string; dueBy?: string }

// ISO strings compare correctly as plain strings.
export function isWaiting(item: DatedItem, today: Today): boolean {
  return !!item.readyFrom && item.readyFrom > today.iso;
}

export function attentionChip(item: DatedItem, today: Today): Chip | null {
  if (isWaiting(item, today)) return { text: `from ${formatShortDate(item.readyFrom!)}`, tone: 'muted' };
  if (item.dueBy && item.dueBy < today.iso) return { text: `was due ${formatShortDate(item.dueBy)}`, tone: 'late' };
  if (item.dueBy) return { text: `by ${formatShortDate(item.dueBy)}`, tone: 'urgent' };
  return null;
}
