"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export default function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const fmt = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`;

  useGSAP(
    () => {
      const el = ref.current!;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const obj = { v: 0 };
        el.textContent = fmt(0);
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: value,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = fmt(obj.v);
              },
            }),
        });
        return () => st.kill();
      });
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={className}>
      {fmt(value)}
    </span>
  );
}
