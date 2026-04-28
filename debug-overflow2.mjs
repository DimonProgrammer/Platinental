import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

await page.setViewportSize({ width: 375, height: 812 });
await page.goto('http://localhost:4321/v3/', { waitUntil: 'networkidle' });

const info = await page.evaluate(() => {
  return {
    docWidth: document.documentElement.scrollWidth,
    windowWidth: window.innerWidth,
    bodyWidth: document.body.scrollWidth,
  };
});

console.log('Overflow info:', info);

await browser.close();
