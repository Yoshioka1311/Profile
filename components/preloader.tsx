"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollLock } from "@/lib/use-scroll-lock";
import type { Locale } from "@/data/content";

const sessionKey = "profile-intro-seen-v1";

export function Preloader({ name, locale }: { name: string; locale: Locale }) {
  const [active, setActive] = useState(false);
  const attempted = useRef(false);
  useScrollLock(active);

  useEffect(() => {
    if (attempted.current) return;
    const frame = requestAnimationFrame(() => {
      attempted.current = true;
      try {
        if (sessionStorage.getItem(sessionKey)) return;
        sessionStorage.setItem(sessionKey, "true");
      } catch {
        // The intro still completes when the browser blocks session storage.
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.hidden) return;
      setActive(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!active) return;
    const shell = document.getElementById("site-shell");
    const previousInert = shell?.inert ?? false;
    if (shell) shell.inert = true;
    const finish = () => setActive(false);
    const onVisibility = () => { if (document.hidden) finish(); };
    const timer = window.setTimeout(finish, 1550);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    preference.addEventListener("change", finish);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearTimeout(timer);
      preference.removeEventListener("change", finish);
      document.removeEventListener("visibilitychange", onVisibility);
      if (shell) shell.inert = previousInert;
    };
  }, [active]);

  if (!active) return null;
  const letters = Array.from(new Intl.Segmenter(locale, { granularity: "grapheme" }).segment(name), ({ segment }) => segment);

  return (
    <div className="preloader" aria-hidden="true" onAnimationEnd={(event) => {
      if (event.target === event.currentTarget) setActive(false);
    }}>
      <div className="preloader-inner">
        <div className="preloader-name">
          {letters.map((letter, index) => (
            <span key={index} className="preloader-letter-mask">
              <span style={{ animationDelay: `${Math.min(index, 40) * 12}ms` }}>{letter === " " ? "\u00a0" : letter}</span>
            </span>
          ))}
        </div>
        <div className="preloader-track"><div className="preloader-progress" /></div>
      </div>
    </div>
  );
}
