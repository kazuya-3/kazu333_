# KAZU WORKS

IT・資料・デザインの“小さな困りごと”を形にする、個人のオンライン事務所兼ポートフォリオ兼ショップです。

実績を見る / 対応できることを知る / 簡易見積もりを試す / 相談する / 完成済みの商品を買う / 活動を応援する
——これらを 1 つのサイトにまとめています。

- **技術構成**: Astro 5（静的生成）+ Preact islands + 素の CSS（デザイントークン）
- **JavaScript**: トップページは 0KB。見積もりウィザードと問い合わせフォームのみ島として読み込み（全島合計 約 62KB / gzip 約 22KB）
- **依存パッケージ**: `astro` / `@astrojs/preact` / `@astrojs/sitemap` / `preact` の 4 つだけ

---

## 目次

1. [開発環境の起動](#1-開発環境の起動)
2. [ビルドとプレビュー](#2-ビルドとプレビュー)
3. [デプロイ](#3-デプロイ)
4. [サイト名・プロフィールを変える](#4-サイト名プロフィールを変える)
5. [実績を追加する](#5-実績を追加する)
6. [商品を追加する](#6-商品を追加する)
7. [価格・見積もりルールを変える](#7-価格見積もりルールを変える)
8. [問い合わせフォームの送信先を設定する](#8-問い合わせフォームの送信先を設定する)
9. [決済リンク・応援リンクを設定する](#9-決済リンク応援リンクを設定する)
10. [OGP 画像を変える](#10-ogp-画像を変える)
11. [法的情報を変える](#11-法的情報を変える)
12. [本番公開前のチェックリスト](#12-本番公開前のチェックリスト)
13. [ディレクトリ構成](#13-ディレクトリ構成)

---

## 1. 開発環境の起動

必要なもの: Node.js 18.20 以上（推奨 20 以上）

```bash
npm install
npm run dev
```

`http://localhost:4321/kazu333_/` が開きます（ベースパスについては [3. デプロイ](#3-デプロイ) 参照）。

`.env` を用意しなくても、そのまま全ページが動きます。
問い合わせフォームは「モック送信」（実際には送らず成功扱い）になり、
購入・応援リンクは「準備中」表示になります。壊れたリンクは出ません。

---

## 2. ビルドとプレビュー

```bash
npm run build     # 型チェック（astro check）＋ 本番ビルド
npm run preview   # ビルド結果をローカルで確認
```

`npm run build` は `astro check` を含みます。型エラーがあるとビルドは止まります。
型チェックを飛ばしたいときは `npm run build:only` を使ってください。

出力先は `dist/` です。静的ファイルのみなので、任意のホスティングへそのまま置けます。

---

## 3. デプロイ

### 公開 URL とベースパスの設定

サイトの URL は環境変数 2 つで決まります（`astro.config.mjs` が読み取ります）。

| 変数 | 既定値 | 説明 |
| --- | --- | --- |
| `SITE_URL` | `https://kazuya-3.github.io` | オリジン（スキーム + ホスト） |
| `BASE_PATH` | `/kazu333_` | サブディレクトリ。ルート直下なら `/` |

**GitHub Pages（プロジェクトページ）の場合** — 既定値のままで動きます。

**独自ドメイン／Netlify／Vercel／Cloudflare Pages の場合** — `.env` に次を設定します。

```bash
SITE_URL=https://example.com
BASE_PATH=/
```

内部リンクはすべて `src/lib/url.ts` の `url()` を通しているため、
この 2 つを変えるだけでサイト全体のリンク・sitemap・robots.txt・canonical が追従します。

### GitHub Pages へ公開する

`.github/workflows/deploy.yml` を同梱しています。

1. GitHub のリポジトリ設定 → **Settings → Pages → Build and deployment → Source** を
   **GitHub Actions** に変更する
2. `main` ブランチへ push する

以降、push のたびに自動でビルド・公開されます。
`.env` の値が必要な場合は、リポジトリの **Settings → Secrets and variables → Actions → Variables**
に `SITE_URL` / `BASE_PATH` を登録すると、ワークフローがそれを使います。

### Netlify / Vercel / Cloudflare Pages へ公開する

| 項目 | 値 |
| --- | --- |
| ビルドコマンド | `npm run build` |
| 公開ディレクトリ | `dist` |
| 環境変数 | `SITE_URL`, `BASE_PATH`（`/`）、および必要な `PUBLIC_*` |

`PUBLIC_` で始まる変数はビルド時にブラウザ向けコードへ埋め込まれます。
**秘密鍵や API シークレットを `PUBLIC_` 変数に入れないでください。**

---

## 4. サイト名・プロフィールを変える

すべて **`src/config/site.ts`** の 1 ファイルで完結します。

```ts
export const site = {
  name: 'KAZU WORKS',        // サイト名（ヘッダー・フッター・タイトル）
  nameEn: 'KAZU WORKS',      // 英字ロゴ表示
  owner: 'KAZUYA',           // 運営者名
  message: { ... },          // メイン/サブ/補助メッセージ
  hero: { headline, body, points },  // ファーストビュー
  contact: {
    email: 'hello@example.com',
    emailConfigured: false,  // ← 実アドレスを設定したら true にする
  },
  availability: { hours, note, style },
  social: [ ... ],           // SNS リンク（不要なら削除）
  seo: { defaultTitle, description, ogImage, twitterHandle },
};
```

`contact.emailConfigured` が `false` の間は、サイト上にメールアドレスを表示せず
「ご相談フォームから」と案内します。実アドレスを設定したら `true` にしてください。

自己紹介・スキル・経歴・使用ツールは **`src/config/about.ts`** です。
ナビゲーションの項目は **`src/config/nav.ts`**、FAQ は **`src/config/faq.ts`**、
依頼の流れは **`src/config/flow.ts`** にあります。

---

## 5. 実績を追加する

**`src/config/works.ts`** の `works` 配列へ 1 件足すだけです。
一覧ページ・詳細ページ・sitemap へ自動的に反映されます。

```ts
{
  slug: 'my-new-work',        // URL になります（半角英数とハイフン）
  title: 'タイトル',
  category: 'system',         // 'system' | 'document' | 'creative'
  summary: 'カードに出る一言',
  challenge: 'どんな困りごとだったか',
  solution: ['やったこと1', 'やったこと2'],
  result: ['どうなったか1', 'どうなったか2'],
  tech: ['C#', 'SQL'],
  duration: '約1週間',
  visibility: 'public',       // 'public' | 'limited' | 'private'
  featured: false,            // true でトップページに優先表示
  publishedAt: '2026-01-15',  // 並び順に使用
}
```

### 画像を付ける

1. 画像を `src/assets/works/` へ置く
2. `works.ts` の先頭で `import myImage from '../assets/works/my-image.png';`
3. `thumbnail: { src: myImage, alt: '説明' }` を追加（`gallery` も同じ形式）

**`thumbnail` を省略すると**、カテゴリ色の抽象カバーが自動生成されます。
「画像は準備中」と表示され、壊れた画像は出ません。

画像は `astro:assets` によりビルド時に webp へ変換され、複数幅が出力されます。
元画像は大きいままで構いません。

### 非公開にする

`visibility: 'private'` にすると、その実績はビルド出力から完全に除外されます（詳細ページも生成されません）。
`'limited'` は掲載しつつ「内容の一部を伏せて掲載しています」と表示します。

> 実在する企業の機密情報や本業の情報は掲載しないでください。
> 同梱のデータはすべて差し替え前提のサンプルです。

---

## 6. 商品を追加する

**`src/config/products.ts`** の `products` 配列へ 1 件足します。

```ts
{
  slug: 'my-product',
  name: '商品名',
  catch: 'カードに出る短いコピー',
  description: '詳細ページの説明',
  price: 1200,                // 税込
  salePrice: 900,             // 任意。設定すると通常価格に取り消し線が付く
  contents: ['内容物1', '内容物2'],
  formats: ['PNG', 'PDF'],
  environment: '対応環境',
  license: {
    scope: '利用範囲の説明',
    commercial: true,         // 商用利用
    modify: true,             // 加工
    redistribute: false,      // 再配布（常に false）
    credit: '不要',           // '不要' | '任意' | '必須'
  },
  updatedAt: '2026-01-15',
  purchaseUrl: 'https://...', // 外部販売ページ。空なら購入ボタンを出さない
  featured: false,
  category: 'design',         // 'design'|'stream'|'ai'|'tool'|'template'
  status: 'onSale',           // 'onSale'|'preparing'|'soldOut'
  tags: ['タグ1', 'タグ2'],
}
```

プレビュー画像は実績と同じ方法（`src/assets/` に置いて import → `preview: { src, alt }`）です。
省略すると抽象カバーが自動生成されます。

---

## 7. 価格・見積もりルールを変える

金額に関わる数値は **`src/config/pricing.ts`** に集約されています。
計算そのものは `src/lib/estimate.ts` の純関数 1 つが行い、画面側に金額の分岐はありません。

| 変えたいもの | 場所 |
| --- | --- |
| 分野・依頼内容の選択肢 | `estimateFields[].tasks[]` |
| 依頼内容ごとの基準金額 | `estimateFields[].tasks[].base`（`[最小, 最大]`） |
| 依頼内容ごとの基準日数 | `estimateFields[].tasks[].days` |
| 規模による倍率 | `scaleOptions[].multiplier` |
| 追加条件の加算率 | `extraQuestions[].options[].rate`（`0.3` = +30%） |
| 数量 1 点あたりの加算率 | `extraQuestions` の `quantity` の `perUnitRate` |
| 最低受注金額 | `rules.minimumFee` |
| 金額の丸め単位 | `rules.roundTo` |
| 「要見積もり」に切り替わる金額 | `rules.quoteThreshold` |
| 税込 / 税別の表示 | `tax.mode` と `tax.label` |
| トップページの料金目安表 | `priceGuide` |

### 計算の流れ

```
基準レンジ（依頼内容）
  × 規模の倍率
  × (1 + 数量の加算率 + 追加条件の加算率の合計)
  → 最低受注額で下限を丸め → roundTo 単位へ丸め
  → 上限が quoteThreshold を超えたら「要見積もり」
```

`requiresQuote: true` を持つ選択肢（例: 商用利用の範囲が広い場合）を選ぶと、
金額を出さず「要見積もり」として案内します。

見積もり結果は `sessionStorage` に保存され、`/contact?from=estimate` でフォームへ自動的に引き継がれます。

---

## 8. 問い合わせフォームの送信先を設定する

送信方法はアダプター構造になっており、`.env` の 1 行で切り替えられます。
実装は `src/lib/contact/` にあります。

| `PUBLIC_CONTACT_PROVIDER` | 動作 | 必要な設定 |
| --- | --- | --- |
| `mock`（既定） | 送信せず成功扱い。画面に注意書きが出る | なし |
| `formspree` | Formspree 互換サービスへ multipart で POST | `PUBLIC_FORMSPREE_ENDPOINT` |
| `endpoint` | 自前の API へ POST | `PUBLIC_CONTACT_ENDPOINT` |

### Formspree を使う場合（いちばん手軽）

1. <https://formspree.io/> でフォームを作成し、エンドポイント URL を取得する
2. `.env` に次を設定する

```bash
PUBLIC_CONTACT_PROVIDER=formspree
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxx
```

API キーは不要です。エンドポイント URL のみで動きます。

### 自前 API を使う場合

```bash
PUBLIC_CONTACT_PROVIDER=endpoint
PUBLIC_CONTACT_ENDPOINT=https://api.example.com/contact
```

`multipart/form-data` で `name` / `email` / `field` / `message` / `deadline` / `budget` /
`referenceUrl` / `replyMethod` / `note` / `estimate` / `file` が送信されます。
メール送信やスパム判定はサーバー側で行ってください。
**認証が必要な場合でも、鍵をブラウザへ埋め込まないでください。**

### 送信先を新しく追加する

1. `src/lib/contact/types.ts` の `ContactAdapter` を満たすファイルを追加
2. `src/lib/contact/index.ts` の `switch` に 1 行足す
3. `.env.example` に設定例を追記

### 添付ファイルの制限

```bash
PUBLIC_UPLOAD_MAX_MB=10
PUBLIC_UPLOAD_ACCEPT=.png,.jpg,.pdf,.zip,.xlsx,.csv
```

拡張子と容量はクライアント側で検証します（`src/lib/validate.ts`）。
本番運用では、サーバー側でも必ず検証してください。

### スパム対策

現在は隠しフィールド（honeypot）と二重送信の防止を実装しています。
より強い対策が必要になったら、アダプター内で reCAPTCHA / Turnstile のトークン送信を足せます。

---

## 9. 決済リンク・応援リンクを設定する

### 商品の購入リンク

`src/config/products.ts` の各商品の `purchaseUrl` に、外部販売ページの URL を入れるだけです。

- Stripe Payment Links
- BOOTH
- ココナラ
- その他の販売ページ

**このサイトは決済処理を持ちません。** カード情報は一切扱わず、外部サービスへ遷移します。

`purchaseUrl` が空、または `status` が `onSale` 以外のときは購入ボタンを出さず、
「準備中」「販売開始をお知らせ」「この商品について問い合わせる」に切り替わります。壊れたリンクは出ません。

### 応援チップ

`.env` に金額ごとの決済リンクを設定します。

```bash
PUBLIC_TIP_URL_300=https://buy.stripe.com/xxxx
PUBLIC_TIP_URL_500=https://buy.stripe.com/yyyy
PUBLIC_TIP_URL_1000=https://buy.stripe.com/zzzz
PUBLIC_TIP_URL_CUSTOM=https://buy.stripe.com/wwww
```

未設定の項目はボタンを出さず、すべて未設定なら「準備中」とだけ表示します。
文言は `src/config/support.ts` で変更できます。

---

## 10. OGP 画像を変える

現在の画像は `public/og-image.png`（1200×630）です。

**自分でデザインした画像を使う場合**: `public/og-image.png` を差し替えるだけです。

**同梱のスクリプトで作り直す場合**:

```bash
node scripts/generate-og.mjs
```

文言は `scripts/generate-og.mjs` の上部（`SITE_NAME` / `HEADLINE` / `SUB` / `POINTS`）で変えられます。
`public/apple-touch-icon.png` も同時に生成されます。
このスクリプトはビルド時には実行されません（生成物をコミットして使います）。

ファビコンは `public/favicon.svg` です。

---

## 11. 法的情報を変える

**`src/config/legal.ts`** にまとまっています。

> ⚠ 同梱の文章は **雛形** です。法律上の判断を確定させたものではありません。
> 公開前に実際の運営内容へ合わせて見直し、必要に応じて専門家へご確認ください。

| 定数 | 対応ページ |
| --- | --- |
| `tokushoho` | `/legal/tokushoho`（特定商取引法に基づく表記） |
| `privacySections` | `/privacy`（プライバシーポリシー） |
| `termsSections` | `/terms`（利用規約） |
| `legalUpdatedAt` | 各ページの最終更新日 |

氏名・住所・電話番号などは、勝手な仮の値を入れていません。
`value: ''`（空文字）のままの項目はサイト上に **「要入力」** と黄色く表示され、
ページ上部にも注意書きが出ます。公開前に必ず埋めてください。

---

## 12. 本番公開前のチェックリスト

`src/config/` を上から順に見ていけば終わります。

- [ ] `site.ts` — `name` / `owner` を実際のものにする
- [ ] `site.ts` — `contact.email` を実アドレスにし、`contact.emailConfigured` を `true` にする
- [ ] `site.ts` — `social` のリンクを実際のアカウントにする（不要なら配列から削除）
- [ ] `site.ts` — `seo.twitterHandle` を設定する（任意）
- [ ] `about.ts` — 自己紹介・経歴・スキル・使用ツールを自分の内容にする
- [ ] `works.ts` — サンプル実績を実際の実績に差し替える（**機密情報は載せない**）
- [ ] `products.ts` — サンプル商品を差し替え、`purchaseUrl` と `status` を設定する
- [ ] `pricing.ts` — 金額と加算率を自分の相場に合わせる
- [ ] `legal.ts` — 「要入力」の項目をすべて埋め、内容を確認する
- [ ] `.env` — `SITE_URL` / `BASE_PATH` を公開先に合わせる
- [ ] `.env` — `PUBLIC_CONTACT_PROVIDER` を `mock` 以外にし、送信テストを行う
- [ ] `.env` — 応援チップのリンクを設定する（使う場合）
- [ ] `public/og-image.png` を必要なら差し替える
- [ ] `npm run build` が通ることを確認する

---

## 13. ディレクトリ構成

```
├── astro.config.mjs          Astro 設定（SITE_URL / BASE_PATH を読む）
├── .env.example              環境変数のサンプル
├── docs/
│   ├── implementation-plan.md   実装計画・設計判断
│   ├── design-tokens.md         デザイントークンの説明
│   └── roadmap.md               今後の拡張候補
├── scripts/
│   └── generate-og.mjs       OGP 画像・アイコンの生成
├── public/                   そのまま配信されるファイル
│   ├── favicon.svg
│   ├── og-image.png
│   └── apple-touch-icon.png
└── src/
    ├── config/               ★ サイトの内容はここだけで変えられます
    │   ├── site.ts             サイト名・運営者・連絡先・SEO
    │   ├── nav.ts              ナビゲーション
    │   ├── services.ts         よくある相談・対応できること
    │   ├── works.ts            実績
    │   ├── products.ts         商品
    │   ├── pricing.ts          見積もりの選択肢と料金ルール
    │   ├── contact.ts          フォームの選択肢・送信方式
    │   ├── about.ts            自己紹介・スキル
    │   ├── faq.ts              FAQ
    │   ├── flow.ts             依頼の流れ・お約束
    │   ├── support.ts          応援チップ
    │   └── legal.ts            法的表記（雛形）
    ├── lib/
    │   ├── estimate.ts       見積もり計算（純関数）
    │   ├── validate.ts       フォーム検証
    │   ├── url.ts            BASE_PATH を考慮した URL 生成
    │   └── contact/          送信アダプター（mock / formspree / endpoint）
    ├── components/
    │   ├── home/             トップページの各セクション
    │   ├── islands/          Preact コンポーネント（見積もり・フォーム）
    │   └── *.astro           共通コンポーネント
    ├── layouts/BaseLayout.astro   SEO・OGP・JSON-LD・共通レイアウト
    ├── styles/
    │   ├── tokens.css        ★ 色・余白・角丸・影・モーション
    │   └── global.css        リセットと共通スタイル
    ├── assets/works/         実績・商品の画像（ビルド時に最適化）
    └── pages/                各ページ
```

---

## アクセシビリティと表示について

- `prefers-reduced-motion: reduce` で、出現・浮遊・視差アニメーションをすべて停止します
- 見出しは h1 → h2 → h3 の順序を保っています（各ページ h1 は 1 つ）
- 見積もりウィザードはキーボードのみで完了でき、ステップ移動と結果を読み上げます
- フォームのエラーは要約 → 各項目の順に案内し、利用者を責めない言い方に統一しています
- 状態は色だけでなくテキストでも示しています
- タップ領域は 44×44px 以上を確保しています
- 360px 幅でも横スクロールが発生しないことを確認しています

## ライセンスと素材について

`src/assets/works/` の画像は、このサイトの運営者が用意した素材です。
実績・商品・法的表記のテキストは、差し替え前提のサンプルを含みます。
