// ===========================================================================
// Talmage Construction — single source of truth for all site content.
// Swap real photos into /public/images and update paths here. Update the
// owner email in `contact.email` before the form goes live.
// ===========================================================================

export const business = {
  name: 'Talmage Construction',
  legalName: 'Talmage Construction',
  owner: 'Isaac Talmage',
  tagline: 'Veteran-Built. Family-Owned. Done Right.',
  about:
    "Talmage Construction is a veteran-owned general contractor in Salem, OR. Bathrooms, kitchens, home builds — Isaac Talmage and his family crew bring military-grade discipline and meticulous craftsmanship to every project.",
  rating: { score: '4.9', count: 9, source: 'Google' },
  serviceArea: 'Salem · Redmond · Corvallis · Albany, OR',
} as const;

export const contact = {
  phone: '(503) 932-3975',
  phoneHref: 'tel:+15039323975',
  // TODO: replace with the owner's real inbox before enabling form delivery.
  email: 'info@talmageconstruction.com',
  address: '4676 Commercial St SE, Salem, OR 97302',
  hours: 'Mon–Sat · closes 6 PM',
  googleReviewsUrl:
    'https://www.google.com/search?q=Talmage+Construction+Salem',
} as const;

// Services — drawn from the work Talmage Construction is praised for in their reviews.
export const services = [
  {
    n: '01',
    title: 'Bathroom Remodels',
    body: 'Full bathroom transformations. Custom tile, vanities, lighting, and waterproofing, done to last a lifetime.',
    img: '/images/service-bathroom.jpg',
  },
  {
    n: '02',
    title: 'Kitchen Remodels',
    body: 'Layouts that work and finishes that wow. Cabinetry, counters, backsplash, and the details that make a kitchen yours.',
    img: '/images/service-kitchen.jpg',
  },
  {
    n: '03',
    title: 'Living & Whole-Home',
    body: 'Living rooms to whole-home refreshes. Flooring, walls, trim, and flow, reimagined around how your family lives.',
    img: '/images/service-living.jpg',
  },
  {
    n: '04',
    title: 'Tile Work',
    body: 'The work our clients rave about. Floors, showers, and feature walls with crisp, beautiful tile that elevates the space.',
    img: '/images/service-tile.jpg',
  },
  {
    n: '05',
    title: 'Plumbing & Electrical',
    body: 'Licensed, careful, and code-correct. The unseen work that makes a remodel safe and dependable for years.',
    img: '/images/service-systems.jpg',
  },
  {
    n: '06',
    title: 'Handyman & Repairs',
    body: 'The honest fix-it list. From a single repair to ongoing upkeep, done by people who treat your home like their own.',
    img: '/images/service-handyman.jpg',
  },
] as const;

// Before / after pairs — placeholders until Isaac Talmage's real photos drop in.
export const projects = [
  { title: 'Master Bath · Salem', before: '/images/ba-bath-before.jpg', after: '/images/ba-bath-after.jpg' },
  { title: 'Kitchen · Salem', before: '/images/ba-kitchen-before.jpg', after: '/images/ba-kitchen-after.jpg' },
  { title: 'Living Room · Salem', before: '/images/ba-living-before.jpg', after: '/images/ba-living-after.jpg' },
] as const;

export const process = [
  {
    n: '01',
    title: 'Consult',
    body: 'We sit down, listen, and walk your space. You get honest advice and a clear, fair quote. No pressure, no surprises.',
  },
  {
    n: '02',
    title: 'Design',
    body: "Isaac Talmage's eye for design helps you choose finishes and layout with confidence. We plan every detail before a tool comes out.",
  },
  {
    n: '03',
    title: 'Build',
    body: 'Our family crew shows up on time, works clean, and treats your home with care, right until the work is done exactly as promised.',
  },
] as const;

export const reasons = [
  { title: 'Veteran-owned', body: 'Isaac Talmage served our country, then came home and built his family business on the same code: show up, do it right, no excuses.' },
  { title: 'In time', body: 'Punctual, efficient, and respectful of your home and your schedule.' },
  { title: 'Built to last', body: 'Attention to detail and work designed to hold up for a lifetime.' },
] as const;

// Genericized testimonials — real sentiment from verified Google reviews.
export const testimonials = [
  {
    quote:
      "We are delighted with our newly constructed home by Talmage in Redmond, Oregon! The craftsmanship stands out in our neighborhood. Exceptional work from start to finish.",
    name: 'Verified Google review · Redmond, OR',
    stars: 5,
  },
  {
    quote:
      "The Talmage family are highly regarded. Isaac was wonderful to work with — professional, attentive, and genuinely invested in getting everything right.",
    name: 'Verified Google review · Salem, OR',
    stars: 5,
  },
  {
    quote:
      "Talmage built our home in 2021 during one of the most chaotic markets imaginable and delivered exactly what they promised. Veteran-owned values show in everything they do.",
    name: 'Verified Google review · Salem, OR',
    stars: 5,
  },
  {
    quote:
      "Very professional and knowledgeable. Isaac Talmage is thorough, has keen attention to detail, and takes real pride in his work. Highly recommend.",
    name: 'Verified Google review · Salem, OR',
    stars: 5,
  },
  {
    quote:
      "They showed up on time, worked clean, and delivered high-quality results. Fair pricing, great communication, everything done exactly as promised.",
    name: 'Verified Google review · Salem, OR',
    stars: 5,
  },
] as const;

export const nav = [
  { label: 'Services', href: '#services' },
  { label: 'Our Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
] as const;
