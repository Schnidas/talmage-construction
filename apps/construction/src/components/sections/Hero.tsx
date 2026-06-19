"use client";

import { useRef } from "react";
import { asset } from "@/lib/asset";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useAnchorScroll } from "@/lib/useAnchorScroll";
import { Phone, ArrowRight, Star } from "@/components/ui/Icons";
import { site } from "@/lib/site";
import styles from "./Hero.module.css";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageInner = useRef<HTMLDivElement>(null);
  const onAnchor = useAnchorScroll();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const others = gsap.utils.toArray<HTMLElement>(
          root.current!.querySelectorAll("[data-hero]:not(h1)"),
        );

        let split: SplitText | null = null;
        let tl: gsap.core.Timeline | null = null;

        const build = () => {
          split = new SplitText(titleRef.current!, {
            type: "lines",
            mask: "lines",
            linesClass: styles.line,
          });

          // reveal the (pre-hidden) title; lines stay clipped by their masks
          gsap.set(titleRef.current, { autoAlpha: 1 });
          gsap.set(split.lines, { yPercent: 116 });
          gsap.set(others, { autoAlpha: 0, y: 24 });

          tl = gsap.timeline({ delay: 0.15 });
          tl.from(
            imageInner.current,
            { scale: 1.16, duration: 1.8, ease: "power3.out" },
            0,
          )
            .to(
              split.lines,
              {
                yPercent: 0,
                duration: 1.15,
                stagger: 0.12,
                ease: "power4.out",
              },
              0.25,
            )
            .to(
              others,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.1,
                ease: "power3.out",
              },
              0.7,
            );
        };

        if (document.fonts?.status === "loaded") build();
        else document.fonts.ready.then(build).catch(build);

        // Parallax drift on the hero image
        gsap.to(imageInner.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        return () => {
          tl?.kill();
          split?.revert();
        };
      });
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className={styles.hero}>
      <div className={styles.imageWrap}>
        <div ref={imageInner} className={styles.imageInner}>
          <video
            className={styles.image}
            src={asset("/images/hero-bg.mp4")}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <div className={styles.scrimTop} aria-hidden="true" />
        <div className={styles.scrimBottom} aria-hidden="true" />
      </div>

      <div className={`container ${styles.content}`}>
        <p className={`eyebrow ${styles.kicker}`} data-hero>
          {site.legalName} — {site.area}
        </p>

        <h1 ref={titleRef} className={styles.title} data-hero>
          Crafted to the
          <br />
          last <em>detail</em>.
        </h1>

        <p className={styles.lead} data-hero>
          Full remodels, masterful tile work, and honest design guidance.
        </p>

        <div className={styles.actions} data-hero>
          <a href={site.phoneHref} className="btn btn--lg">
            <Phone />
            <span>Call {site.phoneDisplay}</span>
          </a>
          <a
            href="#work"
            className={`link ${styles.workLink}`}
            onClick={(e) => onAnchor(e, "#work")}
          >
            View our work
            <ArrowRight />
          </a>
        </div>

        <div className={styles.proof} data-hero>
          <span className={styles.proofBadge}>
            <span className={styles.stars} aria-hidden="true">
              <Star /> <Star /> <Star /> <Star /> <Star />
            </span>
            <strong>{site.rating.toFixed(1)}</strong>
            <span className={styles.proofDivider} aria-hidden="true">·</span>
            <span>{site.reviewCount} Google reviews</span>
          </span>
        </div>
      </div>

      <a
        href="#services"
        className={styles.scrollCue}
        data-hero
        onClick={(e) => onAnchor(e, "#services")}
        aria-label="Scroll to explore"
      >
        <span>Scroll</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}
