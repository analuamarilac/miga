import { ArrowRight } from "@/components/art/Icons";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { articles } from "@/data/content";

export function Content() {
  return (
    <section id="conteudo" className="bg-cream" aria-labelledby="conteudo-titulo">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 py-16 md:px-10 md:py-24 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-14">
        <Reveal className="lg:pt-2">
          <p className="eyebrow flex items-center gap-3 text-espresso/60">
            Miga responde
            <span className="h-px w-5 bg-espresso/40" />
          </p>
          <h2
            id="conteudo-titulo"
            className="display mt-5 text-3xl sm:text-4xl lg:text-[2.625rem]"
          >
            Conteúdo que te acompanha de verdade.
          </h2>
          <a
            href="#conteudo"
            className="eyebrow group mt-8 inline-flex items-center gap-3 border-b border-espresso/30 pb-1.5 text-espresso/70 transition hover:border-espresso hover:text-espresso"
          >
            Ver todos os artigos
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>

        <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article, index) => (
            <Reveal as="article" key={article.title} delay={index * 0.08}>
              <a href="#conteudo" className="group block">
                <Media
                  id={article.mediaId}
                  className="aspect-[4/3] rounded-lg"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 20vw"
                />
                <p className="eyebrow mt-5 text-espresso/50">{article.category}</p>
                <h3 className="display mt-2 text-xl leading-tight transition-colors group-hover:text-espresso-soft">
                  {article.title}
                </h3>
                <p className="mt-2.5 text-xs leading-relaxed text-espresso/65">
                  {article.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs text-espresso/70 transition group-hover:text-espresso">
                  Ler artigo
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
