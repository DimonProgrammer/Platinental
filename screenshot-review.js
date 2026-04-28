const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:4321';
const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 1024, height: 768 },
  mobile: { width: 375, height: 812 }
};
const PAGES = ['/', '/kosmetologiya', '/doctors'];
const OUTPUT_DIR = path.join(__dirname, '.playwright-mcp/content-edits-2026-04-21');

(async () => {
  const browser = await chromium.launch();
  const errors = [];

  for (const pagePath of PAGES) {
    for (const [vpName, vpSize] of Object.entries(VIEWPORTS)) {
      const context = await browser.createContext({
        viewport: vpSize
      });
      
      const page = await context.newPage();
      
      // Capture console errors
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(`[${pagePath}/${vpName}] ${msg.text()}`);
        }
      });

      const url = `${BASE_URL}${pagePath}`;
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);

      // Take screenshot
      const pageName = pagePath === '/' ? 'home' : pagePath.replace(/\//g, '-').substring(1);
      const filename = `${pageName}-${vpName}.png`;
      const filepath = path.join(OUTPUT_DIR, filename);
      
      await page.screenshot({ path: filepath, fullPage: false });
      console.log(`✓ ${filename}`);

      await context.close();
    }
  }

  await browser.close();

  if (errors.length > 0) {
    console.log('\n=== CONSOLE ERRORS ===');
    errors.forEach(err => console.log(err));
    process.exit(1);
  } else {
    console.log('\n✓ No console errors detected');
  }
})();
