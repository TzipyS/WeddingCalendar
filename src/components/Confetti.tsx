"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const COLORS = [
  "#d4af37",
  "#f5d76e",
  "#c9a962",
  "#e8c547",
  "#ffd700",
  "#b8860b",
  "#fff8dc",
  "#4a1c2b",
  "#ff6b9d",
  "#87ceeb",
  "#ff4757",
  "#7bed9f",
];

const BASELINE_COUNT = 18;
const MAX_BURST_PIECES = 700;

type BaselinePiece = {
  id: string;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotation: number;
  shape: "rect" | "circle";
};

type BurstPiece = {
  id: string;
  originX: number;
  originY: number;
  tx: number;
  tyUp: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotEnd: number;
  shape: "rect" | "circle";
  createdAt: number;
};

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

let pieceCounter = 0;

function createBaselinePiece(): BaselinePiece {
  return {
    id: `base-${++pieceCounter}`,
    left: randomBetween(0, 100),
    delay: randomBetween(0, 10),
    duration: randomBetween(6, 14),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: randomBetween(5, 10),
    rotation: randomBetween(0, 360),
    shape: Math.random() > 0.35 ? "rect" : "circle",
  };
}

function createBurstPiece(originX: number, originY: number, heat: number): BurstPiece {
  const spread = 120 + heat * 35;
  const tx = randomBetween(-spread, spread);
  const tyUp = -randomBetween(140, 320 + heat * 25);
  return {
    id: `burst-${++pieceCounter}`,
    originX,
    originY,
    tx,
    tyUp,
    delay: randomBetween(0, 0.15),
    duration: randomBetween(2.2, 4.5),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: randomBetween(10, 22),
    rotEnd: randomBetween(540, 1080),
    shape: Math.random() > 0.3 ? "rect" : "circle",
    createdAt: Date.now(),
  };
}

function BaselineLayer({ pieces }: { pieces: BaselinePiece[] }) {
  return (
    <>
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={`confetti-piece confetti-${piece.shape}`}
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            backgroundColor: piece.color,
            width: piece.shape === "rect" ? `${piece.size}px` : `${piece.size * 0.8}px`,
            height: piece.shape === "rect" ? `${piece.size * 0.5}px` : `${piece.size * 0.8}px`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        />
      ))}
    </>
  );
}

function BurstLayer({ pieces }: { pieces: BurstPiece[] }) {
  return (
    <>
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className={`confetti-piece confetti-piece-explode confetti-${piece.shape}`}
          style={{
            left: `${piece.originX}px`,
            top: `${piece.originY}px`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            backgroundColor: piece.color,
            width: piece.shape === "rect" ? `${piece.size}px` : `${piece.size * 0.85}px`,
            height: piece.shape === "rect" ? `${piece.size * 0.55}px` : `${piece.size * 0.85}px`,
            ["--tx" as string]: `${piece.tx}px`,
            ["--ty-up" as string]: `${piece.tyUp}px`,
            ["--rot-end" as string]: `${piece.rotEnd}deg`,
          }}
        />
      ))}
    </>
  );
}

export function ConfettiCelebration() {
  const baseline = useMemo(
    () => Array.from({ length: BASELINE_COUNT }, () => createBaselinePiece()),
    [],
  );
  const [burstPieces, setBurstPieces] = useState<BurstPiece[]>([]);
  const [firing, setFiring] = useState(false);
  const heatRef = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const triggerBurst = useCallback(() => {
    const rect = buttonRef.current?.getBoundingClientRect();
    const originX = rect ? rect.left + rect.width / 2 : window.innerWidth - 56;
    const originY = rect ? rect.top + rect.height / 2 : window.innerHeight - 56;

    heatRef.current = Math.min(heatRef.current + 1.5, 15);
    const count = 55 + Math.floor(heatRef.current * 28);
    const fresh = Array.from({ length: count }, () =>
      createBurstPiece(originX, originY, heatRef.current),
    );

    setBurstPieces((prev) => [...prev, ...fresh].slice(-MAX_BURST_PIECES));
    setFiring(true);
    window.setTimeout(() => setFiring(false), 350);
  }, []);

  useEffect(() => {
    const decay = setInterval(() => {
      heatRef.current = Math.max(0, heatRef.current - 0.35);
    }, 500);

    const cleanup = setInterval(() => {
      const cutoff = Date.now() - 9000;
      setBurstPieces((prev) => prev.filter((p) => p.createdAt > cutoff));
    }, 1200);

    return () => {
      clearInterval(decay);
      clearInterval(cleanup);
    };
  }, []);

  return (
    <>
      <div className="confetti-layer" aria-hidden="true">
        <BaselineLayer pieces={baseline} />
      </div>

      <div className="confetti-burst-layer" aria-hidden="true">
        <BurstLayer pieces={burstPieces} />
      </div>

      <button
        ref={buttonRef}
        type="button"
        className={`confetti-bomb-btn${firing ? " confetti-bomb-btn--firing" : ""}`}
        onClick={triggerBurst}
        aria-label="קונפטי!"
        title="קונפטי!"
      >
        <span className="confetti-bomb-stream" aria-hidden="true" />
        <span className="confetti-bomb-body" aria-hidden="true">
          <span className="confetti-bomb-nozzle" />
          <span className="confetti-bomb-icon">🎊</span>
        </span>
      </button>
    </>
  );
}
