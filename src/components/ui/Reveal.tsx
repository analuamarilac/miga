"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Atraso em segundos — use para escalonar itens de uma lista. */
  delay?: number;
  /** Distância inicial no eixo Y, em px. */
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Revela o conteúdo quando ele entra na viewport.
 * Respeita `prefers-reduced-motion`: nesse caso renderiza estático.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = "div",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
