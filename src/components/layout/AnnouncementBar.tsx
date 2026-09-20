"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { Close, Truck } from "@/components/art/Icons";
import { site } from "@/data/site";

const STORAGE_KEY = "miga:announcement-dismissed";

/**
 * A escolha vive fora do React para sobreviver a remontagens dentro da sessão.
 * O fallback em memória cobre navegação privada, onde sessionStorage lança.
 */
const listeners = new Set<() => void>();
let dismissedInMemory = false;

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  if (dismissedInMemory) return true;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

/** No servidor a barra sempre começa visível — evita divergência na hidratação. */
function getServerSnapshot() {
  return false;
}

function dismiss() {
  dismissedInMemory = true;
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* sem persistência, mas a barra fecha mesmo assim */
  }
  listeners.forEach((listener) => listener());
}

export function AnnouncementBar() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <AnimatePresence initial={false}>
      {!dismissed && (
        <motion.div
          initial={{ height: "auto" }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden bg-blush"
        >
          <div className="relative mx-auto flex max-w-[1600px] items-center justify-center px-12 py-2.5">
            <p className="eyebrow flex items-center gap-2 text-espresso">
              <Truck className="h-4 w-4" />
              {site.announcement}
            </p>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Fechar aviso"
              className="absolute right-4 flex h-7 w-7 items-center justify-center rounded-full text-espresso/70 transition hover:bg-espresso/10 hover:text-espresso"
            >
              <Close />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
