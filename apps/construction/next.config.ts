import type { NextConfig } from "next";

// When HUB_EXPORT=1, build a static export mounted under /construction so the
// site can be served from a shared single-origin hub alongside the other
// projects. Normal `next dev` / `next build` are unaffected (root, no export).
const hubExport = process.env.HUB_EXPORT === "1";

const nextConfig: NextConfig = hubExport
  ? {
      output: "export",
      basePath: "/construction",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      /* default dev/standalone config */
    };

export default nextConfig;
