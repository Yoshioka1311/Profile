async function importScrollMotion() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

type ScrollMotion = Awaited<ReturnType<typeof importScrollMotion>>;
let motionRequest: Promise<ScrollMotion> | undefined;

export function loadScrollMotion(): Promise<ScrollMotion> {
  motionRequest ??= importScrollMotion().catch((error: unknown) => {
    motionRequest = undefined;
    throw error;
  });
  return motionRequest;
}

export function watchScrollMotion(
  setup: (motion: ScrollMotion) => void | (() => void),
  setupTouch?: () => void | (() => void),
): () => void {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  let generation = 0;
  let frame = 0;
  let cleanup: void | (() => void);

  function reset() {
    generation++;
    cancelAnimationFrame(frame);
    cleanup?.();
    cleanup = undefined;
  }

  function configure() {
    reset();
    if (preference.matches) return;
    if (!finePointer.matches) {
      cleanup = setupTouch?.();
      return;
    }
    const current = generation;
    void Promise.all([loadScrollMotion(), document.fonts.ready]).then(([motion]) => {
      if (current !== generation) return;
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          if (current === generation) cleanup = setup(motion);
        });
      });
    }).catch(() => {
      // Content stays visible when an optional motion module cannot load.
    });
  }

  configure();
  preference.addEventListener("change", configure);
  finePointer.addEventListener("change", configure);
  return () => {
    preference.removeEventListener("change", configure);
    finePointer.removeEventListener("change", configure);
    reset();
  };
}

export function watchNativeReveal(element: HTMLElement, prepare?: () => void): () => void {
  let stopWaiting: (() => void) | undefined;
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    stopWaiting = playAfterOverlay({
      play: () => {
        prepare?.();
        element.dataset.nativeReveal = "true";
      },
      progress: () => {},
    });
  }, { threshold: 0.06 });
  observer.observe(element);
  return () => {
    observer.disconnect();
    stopWaiting?.();
    delete element.dataset.nativeReveal;
  };
}

export function playAfterOverlay(animation: { play: () => unknown; progress: (value: number) => unknown }): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const cleanup = () => {
    window.removeEventListener("profile:scroll-lock", start);
    if (timer) clearTimeout(timer);
  };
  function start() {
    if (document.documentElement.dataset.scrollLocked) return;
    cleanup();
    animation.play();
  }
  if (document.documentElement.dataset.scrollLocked) {
    window.addEventListener("profile:scroll-lock", start);
    timer = setTimeout(() => { cleanup(); animation.progress(1); }, 7500);
  } else start();
  return cleanup;
}
