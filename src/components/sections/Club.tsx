import { Media } from "@/components/ui/Media";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Reveal } from "@/components/ui/Reveal";
import { clubPerks } from "@/data/content";

export function Club() {
  return (
    <section id="clube" className="relative bg-blush" aria-labelledby="clube-titulo">
      <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[minmax(0,26rem)_1fr_auto] lg:gap-14">
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
          <p className="mt-5 max-w-sm text-xs leading-relaxed text-espresso/70">
            Conteúdos exclusivos, lançamentos em primeira mão, dicas de rotina, reviews
            reais e uma comunidade que entende a sua pele de verdade.
          </p>

          <NewsletterForm className="mt-7 max-w-md" />

          <p className="eyebrow mt-4 text-espresso/50">Faz parte, miga</p>
        </Reveal>

        {/* Foto com recorte orgânico */}
        <Reveal delay={0.1} className="order-first lg:order-none">
          <Media
            id="clube-trio"
            className="mx-auto aspect-[5/4] w-full max-w-lg rounded-[42%_58%_38%_62%/58%_36%_64%_42%]"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </Reveal>

        <Reveal delay={0.16} className="hidden xl:block">
          <ul className="eyebrow space-y-2.5 border-l border-espresso/20 pl-6 text-espresso/60">
            {clubPerks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
