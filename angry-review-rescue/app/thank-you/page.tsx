import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Flame,
  HandHeart,
  Mail,
  MessageSquareQuote,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

// Set both checkout providers (Stripe / Gumroad) to redirect to this page
// after successful payment, e.g. https://angryreviewrescue.com/thank-you

// Update this to your real support address before launch.
const SUPPORT_EMAIL = "support@example.com";

export const metadata: Metadata = {
  title: "Thanks — you're a founder user | Angry Review Rescue",
  description:
    "Welcome to Angry Review Rescue. Here's how to get the most out of your founder access.",
  robots: { index: false, follow: false },
};

const HOW_TO_USE = [
  {
    icon: MessageSquareQuote,
    title: "Paste a bad review into the demo",
    body: "Use the real wording — don't soften it. The tool works best on the actual review.",
  },
  {
    icon: Wand2,
    title: "Pick a tone and generate replies",
    body: "Calm, Warm, or Firm but Respectful. Three variants every time, plus a private Recovery DM.",
  },
  {
    icon: Check,
    title: "Run the Future Customer Lens check",
    body: "It tells you whether the reply will help or hurt the next customer reading it. Tweak until 6/6.",
  },
  {
    icon: ArrowRight,
    title: "Copy the reply and post it manually",
    body: "We never auto-post. You stay in control of what goes on Google, Yelp, Tripadvisor, etc.",
  },
];

export default function ThankYouPage() {
  return (
    <main className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-ember-500/40 bg-bg-card/70 p-8 shadow-glow md:p-12">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ember-gradient shadow-[0_0_24px_-6px_rgba(245,90,31,0.7)]">
              <Flame className="h-5 w-5 text-white" strokeWidth={2.5} />
            </span>
            <Badge tone="ember">
              <Sparkles className="h-3 w-3" /> Founder access
            </Badge>
          </div>

          <h1 className="mt-6 text-balance text-3xl font-bold tracking-tight text-ink md:text-5xl">
            Thanks for becoming a{" "}
            <span className="text-gradient-ember">founder user</span>.
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            You're early. That matters. The tool exists in roughly its current
            shape because of feedback from people like you, and the next few
            weeks of polish will be shaped by what you tell us is missing.
          </p>

          <a
            href="/#demo"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-ember-gradient px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(245,90,31,0.7)] transition hover:brightness-105"
          >
            Open the demo
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <section className="mt-12">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            How to use Angry Review Rescue
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {HOW_TO_USE.map(({ icon: Icon, title, body }, i) => (
              <div
                key={title}
                className="rounded-2xl border border-bg-border bg-bg-card/70 p-5"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ember-500/10 text-ember-300">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 overflow-hidden rounded-2xl border border-ember-500/30 bg-ember-500/[0.05] p-6 md:p-8">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-ember-gradient text-white">
              <HandHeart className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-ink md:text-xl">
                The founder promise
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Send us up to{" "}
                <span className="font-semibold text-ink">3 difficult reviews</span>{" "}
                during the founder period and we'll personally help refine the
                replies with you — real eyes, not just the tool. Forward the
                review, your draft reply, and any context to{" "}
                <a
                  href={`mailto:${SUPPORT_EMAIL}?subject=Founder%20rescue%20%E2%80%94%20help%20me%20refine%20this%20reply`}
                  className="text-ember-300 underline-offset-4 hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>{" "}
                and we'll get back to you within one business day.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-bg-border bg-bg-card/70 p-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-bg-soft text-ember-300">
              <Mail className="h-4 w-4" />
            </span>
            <div>
              <div className="text-sm font-semibold text-ink">Need help?</div>
              <div className="text-xs text-ink-muted">
                We answer founder emails first.
              </div>
            </div>
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-flex items-center gap-2 rounded-xl border border-bg-border bg-white/[0.04] px-4 py-2 text-sm font-semibold text-ink transition hover:bg-white/[0.08]"
          >
            {SUPPORT_EMAIL}
          </a>
        </section>

        <p className="mt-10 text-center">
          <Link
            href="/#demo"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ember-300 hover:text-ember-200"
          >
            Back to the demo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </main>
  );
}
