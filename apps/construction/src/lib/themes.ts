// Variant design systems for the /variants explorer.
// Each `vars` map overrides :root tokens for one page load (see ThemeStyle).
// Colorways preserve the shipped identity (fonts/lane) and change palette only.
// Design systems run "departure mode": new fonts, radius, shadow, and color story.
//
// Colors are OKLCH, neutrals tinted toward the brand hue, never pure #000/#fff.

export type Variant = {
  id: string;
  name: string;
  group: "color" | "design";
  tagline: string;
  scene: string; // the physical scene that forces the theme choice
  fonts?: string; // human-readable font label (design systems)
  dark?: boolean;
  displayVar: string; // CSS var used to preview the name on the launcher
  swatches: string[]; // [bg, surface, ink, dark, accent]
  vars: Record<string, string>;
};

/* ============================== COLORWAYS ============================== */

const slate: Variant = {
  id: "slate",
  name: "Slate & Steel",
  group: "color",
  tagline: "Cool, contemporary, architectural.",
  scene: "A concrete-and-glass loft at flat midday light; calm, precise, urban.",
  displayVar: "var(--font-serif)",
  swatches: [
    "oklch(0.95 0.006 240)",
    "oklch(0.89 0.01 235)",
    "oklch(0.26 0.018 250)",
    "oklch(0.21 0.02 250)",
    "oklch(0.55 0.09 245)",
  ],
  vars: {
    "--paper": "oklch(0.95 0.006 240)",
    "--paper-2": "oklch(0.925 0.008 240)",
    "--sand": "oklch(0.89 0.01 235)",
    "--sand-deep": "oklch(0.84 0.013 235)",
    "--cream": "oklch(0.975 0.004 240)",
    "--espresso": "oklch(0.21 0.02 250)",
    "--espresso-2": "oklch(0.26 0.022 250)",
    "--ink": "oklch(0.26 0.018 250)",
    "--ink-soft": "oklch(0.46 0.02 250)",
    "--ink-faint": "oklch(0.62 0.018 250)",
    "--clay": "oklch(0.55 0.09 245)",
    "--clay-deep": "oklch(0.46 0.1 248)",
    "--line": "oklch(0.26 0.02 250 / 0.14)",
    "--line-strong": "oklch(0.26 0.02 250 / 0.26)",
    "--line-cream": "oklch(0.97 0.004 240 / 0.16)",
    "--line-cream-strong": "oklch(0.97 0.004 240 / 0.32)",
    "--shadow-sm": "0 1px 2px rgba(24,33,46,0.06), 0 4px 14px rgba(24,33,46,0.07)",
    "--shadow-md": "0 4px 12px rgba(24,33,46,0.09), 0 18px 50px rgba(24,33,46,0.13)",
    "--shadow-lg": "0 10px 30px rgba(24,33,46,0.11), 0 40px 90px rgba(24,33,46,0.18)",
  },
};

const sage: Variant = {
  id: "sage",
  name: "Sage & Clay",
  group: "color",
  tagline: "Organic, calm, garden-room warmth.",
  scene: "A sunlit garden room with eucalyptus and terracotta pots in the afternoon.",
  displayVar: "var(--font-serif)",
  swatches: [
    "oklch(0.94 0.018 140)",
    "oklch(0.88 0.028 138)",
    "oklch(0.27 0.03 150)",
    "oklch(0.24 0.03 150)",
    "oklch(0.58 0.12 45)",
  ],
  vars: {
    "--paper": "oklch(0.94 0.018 140)",
    "--paper-2": "oklch(0.915 0.022 142)",
    "--sand": "oklch(0.88 0.028 138)",
    "--sand-deep": "oklch(0.82 0.034 135)",
    "--cream": "oklch(0.975 0.012 130)",
    "--espresso": "oklch(0.24 0.03 150)",
    "--espresso-2": "oklch(0.29 0.032 150)",
    "--ink": "oklch(0.27 0.03 150)",
    "--ink-soft": "oklch(0.46 0.03 150)",
    "--ink-faint": "oklch(0.62 0.025 150)",
    "--clay": "oklch(0.58 0.12 45)",
    "--clay-deep": "oklch(0.5 0.13 42)",
    "--line": "oklch(0.27 0.03 150 / 0.14)",
    "--line-strong": "oklch(0.27 0.03 150 / 0.26)",
    "--line-cream": "oklch(0.975 0.012 130 / 0.16)",
    "--line-cream-strong": "oklch(0.975 0.012 130 / 0.32)",
    "--shadow-sm": "0 1px 2px rgba(28,40,28,0.06), 0 4px 14px rgba(28,40,28,0.07)",
    "--shadow-md": "0 4px 12px rgba(28,40,28,0.09), 0 18px 50px rgba(28,40,28,0.13)",
    "--shadow-lg": "0 10px 30px rgba(28,40,28,0.11), 0 40px 90px rgba(28,40,28,0.18)",
  },
};

