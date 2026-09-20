"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Close, ImageIcon, Lock } from "@/components/art/Icons";

function irParaOQuiz() {
  document.getElementById("quiz")?.scrollIntoView({ behavior: "smooth" });
}

/**
 * Card de entrada do hero: anexar uma foto (opcional) e seguir para o teste.
 * A foto não sai do navegador — é a demonstração do fluxo, sem back-end.
 */
export function HeroForm() {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<string | null>(null);
  const [anexo, setAnexo] = useState<{ name: string; url: string } | null>(null);

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
      <h2 className="display text-[1.5rem] leading-tight sm:text-[1.625rem]">
        Vamos entender sua pele?
      </h2>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-[1fr_auto]">
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
              className="flex items-center gap-3 rounded-2xl border border-espresso/20 bg-white/55 px-3 py-2.5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={anexo.url}
                alt="Pré-visualização da foto enviada"
                className="h-9 w-9 shrink-0 rounded-lg object-cover"
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
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-espresso/35 px-4 py-3 transition-colors hover:border-espresso/60 hover:bg-white/35"
            >
              <ImageIcon className="h-5 w-5 shrink-0 text-espresso/70" />
              <span className="text-[0.8125rem] text-espresso">Adicionar uma foto</span>
            </motion.label>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={irParaOQuiz}
          className="group flex items-center justify-center gap-2.5 whitespace-nowrap rounded-2xl bg-espresso px-6 py-3 text-[0.8125rem] text-cream transition-all duration-300 hover:bg-espresso-soft hover:shadow-[0_12px_28px_-14px_rgba(56,27,26,0.9)]"
        >
          Fazer meu teste
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
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
