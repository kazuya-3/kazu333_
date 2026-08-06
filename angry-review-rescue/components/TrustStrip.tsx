import {
  AlertCircle,
  BadgeCheck,
  Ban,
  Lock,
  ScrollText,
  ShieldCheck,
} from "lucide-react";

const ITEMS = [
  { icon: Lock, label: "No auto-posting" },
  { icon: Ban, label: "No fake reviews" },
  { icon: ShieldCheck, label: "No review manipulation" },
  { icon: BadgeCheck, label: "Writing assistance only" },
  { icon: ScrollText, label: "Not legal advice" },
  { icon: AlertCircle, label: "Not affiliated with Google, Yelp, or Tripadvisor" },
];

export function TrustStrip() {
  return (
    <section className="relative py-8">
      <div className="container">
        <div className="rounded-2xl border border-bg-border bg-bg-card/60 px-4 py-4 md:px-6">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-ink-muted md:text-xs">
            {ITEMS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-1.5">
                <Icon className="h-3 w-3 text-ember-300" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
