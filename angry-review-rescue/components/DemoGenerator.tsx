"use client";

import { useMemo, useState } from "react";
import {
  Sparkles,
  Wand2,
  Loader2,
  Check,
  X,
  Copy,
  MessageCircle,
  Eye,
  RotateCcw,
} from "lucide-react";
import { Label, Select, Textarea } from "./ui/Field";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { RiskScoreCard } from "./RiskScoreCard";
import { ReplyCard } from "./ReplyCard";
import { rescueReview, SAMPLE_REVIEW } from "@/lib/reviewLogic";
import type {
  BusinessType,
  RescueInput,
  RescueResult,
  StarRating,
  Tone,
} from "@/lib/types";
import { cn } from "@/lib/utils";

const BUSINESS_TYPES: BusinessType[] = [
  "Restaurant",
  "Cafe",
  "Salon",
  "Barber",
  "Dentist",
  "Hotel",
  "Home Service",
  "Other",
];

const TONES: Tone[] = [
  "Calm & Professional",
  "Warm & Human",
  "Firm but Respectful",
  "Short & Simple",
];

const EMPTY_FORM: RescueInput = {
  reviewText: "",
  rating: 1,
  businessType: "Restaurant",
  ownerContext: "",
  preferredTone: "Calm & Professional",
};

