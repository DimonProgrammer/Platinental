import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

await page.setViewportSize({ width: 375, height: 812 });
await page.goto('http://localhost:4321/v3/', { waitUntil: 'networkidle' });

const elements = await page.evaluate(() => {
  const results = [];
  document.querySelectorAll('*').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      results.push({
        tag: el.tagName,
        class: el.className,
        width: rect.width,
        right: rect.right,
        text: el.textContent?.substring(0, 50)
      });
    }
  });
  return results.slice(0, 5);
});

console.log('Overflowing elements:');
elements.forEach(e => console.log(JSON.stringify(e, null, 2)));

await browser.close();
