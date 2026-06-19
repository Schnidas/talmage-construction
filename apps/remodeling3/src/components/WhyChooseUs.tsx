import { motion } from 'motion/react';
import { Clock, Hammer, DollarSign, Star } from 'lucide-react';
import { useMotionSettings } from './MotionContext';

export default function WhyChooseUs() {
  const { reducedMotion } = useMotionSettings();

  const advantages = [
    {
      title: 'Family-Based & Local',
      desc: 'No middlemen or outsourced subs. You deal directly with Joe Talmage and his crew.',
      icon: <Hammer className="text-accent-amber" size={18} />
    },
    {
      title: 'Always On Time',
      desc: 'Punctual, sequential, tidy work that returns your home to comfort quicker.',
      icon: <Clock className="text-accent-amber" size={18} />
    },
    {
      title: 'Fair, Guaranteed Estimates',
      desc: 'Transparent pricing with no mid-stream bills or surprise expenses.',
      icon: <DollarSign className="text-accent-amber" size={18} />
    }
  ];

  const slideInLeft = {
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, x: -60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-10%' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const slideInRight = {
    initial: reducedMotion ? { opacity: 0 } : { opacity: 0, x: 60 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-10%' },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }
  };

  return (
    <section id="pitch" className="py-16 sm:py-24 bg-accent-warm relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Pitch Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: CRISP IMAGE CAPTURE (5 cols) */}
          <motion.div 
            {...slideInLeft}
            className="lg:col-span-5 relative"
          >
            {/* Visual background framing highlighting fine details */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-accent-gold pointer-events-none rounded-tl-xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-accent-gold pointer-events-none rounded-br-xl" />

            <div className="rounded-2xl overflow-hidden shadow-2xl bg-black border-4 border-white aspect-[3/4]">
              <img
                src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=800&q=80"
                alt="Expert modern craftsman detail placement in wooden tiles"
                className="w-full h-full object-cover filter brightness-95 hover:scale-103 transition-transform duration-750"
                loading="lazy" decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Float Badge */}
            <div className="absolute -bottom-6 -left-6 bg-accent-charcoal text-white p-5 rounded-2xl shadow-2xl border border-white/5 max-w-xs hidden sm:block">
              <span className="text-[10px] font-mono tracking-widest text-accent-gold uppercase font-bold block mb-1">Talmage Construction Trust Medal</span>
              <p className="font-heading font-black text-md leading-tight text-white flex items-center gap-1.5">
                4.9 Google Rating <Star fill="#c5a880" size={14} className="text-accent-gold inline shrink-0" />
              </p>
              <p className="font-sans text-[11px] text-accent-warm/75 mt-1.5">
                Kristen Bailey: "Joe Talmage and his crew are amazing! Great eye for design."
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: DETAILED ADVANTAGES (7 cols) */}
          <motion.div 
            {...slideInRight}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-accent-amber" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-amber font-semibold">
                Our Pledge of Excellence
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-accent-charcoal mb-6 leading-tight">
              Remodeling With Absolute{' '}
              <span className="font-serif italic text-accent-gold font-normal">
                Accountability
              </span>
            </h2>

            <p className="font-sans text-sm sm:text-md text-accent-charcoal/80 leading-relaxed mb-8">
              When you hire Joe Talmage and his crew, we manage, schedule, and complete your
              project sequentially so you stay in comfort the whole way through.
            </p>

            {/* Core Advantages Grid list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {advantages.map((adv) => (
                <div key={adv.title} className="flex gap-4">
                  <div className="flex-none p-2.5 rounded-xl bg-white border border-accent-stone text-accent-amber shadow-sm w-10 h-10 flex items-center justify-center">
                    {adv.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm sm:text-md text-accent-charcoal mb-1">
                      {adv.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-accent-charcoal/65 leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
