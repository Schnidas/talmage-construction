// Thin-stroke inline icons tuned to the editorial aesthetic. All use currentColor.
import type { SVGProps } from "react";

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <path d="M4 12h16m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Phone(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L15.5 12l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Star(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...props}>
      <path d="m12 2.5 2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.9l-5.8 3.06 1.1-6.47-4.7-4.58 6.5-.95L12 2.5Z" />
    </svg>
  );
}

export function MapPin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function Clock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Home(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <path d="M4 11 12 4l8 7M6 9.5V20h12V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Ruler(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="8" width="18" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 8v3M11 8v4M15 8v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function Sparkle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 3l1.7 5.1c.2.6.6 1 1.2 1.2L20 11l-5.1 1.7c-.6.2-1 .6-1.2 1.2L12 19l-1.7-5.1c-.2-.6-.6-1-1.2-1.2L4 11l5.1-1.7c.6-.2 1-.6 1.2-1.2L12 3Z" />
    </svg>
  );
}

/* ---- Service-point topic icons ---- */
export function Faucet(props: SVGProps<SVGSVGElement>) {
  // Water droplet — plumbing for "Kitchens & baths" (reads clean at small sizes)
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <path d="M12 3.8c3.4 3.9 5.3 6.7 5.3 9.4a5.3 5.3 0 0 1-10.6 0c0-2.7 1.9-5.5 5.3-9.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
export function Frame(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 9h16M9 9v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
export function Tools(props: SVGProps<SVGSVGElement>) {
  // Hammer — finish carpentry
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <path d="M13 4.5l6.5 6.5-3 3-6.5-6.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10.3 7.8 5 13.1a1.6 1.6 0 0 0 0 2.3l.6.6a1.6 1.6 0 0 0 2.3 0l5.3-5.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function Shower(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <path d="M12 3v3M6 11a6 6 0 0 1 12 0H6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 15v1.5M12 16v1.5M15 15v1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
export function Grid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
export function Pattern(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <path d="M3 9l4 4-4 4M9 9l4 4-4 4M15 9l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function Swatch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <path d="M12 3l9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
export function Bulb(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.4c.6.6.9 1.1 1 2.1h6c.1-1 .4-1.5 1-2.1A6 6 0 0 0 12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function Tag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" aria-hidden="true" {...props}>
      <path d="M3 12V4h8l10 10-8 8L3 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="7.5" cy="8.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function Quote(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 36" width="1em" height="1em" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M0 36V19.2C0 8.6 6.2 1.4 17 0l1.8 5.4c-5.8 1.6-8.7 4.9-9 9.6H20V36H0Zm28 0V19.2C28 8.6 34.2 1.4 45 0l1.8 5.4c-5.8 1.6-8.7 4.9-9 9.6H48V36H28Z" />
    </svg>
  );
}
