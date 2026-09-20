import type { ProductImageId } from "./product-images";
import type { StickerId } from "./stickers";

export type SkinTag = "oleosa" | "mista" | "seca" | "sensivel";

export type QuizOption = { label: string; tag: SkinTag };

export type QuizQuestion = { id: string; prompt: string; options: QuizOption[] };

/** Cinco perguntas, quatro alternativas cada — no formato de teste de revista. */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "acordou",
    prompt: "Você acabou de acordar. Como está a sua pele?",
    options: [
      { label: "Brilhando mais do que eu queria", tag: "oleosa" },
      { label: "De boa, nem oleosa nem seca", tag: "mista" },
      { label: "Repuxando desde a primeira olhada", tag: "seca" },
      { label: "Vermelhinha e reclamando", tag: "sensivel" },
    ],
  },
  {
    id: "incomodo",
    prompt: "O que mais te incomoda quando você se olha no espelho?",
    options: [
      { label: "Poros e brilho na zona T", tag: "oleosa" },
      { label: "Marquinhas e tom desigual", tag: "mista" },
      { label: "Ressecamento e descamação", tag: "seca" },
      { label: "Ardência quando uso qualquer coisa", tag: "sensivel" },
    ],
  },
  {
    id: "rotina",
    prompt: "A sua rotina de skincare hoje é mais ou menos assim:",
    options: [
      { label: "Lavo o rosto e tô pronta", tag: "oleosa" },
      { label: "Tenho o básico montado", tag: "mista" },
      { label: "Rotina completa, manhã e noite", tag: "seca" },
      { label: "Ainda estou montando a minha", tag: "sensivel" },
    ],
  },
  {
    id: "tempo",
    prompt: "Quanto tempo você realmente tem de manhã?",
    options: [
      { label: "Menos de 2 minutos, corrida", tag: "oleosa" },
      { label: "Uns 5 minutos, dá pra encaixar", tag: "mista" },
      { label: "O tempo que a minha pele pedir", tag: "seca" },
      { label: "Depende muito do dia", tag: "sensivel" },
    ],
  },
  {
    id: "desejo",
    prompt: "Daqui a três meses, você quer se olhar e pensar:",
    options: [
      { label: '"Minha pele está equilibrada"', tag: "oleosa" },
      { label: '"Que textura uniforme"', tag: "mista" },
      { label: '"Confortável o dia inteiro"', tag: "seca" },
      { label: '"Finalmente parou de arder"', tag: "sensivel" },
    ],
  },
];

export type QuizResult = {
  tag: SkinTag;
  /** Título divertido, no espírito de teste de revista. */
  title: string;
  /** Nome da rotina recomendada. */
  routine: string;
  description: string;
  /** Adesivo que vira o selo do resultado. */
  badge: StickerId;
  productIds: ProductImageId[];
};

export const quizResults: Record<SkinTag, QuizResult> = {
  oleosa: {
    tag: "oleosa",
    title: "Glow sem filtro",
    routine: "Rotina Equilíbrio",
    description:
      "Sua pele produz óleo de sobra — e isso não é defeito, é proteção. O caminho é limpar bem sem agredir e deixar a niacinamida cuidar do resto.",
    badge: "estrela",
    productIds: ["gel-de-limpeza-equilibrio", "serum-niacinamida"],
  },
  mista: {
    tag: "mista",
    title: "Meio-termo esperto",
    routine: "Rotina Uniforme",
    description:
      "Nem muito oleosa, nem muito seca: sua pele pede constância e um ativo certeiro para emparelhar o tom ao longo das semanas.",
    badge: "flor",
    productIds: ["tonico-suave", "serum-niacinamida", "creme-hidratante"],
  },
  seca: {
    tag: "seca",
    title: "Sede de hidratação",
    routine: "Rotina Conforto",
    description:
      "O que falta é água, não óleo. Camadas leves funcionam melhor que uma pesada — e o creme entra no fim para selar tudo.",
    badge: "gota",
    productIds: ["tonico-suave", "creme-hidratante"],
  },
  sensivel: {
    tag: "sensivel",
    title: "Modo delicadeza",
    routine: "Rotina Calma",
    description:
      "Sua barreira está pedindo trégua. Menos passos, fórmulas suaves e nada de ativo forte antes de ela estar fortalecida.",
    badge: "nuvem",
    productIds: ["gel-de-limpeza-equilibrio", "creme-hidratante"],
  },
};
