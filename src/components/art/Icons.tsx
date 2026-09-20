type IconProps = { className?: string };

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const ArrowRight = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const Search = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
);

export const UserIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c1.2-3.6 4-5.2 7-5.2s5.8 1.6 7 5.2" />
  </svg>
);

export const CartIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M3 4h2.2l2.2 10.6a2 2 0 0 0 2 1.6h7.4a2 2 0 0 0 2-1.5L21 8H6" />
    <circle cx="10" cy="20" r="1.3" />
    <circle cx="17.5" cy="20" r="1.3" />
  </svg>
);

export const Truck = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M2 6.5h11v9H2zM13 9.5h4.2l2.8 3v3h-7z" />
    <circle cx="6" cy="17.5" r="1.6" />
    <circle cx="16.5" cy="17.5" r="1.6" />
  </svg>
);

export const Close = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Menu = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
  </svg>
);

export const Sparkle = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M12 1.5c.7 5.2 3.1 8.2 9 9.4-5.9 1.2-8.3 4.2-9 9.4-.7-5.2-3.1-8.2-9-9.4 5.9-1.2 8.3-4.2 9-9.4z"
      fill="currentColor"
    />
  </svg>
);

export const Flask = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M9.5 2.5h5M10.5 2.5v6.2L5.6 18a2 2 0 0 0 1.8 3h9.2a2 2 0 0 0 1.8-3l-4.9-9.3V2.5" />
    <path d="M7.6 14.5h8.8" />
  </svg>
);

export const Heart = ({ className = "h-6 w-6" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M12 20.2S3.5 15.1 3.5 9.3A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 8.5 2.1c0 5.8-8.5 10.9-8.5 10.9z" />
  </svg>
);

export const Sun = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
  </svg>
);

export const Moon = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M20 14.2A8.3 8.3 0 0 1 9.8 4 8.4 8.4 0 1 0 20 14.2z" />
  </svg>
);

export const Check = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M4.5 12.5l5 5 10-11" />
  </svg>
);

export const Instagram = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
    <circle cx="12" cy="12" r="4.1" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const TikTok = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M14.4 2.5h2.7c.2 1.9 1.4 3.4 3.4 3.7v2.7c-1.3 0-2.5-.4-3.4-1v6.4a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v2.8a3.1 3.1 0 1 0 2.3 3V2.5z"
      fill="currentColor"
    />
  </svg>
);

export const YouTube = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M21.6 7.6a2.5 2.5 0 0 0-1.8-1.8C18.2 5.4 12 5.4 12 5.4s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.6C2 9.2 2 12 2 12s0 2.8.4 4.4a2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.4.4-4.4s0-2.8-.4-4.4zM10 15.1V8.9l5.3 3.1-5.3 3.1z"
      fill="currentColor"
    />
  </svg>
);

export const Pinterest = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M12 2.2a9.8 9.8 0 0 0-3.6 18.9c-.1-.8-.2-2 0-2.9l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.5-.3 1 .5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.1-3.8a4.7 4.7 0 0 0-4.9 4.7c0 .9.3 1.5.7 2 .2.2.2.3.1.6l-.2.8c-.1.3-.3.4-.5.3-1.4-.6-2-2.1-2-3.8 0-2.8 2.4-6.2 7-6.2 3.8 0 6.2 2.7 6.2 5.6 0 3.8-2.1 6.7-5.3 6.7-1 0-2-.6-2.4-1.2l-.6 2.5c-.2.8-.7 1.8-1.1 2.4A9.8 9.8 0 1 0 12 2.2z"
      fill="currentColor"
    />
  </svg>
);

export const ArrowUpRight = ({ className = "h-3.5 w-3.5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M7 17L17 7M8.5 7H17v8.5" />
  </svg>
);

export const Bag = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <path d="M5.4 7.5h13.2l1 12.5H4.4z" />
    <path d="M8.8 10V6.9a3.2 3.2 0 0 1 6.4 0V10" />
  </svg>
);

export const ImageIcon = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <rect x="3.2" y="4.8" width="17.6" height="14.4" rx="3" />
    <circle cx="8.6" cy="9.8" r="1.5" />
    <path d="M4 16.6l4.6-4.2 3.5 3.1 3-2.6 4.9 4.3" />
  </svg>
);

export const Clock = ({ className = "h-5 w-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <circle cx="12" cy="12" r="8.8" />
    <path d="M12 6.8V12l3.4 2.1" />
  </svg>
);

export const Lock = ({ className = "h-4 w-4" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...stroke}>
    <rect x="4.8" y="10.4" width="14.4" height="9.4" rx="2.6" />
    <path d="M8.4 10.4V7.8a3.6 3.6 0 0 1 7.2 0v2.6" />
  </svg>
);
