import { Chat, Clock, Heart, Sparkle } from "@/components/art/Icons";
import { Sticker } from "@/components/art/Sticker";
import { Media } from "@/components/ui/Media";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { ProductPhoto } from "@/components/ui/ProductPhoto";
import { Reveal } from "@/components/ui/Reveal";
import { clubPerks } from "@/data/content";
import { brl, novelties } from "@/data/products";

const icones = { sparkle: Sparkle, clock: Clock, heart: Heart, chat: Chat };

/** As amigas da foto estão usando as Pétalas — o selo aproveita a deixa. */
const petalas = novelties.find((item) => item.id === "petalas-para-os-olhos");

export function Club() {
  return (
    <section
      id="clube"
      className="relative overflow-hidden bg-blush"
      aria-labelledby="clube-titulo"
    >
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[minmax(0,27rem)_minmax(0,1fr)] lg:gap-16 lg:py-24">
        {/* Texto, cadastro e vantagens */}
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-espresso/60">
            Clube Miga
            <span className="h-px w-5 bg-espresso/40" />
          </p>

          <h2
            id="clube-titulo"
            className="display mt-5 text-4xl leading-[0.98] sm:text-5xl"
          >
            Skincare fica melhor entre amigas.
          </h2>

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-espresso/70">
            Conteúdos exclusivos, lançamentos em primeira mão, dicas de rotina, reviews
            reais e uma comunidade que entende a sua pele de verdade.
          </p>

          <NewsletterForm className="mt-7 max-w-md" />

          <p className="eyebrow mt-3 text-espresso/50">
            Sem spam. Dá para sair quando quiser.
          </p>

          <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
            {clubPerks.map((perk) => {
              const Icone = icones[perk.icon];
              return (
                <li
                  key={perk.label}
                  className="flex items-start gap-3 rounded-2xl bg-cream/55 px-4 py-3"
                >
                  <Icone className="mt-0.5 h-4 w-4 shrink-0 text-espresso" />
                  <div>
                    <p className="text-[0.8125rem] leading-snug text-espresso">
                      {perk.label}
                    </p>
                    <p className="mt-0.5 text-[0.6875rem] leading-snug text-espresso/60">
                      {perk.detail}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* Foto */}
        <Reveal delay={0.1} className="relative order-first lg:order-none">
          <div className="relative overflow-hidden rounded-[32px] shadow-[0_30px_70px_-40px_rgba(56,27,26,0.6)]">
            <Media
              id="clube-trio"
              className="aspect-[3/2] w-full"
              sizes="(max-width: 1024px) 92vw, 52vw"
            />
          </div>

          {/* Selo do produto que elas estão usando na foto */}
          {petalas && (
            <a
              href="#produtos"
              className="group absolute -bottom-4 right-3 flex items-center gap-2.5 rounded-2xl bg-cream/95 px-3 py-2 shadow-[0_14px_30px_-14px_rgba(56,27,26,0.6)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 sm:gap-3 sm:px-3.5 sm:py-2.5 md:right-8"
            >
              <ProductPhoto
                id="petalas-para-os-olhos"
                sizes="56px"
                className="h-8 w-auto object-contain sm:h-10"
              />
              <span className="text-left">
                <span className="hidden text-[0.6875rem] leading-tight text-espresso/55 sm:block">
                  Elas estão usando
                </span>
                <span className="block text-[0.8125rem] leading-tight text-espresso">
                  {petalas.name}
                </span>
                <span className="block text-[0.6875rem] leading-tight text-espresso/70">
                  {brl(petalas.price)}
                </span>
              </span>
            </a>
          )}

          <Sticker
            id="flor"
            className="-left-4 -top-5 z-20 w-14 md:-left-6 md:w-20"
            rotate={-14}
            duration={9}
          />
          <Sticker
            id="gota"
            className="-right-4 top-[22%] z-20 hidden w-14 sm:block md:-right-6 md:w-16"
            rotate={12}
            duration={8}
            delay={1.1}
          />
        </Reveal>
      </div>
    </section>
  );
}
