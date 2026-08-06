import Link from "next/link";
import { ArrowLeft, ArrowRight, Flame, Lock, ShieldCheck } from "lucide-react";
import type { CheckoutConfig } from "@/lib/checkout";

export function CheckoutCard({ config }: { config: CheckoutConfig }) {
  const hasUrl = Boolean(config.url);
  const envVarName =
    config.plan === "founder"
      ? "NEXT_PUBLIC_FOUNDER_CHECKOUT_URL"
      : "NEXT_PUBLIC_AGENCY_CHECKOUT_URL";

  return (
    <main className="container flex min-h-screen flex-col items-center justify-center py-20">
      <div className="w-full max-w-lg rounded-2xl border border-bg-border bg-bg-card/70 p-8 shadow-card">
        <div className="mb-5 flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ember-gradient">
            <Flame className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">
              {config.name}
            </div>
            <div className="text-lg font-semibold text-ink">{config.price}</div>
          </div>
        </div>

        {hasUrl ? (
          <>
            <h1 className="text-2xl font-bold tracking-tight text-ink">
              You're one click from being a founder user.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              We use an external secure checkout (Stripe / Gumroad) so we
              never touch your card details directly. After payment you'll be
              redirected back to a welcome page.
            </p>
            <a
              href={config.url}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ember-gradient px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(245,90,31,0.7)] transition hover:brightness-105"
            >
              <Lock className="h-4 w-4" />
              Continue to secure checkout
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 flex items-center justify-center gap-2 text-[11px] text-ink-faint">
              <ShieldCheck className="h-3 w-3 text-success" />
              No subscription. One-time payment. Lifetime access.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold tracking-tight text-ink">
              Checkout link not configured yet
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              This page is wired up, but no payment URL has been set for the{" "}
              <span className="text-ember-300">{config.name}</span> plan yet.
              Set the env var{" "}
              <code className="rounded bg-bg-soft px-1.5 py-0.5 text-[12px] text-ember-200">
                {envVarName}
              </code>{" "}
              to a Stripe Payment Link or Gumroad URL and redeploy — this
              page will then route customers straight to checkout.
            </p>
            <p className="mt-4 rounded-lg border border-bg-border bg-bg-soft/60 p-3 text-[11px] text-ink-muted">
              Tip: see <code className="text-ember-200">LAUNCH_CHECKLIST.md</code>{" "}
              for the full launch flow.
            </p>
          </>
        )}

        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-sm text-ink-soft transition hover:text-ember-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to landing
        </Link>
      </div>
    </main>
  );
}
