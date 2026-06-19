"use client";

import { useRef } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { gsap, useGSAP } from "@/lib/gsap";
import { revealBatch, revealMedia } from "@/lib/anim";
import Counter from "@/components/ui/Counter";
import styles from "./About.module.css";

const STATS = [
  { value: 4.9, decimals: 1, label: "Google rating" },
  { value: 9, decimals: 0, label: "Google reviews" },
  { value: 100, decimals: 0, suffix: "%", label: "Satisfaction" },
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealBatch(root.current!);
        revealMedia(root.current!);
      });
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className={`section ${styles.about}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.media} data-media>
          <Image
            src={asset("/images/about.jpg")}
            alt="A craftsman's hands carefully setting tile, with a level and tools nearby"
            fill
            sizes="(min-width: 60rem) 42vw, 100vw"
            className={styles.image}
          />
        </div>

        <div className={styles.body}>
          <p className="eyebrow" data-reveal>
            Our approach
          </p>
          <h2 className={`heading ${styles.title}`} data-reveal>
            The difference is in the <em>details</em>.
          </h2>
          <p className={styles.lead} data-reveal>
            Talmage Construction is a veteran-owned, family-operated general
            contractor led by Joe Talmage — known for precision, honesty, and
            genuine pride in every project that leaves their hands.
          </p>
          <p className={styles.text} data-reveal>
            Military discipline translates directly to construction: show up on
            time, do the work right, never cut corners. Honest estimates, clean
            jobsites, and craftsmanship you&rsquo;ll see and feel for years.
          </p>
          <p className={styles.signature} data-reveal>
            — Joe Talmage, Owner
          </p>
        </div>
      </div>

      <div className={`container ${styles.stats}`}>
        {STATS.map((stat) => (
          <div key={stat.label} className={styles.stat} data-reveal>
            <span className={styles.statNum}>
              <Counter
                value={stat.value}
                decimals={stat.decimals}
                suffix={stat.suffix}
              />
            </span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
