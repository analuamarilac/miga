"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, Close, ImageIcon, Sparkle } from "@/components/art/Icons";
import { Sticker } from "@/components/art/Sticker";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { allProducts } from "@/data/products";
import { quizQuestions, quizResults, type SkinTag } from "@/data/quiz";
import { stickers } from "@/data/stickers";
import { useCart } from "@/lib/cart";

const LETRAS = ["a", "b", "c", "d"] as const;

/** Elege o perfil mais escolhido; empate resolve pela resposta mais recente. */
function resolverPerfil(respostas: SkinTag[]): SkinTag {
  const contagem = new Map<SkinTag, number>();
  respostas.forEach((tag) => contagem.set(tag, (contagem.get(tag) ?? 0) + 1));

  let vencedor = respostas[respostas.length - 1];
  let melhor = -1;
  contagem.forEach((pontos, tag) => {
    if (pontos > melhor) {
      melhor = pontos;
      vencedor = tag;
    }
  });
  return vencedor;
}

/** Estrelinhas que vão acendendo — a barra de progresso do teste. */
function Progresso({ total, feitas }: { total: number; feitas: number }) {
  return (
    <div
      className="flex items-center gap-1.5"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={feitas}
      aria-label="Progresso do teste"
    >
      {Array.from({ length: total }, (_, i) => (
        <Sparkle
          key={i}
          className={`h-4 w-4 transition-all duration-500 ${
            i < feitas ? "scale-110 text-bubblegum" : "text-espresso/20"
          }`}
        />
      ))}
    </div>
  );
}

