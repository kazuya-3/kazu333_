import { Building2, Scissors, Search, UtensilsCrossed } from "lucide-react";
import { Badge } from "./ui/Badge";

const AUDIENCES = [
  {
    icon: UtensilsCrossed,
    title: "Restaurant owners",
    body: "When a busy night turns into a 1-star review the next morning, the reply you write before coffee is the one future diners read.",
  },
  {
    icon: Scissors,
    title: "Salons and barber shops",
    body: "Personal services attract personal complaints. The tone of your reply is the difference between recoverable and not.",
  },
  {
    icon: Search,
    title: "Local SEO consultants",
    body: "Drafting responses for clients is a billable task with a quality ceiling. Use Rescue as your house style guide.",
  },
  {
    icon: Building2,
    title: "Small marketing agencies",
    body: "Bring a consistent, calm voice to every client's review responses without the founder rewriting every reply by hand.",
  },
];

export function BuiltFor() {
  return (
    <section id="built-for" className="relative py-16 md:py-20">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <Badge tone="ember" className="mb-4">
            Built for
          </Badge>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Made for the people who actually answer the reviews.
          </h2>
          <p className="mt-3 text-sm text-ink-soft md:text-base">
            Local owners and the agencies who quietly carry their reputations
            on Google.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCES.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-bg-border bg-bg-card/70 p-5 transition hover:border-ember-500/40"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-ember-500/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100"
              />
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-ember-500/10 text-ember-300">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold text-ink">{title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                {body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] text-ink-faint">
          We don't publish customer testimonials until we have real ones to
          share. This page describes who the tool is for, not who's already
          using it.
        </p>
      </div>
    </section>
  );
}
