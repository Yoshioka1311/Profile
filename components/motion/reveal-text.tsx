"use client";

import { Fragment, useEffect, useRef } from "react";
import { playAfterOverlay, watchNativeReveal, watchScrollMotion } from "@/lib/scroll-motion";
import { splitText } from "@/lib/split-text";

type Props = { children: string; locale: string; as?: "h1" | "h2" | "h3" | "p"; className?: string; paragraph?: boolean; id?: string };

export function RevealText({ children, locale, as: Tag = "p", className = "", paragraph = false, id }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measureLines = () => {
      const masks = Array.from(element.querySelectorAll<HTMLElement>(".reveal-word-mask"));
      const lines: number[] = [];
      const groups = masks.map((mask) => {
        const top = mask.getBoundingClientRect().top;
        const group = lines.findIndex((line) => Math.abs(line - top) < 3);
        if (group >= 0) return group;
        lines.push(top);
        return lines.length - 1;
      });
      return { masks, groups };
    };
    return watchScrollMotion(({ gsap, ScrollTrigger }) => {
      const context = gsap.context(() => {}, element);
      let stopWaiting: (() => void) | undefined;
      let played = false;
      const play = () => {
        if (played) return;
        played = true;
        context.add(() => {
          if (paragraph) {
            const tween = gsap.fromTo(element.querySelector(".reveal-prose"), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "expo.out", paused: true, clearProps: "transform,opacity" });
            stopWaiting = playAfterOverlay(tween);
            return;
          }
          const { masks, groups } = measureLines();
          const tween = gsap.fromTo(masks.map((mask) => mask.firstElementChild), { yPercent: 110 }, { yPercent: 0, duration: 1, ease: "expo.out", paused: true, stagger: (index: number) => groups[index] * 0.08, clearProps: "transform" });
          stopWaiting = playAfterOverlay(tween);
        });
      };
      context.add(() => { ScrollTrigger.create({ trigger: element, start: "top 92%", once: true, onEnter: play }); });
      return () => {
        stopWaiting?.();
        context.revert();
      };
    }, () => watchNativeReveal(element, paragraph ? undefined : () => {
      const { masks, groups } = measureLines();
      masks.forEach((mask, index) => mask.style.setProperty("--reveal-delay", `${groups[index] * 80}ms`));
    }));
  }, [children, locale, paragraph]);

  return (
    <div ref={ref} className={`text-reveal ${className}`}>
      <Tag id={id}>
        <span className="sr-only">{children}</span>
        {paragraph ? <span className="reveal-prose" aria-hidden="true">{children}</span> : <span aria-hidden="true">{splitText(children, locale).map((word, index) => /^\s+$/u.test(word) ? <Fragment key={index}>{word}</Fragment> : <span className="reveal-word-mask" key={index}><span className="reveal-word">{word}</span></span>)}</span>}
      </Tag>
    </div>
  );
}
