import { useEffect } from "react";
import Lenis from "lenis";

export const useLenis = () => {
  useEffect(() => {
    // Disable Lenis on touch/mobile devices for 100% native smooth momentum scrolling
    const isMobile =
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768);

    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      infinite: false,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
};
