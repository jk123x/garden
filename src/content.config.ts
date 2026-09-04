import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const plants = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/plants' }),
  schema: z.object({
    name: z.string(),
    type: z.enum([
      'tree', 'shrub', 'climber', 'perennial', 'herb',
      'groundcover', 'succulent', 'grass', 'bulb', 'annual',
      'fern', 'palm', 'vegetable', 'fruit',
    ]),
    indoor: z.boolean().default(false),
    location: z.string(),
    health: z.string().optional(),
    healthStatus: z.enum(['healthy', 'good', 'monitor', 'struggling', 'dormant', 'establishing', 'unknown']).optional(),
    urgency: z.enum(['today', 'week', 'ongoing', 'later']).optional(),
    nextAction: z.string().optional(),
    readyFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    dueBy: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    lastAssessed: z.string().optional(),
    photoNeeded: z.string().optional(),
    image: z.string().optional(),
    photos: z.array(z.object({
      src: z.string(),
      caption: z.string().optional(),
    })).default([]),
    notes: z.string().optional(),
    tasks: z.array(z.object({
      months: z.array(z.number().min(1).max(12)),
      day: z.number().min(1).max(31).optional(),
      byDay: z.number().min(1).max(31).optional(),
      task: z.string(),
      category: z.enum(['prune', 'feed', 'water', 'mulch', 'spray', 'plant', 'harvest', 'general']),
      completed: z.string().optional(),
    })).default([]),
    log: z.array(z.object({
      date: z.string(),
      entry: z.string(),
      category: z.enum(['prune', 'feed', 'water', 'mulch', 'spray', 'plant', 'harvest', 'general']).optional(),
    })).default([]),
  }),
});

export const collections = { plants };
