"use client";

import Wordmark from "@/components/ui/Wordmark";
import { useAnchorScroll } from "@/lib/useAnchorScroll";
import { site } from "@/lib/site";
import { Phone, ArrowUpRight } from "@/components/ui/Icons";
import styles from "./Footer.module.css";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const onAnchor = useAnchorScroll();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <a
            href="#top"
            className={styles.brandLink}
            onClick={(e) => onAnchor(e, "#top")}
            aria-label={`${site.legalName} — back to top`}
          >
            <Wordmark className={styles.wordmark} />
          </a>
          <p className={styles.tagline}>
            Full remodels, beautiful tile, and honest design guidance in{" "}
            {site.area}.
          </p>
          <a href={site.phoneHref} className={`btn ${styles.call}`}>
            <Phone />
            <span>Call {site.phoneDisplay}</span>
          </a>
        </div>

        <nav className={styles.col} aria-label="Footer">
          <span className={styles.colTitle}>Explore</span>
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.colLink}
              onClick={(e) => onAnchor(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.col}>
          <span className={styles.colTitle}>Visit</span>
          <address className={styles.address}>
            {site.address.line1}
            <br />
            {site.address.line2}
          </address>
          <span className={styles.hours}>{site.hoursShort}</span>
          <span className={styles.hours}>Sunday — Closed</span>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copy} suppressHydrationWarning>
          © {year} {site.legalName} · Salem, WA
        </p>
        <a
          href="#top"
          className={`link ${styles.top}`}
          onClick={(e) => onAnchor(e, "#top")}
        >
          Back to top <ArrowUpRight />
        </a>
      </div>
    </footer>
  );
}
