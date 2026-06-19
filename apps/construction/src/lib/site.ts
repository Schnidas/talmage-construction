// Single source of truth for business content.
// NOTE: `email` is a placeholder — swap in the real Talmage Construction inbox before launch.

export const site = {
  name: "Talmage Construction",
  legalName: "Talmage Construction",

  phoneDisplay: "(503) 932-3975",
  phoneHref: "tel:+15039323975",
  email: "info@talmageconstruction.com", // TODO: replace with the real business inbox

  address: {
    line1: "",
    line2: "Salem, OR 97302",
  },
  addressFull: "4676 Commercial St SE, Salem, OR 97302",
  area: "Salem, OR",

  // Hours assumption: open 10–6, closed Sunday. Adjust if the client confirms otherwise.
  hours: [
    { day: "Monday", value: "7 AM – 6 PM" },
    { day: "Tuesday", value: "7 AM – 6 PM" },
    { day: "Wednesday", value: "7 AM – 6 PM" },
    { day: "Thursday", value: "7 AM – 6 PM" },
    { day: "Friday", value: "7 AM – 6 PM" },
    { day: "Saturday", value: "7 AM – 6 PM" },
    { day: "Sunday", value: "Closed" },
  ],
  hoursShort: "Mon–Sat · 7 AM – 6 PM",

  rating: 4.9,
  reviewCount: 9,

  // Address-based Google Maps query (no API key required for the embed).
  mapsQuery: "Talmage%20Construction%2C%204676%20Commercial%20St%20SE%2C%20Salem%2C%20OR%2097302",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Talmage+Construction+4676+Commercial+St+SE+Salem+OR+97302",
} as const;

export type ServicePoint = { label: string; icon: string };

export type Service = {
  index: string;
  title: string;
  blurb: string;
  points: ServicePoint[];
  image: string;
  alt: string;
};

export const services: Service[] = [
  {
    index: "01",
    title: "Full Remodels",
    blurb:
      "Whole-home and room-by-room transformations, handled end to end — from the first wall we open to the final coat of paint.",
    points: [
      { label: "Kitchens & baths", icon: "faucet" },
      { label: "Layout & structural", icon: "frame" },
      { label: "Finish carpentry", icon: "tools" },
    ],
    image: "/images/service-remodel.jpg",
    alt: "A fully remodeled open-plan kitchen and living space in warm neutral tones",
  },
  {
    index: "02",
    title: "Tile Work",
    blurb:
      "The craft we're known for. Precise layouts, crisp grout lines, and patterns that turn a surface into the reason you love the room.",
    points: [
      { label: "Floors & showers", icon: "shower" },
      { label: "Backsplashes", icon: "grid" },
      { label: "Custom patterns", icon: "pattern" },
    ],
    image: "/images/service-tile.jpg",
    alt: "Close-up of meticulously installed handmade tile with crisp grout lines",
  },
  {
    index: "03",
    title: "Design Consultation",
    blurb:
      "Honest, experienced guidance before a single tool comes out — material pairings, layout, and budget, sorted together.",
    points: [
      { label: "Material selection", icon: "swatch" },
      { label: "Layout & lighting", icon: "bulb" },
      { label: "Transparent budgeting", icon: "tag" },
    ],
    image: "/images/service-design.jpg",
    alt: "A flat lay of tile samples, stone, and material swatches on a warm table",
  },
];

export type Review = {
  quote: string;
  source: string;
  context: string;
};

// Verbatim quotes from the client's real 5.0★ Google reviews.
export const reviews: Review[] = [
  {
    quote: "The tile work they did is absolutely beautiful and really elevates the space.",
    source: "Google Review",
    context: "Tile installation",
  },
  {
    quote:
      "Joe Talmage is very thorough and has keen attention to detail and prides in his work.",
    source: "Google Review",
    context: "Full remodel",
  },
  {
    quote: "They give great design advice, and their pricing is always fair!",
    source: "Google Review",
    context: "Design consultation",
  },
];

export type Project = {
  title: string;
  category: string;
  image: string;
  alt: string;
};

export const projects: Project[] = [
  {
    title: "Cedar Park Kitchen",
    category: "Full Remodel",
    image: "/images/project-1.jpg",
    alt: "Remodeled kitchen with warm wood cabinetry and a tiled backsplash",
  },
  {
    title: "Spa Bath in Stone",
    category: "Tile · Bath",
    image: "/images/project-2.jpg",
    alt: "Luxury bathroom with floor-to-ceiling stone tile and a walk-in shower",
  },
  {
    title: "Herringbone Backsplash",
    category: "Tile Detail",
    image: "/images/project-3.jpg",
    alt: "Detailed herringbone tile backsplash behind a range",
  },
  {
    title: "Salem Great Room",
    category: "Full Remodel",
    image: "/images/project-4.jpg",
    alt: "Open great room remodel with a clad fireplace and warm light",
  },
  {
    title: "Walk-In Wet Room",
    category: "Tile · Bath",
    image: "/images/project-5.jpg",
    alt: "Walk-in tiled wet room with a bench and brushed fixtures",
  },
  {
    title: "Powder Room Mosaic",
    category: "Tile Detail",
    image: "/images/project-6.jpg",
    alt: "Powder room with a hand-set mosaic tile floor and floating vanity",
  },
];
