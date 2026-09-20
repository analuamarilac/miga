"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Check } from "@/components/art/Icons";
import { ProductPhoto } from "@/components/ui/ProductPhoto";
import { Stars } from "@/components/ui/Stars";
import { Reveal } from "@/components/ui/Reveal";
import { brl, novelties, products, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";

/** Botão que confirma a adição por um instante e volta ao rótulo original. */
function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const timer = window.setTimeout(() => setJustAdded(false), 1800);
    return () => window.clearTimeout(timer);
  }, [justAdded]);

  return (
    <button
      type="button"
      onClick={() => {
        add({ id: product.id, name: product.name, price: product.price });
        setJustAdded(true);
      }}
      className="flex w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-espresso px-4 py-3.5 text-[0.8125rem] text-cream transition-all duration-300 hover:bg-espresso-soft hover:shadow-[0_10px_24px_-14px_rgba(56,27,26,0.9)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {justAdded ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="flex items-center gap-2"
          >
            <Check className="h-4 w-4" />
            Adicionado
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            Adicionar ao carrinho
          </motion.span>
        )}
      </AnimatePresence>
      <span className="sr-only">{product.name}</span>
    </button>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <Reveal as="article" delay={index * 0.08} className="group flex flex-col">
      <div className="relative overflow-hidden rounded-xl bg-sand">
        <div className="flex aspect-[4/5] items-center justify-center p-8">
          <ProductPhoto
            id={product.id}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
            priority={index < 2}
            className="max-h-full w-auto max-w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.04]"
          />
        </div>

        {product.badge && (
          <span className="eyebrow absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-blush text-center leading-tight text-espresso">
            {product.badge}
          </span>
        )}
      </div>

      <h3 className="mt-5 font-[family-name:var(--font-sans)] text-[0.9375rem]">
        {product.name}
      </h3>
      <p className="mt-1 text-xs text-espresso/60">{product.claim}</p>
      <p className="mt-2.5 text-[0.9375rem] tracking-wide">{brl(product.price)}</p>

      <div className="mt-2.5">
        <Stars rating={product.rating} reviews={product.reviews} />
      </div>

      <div className="mt-4">
        <AddToCartButton product={product} />
      </div>
    </Reveal>
  );
}

/**
 * Card dos lançamentos: horizontal, porque esses renders trazem a embalagem
 * junto com os elementos soltos e pedem mais largura que altura.
 */
function NoveltyCard({ product, index }: { product: Product; index: number }) {
  return (
    <Reveal as="article" delay={index * 0.1}>
      <div className="group grid overflow-hidden rounded-2xl bg-blush-soft sm:grid-cols-[1.15fr_1fr]">
        <div className="flex items-center justify-center p-6 sm:p-8">
          <ProductPhoto
            id={product.id}
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 45vw, 26vw"
            className="h-auto w-full object-contain transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-col justify-center gap-2.5 p-6 pt-0 sm:p-8 sm:pl-0">
          <p className="eyebrow text-espresso/50">{product.badge}</p>
          <h3 className="display text-2xl leading-tight">{product.name}</h3>
          <p className="text-xs text-espresso/65">
            {product.claim} · {product.size}
          </p>
          <p className="text-[0.9375rem] tracking-wide">{brl(product.price)}</p>
          <Stars rating={product.rating} reviews={product.reviews} />
          <div className="mt-2">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function FeaturedProducts() {
  return (
    <section id="produtos" className="bg-cream" aria-labelledby="produtos-titulo">
      <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10 md:py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow flex items-center gap-3 text-espresso/60">
              Produtos em destaque
              <span className="h-px w-5 bg-espresso/40" />
            </p>
            <h2
              id="produtos-titulo"
              className="display mt-4 text-4xl sm:text-5xl lg:text-[3.5rem]"
            >
              As favoritas das migas.
            </h2>
          </div>

          <a
            href="#produtos"
            className="eyebrow group flex items-center gap-3 border-b border-espresso/30 pb-1.5 text-espresso/70 transition hover:border-espresso hover:text-espresso"
          >
            Ver todos os produtos
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Lançamentos */}
        <Reveal className="mt-20">
          <p className="eyebrow flex items-center gap-3 text-espresso/60">
            Novidades
            <span className="h-px w-5 bg-espresso/40" />
          </p>
        </Reveal>

        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          {novelties.map((product, index) => (
            <NoveltyCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
