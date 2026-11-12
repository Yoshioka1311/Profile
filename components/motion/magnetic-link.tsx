"use client";

import { useEffect, useRef } from "react";
import { TransitionLink } from "@/components/transition-link";

export function MagneticLink({ href, children, className = "" }: { href: string; children: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const enabled = useRef(false);

  useEffect(() => {
    const preference = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => { enabled.current = preference.matches; ref.current?.style.setProperty("--mag-x", "0px"); ref.current?.style.setProperty("--mag-y", "0px"); };
    update();
    preference.addEventListener("change", update);
    return () => { cancelAnimationFrame(frame.current); preference.removeEventListener("change", update); };
  }, []);

  return <span ref={ref} className={`magnetic-wrap ${className}`} onPointerMove={(event) => {
    if (!enabled.current || event.pointerType !== "mouse" || frame.current) return;
    const x = event.clientX, y = event.clientY;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const element = ref.current;
      if (!element) return;
      const bounds = element.getBoundingClientRect();
      element.style.setProperty("--mag-x", `${Math.max(-8, Math.min(8, (x - bounds.left - bounds.width / 2) * 0.12))}px`);
      element.style.setProperty("--mag-y", `${Math.max(-8, Math.min(8, (y - bounds.top - bounds.height / 2) * 0.12))}px`);
    });
  }} onPointerLeave={() => {
    cancelAnimationFrame(frame.current);
    frame.current = 0;
    ref.current?.style.setProperty("--mag-x", "0px");
    ref.current?.style.setProperty("--mag-y", "0px");
  }}>
    <TransitionLink href={href} className="wipe-button"><span>{children}</span><svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.4" /></svg></TransitionLink>
  </span>;
}
