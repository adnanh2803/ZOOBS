# AGENTS.md — Traffic Law BiH app

## Screenshot iteration loop (mandatory for UI changes)
After every UI change:
1. Run `npm run dev -- --port 5173 --host` in background.
2. Open browser at `http://localhost:5173`, screenshot at 390px mobile + 1280px desktop.
3. Read screenshots for: touch target size, sunlight contrast, search readability, fine amount visibility.
4. Fix issues before finishing. Legal accuracy is checked separately against `docs/zobs-2024.md`, never by screenshot.

## Data rules
- Single source: `docs/zobs-2024.md` (from parlament.ba lawId=1218, Nov 2024). Frozen.
- App data: `src/lib/data/violations.json` with fields: id, naziv, kategorija, keywords, clan_norme, citat_norme, clan_sankcije, citat_sankcije, kazna_min/max, bodovi, zabrana, zatvor, opis, source_md, status.
- Never guess links between rule and sanction. If unclear, set `status: "nacrt"` and `needs_human: true`.
- Communication in English. App UI content in Bosnian only.
- Every violation must show disclaimer link to official source.

## Builder vs tester
- Builder drafts JSON from MD with exact quotes.
- Tester independently verifies quote exists in MD and runs police queries (e.g. "0.9 promila", "brzina 25 preko") expecting single correct hit.
