"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { usePageTransition } from "./page-transition-provider";

export function RouteReady() {
  const pathname = usePathname();
  const { routeReady } = usePageTransition();
  useLayoutEffect(() => { routeReady(pathname); }, [pathname, routeReady]);
  return null;
}
