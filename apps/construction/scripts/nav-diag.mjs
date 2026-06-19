import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "./.preview-shots";
mkdirSync(OUT, { recursive: true });
const URL = "http://localhost:8080/construction/";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "load", timeout: 60000 });
await page.waitForTimeout(1200);

// Hero / top state (not scrolled)
await page.screenshot({ path: `${OUT}/nav-top.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } });

// Scroll down so the bar sits over light content -> scrolled (matte) state
await page.evaluate(() => window.scrollTo(0, 700));
await page.waitForTimeout(900);
await page.screenshot({ path: `${OUT}/nav-scrolled.png`, clip: { x: 0, y: 0, width: 1440, height: 120 } });

await browser.close();
console.log("done");
