import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 é o padrão do next/image; 90 fica reservado para a foto do hero,
    // que ocupa a tela inteira e sofria com a recompressão.
    qualities: [75, 90],
    // Hosts liberados para as fotos apontadas em src/data/media.ts.
    // Fotos em /public não precisam de entrada aqui.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
