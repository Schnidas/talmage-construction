// Central GSAP registration. Import gsap/ScrollTrigger/SplitText/useGSAP from here.
// GSAP (incl. ScrollTrigger + SplitText) is 100% free as of April 2025.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
