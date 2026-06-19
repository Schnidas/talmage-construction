import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "./.preview-shots";
mkdirSync(OUT, { recursive: true });
const BASE = "http://localhost:3000";

const b = await chromium.launch();

async function shot(path, file, { w = 1440, h = 900, scrollTo } = {}) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto(BASE + path, { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(900);
  if (scrollTo != null) {
    await p.evaluate((y) => window.scrollTo(0, y), scrollTo);
    await p.waitForTimeout(600);
  }
  await p.screenshot({ path: `${OUT}/${file}.png` });
  await ctx.close();
  console.log("✓", file);
}

// Launcher
await shot("/variants", "x-launcher-top");
await shot("/variants", "x-launcher-mid", { scrollTo: 1100 });
await shot("/variants", "x-launcher-mobile", { w: 390, h: 844 });

// Each variant hero
for (const id of ["slate", "sage", "dune", "mono", "blueprint", "hearth", "nocturne"]) {
  await shot(`/variant/${id}`, `x-${id}-hero`);
}

// Nocturne deeper sections (verify dark theme rhythm across sections)
async function section(id, sel, file) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto(`${BASE}/variant/${id}`, { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(900);
  await p.evaluate((s) => {
    const el = document.querySelector(s);
    window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 64);
  }, sel);
  await p.waitForTimeout(600);
  await p.screenshot({ path: `${OUT}/${file}.png` });
  await ctx.close();
  console.log("✓", file);
}
await section("nocturne", "#services", "x-nocturne-services");
await section("nocturne", "#reviews", "x-nocturne-reviews");
await section("blueprint", "#services", "x-blueprint-services");
await section("hearth", "#reviews", "x-hearth-reviews");

await b.close();
console.log("done");
