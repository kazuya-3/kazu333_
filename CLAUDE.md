# KAZU WORKS — プロジェクトの手引き

AIアシスタント（Cursor / Claude Code など）と、初めてこのリポジトリを触る人のためのメモです。

## これは何か

個人の受注窓口・ポートフォリオ・簡易ショップを 1 つにまとめた日本語サイトです。
GitHub Pages で公開しています（<https://kazuya-3.github.io/kazu333_/>）。

- **Astro 5** の静的サイト。サーバーは持ちません
- インタラクションが要る 2 か所だけ **Preact island**（簡易見積もり・問い合わせフォーム）
- CSS はプレーン。デザイントークンは `src/styles/tokens.css` に集約
- 公開は `main` への push で自動（`.github/workflows/deploy.yml`）

## よく使うコマンド

```bash
npm install       # 最初の1回
npm run dev       # 開発サーバー（http://localhost:4321/kazu333_/）
npm run cms       # 管理画面つきで起動（/admin/ から編集）
npm run build     # 型チェック + 本番ビルド
npm run preview   # ビルド結果の確認
npm run check     # 型チェックのみ
```

## どこを触ればよいか

| やりたいこと | 触る場所 |
| --- | --- |
| 実績・商品の追加や修正 | 管理画面 `/admin/`、または `src/data/works/*.json` `src/data/products/*.json` |
| ページの文言 | `src/data/*.json`（site / services / flow / about / faq / contact / support / legal） |
| 色・余白・影・角丸 | `src/styles/tokens.css` **だけ** |
| 料金・見積もりルール | `src/config/pricing.ts` **だけ**（計算は `src/lib/estimate.ts` の純関数） |
| 問い合わせの送信先 | `.env`（`src/lib/contact/` のアダプターを切り替え） |
| ページの追加 | `src/pages/` |

## 構造の約束ごと

これらを守ると、既存の作りと噛み合います。

1. **内容とコードを混ぜない。**
   文章・実績・商品は `src/data/*.json` に置きます。`src/config/*.ts` は JSON に型を付けて
   画面へ渡すだけの薄い層です。ここに文章を直接書かないでください
   （管理画面から編集できなくなります）。

2. **内部リンクは必ず `url()` を通す。**
   `src/lib/url.ts` の `url('/works')` を使います。公開先が
   サブディレクトリ（`/kazu333_`）のため、素の `href="/works"` は壊れます。

3. **画像は `src/assets/` に置き、JSON からはパス文字列で参照する。**
   `src/lib/images.ts` が `import.meta.glob` で実体へ解決し、
   ビルド時に webp 変換と複数サイズ書き出しが行われます。
   `public/` に画像を置くと最適化されません。

4. **色をベタ書きしない。** `var(--c-blue)` のようにトークンを使います。

5. **金額の分岐を画面に書かない。** 料率は `pricing.ts`、計算は `estimate.ts` の
   `calculateEstimate()` 1 つに閉じています。

6. **依存を増やさない。** 本番依存は `astro` / `@astrojs/preact` / `@astrojs/sitemap` /
   `preact` の 4 つだけです。CSS フレームワークやアニメーションライブラリは入れていません。

7. **`prefers-reduced-motion` を尊重する。** 動きを足すときは必ず無効化の分岐を入れます。

## 気をつけること

- **法的ページ（`src/data/legal.json`）は雛形です。** 氏名・住所・電話番号は空のままで、
  画面に「要入力」と出ます。**勝手に埋めないでください。**
- **実績・商品は差し替え前提のサンプルです。** 実在企業の情報は載せません。
- `PUBLIC_` で始まる環境変数はブラウザから見えます。秘密鍵を入れないでください。
- 管理画面の本体（`public/admin/sveltia-cms.js`）はコミット対象外です。
  `npm install` 後、dev / build 時に `scripts/sync-cms.mjs` が自動で用意します。

## 変更したら確認すること

```bash
npm run build     # 型エラーとビルドの確認（これが通らないと公開されません）
```

見た目を変えたときは、狭い画面（360px）で横スクロールが出ていないかも見てください。

## 詳しい手順

- 運用まわり全般 … `README.md`
- パソコンでの開き方 … `docs/local-setup.md`
- 設計の意図 … `docs/implementation-plan.md`
- デザイントークン … `docs/design-tokens.md`
- 今後の拡張候補 … `docs/roadmap.md`
