"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Close, ImageIcon, Lock } from "@/components/art/Icons";

const intents = [
  { label: "Quero começar", tone: "bg-blush/85 hover:bg-blush" },
  { label: "Simplificar minha rotina", tone: "bg-sky/85 hover:bg-sky" },
  { label: "Entender minha pele", tone: "bg-butter/80 hover:bg-butter" },
];

function irParaOQuiz() {
  document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Card de entrada do hero: anexar uma foto (opcional) ou escolher uma intenção,
 * e seguir para o Match da Pele. A foto não sai do navegador — é só a demonstração
 * do fluxo, este estudo de caso não tem back-end.
 */
export function HeroForm() {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<string | null>(null);
  const [anexo, setAnexo] = useState<{ name: string; url: string } | null>(null);
  const [intent, setIntent] = useState<string | null>(null);

  // A URL do objeto é criada na seleção, não num efeito, para não encadear renders.
  const selecionar = (file: File | null) => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = file ? URL.createObjectURL(file) : null;
    setAnexo(file && urlRef.current ? { name: file.name, url: urlRef.current } : null);
  };

  // Libera a última URL ao desmontar.
  useEffect(
    () => () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  const limpar = () => {
    selecionar(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="glass-strong w-full rounded-[22px] p-5 sm:p-6">
      <h2 className="display text-[1.6rem] leading-tight sm:text-[1.75rem]">
        Vamos entender sua pele?
      </h2>
      <p className="mt-1.5 text-xs text-espresso/70 sm:text-[0.8125rem]">
        Envie uma foto ou responda algumas perguntas.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-[1.1fr_1fr]">
        {/* Anexo */}
        <div>
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => selecionar(event.target.files?.[0] ?? null)}
          />

          <AnimatePresence mode="wait" initial={false}>
            {anexo ? (
              <motion.div
                key="anexo"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex h-full items-center gap-3 rounded-2xl border border-espresso/20 bg-white/55 px-3 py-3"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={anexo.url}
                  alt="Pré-visualização da foto enviada"
                  className="h-11 w-11 shrink-0 rounded-lg object-cover"
                />
                <span className="min-w-0 flex-1 truncate text-xs text-espresso/80">
                  {anexo.name}
                </span>
                <button
                  type="button"
                  onClick={limpar}
                  aria-label="Remover foto"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-espresso/60 transition hover:bg-espresso/10 hover:text-espresso"
                >
                  <Close className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            ) : (
              <motion.label
                key="vazio"
                htmlFor={inputId}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex h-full cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-espresso/35 px-4 py-3.5 transition-colors hover:border-espresso/60 hover:bg-white/35"
              >
                <ImageIcon className="h-5 w-5 shrink-0 text-espresso/70" />
                <span>
                  <span className="block text-[0.8125rem] text-espresso">
                    Adicionar uma foto
                  </span>
                  <span className="block text-[0.6875rem] text-espresso/55">
                    JPG ou PNG
                  </span>
                </span>
              </motion.label>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={irParaOQuiz}
          className="group flex items-center justify-center gap-3 rounded-2xl bg-espresso px-5 py-4 text-[0.8125rem] text-cream transition-all duration-300 hover:bg-espresso-soft hover:shadow-[0_12px_28px_-14px_rgba(56,27,26,0.9)]"
        >
          Começar meu teste
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Intenções */}
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Por onde começar">
        {intents.map((option) => {
          const selecionado = intent === option.label;
          return (
            <button
              key={option.label}
              type="button"
              aria-pressed={selecionado}
              onClick={() => setIntent(selecionado ? null : option.label)}
              className={`rounded-full px-3 py-2 text-[0.6875rem] text-espresso transition-all duration-300 sm:px-4 sm:py-2.5 sm:text-xs ${option.tone} ${
                selecionado
                  ? "ring-2 ring-espresso/70 ring-offset-1 ring-offset-transparent"
                  : ""
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-espresso/12 pt-4">
        <p className="flex items-center gap-2 text-[0.6875rem] text-espresso/60">
          <Lock className="h-3.5 w-3.5 shrink-0" />
          Sua foto é usada apenas nesta análise.
        </p>
        <button
          type="button"
          onClick={irParaOQuiz}
          className="text-[0.6875rem] text-espresso underline underline-offset-4 transition hover:opacity-70"
        >
          Prefiro continuar sem foto
        </button>
      </div>
    </div>
  );
}
