# SCHED//GEN — Cyberpunk Weekly Schedule Generator

配信者・クリエイター向け、SNS告知用の週間スケジュール画像を一瞬で生成するマイクロSaaSのベースです。

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui primitives (Button / Input / Card / Label / Textarea)
- lucide-react (icons)
- html-to-image (preview → PNG export)

## Design

- Theme: **Cyberpunk Blue** — deep dark mode + sapphire & neon cyan accents
- Style: **Structure & Strength** — geometric brackets, clip-path frames, glass surfaces, scanlines
- Glassmorphism on input panels, neon glow on the primary CTA

## Layout

- Left pane: streamer identity + Mon–Sun schedule inputs
- Right pane: live 16:9 preview that reflects every keystroke
- Below the preview: prominent "画像をダウンロード（無料/透かし入り）" button

## Getting started

```bash
cd schedule-generator
npm install
npm run dev
```

Then open http://localhost:3000.

## State

Single-file `useState` only — no DB, no Zustand. Easy to extend later.
