"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowUpRight, Bag, Close, Menu, Search } from "@/components/art/Icons";
import { Logo } from "@/components/art/Logo";
import { navExtra, navLinks } from "@/data/site";
import { useCart } from "@/lib/cart";

/**
 * Barra flutuante em pílula.
 *
 * `hero` desenha a versão que fica sobre a foto; `sticky` é a cópia compacta
 * que desce quando o hero sai da viewport, para a navegação não sumir.
 */
type Variant = "hero" | "sticky";

function NavActions({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { count } = useCart();

  return (
    <div className="flex items-center gap-2">
      <a
        href="#quiz"
        className="group hidden items-center gap-2 rounded-full bg-bubblegum px-5 py-2.5 text-[0.8125rem] text-espresso transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105 md:inline-flex"
      >
        Conhecer minha rotina
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>

      <div className="flex items-center gap-1 rounded-full bg-white/55 p-1">
        <button
          type="button"
          aria-label="Buscar"
          className="flex h-9 w-9 items-center justify-center rounded-full text-espresso transition hover:bg-white/70"
        >
          <Search className="h-[18px] w-[18px]" />
        </button>
        <button
          type="button"
          aria-label={`Sacola com ${count} ${count === 1 ? "item" : "itens"}`}
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-espresso transition hover:bg-white/70"
        >
          <Bag className="h-[18px] w-[18px]" />
          {count > 0 && (
            <motion.span
              key={count}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
              className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-espresso px-1 text-[10px] text-cream"
            >
              {count}
            </motion.span>
          )}
        </button>
      </div>

      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Abrir menu"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-white/55 text-espresso transition hover:bg-white/70 lg:hidden"
      >
        <Menu className="h-[18px] w-[18px]" />
      </button>
    </div>
  );
}

function NavBar({
  variant,
  onOpenMenu,
  active,
}: {
  variant: Variant;
  onOpenMenu: () => void;
  active: string;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-full py-2 pl-5 pr-2 md:pl-7 ${
        variant === "hero" ? "glass" : "glass-strong shadow-lg shadow-espresso/5"
      }`}
    >
      <a href="#topo" aria-label="Miga — página inicial">
        <Logo className="text-[1.75rem] md:text-[2rem]" />
      </a>

      <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
        {navLinks.map((link) => {
          const isActive = link.href === active;
          return (
            <a
              key={link.label}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={`rounded-full px-5 py-2.5 text-[0.8125rem] transition-all duration-300 ${
                isActive
                  ? "bg-white/75 text-espresso"
                  : "text-espresso/80 hover:bg-white/45 hover:text-espresso"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      <NavActions onOpenMenu={onOpenMenu} />
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] lg:hidden"
    >
      <button
        type="button"
        aria-label="Fechar menu"
        onClick={onClose}
        className="absolute inset-0 bg-espresso/35 backdrop-blur-sm"
      />
      <motion.nav
        aria-label="Menu mobile"
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-full w-[84%] max-w-sm flex-col bg-cream px-7 py-6"
      >
        <div className="flex items-center justify-between">
          <Logo className="text-3xl" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-espresso transition hover:bg-espresso/5"
          >
            <Close className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-10 flex flex-col">
          {[...navLinks, ...navExtra].map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="display border-b border-espresso/10 py-4 text-3xl transition hover:pl-2"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#quiz"
          onClick={onClose}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-bubblegum px-6 py-3.5 text-[0.8125rem] text-espresso"
        >
          Conhecer minha rotina
          <ArrowUpRight />
        </a>

        <p className="eyebrow mt-auto text-espresso/50">
          Skincare de verdade
          <br />
          entre amigas.
        </p>
      </motion.nav>
    </motion.div>
  );
}

/**
 * Renderizada dentro do hero. Mantém uma cópia fixa que aparece depois que a
 * foto sai da tela, para a navegação continuar disponível na rolagem.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const openMenu = () => setMenuOpen(true);

  useEffect(() => {
    const hero = document.getElementById("topo");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { rootMargin: "-120px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="absolute inset-x-4 top-4 z-40 md:inset-x-6 md:top-5">
        <NavBar variant="hero" onOpenMenu={openMenu} active="#topo" />
      </div>

      <AnimatePresence>
        {pastHero && (
          <motion.div
            initial={{ y: -90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -90, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-3 top-3 z-50 md:inset-x-6 md:top-4"
          >
            <NavBar variant="sticky" onOpenMenu={openMenu} active="" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
