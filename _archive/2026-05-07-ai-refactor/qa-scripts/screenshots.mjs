import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

const urls = [
  { slug: 'home', url: 'http://localhost:4321/v3/' },
  { slug: 'plastika', url: 'http://localhost:4321/v3/plastika' },
  { slug: 'kosmetologiya', url: 'http://localhost:4321/v3/kosmetologiya' },
  { slug: 'kosmecevtika', url: 'http://localhost:4321/v3/kosmecevtika' },
  { slug: 'doctors', url: 'http://localhost:4321/v3/doctors' },
  { slug: 'doctor-meloyan', url: 'http://localhost:4321/v3/doctors/meloyan' },
  { slug: 'about', url: 'http://localhost:4321/v3/about' },
  { slug: 'prices', url: 'http://localhost:4321/v3/prices' },
  { slug: 'contacts', url: 'http://localhost:4321/v3/contacts' },
  { slug: 'documents', url: 'http://localhost:4321/v3/documents' },
  { slug: '404', url: 'http://localhost:4321/v3/404' }
];

for (const page_info of urls) {
  console.log(`Screenshot: ${page_info.slug}`);
  try {
    await page.goto(page_info.url, { waitUntil: 'networkidle' });
    
    // Desktop
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.screenshot({ path: `./.playwright-mcp/all-pages/${page_info.slug}-desktop.png` });
    
    // Mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await page.screenshot({ path: `./.playwright-mcp/all-pages/${page_info.slug}-mobile.png` });
    
    console.log(`✓ ${page_info.slug}`);
  } catch (err) {
    console.error(`✗ ${page_info.slug}: ${err.message}`);
  }
}

await browser.close();
