/**
 * Registro central de imagens.
 *
 * Todo slot de foto da landing page vive aqui. Enquanto `src` for `null`,
 * o componente <Media> desenha um placeholder editorial on-brand (gradiente
 * duotone + blob orgânico + grain). Para usar fotografia real, basta apontar
 * `src` para um arquivo em /public ou uma URL remota — nenhum componente
 * precisa ser alterado.
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
  /** Par de cores do placeholder (duotone). */
  tint: [string, string];
};

export const media: Record<MediaId, MediaSlot> = {
  "quiz-retrato": {
    src: null,
    alt: "Retrato em close de uma pessoa com sardas e pele iluminada",
    tint: ["#f6dcc8", "#e7b48f"],
  },
  "resultados-trio": {
    src: null,
    alt: "Três amigas de rostos juntos, sorrindo, com a pele natural",
    tint: ["#f7d9c6", "#d99d78"],
  },
  "clube-trio": {
    src: null,
    alt: "Três amigas abraçadas, rindo juntas",
    tint: ["#fbd8e4", "#e2a0b8"],
  },
  "artigo-acne": {
    src: null,
    alt: "Close de uma pele real com acne",
    tint: ["#f8e2d4", "#dda98a"],
  },
  "artigo-niacinamida": {
    src: null,
    alt: "Gotas de sérum sobre uma superfície clara",
    tint: ["#e3effb", "#a8c8e8"],
  },
  "artigo-ordem": {
    src: null,
    alt: "Textura de creme espalhada",
    tint: ["#fbf3ea", "#dcc9b4"],
  },
  "artigo-barreira": {
    src: null,
    alt: "Close de pele com sardas e viço",
    tint: ["#f7ddd0", "#d59e82"],
  },
  "insta-1": {
    src: null,
    alt: "Pessoa aplicando creme no rosto",
    tint: ["#f6ddd0", "#d9a184"],
  },
  "insta-2": {
    src: null,
    alt: "Close de pele hidratada com sardas",
    tint: ["#fae6d8", "#e0ac8c"],
  },
  "insta-3": {
    src: null,
    alt: "Pote de creme hidratante Miga sobre tecido",
    tint: ["#fbe9ef", "#e6b6c7"],
  },
  "insta-4": {
    src: null,
    alt: "Pessoa sorrindo com produto aplicado na bochecha",
    tint: ["#f5dccb", "#d2a17f"],
  },
  "insta-5": {
    src: null,
    alt: "Mão segurando o gel de limpeza Miga",
    tint: ["#eef1f5", "#c3ccd6"],
  },
  "insta-6": {
    src: null,
    alt: "Pessoa fazendo biquinho para a câmera",
    tint: ["#f8ddcd", "#d79c7d"],
  },
  "insta-7": {
    src: null,
    alt: "Close do olhar de uma pessoa com sardas",
    tint: ["#f7e0d2", "#cf9a7d"],
  },
};
