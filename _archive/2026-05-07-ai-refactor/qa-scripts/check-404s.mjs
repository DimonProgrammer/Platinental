import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

const missing = new Set();

page.on('response', response => {
  if (response.status() === 404) {
    missing.add(response.url());
  }
});

await page.goto('http://localhost:4321/v3/plastika', { waitUntil: 'networkidle' });

console.log('Missing resources:');
Array.from(missing).forEach(url => console.log(`  ${url}`));

await browser.close();
