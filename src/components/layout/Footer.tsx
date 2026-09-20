import { Instagram, Pinterest, TikTok, YouTube } from "@/components/art/Icons";
import { Logo } from "@/components/art/Logo";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { footerColumns, site } from "@/data/site";

const socials = [
  { label: "Instagram", Icon: Instagram },
  { label: "TikTok", Icon: TikTok },
  { label: "YouTube", Icon: YouTube },
  { label: "Pinterest", Icon: Pinterest },
];

/** Selos de pagamento desenhados em SVG para não depender de assets externos. */
function PaymentBadges() {
  return (
    <ul className="flex items-center gap-4" aria-label="Formas de pagamento">
      <li>
        <svg viewBox="0 0 48 16" className="h-4 w-auto" role="img" aria-label="Visa">
          <text
            x="0"
            y="13"
            fontFamily="var(--font-sans), sans-serif"
            fontSize="15"
            fontWeight="700"
            fontStyle="italic"
            fill="#1a1f71"
          >
            VISA
          </text>
        </svg>
      </li>
      <li>
        <svg viewBox="0 0 34 20" className="h-5 w-auto" role="img" aria-label="Mastercard">
          <circle cx="13" cy="10" r="9" fill="#eb001b" />
          <circle cx="21" cy="10" r="9" fill="#f79e1b" fillOpacity="0.9" />
        </svg>
      </li>
      <li>
        <svg viewBox="0 0 44 18" className="h-4 w-auto" role="img" aria-label="Pix">
          <path
            d="M9 3.2l5.8 5.8L9 14.8 3.2 9z"
            fill="none"
            stroke="#32bcad"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <text
            x="20"
            y="14"
            fontFamily="var(--font-sans), sans-serif"
            fontSize="13"
            fontWeight="700"
            fill="#32bcad"
          >
            pix
          </text>
        </svg>
      </li>
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-espresso/10 bg-cream">
      <div className="mx-auto max-w-[1600px] px-5 py-14 md:px-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,15rem)_repeat(3,minmax(0,9rem))_minmax(0,1fr)] lg:gap-8">
          <div>
            <Logo className="text-4xl" />
            <p className="eyebrow mt-4 leading-[1.9] text-espresso/60">
              Skincare de verdade
              <br />
              entre amigas.
            </p>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="eyebrow text-espresso/50">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-espresso/75 transition hover:text-espresso"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:pl-6">
            <p className="eyebrow text-espresso/50">Receba novidades</p>
            <NewsletterForm
              variant="stacked"
              submitLabel="Assinar novidades"
              className="mt-4 max-w-xs"
            />

            <div className="mt-6 flex items-center justify-between gap-6">
              <ul className="flex items-center gap-4">
                {socials.map(({ label, Icon }) => (
                  <li key={label}>
                    <a
                      href="#"
                      aria-label={`${site.name} no ${label}`}
                      className="block text-espresso/70 transition hover:-translate-y-0.5 hover:text-espresso"
                    >
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
              <PaymentBadges />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-espresso/10 pt-6 text-xs text-espresso/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. Todos os direitos reservados.</p>
          <p>Mais pele real. Mais você.</p>
        </div>
      </div>
    </footer>
  );
}
