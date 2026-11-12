"use client";

import { useSmoothScroll } from "./smooth-scroll-provider";

export function BackToTop({ label }: { label: string }) {
  const { scrollToTop } = useSmoothScroll();
  return <button className="text-link back-to-top" onClick={scrollToTop}>{label}<span aria-hidden="true">↑</span></button>;
}
