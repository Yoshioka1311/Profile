"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { usePageTransition } from "./page-transition-provider";

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onNavigate"> & {
  href: string;
  transitionTitle?: string;
};

export function TransitionLink({ href, transitionTitle, replace, scroll, ...props }: TransitionLinkProps) {
  const { navigate } = usePageTransition();
  return <Link {...props} href={href} replace={replace} scroll={scroll} onNavigate={(event) => {
    if (navigate(href, { title: transitionTitle, replace, scroll })) event.preventDefault();
  }} />;
}
