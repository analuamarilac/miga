"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  CircleBlob,
  DropBlob,
  Float,
  FlowerBlob,
  SparkleBlob,
} from "@/components/art/Blobs";
import { ProductShot } from "@/components/art/ProductShot";
import { LinkButton } from "@/components/ui/Button";

const heroBottle = {
  title: ["Gel de limpeza", "Equilíbrio"],
  caption: ["limpa sem ressecar", "pele real, todo dia"],
};

/** Texto vertical das bordas — decorativo, some em telas pequenas. */
function EdgeNote({
  lines,
  className,
  align = "left",
}: {
  lines: string[];
  className: string;
  align?: "left" | "right";
}) {
  return (
    <div className={`eyebrow hidden text-espresso/55 xl:block ${className}`}>
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
      <span
        className={`mt-3 block h-px w-6 bg-espresso/40 ${align === "right" ? "ml-auto" : ""}`}
      />
    </div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="topo"
      className="stripes-sky grain relative overflow-hidden"
      aria-label="Destaque"
    >
      {/* Camada decorativa.
          No mobile o hero empilha texto e frasco, então as formas ficam
          concentradas na metade de baixo para não disputar com o título. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Float
          className="absolute left-[6%] top-[62%] w-10 lg:top-[14%] lg:w-14"
          duration={8}
        >
          <DropBlob className="w-full opacity-70" />
        </Float>
        <Float
          className="absolute left-[28%] top-[8%] hidden w-8 lg:block lg:w-12"
          duration={9}
          delay={1.2}
        >
          <DropBlob className="w-full opacity-60" tone="#f4f9ff" />
        </Float>
        <Float
          className="absolute bottom-[8%] left-[12%] w-7 lg:bottom-[18%] lg:left-[16%] lg:w-10"
          duration={7}
          delay={0.6}
        >
          <DropBlob className="w-full opacity-50" />
        </Float>
        <Float
          className="absolute left-[8%] top-[52%] w-10 lg:left-[20%] lg:w-16"
          duration={6.5}
          delay={0.3}
        >
          <SparkleBlob className="w-full" />
        </Float>
        <Float
          className="absolute right-[6%] top-[58%] w-20 lg:right-[12%] lg:top-[16%] lg:w-32"
          duration={9}
        >
          <FlowerBlob className="w-full" />
        </Float>
        <Float
          className="absolute right-[10%] top-[80%] w-12 lg:right-[4%] lg:top-[30%] lg:w-20"
          duration={8}
          delay={0.8}
        >
          <CircleBlob className="w-full" tone="#f4e4a8" />
        </Float>
        <Float
          className="absolute bottom-[20%] right-[16%] w-12 lg:bottom-[26%] lg:w-20"
          duration={7.5}
          delay={1.5}
        >
          <CircleBlob className="w-full" tone="#f7cedd" />
        </Float>
        <Float
          className="absolute bottom-[4%] right-[6%] w-10 lg:bottom-[12%] lg:w-14"
          duration={8.5}
          delay={0.4}
        >
          <DropBlob className="w-full opacity-70" />
        </Float>
      </div>

      <div className="relative mx-auto flex max-w-[1600px] flex-col px-5 py-14 md:px-10 md:py-20 lg:min-h-[calc(100vh-7rem)] lg:justify-center lg:py-24">
        {/* Frasco grande à esquerda (desktop) */}
        <motion.div
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, x: -40, rotate: -14 },
                animate: { opacity: 1, x: 0, rotate: -8 },
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
              })}
          className="pointer-events-none absolute -left-10 top-1/2 hidden w-[19rem] -translate-y-1/2 lg:block xl:left-4 xl:w-[21rem]"
          aria-hidden="true"
        >
          <ProductShot
            kind="pump"
            label={heroBottle}
            accent="#f4ece3"
            className="w-full drop-shadow-[0_24px_40px_rgba(56,27,26,0.12)]"
          />
        </motion.div>

        <EdgeNote
          lines={["Skincare", "de verdade", "entre amigas", "sempre."]}
          className="absolute bottom-16 left-10"
        />
        <EdgeNote
          lines={["Cuidar", "compartilhar", "evoluir,", "juntas."]}
          className="absolute bottom-16 right-10 text-right"
          align="right"
        />

        {/* Coluna central */}
        <div className="relative mx-auto max-w-2xl text-center">
          <motion.p {...rise(0.05)} className="eyebrow text-espresso/70">
            Pele real,
            <br />
            rotina possível.
          </motion.p>

          <motion.h1
            {...rise(0.15)}
            className="display mt-7 text-[2.75rem] leading-[0.95] sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          >
            Skincare para uma pele{" "}
            <span className="relative whitespace-nowrap">
              mais sua.
              <span
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-rose md:-bottom-2"
                aria-hidden="true"
              />
            </span>
            <motion.span
              aria-hidden="true"
              className="ml-2 inline-block h-[0.85em] w-[3px] translate-y-[0.08em] bg-rose align-middle"
              animate={reduceMotion ? {} : { opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            />
          </motion.h1>

          <motion.p
            {...rise(0.3)}
            className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-espresso/75 md:text-[0.9375rem]"
          >
            Rotinas simples, fórmulas eficazes e zero pressão para ter uma pele
            possível todo dia.
          </motion.p>

          <motion.div
            {...rise(0.42)}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <LinkButton href="#quiz" withArrow className="w-full sm:w-auto">
              Descobrir minha rotina
            </LinkButton>
            <LinkButton
              href="#produtos"
              variant="outline"
              className="w-full bg-cream/60 sm:w-auto"
            >
              Conhecer os produtos
            </LinkButton>
          </motion.div>
        </div>

        {/* Frasco no mobile */}
        <motion.div
          {...rise(0.5)}
          className="mt-14 flex justify-center lg:hidden"
          aria-hidden="true"
        >
          <ProductShot
            kind="pump"
            label={heroBottle}
            accent="#f4ece3"
            className="w-44 -rotate-6 drop-shadow-[0_20px_34px_rgba(56,27,26,0.14)] sm:w-52"
          />
        </motion.div>
      </div>
    </section>
  );
}
