import { Heart } from "@/components/art/Icons";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import type { MediaId } from "@/data/media";

const tiles: MediaId[] = [
  "insta-1",
  "insta-2",
  "insta-3",
  "insta-4",
  "insta-5",
  "insta-6",
  "insta-7",
];

export function InstagramStrip() {
  return (
    <section className="bg-cream" aria-labelledby="instagram-titulo">
      <div className="px-5 pt-14 md:px-10">
        <p id="instagram-titulo" className="eyebrow flex items-center gap-3 text-espresso/60">
          #migasreais
          <span className="h-px w-5 bg-espresso/40" />
        </p>
      </div>

      <Reveal className="mt-6 grid lg:grid-cols-[1fr_auto]">
        {/* Em telas pequenas vira um carrossel horizontal */}
        <ul className="flex snap-x snap-mandatory gap-px overflow-x-auto lg:grid lg:grid-cols-7 lg:overflow-visible">
          {tiles.map((id) => (
            <li
              key={id}
              className="w-[42vw] shrink-0 snap-start sm:w-[28vw] lg:w-auto"
            >
              <a href="#" aria-label={`Ver publicação ${site.instagram}`} className="group block">
                <Media
                  id={id}
                  className="aspect-square transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  sizes="(max-width: 1024px) 42vw, 12vw"
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-6 bg-lilac px-6 py-6 lg:w-56 lg:flex-col lg:items-start lg:justify-center lg:gap-5 lg:py-0">
          <div className="eyebrow leading-[1.9] text-espresso/70">
            <p>Pele real</p>
            <p>em todos</p>
            <p>os momentos</p>
          </div>
          <Heart className="h-4 w-4 text-espresso/60" />
          <div className="eyebrow leading-[1.9] text-espresso">
            <p>Marque</p>
            <p>{site.instagram}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
