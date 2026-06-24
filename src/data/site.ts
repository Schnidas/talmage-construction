// ===========================================================================
// Talmage Construction — single source of truth for all site content.
// Swap real photos into /public/images and update paths here. Update the
// owner email in `contact.email` before the form goes live.
// ===========================================================================

export const business = {
  name: 'Talmage Construction',
  legalName: 'Talmage Construction',
  owner: 'Joe Talmage',
  tagline: 'Veteran-Built. Family-Owned. Done Right.',
  about:
    "Talmage Construction is a veteran-owned general contractor in Salem, OR, specializing in ground-up home building. New custom homes, additions, and full remodels — Joe Talmage and his family crew bring military-grade discipline and meticulous craftsmanship to every build.",
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

// Services — construction-led. New builds and additions come first; remodeling and
// finish work follow. Talmage is a general contractor, not just a remodeler.
export const services = [
  {
    n: '01',
    title: 'New Home Construction',
    body: 'Ground-up custom homes built to your plans. From foundation to final walkthrough, managed by one family crew who treats your build like their own.',
    img: '/images/service-kitchen.jpg',
  },
  {
    n: '02',
    title: 'Additions & ADUs',
    body: 'More room to live. Room additions, second stories, garages, and accessory dwelling units that match your home like they were always there.',
    img: '/images/service-build.jpg',
  },
  {
    n: '03',
    title: 'Whole-Home Remodels',
    body: 'Taking a house down to the studs and bringing it back better. Structural changes, new layouts, and a top-to-bottom rebuild done right.',
    img: '/images/service-living.jpg',
  },
  {
    n: '04',
    title: 'Kitchen & Bath Remodels',
    body: 'The rooms that make a home. Custom cabinetry, counters, tile, and fixtures, designed around how you actually live.',
    img: '/images/service-bathroom.jpg',
  },
  {
    n: '05',
    title: 'Custom Tile & Finishes',
    body: 'The detail work our clients rave about. Floors, showers, feature walls, and finish carpentry with crisp, beautiful craftsmanship.',
    img: '/images/service-tile.jpg',
  },
  {
    n: '06',
    title: 'Plumbing, Electrical & Systems',
    body: 'Licensed, code-correct, and built to last — the structural and mechanical work that makes every build safe and dependable for decades.',
    img: '/images/service-systems.jpg',
  },
] as const;

// Featured builds — the construction work that now leads the page. Placeholder
// photos for now; swap in Joe Talmage's real ground-up project shots in /public/images.
export const builds = [
  { category: 'New Construction', title: 'Custom Home · Redmond', img: '/images/build-4.jpg', alt: 'Great room of a newly built custom home with a clad fireplace' },
  { category: 'Custom Home', title: 'Hillside Build · Salem', img: '/images/build-1.jpg', alt: 'Kitchen and living space in a newly constructed Talmage home' },
  { category: 'Addition', title: 'Primary Suite Addition', img: '/images/build-2.jpg', alt: 'Spa-style primary bath built as a home addition' },
  { category: 'Whole-Home Build', title: 'Great Room · Albany', img: '/images/build-5.jpg', alt: 'Open-concept great room with custom tile and built-ins' },
  { category: 'New Construction', title: 'Family Home · Corvallis', img: '/images/build-3.jpg', alt: 'Detailed custom finishes in a new family home' },
  { category: 'Custom Home', title: 'Modern Farmhouse', img: '/images/build-6.jpg', alt: 'Custom kitchen and dining in a modern farmhouse build' },
] as const;

// Remodel before / after pairs — feed the secondary "Remodels" section. Placeholders
// until Joe Talmage's real photos drop in.
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
    body: "Joe Talmage's eye for design helps you choose finishes and layout with confidence. We plan every detail before a tool comes out.",
  },
  {
    n: '03',
    title: 'Build',
    body: 'Our family crew breaks ground, shows up on time, and works clean — from foundation to final walkthrough, your project is finished exactly as promised.',
  },
] as const;

export const reasons = [
  { title: 'Veteran-owned', body: 'Joe Talmage served our country, then came home and built his family business on the same code: show up, do it right, no excuses.' },
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
      "The Talmage family are highly regarded. Joe was wonderful to work with — professional, attentive, and genuinely invested in getting everything right.",
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
      "Very professional and knowledgeable. Joe Talmage is thorough, has keen attention to detail, and takes real pride in his work. Highly recommend.",
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
  { label: 'Construction', href: '#builds' },
  { label: 'Services', href: '#services' },
  { label: 'Remodels', href: '#work' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
] as const;
