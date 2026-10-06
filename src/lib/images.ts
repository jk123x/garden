import type { ImageMetadata } from 'astro';

// Plant YAML keeps the historical `/images/...` paths; the files live in
// src/images so Astro can resize + convert them at build time.
const modules = import.meta.glob<{ default: ImageMetadata }>('/src/images/**/*.{jpg,jpeg,png}');

const cache = new Map<string, Promise<ImageMetadata | undefined>>();

export function resolveImage(path?: string): Promise<ImageMetadata | undefined> {
  if (!path) return Promise.resolve(undefined);
  const key = path.startsWith('/src/') ? path : `/src${path}`;
  if (!cache.has(key)) {
    const loader = modules[key];
    if (!loader) {
      console.warn(`[images] no file for ${path}`);
      cache.set(key, Promise.resolve(undefined));
    } else {
      cache.set(key, loader().then((m) => m.default));
    }
  }
  return cache.get(key)!;
}
