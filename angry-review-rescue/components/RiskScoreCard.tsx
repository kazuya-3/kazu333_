import { cn } from "@/lib/utils";
import { ShieldAlert, Repeat, Heart } from "lucide-react";

type Variant = "defensive" | "generic" | "trust";

interface Props {
  variant: Variant;
  score: number;
}

const META: Record<
  Variant,
  { label: string; description: string; icon: React.ComponentType<{ className?: string }>; goodIsLow: boolean }
> = {
  defensive: {
    label: "Defensive risk",
    description: "How likely a rushed reply sounds defensive to readers.",
    icon: ShieldAlert,
    goodIsLow: true,
  },
  generic: {
    label: "Generic reply risk",
    description: "How likely the reply reads as a copy-paste template.",
    icon: Repeat,
    goodIsLow: true,
  },
  trust: {
    label: "Future customer trust",
    description: "How much a future customer will trust your reply.",
    icon: Heart,
    goodIsLow: false,
  },
};

function toneFor(score: number, goodIsLow: boolean) {
  const good = goodIsLow ? score < 35 : score >= 75;
  const mid = goodIsLow ? score < 65 : score >= 55;
  if (good)
    return {
      color: "text-success",
      bar: "bg-success",
      ring: "ring-success/30",
      pill: "border-success/30 bg-success/10 text-success",
    };
  if (mid)
    return {
      color: "text-warning",
      bar: "bg-warning",
      ring: "ring-warning/30",
      pill: "border-warning/30 bg-warning/10 text-warning",
    };
  return {
    color: "text-danger",
    bar: "bg-danger",
    ring: "ring-danger/30",
    pill: "border-danger/30 bg-danger/10 text-danger",
  };
}

function gradeFor(score: number, goodIsLow: boolean) {
  if (goodIsLow) {
    if (score < 35) return "Low";
    if (score < 65) return "Watch out";
    return "High";
  }
  if (score >= 75) return "Strong";
  if (score >= 55) return "Okay";
  return "Weak";
}

export function RiskScoreCard({ variant, score }: Props) {
  const meta = META[variant];
  const tone = toneFor(score, meta.goodIsLow);
  const Icon = meta.icon;
  const grade = gradeFor(score, meta.goodIsLow);

  return (
    <div className="rounded-2xl border border-bg-border bg-bg-card/70 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg bg-bg-soft ring-1",
              tone.ring,
            )}
          >
            <Icon className={cn("h-4 w-4", tone.color)} />
          </span>
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-ink-muted">
              {meta.label}
            </div>
            <div className={cn("text-lg font-bold tracking-tight", tone.color)}>
              {score}
              <span className="ml-1 text-xs font-medium text-ink-faint">
                / 100
              </span>
            </div>
          </div>
        </div>
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
            tone.pill,
          )}
        >
          {grade}
        </span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-bg-soft">
        <div
          className={cn("h-full rounded-full transition-all duration-700", tone.bar)}
          style={{ width: `${Math.max(4, score)}%` }}
        />
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-muted">
        {meta.description}
      </p>
    </div>
  );
}
