// ===========================================================================
// Motion foundation — Lenis smooth scroll + GSAP ScrollTrigger.
// All effects are progressive enhancements: if the user prefers reduced motion
// (or JS fails) the page is fully readable with everything visible.
// ===========================================================================
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function ready(fn: () => void) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}

ready(() => {
  // --- Header: condense on scroll + scroll progress bar (cheap, always on) ---
  initHeader();

  if (prefersReduced) {
    // Reveals are already visible (global.css gates them on .has-motion, which
    // the head script only adds when motion is allowed). Nothing else to do.
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // --- Smooth scroll -------------------------------------------------------
  const lenis = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // In-page anchor links should use Lenis so they respect smooth scrolling.
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -10 });
    });
  });

  initReveals();
  initParallax();
  initScrollFill();
  initBeforeAfter();
  initPinnedRows();
  initHero();

  // Recompute once fonts/images settle.
  window.addEventListener('load', () => ScrollTrigger.refresh());
});

// ------------------------------------------------------------------- hero --
// Cinematic full-bleed hero: the background image slowly zooms/drifts while the
// content rises and dissolves on scroll. One scrubbed timeline = buttery smooth
// with Lenis, no jank, no layout thrash (transform + opacity only).
function initHero() {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;
  const img = hero.querySelector<HTMLElement>('[data-hero-bg] img, [data-hero-bg] video');
  const content = hero.querySelector<HTMLElement>('[data-hero-content]');

  if (img) {
    gsap.fromTo(
      img,
      { scale: 1.06, yPercent: 0 },
      {
        scale: 1.16,
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      },
    );
  }
  if (content) {
    gsap.to(content, {
      yPercent: -14,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom 65%', scrub: true },
    });
  }
}

// ---------------------------------------------------------------- reveals --
function initReveals() {
  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  items.forEach((el) => {
    const delay = parseFloat(el.dataset.revealDelay ?? '0');
    // Hero content sits in the first fold and must reveal on load — NOT on a
    // scroll position. A ScrollTrigger (even one keyed to .hero) is measured
    // against the viewport, and on mobile the URL-bar collapse at load shifts
    // that measurement enough that the low-sitting CTA row never crosses its
    // start line until the user scrolls — leaving the buttons invisible. So for
    // hero items, play the staggered tween straight away with no trigger.
    const heroEl = el.closest('.hero');
    if (heroEl) {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.9, delay, ease: 'power3.out' });
      return;
    }
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

// --------------------------------------------------------------- parallax --
// data-parallax="0.2" → moves at 20% of scroll (positive = slower/upward feel)
function initParallax() {
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const speed = parseFloat(el.dataset.parallax ?? '0.2');
    gsap.to(el, {
      yPercent: -speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.closest('[data-parallax-scope]') ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

// ------------------------------------------------------------- scroll fill --
// Two-tone editorial text: words start in stone, light to ink/clay as the
// block scrolls through the viewport. Markup is split into .word spans by the
// ScrollText component.
function initScrollFill() {
  gsap.utils.toArray<HTMLElement>('.scrollfill').forEach((block) => {
    const words = Array.from(block.querySelectorAll<HTMLElement>('.word'));
    if (!words.length) return;
    ScrollTrigger.create({
      trigger: block,
      start: 'top 78%',
      end: 'bottom 55%',
      scrub: true,
      onUpdate: (self) => {
        const lit = Math.round(self.progress * words.length);
        words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
      },
    });
  });
}

// --------------------------------------------------------- before / after --
// Each [data-ba] holds a .ba-after layer whose clip-path is driven by scroll,
// plus an optional draggable handle for manual exploration.
function initBeforeAfter() {
  gsap.utils.toArray<HTMLElement>('[data-ba]').forEach((el) => {
    const after = el.querySelector<HTMLElement>('.ba-after');
    const handle = el.querySelector<HTMLElement>('.ba-handle');
    if (!after) return;

    const set = (p: number) => {
      const pct = Math.max(0, Math.min(100, p));
      after.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      if (handle) handle.style.left = `${pct}%`;
    };
    set(50);

    // Scroll scrub sweeps the reveal from ~35% → ~75% as it passes through.
    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      end: 'bottom 40%',
      scrub: true,
      onUpdate: (self) => {
        if (el.dataset.dragging === 'true') return;
        set(30 + self.progress * 55);
      },
    });

    // Manual drag / pointer override.
    if (handle) {
      const onMove = (clientX: number) => {
        const rect = el.getBoundingClientRect();
        set(((clientX - rect.left) / rect.width) * 100);
      };
      const start = (e: PointerEvent) => {
        el.dataset.dragging = 'true';
        handle.setPointerCapture(e.pointerId);
        onMove(e.clientX);
      };
      const move = (e: PointerEvent) => {
        if (el.dataset.dragging === 'true') onMove(e.clientX);
      };
      const end = () => {
        el.dataset.dragging = 'false';
      };
      handle.addEventListener('pointerdown', start);
      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', end);
      handle.addEventListener('pointercancel', end);
      // Keyboard support
      handle.addEventListener('keydown', (e) => {
        const cur = parseFloat(handle.style.left) || 50;
        if (e.key === 'ArrowLeft') { el.dataset.dragging = 'true'; set(cur - 4); }
        if (e.key === 'ArrowRight') { el.dataset.dragging = 'true'; set(cur + 4); }
      });
    }
  });
}

// ----------------------------------------------------------- pinned rows --
// Dark "How we help" giant-word rows: image scrubs/scales behind the word.
function initPinnedRows() {
  gsap.utils.toArray<HTMLElement>('[data-row-media]').forEach((media) => {
    gsap.fromTo(
      media,
      { scale: 1.18 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: media.closest('[data-row]') ?? media,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      },
    );
  });
}

// ----------------------------------------------------------------- header --
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (bar) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
