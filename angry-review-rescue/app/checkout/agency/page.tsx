import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// NOTE: Replace this placeholder page with a redirect to a real
// Stripe Payment Link or Gumroad URL when ready.

export default function AgencyCheckoutPlaceholder() {
  return (
    <main className="container flex min-h-screen flex-col items-center justify-center py-20 text-center">
      <div className="rounded-2xl border border-bg-border bg-bg-card/70 p-8 max-w-lg">
        <h1 className="text-2xl font-bold text-ink">Checkout placeholder</h1>
        <p className="mt-3 text-sm text-ink-soft">
          This is where the <span className="text-ember-300">Agency Lifetime ($49)</span>{" "}
          checkout will live. Wire it up to a Stripe Payment Link or Gumroad
          URL before launch.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 text-sm text-ember-300 hover:text-ember-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to landing
        </Link>
      </div>
    </main>
  );
}
