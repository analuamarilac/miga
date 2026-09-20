"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { stickers, type StickerId } from "@/data/stickers";

type StickerProps = {
  id: StickerId;
  /** Posicionamento e largura — sempre classes de posição absoluta. */
  className?: string;
  /** Amplitude do flutuar, em px. */
  amplitude?: number;
  duration?: number;
  delay?: number;
  /** Inclinação em repouso, em graus. */
  rotate?: number;
};

/**
 * Adesivo decorativo flutuando sobre a foto do hero.
 * Fica estático com `prefers-reduced-motion`.
 */
export function Sticker({
  id,
  className = "",
  amplitude = 14,
  duration = 8,
  delay = 0,
  rotate = 0,
}: StickerProps) {
  const sticker = stickers[id];
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      aria-hidden="true"
      style={{ rotate }}
      animate={
        reduceMotion
          ? undefined
          : { y: [0, -amplitude, 0], rotate: [rotate, rotate + 5, rotate] }
      }
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <Image
        src={sticker.src}
        alt=""
        width={sticker.width}
        height={sticker.height}
        sizes="(max-width: 768px) 15vw, 10vw"
        className="h-auto w-full drop-shadow-[0_10px_22px_rgba(56,27,26,0.22)]"
      />
    </motion.div>
  );
}
