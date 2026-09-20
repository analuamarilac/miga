"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { CartIcon, Close, Menu, Search, UserIcon } from "@/components/art/Icons";
import { Logo } from "@/components/art/Logo";
import { navLeft, navRight } from "@/data/site";
import { useCart } from "@/lib/cart";

function NavLinks({
  onNavigate,
  className = "",
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <>
      {[...navLeft, ...navRight].map((link) => (
        <a
          key={link.label}
          href={link.href}
          onClick={onNavigate}
          className={className}
        >
          {link.label}
        </a>
      ))}
    </>
  );
}

const linkClass =
  "relative text-[0.8125rem] text-espresso/80 transition-colors hover:text-espresso after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-espresso after:transition-all after:duration-300 hover:after:w-full";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll do body enquanto o menu mobile está aberto.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/90 shadow-[0_1px_0_0_rgba(56,27,26,0.08)] backdrop-blur-md"
          : "bg-cream"
      }`}
    >
      <div
        className={`mx-auto grid max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 transition-all duration-300 md:px-10 ${
          scrolled ? "py-3" : "py-4 md:py-5"
        }`}
      >
        {/* Navegação esquerda (desktop) / botão de menu (mobile) */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {navLeft.map((link) => (
            <a key={link.label} href={link.href} className={linkClass}>
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          className="flex h-9 w-9 items-center justify-center rounded-full text-espresso transition hover:bg-espresso/5 lg:hidden"
        >
          <Menu />
        </button>

        {/* Marca */}
        <div className="flex justify-center">
          <a href="#topo" aria-label="Miga — página inicial">
            <Logo
              className={`transition-all duration-300 ${
                scrolled ? "text-2xl md:text-3xl" : "text-3xl md:text-[2.125rem]"
              }`}
            />
          </a>
        </div>

        {/* Navegação direita + ações */}
        <div className="flex items-center justify-end gap-6">
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Secundária">
            {navRight.map((link) => (
              <a key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-3">
            <button
              type="button"
              aria-label="Buscar"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-espresso transition hover:bg-espresso/5 sm:flex"
            >
              <Search />
            </button>
            <button
              type="button"
              aria-label="Minha conta"
              className="hidden h-9 w-9 items-center justify-center rounded-full text-espresso transition hover:bg-espresso/5 sm:flex"
            >
              <UserIcon />
            </button>
            <button
              type="button"
              aria-label={`Carrinho com ${count} ${count === 1 ? "item" : "itens"}`}
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-espresso transition hover:bg-espresso/5"
            >
              <CartIcon />
              <motion.span
                key={count}
                initial={reduceMotion ? false : { scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-blush px-1 text-[10px] font-medium text-espresso"
              >
                {count}
              </motion.span>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-espresso/30 backdrop-blur-sm"
            />
            <motion.nav
              aria-label="Menu mobile"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full w-[82%] max-w-sm flex-col bg-cream px-7 py-6"
            >
              <div className="flex items-center justify-between">
                <Logo className="text-3xl" />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Fechar menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-espresso transition hover:bg-espresso/5"
                >
                  <Close className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-12 flex flex-col gap-1">
                <NavLinks
                  onNavigate={() => setMenuOpen(false)}
                  className="display border-b border-espresso/10 py-4 text-3xl transition hover:pl-2"
                />
              </div>

              <p className="eyebrow mt-auto text-espresso/50">
                Skincare de verdade
                <br />
                entre amigas.
              </p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
