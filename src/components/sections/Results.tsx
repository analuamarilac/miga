"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { resultMilestones, resultsFootnote } from "@/data/content";

/** Anima o número de 0 até `value` quando o bloco entra na viewport. */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}%
    </span>
  );
}

export function Results() {
  return (
    <section
      id="resultados"
      className="bg-blush-soft"
      aria-labelledby="resultados-titulo"
    >
      <div className="grid lg:grid-cols-2">
        {/* Foto com título sobreposto */}
        <div className="relative min-h-[26rem] lg:min-h-[34rem]">
          {/* O <Media> define a própria posição, então ele precisa de um pai
              dimensionado em vez de receber `absolute` por className. */}
          <div className="absolute inset-0">
            <Media
              id="resultados-trio"
              className="h-full w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-cream/75 via-cream/20 to-transparent" />
          <Reveal className="absolute bottom-10 left-6 max-w-xs md:left-10 md:bottom-14">
            <h2
              id="resultados-titulo"
              className="display text-4xl leading-[0.95] sm:text-5xl"
            >
              Pele real.
              <br />
              Resultados
              <br />
              reais.
            </h2>
            <div className="eyebrow mt-6 leading-[1.9] text-espresso/70">
              <p>Mesma rotina</p>
              <p>Mais vida</p>
            </div>
          </Reveal>
        </div>

        {/* Marcos de resultado */}
        <div className="flex flex-col justify-center px-6 py-14 md:px-12 md:py-20 lg:px-16">
          <ul>
            {resultMilestones.map((milestone, index) => (
              <Reveal
                as="li"
                key={milestone.period}
                delay={index * 0.1}
                className={`grid gap-4 py-7 sm:grid-cols-[9.5rem_1fr] sm:gap-8 ${
                  index > 0 ? "border-t border-espresso/12" : ""
                }`}
              >
                <p className="display whitespace-nowrap text-2xl sm:text-[1.75rem]">
                  {milestone.period}
                </p>
                <div>
                  <p className="text-sm text-espresso/85">{milestone.headline}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-espresso/70">
                    <CountUp value={milestone.stat} /> {milestone.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <p className="mt-8 border-t border-espresso/12 pt-6 text-[0.6875rem] leading-relaxed text-espresso/45">
            {resultsFootnote}
          </p>
        </div>
      </div>
    </section>
  );
}
