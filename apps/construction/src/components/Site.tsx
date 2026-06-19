import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

/**
 * The full Talmage Construction page. Rendered as-is at `/` (baseline theme) and re-rendered
 * under a token override on each `/variant/[id]` route — same markup, new tokens.
 */
export default function Site() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Gallery />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
