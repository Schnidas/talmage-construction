/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from './components/Header';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import Process from './components/Process';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import EstimateForm from './components/EstimateForm';
import Footer from './components/Footer';
import { MotionProvider } from './components/MotionContext';

export default function App() {
  return (
    <MotionProvider>
      <div className="relative min-h-screen bg-accent-warm scroll-smooth antialiased">
        
        {/* Sticky Global Header Nav with progress indicator */}
        <Header />

        <main className="relative">
          {/* Parallax Layered Hero Intro */}
          <Hero />

          {/* Why Talmage Construction Scroll Reveal blur-ups */}
          <Introduction />

          {/* Core Remodeling Master Disciplines Bento Selection */}
          <Services />

          {/* Beautiful side-by-side wiped before and afters */}
          <BeforeAfter />

          {/* Chronological 3-Step Process Panel */}
          <Process />

          {/* Multi-advantage slide split row & Agent pitch */}
          <WhyChooseUs />

          {/* Verification stars & active testimonial slider */}
          <Testimonials />

          {/* Booking request estimations submissions form */}
          <EstimateForm />
        </main>

        {/* Closing details with licensing, terms & quick triggers */}
        <Footer />

      </div>
    </MotionProvider>
  );
}
