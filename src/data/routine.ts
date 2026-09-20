import type { ShotKind } from "./products";

export type RoutineStep = {
  order: string;
  title: string;
  description: string;
  shot: ShotKind;
  label: { title: string[]; caption: string[] };
  productId: string;
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
        order: "01",
        title: "Limpar",
        description: "Remove impurezas sem ressecar.",
        shot: "pump",
        label: {
          title: ["Gel de limpeza", "Equilíbrio"],
          caption: ["limpa sem ressecar", "200 ml"],
        },
        productId: "gel-limpeza-equilibrio",
      },
      {
        order: "02",
        title: "Hidratar",
        description: "Devolve a água e fortalece a pele.",
        shot: "dropper",
        label: {
          title: ["Sérum", "Niacinamida 5%"],
          caption: ["uniformiza", "30 ml"],
        },
        productId: "serum-niacinamida",
      },
      {
        order: "03",
        title: "Proteger",
        description: "Protege hoje e o seu amanhã.",
        shot: "tube",
        label: {
          title: ["Protetor solar", "FPS 50"],
          caption: ["toque seco", "50 g"],
        },
        productId: "protetor-solar",
      },
    ],
  },
  {
    id: "noite",
    label: "Noite",
    steps: [
      {
        order: "01",
        title: "Limpar",
        description: "Tira o dia da pele com delicadeza.",
        shot: "pump",
        label: {
          title: ["Gel de limpeza", "Equilíbrio"],
          caption: ["limpa sem ressecar", "200 ml"],
        },
        productId: "gel-limpeza-equilibrio",
      },
      {
        order: "02",
        title: "Tratar",
        description: "Ativos trabalhando enquanto você dorme.",
        shot: "toner",
        label: {
          title: ["Tônico suave", "Hidrata e prepara"],
          caption: ["panthenol", "150 ml"],
        },
        productId: "tonico-suave",
      },
      {
        order: "03",
        title: "Selar",
        description: "Fecha a rotina e repara a barreira.",
        shot: "jar",
        label: {
          title: ["Creme hidratante", "Barreira saudável"],
          caption: ["ceramidas", "50 g"],
        },
        productId: "creme-hidratante",
      },
    ],
  },
];
