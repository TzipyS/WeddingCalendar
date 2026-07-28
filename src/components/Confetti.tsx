"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PartyPopperIllustration } from "./PartyPopperIllustration";

const COLORS = [
  "#d4af37",
  "#e8d5a8",
  "#c9a962",
  "#b8860b",
  "#4a1c2b",
  "#d4899a",
  "#e8b4b8",
  "#fff9ee",
  "#8b5a6b",
  "#6b9e8a",
  "#c45c6c",
  "#dfc88a",
];

const BASELINE_COUNT = 18;
const MAX_BURST_PIECES = 800;

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
  const spread = 200 + heat * 55;
  const tx = randomBetween(-spread, spread);
  const tyUp = -randomBetween(280, 520 + heat * 45);
  return {
    id: `burst-${++pieceCounter}`,
    originX,
    originY,
    tx,
    tyUp,
    delay: randomBetween(0, 0.12),
    duration: randomBetween(3, 6.5),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: randomBetween(10, 24),
    rotEnd: randomBetween(720, 1440),
    shape: Math.random() > 0.25 ? "rect" : "circle",
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
            ["--rot-start" as string]: `${piece.rotation}deg`,
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
  const [baseline, setBaseline] = useState<BaselinePiece[]>([]);
  const [burstPieces, setBurstPieces] = useState<BurstPiece[]>([]);
  const [firing, setFiring] = useState(false);
  const heatRef = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const nozzleRef = useRef<HTMLSpanElement>(null);

  const triggerBurst = useCallback(() => {
    const nozzleRect = nozzleRef.current?.getBoundingClientRect();
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    const originX = nozzleRect
      ? nozzleRect.left + nozzleRect.width / 2
      : buttonRect
        ? buttonRect.left + buttonRect.width / 2
        : window.innerWidth - 56;
    const originY = nozzleRect
      ? nozzleRect.top + nozzleRect.height / 2
      : buttonRect
        ? buttonRect.top + 8
        : window.innerHeight - 100;

    heatRef.current = Math.min(heatRef.current + 1.5, 15);
    const count = 60 + Math.floor(heatRef.current * 32);
    const fresh = Array.from({ length: count }, () =>
      createBurstPiece(originX, originY, heatRef.current),
    );

    setBurstPieces((prev) => [...prev, ...fresh].slice(-MAX_BURST_PIECES));
    setFiring(true);
    window.setTimeout(() => setFiring(false), 400);
  }, []);

  useEffect(() => {
    setBaseline(Array.from({ length: BASELINE_COUNT }, () => createBaselinePiece()));
  }, []);

  useEffect(() => {
    const decay = setInterval(() => {
      heatRef.current = Math.max(0, heatRef.current - 0.35);
    }, 500);

    const cleanup = setInterval(() => {
      const cutoff = Date.now() - 11000;
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
        className={`party-popper-btn${firing ? " party-popper-btn--firing" : ""}`}
        onClick={triggerBurst}
        aria-label="קונפטי!"
        title="קונפטי!"
      >
        <span className="party-popper-burst-flash" aria-hidden="true" />
        <span className="party-popper-confetti-preview" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </span>
        <span ref={nozzleRef} className="party-popper-nozzle-marker" aria-hidden="true" />
        <PartyPopperIllustration />
      </button>
    </>
  );
}
