// Shared motion constants + reveal helper.
// Centralizing timing/easing here keeps the whole site's motion coherent.
import { gsap, ScrollTrigger } from "./gsap";

export const EASE = "power3.out";
export const EASE_SOFT = "power2.out";
export const EASE_EXPO = "expo.out";

export const DUR = 0.9;
export const DUR_FAST = 0.6;
export const STAGGER = 0.09;

type RevealOpts = {
  y?: number;
  start?: string;
  stagger?: number;
  duration?: number;
};

/**
 * Batch-reveals all [data-reveal] descendants of `scope` with a staggered
 * fade-up as they enter the viewport. Call only inside the no-reduced-motion
 * branch of gsap.matchMedia() — reduced-motion users keep the visible CSS state.
 */
export function revealBatch(scope: Element, opts: RevealOpts = {}) {
  const items = gsap.utils.toArray<HTMLElement>(
    scope.querySelectorAll("[data-reveal]"),
  );
  if (!items.length) return;

  gsap.set(items, { y: opts.y ?? 34, autoAlpha: 0 });

  ScrollTrigger.batch(items, {
    start: opts.start ?? "top 86%",
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        y: 0,
        autoAlpha: 1,
        duration: opts.duration ?? DUR,
        ease: EASE,
        stagger: opts.stagger ?? STAGGER,
        overwrite: true,
      }),
  });
}

/**
 * Reveals [data-media] containers with a clip-path wipe + a subtle zoom-out of
 * the inner image. Call only inside the no-reduced-motion branch.
 */
export function revealMedia(scope: Element, start = "top 84%") {
  const medias = gsap.utils.toArray<HTMLElement>(
    scope.querySelectorAll("[data-media]"),
  );
  medias.forEach((el) => {
    const img = (el.querySelector("img") as HTMLElement) ?? el;
    gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)" });
    gsap.set(img, { scale: 1.18 });
    ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => {
        gsap.to(el, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.15,
          ease: "power3.inOut",
        });
        gsap.to(img, { scale: 1, duration: 1.5, ease: "power3.out" });
      },
    });
  });
}
