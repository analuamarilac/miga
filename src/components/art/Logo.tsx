type LogoProps = { className?: string };

/** Wordmark da marca. O peso serifado vem do token --font-display. */
export function Logo({ className = "text-3xl" }: LogoProps) {
  return (
    <span className={`font-[family-name:var(--font-display)] font-bold tracking-tight ${className}`}>
      miga
    </span>
  );
}

/** Versão "assinatura líquida" usada no bloco final de CTA. */
export function LiquidLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 220" className={className} role="img" aria-label="miga">
      <defs>
        <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbdcd0" />
          <stop offset="45%" stopColor="#efb9a4" />
          <stop offset="100%" stopColor="#d99277" />
        </linearGradient>
        <radialGradient id="liquid-gloss" cx="0.4" cy="0.25" r="0.7">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="liquid-soft">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      <g filter="url(#liquid-soft)">
        <text
          x="260"
          y="160"
          textAnchor="middle"
          fontFamily="var(--font-display), Georgia, serif"
          fontSize="170"
          fontWeight="700"
          fill="url(#liquid)"
        >
          miga
        </text>
        <text
          x="260"
          y="160"
          textAnchor="middle"
          fontFamily="var(--font-display), Georgia, serif"
          fontSize="170"
          fontWeight="700"
          fill="url(#liquid-gloss)"
        >
          miga
        </text>
      </g>

      {[
        [58, 52, 11],
        [128, 28, 7],
        [420, 40, 9],
        [472, 92, 6],
        [96, 188, 8],
        [352, 196, 6],
        [466, 176, 10],
      ].map(([cx, cy, r]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r={r} fill="url(#liquid)" opacity="0.9" />
          <circle cx={cx - r * 0.3} cy={cy - r * 0.35} r={r * 0.35} fill="#fff" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}
