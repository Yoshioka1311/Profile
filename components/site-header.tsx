"use client";

import { TransitionLink as Link } from "./transition-link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import * as m from "framer-motion/m";
import { useEffect, useRef, useState } from "react";
import { copy, site, type Locale } from "@/data/content";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { LanguageSwitcher } from "./language-switcher";
import { FolderGlyph } from "./folder-glyph";

const navigation = [
  { href: "/work", key: "work", folder: 0 },
  { href: "/about", key: "about", folder: 1 },
  { href: "/contact", key: "contact", folder: 2 },
] as const;

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  useScrollLock(open);
  const labels = copy[locale];

  function closeMenu() {
    dialogRef.current?.close();
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }

  function openMenu() {
    dialogRef.current?.showModal();
    setOpen(true);
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 900px)");
    const onChange = () => {
      if (desktop.matches && dialogRef.current?.open) {
        dialogRef.current.close();
        setOpen(false);
      }
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const currentLocation = (href: string) => {
    if (pathname === href) return "page";
    if (pathname.startsWith(`${href}/`)) return "location";
  };

  return (
    <>
      <header className="site-header">
        <div className="container-wide header-inner">
          <Link id="site-wordmark" href="/" className="wordmark" aria-current={pathname === "/" ? "page" : undefined}>
            {site.brand}
          </Link>
          <nav className="desktop-nav" aria-label={labels.nav.label}>
            {navigation.map(({ href, key, folder }) => (
              <Link key={href} href={href} className="folder-link" aria-current={currentLocation(href)}>
                <FolderGlyph index={folder} />
                <span className="folder-label">{labels.nav[key]}<span aria-hidden="true">↗</span></span>
              </Link>
            ))}
          </nav>
          <div className="header-controls">
            <LanguageSwitcher locale={locale} />
            <button ref={triggerRef} className="menu-trigger" onClick={openMenu} aria-expanded={open} aria-controls="mobile-menu" aria-label={labels.menu.open}>
              <span className="menu-glyph" aria-hidden="true"><span /><span /></span>
            </button>
          </div>
        </div>
      </header>
      <dialog
        id="mobile-menu"
        ref={dialogRef}
        className="mobile-menu"
        aria-label={labels.nav.label}
        data-lenis-prevent
        onCancel={(event) => { event.preventDefault(); closeMenu(); }}
        onClose={() => setOpen(false)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
          if (!controls?.length) return;
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
      >
        <div className="container-wide menu-content">
          <div className="menu-topline">
            <span className="menu-caption">{labels.menu.label}</span>
            <button autoFocus className="menu-close text-link" onClick={closeMenu}>{labels.menu.close}<span aria-hidden="true">×</span></button>
          </div>
          <nav aria-label={labels.nav.label} className="mobile-nav">
            {navigation.map(({ href, key, folder }, index) => (
              <div key={href} className="menu-link-mask">
                <m.div initial={false} animate={{ y: open ? 0 : "110%", opacity: open ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.8, delay: open && !reduced ? index * 0.08 : 0, ease: [0.16, 1, 0.3, 1] }}>
                  <Link href={href} className="mobile-nav-link" aria-current={currentLocation(href)} onClick={closeMenu}>
                    <FolderGlyph index={folder} />
                    <span className="mobile-folder-label">{labels.nav[key]}</span>
                    <span className="menu-link-arrow" aria-hidden="true">↗</span>
                  </Link>
                </m.div>
              </div>
            ))}
          </nav>
          <div className="menu-bottomline">
            <span>{site.role[locale]}</span>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </dialog>
    </>
  );
}
