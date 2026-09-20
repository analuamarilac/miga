"use client";

import { motion, useReducedMotion } from "motion/react";

type ShapeProps = { className?: string };

/** Brilho glossy reaproveitado por todas as formas. */
function Gloss({ id }: { id: string }) {
  return (
    <defs>
      <radialGradient id={`${id}-body`} cx="0.35" cy="0.3" r="0.85">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
        <stop offset="45%" stopColor="#ffffff" stopOpacity="0.12" />
        <stop offset="100%" stopColor="#2c1614" stopOpacity="0.12" />
      </radialGradient>
    </defs>
  );
}

export const FlowerBlob = ({ className }: ShapeProps) => (
  <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
    <Gloss id="flower" />
    <path
      d="M60 8c9 0 15 9 18 17 7-4 17-5 23 1s5 16 1 23c8 3 17 9 17 18s-9 15-17 18c4 7 5 17-1 23s-16 5-23 1c-3 8-9 17-18 17s-15-9-18-17c-7 4-17 5-23-1s-5-16-1-23c-8-3-17-9-17-18s9-15 17-18c-4-7-5-17 1-23s16-5 23-1c3-8 9-17 18-17z"
      fill="#f4b9cf"
    />
    <path
      d="M60 8c9 0 15 9 18 17 7-4 17-5 23 1s5 16 1 23c8 3 17 9 17 18s-9 15-17 18c4 7 5 17-1 23s-16 5-23 1c-3 8-9 17-18 17s-15-9-18-17c-7 4-17 5-23-1s-5-16-1-23c-8-3-17-9-17-18s9-15 17-18c-4-7-5-17 1-23s16-5 23-1c3-8 9-17 18-17z"
      fill="url(#flower-body)"
    />
    <ellipse cx="44" cy="40" rx="13" ry="9" fill="#ffffff" opacity="0.55" transform="rotate(-25 44 40)" />
  </svg>
);

export const SparkleBlob = ({ className }: ShapeProps) => (
  <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
    <Gloss id="sparkle" />
    <path
      d="M60 6c4 26 24 46 54 54-30 8-50 28-54 54-4-26-24-46-54-54 30-8 50-28 54-54z"
      fill="#f4a3bf"
    />
    <path
      d="M60 6c4 26 24 46 54 54-30 8-50 28-54 54-4-26-24-46-54-54 30-8 50-28 54-54z"
      fill="url(#sparkle-body)"
    />
    <ellipse cx="48" cy="46" rx="9" ry="6" fill="#ffffff" opacity="0.6" transform="rotate(-30 48 46)" />
  </svg>
);

export const DropBlob = ({ className, tone = "#e8f1fb" }: ShapeProps & { tone?: string }) => (
  <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
    <Gloss id="drop" />
    <path
      d="M24 76c0-26 22-38 38-62 16 24 34 36 34 62a36 36 0 0 1-72 0z"
      fill={tone}
      fillOpacity="0.85"
    />
    <path
      d="M24 76c0-26 22-38 38-62 16 24 34 36 34 62a36 36 0 0 1-72 0z"
      fill="url(#drop-body)"
    />
    <ellipse cx="46" cy="66" rx="10" ry="14" fill="#ffffff" opacity="0.55" transform="rotate(-18 46 66)" />
  </svg>
);

export const CircleBlob = ({
  className,
  tone = "#f7cedd",
}: ShapeProps & { tone?: string }) => (
  <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
    <Gloss id="circle" />
    <circle cx="60" cy="60" r="54" fill={tone} />
    <circle cx="60" cy="60" r="54" fill="url(#circle-body)" />
    <ellipse cx="42" cy="40" rx="15" ry="10" fill="#ffffff" opacity="0.6" transform="rotate(-25 42 40)" />
  </svg>
);

type FloatProps = {
  children: React.ReactNode;
  className?: string;
  /** Amplitude vertical em px. */
  amplitude?: number;
  duration?: number;
  delay?: number;
};

/** Faz a forma flutuar suavemente em loop. Estático com reduced motion. */
export function Float({
  children,
  className,
  amplitude = 14,
  duration = 7,
  delay = 0,
}: FloatProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0], rotate: [0, amplitude / 4, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
