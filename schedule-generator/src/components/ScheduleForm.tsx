"use client";

import { Cpu, Hash, Radio, Signal } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ScheduleEntry } from "@/lib/schedule";

interface ScheduleFormProps {
  streamerName: string;
  tagline: string;
  weekLabel: string;
  schedule: ScheduleEntry[];
  onStreamerNameChange: (value: string) => void;
  onTaglineChange: (value: string) => void;
  onWeekLabelChange: (value: string) => void;
  onScheduleChange: (index: number, patch: Partial<ScheduleEntry>) => void;
}

export function ScheduleForm({
  streamerName,
  tagline,
  weekLabel,
  schedule,
  onStreamerNameChange,
  onTaglineChange,
  onWeekLabelChange,
  onScheduleChange,
}: ScheduleFormProps) {
  return (
    <div className="space-y-6">
      <div className="glass clip-cyber corner-frame relative p-5">
        <div className="mb-4 flex items-center gap-2">
          <Radio className="h-4 w-4 text-cyber-neon" />
          <h2 className="font-display text-sm uppercase tracking-[0.32em] text-cyber-neon">
            Identity // 配信者プロフィール
          </h2>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label
              htmlFor="streamer-name"
              className="text-xs uppercase tracking-widest text-cyan-200/80"
            >
              <span className="flex items-center gap-1.5">
                <Signal className="h-3 w-3" />
                Streamer Name / 配信者名
              </span>
            </Label>
            <Input
              id="streamer-name"
              value={streamerName}
              placeholder="e.g. Nemutan"
              onChange={(e) => onStreamerNameChange(e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label
              htmlFor="tagline"
              className="text-xs uppercase tracking-widest text-cyan-200/80"
            >
              <span className="flex items-center gap-1.5">
                <Hash className="h-3 w-3" />
                Tagline / キャッチコピー
              </span>
            </Label>
            <Input
              id="tagline"
              value={tagline}
              placeholder="例: 矢場杉ヤヴァイ"
              onChange={(e) => onTaglineChange(e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label
              htmlFor="week-label"
              className="text-xs uppercase tracking-widest text-cyan-200/80"
            >
              <span className="flex items-center gap-1.5">
                <Cpu className="h-3 w-3" />
                Week Label / 週ラベル
              </span>
            </Label>
            <Input
              id="week-label"
              value={weekLabel}
              placeholder="例: WEEK 21 // MAY 19 — MAY 25"
              onChange={(e) => onWeekLabelChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="glass clip-cyber corner-frame relative p-5">
        <div className="mb-4 flex items-center gap-2">
          <Cpu className="h-4 w-4 text-cyber-neon" />
          <h2 className="font-display text-sm uppercase tracking-[0.32em] text-cyber-neon">
            Weekly Schedule // 週間スケジュール
          </h2>
        </div>

        <div className="space-y-3">
          {schedule.map((entry, index) => {
            const Icon = entry.icon;
            return (
              <div
                key={entry.key}
                className="group grid grid-cols-[44px_88px_1fr] items-center gap-2 rounded-md border border-cyan-500/15 bg-slate-950/40 p-2.5 transition-colors hover:border-cyan-400/40 hover:bg-slate-950/60"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-cyan-400/30 bg-gradient-to-br from-cyan-500/15 to-blue-700/10 text-cyber-neon shadow-neon-sm">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-xs font-bold tracking-widest text-cyber-neon">
                    {entry.labelEn}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-cyan-200/60">
                    {entry.labelJp}曜日
                  </span>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-2">
                  <Input
                    aria-label={`${entry.labelEn} time`}
                    value={entry.time}
                    placeholder="21:00"
                    onChange={(e) =>
                      onScheduleChange(index, { time: e.target.value })
                    }
                    className="h-9 text-center font-mono text-sm"
                  />
                  <Input
                    aria-label={`${entry.labelEn} title`}
                    value={entry.title}
                    placeholder="配信タイトル"
                    onChange={(e) =>
                      onScheduleChange(index, { title: e.target.value })
                    }
                    className="h-9"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
