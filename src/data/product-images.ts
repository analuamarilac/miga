/**
 * Renders fotográficos das embalagens (PNG recortado → WebP com alpha).
 *
 * Os arquivos vivem em `public/produtos/`. As dimensões são as intrínsecas do
 * arquivo: passe-as para <Image width/height> para o navegador reservar o
 * espaço certo e não haver deslocamento de layout no carregamento.
 *
 * `ratio` é largura/altura — os frascos são verticais (~0,6) e as embalagens
 * com elementos soltos são horizontais (~1,4), então o card precisa de um
 * enquadramento que acomode as duas famílias.
 */
export type ProductImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const productImages = {
  "gel-de-limpeza-equilibrio": {
    src: "/produtos/gel-de-limpeza-equilibrio.webp",
    width: 676,
    height: 1200,
    alt: "Frasco com válvula pump do Gel de Limpeza Equilíbrio Miga, 200 ml",
  },
  "tonico-suave": {
    src: "/produtos/tonico-suave.webp",
    width: 742,
    height: 1200,
    alt: "Garrafa rosa translúcida do Tônico Suave Miga, 150 ml",
  },
  "serum-niacinamida": {
    src: "/produtos/serum-niacinamida.webp",
    width: 813,
    height: 1200,
    alt: "Frasco conta-gotas do Sérum Niacinamida 5% Miga, 30 ml",
  },
  "creme-hidratante": {
    src: "/produtos/creme-hidratante.webp",
    width: 1200,
    height: 1054,
    alt: "Pote de tampa rosa do Creme Hidratante Barreira Saudável Miga, 50 g",
  },
  "adesivos-sem-climao": {
    src: "/produtos/adesivos-sem-climao.webp",
    width: 1200,
    height: 850,
    alt: "Sachê dos adesivos para acne Sem Climão Miga ao lado de adesivos em formato de lua, flor e nuvem",
  },
  "petalas-para-os-olhos": {
    src: "/produtos/petalas-para-os-olhos.webp",
    width: 1200,
    height: 811,
    alt: "Pote das Pétalas para os Olhos Miga com duas pétalas de gel rosa ao lado",
  },
} as const satisfies Record<string, ProductImage>;

export type ProductImageId = keyof typeof productImages;
