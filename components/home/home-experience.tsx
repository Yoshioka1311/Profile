"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { Locale } from "@/data/content";
import { watchScrollMotion } from "@/lib/scroll-motion";
import { splitText } from "@/lib/split-text";
import { RevealText } from "@/components/motion/reveal-text";
import { RevealMedia } from "@/components/motion/reveal-media";
import { MagneticLink } from "@/components/motion/magnetic-link";

export type HomeContent = {
  locale: Locale;
  name: string;
  role: string;
  bio: string;
  statement: string;
  heroImage: { src: string; alt: string };
  labels: { profile: string; intro: string; allWork: string; contact: string; contactLink: string; scroll: string };
};

export function HomeExperience({ content, children }: { content: HomeContent; children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const locale = content.locale;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const hero = root.querySelector<HTMLElement>(".home-hero");
    let heroInView = true;
    const updateHero = () => { root.dataset.heroVisible = String(heroInView && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { heroInView = entry.isIntersecting; updateHero(); });
    if (hero) observer.observe(hero);
    document.addEventListener("visibilitychange", updateHero);

    const stopMotion = watchScrollMotion(({ gsap, ScrollTrigger }) => {
      const headerHeight = () => document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 104;
      const media = gsap.matchMedia(root);

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const parallax = root.querySelector(".hero-parallax");
        if (hero && parallax) gsap.to(parallax, { yPercent: 2, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true } });
        root.querySelectorAll<HTMLElement>("[data-scene]").forEach((scene) => {
          const wash = scene.querySelector(".scene-wash");
          if (!wash) return;
          gsap.timeline({ scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: true } }).fromTo(wash, { opacity: 0 }, { opacity: 0.65, duration: 1, ease: "none" }).to(wash, { opacity: 0, duration: 1, ease: "none" });
        });
      });

      media.add("(min-width: 1024px) and (min-height: 700px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (prefers-contrast: no-preference) and (forced-colors: none)", () => {
        const statement = root.querySelector<HTMLElement>(".home-statement");
        const text = root.querySelector<HTMLElement>(".statement-text");
        const words = root.querySelectorAll(".statement-word");
        if (!statement || !text || !words.length) return;
        const fits = text.offsetHeight < window.innerHeight - headerHeight() - 96;
        root.dataset.statementPinned = String(fits);
        gsap.fromTo(words, { opacity: 0.45 }, { opacity: 1, stagger: 0.12, duration: 0.5, ease: "none", scrollTrigger: { id: "home-statement", trigger: statement, start: () => `top ${headerHeight()}`, end: () => `+=${Math.max(window.innerHeight * 0.55, words.length * 34)}`, pin: fits, scrub: true, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 1 } });
        return () => { delete root.dataset.statementPinned; };
      });

      ScrollTrigger.refresh();
      return () => {
        media.revert();
        delete root.dataset.statementPinned;
      };
    });

    return () => {
      stopMotion();
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateHero);
      delete root.dataset.heroVisible;
    };
  }, [locale]);

  return (
    <div ref={rootRef} className="home-page" lang={locale}>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-ambient" aria-hidden="true" />
        <div className="container-wide hero-grid">
          <p className="hero-kicker">{content.labels.profile}</p>
          <RevealText as="h1" id="home-title" locale={locale} className="hero-title">{content.name}</RevealText>
          <div className="hero-visual"><div className="hero-parallax"><RevealMedia {...content.heroImage} className="hero-media media-tone-hero" preload sizes="(max-width: 767px) 78vw, 38vw" /></div></div>
          <div className="hero-introduction"><RevealText locale={locale} paragraph className="hero-role">{content.role}</RevealText><MagneticLink href="/work">{content.labels.allWork}</MagneticLink></div>
          <p className="hero-scroll">{content.labels.scroll}<span aria-hidden="true">↓</span></p>
        </div>
      </section>

      {children}

      <section className="home-intro" aria-label={content.labels.intro} data-scene>
        <span className="scene-wash" aria-hidden="true" />
        <div className="container-wide grid-editorial"><RevealText locale={locale} paragraph className="home-intro-text">{content.bio}</RevealText></div>
      </section>

      <section className="home-statement" aria-label={content.labels.intro} data-scene>
        <span className="scene-wash" aria-hidden="true" />
        <div className="container-wide"><h2 className="statement-text"><span className="sr-only">{content.statement}</span><span aria-hidden="true">{splitText(content.statement, locale).map((word, index) => /^\s+$/u.test(word) ? word : <span className="statement-word" key={index}>{word}</span>)}</span></h2></div>
      </section>

      <section className="home-contact" aria-labelledby="home-contact-title" data-scene>
        <span className="scene-wash" aria-hidden="true" />
        <div className="container-wide grid-editorial"><RevealText as="h2" id="home-contact-title" locale={locale} className="home-contact-title">{content.labels.contact}</RevealText><div className="home-contact-action"><MagneticLink href="/contact">{content.labels.contactLink}</MagneticLink></div></div>
      </section>
    </div>
  );
}
