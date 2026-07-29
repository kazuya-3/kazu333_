/**
 * OGP 画像（public/og-image.png）と apple-touch-icon を生成します。
 *
 *   node scripts/generate-og.mjs
 *
 * サイト名やコピーを変えたあと、SNS 共有画像も揃えたいときに実行してください。
 * 生成物はリポジトリへコミットして構いません（ビルド時には実行されません）。
 *
 * ご自身でデザインした画像を使う場合は、このスクリプトを使わず
 * public/og-image.png を直接置き換えてください（推奨サイズ 1200×630）。
 */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public');

// ---- ここを変えると生成される画像の文言が変わります ----
const SITE_NAME = 'KAZU WORKS';
const HEADLINE = 'IT・資料・デザインの';
const HEADLINE2 = '“小さな困りごと”を、形にします。';
const SUB = 'システム修正 / データ整理 / 資料作成 / SNS素材 / AI活用';
const POINTS = ['平日夜・土日対応', '小規模案件歓迎', 'オンライン完結', '固定報酬'];

const FONT = 'IPAGothic, Noto Sans CJK JP, sans-serif';

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FBFAF8"/>
      <stop offset="55%" stop-color="#F1F6FE"/>
      <stop offset="100%" stop-color="#F3F0FE"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#5AA9E6"/>
      <stop offset="55%" stop-color="#8FA2EE"/>
      <stop offset="100%" stop-color="#A9A0F0"/>
    </linearGradient>
    <radialGradient id="glow1" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#5AA9E6" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#5AA9E6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#FF8A80" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#FF8A80" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow3" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#6FD6C4" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#6FD6C4" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="130" cy="90" r="300" fill="url(#glow1)"/>
  <circle cx="1120" cy="560" r="290" fill="url(#glow2)"/>
  <circle cx="1050" cy="80" r="240" fill="url(#glow3)"/>

  <rect x="0" y="0" width="1200" height="8" fill="url(#accent)"/>

  <!-- ロゴマーク -->
  <rect x="80" y="72" width="56" height="56" rx="16" fill="url(#accent)"/>
  <path d="M100 86v28M100 100l13-14M100 99.5l13 14.5" stroke="#fff" stroke-width="4.6"
        stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="124" cy="118" r="4" fill="#fff" opacity="0.9"/>
  <text x="152" y="112" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="bold"
        letter-spacing="3" fill="#1D2430">${escape(SITE_NAME)}</text>

  <!-- 見出し -->
  <text x="80" y="255" font-family="${FONT}" font-size="56" font-weight="bold" fill="#1D2430">${escape(
    HEADLINE,
  )}</text>
  <text x="80" y="335" font-family="${FONT}" font-size="56" font-weight="bold" fill="#2F7DE1">${escape(
    HEADLINE2,
  )}</text>

  <!-- サブ -->
  <text x="80" y="400" font-family="${FONT}" font-size="26" fill="#5A6478">${escape(SUB)}</text>

  <!-- 条件バッジ -->
  ${POINTS.map((label, i) => {
    const w = label.length * 22 + 44;
    const x = 80 + POINTS.slice(0, i).reduce((acc, p) => acc + p.length * 22 + 44 + 16, 0);
    return `<g>
      <rect x="${x}" y="470" width="${w}" height="52" rx="26" fill="#FFFFFF" opacity="0.9"
            stroke="#D8E2F0" stroke-width="1.5"/>
      <circle cx="${x + 24}" cy="496" r="5" fill="#5AA9E6"/>
      <text x="${x + 38}" y="505" font-family="${FONT}" font-size="21" fill="#5A6478">${escape(
        label,
      )}</text>
    </g>`;
  }).join('\n  ')}

  <text x="80" y="580" font-family="${FONT}" font-size="21" fill="#7C8698">見るだけでも、買うだけでも、相談だけでも。</text>
</svg>`;

const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5AA9E6"/>
      <stop offset="55%" stop-color="#8FA2EE"/>
      <stop offset="100%" stop-color="#A9A0F0"/>
    </linearGradient>
  </defs>
  <rect width="32" height="32" rx="7" fill="url(#g)"/>
  <path d="M10 9v14M10 16.5l7-7.5M10 16l7 7" stroke="#fff" stroke-width="2.4"
        stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="22.5" cy="22" r="2.2" fill="#fff" opacity="0.9"/>
</svg>`;

await mkdir(outDir, { recursive: true });

await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(resolve(outDir, 'og-image.png'));
await sharp(Buffer.from(iconSvg)).resize(180, 180).png().toFile(resolve(outDir, 'apple-touch-icon.png'));

console.log('生成しました: public/og-image.png, public/apple-touch-icon.png');
