"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import { ArrowRight, Check } from "@/components/art/Icons";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/data/products";
import { quizQuestions, quizResults, type SkinTag } from "@/data/quiz";

/** Elege o perfil mais escolhido; empate resolve pela resposta mais recente. */
function resolveProfile(answers: SkinTag[]): SkinTag {
  const tally = new Map<SkinTag, number>();
  answers.forEach((tag) => tally.set(tag, (tally.get(tag) ?? 0) + 1));

  let winner = answers[answers.length - 1];
  let best = -1;
  tally.forEach((score, tag) => {
    if (score > best) {
      best = score;
      winner = tag;
    }
  });
  return winner;
}

function QuizCard() {
  const [answers, setAnswers] = useState<SkinTag[]>([]);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();

  const question = quizQuestions[step];
  const answered = answers[step] !== undefined;
  const progress = done
    ? 1
    : (step + (answered ? 1 : 0)) / quizQuestions.length;

  const result = useMemo(
    () => (done ? quizResults[resolveProfile(answers)] : null),
    [done, answers],
  );

  const choose = (tag: SkinTag) => {
    const next = [...answers];
    next[step] = tag;
    setAnswers(next);

    window.setTimeout(() => {
      if (step === quizQuestions.length - 1) setDone(true);
      else setStep(step + 1);
    }, 260);
  };

  const restart = () => {
    setAnswers([]);
    setStep(0);
    setDone(false);
  };

  const slide = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <div className="rounded-2xl bg-white/85 p-6 shadow-[0_18px_50px_-30px_rgba(56,27,26,0.45)] backdrop-blur-sm sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-espresso/60">
          {done ? "Resultado" : `${step + 1} de ${quizQuestions.length}`}
        </p>
        {step > 0 && !done && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="text-xs text-espresso/55 underline-offset-4 transition hover:text-espresso hover:underline"
          >
            Voltar
          </button>
        )}
      </div>

      <div
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-espresso/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-label="Progresso do quiz"
      >
        <motion.div
          className="h-full rounded-full bg-violet-bar"
          animate={{ width: `${Math.max(progress, 0.08) * 100}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <p className="sr-only" aria-live="polite">
        {done
          ? `Resultado: ${result?.title}`
          : `Pergunta ${step + 1} de ${quizQuestions.length}`}
      </p>

      <AnimatePresence mode="wait">
        {done && result ? (
          <motion.div key="resultado" {...slide} className="mt-7">
            <p className="eyebrow text-violet-bar">Sua rotina ideal</p>
            <h3 className="display mt-2 text-3xl">{result.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-espresso/70">
              {result.description}
            </p>

            <ul className="mt-5 space-y-2">
              {result.productIds.map((id) => {
                const product = products.find((item) => item.id === id);
                if (!product) return null;
                return (
                  <li
                    key={id}
                    className="flex items-center gap-3 rounded-lg bg-lilac/50 px-4 py-3 text-sm"
                  >
                    <Check className="h-4 w-4 shrink-0 text-violet-bar" />
                    <span>{product.name}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button
                withArrow
                onClick={() =>
                  document
                    .getElementById("produtos")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Ver os produtos
              </Button>
              <button
                type="button"
                onClick={restart}
                className="text-xs text-espresso/60 underline underline-offset-4 transition hover:text-espresso"
              >
                Refazer o match
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key={question.id} {...slide} className="mt-7">
            <h3 className="display text-2xl sm:text-[1.75rem]">{question.prompt}</h3>

            <div
              className="mt-5 space-y-3"
              role="radiogroup"
              aria-label={question.prompt}
            >
              {question.options.map((option) => {
                const selected = answers[step] === option.tag;
                return (
                  <button
                    key={option.label}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => choose(option.tag)}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all duration-200 ${
                      selected
                        ? "border-violet-bar bg-lilac/70"
                        : "border-espresso/10 bg-lilac/25 hover:border-violet-bar/60 hover:bg-lilac/50"
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                        selected
                          ? "border-violet-bar bg-violet-bar"
                          : "border-espresso/35"
                      }`}
                    >
                      {selected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    {option.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SkinQuiz() {
  return (
    <section id="quiz" className="relative bg-lilac" aria-labelledby="quiz-titulo">
      <div className="grid lg:grid-cols-[1fr_minmax(0,26rem)]">
        <div className="grid gap-10 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-24">
          <Reveal>
            <p className="eyebrow flex items-center gap-3 text-espresso/60">
              Match da pele
              <span className="h-px w-5 bg-espresso/40" />
            </p>
            <h2
              id="quiz-titulo"
              className="display mt-5 text-4xl sm:text-5xl lg:text-[3.25rem]"
            >
              Como sua pele
              <br />
              está hoje?
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-espresso/70">
              Responda rapidinho e a gente te ajuda a encontrar a rotina ideal para as
              suas necessidades. Não é um diagnóstico, é um ponto de partida entre
              amigas.
            </p>
            <a
              href="#quiz"
              className="group mt-8 inline-flex items-center gap-3 rounded-md bg-espresso px-6 py-3.5 text-[0.8125rem] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-espresso-soft"
            >
              Fazer o Match da Pele
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <p className="eyebrow mt-5 text-espresso/45">Leva menos de 2 minutos</p>
          </Reveal>

          <Reveal delay={0.12}>
            <QuizCard />
          </Reveal>
        </div>

        <div className="relative min-h-[22rem] lg:min-h-full">
          <Media
            id="quiz-retrato"
            className="absolute inset-0"
            sizes="(max-width: 1024px) 100vw, 26rem"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/75 via-espresso/35 to-transparent p-7 pt-28">
            <div className="eyebrow leading-[1.9] text-cream">
              <p>Mesma pele</p>
              <p>Mais rotinas</p>
              <p>Mais histórias</p>
              <p>Mais você</p>
              <span className="mt-3 block h-px w-6 bg-cream/70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
