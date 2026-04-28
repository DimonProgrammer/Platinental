import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

const urls = [
  'http://localhost:4321/v3/',
  'http://localhost:4321/v3/plastika',
  'http://localhost:4321/v3/doctors',
  'http://localhost:4321/v3/kosmecevtika',
];

for (const url of urls) {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(url, { waitUntil: 'networkidle' });
  
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  
  if (overflow) {
    console.log(`HORIZONTAL SCROLL DETECTED: ${url}`);
  } else {
    console.log(`✓ ${url}`);
  }
}

await browser.close();
