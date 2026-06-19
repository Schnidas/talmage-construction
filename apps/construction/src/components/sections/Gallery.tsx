"use client";

import { useRef } from "react";
import Image from "next/image";
import { asset } from "@/lib/asset";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { revealBatch } from "@/lib/anim";
import { useAnchorScroll } from "@/lib/useAnchorScroll";
import { projects } from "@/lib/site";
import { ArrowUpRight } from "@/components/ui/Icons";
import styles from "./Gallery.module.css";

export default function Gallery() {
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const onAnchor = useAnchorScroll();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Header reveal on all sizes
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealBatch(headRef.current!);
      });

      // All sizes: pin + horizontal scrub
      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current!;
          const pin = pinRef.current!;
          pin.classList.add(styles.pinned);

          const distance = () => track.scrollWidth - pin.clientWidth;

          // Scrub across the track, then HOLD on the last card for a beat before
          // releasing to vertical scroll, so the final card is readable.
          const tl = gsap.timeline({ defaults: { ease: "none" } });
          tl.to(track, { x: () => -distance(), duration: 1 })
            .to(track, { x: () => -distance(), duration: 0.32 });

          const st = ScrollTrigger.create({
            animation: tl,
            trigger: pin,
            start: "top top",
            end: () => "+=" + distance() * 1.32,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });

          return () => {
            st.kill();
            tl.kill();
            pin.classList.remove(styles.pinned);
            gsap.set(track, { clearProps: "transform" });
          };
        },
      );
    },
    { scope: root },
  );

  return (
    <section id="work" ref={root} className={styles.gallery}>
      <div className={`container ${styles.head}`} ref={headRef}>
        <div>
          <p className="eyebrow" data-reveal>
            Selected work
          </p>
          <h2 className={`heading ${styles.title}`} data-reveal>
            Rooms we&rsquo;re <em>proud</em> of.
          </h2>
        </div>
        <p className={styles.note} data-reveal>
          A look at recent remodels and tile across Salem and North
          Salem. Drag, scroll, or swipe to explore.
        </p>
      </div>

      <div className={styles.pin} ref={pinRef}>
        <div className={styles.track} ref={trackRef}>
          {projects.map((project, i) => (
            <figure key={project.title} className={styles.card}>
              <div className={styles.cardMedia}>
                <Image
                  src={asset(project.image)}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 60rem) 30rem, 80vw"
                  className={styles.cardImage}
                />
                <span className={styles.cardNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <figcaption className={styles.cardMeta}>
                <span className={styles.cardCat}>{project.category}</span>
                <h3 className={styles.cardTitle}>{project.title}</h3>
              </figcaption>
            </figure>
          ))}

          <a
            href="#contact"
            className={styles.endCard}
            onClick={(e) => onAnchor(e, "#contact")}
          >
            <span className={styles.endCat}>Your project</span>
            <span className={styles.endTitle}>
              Have a space in <em>mind</em>?
            </span>
            <span className={`link ${styles.endLink}`}>
              Start a consultation
              <ArrowUpRight />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
