"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";

const ScrollContext = createContext(0);

export function useScrollY() {
  return useContext(ScrollContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      setScrollY(scroll);
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <ScrollContext.Provider value={scrollY}>{children}</ScrollContext.Provider>;
}
