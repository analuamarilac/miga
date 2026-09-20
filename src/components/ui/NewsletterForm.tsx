"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Check } from "@/components/art/Icons";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Variant = "inline" | "stacked";

type NewsletterFormProps = {
  /** "inline" = botão com rótulo ao lado; "stacked" = botão só com seta. */
  variant?: Variant;
  submitLabel?: string;
  className?: string;
};

/**
 * Formulário de captação de e-mail.
 * Sem backend — valida no cliente e mostra o estado de sucesso, o suficiente
 * para demonstrar o fluxo neste estudo de caso.
 */
export function NewsletterForm({
  variant = "inline",
  submitLabel = "Entrar para o clube",
  className = "",
}: NewsletterFormProps) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.p
            key="sucesso"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-md border border-espresso/20 bg-cream/70 px-4 py-3.5 text-sm"
            role="status"
          >
            <Check className="h-4 w-4 shrink-0" />
            Pronto, miga! Agora é só ficar de olho no e-mail.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={false}
            exit={{ opacity: 0 }}
            className="flex items-stretch gap-2 rounded-md border border-espresso/25 bg-cream/70 p-1 transition-colors focus-within:border-espresso"
          >
            <label htmlFor={inputId} className="sr-only">
              Seu e-mail
            </label>
            <input
              id={inputId}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status === "error") setStatus("idle");
              }}
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? `${inputId}-erro` : undefined}
              className="min-w-0 flex-1 bg-transparent px-3.5 py-2.5 text-sm text-espresso placeholder:text-espresso/45 focus:outline-none"
            />
            <button
              type="submit"
              className="group flex shrink-0 items-center gap-2 rounded-[4px] bg-espresso px-4 py-2.5 text-[0.8125rem] text-cream transition-colors hover:bg-espresso-soft"
            >
              {variant === "inline" && submitLabel}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              {variant === "stacked" && <span className="sr-only">{submitLabel}</span>}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {status === "error" && (
        <p id={`${inputId}-erro`} role="alert" className="mt-2 text-xs text-espresso/70">
          Confere o e-mail pra gente? Parece que faltou alguma coisa.
        </p>
      )}
    </div>
  );
}
