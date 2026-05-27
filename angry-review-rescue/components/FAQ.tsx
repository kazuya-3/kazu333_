"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/Badge";

const FAQS = [
  {
    q: "Does this post replies automatically?",
    a: "No. It only helps you write and copy better replies. You stay in full control of what gets posted, where, and when.",
  },
  {
    q: "Can I use this for Google reviews?",
    a: "Yes — you can paste a review from anywhere (Google, Yelp, Tripadvisor, Facebook), generate a reply, and copy it back into the platform manually.",
  },
  {
    q: "Does this create fake reviews?",
    a: "No. It only helps real businesses respond to real customer feedback. We will never add a fake-review feature.",
  },
  {
    q: "Is this legal advice?",
    a: "No. Angry Review Rescue is writing assistance, not legal advice. For threats, defamation, or anything legally serious, talk to a lawyer.",
  },
  {
    q: "Can agencies use it for clients?",
    a: "Yes. The Agency plan is designed for local SEO consultants and small marketing agencies handling reviews on behalf of multiple clients.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="ember" className="mb-4">
            FAQ
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Honest answers.
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl divide-y divide-bg-border/60 overflow-hidden rounded-2xl border border-bg-border bg-bg-card/70">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-white/[0.02]"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-ink md:text-base">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 flex-none text-ink-muted transition-transform",
                      isOpen && "rotate-180 text-ember-300",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden px-5 transition-all duration-300",
                    isOpen
                      ? "grid-rows-[1fr] pb-4 opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="min-h-0">
                    <p className="text-sm leading-relaxed text-ink-soft">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
