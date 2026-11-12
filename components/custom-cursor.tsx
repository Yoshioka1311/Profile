"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (forced-colors: none) and (prefers-contrast: no-preference)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    let frame = 0;
    let x = 0, y = 0, ringX = 0, ringY = 0;
    let visible = false;

    const hide = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      delete document.documentElement.dataset.customCursor;
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const draw = () => {
      frame = 0;
      if (!visible) return;
      ringX += (x - ringX) * 0.16;
      ringY += (y - ringY) * 0.16;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      if (Math.abs(x - ringX) + Math.abs(y - ringY) > 0.1) frame = requestAnimationFrame(draw);
    };
    const onMove = (event: PointerEvent) => {
      const textControl = event.target instanceof Element && event.target.closest("input, textarea, [contenteditable]");
      if (textControl || event.pointerType !== "mouse" || !fine.matches || reduced.matches || document.documentElement.dataset.scrollLocked) { hide(); return; }
      x = event.clientX;
      y = event.clientY;
      if (!visible) { ringX = x; ringY = y; }
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      document.documentElement.dataset.customCursor = "true";
      const target = event.target instanceof Element ? event.target.closest("a, button, [data-cursor-label]") : null;
      const label = target?.getAttribute("data-cursor-label") ?? "";
      ring.dataset.interactive = target ? "true" : "false";
      ring.dataset.label = label ? "true" : "false";
      if (labelRef.current) labelRef.current.textContent = label;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onOut = (event: PointerEvent) => { if (!event.relatedTarget) hide(); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Tab") hide(); };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onOut);
    window.addEventListener("blur", hide);
    window.addEventListener("keydown", onKey);
    window.addEventListener("profile:scroll-lock", hide);
    fine.addEventListener("change", hide);
    reduced.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onOut);
      window.removeEventListener("blur", hide);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("profile:scroll-lock", hide);
      fine.removeEventListener("change", hide);
      reduced.removeEventListener("change", hide);
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot"><span /></div>
      <div ref={ringRef} className="cursor-ring"><div className="cursor-ring-core"><span ref={labelRef} /></div></div>
    </div>
  );
}
