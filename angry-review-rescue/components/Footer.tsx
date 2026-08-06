import { Flame } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-bg-border/60 bg-bg-soft/40">
      <div className="container py-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ember-gradient">
                <Flame className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-sm font-semibold text-ink">
                Angry Review Rescue
              </span>
            </div>
            <p className="mt-2 text-xs text-ink-muted">
              Turn bad reviews into trust-building replies.
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
            <a href="#demo" className="hover:text-ink">
              Demo
            </a>
            <a href="#free-rescue" className="hover:text-ink">
              Free rescue
            </a>
            <a href="#pricing" className="hover:text-ink">
              Pricing
            </a>
            <a href="#faq" className="hover:text-ink">
              FAQ
            </a>
            <a
              href="mailto:support@example.com"
              className="hover:text-ink"
            >
              Support
            </a>
          </nav>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-ink-faint">
          <li>No auto-posting</li>
          <li aria-hidden>·</li>
          <li>No fake reviews</li>
          <li aria-hidden>·</li>
          <li>No review manipulation</li>
          <li aria-hidden>·</li>
          <li>Writing assistance only</li>
          <li aria-hidden>·</li>
          <li>Not legal advice</li>
        </ul>
        <p className="mt-3 max-w-3xl text-[11px] leading-relaxed text-ink-faint">
          Angry Review Rescue is not affiliated with Google, Yelp, Tripadvisor,
          or any review platform. This tool provides writing assistance only —
          it does not post replies on your behalf and it does not constitute
          legal advice. For threats, defamation, or any legally serious
          situation, consult a lawyer in your jurisdiction.
        </p>
        <p className="mt-3 text-[11px] text-ink-faint">
          © {year} Angry Review Rescue.
        </p>
      </div>
    </footer>
  );
}
