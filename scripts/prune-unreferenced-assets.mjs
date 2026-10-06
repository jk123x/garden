// Astro emits the original of every imported image next to the resized
// versions. Nothing links to the originals, so drop them from the deploy.
import { readdir, readFile, stat, unlink } from 'node:fs/promises';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;

async function walk(dir, out = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

const files = await walk(dist);
const referenced = new Set();
for (const file of files.filter((f) => /\.(html|css|js)$/.test(f))) {
  const text = await readFile(file, 'utf8');
  for (const match of text.matchAll(/\/_astro\/[^"'\s)]+/g)) referenced.add(match[0]);
}

let removed = 0;
let bytes = 0;
for (const file of files.filter((f) => /\/_astro\/.*\.(jpe?g|png|webp|avif)$/i.test(f))) {
  const url = file.slice(dist.length - 1);
  if (referenced.has(url)) continue;
  bytes += (await stat(file)).size;
  await unlink(file);
  removed++;
}
console.log(`pruned ${removed} unreferenced images (${(bytes / 1e6).toFixed(0)} MB)`);
