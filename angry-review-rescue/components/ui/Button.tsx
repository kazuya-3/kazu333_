"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: false;
}

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "primary", size = "md", className, children, ...rest },
    ref,
  ) {
    const base =
      "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClass =
      variant === "primary"
        ? "text-white shadow-[0_10px_30px_-10px_rgba(245,90,31,0.7)] bg-ember-gradient hover:brightness-105"
        : variant === "secondary"
          ? "text-ink border border-bg-border bg-white/[0.04] hover:bg-white/[0.08] hover:border-[#3a3344]"
          : "text-ink-soft hover:text-white hover:bg-white/[0.04]";

    return (
      <button
        ref={ref}
        className={cn(base, sizes[size], variantClass, className)}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
