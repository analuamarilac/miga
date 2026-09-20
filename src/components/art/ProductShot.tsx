import type { ShotKind } from "@/data/products";

type ProductShotProps = {
  kind: ShotKind;
  label: { title: string[]; caption: string[] };
  accent?: string;
  className?: string;
};

const MONO = "var(--font-mono), ui-monospace, monospace";
const DISPLAY = "var(--font-display), Georgia, serif";

/** Wordmark + linhas de rótulo impressos na embalagem. */
function BottleLabel({
  x,
  y,
  title,
  caption,
  markSize = 22,
  width = 100,
}: {
  x: number;
  y: number;
  title: string[];
  caption: string[];
  markSize?: number;
  width?: number;
}) {
  return (
    <g textAnchor="middle" fill="#2c1614">
      <text x={x} y={y} fontFamily={DISPLAY} fontSize={markSize} fontWeight={700}>
        miga
      </text>
      {title.map((line, i) => (
        <text
          key={line}
          x={x}
          y={y + markSize * 0.95 + i * (markSize * 0.5)}
          fontFamily={MONO}
          fontSize={markSize * 0.34}
          letterSpacing={markSize * 0.03}
          opacity={0.92}
        >
          {line.toUpperCase()}
        </text>
      ))}
      {caption.map((line, i) => (
        <text
          key={line}
          x={x}
          y={y + markSize * 1.9 + i * (markSize * 0.38)}
          fontFamily={MONO}
          fontSize={markSize * 0.24}
          opacity={0.55}
        >
          {line}
        </text>
      ))}
      <circle
        cx={x}
        cy={y + markSize * 3.15}
        r={width * 0.085}
        fill="none"
        stroke="#2c1614"
        strokeWidth={0.8}
        opacity={0.35}
      />
    </g>
  );
}

export function ProductShot({
  kind,
  label,
  accent = "#f2e7dd",
  className = "",
}: ProductShotProps) {
  // O pote é largo e baixo, então ganha um canvas próprio para não renderizar
  // esticado quando a altura é quem manda no dimensionamento.
  const isJar = kind === "jar";
  const viewBox = isJar ? "0 0 200 250" : "0 0 200 390";

  const shadow = (
    <ellipse
      cx="100"
      cy={isJar ? 236 : 374}
      rx={isJar ? 72 : 62}
      ry="9"
      fill="#2c1614"
      opacity="0.07"
    />
  );

  const gradId = `shot-${kind}`;
  const gloss = (
    <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
      <stop offset="28%" stopColor="#ffffff" stopOpacity="0.05" />
      <stop offset="72%" stopColor="#2c1614" stopOpacity="0.03" />
      <stop offset="100%" stopColor="#2c1614" stopOpacity="0.1" />
    </linearGradient>
  );

  return (
    <svg
      viewBox={viewBox}
      className={className}
      role="img"
      aria-label={label.title.join(" ")}
    >
      <defs>{gloss}</defs>
      {shadow}

      {kind === "pump" && (
        <g>
          <path d="M96 24h8v10h-8z" fill="#efe6dc" />
          <path d="M78 22h26a4 4 0 0 1 0 8H78a4 4 0 0 1 0-8z" fill="#efe6dc" />
          <rect x="92" y="30" width="16" height="22" rx="3" fill="#e8ddd1" />
          <rect x="84" y="50" width="32" height="14" rx="4" fill="#efe6dc" />
          <rect x="44" y="62" width="112" height="308" rx="30" fill={accent} />
          <rect x="44" y="62" width="112" height="308" rx="30" fill={`url(#${gradId})`} />
          <BottleLabel x={100} y={148} title={label.title} caption={label.caption} />
          <text
            x="100"
            y="332"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize={8}
            fill="#2c1614"
            opacity="0.6"
          >
            200 ml
          </text>
        </g>
      )}

      {kind === "toner" && (
        <g>
          <rect x="86" y="18" width="28" height="30" rx="6" fill="#f3a8c4" />
          <rect x="92" y="46" width="16" height="12" fill="#f6bdd2" />
          <rect x="56" y="56" width="88" height="314" rx="22" fill={accent} />
          <rect x="56" y="56" width="88" height="314" rx="22" fill={`url(#${gradId})`} />
          <BottleLabel
            x={100}
            y={150}
            title={label.title}
            caption={label.caption}
            markSize={20}
            width={88}
          />
          <text
            x="100"
            y="336"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize={8}
            fill="#2c1614"
            opacity="0.6"
          >
            150 ml
          </text>
        </g>
      )}

      {kind === "dropper" && (
        <g>
          <rect x="88" y="16" width="24" height="46" rx="9" fill="#f6f1ea" />
          <rect x="88" y="16" width="24" height="46" rx="9" fill={`url(#${gradId})`} />
          <rect x="94" y="60" width="12" height="16" fill="#e8ddd1" />
          <path
            d="M64 96c0-12 9-20 20-22l32 0c11 2 20 10 20 22v246a28 28 0 0 1-28 28H92a28 28 0 0 1-28-28z"
            fill={accent}
          />
          <path
            d="M64 96c0-12 9-20 20-22l32 0c11 2 20 10 20 22v246a28 28 0 0 1-28 28H92a28 28 0 0 1-28-28z"
            fill={`url(#${gradId})`}
          />
          <BottleLabel
            x={100}
            y={172}
            title={label.title}
            caption={label.caption}
            markSize={20}
            width={72}
          />
          <text
            x="100"
            y="332"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize={8}
            fill="#2c1614"
            opacity="0.6"
          >
            30 ml
          </text>
        </g>
      )}

      {isJar && (
        <g>
          <rect x="24" y="40" width="152" height="56" rx="13" fill="#f7f3ec" />
          <rect x="24" y="40" width="152" height="56" rx="13" fill={`url(#${gradId})`} />
          <rect x="28" y="90" width="144" height="134" rx="18" fill={accent} />
          <rect x="28" y="90" width="144" height="134" rx="18" fill={`url(#${gradId})`} />
          <rect x="34" y="100" width="20" height="62" rx="8" fill="#dbe8f7" opacity="0.8" />
          <rect x="146" y="100" width="20" height="62" rx="8" fill="#f8cfdf" opacity="0.8" />
          <BottleLabel
            x={100}
            y={132}
            title={label.title}
            caption={label.caption}
            markSize={18}
            width={120}
          />
          <text
            x="100"
            y="212"
            textAnchor="middle"
            fontFamily={MONO}
            fontSize={8}
            fill="#2c1614"
            opacity="0.6"
          >
            50 g
          </text>
        </g>
      )}

      {kind === "tube" && (
        <g>
          <path d="M62 78c0-6 4-10 10-10h56c6 0 10 4 10 10l-4 232H66z" fill={accent} />
          <path d="M62 78c0-6 4-10 10-10h56c6 0 10 4 10 10l-4 232H66z" fill={`url(#${gradId})`} />
          <rect x="66" y="310" width="68" height="44" rx="10" fill="#f6bdd2" />
          <rect x="74" y="354" width="52" height="12" rx="5" fill="#f3a8c4" />
          <BottleLabel
            x={100}
            y={140}
            title={label.title}
            caption={label.caption}
            markSize={20}
            width={70}
          />
        </g>
      )}
    </svg>
  );
}
