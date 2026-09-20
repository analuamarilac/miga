import type { Metadata, Viewport } from "next";
import { Caveat, DM_Sans, IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin", "latin-ext"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Miga — Skincare para uma pele mais sua",
  description:
    "Rotinas simples, fórmulas eficazes e zero pressão. Skincare de verdade entre amigas.",
  keywords: ["skincare", "rotina de pele", "niacinamida", "pele real", "miga"],
  openGraph: {
    title: "Miga — Skincare para uma pele mais sua",
    description:
      "Rotinas simples, fórmulas eficazes e zero pressão para ter uma pele possível todo dia.",
    locale: "pt_BR",
    type: "website",
    siteName: "Miga",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf7f0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // As variaveis de fonte ficam no <html>: os tokens --font-* sao declarados
  // em :root e precisam resolver nesse mesmo escopo.
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${dmSans.variable} ${plexMono.variable} ${caveat.variable}`}
    >
      <body className="antialiased">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-espresso focus:px-4 focus:py-2 focus:text-cream"
        >
          Pular para o conteúdo
        </a>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
