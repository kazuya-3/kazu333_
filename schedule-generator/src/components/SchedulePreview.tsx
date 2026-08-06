"use client";

import { forwardRef } from "react";
import { Cpu, Radio, Signal, Sparkles, Zap } from "lucide-react";

import type { ScheduleEntry } from "@/lib/schedule";

interface SchedulePreviewProps {
  streamerName: string;
  tagline: string;
  weekLabel: string;
  schedule: ScheduleEntry[];
  showWatermark?: boolean;
}

export const SchedulePreview = forwardRef<HTMLDivElement, SchedulePreviewProps>(
  function SchedulePreview(
    { streamerName, tagline, weekLabel, schedule, showWatermark = true },
    ref
  ) {
    return (
      <div
        ref={ref}
        className="relative aspect-[16/9] w-full overflow-hidden text-cyan-50"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(59,130,246,0.45), transparent 55%), radial-gradient(ellipse at bottom right, rgba(0,240,255,0.35), transparent 55%), linear-gradient(160deg, #020617 0%, #001233 55%, #0a2472 120%)",
        }}
      >
        {/* Grid background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.18) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 35%, transparent 80%)",
          }}
        />

        {/* Diagonal glow line */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-1/3 h-[2px] w-[160%] -rotate-[10deg]"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,240,255,0.6), transparent)",
            boxShadow: "0 0 24px rgba(0,240,255,0.45)",
          }}
        />

        {/* Corner brackets */}
        <CornerBrackets />

        <div className="relative flex h-full flex-col p-[3.2%]">
          {/* Header */}
          <header className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-cyan-300/50 bg-cyan-400/10 shadow-[0_0_18px_rgba(0,240,255,0.45)]">
                <Zap className="h-5 w-5 text-cyan-200" />
              </div>
              <div>
                <p className="font-display text-[10px] uppercase tracking-[0.4em] text-cyan-300/80">
                  WEEKLY BROADCAST SCHEDULE
                </p>
                <p className="mt-0.5 font-mono text-[10px] tracking-widest text-cyan-200/60">
                  {weekLabel || "WEEK // —"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-sm border border-cyan-300/40 bg-slate-950/40 px-2.5 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(0,240,255,0.9)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-200">
                LIVE / ONLINE
              </span>
            </div>
          </header>

          {/* Identity block */}
          <div className="mt-4 flex items-end justify-between gap-6">
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.4em] text-cyan-300/80">
                <Radio className="h-3 w-3" />
                STREAMER ID
              </p>
              <h1
                className="mt-1 truncate font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-none tracking-tight"
                style={{
                  background:
                    "linear-gradient(120deg, #ffffff 0%, #00f0ff 45%, #3b82f6 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 0 30px rgba(0,240,255,0.25)",
                }}
              >
                {streamerName || "—"}
              </h1>
              <p className="mt-1 inline-flex items-center gap-2 border-l-2 border-cyan-400/70 pl-2 font-mono text-sm text-cyan-100/90">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                <span className="truncate">{tagline || "TAGLINE //"}</span>
              </p>
            </div>

            <div className="hidden shrink-0 items-center gap-3 sm:flex">
              <DataChip label="CH" value="ONAIR" />
              <DataChip label="SYS" value="OK" />
              <DataChip label="LAT" value="08ms" />
            </div>
          </div>

          {/* Divider */}
          <div className="relative mt-3 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent">
            <span
              aria-hidden
              className="absolute -top-[3px] left-0 h-[7px] w-[7px] rotate-45 border border-cyan-300 bg-cyan-400/60 shadow-[0_0_10px_rgba(0,240,255,0.9)]"
            />
            <span
              aria-hidden
              className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 border border-cyan-300 bg-cyan-400/60 shadow-[0_0_10px_rgba(0,240,255,0.9)]"
            />
          </div>

          {/* Schedule grid */}
          <div className="mt-3 grid flex-1 grid-cols-7 gap-2">
            {schedule.map((entry) => {
              const Icon = entry.icon;
              const isOff = entry.time.trim().toUpperCase() === "OFF";
              return (
                <div
                  key={entry.key}
                  className="relative flex flex-col overflow-hidden rounded-sm border p-2"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(8,47,73,0.55) 0%, rgba(2,6,23,0.55) 100%)",
                    borderColor: isOff
                      ? "rgba(148,163,184,0.35)"
                      : "rgba(34,211,238,0.45)",
                    boxShadow: isOff
                      ? "inset 0 0 18px rgba(148,163,184,0.06)"
                      : "inset 0 0 20px rgba(0,240,255,0.08), 0 0 14px rgba(0,240,255,0.08)",
                  }}
                >
                  {/* Day header */}
                  <div className="flex items-baseline justify-between">
                    <span
                      className="font-display text-[11px] font-bold tracking-[0.25em]"
                      style={{ color: isOff ? "#94a3b8" : "#22d3ee" }}
                    >
                      {entry.labelEn}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-200/60">
                      {entry.labelJp}
                    </span>
                  </div>

                  <div className="my-1 h-px w-full bg-gradient-to-r from-cyan-400/40 to-transparent" />

                  <div className="flex items-center gap-1.5">
                    <Icon
                      className="h-3 w-3"
                      style={{ color: isOff ? "#94a3b8" : "#67e8f9" }}
                    />
                    <span
                      className="font-mono text-[13px] font-bold leading-none"
                      style={{
                        color: isOff ? "#cbd5e1" : "#ffffff",
                        textShadow: isOff
                          ? "none"
                          : "0 0 12px rgba(0,240,255,0.5)",
                      }}
                    >
                      {entry.time || "—"}
                    </span>
                  </div>

                  <p
                    className="mt-1.5 line-clamp-3 text-[11px] leading-snug"
                    style={{
                      color: isOff
                        ? "rgba(203,213,225,0.7)"
                        : "rgba(207,250,254,0.92)",
                    }}
                  >
                    {entry.title || "—"}
                  </p>

                  {/* Corner accent */}
                  <span
                    aria-hidden
                    className="absolute right-0 top-0 h-2 w-2"
                    style={{
                      background: isOff
                        ? "rgba(148,163,184,0.5)"
                        : "rgba(0,240,255,0.85)",
                      clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <footer className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/70">
            <div className="flex items-center gap-2">
              <Cpu className="h-3 w-3" />
              <span>SCHED//GEN v0.1</span>
            </div>
            <div className="flex items-center gap-2">
              <Signal className="h-3 w-3" />
              <span>FOLLOW &amp; SUBSCRIBE</span>
            </div>
          </footer>
        </div>

        {showWatermark && (
          <div className="pointer-events-none absolute bottom-2 right-3 select-none font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-200/40">
            generated by sched//gen — free tier
          </div>
        )}
      </div>
    );
  }
);

function DataChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-end rounded-sm border border-cyan-400/30 bg-slate-950/50 px-2 py-1 leading-none">
      <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-cyan-200/60">
        {label}
      </span>
      <span className="mt-0.5 font-mono text-[11px] font-bold text-cyan-200">
        {value}
      </span>
    </div>
  );
}

function CornerBrackets() {
  const armClass = "absolute h-5 w-5 border-cyan-300/80";
  return (
    <>
      <span aria-hidden className={`${armClass} left-2 top-2 border-l-2 border-t-2`} />
      <span
        aria-hidden
        className={`${armClass} right-2 top-2 border-r-2 border-t-2`}
      />
      <span
        aria-hidden
        className={`${armClass} bottom-2 left-2 border-b-2 border-l-2`}
      />
      <span
        aria-hidden
        className={`${armClass} bottom-2 right-2 border-b-2 border-r-2`}
      />
    </>
  );
}