const dune: Variant = {
  id: "dune",
  name: "Dune & Indigo",
  group: "color",
  tagline: "Warm sand grounded by deep blue.",
  scene: "A desert house at golden hour where every shadow falls deep indigo.",
  displayVar: "var(--font-serif)",
  swatches: [
    "oklch(0.94 0.025 80)",
    "oklch(0.87 0.038 75)",
    "oklch(0.25 0.018 65)",
    "oklch(0.22 0.02 60)",
    "oklch(0.48 0.1 250)",
  ],
  vars: {
    "--paper": "oklch(0.94 0.025 80)",
    "--paper-2": "oklch(0.915 0.03 78)",
    "--sand": "oklch(0.87 0.038 75)",
    "--sand-deep": "oklch(0.81 0.044 72)",
    "--cream": "oklch(0.975 0.012 85)",
    "--espresso": "oklch(0.22 0.02 60)",
    "--espresso-2": "oklch(0.27 0.022 60)",
    "--ink": "oklch(0.25 0.018 65)",
    "--ink-soft": "oklch(0.45 0.02 65)",
    "--ink-faint": "oklch(0.61 0.02 70)",
    "--clay": "oklch(0.48 0.1 250)",
    "--clay-deep": "oklch(0.4 0.11 252)",
    "--line": "oklch(0.25 0.018 65 / 0.14)",
    "--line-strong": "oklch(0.25 0.018 65 / 0.26)",
    "--line-cream": "oklch(0.975 0.012 85 / 0.16)",
    "--line-cream-strong": "oklch(0.975 0.012 85 / 0.32)",
    "--shadow-sm": "0 1px 2px rgba(48,36,18,0.06), 0 4px 14px rgba(48,36,18,0.07)",
    "--shadow-md": "0 4px 12px rgba(48,36,18,0.09), 0 18px 50px rgba(48,36,18,0.13)",
    "--shadow-lg": "0 10px 30px rgba(48,36,18,0.11), 0 40px 90px rgba(48,36,18,0.18)",
  },
};

const mono: Variant = {
  id: "mono",
  name: "Monochrome",
  group: "color",
  tagline: "Black, white, and almost no accent.",
  scene: "A white-cube gallery: pure, quiet, color withheld so the work speaks.",
  displayVar: "var(--font-serif)",
  swatches: [
    "oklch(0.97 0.002 250)",
    "oklch(0.91 0.003 250)",
    "oklch(0.2 0.004 250)",
    "oklch(0.17 0.003 250)",
    "oklch(0.35 0.006 250)",
  ],
  vars: {
    "--paper": "oklch(0.97 0.002 250)",
    "--paper-2": "oklch(0.945 0.002 250)",
    "--sand": "oklch(0.91 0.003 250)",
    "--sand-deep": "oklch(0.86 0.003 250)",
    "--cream": "oklch(0.985 0.001 250)",
    "--espresso": "oklch(0.17 0.003 250)",
    "--espresso-2": "oklch(0.22 0.003 250)",
    "--ink": "oklch(0.2 0.004 250)",
    "--ink-soft": "oklch(0.42 0.004 250)",
    "--ink-faint": "oklch(0.6 0.004 250)",
    "--clay": "oklch(0.35 0.006 250)",
    "--clay-deep": "oklch(0.28 0.006 250)",
    "--img-filter": "grayscale(1) contrast(1.02)",
    "--line": "oklch(0.2 0.004 250 / 0.14)",
    "--line-strong": "oklch(0.2 0.004 250 / 0.26)",
    "--line-cream": "oklch(0.985 0.001 250 / 0.16)",
    "--line-cream-strong": "oklch(0.985 0.001 250 / 0.32)",
    "--shadow-sm": "0 1px 2px rgba(20,20,24,0.06), 0 4px 14px rgba(20,20,24,0.07)",
    "--shadow-md": "0 4px 12px rgba(20,20,24,0.08), 0 18px 50px rgba(20,20,24,0.1)",
    "--shadow-lg": "0 10px 30px rgba(20,20,24,0.1), 0 40px 90px rgba(20,20,24,0.14)",
  },
};

