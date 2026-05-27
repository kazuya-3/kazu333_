import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Badge } from "./ui/Badge";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-radial-warm"
      />
      <div
        aria-hidden
        className="absolute left-1/2 top-[440px] -z-10 h-[300px] w-[900px] -translate-x-1/2 rounded-full bg-ember-500/10 blur-3xl"
      />

      <div className="container py-16 md:py-24 lg:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge tone="ember" className="mb-6">
            <Sparkles className="h-3 w-3" />
            For local business owners and agencies
          </Badge>

          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-ink md:text-6xl">
            Stop{" "}
            <span className="text-gradient-ember">rage-replying</span> to bad
            reviews.
          </h1>

          <p className="mt-5 max-w-2xl text-balance text-base text-ink-soft md:text-lg">
            Paste a 1-star review and get calm, human replies that make future
            customers trust your business — not the angry one in the review.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a href="#demo" className="btn-primary">
              Try the free demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#pricing" className="btn-secondary">
              Get Founder Deal
            </a>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-xs text-ink-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-success" />
            No auto-posting. No fake reviews. Just better public replies.
          </p>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="relative mx-auto mt-14 max-w-4xl md:mt-20">
      <div
        aria-hidden
        className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-[2rem] bg-gradient-to-b from-ember-500/15 via-transparent to-transparent blur-2xl"
      />
      <div className="grid gap-4 rounded-2xl border border-bg-border bg-bg-card/80 p-4 shadow-card md:grid-cols-2 md:p-6">
        <div className="rounded-xl border border-danger/20 bg-danger/[0.06] p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-danger/80">
            <span className="text-base text-danger">★</span> 1-star review
          </div>
          <p className="text-sm leading-relaxed text-ink-soft">
            “Worst dinner of the year. Waited 40 minutes for a cold steak, the
            waiter was rude, and they still charged us full price. Never
            again.”
          </p>
        </div>
        <div className="rounded-xl border border-success/25 bg-success/[0.05] p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-success">
            <ShieldCheck className="h-3.5 w-3.5" /> Rescued reply
          </div>
          <p className="text-sm leading-relaxed text-ink">
            “Thank you for taking the time to share this. We're genuinely sorry
            your visit didn't go the way it should have, especially the wait
            and how it was handled. Please reach out to us directly so we can
            understand what happened and make it right.”
          </p>
        </div>
      </div>
    </div>
  );
}
