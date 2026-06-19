import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  Space_Grotesk,
  Bricolage_Grotesque,
  Hanken_Grotesk,
  Spectral,
  Figtree,
  Bodoni_Moda,
} from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesque",
  display: "swap",
});

// Departure-mode fonts for /variant design systems (not preloaded on the baseline).
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  preload: false,
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
  preload: false,
});
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
  preload: false,
});
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
  preload: false,
});
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
  preload: false,
});

const fontVars = [
  fraunces.variable,
  spaceGrotesk.variable,
  bricolage.variable,
  hanken.variable,
  spectral.variable,
  figtree.variable,
  bodoni.variable,
].join(" ");

const SITE_URL = "https://talmageconstruction.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Talmage Construction — General Contractor · Salem, OR",
    template: "%s · Talmage Construction",
  },
  description:
    "Full home remodels, masterful tile work, and design consultation in Salem, OR. Rated 4.9 ★ across 9 Google reviews. Thorough craft, fair pricing.",
  keywords: [
    "remodeling Salem OR",
    "tile contractor Salem OR",
    "home remodel Salem OR",
    "kitchen remodel",
    "bathroom remodel",
    "design consultation",
    "Talmage Construction",
  ],
  authors: [{ name: "Talmage Construction" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Talmage Construction",
    title: "Talmage Construction — General Contractor · Salem OR",
    description:
      "Full remodels, beautiful tile work, and design consultation in Salem, OR. Rated 4.9 ★ (9 Google reviews).",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "A warmly lit remodeled kitchen by Talmage Construction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talmage Construction — General Contractor · Salem OR",
    description:
      "Full remodels, beautiful tile work, and design consultation in Salem, OR. Rated 4.9 ★ (9 Google reviews).",
    images: ["/images/og.jpg"],
  },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#191817",
};

// LocalBusiness structured data for rich local-search results.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Talmage Construction",
  description:
    "Construction & remodeling company specializing in full remodels, tile work, and design consultation.",
  image: `${SITE_URL}/images/og.jpg`,
  url: SITE_URL,
  telephone: "+1-503-932-3975",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "4676 Commercial St SE",
    addressLocality: "Salem",
    addressRegion: "OR",
    postalCode: "97302",
    addressCountry: "US",
  },
  areaServed: [
    "Salem", "Redmond", "Corvallis", "Albany", "Willamette Valley"
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "07:00",
      closes: "18:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "9",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <body>
        {/* Set the JS flag before paint so reveal elements hide without FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
