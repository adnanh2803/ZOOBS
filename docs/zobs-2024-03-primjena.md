# ZOBS 2024 — Primjena kazne: raspon vs. tačan iznos (notes for future devs)

> Status: guidance only, NOT law. Frozen source is `docs/zobs-2024.md`
> (Parlamentarna skupština BiH, lawId=1218, Nezvanični prečišćeni tekst novembar 2024).
> Legally binding text is Službeni glasnik BiH.
> Download: https://www.parlament.ba/law/DownloadDocument?lawDocumentId=1ec38890-c533-446f-868b-d629bbde3d22&langTag=bs
> Index extractions: `docs/zobs-2024-01-pravila.md`, `docs/zobs-2024-02-kaznene.md`.
> Every violation in the app must show disclaimer link to official source (AGENTS.md).
> Communication here in English. App UI strings in Bosnian only.

## A. General rule: ZOBS gives a RANGE, exact amount is set outside ZOBS

1. ZOBS never sets a per-km/h or per-promile price table. It sets brackets,
   e.g. `docs/zobs-2024-02-kaznene.md#clan-234a`:
   > "Novčanom kaznom u iznosu od 400,00 KM do 1.000,00 KM kaznit će se za prekršaj:"
2. Exact amount inside the bracket is set by:
   - police officer via `prekršajni nalog` on the spot, or
   - court (`sud za prekršaje`) if driver requests `sudsko odlučivanje` or procedure requires it.
   - ZOBS `Član 242` (p.106): issuing of `prekršajni nalog` is done by
     `ovlašteno lice nadležnog organa za poslove kontrole i reguliranja saobraćaja`.
3. Criteria for picking the amount are NOT in ZOBS. They are in entity
   `Zakon o prekršajima` (secondary source, must be marked as such in UI).
   RS law, `Član 45. Odmjeravanje kazne` (verified via
   https://www.paragraf.ba/propisi/republika-srpska/zakon-o-prekrsajima-republike-srpske.html):
   > "Sud će počiniocu prekršaja odmjeriti kaznu u granicama propisanim za taj prekršaj,
   > imajući u vidu svrhu kažnjavanja i okolnosti koje utiču da kazna bude veća ili manja
   > (olakšavajuće i otežavajuće okolnosti), a naročito: 1) stepen odgovornosti počinioca,
   > 2) posljedice prekršaja, 3) okolnosti pod kojima je prekršaj počinjen,
   > 4) ranija kažnjavanja, 5) lične prilike počinioca,
   > 6) držanje počinioca poslije počinjenog prekršaja,
   > 7) druge okolnosti koje su od značaja za odmjeravanje kazne."
   - `Član 45 st.(3)`: `imovinsko stanje` is also considered.
   - `Član 45 st.(2)`: old sanction erased from Register OR older than 5 years
     cannot count as aggravating.
   - FBiH law has the same structure (separate act, same logic). Do not quote
     FBiH article numbers here until verified — mark `needs_human` if needed.
4. Practical meaning for traffic (do NOT hardcode as law, it is practice):
   first clean offence + small excess + polite behaviour → minimum;
   large excess, school zone, danger, repeat, bad attitude, accident → upper half.
5. `Prekršajni nalog` procedure (RS `Član 44`, verified same source):
   - payment deadline is set in the nalog, min 8 days / max 3 months from finality;
   - `Član 44 st.(2)`: if driver accepts responsibility and pays HALF within
     8 days of receipt, the other half is forgiven;
   - driver has 8 days to request `sudsko odlučivanje`; accepting responsibility
     bars later appeal on amount (`Član 151`).
6. Protective measures via nalog are limited: RS `Član 60 st.(4)`:
   `ovlašteni organ može prekršajnim nalogom izreći samo jednu zaštitnu mjeru
   u najkraćem predviđenom trajanju`. Example: 234a ban `2–6 mj.` → via nalog
   only `2 mj.`; longer needs court.
7. Points (`kazneni bodovi`) are automatic consequence written in ZOBS itself,
   not discretionary. They apply only to a driver holding a BiH licence
   (RS `Član 51 st.(5)` logic). Do not let police/sud change the number.
8. Accident escalation is written in ZOBS itself per article (`st.(3)` / `st.(2)`).
   Always display it: e.g. 234a accident = `1.000–5.000 KM + zabrana 6 mj.`
9. Ban timing: ZOBS `Član 245`: ban runs from deposit of licence per `Član 222`;
   prison time does not count. `Član 246`: ban can be suspended (6–12 months
   probation) EXCEPT for `Član 235 tač. 25), 26), 32), 33)` (drugs, alcohol
   0.8–1.5, test refusal and related).
10. Foreign licence: `Član 248` → instead of ban, `zabrana korištenja strane
    vozačke dozvole` same duration, valid only on BiH territory.
