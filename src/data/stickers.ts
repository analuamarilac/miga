/**
 * Adesivos hidrocoloides recortados do render do "Sem Climão".
 * São os mesmos elementos do produto, reaproveitados como decoração flutuante
 * no hero — daí manterem o acabamento glossy do render original.
 */
export type Sticker = {
  src: string;
  width: number;
  height: number;
};

export const stickers = {
  estrela: { src: "/adesivos/estrela.webp", width: 182, height: 193 },
  flor: { src: "/adesivos/flor.webp", width: 220, height: 215 },
  lua: { src: "/adesivos/lua.webp", width: 171, height: 204 },
  nuvem: { src: "/adesivos/nuvem.webp", width: 220, height: 143 },
  gota: { src: "/adesivos/gota.webp", width: 212, height: 172 },
  circulo: { src: "/adesivos/circulo.webp", width: 169, height: 169 },
} as const satisfies Record<string, Sticker>;

export type StickerId = keyof typeof stickers;
