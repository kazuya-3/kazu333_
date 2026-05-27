import { ArrowRight, HandHeart, ShieldCheck } from "lucide-react";
import { Badge } from "./ui/Badge";

// Replace with your real support address when launching.
const SUPPORT_EMAIL = "support@example.com";
const MAILTO = `mailto:${SUPPORT_EMAIL}?subject=Free%20Review%20Rescue`;

export function FreeRescue() {
  return (
    <section id="free-rescue" className="relative py-16 md:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-ember-500/30 bg-bg-card/70 p-8 md:p-12">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ember-500/15 blur-3xl"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-ember-700/15 blur-3xl"
          />

          <div className="relative grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <Badge tone="ember" className="mb-4">
                <HandHeart className="h-3 w-3" />
                Founder-period offer
              </Badge>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-ink md:text-4xl">
                Want one bad review{" "}
                <span className="text-gradient-ember">rescued for free</span>?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
                Paste an anonymized bad review and we'll show how a calmer
                reply changes the public impression. No signup, no card, no
                follow-up sales pitch — we'll send back the rescued reply and
                a short note on why we made the choices we made.
              </p>
              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <a href={MAILTO} className="btn-primary">
                  Request a free rescue
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#demo" className="btn-secondary">
                  Or try it yourself
                </a>
              </div>
              <p className="mt-4 inline-flex items-center gap-2 text-[11px] text-ink-faint">
                <ShieldCheck className="h-3 w-3 text-success" />
                Please anonymize names and identifying details before sending.
              </p>
            </div>

            <div className="rounded-2xl border border-bg-border bg-bg-soft/50 p-5">
              <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                What you get back
              </div>
              <ul className="space-y-3 text-sm text-ink-soft">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-ember-400" />
                  Three reply variants tuned to your tone
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-ember-400" />
                  A private Recovery DM you can send the customer
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-ember-400" />
                  A short editor note on what to soften or sharpen
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-ember-400" />
                  Future Customer Lens score for your reply
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
