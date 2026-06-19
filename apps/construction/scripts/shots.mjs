import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "./.preview-shots";
mkdirSync(OUT, { recursive: true });

const SECTIONS = ["top", "services", "work", "reviews", "about", "contact"];

async function capture(label, width, height) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width, height },
    reducedMotion: "reduce", // Lenis self-destructs → reliable native scroll; content fully shown
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(1000);

  for (const id of SECTIONS) {
    await page.evaluate((sel) => {
      const el = sel === "top" ? document.body : document.getElementById(sel);
      const y = sel === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo(0, Math.max(0, y));
    }, id);
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}/${label}-${id}.png` });
  }
  // footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/${label}-footer.png` });

  await browser.close();
  console.log(`✓ ${label} captured`);
}

await capture("desktop", 1440, 900);
await capture("mobile", 390, 844);
console.log("Done");