/* =========================== DESIGN SYSTEMS =========================== */

const blueprint: Variant = {
  id: "blueprint",
  name: "Blueprint",
  group: "design",
  tagline: "Swiss-technical. Grotesque type, hard edges, drafting blue.",
  scene: "A drafting studio under cool daylight; rulers, set squares, exactness.",
  fonts: "Bricolage Grotesque + Hanken Grotesk",
  displayVar: "var(--font-bricolage)",
  swatches: [
    "oklch(0.965 0.004 240)",
    "oklch(0.9 0.006 240)",
    "oklch(0.22 0.015 250)",
    "oklch(0.2 0.02 250)",
    "oklch(0.52 0.13 250)",
  ],
  vars: {
    "--font-display": "var(--font-bricolage), system-ui, sans-serif",
    "--font-body": "var(--font-hanken), system-ui, sans-serif",
    "--paper": "oklch(0.965 0.004 240)",
    "--paper-2": "oklch(0.94 0.005 240)",
    "--sand": "oklch(0.9 0.006 240)",
    "--sand-deep": "oklch(0.85 0.008 240)",
    "--cream": "oklch(0.985 0.003 240)",
    "--espresso": "oklch(0.2 0.02 250)",
    "--espresso-2": "oklch(0.25 0.022 250)",
    "--ink": "oklch(0.22 0.015 250)",
    "--ink-soft": "oklch(0.44 0.018 250)",
    "--ink-faint": "oklch(0.6 0.016 250)",
    "--clay": "oklch(0.52 0.13 250)",
    "--clay-deep": "oklch(0.44 0.14 252)",
    "--line": "oklch(0.22 0.015 250 / 0.18)",
    "--line-strong": "oklch(0.22 0.015 250 / 0.34)",
    "--line-cream": "oklch(0.985 0.003 240 / 0.18)",
    "--line-cream-strong": "oklch(0.985 0.003 240 / 0.34)",
    "--radius-sm": "0px",
    "--radius-md": "0px",
    "--radius-pill": "0px",
    "--shadow-sm": "0 1px 0 rgba(24,34,52,0.1)",
    "--shadow-md": "0 2px 0 rgba(24,34,52,0.12), 0 10px 24px rgba(24,34,52,0.08)",
    "--shadow-lg": "0 3px 0 rgba(24,34,52,0.14), 0 24px 50px rgba(24,34,52,0.12)",
  },
};

