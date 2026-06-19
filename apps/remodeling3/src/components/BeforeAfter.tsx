import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, ArrowLeftRight, Check } from 'lucide-react';
import { useMotionSettings } from './MotionContext';
import { BeforeAfterPair } from '../types';

export default function BeforeAfter() {
  const { reducedMotion } = useMotionSettings();
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const [activePairId, setActivePairId] = useState('gourmet-kitchen');
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const beforeAfterPairs: (BeforeAfterPair & {
    location: string;
    timeline: string;
    descriptionDetail: string;
    achievements: string[];
  })[] = [
    {
      id: 'gourmet-kitchen',
      title: 'Salem Gourmet Kitchen Remodel',
      description: "A complete custom gut-remodel converting a dark, walled-off 1980s wood kitchen into an open-concept luxury chef's kitchen.",
      beforeImage: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=1000&q=80',
      afterImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
      location: 'Salem, OR',
      timeline: '4 Weeks',
      descriptionDetail: 'We removed a load-bearing wall, fitted custom heavy ceiling headers, re-routed the structural plumbing/vent lines, and installed book-matched quartz countertops.',
      achievements: [
        'Open-concept transformation',
        'Custom marble double island',
        'Recessed LED ceiling profiles',
        'Commercial gas line safety routing',
      ]
    },
    {
      id: 'luxury-bathroom',
      title: 'Salem Spa Bathroom Conversion',
      description: 'Replaced a plain, standard outmoded bathroom with an elegant custom walk-in rain-shower oasis and wood detailing.',
      beforeImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80',
      afterImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
      location: 'Salem, OR',
      timeline: '2.5 Weeks',
      descriptionDetail: 'Talmage Construction constructed a new sloped concrete dry-pack shower tray, hot-mopped multi-layer waterproofing, laid hand-cut porcelain tiles, and plumbed dual rain shower heads.',
      achievements: [
        'Hot-mopped leakproof panning',
        'Symmetrical hexagonal tilework',
        'Integrated illuminated shampoo niche',
        'Dual solid-brass rainfall showerheads',
      ]
    }
  ];

  const activePair = beforeAfterPairs.find(p => p.id === activePairId) || beforeAfterPairs[0];

  // Drag handlers for mouse/touch
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (reducedMotion) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    if (e.buttons === 1 || isDragging.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-accent-warm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-accent-charcoal leading-none">
              Before &{' '}
              <span className="font-serif italic text-accent-gold font-normal">
                After
              </span>
            </h2>
          </div>

          {/* Quick tab switch buttons */}
          <div className="flex items-center gap-2.5 bg-accent-stone/70 p-1.5 rounded-xl border border-accent-stone">
            {beforeAfterPairs.map((pair) => (
              <button
                key={pair.id}
                onClick={() => {
                  setActivePairId(pair.id);
                  setSliderPosition(50); // Reset position
                }}
                className={`px-4 sm:px-5 py-2.5 rounded-lg font-sans text-xs uppercase tracking-wider font-bold transition-all relative cursor-pointer ${
                  activePairId === pair.id
                    ? 'bg-accent-charcoal text-white shadow-md'
                    : 'text-accent-charcoal/70 hover:text-accent-charcoal'
                }`}
              >
                {pair.id === 'gourmet-kitchen' ? 'Kitchen Project' : 'Bathroom Project'}
              </button>
            ))}
          </div>
        </div>

        {/* Showcase Grid Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: INTERACTIVE SLIDER (8 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Interactive Slider Frame */}
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={() => { isDragging.current = true; }}
              onMouseUp={() => { isDragging.current = false; }}
              onMouseLeave={() => { isDragging.current = false; }}
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize bg-black/10"
            >
              {/* BEFORE IMAGE (Background) */}
              <div className="absolute inset-0 z-0">
                <img
                  src={activePair.beforeImage}
                  alt={`${activePair.title} Before`}
                  className="w-full h-full object-cover pointer-events-none filter brightness-90"
                  loading="lazy" decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-md border border-white/10">
                  Before Remodel
                </div>
              </div>

              {/* AFTER IMAGE (Foreground Clipped) */}
              <div
                className="absolute inset-0 z-10 overflow-hidden"
                style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
              >
                <img
                  src={activePair.afterImage}
                  alt={`${activePair.title} After`}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  style={{ width: containerRef.current?.getBoundingClientRect().width }}
                  loading="lazy" decoding="async"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Glow overlay just on aftermath */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-gold/10 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-accent-amber text-white font-mono text-[8px] sm:text-[10px] tracking-widest uppercase px-2 sm:px-3 py-0.5 sm:py-1 rounded-md border border-accent-gold/20 flex items-center gap-1">
                  <Sparkles size={9} className="text-accent-gold animate-spin duration-3000" />
                  Talmage Construction
                </div>
              </div>

              {/* SLIDER CONTROLLER HANDLE */}
              <div
                className="absolute top-0 bottom-0 z-20 w-[3px] bg-white cursor-ew-resize"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Center handle indicator badge */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-accent-amber text-white shadow-xl border-2 border-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200">
                  <ArrowLeftRight size={14} className="animate-pulse" />
                </div>
              </div>

              {/* Responsive instructions indicator */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-black/60 backdrop-blur-sm text-white/80 font-mono text-[7px] sm:text-[9px] tracking-wide px-2 sm:px-3 py-0.5 sm:py-1 rounded-md flex items-center gap-1 pointer-events-none">
                <Maximize2 size={8} className="text-accent-gold" />
                <span className="hidden sm:inline">Drag handle to swipe</span>
                <span className="sm:hidden">Swipe</span>
              </div>
            </div>


          </div>

          {/* RIGHT COLUMN: REVEALING STATS & PROJECTS (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activePair.id}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col"
              >
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-accent-charcoal mb-4">
                  {activePair.title}
                </h3>

                <p className="font-sans text-sm sm:text-md text-accent-charcoal/80 leading-relaxed mb-6">
                  {activePair.description}
                </p>

                <div className="p-5 rounded-2xl bg-white border border-accent-stone shadow-sm mb-6">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-accent-charcoal mb-3">Our Work Outline</h4>

                  {/* Detailed features bullet items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activePair.achievements.map((item, id) => (
                      <div key={id} className="flex items-center gap-2 text-xs font-sans text-accent-charcoal/80">
                        <div className="w-4 h-4 rounded-full bg-accent-gold/20 text-accent-amber flex items-center justify-center shrink-0">
                          <Check size={10} strokeWidth={3} />
                        </div>
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Star rating call out */}
                <div className="flex items-center gap-3">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Sparkles key={s} size={13} fill="currentColor" className="text-accent-gold" />
                    ))}
                  </div>
                  <span className="font-sans text-[11px] font-semibold text-accent-charcoal/60 uppercase tracking-widest">
                    Talmage Construction Guaranteed Work
                  </span>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
