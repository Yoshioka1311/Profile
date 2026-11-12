"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { isLocalImagePath } from "@/lib/media";
import { publicPath } from "@/lib/public-path";
import { playAfterOverlay, watchNativeReveal, watchScrollMotion } from "@/lib/scroll-motion";

function MediaImage({ src, alt, sizes, preload }: { src: string; alt: string; sizes: string; preload: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return <Image src={publicPath(src)} alt={alt} fill sizes={sizes} preload={preload} onError={() => setFailed(true)} />;
}

export function RevealMedia({ src, alt, className = "", sizes = "(max-width: 767px) 100vw, 65vw", preload = false }: { src: string; alt: string; className?: string; sizes?: string; preload?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    return watchScrollMotion(({ gsap }) => {
      const context = gsap.context(() => {}, element);
      let stopWaiting: (() => void) | undefined;
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        context.add(() => {
          const timeline = gsap.timeline({ paused: true });
          timeline.fromTo(element, { clipPath: "inset(10% 5% 10% 5%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "expo.out", clearProps: "clipPath" });
          timeline.fromTo(element.querySelector(".media-reveal-layer"), { scale: 1.15 }, { scale: 1, duration: 1.2, ease: "expo.out", clearProps: "transform" }, 0);
          stopWaiting = playAfterOverlay(timeline);
        });
      }, { threshold: 0.06 });
      observer.observe(element);
      return () => {
        observer.disconnect();
        stopWaiting?.();
        context.revert();
      };
    }, () => watchNativeReveal(element));
  }, [src]);

  const hasImage = isLocalImagePath(src);
  return <div ref={ref} className={`media-frame ${className}`} data-has-image={hasImage}>
    <div className="media-reveal-layer"><div className="media-hover-layer">{hasImage ? <MediaImage key={src} src={src} alt={alt} sizes={sizes} preload={preload} /> : null}</div></div>
    <span className="media-shade" aria-hidden="true" />
  </div>;
}
