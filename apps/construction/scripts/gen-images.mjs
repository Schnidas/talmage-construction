// Generates the site's custom imagery via Pollinations (keyless AI image gen).
// Run: node scripts/gen-images.mjs
import { mkdirSync, writeFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(OUT, { recursive: true });

// Shared style language → keeps all images visually cohesive (warm craftsman).
const STYLE =
  "warm minimalist interior photography, natural diffused daylight, soft long shadows, " +
  "warm tan cream and white-oak tones, muted earthy palette, calm and elegant, " +
  "high-end Architectural Digest editorial style, photorealistic, medium format, fine texture, " +
  "no people, no text, no watermark";

const JOBS = [
  { name: "hero.jpg", w: 1920, h: 1200, seed: 41,
    p: "a beautifully remodeled modern kitchen interior, white oak cabinetry, a large island, handmade tile backsplash, tall windows with sheer light, styled minimal and inviting" },
  { name: "og.jpg", w: 1200, h: 630, seed: 41,
    p: "a warmly lit remodeled modern kitchen with a handmade tile backsplash and oak island, wide cinematic composition" },

  { name: "service-remodel.jpg", w: 1280, h: 1024, seed: 52,
    p: "an open-plan remodeled living and kitchen space, warm wood floors, neutral plaster walls, tasteful minimal furniture, soft daylight" },
  { name: "service-tile.jpg", w: 1280, h: 1024, seed: 53,
    p: "extreme close-up of beautifully installed handmade zellige tile, crisp grout lines, subtle glaze color variation, raking light revealing texture" },
  { name: "service-design.jpg", w: 1280, h: 1024, seed: 54,
    p: "an elegant flat lay of interior design materials on a warm oak table, tile samples, stone swatches, brass hardware, a folding rule and pencil, top down" },

  { name: "project-1.jpg", w: 1040, h: 1300, seed: 61,
    p: "remodeled kitchen with warm wood cabinetry and a subway tile backsplash, brass tap, vertical composition" },
  { name: "project-2.jpg", w: 1040, h: 1300, seed: 62,
    p: "luxury bathroom with floor-to-ceiling natural stone tile, a walk-in glass shower, brushed brass fixtures, vertical" },
  { name: "project-3.jpg", w: 1040, h: 1300, seed: 63,
    p: "a herringbone tile backsplash behind a range, detailed close composition, warm light, vertical" },
  { name: "project-4.jpg", w: 1040, h: 1300, seed: 64,
    p: "an open great room remodel with a floor-to-ceiling tiled fireplace surround, warm minimal interior, vertical" },
  { name: "project-5.jpg", w: 1040, h: 1300, seed: 65,
    p: "a walk-in tiled wet room shower with a built-in stone bench and brushed fixtures, warm stone tile, vertical" },
  { name: "project-6.jpg", w: 1040, h: 1300, seed: 66,
    p: "a powder room with a hand-set mosaic tile floor and a floating oak vanity, round mirror, warm light, vertical" },

  { name: "about.jpg", w: 1100, h: 1375, seed: 71,
    p: "close-up of a craftsman's hands carefully setting a ceramic tile on a wall, a spirit level and trowel nearby, focus on the hands and tile, warm natural light, no face visible" },
];

const base = "https://image.pollinations.ai/prompt/";

async function fetchOne(job, attempt = 1) {
  const url =
    base +
    encodeURIComponent(`${job.p}, ${STYLE}`) +
    `?width=${job.w}&height=${job.h}&seed=${job.seed}&model=flux&nologo=true&enhance=true`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 120000);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(t);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 8000) throw new Error(`too small (${buf.length}b)`);
    writeFileSync(join(OUT, job.name), buf);
    console.log(`✓ ${job.name.padEnd(20)} ${(buf.length / 1024).toFixed(0)}kb`);
    return true;
  } catch (err) {
    clearTimeout(t);
    if (attempt < 3) {
      console.log(`… retry ${job.name} (${err.message})`);
      await new Promise((r) => setTimeout(r, 2500 * attempt));
      return fetchOne(job, attempt + 1);
    }
    console.log(`✗ ${job.name} FAILED: ${err.message}`);
    return false;
  }
}

// Limited concurrency
async function run() {
  const queue = [...JOBS];
  const CONC = 3;
  let ok = 0;
  const workers = Array.from({ length: CONC }, async () => {
    while (queue.length) {
      const job = queue.shift();
      // skip if already a healthy file (lets us re-run for failures only)
      const f = join(OUT, job.name);
      if (existsSync(f) && statSync(f).size > 8000) {
        console.log(`• ${job.name} exists, skip`);
        ok++;
        continue;
      }
      if (await fetchOne(job)) ok++;
    }
  });
  await Promise.all(workers);
  console.log(`\nDone: ${ok}/${JOBS.length} images in public/images`);
}

run();
