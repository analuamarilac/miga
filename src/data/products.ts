import type { ProductImageId } from "./product-images";

export type Product = {
  /** Também é a chave do render em `product-images.ts`. */
  id: ProductImageId;
  name: string;
  claim: string;
  price: number;
  rating: number;
  reviews: number;
  size: string;
  badge?: string;
};

/** Os quatro da grade principal, na ordem do mockup. */
export const products: Product[] = [
  {
    id: "gel-de-limpeza-equilibrio",
    name: "Gel de Limpeza Equilíbrio",
    claim: "Limpa sem ressecar",
    price: 89.9,
    rating: 4.5,
    reviews: 328,
    size: "200 ml",
    badge: "Mais vendido",
  },
  {
    id: "tonico-suave",
    name: "Tônico Suave",
    claim: "Hidrata e prepara",
    price: 79.9,
    rating: 4.5,
    reviews: 241,
    size: "150 ml",
  },
  {
    id: "serum-niacinamida",
    name: "Sérum Niacinamida 5%",
    claim: "Uniformiza e fortalece",
    price: 99.9,
    rating: 5,
    reviews: 412,
    size: "30 ml",
  },
  {
    id: "creme-hidratante",
    name: "Creme Hidratante",
    claim: "Barreira saudável",
    price: 99.9,
    rating: 4.5,
    reviews: 287,
    size: "50 g",
  },
];

/**
 * Lançamentos. Ficam numa faixa própria porque os renders são horizontais
 * (embalagem + elementos soltos) e não encaixam na grade de frascos verticais.
 * Contagem de avaliações mais baixa que a do catálogo, coerente com produto novo.
 */
export const novelties: Product[] = [
  {
    id: "adesivos-sem-climao",
    name: "Adesivos Sem Climão",
    claim: "Protege e cuida",
    price: 64.9,
    rating: 4.5,
    reviews: 218,
    size: "36 unidades",
    badge: "Novo",
  },
  {
    id: "petalas-para-os-olhos",
    name: "Pétalas para os Olhos",
    claim: "Hidrata e refresca",
    price: 84.9,
    rating: 5,
    reviews: 176,
    size: "30 pares",
    badge: "Novo",
  },
];

export const allProducts: Product[] = [...products, ...novelties];

export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
