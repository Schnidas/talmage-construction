import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, CheckCircle, Menu, X, Activity, EyeOff, Eye } from 'lucide-react';
import { useMotionSettings } from './MotionContext';

export default function Header() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { reducedMotion, setReducedMotion } = useMotionSettings();

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
      
      // Condensed state trigger
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of condensed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  const menuItems = [
    { label: 'Overview', id: 'why-us' },
    { label: 'Services', id: 'services' },
    { label: 'Our Work', id: 'portfolio' },
    { label: 'Our Process', id: 'process' },
    { label: 'Talmage Construction Oath', id: 'pitch' },
    { label: 'Reviews', id: 'testimonials' },
  ];

  return (
    <>
      {/* Sticky Header Container */}
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-accent-charcoal/95 backdrop-blur-md py-3 text-white shadow-lg border-b border-white/5'
            : 'bg-transparent py-4 sm:py-6 text-white'
        }`}
      >
        {/* Dynamic progress bar at the very top */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent-charcoal/10">
          <motion.div
            className="h-full bg-accent-amber"
            style={{ width: `${scrollProgress * 100}%` }}
            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo Wordmark */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
            className="flex flex-col cursor-pointer select-none shrink-0"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-extrabold text-lg sm:text-2xl tracking-wider text-accent-amber">
                Talmage Construction
              </span>
              <span className={`hidden sm:inline-block lg:hidden xl:inline-block font-sans text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded border ${
                isScrolled ? 'text-accent-gold border-accent-gold/40' : 'text-white/80 border-white/40'
              }`}>
                Remodeling
              </span>
            </div>
            <span className={`hidden sm:block text-[9px] tracking-[0.25em] font-mono mt-0.5 transition-colors ${
              isScrolled ? 'text-accent-warm/60' : 'text-white/55'
            }`}>
              Salem, WA
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-7">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-sans font-medium text-[11px] uppercase tracking-wider transition-all duration-300 relative py-1 group cursor-pointer whitespace-nowrap ${
                  isScrolled ? 'text-accent-warm hover:text-accent-gold' : 'text-white/90 hover:text-accent-gold'
                }`}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full bg-accent-gold" />
              </button>
            ))}
          </nav>

          {/* Settings & Primary CTA Action Grid */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Reduced Motion Accessibility Toggle */}
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`p-2 rounded-full transition-colors relative cursor-pointer group hidden xl:block ${
                isScrolled 
                  ? 'hover:bg-white/10 text-accent-gold' 
                  : 'hover:bg-accent-charcoal/5 text-accent-amber'
              }`}
              title={reducedMotion ? "Enable animations" : "Disable animations (Reduced Motion)"}
            >
              {reducedMotion ? (
                <div className="flex items-center gap-1">
                  <EyeOff size={16} />
                  <span className="text-[10px] font-mono tracking-wider uppercase font-medium">Safe Mode</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Eye size={16} className="animate-pulse" />
                  <span className="text-[10px] font-mono tracking-wider uppercase font-medium">Cinematic</span>
                </div>
              )}
            </button>

            {/* Quick Phone Call CTA */}
            <a
              href="tel:5039323975"
              className={`hidden xl:flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider transition-all duration-300 shadow-sm hover:shadow-md ${
                isScrolled
                  ? 'bg-accent-gold text-accent-charcoal hover:bg-accent-warm hover:text-accent-charcoal'
                  : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20'
              }`}
            >
              <Phone size={13} className="animate-bounce" />
              (503) 932-3975
            </a>

            {/* Mini Estimate Quick Button */}
            <button
              onClick={() => scrollToSection('estimate')}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-sans text-[10px] sm:text-xs uppercase tracking-widest font-bold transition-all duration-300 whitespace-nowrap ${
                isScrolled
                  ? 'bg-white text-accent-charcoal hover:bg-accent-amber hover:text-white'
                  : 'bg-accent-amber text-white hover:bg-accent-charcoal hover:text-white'
              }`}
            >
              Book Estimate
            </button>

            {/* Mobile Burger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-lg transition-colors cursor-pointer text-current hover:bg-white/10"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-40 bg-accent-charcoal text-white pt-24 pb-8 px-6 shadow-2xl border-b border-accent-gold/20 flex flex-col gap-6 lg:hidden"
          >
            <div className="flex flex-col gap-4">
              {menuItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left font-heading font-medium text-lg uppercase tracking-wider text-accent-warm hover:text-accent-gold border-b border-white/5 pb-2 cursor-pointer"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Mobile interactive details inside drawer */}
            <div className="flex flex-col gap-4 mt-4 font-mono text-[11px] text-accent-warm/70">
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-accent-gold" />
                <span>5.0★ Google Verified (9 Reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-accent-gold" />
                <button
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className="underline hover:text-white flex items-center gap-1"
                >
                  Motion Settings: {reducedMotion ? 'Safe Fades Only' : 'Cinematic Scrollytelling'}
                </button>
              </div>
              <a
                href="tel:5039323975"
                className="flex items-center justify-center gap-2 bg-accent-gold text-accent-charcoal py-3 rounded-full text-xs font-semibold tracking-wider font-sans mt-2 shadow-md"
              >
                <Phone size={14} />
                Call Owners: (503) 932-3975
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
