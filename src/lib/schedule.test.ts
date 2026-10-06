import { describe, expect, it } from 'vitest';
import {
  attentionChip, deadlineKey, isWaiting, placeTask, taskChip, todayFrom, windowEnd,
} from './schedule';

const sep5 = todayFrom(new Date(2026, 8, 5));
const dec20 = todayFrom(new Date(2026, 11, 20));

describe('todayFrom', () => {
  it('formats an ISO date without timezone drift', () => {
    expect(sep5).toEqual({ iso: '2026-09-05', year: 2026, month: 9, day: 5 });
  });
});

describe('placeTask', () => {
  it('puts a task due this month in Do now', () => {
    expect(placeTask({ months: [9] }, sep5)).toBe('now');
  });
  it('holds a task back until its day', () => {
    expect(placeTask({ months: [9], day: 15 }, sep5)).toBe('wait');
    expect(placeTask({ months: [9], day: 5 }, sep5)).toBe('now');
  });
  it('keeps next month off the dashboard', () => {
    expect(placeTask({ months: [10] }, sep5)).toBe('pool');
    expect(placeTask({ months: [1] }, dec20)).toBe('pool');
  });
  it('hides tasks completed this year but not last year', () => {
    expect(placeTask({ months: [9], completed: '2026-07' }, sep5)).toBe('pool');
    expect(placeTask({ months: [9], completed: '2025-09' }, sep5)).toBe('now');
  });
  it('parks everything else in the pool', () => {
    expect(placeTask({ months: [3, 4] }, sep5)).toBe('pool');
  });
});

describe('windowEnd', () => {
  it('finds where a run of months closes', () => {
    expect(windowEnd([9], 9)).toEqual({ endMonth: 9, steps: 0 });
    expect(windowEnd([9, 10, 11], 9)).toEqual({ endMonth: 11, steps: 2 });
    expect(windowEnd([10, 11, 12, 1, 2, 3], 12)).toEqual({ endMonth: 3, steps: 3 });
  });
});

describe('taskChip', () => {
  it('flags a window closing this month as urgent', () => {
    expect(taskChip({ months: [9] }, 'now', sep5)).toEqual({ text: 'by 30 Sep', tone: 'urgent' });
  });
  it('never points past the current month, even on a recurring or open window', () => {
    expect(taskChip({ months: [9, 10, 11] }, 'now', sep5)).toEqual({ text: 'by 30 Sep', tone: 'muted' });
    expect(taskChip({ months: [10, 11, 12, 1, 2, 3] }, 'now', dec20)).toEqual({ text: 'by 31 Dec', tone: 'muted' });
  });
  it('uses byDay and goes late once passed', () => {
    expect(taskChip({ months: [9], byDay: 20 }, 'now', sep5)).toEqual({ text: 'by 20 Sep', tone: 'urgent' });
    expect(taskChip({ months: [9], byDay: 3 }, 'now', sep5)).toEqual({ text: 'was due 3 Sep', tone: 'late' });
  });
  it('labels waiting rows by date', () => {
    expect(taskChip({ months: [9], day: 15 }, 'wait', sep5)).toEqual({ text: 'from 15 Sep', tone: 'muted' });
  });
});

describe('deadlineKey', () => {
  it('sorts soonest deadline first', () => {
    const closesNow = deadlineKey({ months: [9], byDay: 10 }, sep5);
    const endOfMonth = deadlineKey({ months: [9] }, sep5);
    const openWindow = deadlineKey({ months: [9, 10, 11] }, sep5);
    expect(closesNow).toBeLessThan(endOfMonth);
    expect(endOfMonth).toBeLessThan(openWindow);
  });
});

describe('attention items', () => {
  it('waits on readyFrom and promotes on the day', () => {
    expect(isWaiting({ readyFrom: '2026-09-06' }, sep5)).toBe(true);
    expect(isWaiting({ readyFrom: '2026-09-05' }, sep5)).toBe(false);
    expect(attentionChip({ readyFrom: '2026-09-06' }, sep5)).toEqual({ text: 'from 6 Sep', tone: 'muted' });
  });
  it('shows dueBy and flips to late after it', () => {
    expect(attentionChip({ dueBy: '2026-09-11' }, sep5)).toEqual({ text: 'by 11 Sep', tone: 'urgent' });
    expect(attentionChip({ dueBy: '2026-09-02' }, sep5)).toEqual({ text: 'was due 2 Sep', tone: 'late' });
    expect(attentionChip({}, sep5)).toBeNull();
  });
});
