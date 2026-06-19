// Generates elegant, on-brand placeholder imagery with sharp (SVG → JPEG).
// Cohesive "warm craftsman" art direction: gradient + architectural arcs + grain + label.
// These are intentional stand-ins; swap with real/AI photos at the same paths.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(OUT, { recursive: true });

const INK = "#1c1813";
const CLAY = "#a8603b";

const JOBS = [
  { name: "hero.jpg", w: 1920, h: 1200, c1: "#efe7d8", c2: "#cdbda2", label: "" },
  { name: "og.jpg", w: 1200, h: 630, c1: "#efe7d8", c2: "#cdbda2", label: "", brand: true },
  { name: "service-remodel.jpg", w: 1280, h: 1024, c1: "#efe8dc", c2: "#dccfb9", label: "Full Remodels" },
  { name: "service-tile.jpg", w: 1280, h: 1024, c1: "#e7ded0", c2: "#c9b89c", label: "Tile Work" },
  { name: "service-design.jpg", w: 1280, h: 1024, c1: "#f3eee6", c2: "#e1d7c5", label: "Design Consultation" },
  { name: "project-1.jpg", w: 1040, h: 1300, c1: "#ece4d6", c2: "#d3c4ab", label: "Cedar Park Kitchen" },
  { name: "project-2.jpg", w: 1040, h: 1300, c1: "#e3d8c8", c2: "#bba886", label: "Spa Bath in Stone" },
  { name: "project-3.jpg", w: 1040, h: 1300, c1: "#ece3d3", c2: "#cdbb9d", label: "Herringbone Backsplash" },
  { name: "project-4.jpg", w: 1040, h: 1300, c1: "#efe7da", c2: "#cfc0a6", label: "Picnic Point Great Room" },
  { name: "project-5.jpg", w: 1040, h: 1300, c1: "#e6dccc", c2: "#c2b091", label: "Walk-In Wet Room" },
  { name: "project-6.jpg", w: 1040, h: 1300, c1: "#f1ebe1", c2: "#ddd0ba", label: "Powder Room Mosaic" },
  { name: "about.jpg", w: 1100, h: 1375, c1: "#e9e0d0", c2: "#c7b594", label: "Craft & Care" },
];

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function arcs(w, h) {
  // concentric architectural arcs anchored bottom-right
  let s = "";
  const cx = w * 0.96;
  const cy = h * 1.02;
  const step = Math.max(w, h) * 0.13;
  for (let i = 1; i <= 7; i++) {
    s += `<circle cx="${cx}" cy="${cy}" r="${step * i}" fill="none" stroke="${INK}" stroke-opacity="0.05" stroke-width="1.5"/>`;
  }
  return s;
}

function svg({ w, h, c1, c2, label, brand }) {
  const labelMarkup = label
    ? `<g transform="translate(${Math.round(w * 0.06)}, ${h - Math.round(h * 0.07)})">
         <rect x="0" y="-10" width="26" height="2" fill="${CLAY}"/>
         <text x="40" y="0" font-family="Georgia, 'Times New Roman', serif" font-size="${Math.round(w * 0.022)}"
               letter-spacing="${Math.round(w * 0.004)}" fill="${INK}" fill-opacity="0.62"
               style="text-transform:uppercase">${esc(label.toUpperCase())}</text>
       </g>`
    : "";

  const brandMarkup = brand
    ? `<g transform="translate(${w / 2}, ${h / 2})" text-anchor="middle">
         <text y="-6" font-family="Georgia, serif" font-size="${Math.round(h * 0.16)}" fill="${INK}">
           M<tspan font-style="italic" fill="${CLAY}">&amp;</tspan>Sons
         </text>
         <text y="${Math.round(h * 0.12)}" font-family="Georgia, serif" font-size="${Math.round(h * 0.038)}"
               letter-spacing="${Math.round(h * 0.012)}" fill="${INK}" fill-opacity="0.6"
               style="text-transform:uppercase">REMODELING · LYNNWOOD, WA</text>
       </g>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0" stop-color="${c1}"/>
        <stop offset="1" stop-color="${c2}"/>
      </linearGradient>
      <radialGradient id="light" cx="0.28" cy="0.18" r="0.9">
        <stop offset="0" stop-color="#fbf8f3" stop-opacity="0.55"/>
        <stop offset="0.6" stop-color="#fbf8f3" stop-opacity="0"/>
      </radialGradient>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix type="saturate" values="0"/></filter>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    ${arcs(w, h)}
    <rect width="${w}" height="${h}" fill="url(#light)"/>
    <rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.06"/>
    ${labelMarkup}
    ${brandMarkup}
  </svg>`;
}

async function run() {
  for (const job of JOBS) {
    const buf = Buffer.from(svg(job));
    await sharp(buf).jpeg({ quality: 84, mozjpeg: true }).toFile(join(OUT, job.name));
    console.log(`✓ ${job.name}`);
  }
  console.log(`\nDone: ${JOBS.length} placeholder images in public/images`);
}

run();
