"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { revealBatch } from "@/lib/anim";
import { site } from "@/lib/site";
import { Phone, MapPin, Clock, ArrowUpRight } from "@/components/ui/Icons";
import styles from "./Contact.module.css";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const [todayIdx, setTodayIdx] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    // Client-only: highlighting "today" must run after mount to avoid an SSR
    // mismatch (server/client clocks & time zones differ).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTodayIdx((new Date().getDay() + 6) % 7);
  }, []);

  // Lazy-mount the map iframe only when it nears the viewport (perf).
  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowMap(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealBatch(root.current!);
      });
    },
    { scope: root },
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (honeypot.current?.value) {
      setSent(true); // bot: act successful, drop silently
      return;
    }
    const data = new FormData(e.currentTarget);
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? ""),
          project: String(data.get("project") ?? ""),
          message: String(data.get("message") ?? ""),
          source: "construction-next",
        }),
      });
      const out = await res.json().catch(() => ({}));
      if (!res.ok || !out.ok) throw new Error(out.error || "Something went wrong.");
      setSent(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : `Could not send. Please call ${site.phoneDisplay}.`,
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" ref={root} className={`section ${styles.contact}`}>
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            Get in touch
          </p>
          <h2 className={`heading ${styles.title}`} data-reveal>
            Let&rsquo;s plan your <em>remodel</em>.
          </h2>
          <p className={styles.lead} data-reveal>
            Tell us about your space and what you have in mind. We&rsquo;ll get
            back to you to set up a consultation — honest advice, no pressure.
          </p>
        </header>

        <div className={styles.grid}>
          <form className={styles.form} onSubmit={handleSubmit} data-reveal>
            <input
              ref={honeypot}
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
            />
            <div className={styles.field}>
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" required autoComplete="name" />
            </div>
            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor="phone">Phone</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <div className={styles.field}>
              <label htmlFor="project">Project type</label>
              <select id="project" name="project" defaultValue="Full remodel">
                <option>Full remodel</option>
                <option>Tile work</option>
                <option>Design consultation</option>
                <option>Kitchen</option>
                <option>Bathroom</option>
                <option>Other</option>
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="message">Tell us about your project</label>
              <textarea id="message" name="message" rows={4} required />
            </div>

            <button type="submit" className="btn btn--lg" disabled={submitting}>
              {submitting ? "Sending…" : "Request a consultation"}
            </button>

            {sent && (
              <p className={styles.sent} role="status">
                Thanks, your request is in. We&rsquo;ll call you shortly. Prefer to
                talk now? Call us at {site.phoneDisplay}.
              </p>
            )}
            {error && (
              <p className={styles.sent} role="alert" style={{ color: "#b3261e" }}>
                {error}
              </p>
            )}
          </form>

          <div className={styles.info}>
            <a
              href={site.phoneHref}
              className={styles.infoCard}
              data-reveal
            >
              <span className={styles.infoIcon}>
                <Phone />
              </span>
              <span className={styles.infoBody}>
                <span className={styles.infoLabel}>Call us</span>
                <span className={styles.infoValueLg}>{site.phoneDisplay}</span>
              </span>
            </a>

            <a
              href={site.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.infoCard}
              data-reveal
            >
              <span className={styles.infoIcon}>
                <MapPin />
              </span>
              <span className={styles.infoBody}>
                <span className={styles.infoLabel}>Visit / Service area</span>
                <span className={styles.infoValue}>
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </span>
                <span className={`link ${styles.infoLink}`}>
                  Get directions <ArrowUpRight />
                </span>
              </span>
            </a>

            <div className={styles.infoCard} data-reveal>
              <span className={styles.infoIcon}>
                <Clock />
              </span>
              <span className={styles.infoBody}>
                <span className={styles.infoLabel}>Hours</span>
                <ul className={styles.hours}>
                  {site.hours.map((h, i) => (
                    <li
                      key={h.day}
                      className={`${styles.hoursRow} ${
                        todayIdx === i ? styles.hoursToday : ""
                      }`}
                    >
                      <span>{h.day}</span>
                      <span>{h.value}</span>
                    </li>
                  ))}
                </ul>
              </span>
            </div>
          </div>

        </div>
      </div>

      <div className={`container ${styles.locate}`} data-reveal ref={mapRef}>
        <div className={styles.locateModule}>
          <aside className={styles.locatePanel}>
            <p className={styles.locateEyebrow}>Find us</p>
            <h3 className={styles.locateTitle}>
              In the heart of {site.area}.
            </h3>
            <ul className={styles.locateRows}>
              <li>
                <span className={styles.locateIcon}>
                  <MapPin />
                </span>
                <span>
                  <span className={styles.locateRowLabel}>Address</span>
                  {site.address.line1}, {site.address.line2}
                </span>
              </li>
              <li>
                <span className={styles.locateIcon}>
                  <Clock />
                </span>
                <span>
                  <span className={styles.locateRowLabel}>Hours</span>
                  {site.hoursShort} · Sun closed
                </span>
              </li>
              <li>
                <span className={styles.locateIcon}>
                  <Phone />
                </span>
                <span>
                  <span className={styles.locateRowLabel}>Call</span>
                  <a href={site.phoneHref}>{site.phoneDisplay}</a>
                </span>
              </li>
            </ul>
            <a
              href={site.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${styles.locateBtn}`}
            >
              Get directions <ArrowUpRight />
            </a>
          </aside>

          <div className={styles.locateMap}>
            {showMap && (
              <iframe
                className={styles.map}
                title={`Map showing ${site.legalName} in Salem, WA`}
                src={`https://www.google.com/maps?q=${site.mapsQuery}&z=15&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
