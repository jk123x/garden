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
    lastAssessed: z.string().optional(),
    photoNeeded: z.string().optional(),
    image: z.string().optional(),
    notes: z.string().optional(),
    tasks: z.array(z.object({
      months: z.array(z.number().min(1).max(12)),
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
