"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Sticker } from "@/components/art/Sticker";
import { Clock, ImageIcon, Sparkle } from "@/components/art/Icons";
import { Navbar } from "@/components/layout/Navbar";
import { HeroForm } from "@/components/sections/HeroForm";

const benefits = [
  {
    Icon: ImageIcon,
    title: "Leitura visual + perguntas",
    description: "Uma análise completa e prática.",
  },
  {
    Icon: Clock,
    title: "Recomendação em poucos minutos",
    description: "Mais clareza para sua rotina.",
  },
  {
    Icon: Sparkle,
    title: "Rotina simples e personalizada",
    description: "Cuidados que fazem sentido para você.",
  },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="topo" className="relative bg-cream p-3 md:p-4" aria-label="Destaque">
      <div className="relative overflow-hidden rounded-[26px] md:rounded-[32px]">
        <Image
          src="/hero/amigas-banheiro.webp"
          alt="Duas amigas juntas no banheiro; uma delas segura o Creme Hidratante Miga e a outra tem creme aplicado na bochecha"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_22%] md:object-center"
        />

        {/* Escurecimento para o texto branco ter contraste sobre a foto */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-espresso/25 via-espresso/50 to-espresso/60 md:bg-gradient-to-r md:from-espresso/60 md:via-espresso/18 md:to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-espresso/45 to-transparent"
          aria-hidden="true"
        />

        <Navbar />

        <div className="relative z-10 flex min-h-[42rem] flex-col px-5 pb-5 pt-24 sm:min-h-[44rem] md:px-8 md:pb-7 md:pt-24 lg:min-h-[min(100vh-5.5rem,52rem)] lg:px-12 xl:px-14">
          <div className="mt-auto max-w-2xl">
            <motion.p
              {...rise(0.05)}
              className="eyebrow text-cream/85"
            >
              Pele real. Rotina possível.
            </motion.p>

            <motion.h1
              {...rise(0.15)}
              className="display mt-4 text-[2.75rem] leading-[0.94] text-cream sm:text-[3.5rem] lg:text-[3.75rem] xl:text-[4.25rem]"
            >
              Sua pele.
              <br />
              Sua rotina.
              <br />
              <span className="text-bubblegum">Do seu jeito.</span>
            </motion.h1>

            <motion.p
              {...rise(0.28)}
              className="mt-5 max-w-md text-sm leading-relaxed text-cream/85 md:text-[0.9375rem]"
            >
              Uma rotina simples começa por entender como sua pele está hoje.
            </motion.p>

            <motion.div {...rise(0.4)} className="mt-6 max-w-xl">
              <HeroForm />
            </motion.div>
          </div>

          {/* Rodapé do hero */}
          <motion.div
            {...rise(0.55)}
            className="mt-6 flex items-end gap-6"
          >
            <ul className="glass grid flex-1 gap-4 rounded-[22px] px-6 py-4 sm:grid-cols-3 sm:gap-0">
              {benefits.map(({ Icon, title, description }, index) => (
                <li
                  key={title}
                  className={`flex items-center gap-3.5 sm:px-6 ${
                    index > 0 ? "sm:border-l sm:border-espresso/15" : "sm:pl-0"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0 text-espresso" />
                  <div>
                    <p className="text-[0.8125rem] leading-snug text-espresso">{title}</p>
                    <p className="mt-0.5 text-[0.6875rem] text-espresso/60">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="hidden shrink-0 -rotate-6 pb-1 pr-1 font-[family-name:var(--font-script)] text-2xl leading-[1.1] text-cream/90 xl:block">
              rotina
              <br />
              real
              <br />
              entre
              <br />
              amigas ♡
            </p>
          </motion.div>
        </div>
      </div>

      {/* Adesivos flutuantes — os mesmos do Sem Climão, recortados do render.
          Ficam nas bordas, fora da faixa da navbar e do texto. */}
      <Sticker
        id="flor"
        className="-left-4 top-[22%] z-30 w-16 md:-left-5 md:w-24"
        rotate={-12}
        duration={9}
      />
      <Sticker
        id="estrela"
        className="right-[3%] top-[60%] z-30 w-12 md:right-[4%] md:w-20"
        rotate={8}
        duration={7.5}
        delay={0.8}
      />
      <Sticker
        id="circulo"
        className="-right-3 bottom-[14%] z-30 w-12 md:-right-4 md:w-20"
        rotate={-6}
        duration={8.5}
        delay={1.4}
      />
      <Sticker
        id="lua"
        className="-left-5 bottom-[8%] z-30 hidden w-16 xl:block"
        rotate={14}
        duration={8}
        delay={0.4}
      />
    </section>
  );
}
