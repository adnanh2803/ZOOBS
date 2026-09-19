# ZOOBS — Saobraćajni priručnik BiH

Police field handbook for the Law on Road Traffic Safety in BiH (ZOOBS), built with SvelteKit + Tailwind.

- Fast search over 20 curated violations (speed, alcohol, documents, signals, seatbelt/phone/helmet)
- Each record links a behavior norm to a penalty article with exact quotes from the official consolidated text (parlament.ba lawId=1218, Nov 2024)
- Data pipeline: `docs/source/zobs-2024.pdf` → `docs/zobs-2024.md` → `src/lib/data/violations.json`
- Screenshot iteration: `scripts/screenshot.mjs` (390px + 1280px) after every UI change

## Develop

```sh
npm install
npm run dev -- --host
```

## Build

```sh
npm run check
npm run build
```
