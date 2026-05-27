import { Eye, Repeat2, Sprout } from "lucide-react";
import { Badge } from "./ui/Badge";

const CARDS = [
  {
    icon: Eye,
    title: "Future customers read your replies",
    body: "Most people scroll past the bad review — but they stop and read what you wrote back. Your reply is the actual decision moment.",
  },
  {
    icon: Repeat2,
    title: "Generic replies can hurt trust",
    body: "“We're sorry you feel that way” reads as a copy-paste from someone who didn't care enough to read the review. It's worse than no reply at all.",
  },
  {
    icon: Sprout,
    title: "Bad reviews are recoverable",
    body: "Bad owner replies are harder to recover from. The review fades down the page; your defensive reply sits next to it forever.",
  },
];

export function WhyItMatters() {
  return (
    <section id="why" className="relative py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="ember" className="mb-4">
            Why it matters
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-ink md:text-4xl">
            The reply is the product future customers buy.
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {CARDS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-bg-border bg-bg-card/70 p-6"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-ember-500/10 blur-2xl transition-opacity group-hover:opacity-60"
              />
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ember-500/10 text-ember-300">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="text-lg font-semibold tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
