import { chromium } from 'playwright';

const browser = await chromium.launch({
	executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
for (const q of ['mobitel', 'obijesna', 'odbijanje', '0.9 promila', 'brzina 25 preko']) {
	await page.getByLabel('Pretraga prekršaja').fill(q);
	await page.waitForTimeout(400);
	const n = await page.locator('ul li').count();
	const t = n > 0 ? (await page.locator('ul li h2').first().textContent()).trim() : '-';
	console.log(JSON.stringify(q), '->', n, 'hit(s) ::', t);
}
await browser.close();
