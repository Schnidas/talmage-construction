import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Shield, CheckCircle, Clipboard, Compass, Wrench } from 'lucide-react';
import { useMotionSettings } from './MotionContext';
import { ProcessStep } from '../types';

export default function Process() {
  const { reducedMotion } = useMotionSettings();
  const [activeTab, setActiveTab] = useState(0);

  const steps: ProcessStep[] = [
    {
      number: '01',
      title: 'Structural Consultation',
      subtitle: 'Free estimates & layout inspection',
      description: 'Joe Talmage arrives directly at your home in Salem or surrounding Salem neighborhoods. We analyze wall structures, verify piping routes, inspect existing waterproofing layers, and map out spatial metrics.',
      details: [
        'Detailed diagnostic look under sinks & crawlspaces',
        'Transparent structural feasibility report',
        'Complete breakdown itemized cost estimate',
        'No pressure, 30-day price guarantee'
      ],
      iconName: 'consult'
    },
    {
      number: '02',
      title: 'Curated Design Sourcing',
      subtitle: 'Advising layouts, tile styles & stone choices',
      description: "We don't believe in cookie-cutter designs. We assist you in selecting premium tile formats (e.g. geometric, subway, herringbone), choosing solid quartz or granite slabs, and allocating optimal light fixture alignments.",
      details: [
        'Free layout advice for spatial density',
        'Recommended Salem tile & stone sources',
        'Comprehensive plumbing & fixture selection',
        'Drywall, framing, & lighting plan alignment'
      ],
      iconName: 'design'
    },
    {
      number: '03',
      title: 'Immaculate Craft Build',
      subtitle: 'Owner-supervised build seqeunce',
      description: 'Joe Talmage, his core crew, and family execute the physical conversion. We prioritize clean workspaces, high structural safety, hot-mopped leakproof barriers, and precision tiling so your outcomes are guaranteed for a lifetime.',
      details: [
        'Daily cleanup of dust & project debris',
        'Daily updates from Joe Talmage',
        'Sequential scheduling — no leaving you midway',
        'Final rigorous detailing pass'
      ],
      iconName: 'build'
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'consult': return <Clipboard className="text-accent-amber" size={28} />;
      case 'design': return <Compass className="text-accent-amber" size={28} />;
      case 'build': return <Wrench className="text-accent-amber" size={28} />;
      default: return <Sparkles className="text-accent-amber" size={28} />;
    }
  };

  const handleEstimateClick = () => {
    const el = document.getElementById('estimate');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="process" className="py-24 sm:py-32 bg-accent-charcoal text-white relative overflow-hidden">
      {/* Visual background decor representing architectural grid paper */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#FAF9F6_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-accent-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-gold font-semibold">
              The Talmage Construction Blueprint
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-white leading-none">
            How We Build Your{' '}
            <span className="font-serif italic text-accent-gold font-normal">
              Dreams
            </span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-accent-warm/75 mt-6 leading-relaxed max-w-2xl">
            Our 3-step procedural method is designed to eliminate classic contractor friction. We combine family-owned accountability with high commercial standards.
          </p>
        </div>

        {/* 3 Steps Control Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* STEP CONTROLLERS (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {steps.map((step, idx) => (
              <button
                key={step.number}
                onClick={() => setActiveTab(idx)}
                className={`text-left p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative group cursor-pointer ${
                  activeTab === idx
                    ? 'bg-gradient-to-r from-slate-900 to-accent-charcoal border-accent-gold shadow-lg shadow-accent-gold/5'
                    : 'bg-transparent border-white/5 hover:border-white/15'
                }`}
              >
                {/* Visual copper border progression slider on active tab */}
                {activeTab === idx && (
                  <motion.div
                    layoutId="active-border"
                    className="absolute left-0 top-0 bottom-0 w-[4px] bg-accent-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-6">
                  {/* Step Numeral */}
                  <span className={`font-mono text-xl sm:text-2xl font-bold tracking-widest ${
                    activeTab === idx ? 'text-accent-gold' : 'text-white/40 group-hover:text-white/70'
                  }`}>
                    {step.number}
                  </span>

                  <div>
                    <h3 className={`font-heading font-extrabold text-md sm:text-lg tracking-wide ${
                      activeTab === idx ? 'text-white' : 'text-white/60 group-hover:text-white/90'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`font-sans text-xs tracking-wider transition-colors mt-0.5 ${
                      activeTab === idx ? 'text-accent-gold/90' : 'text-white/30'
                    }`}>
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* ACTIVE CONTENT CARD (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/60 p-8 sm:p-12 rounded-3xl border border-white/5 shadow-2xl relative min-h-[460px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  {/* Step Icon Accent & Outline info */}
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                    <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-accent-gold inline-block">
                      {getIcon(steps[activeTab].iconName)}
                    </div>
                    <span className="font-mono text-xs tracking-[0.25em] text-white/40 uppercase">
                      Phase {steps[activeTab].number} of 03
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white mb-4">
                    {steps[activeTab].title}
                  </h3>
                  
                  <p className="font-sans text-sm sm:text-md text-accent-warm/80 leading-relaxed mb-8">
                    {steps[activeTab].description}
                  </p>

                  <h4 className="font-mono text-[10px] uppercase font-bold tracking-widest text-accent-gold mb-4">What To Expect In This Step:</h4>
                  
                  {/* Detailed Specs checkmarks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {steps[activeTab].details.map((detail, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 text-xs font-sans text-accent-warm/70">
                        <CheckCircle size={14} className="text-accent-gold mt-0.5 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct CTA action for the step */}
                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5 text-[11px] font-mono text-white/50">
                    <Shield size={14} className="text-accent-gold" />
                    <span>Talmage Construction Homeowner Safety Oath active</span>
                  </div>

                  <button
                    onClick={handleEstimateClick}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent-gold text-accent-charcoal hover:bg-white hover:text-accent-charcoal font-sans text-[11px] uppercase tracking-wider font-extrabold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Start consultation
                    <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
