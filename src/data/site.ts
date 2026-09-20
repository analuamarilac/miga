export const site = {
  name: "Miga",
  tagline: "Skincare de verdade entre amigas.",
  announcement: "Frete grátis acima de R$ 199",
  instagram: "@somosmiga",
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
  { label: "Início", href: "#topo" },
  { label: "Como funciona", href: "#rotina" },
  { label: "Produtos", href: "#produtos" },
  { label: "Miga Responde", href: "#conteudo" },
];

/** Links extras, só no menu mobile — não cabem na barra flutuante. */
export const navExtra: NavLink[] = [
  { label: "Clube Miga", href: "#clube" },
  { label: "Sobre", href: "#resultados" },
];

export const footerColumns: { title: string; links: NavLink[] }[] = [
  {
    title: "Produtos",
    links: [
      { label: "Todos os produtos", href: "#produtos" },
      { label: "Kits", href: "#produtos" },
      { label: "Lançamentos", href: "#produtos" },
      { label: "Mais vendidos", href: "#produtos" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Frete e entrega", href: "#" },
      { label: "Trocas e devoluções", href: "#" },
      { label: "Dúvidas frequentes", href: "#" },
      { label: "Fale com a gente", href: "#" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Sobre a Miga", href: "#resultados" },
      { label: "Sustentabilidade", href: "#" },
      { label: "Privacidade", href: "#" },
      { label: "Termos de uso", href: "#" },
    ],
  },
];

export const trustItems = [
  {
    icon: "sparkle" as const,
    title: "Fácil de entender",
    description: "Informação clara, sem complicação.",
  },
  {
    icon: "flask" as const,
    title: "Fórmulas que fazem sentido",
    description: "Ativos na medida certa, resultados reais.",
  },
  {
    icon: "heart" as const,
    title: "Pele real, sem pressão",
    description: "Mais rotina, menos cobrança.",
  },
];
