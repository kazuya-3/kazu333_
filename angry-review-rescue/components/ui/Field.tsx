import * as React from "react";
import { cn } from "@/lib/utils";

export function Label({
  children,
  htmlFor,
  hint,
  optional,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  hint?: string;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-baseline justify-between text-xs font-medium uppercase tracking-wider text-ink-muted"
    >
      <span>
        {children}
        {optional && (
          <span className="ml-1 text-[10px] font-normal text-ink-faint normal-case">
            (optional)
          </span>
        )}
      </span>
      {hint && (
        <span className="text-[10px] font-normal text-ink-faint normal-case">
          {hint}
        </span>
      )}
    </label>
  );
}

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...rest }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-bg-border bg-bg-soft/70 px-3.5 py-3 text-sm text-ink placeholder:text-ink-faint",
        "transition focus:outline-none focus:border-ember-400/50 focus:ring-2 focus:ring-ember-500/20",
        "min-h-[100px] resize-y leading-relaxed",
        className,
      )}
      {...rest}
    />
  );
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...rest }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          "w-full appearance-none rounded-xl border border-bg-border bg-bg-soft/70 px-3.5 py-2.5 pr-9 text-sm text-ink",
          "transition focus:outline-none focus:border-ember-400/50 focus:ring-2 focus:ring-ember-500/20",
          className,
        )}
        {...rest}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
});
