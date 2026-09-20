import { chromium } from 'playwright';

// Tester pass (AGENTS.md): police queries must return the correct hits.
// Numeric queries expect a SINGLE correct bracket hit.
const cases = [
	// [query, expectedCount|'any', expectedFirstTitle?]
	['mobitel', 1, 'Korištenje mobilnog telefona u vožnji'],
	['obijesna', 1, 'Obijesna vožnja'],
	['odbijanje', 1, 'Odbijanje alkotestiranja i stručnog pregleda'],
	['vozio pijan', 'any'],
	['nema vozačku', 1, 'Upravljanje vozilom bez položenog vozačkog ispita'],
	['telefon u vožnji', 1, 'Korištenje mobilnog telefona u vožnji'],
	['1.6 promila', 1, 'Upravljanje vozilom sa preko 1,5 g/kg alkohola'],
	['0.9 promila', 1, 'Upravljanje vozilom sa 0,8–1,5 g/kg alkohola'],
	['alkohol 1.5', 1, 'Upravljanje vozilom sa 0,8–1,5 g/kg alkohola'],
	['brzina 25 preko', 1, 'Prekoračenje brzine 20–30 km/h'],
	['30 preko ograničenja', 1, 'Prekoračenje brzine 20–30 km/h'],
	['član 44', 'any']
];

const browser = await chromium.launch({
	executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
let fail = 0;
for (const [q, expected, title] of cases) {
	await page.getByLabel('Pretraga prekršaja').fill(q);
	await page.waitForTimeout(400);
	const n = await page.locator('ul li').count();
	const t = n > 0 ? (await page.locator('ul li h2').first().textContent()).trim() : '-';
	const okCount = expected === 'any' ? n > 0 : n === expected;
	const okTitle = title === undefined || t === title;
	const ok = okCount && okTitle;
	if (!ok) fail++;
	console.log(ok ? 'PASS' : 'FAIL', JSON.stringify(q), '->', n, 'hit(s) ::', t);
}
await browser.close();
if (fail > 0) process.exit(1);
console.log('all tester queries passed');
