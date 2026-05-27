import Link from "next/link";
import { Flame } from "lucide-react";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-bg-border/60 bg-bg/80 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between">
        <Link href="#top" className="group flex items-center gap-2">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-ember-gradient shadow-[0_0_24px_-6px_rgba(245,90,31,0.7)]">
            <Flame className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-sm font-semibold tracking-tight text-ink">
            Angry Review Rescue
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm text-ink-soft md:flex">
          <a href="#demo" className="btn-ghost">
            Demo
          </a>
          <a href="#why" className="btn-ghost">
            Why it matters
          </a>
          <a href="#free-rescue" className="btn-ghost">
            Free rescue
          </a>
          <a href="#pricing" className="btn-ghost">
            Pricing
          </a>
          <a href="#faq" className="btn-ghost">
            FAQ
          </a>
        </nav>
        <a href="#pricing" className="btn-primary !px-4 !py-2 text-xs">
          Get Founder Deal
        </a>
      </div>
    </header>
  );
}
