"use client";

import { useEffect } from "react";

const locks = new Set<symbol>();
let previousRootOverflow = "";
let previousBodyOverflow = "";

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const token = Symbol("scroll-lock");
    if (locks.size === 0) {
      previousRootOverflow = document.documentElement.style.overflow;
      previousBodyOverflow = document.body.style.overflow;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.documentElement.dataset.scrollLocked = "true";
      window.dispatchEvent(new Event("profile:scroll-lock"));
    }
    locks.add(token);

    return () => {
      locks.delete(token);
      if (locks.size > 0) return;
      document.documentElement.style.overflow = previousRootOverflow;
      document.body.style.overflow = previousBodyOverflow;
      delete document.documentElement.dataset.scrollLocked;
      window.dispatchEvent(new Event("profile:scroll-lock"));
    };
  }, [active]);
}
