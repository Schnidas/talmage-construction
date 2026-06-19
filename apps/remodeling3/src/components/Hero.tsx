import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ShieldCheck, Star, ArrowRight, Phone, Award, Users } from 'lucide-react';
import { useMotionSettings } from './MotionContext';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useMotionSettings();

  // Scroll tracking specifically for the Hero section container
  const { scrollY } = useScroll();

  // Define transformative outputs for individual parallax depth layers
  // If reduced motion is enabled, these variables evaluate to stationary coordinates (0)
  const bgTransformY = useTransform(scrollY, [0, 800], [0, 240]);
  const textTransformY = useTransform(scrollY, [0, 800], [0, -80]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);

  const handleEstimateClick = () => {
    const el = document.getElementById('estimate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] sm:min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#0F1219] text-white pt-20"
    >
      {/* BACKGROUND DEPTH LAYER: Stunning Luxury Craftsman Remodeled Home Image */}
      <motion.div
        className="absolute inset-0 z-0 scale-105"
        style={{
          y: reducedMotion ? 0 : bgTransformY,
          opacity: 0.85,
        }}
      >
        {/* Dark luxury overlay for ultimate text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent-charcoal via-accent-charcoal/40 to-[#0c0e14]/90 z-10" />
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=72"
          alt="Luxury remodeled kitchen and living area with stunning custom marble work"
          className="w-full h-full object-cover object-center transform scale-102"
          loading="eager" fetchPriority="high" decoding="async"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* AMBIENT LIGHT & FLOATING DUST MOTES LAYER (Simulating luxury craftsmanship & dust in light beams) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-[20%] left-[15%] w-96 h-96 bg-accent-gold/10 rounded-full blur-[100px] animate-pulse duration-1000" />
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-accent-amber/5 rounded-full blur-[120px] animate-pulse duration-2000" />
        
        {/* Micro dust particles using standard CSS with staggered opacities & positions */}
        {!reducedMotion && (
          <div className="absolute inset-0 opacity-40">
            <span className="absolute top-1/4 left-1/3 w-1.5 h-1.5 bg-accent-gold/45 rounded-full animate-ping duration-1000" />
            <span className="absolute top-1/2 left-2/3 w-1 h-1 bg-white/30 rounded-full animate-ping duration-[3000ms]" />
            <span className="absolute top-2/3 left-1/4 w-2 h-2 bg-accent-gold/20 rounded-full animate-pulse duration-[5000ms]" />
            <span className="absolute top-1/3 left-3/4 w-1 h-1 bg-white/50 rounded-full animate-ping duration-[4000ms]" />
          </div>
        )}
      </div>

      {/* MIDDLE TEXT LAYER: Main Typography & Primary Badges */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 text-center select-none"
        style={{
          y: reducedMotion ? 0 : textTransformY,
          opacity: reducedMotion ? 1 : opacityFade,
        }}
      >
        {/* Google 5.0 Rating Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/10 mb-6 sm:mb-8 shadow-inner"
        >
          <div className="flex text-amber-400">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={12} fill="currentColor" stroke="none" />
            ))}
          </div>
          <span className="font-mono text-[10px] sm:text-xs font-semibold tracking-wider text-accent-gold uppercase">
            <span className="sm:hidden">4.9 · 9 Reviews</span>
            <span className="hidden sm:inline">4.9 Rating (9 Google Reviews)</span>
          </span>
        </motion.div>

        {/* Cinematic Headline with custom character staggering */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.1] mb-6 max-w-5xl mx-auto"
        >
          Veteran-Built.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-accent-amber to-accent-gold font-serif italic font-normal tracking-wide">
            Family-Owned.
          </span>
        </motion.h1>

        {/* Trust/About Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-accent-warm/85 font-light max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-10"
        >
          <span className="sm:hidden">Veteran-owned general contractor in Salem, OR.</span>
          <span className="hidden sm:inline">
            Talmage Construction is a veteran-owned, family-operated general contractor
            in Salem, OR. From new home builds to kitchen and bath remodels, we bring
            military-grade discipline and meticulous craftsmanship to every project.
          </span>
        </motion.p>

        {/* Action button triggers and primary calling details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={handleEstimateClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-accent-gold text-accent-charcoal hover:bg-white hover:text-accent-charcoal font-sans text-xs uppercase tracking-widest font-extrabold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
          >
            Get a Free Estimate
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </button>

          <a
            href="tel:5039323975"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/15 hover:border-white/20 font-mono text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone size={14} className="text-accent-gold" />
            Call Owner: (503) 932-3975
          </a>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-white/10 pt-8"
        >
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Users className="text-accent-gold shrink-0" size={20} />
            <div className="text-left">
              <p className="font-mono text-[11px] uppercase text-white/50 tracking-wider">Business Type</p>
              <p className="font-sans text-xs font-semibold">Veteran-Owned · Family Crew</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <ShieldCheck className="text-accent-gold shrink-0" size={20} />
            <div className="text-left">
              <p className="font-mono text-[11px] uppercase text-white/50 tracking-wider">Credentials</p>
              <p className="font-sans text-xs font-semibold">Licensed & Fully Insured</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Award className="text-accent-gold shrink-0" size={20} />
            <div className="text-left">
              <p className="font-mono text-[11px] uppercase text-white/50 tracking-wider">Quality Score</p>
              <p className="font-sans text-xs font-semibold">4.9★ Google Verified</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <Star className="text-accent-gold shrink-0" size={20} />
            <div className="text-left">
              <p className="font-mono text-[11px] uppercase text-white/50 tracking-wider">Locality</p>
              <p className="font-sans text-xs font-semibold">Salem, OR</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
