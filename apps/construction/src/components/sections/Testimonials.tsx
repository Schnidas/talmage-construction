"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { revealBatch } from "@/lib/anim";
import { reviews, site } from "@/lib/site";
import { Star } from "@/components/ui/Icons";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        revealBatch(root.current!, { stagger: 0.12 });
      });
    },
    { scope: root },
  );

  return (
    <section id="reviews" ref={root} className={`section ${styles.reviews}`}>
      <div className="container">
        <header className={styles.head}>
          <p className={`eyebrow ${styles.eyebrow}`} data-reveal>
            What clients say
          </p>
          <h2 className={`heading ${styles.title}`} data-reveal>
            Trusted by <em>neighbors</em>.
          </h2>
          <div className={styles.rating} data-reveal>
            <span className={styles.ratingNum}>{site.rating.toFixed(1)}</span>
            <span className={styles.stars} aria-hidden="true">
              <Star /> <Star /> <Star /> <Star /> <Star />
            </span>
            <span className={styles.ratingText}>
              Rated {site.rating.toFixed(1)} across {site.reviewCount} Google
              reviews
            </span>
          </div>
        </header>

        <div className={styles.grid}>
          {reviews.map((review) => (
            <figure key={review.quote} className={styles.quote} data-reveal>
              <span className={styles.cardStars} aria-label="5 stars">
                <Star /><Star /><Star /><Star /><Star />
              </span>
              <blockquote className={styles.quoteText}>
                {review.quote}
              </blockquote>
              <figcaption className={styles.cite}>
                <span className={styles.citeSource}>{review.source}</span>
                <span className={styles.citeContext}>{review.context}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
