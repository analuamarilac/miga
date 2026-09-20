import type { ProductImageId } from "./product-images";

export type SkinTag = "oleosa" | "seca" | "sensivel" | "mista";

export type QuizOption = { label: string; tag: SkinTag };

export type QuizQuestion = { id: string; prompt: string; options: QuizOption[] };

export const quizQuestions: QuizQuestion[] = [
  {
    id: "estado",
    prompt: "Como está sua pele hoje?",
    options: [
      { label: "Mais oleosa que o normal", tag: "oleosa" },
      { label: "Equilibrada", tag: "mista" },
      { label: "Mais seca que o normal", tag: "seca" },
    ],
  },
  {
    id: "incomodo",
    prompt: "O que mais te incomoda?",
    options: [
      { label: "Brilho e poros aparentes", tag: "oleosa" },
      { label: "Marquinhas e tom desigual", tag: "mista" },
      { label: "Repuxo e descamação", tag: "seca" },
      { label: "Vermelhidão e ardência", tag: "sensivel" },
    ],
  },
  {
    id: "rotina",
    prompt: "Como é a sua rotina hoje?",
    options: [
      { label: "Ainda não tenho uma", tag: "sensivel" },
      { label: "Só lavo o rosto", tag: "oleosa" },
      { label: "Tenho o básico montado", tag: "mista" },
      { label: "Rotina completa, manhã e noite", tag: "seca" },
    ],
  },
  {
    id: "tempo",
    prompt: "Quanto tempo você tem de manhã?",
    options: [
      { label: "Menos de 2 minutos", tag: "oleosa" },
      { label: "Uns 5 minutos", tag: "mista" },
      { label: "O tempo que a minha pele precisar", tag: "seca" },
    ],
  },
  {
    id: "desejo",
    prompt: "O que você quer sentir daqui a 3 meses?",
    options: [
      { label: "A pele mais equilibrada", tag: "oleosa" },
      { label: "Textura mais uniforme", tag: "mista" },
      { label: "Conforto e maciez o dia todo", tag: "seca" },
      { label: "Menos sensibilidade", tag: "sensivel" },
    ],
  },
];

export type QuizResult = {
  tag: SkinTag;
  title: string;
  description: string;
  productIds: ProductImageId[];
};

export const quizResults: Record<SkinTag, QuizResult> = {
  oleosa: {
    tag: "oleosa",
    title: "Rotina Equilíbrio",
    description:
      "Sua pele pede limpeza que controla o brilho sem agredir. Comece leve e vá firme na constância.",
    productIds: ["gel-de-limpeza-equilibrio", "serum-niacinamida"],
  },
  mista: {
    tag: "mista",
    title: "Rotina Uniforme",
    description:
      "Sua pele está pedindo consistência e um ativo certeiro para emparelhar o tom ao longo das semanas.",
    productIds: ["tonico-suave", "serum-niacinamida", "creme-hidratante"],
  },
  seca: {
    tag: "seca",
    title: "Rotina Conforto",
    description:
      "O foco aqui é devolver água e selar hidratação. Camadas leves funcionam melhor que uma pesada.",
    productIds: ["tonico-suave", "creme-hidratante"],
  },
  sensivel: {
    tag: "sensivel",
    title: "Rotina Calma",
    description:
      "Menos passos, mais cuidado. Vamos fortalecer a barreira antes de introduzir qualquer ativo forte.",
    productIds: ["gel-de-limpeza-equilibrio", "creme-hidratante"],
  },
};
