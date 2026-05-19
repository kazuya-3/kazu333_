"use client";

import { useRef, useState } from "react";
import { Cpu, ShieldCheck, Sparkles, Zap } from "lucide-react";

import { ScheduleForm } from "@/components/ScheduleForm";
import { SchedulePreview } from "@/components/SchedulePreview";
import { DownloadButton } from "@/components/DownloadButton";
import {
  DEFAULT_SCHEDULE,
  DEFAULT_STREAMER_NAME,
  DEFAULT_TAGLINE,
  type ScheduleEntry,
} from "@/lib/schedule";

const DEFAULT_WEEK_LABEL = "WEEK 21 // MAY 19 — MAY 25";

export default function HomePage() {
  const [streamerName, setStreamerName] = useState<string>(DEFAULT_STREAMER_NAME);
  const [tagline, setTagline] = useState<string>(DEFAULT_TAGLINE);
  const [weekLabel, setWeekLabel] = useState<string>(DEFAULT_WEEK_LABEL);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(DEFAULT_SCHEDULE);

  const previewRef = useRef<HTMLDivElement | null>(null);

  const updateScheduleEntry = (index: number, patch: Partial<ScheduleEntry>) => {
    setSchedule((prev) =>
      prev.map((entry, i) => (i === index ? { ...entry, ...patch } : entry))
    );
  };

  return (
    <main className="relative min-h-screen">
      {/* Top navigation / brand bar */}
      <header className="border-b border-cyan-500/15 bg-slate-950/40 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-md border border-cyan-300/60 bg-gradient-to-br from-cyan-500/30 to-blue-700/20 shadow-neon">
              <Zap className="h-5 w-5 text-cyber-neon" />
              <span className="absolute -bottom-1 -right-1 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.9)]" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-lg font-black tracking-[0.25em] text-cyber-neon">
                SCHED<span className="text-white">//</span>GEN
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-200/60">
                Cyberpunk Schedule Generator
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-5 font-mono text-xs uppercase tracking-[0.28em] text-cyan-200/70 md:flex">
            <span className="flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5" /> Live Preview
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> Glass UI
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> No Signup
            </span>
          </nav>
        </div>
      </header>

      <section className="container py-8 lg:py-12">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-cyan-300/80">
              // SNS Promotion Toolkit
            </p>
            <h1 className="mt-2 font-display text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              <span className="text-gradient-cyber">週間スケジュール</span>
              <span className="text-white">を、</span>
              <br className="sm:hidden" />
              <span className="text-white">一瞬で。</span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-cyan-100/70">
              テキストを入れるだけで、配信者向けのサイバーパンクなスケジュール画像が完成。
              SNS告知に貼って、視聴者を呼び込もう。
            </p>
          </div>
          <div className="flex items-center gap-2 self-start rounded-sm border border-cyan-400/30 bg-slate-950/40 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-200/80 sm:self-auto">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.9)]" />
            session // v0.1 alpha
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-8">
          {/* Left pane — Input */}
          <div className="order-2 lg:order-1">
            <ScheduleForm
              streamerName={streamerName}
              tagline={tagline}
              weekLabel={weekLabel}
              schedule={schedule}
              onStreamerNameChange={setStreamerName}
              onTaglineChange={setTagline}
              onWeekLabelChange={setWeekLabel}
              onScheduleChange={updateScheduleEntry}
            />
          </div>

          {/* Right pane — Preview */}
          <div className="order-1 space-y-4 lg:order-2 lg:sticky lg:top-6 lg:self-start">
            <div className="glass-strong corner-frame relative overflow-hidden p-3">
              <div className="mb-2 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.9)]" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-200/80">
                    Preview // 16:9 / 1280×720 推奨
                  </p>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-200/60">
                  REAL-TIME
                </p>
              </div>

              <div className="scanline-overlay overflow-hidden rounded-sm border border-cyan-400/30">
                <SchedulePreview
                  ref={previewRef}
                  streamerName={streamerName}
                  tagline={tagline}
                  weekLabel={weekLabel}
                  schedule={schedule}
                />
              </div>
            </div>

            <DownloadButton targetRef={previewRef} />

            <p className="text-center font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-200/50">
              無料プランでは画像右下に小さな透かしが入ります
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-cyan-500/15 bg-slate-950/40 py-6">
        <div className="container flex flex-col items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-200/50 sm:flex-row">
          <span>© SCHED//GEN — built in a day</span>
          <span>Cyberpunk Blue / Structure &amp; Strength</span>
        </div>
      </footer>
    </main>
  );
}