const hearth: Variant = {
  id: "hearth",
  name: "Hearth",
  group: "design",
  tagline: "Warm humanist. Soft serif, rounded, generous, amber.",
  scene: "A cozy kitchen mid-morning; fresh bread, oak, low sun through linen.",
  fonts: "Spectral + Figtree",
  displayVar: "var(--font-spectral)",
  swatches: [
    "oklch(0.95 0.022 85)",
    "oklch(0.88 0.04 78)",
    "oklch(0.28 0.03 65)",
    "oklch(0.26 0.04 60)",
    "oklch(0.6 0.13 60)",
  ],
  vars: {
    "--font-display": "var(--font-spectral), Georgia, serif",
    "--font-body": "var(--font-figtree), system-ui, sans-serif",
    "--paper": "oklch(0.95 0.022 85)",
    "--paper-2": "oklch(0.925 0.028 80)",
    "--sand": "oklch(0.88 0.04 78)",
    "--sand-deep": "oklch(0.82 0.05 72)",
    "--cream": "oklch(0.98 0.012 85)",
    "--espresso": "oklch(0.26 0.04 60)",
    "--espresso-2": "oklch(0.31 0.042 60)",
    "--ink": "oklch(0.28 0.03 65)",
    "--ink-soft": "oklch(0.47 0.035 60)",
    "--ink-faint": "oklch(0.63 0.03 65)",
    "--clay": "oklch(0.6 0.13 60)",
    "--clay-deep": "oklch(0.52 0.14 55)",
    "--line": "oklch(0.28 0.03 65 / 0.14)",
    "--line-strong": "oklch(0.28 0.03 65 / 0.24)",
    "--line-cream": "oklch(0.98 0.012 85 / 0.16)",
    "--line-cream-strong": "oklch(0.98 0.012 85 / 0.32)",
    "--radius-sm": "8px",
    "--radius-md": "18px",
    "--radius-pill": "999px",
    "--shadow-sm": "0 2px 8px rgba(64,44,22,0.06), 0 8px 24px rgba(64,44,22,0.07)",
    "--shadow-md": "0 8px 24px rgba(64,44,22,0.1), 0 24px 64px rgba(64,44,22,0.13)",
    "--shadow-lg": "0 16px 44px rgba(64,44,22,0.12), 0 48px 110px rgba(64,44,22,0.2)",
  },
};

const nocturne: Variant = {
  id: "nocturne",
  name: "Nocturne",
  group: "design",
  tagline: "Luxe dark. Dramatic Bodoni, brass, candle-lit depth.",
  scene: "A showroom after hours, lit by warm lamps; brass glints on dark stone.",
  fonts: "Bodoni Moda + Hanken Grotesk",
  dark: true,
  displayVar: "var(--font-bodoni)",
  swatches: [
    "oklch(0.16 0.008 60)",
    "oklch(0.23 0.012 60)",
    "oklch(0.92 0.012 80)",
    "oklch(0.13 0.008 50)",
    "oklch(0.74 0.1 80)",
  ],
  vars: {
    "--font-display": "var(--font-bodoni), Georgia, serif",
    "--font-body": "var(--font-hanken), system-ui, sans-serif",
    "--paper": "oklch(0.16 0.008 60)",
    "--paper-2": "oklch(0.19 0.01 60)",
    "--sand": "oklch(0.23 0.012 60)",
    "--sand-deep": "oklch(0.27 0.014 60)",
    "--cream": "oklch(0.95 0.012 85)",
    "--espresso": "oklch(0.12 0.008 50)",
    "--espresso-2": "oklch(0.16 0.01 55)",
    "--ink": "oklch(0.92 0.012 80)",
    "--ink-soft": "oklch(0.72 0.012 80)",
    "--ink-faint": "oklch(0.55 0.012 80)",
    "--clay": "oklch(0.74 0.1 80)",
    "--clay-deep": "oklch(0.66 0.11 78)",
    "--line": "oklch(0.9 0.01 80 / 0.16)",
    "--line-strong": "oklch(0.9 0.01 80 / 0.3)",
    "--line-cream": "oklch(0.9 0.01 80 / 0.16)",
    "--line-cream-strong": "oklch(0.9 0.01 80 / 0.3)",
    "--radius-sm": "2px",
    "--radius-md": "4px",
    "--radius-pill": "999px",
    "--shadow-sm": "0 1px 2px rgba(0,0,0,0.4), 0 6px 18px rgba(0,0,0,0.45)",
    "--shadow-md": "0 8px 24px rgba(0,0,0,0.5), 0 24px 64px rgba(0,0,0,0.55)",
    "--shadow-lg": "0 16px 44px rgba(0,0,0,0.55), 0 48px 110px rgba(0,0,0,0.65)",
  },
};

export const colorVariants: Variant[] = [slate, sage, dune, mono];
export const designVariants: Variant[] = [blueprint, hearth, nocturne];
export const variants: Variant[] = [...colorVariants, ...designVariants];

export const variantsById: Record<string, Variant> = Object.fromEntries(
  variants.map((v) => [v.id, v]),
);
