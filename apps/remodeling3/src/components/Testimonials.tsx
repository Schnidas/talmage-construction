import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ArrowRight, ArrowLeft, Quote } from 'lucide-react';
import { useMotionSettings } from './MotionContext';
import { Testimonial } from '../types';

export default function Testimonials() {
  const { reducedMotion } = useMotionSettings();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(true);

  const testimonials: (Testimonial & { date: string; project: string })[] = [
    {
      author: 'Kristen Bailey',
      review: 'Isaac Talmage and his crew are amazing! Punctual, efficient and polite… a great eye for design… we can\'t wait to do the next one!',
      rating: 5,
      date: 'March 2026',
      project: 'Gourmet Kitchen Remodel',
      featured: true
    },
    {
      author: 'Taylor Higgins',
      review: 'They give great design advice, and their pricing is always fair!',
      rating: 5,
      date: 'December 2025',
      project: 'Master Bath Conversion'
    },
    {
      author: 'Rajendra Patel',
      review: 'Isaac Talmage is very thorough and has keen attention to detail and prides in his work.',
      rating: 5,
      date: 'February 2026',
      project: 'Dryrot Repair & Backsplash Tiling'
    },
    {
      author: 'Kirby Mayne',
      review: 'The tile work they did is absolutely beautiful and really elevates the space.',
      rating: 5,
      date: 'May 2026',
      project: 'Fireplace Overhaul & Tile Surround'
    },
    {
      author: 'Jacinda Harris',
      review: 'Showed up on time, worked hard, delivered high-quality results. Everything done exactly as promised.',
      rating: 5,
      date: 'April 2026',
      project: 'Custom Floor tiling & Fitting'
    }
  ];

  useEffect(() => {
    if (!isRotating || reducedMotion) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isRotating, reducedMotion, testimonials.length]);

  const handlePrev = () => {
    setIsRotating(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setIsRotating(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleSelect = (idx: number) => {
    setIsRotating(false);
    setActiveIndex(idx);
  };

  return (
    <section id="testimonials" className="py-10 sm:py-16 bg-accent-charcoal text-white relative overflow-hidden">
      {/* Decorative overlays */}
      <div className="absolute top-[10%] left-[-100px] w-96 h-96 bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-100px] w-96 h-96 bg-accent-amber/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-7 sm:mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-accent-gold" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-gold font-semibold">
                Lived Experiences
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white leading-none">
              Client{' '}
              <span className="font-serif italic text-accent-gold font-normal">
                Testimonials
              </span>
            </h2>
          </div>

          <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-2xl max-w-sm flex items-center gap-4 shadow-inner">
            <div className="rounded-full bg-accent-gold text-accent-charcoal font-bold w-9 h-9 flex items-center justify-center shrink-0 text-sm">
              G
            </div>
            <div>
              <p className="font-heading font-bold text-xs tracking-wide">5.0★ Google reviews</p>
              <p className="font-sans text-[11px] text-accent-warm/60 leading-normal">Verbatim reviews from checked accounts</p>
            </div>
          </div>
        </div>

        {/* TOP: Main quote panel — compact height */}
        <div className="bg-slate-900/40 p-5 sm:p-8 rounded-3xl border border-white/5 shadow-2xl mb-3 sm:mb-4">

          <div className="relative">
            <Quote className="absolute -top-4 -left-4 text-accent-gold/10 transform -rotate-12" size={70} />

            <div className="flex text-amber-400 gap-1 mb-4 relative z-10">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} fill="currentColor" className="text-accent-gold" />
              ))}
            </div>

            {/* Quote text — reduced min-height */}
            <div className="min-h-[70px] sm:min-h-[90px] flex items-center mb-4 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="w-full"
                >
                  <p className="font-serif italic text-base sm:text-xl text-accent-warm leading-relaxed">
                    "{testimonials[activeIndex].review}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Author + arrows on one row */}
          <div className="flex items-center justify-between border-t border-white/5 pt-4 gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="font-heading font-extrabold text-base text-white">
                  {testimonials[activeIndex].author}
                </h3>
                <div className="flex items-center gap-2 font-mono text-[10px] text-accent-gold mt-0.5">
                  <span>Verified Homeowner</span>
                  <span className="w-1 h-1 rounded-full bg-accent-gold/40" />
                  <span>Project: {testimonials[activeIndex].project}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-accent-gold hover:text-accent-charcoal transition-all duration-300 cursor-pointer"
              >
                <ArrowLeft size={14} />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-accent-gold hover:text-accent-charcoal transition-all duration-300 cursor-pointer"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM: Person cards — horizontal scrollable row */}
        <div
          className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {testimonials.map((test, index) => (
            <button
              key={test.author}
              onClick={() => handleSelect(index)}
              className={`shrink-0 w-[calc(33.3%-6px)] sm:w-[calc(20%-10px)] min-w-[140px] text-left p-3 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                activeIndex === index
                  ? 'bg-gradient-to-b from-slate-800 to-accent-charcoal border-accent-gold/60 shadow-lg shadow-accent-gold/5'
                  : 'bg-transparent border-white/5 hover:border-white/15'
              }`}
            >
              <h4 className={`font-heading font-extrabold text-[11px] sm:text-xs mb-1 leading-tight ${
                activeIndex === index ? 'text-white' : 'text-white/60'
              }`}>
                {test.author}
              </h4>
              <p className={`font-sans text-[10px] line-clamp-2 leading-snug mb-2 ${
                activeIndex === index ? 'text-accent-warm/80' : 'text-accent-warm/35'
              }`}>
                {test.review}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-wider text-accent-gold/60 truncate max-w-[80px]">
                  {test.project.substring(0, 18)}…
                </span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={7} fill="currentColor" className="text-accent-gold" />
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