/** Tela inicial: anexar uma foto (opcional) e começar. */
function Abertura({ onStart }: { onStart: () => void }) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<string | null>(null);
  const [anexo, setAnexo] = useState<{ name: string; url: string } | null>(null);

  const selecionar = (file: File | null) => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = file ? URL.createObjectURL(file) : null;
    setAnexo(file && urlRef.current ? { name: file.name, url: urlRef.current } : null);
  };

  useEffect(
    () => () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  return (
    <div>
      <p className="eyebrow text-espresso/55">5 perguntas · 2 minutinhos</p>
      <h3 className="display mt-3 text-[1.75rem] leading-tight sm:text-3xl">
        Bora descobrir o seu tipo de rotina?
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-espresso/70">
        Anexe uma foto para a gente olhar junto — ou pule essa parte e responda só as
        perguntas. Vale tudo, miga.
      </p>

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
            className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-espresso/15 bg-white/70 px-3 py-2.5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={anexo.url}
              alt="Pré-visualização da foto enviada"
              className="h-10 w-10 shrink-0 rounded-xl object-cover"
            />
            <span className="min-w-0 flex-1 truncate text-xs text-espresso/80">
              {anexo.name}
            </span>
            <button
              type="button"
              onClick={() => {
                selecionar(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
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
            className="mt-6 flex cursor-pointer items-center gap-3 rounded-2xl border-2 border-dashed border-espresso/25 px-4 py-3.5 transition-colors hover:border-espresso/50 hover:bg-white/50"
          >
            <ImageIcon className="h-5 w-5 shrink-0 text-espresso/70" />
            <span className="text-[0.8125rem] text-espresso">
              Adicionar uma foto
              <span className="ml-1.5 text-espresso/45">(opcional)</span>
            </span>
          </motion.label>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={onStart}
        className="group mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-espresso px-6 py-4 text-[0.875rem] text-cream transition-all duration-300 hover:bg-espresso-soft hover:shadow-[0_14px_30px_-14px_rgba(56,27,26,0.9)]"
      >
        Começar o teste
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
}

function Pergunta({
  indice,
  onEscolher,
  onVoltar,
  escolhida,
}: {
  indice: number;
  onEscolher: (tag: SkinTag) => void;
  onVoltar: () => void;
  escolhida?: SkinTag;
}) {
  const pergunta = quizQuestions[indice];

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-espresso/60">
          Pergunta {String(indice + 1).padStart(2, "0")}
          <span className="text-espresso/35">/{quizQuestions.length}</span>
        </p>
        <Progresso total={quizQuestions.length} feitas={indice} />
      </div>

      <h3 className="display mt-4 text-[1.5rem] leading-[1.15] sm:text-[1.75rem]">
        {pergunta.prompt}
      </h3>

      <div className="mt-5 space-y-2.5" role="radiogroup" aria-label={pergunta.prompt}>
        {pergunta.options.map((opcao, i) => {
          const selecionada = escolhida === opcao.tag;
          return (
            <button
              key={opcao.label}
              type="button"
              role="radio"
              aria-checked={selecionada}
              onClick={() => onEscolher(opcao.tag)}
              className={`flex w-full items-center gap-3.5 rounded-2xl border-2 px-3.5 py-3 text-left font-[family-name:var(--font-sans)] text-[0.9375rem] transition-all duration-200 ${
                selecionada
                  ? "-translate-y-0.5 border-espresso bg-white shadow-[0_5px_0_0_var(--color-bubblegum)]"
                  : "border-espresso/12 bg-white/80 hover:-translate-y-0.5 hover:border-bubblegum hover:bg-white hover:shadow-[0_5px_0_0_var(--color-blush)]"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-lg font-bold transition-colors ${
                  selecionada
                    ? "bg-bubblegum text-espresso"
                    : "bg-lilac text-espresso/75"
                }`}
                aria-hidden="true"
              >
                {LETRAS[i]}
              </span>
              {opcao.label}
            </button>
          );
        })}
      </div>

      {indice > 0 && (
        <button
          type="button"
          onClick={onVoltar}
          className="mt-4 text-xs text-espresso/55 underline-offset-4 transition hover:text-espresso hover:underline"
        >
          ← Voltar
        </button>
      )}
    </div>
  );
}

function Resultado({ tag, onRefazer }: { tag: SkinTag; onRefazer: () => void }) {
  const resultado = quizResults[tag];
  const selo = stickers[resultado.badge];
  const { add } = useCart();
  const [adicionado, setAdicionado] = useState(false);

  const produtos = resultado.productIds
    .map((id) => allProducts.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  useEffect(() => {
    if (!adicionado) return;
    const timer = window.setTimeout(() => setAdicionado(false), 2000);
    return () => window.clearTimeout(timer);
  }, [adicionado]);

  return (
    <div className="text-center">
      <p className="eyebrow text-espresso/55">O seu resultado é</p>

      {/* O adesivo é translúcido: ganha um disco colorido atrás para aparecer */}
      <motion.div
        initial={{ scale: 0.6, rotate: -18, opacity: 0 }}
        animate={{ scale: 1, rotate: -6, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
        className="mx-auto mt-4 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-bubblegum via-blush to-lilac shadow-[0_12px_28px_-12px_rgba(56,27,26,0.5)]"
      >
        <Image
          src={selo.src}
          alt=""
          width={selo.width}
          height={selo.height}
          className="h-auto w-[4.5rem] drop-shadow-[0_6px_12px_rgba(56,27,26,0.3)]"
        />
      </motion.div>

      <h3 className="display mt-4 text-[2rem] leading-none sm:text-[2.5rem]">
        {resultado.title}
      </h3>
      <p className="eyebrow mt-2.5 text-bubblegum">{resultado.routine}</p>

      <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-espresso/75">
        {resultado.description}
      </p>

      <ul className="mt-6 space-y-2 text-left">
        {produtos.map((produto) => (
          <li
            key={produto.id}
            className="flex items-center gap-3 rounded-2xl border-2 border-espresso/10 bg-white px-4 py-3"
          >
            <Sparkle className="h-4 w-4 shrink-0 text-bubblegum" />
            <span className="flex-1 text-sm">{produto.name}</span>
            <span className="text-xs text-espresso/55">{produto.size}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => {
          produtos.forEach((produto) =>
            add({ id: produto.id, name: produto.name, price: produto.price }),
          );
          setAdicionado(true);
        }}
        className="mt-5 w-full rounded-2xl bg-espresso px-6 py-4 text-[0.875rem] text-cream transition-all duration-300 hover:bg-espresso-soft hover:shadow-[0_14px_30px_-14px_rgba(56,27,26,0.9)]"
      >
        {adicionado ? "Adicionado à sacola ✓" : "Levar a rotina completa"}
      </button>

      <button
        type="button"
        onClick={onRefazer}
        className="mt-3 text-xs text-espresso/60 underline underline-offset-4 transition hover:text-espresso"
      >
        Refazer o teste
      </button>
    </div>
  );
}

export function SkinQuiz() {
  const [etapa, setEtapa] = useState<"abertura" | number | "resultado">("abertura");
  const [respostas, setRespostas] = useState<SkinTag[]>([]);
  const reduceMotion = useReducedMotion();

  const perfil = useMemo(
    () => (etapa === "resultado" ? resolverPerfil(respostas) : null),
    [etapa, respostas],
  );

  const escolher = (indice: number, tag: SkinTag) => {
    const proximas = [...respostas];
    proximas[indice] = tag;
    setRespostas(proximas);

    window.setTimeout(() => {
      setEtapa(indice === quizQuestions.length - 1 ? "resultado" : indice + 1);
    }, 280);
  };

  const transicao = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 22 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -22 },
        transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
      };

  const chaveEtapa =
    etapa === "abertura" ? "abertura" : etapa === "resultado" ? "resultado" : `p${etapa}`;

  return (
    <section
      id="quiz"
      className="relative overflow-hidden bg-lilac"
      aria-labelledby="quiz-titulo"
    >
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-2 lg:gap-14 lg:py-24">
        {/* Imagem */}
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[28px]">
            <Media
              id="quiz-retrato"
              className="aspect-[4/5] w-full lg:aspect-[5/6]"
              sizes="(max-width: 1024px) 92vw, 46vw"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-espresso/55 to-transparent"
              aria-hidden="true"
            />
            <p className="eyebrow absolute inset-x-0 bottom-0 p-6 leading-[1.9] text-cream">
              Mesma pele
              <br />
              mais histórias
              <br />
              mais você
            </p>
          </div>

          {/* Selo girado, no espírito de revista */}
          <div className="absolute left-4 top-4 z-20 -rotate-6 rounded-full bg-bubblegum px-5 py-2.5 shadow-[0_8px_20px_-8px_rgba(56,27,26,0.45)] md:left-5 md:top-5">
            <p className="eyebrow text-espresso">Teste da pele ✦</p>
          </div>

          <Sticker
            id="circulo"
            className="-left-4 bottom-[18%] z-20 w-14 md:w-16"
            rotate={-8}
            duration={8}
          />
          <Sticker
            id="lua"
            className="-right-3 bottom-[6%] z-20 hidden w-14 sm:block"
            rotate={12}
            duration={9}
            delay={1.2}
          />
        </Reveal>

        {/* Teste */}
        <Reveal delay={0.1}>
          <p className="eyebrow flex items-center gap-3 text-espresso/60">
            Match da pele
            <span className="h-px w-5 bg-espresso/40" />
          </p>
          <h2 id="quiz-titulo" className="display mt-4 text-4xl leading-[0.98] sm:text-5xl">
            Qual é a sua
            <br />
            rotina ideal?
          </h2>

          <div className="relative mt-7 overflow-hidden rounded-[28px] border-2 border-espresso/10 bg-gradient-to-br from-white via-white to-blush-soft p-6 shadow-[0_26px_60px_-30px_rgba(56,27,26,0.5)] sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div key={chaveEtapa} {...transicao}>
                {etapa === "abertura" && <Abertura onStart={() => setEtapa(0)} />}

                {typeof etapa === "number" && (
                  <Pergunta
                    indice={etapa}
                    escolhida={respostas[etapa]}
                    onEscolher={(tag) => escolher(etapa, tag)}
                    onVoltar={() => setEtapa(etapa - 1)}
                  />
                )}

                {etapa === "resultado" && perfil && (
                  <Resultado
                    tag={perfil}
                    onRefazer={() => {
                      setRespostas([]);
                      setEtapa("abertura");
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
