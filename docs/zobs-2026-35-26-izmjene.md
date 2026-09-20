# ZOBS izmjene 35/2026 — diff vs. frozen Nov-2024 source

> Source: Službeni glasnik BiH br. 35, 19.5.2026 (str. 762–763), PDF:
> `docs/source/zobs-2026-35-26.pdf` (via MUP KS propisi page).
> Donosilac: PS BiH (PD 15.10.2025, Dom naroda 14.5.2026).
> Stupanje na snagu: osmi dan od objave → **27.5.2026** (Član 8).
> News cross-check: ilijas.net 14.5.2026 (obijesna vožnja 2.000–3.000 KM + 6 mj.;
> mobitel 200–400 KM; odbijanje testiranja 1.000 KM + zadržavanje 12 h).
> Status: verified against official text. App footer: "Posljednja provjerena izmjena: 35/2026".

## Član 1. — Član 9. definicije (no fine changes, note for future Zakon browser)

- 32) naselje — nova definicija (prostor sa redovima zgrada, granice znakovima).
- Nova 36c) ometanje saobraćaja: "radnja u saobraćaju kojom se nekoga suprotno
  saobraćajnim propisima prisiljava na promjenu dotadašnjeg načina učešća u saobraćaju;"
- 42) pješak prošireno: "ili se na bilo koji drugi način nalazi na kolovozu;"
- 76) učesnik redefinisan; nove 76a) učesnik u nezgodi, 76b) ugrožavanje saobraćaja.
- App impact: none on current 20 entries (ometanje entry cites čl. 3 st. (2), unchanged).

## Član 2. — Novi član 42a. Obijesna vožnja (NEW norm)

> "Obijesna vožnja je postupanje vozača koje je u gruboj suprotnosti s pravilima
> saobraćaja prilikom koje vozač ne pokazuje obzir prema sigurnosti u saobraćaju,
> odnosno ozbiljno narušava sigurnost u saobraćaju."

Pod obijesnom vožnjom smatra se i (st. (2)):
1) 2+ prolaza kroz crveno u 20 minuta;
2) naselje +40 / van naselja +60 km/h preko dozvoljene;
3) preticanje kolone preko pune uzdužne linije;
4) alkohol >1,50 g/kg ili narkotici/psihoaktivne supstance.

St. (3)–(5): privremeno oduzimanje vozila na licu mjesta kod POVRATA
(kažnjen za 42a u prethodne 2 godine, uvid u evidenciju čl. 244);
čuvanje do pravosnažnosti; MUP ne odgovara za atmosfersku štetu/višu silu.
App impact: NEW entry `obijesna-voznja` (norma Član 42a, sankcija Član 234b).

## Član 3. — Član 224. stav (2) ZADRŽAVANJE do 12 h (changed procedure)

> "...a vozača kod kojeg se utvrdi količina alkohola u krvi preko 1.5 g/kg ili koji
> odbije testiranje na alkohol ili opojne droge, a pokazuje znakove poremećenosti
> izazvane djelovanjem alkohola ili opojnih droga, zadržati do prestanka djelovanja
> alkohola ili opojnih droga, a najduže 12 sati."

App impact: opis note on `odbijanje-alkotest` (+ alkohol-15-plus): zadržavanje do 12 h.

## Član 4. — Član 234a. st. (4) i (5) (added)

- St. (4): za t. 7), 8), 9), 10), 11) moguća zaštitna mjera TRAJNOG oduzimanja vozila
  uz uslove iz člana 42a. App impact: opis note on `bez-dozvole`, `neregistrovano`,
  `pogresne-tablice`, `odbijanje-alkotest` (+ čl. 227 entry when added).
- St. (5): za t. 10) (odbijanje testiranja) izriče se MAKSIMALNA kazna iz st. (1).
  App impact: `odbijanje-alkotest` kazna 400–1000 → **1000 fiksno**.

## Član 5. — Novi član 234b. Obijesna vožnja sankcija (NEW sanction)

> "(1) Novčanom kaznom u iznosu od 2.000,00 KM do 3.000,00 KM kaznit će se za
> prekršaj vozač motornog vozila koji krajnjom nepažnjom ozbiljno narušava sigurnost
> drugih učesnika u saobraćaju, na način da se njegovo postupanje karakterizira kao
> obijesna vožnja (član 42a)."

- St. (2): + zabrana 6 mjeseci + 2 boda.
- St. (3) nezgoda: 3.000–5.000 KM + zabrana 9 mjeseci + 4 boda.
- St. (4): moguće trajno oduzimanje vozila (uslovi 42a).
- App impact: NEW entry `obijesna-voznja`: 2000–3000, bodovi 2, zabrana 6 mj.

## Član 6. — Član 235. st. (1) tač. 1a), 1b), 1c) BRIŠU SE

App impact: `mobilni`, `antiradar`, `pojas` no longer cite Član 235 → see Član 7.

## Član 7. — Novi član 235a. (NEW sanction for phone/jammer/belt)

> "(1) Novčanom kaznom u iznosu od 200,00 KM do 400,00 KM kaznit će se za prekršaj:
> 1) vozač koji prilikom upravljanja vozilom koristi mobilni telefon ili drugi uređaj
> protivno odredbama člana 33. ovog zakona;
> 2) vozač koji u saobraćaju na putu koristi uređaj, odnosno sredstvo kojim se može
> ometati rad uređaja za mjerenje brzine kretanja vozila, odnosno drugih uređaja
> namijenjenih za dokumentiranje prekršaja (član 33a. stav (1));
> 3) vozač ili drugo lice koje se za vrijeme vožnje u motornom vozilu ne veže
> sigurnosnim pojasom (član 34. stav (1));"

> "(2) ... kojim je izazvana saobraćajna nezgoda ... 400,00 KM do 2.000,00 KM, a vozaču
> ... zabrana ... od jednog mjeseca do šest mjeseci i dva kaznena boda."

App impact: `mobilni`, `antiradar`, `pojas` → 200–400, bodovi 0, zabrana nema,
opis notes accident escalation (400–2000 + 1–6 mj. + 2 boda). Old 100–300 values were
pre-35/26 law — keeping them would show wrong fines for official actions.

## Open points / needs_human

- 235a base has NO points/ban — confirmed by absence in text (only st.(2) accident).
- 234a st.(4) seizure is conditional (42a: repeat within 2 years) — opis notes only.
- FBiH/RS prekršajni postupak for new seizure measure — not in ZOBS, needs_human if
  we ever write procedural steps (Phase 2 postupanje).
