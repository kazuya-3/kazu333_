"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DownloadButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
  filename?: string;
}

export function DownloadButton({
  targetRef,
  filename = "weekly-schedule.png",
}: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!targetRef.current) return;
    setIsDownloading(true);
    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(targetRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#020617",
      });
      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export schedule image", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      size="xl"
      className="group relative w-full overflow-hidden border border-cyan-300/60 bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 font-display text-base font-bold uppercase tracking-[0.3em] text-slate-950 shadow-neon hover:from-cyan-400 hover:via-cyan-300 hover:to-blue-400"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      {isDownloading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Download className="h-5 w-5" />
      )}
      {isDownloading ? "Rendering..." : "画像をダウンロード"}
      <span className="ml-2 rounded-sm border border-slate-950/40 bg-slate-950/15 px-1.5 py-0.5 font-mono text-[10px] tracking-widest">
        FREE / 透かし入り
      </span>
    </Button>
  );
}
