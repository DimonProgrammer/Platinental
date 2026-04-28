import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

const urls = [
  'http://localhost:4321/v3/',
  'http://localhost:4321/v3/plastika',
  'http://localhost:4321/v3/kosmetologiya',
  'http://localhost:4321/v3/kosmecevtika',
  'http://localhost:4321/v3/doctors',
  'http://localhost:4321/v3/doctors/meloyan',
  'http://localhost:4321/v3/about',
  'http://localhost:4321/v3/prices',
  'http://localhost:4321/v3/contacts',
  'http://localhost:4321/v3/documents',
  'http://localhost:4321/v3/404'
];

const allErrors = [];

for (const url of urls) {
  const errors = [];
  const warnings = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
    if (msg.type() === 'warning') warnings.push(msg.text());
  });
  
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    if (errors.length > 0) {
      allErrors.push({ url, errors, warnings });
    }
  } catch (err) {
    console.error(`Failed to load ${url}: ${err.message}`);
  }
}

if (allErrors.length > 0) {
  console.log('CONSOLE ERRORS FOUND:');
  allErrors.forEach(({ url, errors, warnings }) => {
    console.log(`\n${url}:`);
    errors.forEach(e => console.log(`  ERROR: ${e}`));
    warnings.forEach(w => console.log(`  WARNING: ${w}`));
  });
} else {
  console.log('✓ No console errors detected');
}

await browser.close();
