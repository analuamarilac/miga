/**
 * Registro central de fotografia.
 *
 * Todo slot de foto da landing page vive aqui. Enquanto `src` for `null`,
 * o componente <Media> desenha um placeholder editorial on-brand (gradiente
 * duotone + blob orgânico + grain). Para trocar a foto de qualquer slot,
 * basta apontar `src` para outro arquivo em /public ou uma URL remota —
 * nenhum componente precisa ser alterado.
 *
 * Se usar URL remota, registre o host em next.config.ts › images.remotePatterns.
 */
export type MediaId =
  | "quiz-retrato"
  | "resultados-trio"
  | "clube-trio"
  | "artigo-acne"
  | "artigo-niacinamida"
  | "artigo-ordem"
  | "artigo-barreira"
  | `insta-${1 | 2 | 3 | 4 | 5 | 6 | 7}`;

export type MediaSlot = {
  /** Caminho em /public ou URL remota. `null` => placeholder desenhado. */
  src: string | null;
  alt: string;
  /** Par de cores do placeholder (duotone), usado quando `src` é null. */
  tint: [string, string];
};

export const media: Record<MediaId, MediaSlot> = {
  "quiz-retrato": {
    src: "/fotos/adesivos-no-rosto.webp",
    alt: "Pessoa de cabelo curto com adesivos para acne aplicados no rosto",
    tint: ["#f6dcc8", "#e7b48f"],
  },
  "resultados-trio": {
    src: "/fotos/amigas-trio-banheiro.webp",
    alt: "Três amigas juntas no banheiro, uma delas segurando o Creme Hidratante Miga",
    tint: ["#f7d9c6", "#d99d78"],
  },
  "clube-trio": {
    src: "/fotos/amigas-deitadas.webp",
    alt: "Duas amigas recostadas uma na outra, sorrindo, com o Creme Hidratante ao fundo",
    tint: ["#fbd8e4", "#e2a0b8"],
  },
  "artigo-acne": {
    src: "/fotos/close-pele-real.webp",
    alt: "Close de um rosto com sardas e acne, pele real sem retoque",
    tint: ["#f8e2d4", "#dda98a"],
  },
  "artigo-niacinamida": {
    src: null,
    alt: "Gotas de sérum sobre uma superfície clara",
    tint: ["#e3effb", "#a8c8e8"],
  },
  "artigo-ordem": {
    src: "/fotos/aplicando-creme.webp",
    alt: "Pessoa aplicando creme na bochecha enquanto segura o pote Miga",
    tint: ["#fbf3ea", "#dcc9b4"],
  },
  "artigo-barreira": {
    src: null,
    alt: "Close de pele com sardas e viço",
    tint: ["#f7ddd0", "#d59e82"],
  },
  "insta-1": {
    src: "/fotos/insta/insta-1.webp",
    alt: "Rosto com adesivos para acne aplicados",
    tint: ["#f6ddd0", "#d9a184"],
  },
  "insta-2": {
    src: "/fotos/insta/insta-2.webp",
    alt: "Close de pele real com sardas",
    tint: ["#fae6d8", "#e0ac8c"],
  },
  "insta-3": {
    src: "/fotos/insta/insta-3.webp",
    alt: "Pote do Creme Hidratante Miga sobre fundo rosa",
    tint: ["#fbe9ef", "#e6b6c7"],
  },
  "insta-4": {
    src: "/fotos/insta/insta-4.webp",
    alt: "Pessoa aplicando creme na bochecha",
    tint: ["#f5dccb", "#d2a17f"],
  },
  "insta-5": {
    src: "/fotos/insta/insta-5.webp",
    alt: "Três amigas juntas no banheiro",
    tint: ["#eef1f5", "#c3ccd6"],
  },
  "insta-6": {
    src: "/fotos/insta/insta-6.webp",
    alt: "Duas amigas recostadas, rindo",
    tint: ["#f8ddcd", "#d79c7d"],
  },
  "insta-7": {
    src: "/fotos/insta/insta-7.webp",
    alt: "Duas amigas de rostos juntos, uma segurando o Creme Hidratante",
    tint: ["#f7e0d2", "#cf9a7d"],
  },
};
