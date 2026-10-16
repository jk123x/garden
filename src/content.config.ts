import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { plantSchema } from './lib/plant-schema';

const plants = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/plants' }),
  schema: plantSchema,
});

export const collections = { plants };
