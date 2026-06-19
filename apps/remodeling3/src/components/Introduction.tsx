import { motion } from 'motion/react';
import { Home, Hourglass, DollarSign, Award, CheckCircle } from 'lucide-react';
import { useMotionSettings } from './MotionContext';

export default function Introduction() {
  const { reducedMotion } = useMotionSettings();

  const values = [
    {
      icon: <Home className="text-accent-amber" size={24} />,
      title: 'Family-Run',
      text: 'You deal directly with Isaac Talmage and his crew. No middlemen, no outsourced subs.',
    },
    {
      icon: <Hourglass className="text-accent-amber" size={24} />,
      title: 'Always On Time',
      text: 'We show up when promised, work clean, and respect your schedule every time.',
    },
    {
      icon: <DollarSign className="text-accent-amber" size={24} />,
      title: 'Fair Pricing',
      text: 'Honest estimates upfront. No surprise charges, no mid-project changes.',
    },
    {
      icon: <Award className="text-accent-amber" size={24} />,
      title: 'Eye for Design',
      text: 'Isaac Talmage advises on tile, layout, and finishes so your vision becomes reality.',
    },
  ];

  // Per-card animation: alternating slide directions + scale
  const cardDirections = [
    { x: -50, y: 0 },
    { x: 50, y: 0 },
    { x: -50, y: 0 },
    { x: 50, y: 0 },
  ];

  return (
    <section id="why-us" className="relative py-20 sm:py-32 bg-accent-warm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 sm:mb-20">
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[1px] bg-accent-amber" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-amber font-semibold">
                Who We Are
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight leading-tight text-accent-charcoal">
              Why Homeowners Choose{' '}
              <span className="font-serif italic text-accent-gold font-normal">
                Talmage Construction
              </span>
            </h2>
          </motion.div>

          {/* Paragraphs — hidden on mobile, visible on lg+ */}
          <motion.div
            initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 lg:pt-6 hidden lg:block"
          >
            <p className="font-sans text-lg sm:text-xl text-accent-charcoal/80 font-light leading-relaxed mb-6">
              With a strong <span className="font-semibold text-accent-amber">4.9-star rating on Google Reviews</span>, Talmage Construction is built on word-of-mouth trust and veteran discipline. Based in Salem, OR, Isaac Talmage and his family crew handle all stages of construction and remodeling seamlessly.
            </p>
            <p className="font-sans text-sm sm:text-md text-accent-charcoal/60 leading-relaxed max-w-2xl">
              We manage the entire project from initial consultation, tile sourcing, layout drafting, down to plumbing details and light fixtures. Your project gets completed sequentially and cleanly, without standard subcontractor delays.
            </p>
          </motion.div>
        </div>

        {/* Cards grid — 3 on mobile, 4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={reducedMotion ? { opacity: 0 } : {
                opacity: 0,
                x: cardDirections[i].x,
                y: cardDirections[i].y,
                scale: 0.9,
              }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{
                duration: 0.65,
                delay: reducedMotion ? 0 : i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              // 4th card hidden on mobile (only 3 cards shown)
              className={`group relative p-6 rounded-2xl bg-white border border-accent-stone hover:shadow-xl hover:-translate-y-1 transition-all duration-300${i === 3 ? ' hidden md:block' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-gold/5 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 rounded-xl bg-accent-warm border border-accent-stone text-accent-amber shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-accent-charcoal mb-1.5 flex items-center gap-2">
                    {value.title}
                    <CheckCircle size={13} className="text-accent-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-accent-charcoal/70 leading-relaxed">
                    {value.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