11. Minors: `Član 249` → parent/guardian pays if caused by lack of care.
    Learner driver: `Član 250` → instructor is liable unless he could not prevent it.

App consequence: NEVER show a single invented fine. Show `kazna_min–kazna_max`
+ helper text (Bosnian, UI only):
`Tačan iznos u rasponu određuje policijski službenik prekršajnim nalogom ili sud za prekršaje.`
+ link to official source.

## B. Brackets (from `02-kaznene`, quotes shortened but verbatim)

### Član 232 — companies, 2.000–10.000 KM (responsible person 500–1.000)
Road maintenance, vehicle production/certification, Central register, etc.
App: not driver-facing, skip unless fleet module is added.

### Član 233 — companies, 1.000–8.000 KM (responsible 100–300)
Road design/signalling, ordering unlicensed driver, overloaded vehicle, etc.
App: not driver-facing.

### Član 234 — companies, 500–5.000 KM (self-employed 500–1.000, responsible 100–300)
Child-transport marking, speed-limit marking, towing, load marking, etc.
App: not driver-facing.

### Član 234a — driver, 400–1.000 KM (the "400–1000" question)
> "Novčanom kaznom u iznosu od 400,00 KM do 1.000,00 KM kaznit će se za prekršaj:"

| tač. | who / what (norm) |
|------|-------------------|
| 1) | ometanje saobraćaja / oštećenje puta (čl.3 st.2) |
| 2) | prostor iznad kolovoza 4,5–7 m (čl.17) |
| 3) | protivno čl.19 (zaštita puta) |
| 3a) | dijete <12 god. na sjedištu suvozača (čl.34 st.3) |
| 4) | alkohol preko 1,5 g/kg (čl.174 st.2) |
| 5) | **brzina u NASELJU >30 km/h iznad dozvoljene (čl.44, 46 st.1–2)** |
| 6) | učesnik nezgode protivno čl.154 st.1 |
| 7) | vožnja prije sticanja prava (čl.184) |
| 8) | neregistrirano / potvrda istekla >30 dana (čl.207, 211 st.1) |
| 9) | tuđe tablice (čl.209 st.1) |
| 10) | odbijanje alkotest / stručni pregled (čl.220 st.1–2) |
| 11) | vožnja protivno čl.227 |

Add-ons (`Član 234a st.(2)`, verbatim core):
> "Za prekršaje iz stava (1) tač. 4), 5), 8), 9), 10) i 11) ... uz kaznu će se izreći zaštitna mjera zabrane upravljanja motornim vozilom u trajanju od dva mjeseca do šest mjeseci i dva kaznena boda."
So: speed >30, alcohol >1.5, unregistered, wrong plates, test refusal, čl.227 → **2 points + ban 2–6 months**.

Accident (`st.(3)`):
> "kojim je izazvana saobraćajna nezgoda ... 1.000,00 KM do 5.000,00 KM, a vozaču će se uz kaznu izreći zaštitna mjera zabrane ... u trajanju od šest mjeseci."

### Član 235 — driver, 100–300 KM
Core: `brzina +20 do +30 (čl.44, 46)`, pojas, mobilni, antiradar-korištenje, crveno svjetlo, preticanja, alkohol 0,8–1,5, pogrešna kategorija, odbijanje testa, etc. (32+ tačaka, see MD).
Ban (`st.(2)`): for tač. 1),2),3),5),10),11),13),14),15),17),18),25),26),32),33) → ban 1–4 months mandatory; for others ban 1–4 months possible.
Accident (`st.(3)`): 300–1.000 KM + ban 1–6 mj (except t.27 — driving before licence).
Points (`st.(4)`): tač. from `st.(2)` list → **2 points**; other tač. from st.(1) → **1 point**.
So speed +20–30 (`t.3`, in the st.(2) list) → **2 points**.

### Član 236 — 50–250 KM
Core: ostavljeno vozilo/predmeti (čl.26), držanje antiradara u vozilu (čl.33a), neprilagođena brzina (čl.43 st.1), alkohol 0,3–0,8, etc.
Accident/danger (`st.(2)`): 100–300 KM + 1–2 points; driver possible ban to 2 mj.
Points (`st.(3)`): **1–2 points** (range, decided by court/nalog — display as "1–2").

### Član 237 — fixed 50 KM
Core: `t.3` speed +10–20 (čl.44, 46 st.1–2), kaciga (t.15), odstojanje, svjetla, etc.
Accident (`st.(2)`): 50–200 KM + 1–2 points. Ban (`st.(3)`): to 2 mj possible.

