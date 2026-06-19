import { Globe, MapPin, Clock, Phone, Mail, ExternalLink, ShieldAlert, Star } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-accent-charcoal text-white pt-20 pb-10 border-t border-white/5 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Quick Links & Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/5">
          
          {/* Brand Intro Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 cursor-pointer" onClick={handleScrollToTop}>
                <span className="font-heading font-extrabold text-2xl tracking-wider text-accent-gold">
                  Talmage Construction
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest px-1.5 py-0.5 rounded border text-accent-gold border-accent-gold/40">
                  Remodeling
                </span>
              </div>
              <span className="text-[10px] tracking-[0.25em] font-mono mt-1.5 text-white/50">
                VETERAN-OWNED · SALEM, OR
              </span>
            </div>

            <p className="font-sans text-xs sm:text-sm text-accent-warm/75 leading-relaxed">
              Achieve your dream bathroom, kitchen, or wholesale home restoration while enjoying full sequential clarity and personal homeowner respect. Licensed, fully bonded & insured.
            </p>

            {/* Google review star rating */}
            <div className="flex items-center gap-2.5">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} fill="currentColor" className="text-accent-gold" />
                ))}
              </div>
              <span className="font-mono text-[10px] text-white/50 tracking-wider">
                4.9 GOOGLE RATING (9 REVIEWS)
              </span>
            </div>
          </div>

          {/* Quick contact direct values Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-accent-gold">
              Direct Contact
            </h4>
            
            <div className="flex flex-col gap-4 font-sans text-xs sm:text-sm text-accent-warm/80">
              
              <a
                href="tel:5039323975"
                className="flex items-start gap-3 hover:text-accent-gold transition-colors"
              >
                <Phone size={16} className="text-accent-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Call Joe Talmage: (503) 932-3975</p>
                  <p className="text-[11px] text-white/50 mt-0.5">Primary project coordination line</p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-accent-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white"></p>
                  <p className="text-[11px] text-white/50 mt-0.5">4676 Commercial St SE, Salem, OR 97302</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={16} className="text-accent-gold shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Business Hours</p>
                  <p className="text-[11px] text-white/50 mt-0.5 font-mono">Mon – Sat: 7:00 AM – 6:00 PM · Closed Sunday</p>
                </div>
              </div>

            </div>
          </div>

          {/* Service Area Highlights and badges Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-accent-gold">
              Service Boundaries
            </h4>
            <p className="font-sans text-xs text-accent-warm/75 leading-relaxed">
              We proudly serve Salem, and surrounding Salem areas with sequential focus.
            </p>

            <div className="flex items-center gap-2.5 p-3.5 bg-white/5 rounded-2xl border border-white/10">
              <div className="w-8 h-8 rounded-full bg-accent-gold/20 flex items-center justify-center text-accent-gold">
                OR
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold text-white uppercase tracking-wider">Licensed Contractor</p>
                <p className="font-sans text-[11px] text-white/50 mt-0.5">Talmage ConstructionR*801C7 · Verified Active</p>
              </div>
            </div>

            <a
              href="https://g.co/kgs/remodel"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[11px] uppercase tracking-wider text-accent-gold hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-bold"
            >
              Verify On Google Maps Business <ExternalLink size={11} />
            </a>
          </div>

        </div>

        {/* Closing details and legal credit block */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-mono text-white/45">
          <p>© {currentYear} Talmage Construction. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-[10px]">
              <Globe size={11} /> Veteran-Owned in Salem, OR
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
            <button
              onClick={handleScrollToTop}
              className="hover:text-white underline transition-colors cursor-pointer"
            >
              Back to top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
