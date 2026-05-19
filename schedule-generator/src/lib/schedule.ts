import { Calendar, Coffee, Flame, Gamepad2, Headphones, Music, Sparkles, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface ScheduleEntry {
  key: DayKey;
  labelJp: string;
  labelEn: string;
  time: string;
  title: string;
  icon: LucideIcon;
}

export const DEFAULT_STREAMER_NAME = "Nemutan";
export const DEFAULT_TAGLINE = "矢場杉ヤヴァイ";

export const DEFAULT_SCHEDULE: ScheduleEntry[] = [
  {
    key: "mon",
    labelJp: "月",
    labelEn: "MON",
    time: "21:00",
    title: "雑談 / アーカイブ振り返り",
    icon: Coffee,
  },
  {
    key: "tue",
    labelJp: "火",
    labelEn: "TUE",
    time: "22:00",
    title: "VALORANT ランクマ",
    icon: Gamepad2,
  },
  {
    key: "wed",
    labelJp: "水",
    labelEn: "WED",
    time: "OFF",
    title: "お休み（脳を再起動）",
    icon: Sparkles,
  },
  {
    key: "thu",
    labelJp: "木",
    labelEn: "THU",
    time: "21:30",
    title: "歌枠 / 新曲リクエスト",
    icon: Music,
  },
  {
    key: "fri",
    labelJp: "金",
    labelEn: "FRI",
    time: "23:00",
    title: "深夜ホラゲー実況",
    icon: Flame,
  },
  {
    key: "sat",
    labelJp: "土",
    labelEn: "SAT",
    time: "20:00",
    title: "コラボ配信 (ゲスト未定)",
    icon: Headphones,
  },
  {
    key: "sun",
    labelJp: "日",
    labelEn: "SUN",
    time: "13:00",
    title: "朝活 / 名古屋メシ巡り",
    icon: Sun,
  },
];

export const SCHEDULE_FALLBACK_ICON: LucideIcon = Calendar;