export function DemoGenerator() {
  const [form, setForm] = useState<RescueInput>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RescueResult | null>(null);

  const charCount = form.reviewText.length;
  const canSubmit = form.reviewText.trim().length >= 12 && !loading;

  function update<K extends keyof RescueInput>(key: K, value: RescueInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function loadSample() {
    setForm(SAMPLE_REVIEW);
    setResult(null);
  }

  function reset() {
    setForm(EMPTY_FORM);
    setResult(null);
  }

  function handleRescue() {
    if (!canSubmit) return;
    setLoading(true);
    setResult(null);
    // Fake analysis delay so it feels considered, not instant.
    window.setTimeout(() => {
      const r = rescueReview(form);
      setResult(r);
      setLoading(false);
      // Defer scrolling so the results render first.
      requestAnimationFrame(() => {
        document
          .getElementById("rescue-output")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }, 700);
  }

  const orderedReplies = useMemo(() => {
    if (!result) return [];
    const preferredId =
      form.preferredTone === "Warm & Human"
        ? "warm"
        : form.preferredTone === "Firm but Respectful"
          ? "firm"
          : "calm";
    return [...result.replies].sort((a, b) =>
      a.id === preferredId ? -1 : b.id === preferredId ? 1 : 0,
    );
  }, [result, form.preferredTone]);

  return (
    <section id="demo" className="relative py-16 md:py-24">
      <div className="container">
        <SectionHeader
          eyebrow="Live demo"
          title="Rescue your next bad review"
          subtitle="Paste a real review below. Everything runs locally in your browser — nothing is sent anywhere, and nothing is posted on your behalf."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_1.4fr]">
          <FormPanel
            form={form}
            update={update}
            loadSample={loadSample}
            reset={reset}
            handleRescue={handleRescue}
            canSubmit={canSubmit}
            loading={loading}
            charCount={charCount}
          />
          <OutputPanel
            result={result}
            loading={loading}
            replies={orderedReplies}
          />
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Badge tone="ember" className="mb-4">
        <Sparkles className="h-3 w-3" />
        {eyebrow}
      </Badge>
      <h2 className="text-balance text-3xl font-bold tracking-tight text-ink md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm text-ink-soft md:text-base">{subtitle}</p>
    </div>
  );
}

interface FormProps {
  form: RescueInput;
  update: <K extends keyof RescueInput>(k: K, v: RescueInput[K]) => void;
  loadSample: () => void;
  reset: () => void;
  handleRescue: () => void;
  canSubmit: boolean;
  loading: boolean;
  charCount: number;
}

function FormPanel({
  form,
  update,
  loadSample,
  reset,
  handleRescue,
  canSubmit,
  loading,
  charCount,
}: FormProps) {
  return (
    <div className="rounded-2xl border border-bg-border bg-bg-card/70 p-5 shadow-card md:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
          The review
        </h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={loadSample}>
            <Sparkles className="h-3.5 w-3.5" />
            Sample review
          </Button>
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <Label htmlFor="review" hint={`${charCount} chars`}>
            Review text
          </Label>
          <Textarea
            id="review"
            placeholder="Paste the customer's review here, word for word. Don't soften it — we work better with the real thing."
            value={form.reviewText}
            onChange={(e) => update("reviewText", e.target.value)}
            rows={6}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="rating">Star rating</Label>
            <Select
              id="rating"
              value={form.rating}
              onChange={(e) =>
                update("rating", Number(e.target.value) as StarRating)
              }
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {"★".repeat(n)}
                  {"☆".repeat(5 - n)} — {n} star{n > 1 ? "s" : ""}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="business">Business type</Label>
            <Select
              id="business"
              value={form.businessType}
              onChange={(e) =>
                update("businessType", e.target.value as BusinessType)
              }
            >
              {BUSINESS_TYPES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="context" optional>
            What actually happened
          </Label>
          <Textarea
            id="context"
            placeholder="Your side of the story. e.g. The kitchen was short-staffed that night and we comped their drinks but they left before we could refire the steak."
            value={form.ownerContext}
            onChange={(e) => update("ownerContext", e.target.value)}
            rows={3}
          />
          <p className="mt-1.5 text-[11px] text-ink-faint">
            Adding context drops the “generic reply” risk significantly.
          </p>
        </div>

        <div>
          <Label htmlFor="tone">Desired tone</Label>
          <Select
            id="tone"
            value={form.preferredTone}
            onChange={(e) => update("preferredTone", e.target.value as Tone)}
          >
            {TONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col-reverse items-stretch gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-ink-faint">
            Nothing posts anywhere. You stay in control.
          </p>
          <Button
            onClick={handleRescue}
            disabled={!canSubmit}
            className={cn("min-w-[200px]")}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Reading the review…
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4" />
                Rescue this review
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function OutputPanel({
  result,
  loading,
  replies,
}: {
  result: RescueResult | null;
  loading: boolean;
  replies: RescueResult["replies"];
}) {
  return (
    <div id="rescue-output" className="space-y-6">
      {loading && <LoadingState />}
      {!loading && !result && <EmptyState />}
      {!loading && result && (
        <div className="animate-fade-in-up space-y-6">
          <div className="grid gap-3 sm:grid-cols-3">
            <RiskScoreCard variant="defensive" score={result.scores.defensiveRisk} />
            <RiskScoreCard variant="generic" score={result.scores.genericRisk} />
            <RiskScoreCard variant="trust" score={result.scores.futureCustomerTrust} />
          </div>

          {result.detectedIssues.length > 0 && (
            <div className="rounded-2xl border border-bg-border bg-bg-card/70 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                <Eye className="h-3.5 w-3.5 text-ember-300" />
                Detected issues
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.detectedIssues.map((i) => (
                  <Badge key={i} tone="ember">
                    {i}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            {replies.map((r, idx) => (
              <ReplyCard key={r.id} reply={r} highlighted={idx === 0} />
            ))}
          </div>

          <RecoveryDMCard text={result.recoveryDM} />
          <FutureCustomerLens items={result.futureCustomerLens} />
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-bg-border bg-bg-card/40 p-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-ember-500/10 text-ember-300">
        <Wand2 className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-ink">
        Your rescued replies will appear here
      </h3>
      <p className="mt-2 max-w-sm text-sm text-ink-muted">
        Paste a review and we'll generate three reply variants, a recovery DM,
        and a future-customer trust check. Try the{" "}
        <span className="text-ember-300">Sample review</span> button to see it
        in action.
      </p>
      <ul className="mt-6 grid w-full max-w-md gap-2 text-left text-xs text-ink-soft">
        <li className="flex items-start gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-success" />
          Three tones to choose from
        </li>
        <li className="flex items-start gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-success" />
          A private follow-up DM you can copy
        </li>
        <li className="flex items-start gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 flex-none text-success" />
          A future-customer trust checklist
        </li>
      </ul>
    </div>
  );
}

function LoadingState() {
  const lines = [
    "Reading the review…",
    "Spotting heat words and specific complaints…",
    "Drafting three calm replies…",
    "Running the future-customer trust check…",
  ];
  return (
    <div className="rounded-2xl border border-bg-border bg-bg-card/70 p-8">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <Loader2 className="mb-4 h-6 w-6 animate-spin text-ember-300" />
        <h3 className="text-base font-semibold text-ink">
          Analyzing the review
        </h3>
        <p className="mt-2 text-sm text-ink-muted">
          Calmer replies in a moment.
        </p>
        <ul className="mt-6 w-full space-y-2 text-left">
          {lines.map((l) => (
            <li
              key={l}
              className="flex items-center gap-2 text-xs text-ink-soft"
            >
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ember-400" />
              </span>
              {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function RecoveryDMCard({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* noop */
    }
  }

  return (
    <div className="rounded-2xl border border-bg-border bg-bg-card/70 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <span className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg bg-ember-500/10 text-ember-300">
            <MessageCircle className="h-3.5 w-3.5" />
          </span>
          <div>
            <h4 className="text-sm font-semibold text-ink">
              Recovery DM (private follow-up)
            </h4>
            <p className="mt-0.5 text-xs text-ink-muted">
              For when you want to take the conversation off the public page.
            </p>
          </div>
        </div>
        <Button variant="secondary" size="sm" onClick={copy}>
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-success" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy DM
            </>
          )}
        </Button>
      </div>
      <div className="mt-3 rounded-xl border border-bg-border/70 bg-bg-soft/50 p-4">
        <p className="whitespace-pre-line text-sm leading-relaxed text-ink-soft">
          {text}
        </p>
      </div>
    </div>
  );
}

function FutureCustomerLens({
  items,
}: {
  items: { label: string; passes: boolean }[];
}) {
  const passes = items.filter((i) => i.passes).length;
  return (
    <div className="rounded-2xl border border-bg-border bg-bg-card/70 p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-ember-500/10 text-ember-300">
            <Eye className="h-3.5 w-3.5" />
          </span>
          <div>
            <h4 className="text-sm font-semibold text-ink">
              Future Customer Lens
            </h4>
            <p className="mt-0.5 text-xs text-ink-muted">
              How a stranger reading this reply will judge your business.
            </p>
          </div>
        </div>
        <span className="rounded-full border border-ember-500/30 bg-ember-500/10 px-2.5 py-0.5 text-xs font-semibold text-ember-300">
          {passes} / {items.length}
        </span>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((i) => (
          <li
            key={i.label}
            className="flex items-start gap-2 rounded-lg border border-bg-border/60 bg-bg-soft/40 p-3"
          >
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full",
                i.passes
                  ? "bg-success/15 text-success"
                  : "bg-danger/15 text-danger",
              )}
            >
              {i.passes ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
            </span>
            <span className="text-xs leading-relaxed text-ink-soft">
              {i.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
