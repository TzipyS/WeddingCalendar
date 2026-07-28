"use client";

import { useEffect, useState } from "react";
import { useScrollY } from "./SmoothScrollProvider";

const TOP_START = 14;
const TOP_END = 58;

export function ScrollMazelTov() {
  const scrollY = useScrollY();
  const [maxScroll, setMaxScroll] = useState(1);

  useEffect(() => {
    const update = () => {
      setMaxScroll(Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const progress = Math.min(1, Math.max(0, scrollY / maxScroll));
  const topVh = TOP_START + progress * (TOP_END - TOP_START);

  return (
    <p
      className="scroll-mazel-tov font-secular"
      style={{ top: `${topVh}vh` }}
      aria-hidden="true"
    >
      מזל טוב
    </p>
  );
}
