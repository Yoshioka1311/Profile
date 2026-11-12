"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import type Lenis from "lenis";
import { loadScrollMotion } from "@/lib/scroll-motion";

const ScrollContext = createContext<{ scrollToTop: () => void; resetScroll: (target?: HTMLElement | null) => void; scrollToPosition: (top: number, immediate?: boolean) => void }>({ scrollToTop: () => {}, resetScroll: () => {}, scrollToPosition: () => {} });

export function useSmoothScroll() {
  return useContext(ScrollContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const refreshRef = useRef<(() => void) | null>(null);
  const wakeScrollRef = useRef<(() => void) | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let generation = 0;
    let dispose: (() => void) | undefined;

    async function configure() {
      const currentGeneration = ++generation;
      dispose?.();
      dispose = undefined;
      if (!finePointer.matches || reducedMotion.matches) return;

      try {
        const [{ default: LenisClass }, { gsap, ScrollTrigger }] = await Promise.all([
          import("lenis"), loadScrollMotion(),
        ]);
        if (currentGeneration !== generation) return;
        const lenis = new LenisClass({ lerp: 0.08, smoothWheel: true, syncTouch: false, autoRaf: false });
        lenisRef.current = lenis;
        let ticking = false;
        let lastTick: number | undefined;
        let clock = 1;
        function stopTicker() {
          if (ticking) gsap.ticker.remove(tick);
          ticking = false;
          lastTick = undefined;
        }
        function tick(seconds: number) {
          if (lastTick !== undefined) clock += Math.min(50, Math.max(0, (seconds - lastTick) * 1000));
          lastTick = seconds;
          lenis.raf(clock);
          if (lenis.isScrolling !== "smooth") stopTicker();
        }
        function wake() {
          if (currentGeneration !== generation || ticking || lenis.isScrolling !== "smooth") return;
          ticking = true;
          gsap.ticker.add(tick);
        }
        // Lenis dispatches virtual-scroll before it starts the wheel animation.
        const onWheel = () => queueMicrotask(wake);
        wakeScrollRef.current = wake;
        const syncLock = () => {
          if (document.documentElement.dataset.scrollLocked) {
            lenis.stop();
            stopTicker();
          } else {
            lenis.start();
          }
        };
        const refresh = () => { lenis.resize(); ScrollTrigger.refresh(); };
        refreshRef.current = refresh;
        lenis.on("scroll", ScrollTrigger.update);
        lenis.on("virtual-scroll", onWheel);
        window.addEventListener("profile:scroll-lock", syncLock);
        syncLock();
        void document.fonts.ready.then(() => { if (currentGeneration === generation) refresh(); });

        dispose = () => {
          window.removeEventListener("profile:scroll-lock", syncLock);
          stopTicker();
          lenis.off("virtual-scroll", onWheel);
          lenis.off("scroll", ScrollTrigger.update);
          lenis.destroy();
          lenisRef.current = null;
          refreshRef.current = null;
          wakeScrollRef.current = null;
        };
      } catch {
        // Native scrolling remains available if the optional motion modules fail to load.
      }
    }

    void configure();
    finePointer.addEventListener("change", configure);
    reducedMotion.addEventListener("change", configure);
    return () => {
      generation++;
      finePointer.removeEventListener("change", configure);
      reducedMotion.removeEventListener("change", configure);
      dispose?.();
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => refreshRef.current?.());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const scrollToTop = useCallback(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenisRef.current && !reduced) {
      lenisRef.current.scrollTo(0, { duration: 1.1 });
      wakeScrollRef.current?.();
    } else window.scrollTo({ top: 0, behavior: reduced ? "instant" : "smooth" });
    document.getElementById("site-wordmark")?.focus({ preventScroll: true });
  }, []);
  const resetScroll = useCallback((target?: HTMLElement | null) => {
    const padding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const top = target ? Math.max(0, target.getBoundingClientRect().top + window.scrollY - padding) : 0;
    lenisRef.current?.scrollTo(top, { immediate: true, force: true });
    window.scrollTo({ top, behavior: "instant" });
  }, []);
  const scrollToPosition = useCallback((top: number, immediate = false) => {
    const instant = immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(top, { immediate: instant, duration: 0.9, force: instant });
      wakeScrollRef.current?.();
    } else window.scrollTo({ top, behavior: instant ? "instant" : "smooth" });
  }, []);
  const value = useMemo(() => ({ scrollToTop, resetScroll, scrollToPosition }), [scrollToTop, resetScroll, scrollToPosition]);

  return (
    <ScrollContext.Provider value={value}>
      <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </LazyMotion>
    </ScrollContext.Provider>
  );
}
