export type ShotKind = "pump" | "toner" | "dropper" | "jar" | "tube";

export type Product = {
  id: string;
  name: string;
  claim: string;
  price: number;
  rating: number;
  reviews: number;
  size: string;
  badge?: string;
  shot: ShotKind;
  /** Rótulo impresso na arte SVG do frasco */
  label: { title: string[]; caption: string[] };
  accent: string;
};

export const products: Product[] = [
  {
    id: "gel-limpeza-equilibrio",
    name: "Gel de Limpeza Equilíbrio",
    claim: "Limpa sem ressecar",
    price: 89.9,
    rating: 4.5,
    reviews: 328,
    size: "200 ml",
    badge: "Mais vendido",
    shot: "pump",
    label: {
      title: ["Gel de limpeza", "Equilíbrio"],
      caption: ["limpa sem ressecar", "pele real, todo dia"],
    },
    accent: "#f2e7dd",
  },
  {
    id: "tonico-suave",
    name: "Tônico Suave",
    claim: "Hidrata e prepara",
    price: 79.9,
    rating: 4.5,
    reviews: 241,
    size: "150 ml",
    shot: "toner",
    label: {
      title: ["Tônico suave", "Hidrata e prepara"],
      caption: ["panthenol", "aloe vera"],
    },
    accent: "#f8c9d8",
  },
  {
    id: "serum-niacinamida",
    name: "Sérum Niacinamida 5%",
    claim: "Uniformiza e fortalece",
    price: 99.9,
    rating: 5,
    reviews: 412,
    size: "30 ml",
    shot: "dropper",
    label: {
      title: ["Sérum", "Niacinamida 5%"],
      caption: ["uniformiza", "fortalece"],
    },
    accent: "#f6ece0",
  },
  {
    id: "creme-hidratante",
    name: "Creme Hidratante",
    claim: "Barreira saudável",
    price: 99.9,
    rating: 4.5,
    reviews: 287,
    size: "50 g",
    shot: "jar",
    label: {
      title: ["Creme hidratante", "Barreira saudável"],
      caption: ["ceramidas + pantenol"],
    },
    accent: "#f3f0ea",
  },
];

export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
