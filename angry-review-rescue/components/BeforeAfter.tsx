import { ArrowRight, ThumbsDown, ThumbsUp } from "lucide-react";
import { Badge } from "./ui/Badge";

export function BeforeAfter() {
  return (
    <section id="before-after" className="relative py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="ember" className="mb-4">
            Before / After
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Same review.{" "}
            <span className="text-gradient-ember">Completely different</span>{" "}
            public impression.
          </h2>
          <p className="mt-3 text-sm text-ink-soft md:text-base">
            The customer wrote one review. Future customers will judge you on
            your reply.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
          <div className="rounded-2xl border border-danger/25 bg-danger/[0.05] p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-danger/10 text-danger">
                <ThumbsDown className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-danger/90">
                Defensive owner reply
              </span>
            </div>
            <p className="text-base leading-relaxed text-ink-soft">
              “We're sorry you feel that way, but that's not what happened.”
            </p>
            <ul className="mt-5 space-y-1.5 text-xs text-ink-muted">
              <li>• Implies the customer is lying</li>
              <li>• Conditional apology (“you feel that way”)</li>
              <li>• Gives future customers a reason not to come</li>
            </ul>
          </div>

          <div className="hidden items-center justify-center md:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-bg-border bg-bg-card text-ember-300">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>

          <div className="rounded-2xl border border-success/30 bg-success/[0.05] p-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/10 text-success">
                <ThumbsUp className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-success">
                Rescued reply
              </span>
            </div>
            <p className="text-base leading-relaxed text-ink">
              “Thank you for sharing this. We're sorry your visit didn't meet
              expectations. We take feedback about service seriously and would
              appreciate the chance to understand what happened. Please contact
              us directly so we can make this right.”
            </p>
            <ul className="mt-5 space-y-1.5 text-xs text-ink-muted">
              <li>• Apologizes without conditions</li>
              <li>• Acknowledges the specific issue (service)</li>
              <li>• Moves the heat off the public page</li>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-ink-faint">
          Same review. Completely different public impression.
        </p>
      </div>
    </section>
  );
}
