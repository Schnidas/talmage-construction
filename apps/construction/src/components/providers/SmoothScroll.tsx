"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Drives Lenis from GSAP's ticker (single RAF loop) and keeps ScrollTrigger
 * in sync. For prefers-reduced-motion, Lenis is destroyed so native scrolling
 * is fully restored and ScrollTrigger falls back to native scroll events.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = lenisRef.current?.lenis;

    if (prefersReduced) {
      lenis?.destroy();
      ScrollTrigger.refresh();
      return;
    }

    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000); // ticker time is seconds → ms
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    lenis?.on("scroll", ScrollTrigger.update);

    // Recompute trigger positions once late-loading assets settle.
    const refresh = () => ScrollTrigger.refresh();
    const onLoad = () => refresh();
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", onLoad);
    document.fonts?.ready.then(refresh).catch(() => {});

    return () => {
      gsap.ticker.remove(update);
      lenis?.off("scroll", ScrollTrigger.update);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 1,
        // Sync touch scrolling with GSAP/ScrollTrigger so the pinned horizontal
        // gallery doesn't jump when the pin engages on mobile.
        syncTouch: true,
        syncTouchLerp: 0.075,
        touchMultiplier: 1.4,
      }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
