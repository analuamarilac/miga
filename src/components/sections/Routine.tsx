"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ArrowRight, Moon, Sun } from "@/components/art/Icons";
import { ProductShot } from "@/components/art/ProductShot";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { routine } from "@/data/routine";

export function Routine() {
  const [periodIndex, setPeriodIndex] = useState(0);
  const period = routine[periodIndex];
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="rotina"
      className="stripes-sky grain relative overflow-hidden"
      aria-labelledby="rotina-titulo"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16 xl:grid-cols-[minmax(0,24rem)_1fr_auto]">
          {/* Texto */}
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-espresso/60">
              Rotina simples
              <span className="h-px w-5 bg-espresso/40" />
            </p>
            <h2
              id="rotina-titulo"
              className="display mt-5 text-4xl sm:text-5xl lg:text-[3.25rem]"
            >
              Uma rotina.
              <br />
              Três passos.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-espresso/75">
              Tudo o que sua pele precisa, sem complicação. Comece com o essencial e
              construa o seu ritual.
            </p>
            <LinkButton href="#produtos" withArrow className="mt-8">
              Montar minha rotina
            </LinkButton>
          </Reveal>

          {/* Passos */}
          <div>
            {/* Alternador manhã / noite */}
            <Reveal className="flex justify-center lg:justify-start">
              <div
                role="tablist"
                aria-label="Período da rotina"
                className="relative flex rounded-full border border-espresso/12 bg-cream/85 p-1 backdrop-blur-sm"
              >
                {routine.map((option, index) => {
                  const active = index === periodIndex;
                  const Icon = option.id === "manha" ? Sun : Moon;
                  return (
                    <button
                      key={option.id}
                      role="tab"
                      type="button"
                      aria-selected={active}
                      aria-controls={`passos-${option.id}`}
                      onClick={() => setPeriodIndex(index)}
                      className="relative z-10 flex items-center gap-2 rounded-full px-6 py-2.5 transition-colors duration-300"
                    >
                      {active && (
                        <motion.span
                          layoutId="routine-pill"
                          transition={
                            reduceMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 380, damping: 32 }
                          }
                          className="absolute inset-0 -z-10 rounded-full bg-butter"
                        />
                      )}
                      <Icon className="h-4 w-4" />
                      <span className="eyebrow">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.ol
                key={period.id}
                id={`passos-${period.id}`}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-0"
              >
                {period.steps.map((step, index) => (
                  <li
                    key={step.order}
                    className={`group flex flex-col items-center px-4 text-center sm:px-6 ${
                      index > 0 ? "sm:border-l sm:border-espresso/12" : ""
                    }`}
                  >
                    <p className="eyebrow text-espresso">
                      {index + 1}. {step.title}
                    </p>

                    <ProductShot
                      kind={step.shot}
                      label={step.label}
                      accent="#f5ece2"
                      className="mt-6 h-52 w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 md:h-60"
                    />

                    <p className="mt-6 max-w-[16rem] text-xs leading-relaxed text-espresso/75">
                      {step.description}
                    </p>

                    <a
                      href="#produtos"
                      aria-label={`Ver produto do passo ${step.title}`}
                      className="mt-4 inline-flex text-espresso/60 transition hover:translate-x-1 hover:text-espresso"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </motion.ol>
            </AnimatePresence>
          </div>

          {/* Nota lateral */}
          <div className="eyebrow hidden self-start border-l border-espresso/15 pl-6 leading-[1.9] text-espresso/55 xl:block">
            <p>Rotina</p>
            <p>possível</p>
            <p>todo dia</p>
            <span className="mt-3 block h-px w-6 bg-espresso/40" />
          </div>
        </div>
      </div>
    </section>
  );
}
