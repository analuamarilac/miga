import { useId } from "react";

type StarsProps = { rating: number; reviews: number };

function Star({ fill, gradientId }: { fill: "full" | "half" | "empty"; gradientId: string }) {
  const id = gradientId;
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden="true">
      {fill === "half" && (
        <defs>
          <linearGradient id={id}>
            <stop offset="50%" stopColor="var(--color-fuchsia-star)" />
            <stop offset="50%" stopColor="var(--color-fuchsia-star)" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M10 1.5l2.6 5.3 5.9.85-4.25 4.15 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.65l5.9-.85L10 1.5z"
        fill={
          fill === "full"
            ? "var(--color-fuchsia-star)"
            : fill === "half"
              ? `url(#${id})`
              : "var(--color-fuchsia-star)"
        }
        fillOpacity={fill === "empty" ? 0.25 : 1}
      />
    </svg>
  );
}

export function Stars({ rating, reviews }: StarsProps) {
  const uid = useId();
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`Nota ${rating.toFixed(1).replace(".", ",")} de 5`}
      >
        {Array.from({ length: 5 }, (_, i) => {
          const value = rating - i;
          return (
            <Star
              key={i}
              gradientId={`star-${uid.replace(/[^a-zA-Z0-9]/g, "")}-${i}`}
              fill={value >= 1 ? "full" : value >= 0.5 ? "half" : "empty"}
            />
          );
        })}
      </div>
      <span className="text-xs text-espresso/55">({reviews})</span>
    </div>
  );
}
