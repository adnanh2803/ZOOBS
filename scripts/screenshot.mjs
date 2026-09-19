import { chromium } from 'playwright';

const shots = [
	{ name: 'home-mobile', url: 'http://localhost:5173/', width: 390, height: 844 },
	{ name: 'home-desktop', url: 'http://localhost:5173/', width: 1280, height: 800 },
	{ name: 'detail-mobile', url: 'http://localhost:5173/prekrsaj/brzina-20-30', width: 390, height: 844 },
	{ name: 'kategorije-mobile', url: 'http://localhost:5173/kategorije', width: 390, height: 844 }
];

const browser = await chromium.launch();
for (const s of shots) {
	const page = await browser.newPage({ viewport: { width: s.width, height: s.height } });
	await page.goto(s.url, { waitUntil: 'networkidle' });
	await page.waitForTimeout(800);
	await page.screenshot({ path: `screenshots/${s.name}.png`, fullPage: true });
	console.log('saved', s.name);
	await page.close();
}
await browser.close();
