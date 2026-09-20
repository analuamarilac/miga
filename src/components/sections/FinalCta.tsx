import { LiquidLogo } from "@/components/art/Logo";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <section className="bg-butter" aria-labelledby="cta-final-titulo">
      <div className="mx-auto grid max-w-[1600px] items-center gap-10 px-5 py-14 md:px-10 md:py-16 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] lg:gap-12">
        <Reveal>
          <h2
            id="cta-final-titulo"
            className="display text-4xl leading-[0.98] sm:text-5xl"
          >
            Mais pele real.
            <br />
            Mais você.
          </h2>
          <p className="eyebrow mt-6 text-espresso/70">
            Rotinas de verdade para a sua vida real.
          </p>
        </Reveal>

        <span className="hidden h-24 w-px bg-espresso/20 lg:block" aria-hidden="true" />

        <Reveal delay={0.08} className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-12">
          <LinkButton href="#quiz" withArrow>
            Encontrar minha rotina
          </LinkButton>
          <LiquidLogo className="w-56 sm:w-72 lg:w-80" />
        </Reveal>

        <div className="eyebrow hidden self-center leading-[1.9] text-espresso/60 lg:block">
          <p>Nossa</p>
          <p>assinatura</p>
          <p>líquida</p>
          <span className="mt-3 block h-px w-6 bg-espresso/40" />
        </div>
      </div>
    </section>
  );
}
