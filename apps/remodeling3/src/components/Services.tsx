import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Bath, Utensils, Layout, Grid, Zap, Hammer } from 'lucide-react';
import { useMotionSettings } from './MotionContext';
import { ServiceItem } from '../types';

export default function Services() {
  const { reducedMotion } = useMotionSettings();

  const services: (ServiceItem & { icon: React.ReactNode })[] = [
    {
      id: 'bathrooms',
      title: 'Luxury Bathrooms',
      description: 'Turn your master bath into a high-end personal spa. We handle plumbing, custom standalone tubs, floating vanities, walk-in glass shower screens, and complete waterproofing.',
      image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80',
      tags: ['Custom Showers', 'Glass Doors', 'Standalone Tubs', 'Waterproofing'],
      icon: <Bath size={22} />,
    },
    {
      id: 'kitchens',
      title: 'Designer Kitchens',
      description: 'The social hub of the home. Custom solid wood cabinets, breathtaking marble or quartz islands, under-cabinet dynamic LEDs, and integrated appliance lines.',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
      tags: ['Quartz Islands', 'Premium Cabinets', 'LED Backlighting', 'Appliance Fits'],
      icon: <Utensils size={22} />,
    },
    {
      id: 'living-rooms',
      title: 'Living & Whole-Home',
      description: 'Open-concept conversions, custom fireplace mantels, modern drywall work, crown molding, and premium wide-plank flooring setups that unify your entire living floor.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
      tags: ['Open Concept', 'Fireplace Mantels', 'Hardwood Flooring', 'Drywall'],
      icon: <Layout size={22} />,
    },
    {
      id: 'tiles',
      title: 'Meticulous Tile Work',
      description: 'True craftsmanship is in the details. Flawless geometric patterns, elegant slate or marble fireplace surrounds, custom kitchen backsplashes, and high-end niche setups.',
      image: '/remodeling3/images/service-tile.jpg',
      tags: ['Hexagonal Patterns', 'Marble Surrounds', 'Symmetrical Niches', 'Shower Pans'],
      icon: <Grid size={22} />,
    },
    {
      id: 'plumbing-electrical',
      title: 'Plumbing & Electrical',
      description: 'Worry-free remodeling requires correct internals. We complete full code-compliant structural wiring modifications, recessed light installs, and complete pipe integration.',
      image: '/remodeling3/images/service-plumbing.jpg',
      tags: ['Recessed Lighting', 'Panel Routing', 'Fixture Fitting', 'Full Code Safety'],
      icon: <Zap size={22} />,
    },
    {
      id: 'handyman-repairs',
      title: 'Handyman & Repairs',
      description: 'No job is too small for our commitment. Minor repairs, deck updates, structural dryrots, door/window fits, and quick repairs managed using the same pristine care.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      tags: ['Dryrot Repairs', 'Door & Window Fits', 'Deck Trim', 'Minor Fixture Fits'],
      icon: <Hammer size={22} />,
    },
  ];

  const handleEstimateClick = () => {
    const el = document.getElementById('estimate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ---- Infinite, two-way draggable services carousel ----
  // Tripling the list lets the user drift/drag in either direction forever; we
  // silently recenter to the middle copy so it never hits an edge.
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedUntilRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startScroll: 0 });
  const loopServices = [...services, ...services, ...services];

  const pause = (ms = 2500) => {
    pausedUntilRef.current = performance.now() + ms;
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth / 3; // start in the middle copy

    // Mobile: let native touch scroll handle it — no auto-drift
    if (window.innerWidth < 768) return;

    let raf = 0;
    const step = () => {
      if (!reducedMotion && performance.now() > pausedUntilRef.current && !dragRef.current.active) {
        el.scrollLeft += 0.45; // gentle auto-drift
      }
      const w = el.scrollWidth / 3;
      if (el.scrollLeft >= w * 2) el.scrollLeft -= w;
      else if (el.scrollLeft <= 0) el.scrollLeft += w;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Mobile uses native touch scroll
    if (window.innerWidth < 768) return;
    const el = trackRef.current;
    if (!el) return;
    dragRef.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = trackRef.current;
    if (!el || !dragRef.current.active) return;
    el.scrollLeft = dragRef.current.startScroll - (e.clientX - dragRef.current.startX);
  };
  const endDrag = () => {
    if (dragRef.current.active) {
      dragRef.current.active = false;
      pause(2500);
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-accent-charcoal text-white relative overflow-hidden">
      {/* Absolute ambient lights behind the grid */}
      <div className="absolute top-[20%] right-0 w-[400px] h-[400px] bg-accent-gold/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[300px] h-[300px] bg-accent-amber/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-accent-gold" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-gold font-semibold">
                What We Build
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white leading-none">
              Services We{' '}
              <span className="font-serif italic text-accent-gold font-normal">
                Master
              </span>
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-xs sm:text-sm text-accent-warm/70 leading-relaxed">
              Talmage Construction handles every type of home remodel sequentially. Isaac Talmage and his crew maintain overall design symmetry, clean workflows, and direct owner supervision.
            </p>
          </div>
        </div>

        {/* Infinite, drag-anywhere services carousel (scrolls both directions) */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          onPointerCancel={endDrag}
          className="flex gap-6 overflow-x-auto md:cursor-grab md:active:cursor-grabbing select-none pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {loopServices.map((service, i) => (
            <div
              key={`${service.id}-${i}`}
              className="group flex flex-col justify-between shrink-0 w-[280px] sm:w-[330px] bg-slate-900/40 rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-accent-gold/45 hover:shadow-2xl hover:shadow-accent-gold/5"
            >
              {/* Image Thumbnail Container */}
              <div className="relative h-52 sm:h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  loading="lazy" decoding="async"
                  className="w-full h-full object-cover transform duration-700 group-hover:scale-108 pointer-events-none"
                />

                {/* Visual Accent Badge Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div className="p-2.5 rounded-lg bg-accent-gold text-accent-charcoal font-bold shadow-md">
                    {service.icon}
                  </div>

                  {/* Modern tag/pill */}
                  <span className="bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-accent-gold font-semibold">
                    PRO CRAFT
                  </span>
                </div>
              </div>

              {/* Textual Description Block */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-xl mb-3.5 group-hover:text-accent-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-accent-warm/75 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Sub Tags / Skills Listed */}
                <div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-transparent text-white/50 border border-white/10 px-2 py-0.5 rounded text-[9px] font-mono tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Drag / scroll hint */}
        <p className="text-center font-mono text-[10px] uppercase tracking-widest text-accent-warm/40 mt-6 select-none">
          <span className="hidden md:inline">Drag or scroll either way to explore</span>
          <span className="md:hidden">Scroll left or right to explore</span>
        </p>

        {/* Closing Quick CTA Block */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/5 border border-white/5 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto text-left"
          >
            <div className="flex-1">
              <h4 className="font-heading font-bold text-lg mb-1 group-hover:text-accent-gold">
                Have a specialized or custom project in mind?
              </h4>
              <p className="font-sans text-xs text-accent-warm/60 leading-normal">
                Whether you need minor repair tile works or full dryrot framing rebuilds, Isaac Talmage and his crew will handle it. We operate in Salem and surrounds.
              </p>
            </div>
            <button
              onClick={handleEstimateClick}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent-gold text-accent-charcoal hover:bg-white hover:text-accent-charcoal font-sans text-[11px] uppercase tracking-wider font-extrabold transition-all duration-300 shrink-0 cursor-pointer"
            >
              Consult On-Site
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
