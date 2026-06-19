"use client";

import { useCallback, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

/**
 * Returns a click handler for in-page anchor links that scrolls smoothly via
 * Lenis (or natively when reduced-motion / Lenis is unavailable).
 */
export function useAnchorScroll() {
  const lenis = useLenis();
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  return useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      if (lenis && !reduced.current) {
        lenis.scrollTo(el as HTMLElement, { offset: -76 });
      } else {
        (el as HTMLElement).scrollIntoView({
          behavior: reduced.current ? "auto" : "smooth",
          block: "start",
        });
      }
    },
    [lenis],
  );
}
