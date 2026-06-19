import { chromium } from "playwright";
const OUT = "./.preview-shots";
const b = await chromium.launch();

// 1) Mobile menu open
let ctx = await b.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
let p = await ctx.newPage();
await p.goto("http://localhost:3000", { waitUntil: "load", timeout: 60000 });
await p.waitForTimeout(800);
await p.click('button[aria-controls="mobile-menu"]');
await p.waitForTimeout(600);
await p.screenshot({ path: `${OUT}/mobile-menu.png` });
await ctx.close();

// 2) Desktop About stats strip (reduced-motion → counters show final values)
ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
p = await ctx.newPage();
await p.goto("http://localhost:3000", { waitUntil: "load", timeout: 60000 });
await p.waitForTimeout(800);
await p.evaluate(() => {
  const s = document.getElementById("about");
  window.scrollTo(0, s.getBoundingClientRect().bottom + window.scrollY - window.innerHeight + 40);
});
await p.waitForTimeout(700);
await p.screenshot({ path: `${OUT}/desktop-about-stats.png` });
await ctx.close();

await b.close();
console.log("done");
