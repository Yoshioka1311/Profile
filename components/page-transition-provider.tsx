"use client";

import { AnimatePresence } from "framer-motion";
import * as m from "framer-motion/m";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { copy, getRouteTitle, type Locale } from "@/data/content";
import { getTransitionDestination } from "@/lib/navigation";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { useSmoothScroll } from "./smooth-scroll-provider";

type NavigationOptions = { title?: string; replace?: boolean; scroll?: boolean };
type Curtain = {
  id: number;
  href: string;
  pathname: string;
  title: string;
  visible: boolean;
  reduced: boolean;
  mode: "link" | "history";
};
type PendingRoute = Curtain & { covered: boolean; arrived: boolean; options: NavigationOptions; leaving: boolean };
type TransitionContextValue = {
  navigate: (href: string, options?: NavigationOptions) => boolean;
  routeReady: (pathname: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function usePageTransition() {
  const value = useContext(TransitionContext);
  if (!value) throw new Error("Page transitions require PageTransitionProvider.");
  return value;
}

export function PageTransitionProvider({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const router = useRouter();
  const { resetScroll } = useSmoothScroll();
  const [curtain, setCurtain] = useState<Curtain | null>(null);
  const pending = useRef<PendingRoute | null>(null);
  const sequence = useRef(0);
  const committedPath = useRef("");
  const watchdog = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealFrame = useRef(0);
  const focusAfter = useRef(false);
  const busy = curtain !== null;
  useScrollLock(busy);

  const clearWatchdog = useCallback(() => {
    if (watchdog.current) clearTimeout(watchdog.current);
    watchdog.current = null;
  }, []);

  const reveal = useCallback((id: number) => {
    const route = pending.current;
    if (!route || route.id !== id || route.leaving) return;
    route.leaving = true;
    clearWatchdog();
    cancelAnimationFrame(revealFrame.current);
    revealFrame.current = requestAnimationFrame(() => {
      if (pending.current?.id !== id) return;
      if (route.mode === "link" && route.options.scroll !== false) {
        let anchor: HTMLElement | null = null;
        try {
          const hash = new URL(route.href, window.location.href).hash.slice(1);
          if (hash) anchor = document.getElementById(decodeURIComponent(hash));
        } catch {
          // Malformed fragments fall back to the start of the destination page.
        }
        resetScroll(anchor);
      }
      setCurtain((current) => current?.id === id ? { ...current, visible: false } : current);
    });
  }, [clearWatchdog, resetScroll]);

  const finish = useCallback(() => {
    if (pending.current && !pending.current.leaving) return;
    focusAfter.current = pending.current?.mode === "link";
    pending.current = null;
    clearWatchdog();
    setCurtain(null);
  }, [clearWatchdog]);

  const begin = useCallback((href: string, mode: "link" | "history", options: NavigationOptions = {}) => {
    clearWatchdog();
    cancelAnimationFrame(revealFrame.current);
    const destination = new URL(href, window.location.href);
    const pathname = destination.pathname;
    const visual: Curtain = {
      id: ++sequence.current,
      href,
      pathname,
      title: options.title ?? getRouteTitle(pathname, locale),
      visible: true,
      reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      mode,
    };
    const entry: PendingRoute = {
      ...visual,
      covered: false,
      arrived: mode === "history" && committedPath.current === pathname,
      options,
      leaving: false,
    };
    pending.current = entry;
    setCurtain(visual);
    watchdog.current = setTimeout(() => reveal(entry.id), 6000);
  }, [clearWatchdog, locale, reveal]);

  const navigate = useCallback((href: string, options: NavigationOptions = {}) => {
    const destination = getTransitionDestination(href, window.location.href);
    if (!destination) return false;
    if (pending.current) return true;
    router.prefetch(destination);
    begin(destination, "link", options);
    return true;
  }, [begin, router]);

  const covered = useCallback((id: number) => {
    const route = pending.current;
    if (!route || route.id !== id || route.covered || route.leaving) return;
    route.covered = true;
    if (route.mode === "history") {
      if (route.arrived) reveal(id);
      return;
    }
    try {
      const options = { scroll: route.options.scroll !== false };
      if (route.options.replace) router.replace(route.href, options);
      else router.push(route.href, options);
    } catch {
      reveal(id);
    }
  }, [reveal, router]);

  const routeReady = useCallback((pathname: string) => {
    committedPath.current = pathname;
    const route = pending.current;
    if (!route || (route.pathname !== pathname && !route.covered)) return;
    route.arrived = true;
    if (route.covered) reveal(route.id);
  }, [reveal]);

  useEffect(() => {
    const onPopState = () => {
      const pathname = window.location.pathname;
      if (pathname !== committedPath.current) begin(`${pathname}${window.location.search}${window.location.hash}`, "history");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [begin]);

  useEffect(() => {
    if (!busy) {
      if (focusAfter.current) {
        document.getElementById("main-content")?.focus({ preventScroll: true });
        focusAfter.current = false;
      }
      return;
    }
    const shell = document.getElementById("site-shell");
    const wasInert = shell?.inert ?? false;
    if (shell) shell.inert = true;
    return () => { if (shell) shell.inert = wasInert; };
  }, [busy]);

  useEffect(() => () => {
    clearWatchdog();
    cancelAnimationFrame(revealFrame.current);
  }, [clearWatchdog]);

  const value = useMemo(() => ({ navigate, routeReady }), [navigate, routeReady]);

  return (
    <TransitionContext.Provider value={value}>
      {children}
      <AnimatePresence onExitComplete={finish}>
        {curtain?.visible ? (
          <m.div
            key={curtain.id}
            className="route-curtain"
            data-transition-mode={curtain.mode}
            data-reduced-motion={curtain.reduced}
            aria-hidden="true"
            initial={curtain.reduced ? { opacity: 0, y: 0 } : { opacity: 1, y: curtain.mode === "history" ? 0 : "100%" }}
            animate="covered"
            variants={{ covered: { opacity: 1, y: 0, transition: { duration: curtain.reduced || curtain.mode === "history" ? 0.12 : 0.46, ease: [0.76, 0, 0.24, 1] } } }}
            exit={curtain.reduced ? { opacity: 0, transition: { duration: 0.12 } } : { y: "-101%", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } }}
            onAnimationComplete={(definition) => { if (definition === "covered") covered(curtain.id); }}
          >
            <div className="container-wide route-curtain-inner"><p className="route-curtain-title">{curtain.title}</p></div>
          </m.div>
        ) : null}
      </AnimatePresence>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{curtain ? `${copy[locale].transition.opening} ${curtain.title}` : ""}</p>
    </TransitionContext.Provider>
  );
}
