export const resultMilestones = [
  {
    period: "4 semanas",
    headline: "Pele mais equilibrada",
    stat: 87,
    detail: "notaram menos oleosidade sem ressecar.",
  },
  {
    period: "8 semanas",
    headline: "Textura mais uniforme",
    stat: 82,
    detail: "sentiram a pele mais lisa e saudável.",
  },
  {
    period: "12 semanas",
    headline: "Mais confiança",
    stat: 79,
    detail: "disseram se sentir melhor com a própria pele.",
  },
];

export const resultsFootnote =
  "*Resultados baseados em pesquisa com consumidoras Miga. Conteúdo fictício, criado para este estudo de caso.";

export type Article = {
  category: string;
  title: string;
  excerpt: string;
  mediaId: "artigo-acne" | "artigo-niacinamida" | "artigo-ordem" | "artigo-barreira";
};

export const articles: Article[] = [
  {
    category: "Pele real",
    title: "Acne é normal?",
    excerpt:
      "Entenda por que a acne faz parte da vida real e por que ela merece ajuda, não culpa.",
    mediaId: "artigo-acne",
  },
  {
    category: "Ingredientes",
    title: "Niacinamida para que serve?",
    excerpt: "Descubra os benefícios desse ativo queridinho e como usar sem exagero.",
    mediaId: "artigo-niacinamida",
  },
  {
    category: "Rotina",
    title: "Qual a ordem correta?",
    excerpt: "Aprenda o passo a passo de uma rotina eficiente, do mais leve ao mais denso.",
    mediaId: "artigo-ordem",
  },
  {
    category: "Barreira da pele",
    title: "Como fortalecer a sua barreira",
    excerpt: "Dicas práticas para uma pele mais resistente, calma e saudável.",
    mediaId: "artigo-barreira",
  },
];

export const clubPerks = [
  { icon: "sparkle" as const, label: "Acesso antecipado", detail: "Lançamentos antes de todo mundo" },
  { icon: "clock" as const, label: "Dicas de rotina", detail: "Um passo por semana, sem pressa" },
  { icon: "heart" as const, label: "Reviews reais", detail: "De quem tem a pele parecida" },
  { icon: "chat" as const, label: "Comunidade", detail: "Um grupo que responde de verdade" },
];
