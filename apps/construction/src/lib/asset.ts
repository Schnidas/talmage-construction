// Prefix the hub base path onto a /public asset URL so images resolve when the
// site is served from a sub-path (the project hub mounts this app at
// /construction). NEXT_PUBLIC_HUB_BASE is empty in normal dev/build, so this is
// a no-op there; it is set to "/construction" only for the hub export build.
const BASE = process.env.NEXT_PUBLIC_HUB_BASE ?? "";

export function asset(src: string): string {
  return src.startsWith("/") ? BASE + src : src;
}