### Član 238 — fixed 40 KM
Core includes `t.7a`:
> "vozač koji se vozilom na putu u naselju kreće brzinom koja je 10-20 km/h veća od dozvoljene, odnosno vozač koji se vozilom na putu van naselja kreće brzinom koja je od 20-30 km/h veća od dozvoljene (član 44. i član 46. st. (1) i (2))"
Accident (`st.(2)`): 50–200 KM + 1 point. Ban (`st.(3)`): to 2 mj possible.

### Član 239 — fixed 30 KM
Core includes `t.7`:
> "vozač koji se vozilom na putu van naselja kreće brzinom koja je od 10 do 20 km na sat veća od dozvoljene brzine (član 44. st. (3) i (4) i član 46. st. (1) i (2))"
Accident (`st.(2)`): 50–150 KM + 1 point. Ban (`st.(3)`): to 2 mj possible.

## C. Speed worked example (answers "400–1000, how much exactly?")

| excess | bracket in current JSON | ZOBS sanction | points | ban |
|--------|------------------------|---------------|--------|-----|
| +10–20 naselje | `brzina-10-20` → 50 fixed (237 t.3) BUT overlaps 238 t.7a (40 fixed) — see gap log | 40 or 50 fixed depending on qualification | 0 | none |
| +10–20 van naselja | `brzina-10-20` (says 50) BUT 239 t.7 says 30 fixed — see gap log | 30 or 50 fixed depending on qualification | 0 | none |
| +20–30 | `brzina-20-30` → 100–300 (235 t.3) | 100–300, exact per Čl.45 criteria | 2 | 1–4 mj (mandatory for this tač.) |
| >30 naselje | `brzina-30-plus` → 400–1.000 (234a t.5) | 400–1.000, exact per Čl.45 criteria | 2 | 2–6 mj |
| >30 van naselja | NOT in 234a text (only naselje) — see gap log | `needs_human: true` | ? | ? |

No, there is no explicit "35 over = 600" table. `+31` and `+70` share the same
bracket; the difference is handled as aggravating circumstance (stepen/danger),
not as a separate fine line. Current `violations.json` correctly stores min/max;
do not invent midpoints.

Internet cross-check (Sep 2026): https://kazne.ba/vodici/kazna-za-brzinu lists
`>30 → 400–1000 + 2 boda + 2–6 mj`, matching 234a st.(1)–(2). Single-number
portals (e.g. "400 KM") show the minimum only.

## D. Points & bans cheat sheet (driver-facing articles)

- 234a t.4,5,8,9,10,11 → 2 points + ban 2–6 mj. Other 234a → no points/ban unless accident.
- 235 st.(2)-list (incl. speed 20–30, belt, phone, red light, alcohol 0.8–1.5) → 2 points + ban 1–4 mj. Other 235 → 1 point.
- 236 → 1–2 points.
- 237 fixed-50 → 0 points, unless accident → 1–2 points.
- 238/239 fixed → 0 points, unless accident → 1 point.
- Accident always escalates fine AND can add/extend ban — display second line.

Note: `violations.json#brzina-30-plus` fixed to `"bodovi": "2"`, `"zabrana": "2–6 mj."`
per 234a st.(2) (applied + screenshot-verified at 390/1280px).

## E. Gap log — DO NOT GUESS, set `status: "nacrt", needs_human: true`

1. `>30 van naselja`: 234a t.5 text covers only `u naselju`. No matching sanction line found in 235/236/237/238/239 reads. Needs human lawyer decision before adding a `brzina-30-plus-van` entry.
2. `10–20 naselje`: 237 t.3 (50 KM) vs 238 t.7a (40 KM) overlap. Same for `20–30 van naselja`: 235 t.3 (100–300) vs 238 t.7a (40 KM). Likely different legal generations/amendments consolidated in prečišćeni tekst; needs human decision which line the app should cite. Until then keep existing JSON ids but flag `needs_human`.
3. 236 st.(3) / 237 st.(2) point ranges (`1–2`) have no per-case split in ZOBS — display range, exact by court/nalog.
4. FBiH `Zakon o prekršajima` article numbers for individualization/half-pay not verified in this pass — only RS numbers are cited. Do not present RS numbers as federation law in UI.

## F. How to use these notes (builder vs tester)

- Builder: when drafting `violations.json`, copy `citat_norme`/`citat_sankcije` verbatim from frozen MD; set `source_md` to `docs/zobs-2024-02-kaznene.md#clan-XXX`; if norm↔sanction link unclear → `status: "nacrt"`.
- Tester: grep quote in `docs/zobs-2024.md`; run police queries (`0.9 promila`, `brzina 25 preko`, `crveno svjetlo`, `pojas`) expecting single correct hit; check min/max + points + ban triple.
- UI: fine shown as range or fixed; below it the Bosnian helper line + `Kazneni bodovi: X` + `Zabrana: Y` + disclaimer link. Legal accuracy only against MD, never screenshot (screenshots only check touch targets/contrast/readability per AGENTS.md).
