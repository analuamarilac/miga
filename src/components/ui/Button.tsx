import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "@/components/art/Icons";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-md px-6 py-3.5 text-[0.8125rem] font-medium tracking-wide transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-espresso text-cream shadow-[0_1px_0_0_rgba(56,27,26,0.4)] hover:bg-espresso-soft hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-10px_rgba(56,27,26,0.7)]",
  outline:
    "border border-espresso/25 bg-transparent text-espresso hover:border-espresso hover:bg-espresso/5 hover:-translate-y-0.5",
  ghost: "px-0 py-1 text-espresso hover:opacity-70",
};

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: Variant;
  withArrow?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  withArrow = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {withArrow && (
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );
}

type LinkButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: Variant;
  withArrow?: boolean;
  children: ReactNode;
};

export function LinkButton({
  variant = "primary",
  withArrow = false,
  className = "",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {withArrow && (
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </a>
  );
}
