import type { ProductImageId } from "./product-images";

export type RoutineStep = {
  title: string;
  description: string;
  /** Produto ilustrado no passo — também é a chave do render. */
  productId: ProductImageId;
};

export type RoutinePeriod = {
  id: "manha" | "noite";
  label: string;
  steps: RoutineStep[];
};

export const routine: RoutinePeriod[] = [
  {
    id: "manha",
    label: "Manhã",
    steps: [
      {
        title: "Limpar",
        description: "Remove impurezas sem ressecar.",
        productId: "gel-de-limpeza-equilibrio",
      },
      {
        title: "Hidratar",
        description: "Devolve a água e fortalece a pele.",
        productId: "serum-niacinamida",
      },
      {
        title: "Proteger",
        description: "Sela a rotina e protege a barreira.",
        productId: "creme-hidratante",
      },
    ],
  },
  {
    id: "noite",
    label: "Noite",
    steps: [
      {
        title: "Limpar",
        description: "Tira o dia da pele com delicadeza.",
        productId: "gel-de-limpeza-equilibrio",
      },
      {
        title: "Tratar",
        description: "Ativos trabalhando enquanto você dorme.",
        productId: "tonico-suave",
      },
      {
        title: "Descansar",
        description: "Pétalas geladas para o olhar acordar melhor.",
        productId: "petalas-para-os-olhos",
      },
    ],
  },
];
