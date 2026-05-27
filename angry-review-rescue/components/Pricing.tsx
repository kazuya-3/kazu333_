import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/Badge";

interface Plan {
  name: string;
  price: string;
  priceSuffix?: string;
  description: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
}

// NOTE: Replace these placeholder URLs with real Stripe Payment Links or
// Gumroad checkout URLs before launch.
const PLANS: Plan[] = [
  {
    name: "Free",
    price: "$0",
    description: "Try the tool. See if calmer replies feel different.",
    features: [
      "3 review rescues",
      "1 business type",
      "Copy replies",
      "No account required",
    ],
    ctaLabel: "Start free",
    ctaHref: "#demo",
  },
  {
    name: "Founder Lifetime",
    price: "$19",
    priceSuffix: "one-time",
    description:
      "For one business owner who never wants to rage-reply again.",
    features: [
      "Unlimited review rescues",
      "All business types",
      "Negative review mode",
      "Recovery DM generator",
      "Future Customer Lens",
      "CSV export (coming soon)",
    ],
    ctaLabel: "Get Founder Deal",
    ctaHref: "/checkout/founder",
    highlighted: true,
  },
  {
    name: "Agency Lifetime",
    price: "$49",
    priceSuffix: "one-time",
    description:
      "For local SEO consultants and small marketing agencies.",
    features: [
      "Everything in Founder",
      "10 client profiles (coming soon)",
      "White-label copy mode (coming soon)",
      "Bulk review paste (coming soon)",
      "Client-ready response report (coming soon)",
    ],
    ctaLabel: "Get Agency Deal",
    ctaHref: "/checkout/agency",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="ember" className="mb-4">
            Pricing
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-ink md:text-4xl">
            One-time prices.{" "}
            <span className="text-gradient-ember">Lifetime use.</span>
          </h2>
          <p className="mt-3 text-sm text-ink-soft md:text-base">
            No subscriptions. Pay once, keep using it as long as the product
            exists.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-ink-faint">
          Prices in USD. No auto-posting to any review platform.
        </p>
      </div>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border bg-bg-card/70 p-6",
        plan.highlighted
          ? "border-ember-500/50 shadow-glow"
          : "border-bg-border",
      )}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ember-gradient px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white shadow-[0_8px_20px_-8px_rgba(245,90,31,0.7)]">
          Most popular
        </span>
      )}
      <div className="mb-1 text-sm font-semibold uppercase tracking-wider text-ink-muted">
        {plan.name}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-4xl font-bold tracking-tight text-ink">
          {plan.price}
        </span>
        {plan.priceSuffix && (
          <span className="text-xs text-ink-muted">{plan.priceSuffix}</span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {plan.description}
      </p>
      <ul className="mt-5 flex-1 space-y-2.5">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink-soft">
            <Check className="mt-0.5 h-4 w-4 flex-none text-success" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={plan.ctaHref}
        className={cn(
          "mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition",
          plan.highlighted
            ? "bg-ember-gradient text-white shadow-[0_10px_30px_-10px_rgba(245,90,31,0.7)] hover:brightness-105"
            : "border border-bg-border bg-white/[0.04] text-ink hover:bg-white/[0.08]",
        )}
      >
        {plan.ctaLabel}
      </a>
    </div>
  );
}
