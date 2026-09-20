import Image from "next/image";
import { media, type MediaId } from "@/data/media";

/** PRNG determinístico — o mesmo slot gera sempre o mesmo placeholder. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/** Desenha um blob orgânico fechado com 6 pontos ao redor de um centro. */
function blobPath(rand: () => number, cx: number, cy: number, radius: number) {
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * Math.PI * 2;
    const r = radius * (0.7 + rand() * 0.55);
    return [cx + Math.cos(angle) * r, cy + Math.sin(angle) * r] as const;
  });

  return points
    .map(([x, y], i) => {
      const [px, py] = points[(i + points.length - 1) % points.length];
      if (i === 0) return `M ${x.toFixed(1)} ${y.toFixed(1)}`;
      const mx = (px + x) / 2;
      const my = (py + y) / 2;
      return `Q ${px.toFixed(1)} ${py.toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    })
    .join(" ")
    .concat(" Z");
}

/**
 * Placeholder editorial: duotone + formas orgânicas + grain.
 * Usado enquanto o slot correspondente em `data/media.ts` não tem foto real.
 */
function Placeholder({ id, tint }: { id: string; tint: [string, string] }) {
  const rand = seeded(id);
  const gradientId = `grad-${id}`;
  const blurId = `blur-${id}`;

  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={tint[0]} />
          <stop offset="100%" stopColor={tint[1]} />
        </linearGradient>
        <filter id={blurId}>
          <feGaussianBlur stdDeviation="26" />
        </filter>
      </defs>

      <rect width="400" height="400" fill={`url(#${gradientId})`} />

      <g filter={`url(#${blurId})`} opacity="0.65">
        <path d={blobPath(rand, 120, 140, 130)} fill={tint[0]} opacity="0.9" />
        <path d={blobPath(rand, 290, 290, 150)} fill={tint[1]} opacity="0.75" />
        <path d={blobPath(rand, 300, 90, 90)} fill="#ffffff" opacity="0.35" />
      </g>

      <circle cx="150" cy="330" r="70" fill="#ffffff" opacity="0.12" />
    </svg>
  );
}

type MediaProps = {
  id: MediaId;
  className?: string;
  /** Prioriza o carregamento (use apenas em imagens acima da dobra). */
  priority?: boolean;
  sizes?: string;
};

/**
 * Renderiza a foto do slot ou, na ausência dela, o placeholder desenhado.
 * Sempre preenche o contêiner — quem define proporção é o elemento pai.
 */
export function Media({ id, className = "", priority, sizes = "100vw" }: MediaProps) {
  const slot = media[id];

  return (
    <div className={`grain relative overflow-hidden ${className}`}>
      {slot.src ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <>
          <Placeholder id={id} tint={slot.tint} />
          <span className="sr-only">{slot.alt}</span>
        </>
      )}
    </div>
  );
}
