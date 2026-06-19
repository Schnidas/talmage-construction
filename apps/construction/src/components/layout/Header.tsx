"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import Wordmark from "@/components/ui/Wordmark";
import { Phone } from "@/components/ui/Icons";
import { site } from "@/lib/site";
import styles from "./Header.module.css";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reducedRef = useRef(false);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  // Solid bar after a small scroll — works with Lenis (root) or native scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback(() => setOpen(false), []);

  const scrollTo = useCallback(
    (href: string) => {
      const el = document.querySelector(href);
      if (!el) return;
      if (lenis && !reducedRef.current) {
        lenis.scrollTo(el as HTMLElement, { offset: -76 });
      } else {
        (el as HTMLElement).scrollIntoView({
          behavior: reducedRef.current ? "auto" : "smooth",
          block: "start",
        });
      }
    },
    [lenis],
  );

  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      closeMenu();
      // let the menu begin closing before scrolling
      requestAnimationFrame(() => scrollTo(href));
    },
    [closeMenu, scrollTo],
  );

  // Lock scroll + trap focus + Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;

    const toggle = toggleRef.current;
    const main = document.getElementById("main");
    main?.setAttribute("inert", "");
    if (lenis && !reducedRef.current) lenis.stop();
    else document.body.style.overflow = "hidden";

    const menu = menuRef.current;
    const focusables = menu?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusables?.[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      main?.removeAttribute("inert");
      if (lenis && !reducedRef.current) lenis.start();
      else document.body.style.overflow = "";
      toggle?.focus();
    };
  }, [open, lenis]);

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
          open ? styles.menuOpen : ""
        }`}
      >
        <div className={`container ${styles.bar}`}>
          <a
            href="#top"
            className={styles.brand}
            onClick={(e) => handleNav(e, "#top")}
            aria-label={`${site.legalName} — home`}
          >
            <Wordmark className={styles.wordmark} />
            <span className={styles.brandSuffix}>Remodeling</span>
          </a>

          <nav className={styles.nav} aria-label="Primary">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.navLink}
                onClick={(e) => handleNav(e, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <a href={site.phoneHref} className={`btn ${styles.callBtn}`}>
              <Phone />
              <span>{site.phoneDisplay}</span>
            </a>
            <a
              href={site.phoneHref}
              className={styles.callIcon}
              aria-label={`Call ${site.phoneDisplay}`}
            >
              <Phone />
            </a>
            <button
              ref={toggleRef}
              className={styles.toggle}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className={styles.toggleBars} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`${styles.menu} ${open ? styles.menuVisible : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className={styles.menuInner}>
          <p className={`eyebrow ${styles.menuEyebrow}`}>{site.area}</p>
          <nav className={styles.menuNav} aria-label="Mobile">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.menuLink}
                style={{ transitionDelay: `${0.08 + i * 0.05}s` }}
                onClick={(e) => handleNav(e, item.href)}
              >
                <span className={styles.menuLinkIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            ))}
          </nav>
          <div className={styles.menuFoot}>
            <a href={site.phoneHref} className={`btn btn--lg ${styles.menuCall}`}>
              <Phone />
              <span>Call {site.phoneDisplay}</span>
            </a>
            <address className={styles.menuAddress}>
              {site.address.line1}
              <br />
              {site.address.line2}
            </address>
          </div>
        </div>
      </div>
    </>
  );
}
