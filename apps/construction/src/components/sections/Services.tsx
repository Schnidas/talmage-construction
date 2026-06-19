"use client";

import { useRef } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { gsap, useGSAP } from "@/lib/gsap";
import { revealBatch, revealMedia } from "@/lib/anim";
import { services } from "@/lib/site";
import {
  Faucet, Frame, Tools, Shower, Grid, Pattern, Swatch, Bulb, Tag, Sparkle,
} from "@/components/ui/Icons";
import type { ComponentType, SVGProps } from "react";
import styles from "./Services.module.css";

const POINT_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  faucet: Faucet, frame: Frame, tools: Tools, shower: Shower,
  grid: Grid, pattern: Pattern, swatch: Swatch, bulb: Bulb, tag: Tag,
};

export default function Services() {
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
    <section id="services" ref={root} className={`section ${styles.services}`}>
      <div className="container">
        <header className={styles.head}>
          <p className="eyebrow" data-reveal>
            What we do
          </p>
          <h2 className={`heading ${styles.title}`} data-reveal>
            Three things, done <em>exceptionally</em> well.
          </h2>
        </header>

        <div className={styles.rows}>
          {services.map((service) => (
            <article key={service.index} className={styles.row}>
              <div className={styles.media} data-media>
                <Image
                  src={asset(service.image)}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 60rem) 50vw, 100vw"
                  className={styles.image}
                />
                <span className={styles.index} aria-hidden="true">
                  {service.index}
                </span>
              </div>

              <div className={styles.body}>
                <h3 className={styles.rowTitle} data-reveal>
                  {service.title}
                </h3>
                <p className={styles.blurb} data-reveal>
                  {service.blurb}
                </p>
                <ul className={styles.points} data-reveal aria-label="What's included">
                  {service.points.map((point) => {
                    const Icon = POINT_ICONS[point.icon] ?? Sparkle;
                    return (
                      <li key={point.label} title={point.label}>
                        <Icon className={styles.pointIcon} aria-hidden="true" />
                        <span className={styles.pointText}>{point.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
