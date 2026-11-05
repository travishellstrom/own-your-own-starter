// Draws public/og.jpg (1200x630), the picture shown when the site's link is shared.
// Run: node share-card/render.js   (needs Playwright)
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto('file://' + __dirname + '/og.html');
  await p.waitForTimeout(800);
  await p.screenshot({ path: __dirname + '/../public/og.jpg', type: 'jpeg', quality: 86 });
  await b.close();
})();
