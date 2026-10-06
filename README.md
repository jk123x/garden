# Garden

Personal garden care app for one Melbourne garden. Static Astro site, deployed to Vercel.

The dashboard reads today's date and shows what to do now, what's waiting on a date, and what's coming next month. Plant data is YAML in `src/content/plants/`. Working notes for Claude sessions are in `CLAUDE.md`.

```sh
npm install
npm run dev      # http://localhost:4325
npm test         # vitest: date placement logic
npm run build    # astro build, then prunes unreferenced image originals from dist/
```

Photos live in `src/images/` and are resized to webp at build time via `src/components/Photo.astro`.
