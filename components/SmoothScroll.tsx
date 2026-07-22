"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      duration: 1.12,
      smoothWheel: true,
      touchMultiplier: 1.15,
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
