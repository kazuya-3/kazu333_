# KAZU WORKS

IT・資料・デザインの“小さな困りごと”を形にする、個人のオンライン事務所兼ポートフォリオ兼ショップです。

実績を見る / 対応できることを知る / 簡易見積もりを試す / 相談する / 完成済みの商品を買う / 活動を応援する
——これらを 1 つのサイトにまとめています。

- **技術構成**: Astro 5（静的生成）+ Preact islands + 素の CSS（デザイントークン）
- **JavaScript**: トップページは 0KB。見積もりウィザードと問い合わせフォームのみ島として読み込み（全島合計 約 62KB / gzip 約 22KB）
- **依存パッケージ**: `astro` / `@astrojs/preact` / `@astrojs/sitemap` / `preact` の 4 つだけ
  （管理画面の `@sveltia/cms` は開発用。公開サイトの表示には読み込まれません）

---

## 目次

0. [管理画面（いちばんよく使います）](#0-管理画面)
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

## 0. 管理画面

実績・商品の投稿、画像のアップロード、ページ文言の修正は、
**コードを触らずに管理画面から**できます。

保存すると Git のコミットとして記録され、`main` に入った数分後に公開サイトへ反映されます。

### 使い方は 2 通り

#### A. パソコンから（設定なしですぐ使えます）

```bash
npm run cms
```

ブラウザで `http://localhost:4321/kazu333_/admin/` を開き、
**「Work with Local Repository」** を押して、このリポジトリのフォルダを選びます。

- 認証もアカウント登録も不要です
- 編集内容はローカルのファイルに直接保存されます
- 保存後、`git add -A && git commit && git push` で公開されます
- Chrome / Edge が必要です（File System Access API を使うため）

#### B. ブラウザから（外出先・スマホでも）

公開中の `https://kazuya-3.github.io/kazu333_/admin/` を開き、
**「Sign In Using Access Token」** を押して、GitHub のアクセストークンを貼り付けます。

トークンの作り方:

1. GitHub → Settings → Developer settings → **Personal access tokens → Fine-grained tokens**
2. **Generate new token**
3. Repository access: **Only select repositories** → `kazu333_` を選択
4. Permissions → Repository permissions → **Contents: Read and write**
5. 生成されたトークンをコピーし、管理画面に貼り付ける

保存すると GitHub へ直接コミットされ、自動でデプロイまで走ります。

> トークンは他人に渡さないでください。漏れた場合は GitHub の設定画面から失効させられます。
> 有効期限を短めにしておくと安全です。

「Sign In with GitHub」（OAuth）を使いたい場合は、認証を中継するサーバーが別途必要です。
用意できたら `public/admin/config.yml` の `base_url` のコメントを外して設定してください。
アクセストークン方式で足りていれば、この準備は不要です。

### 管理画面から編集できること

| メニュー | 内容 |
| --- | --- |
| **実績** | 実績の追加・編集・削除・並べ替え。画像、課題／対応／結果、使用技術、公開範囲 |
| **商品** | 商品の追加・編集・削除。価格、セール価格、内容物、利用範囲、購入URL、販売状態 |
| **ページの文言** | トップの見出し、できること、依頼の流れ、自己紹介、FAQ、問い合わせフォームの文言、応援チップ、法的表記 |

画像は編集画面からドラッグ＆ドロップでアップロードできます。
アップロードした画像は `src/assets/` に保存され、公開時に自動で webp へ変換され、
画面幅に応じた複数サイズが書き出されます（速度対策）。

### 管理画面で扱わないもの

次の 2 つは、誤操作の影響が大きいためファイル編集のままにしています。

- **料金・見積もりのルール** → `src/config/pricing.ts`（[7章](#7-価格見積もりルールを変える)）
- **決済リンク・フォーム送信先** → `.env`（[8章](#8-問い合わせフォームの送信先を設定する)・[9章](#9-決済リンク応援リンクを設定する)）

### コンテンツの実体

管理画面が読み書きしているのは、次の JSON ファイルです。
管理画面を使わず、直接編集しても構いません。

```
src/data/
├── works/*.json      実績（1件 = 1ファイル）
├── products/*.json   商品（1件 = 1ファイル）
├── site.json         サイト名・ファーストビュー・連絡先・SEO
├── services.json     よくある相談・できること
├── flow.json         依頼の流れ・お約束
├── about.json        自己紹介・スキル・経歴
├── faq.json          よくある質問
├── contact.json      問い合わせフォームの文言と選択肢
├── support.json      応援チップの文言
└── legal.json        特商法・プライバシー・利用規約
```

`src/config/*.ts` は、この JSON に型を付けて画面へ渡すだけの薄い層です。
項目を増やすときは、JSON・`src/config` の型・`public/admin/config.yml` の 3 つを揃えてください。

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

1. `main` ブランチへ push する（ワークフローが Pages の有効化も試みます）
2. 有効化に失敗した場合のみ、**Settings → Pages → Build and deployment → Source** を
   **GitHub Actions** に変更して、ワークフローを再実行する

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

管理画面（[0章](#0-管理画面)）の **「ページの文言 → サイト基本情報」** から編集できます。

ファイルを直接編集する場合は **`src/data/site.json`** です。

| 項目 | 内容 |
| --- | --- |
| `name` / `nameEn` | サイト名（ヘッダー・フッター・タイトル） |
| `owner` / `ownerRole` | 運営者名・肩書き |
| `message` | メイン／サブ／補助メッセージ |
| `hero` | ファーストビューの見出し・説明・条件バッジ |
| `contact` | メールアドレス・返信の目安 |
| `availability` | 対応時間・受注形態 |
| `social` | SNS リンク（不要なら配列から削除） |
| `seo` | タイトル・説明文・OGP 画像・X アカウント |

`contact.emailConfigured` が `false` の間は、サイト上にメールアドレスを表示せず
「ご相談フォームから」と案内します。実アドレスを設定したら `true` にしてください。

自己紹介は `src/data/about.json`、ナビゲーションは `src/config/nav.ts`、
FAQ は `src/data/faq.json`、依頼の流れは `src/data/flow.json` です。

---

## 5. 実績を追加する

**いちばん簡単なのは管理画面（[0章](#0-管理画面)）からの追加です。**
ここではファイルを直接編集する場合の書き方を説明します。

`src/data/works/` に JSON を 1 つ足すと、一覧・詳細・sitemap へ自動的に反映されます
（ファイル名は `<slug>.json`）。

```json
{
  "order": 100,
  "slug": "my-new-work",
  "title": "タイトル",
  "category": "system",
  "summary": "カードに出る一言",
  "challenge": "どんな困りごとだったか",
  "solution": ["やったこと1", "やったこと2"],
  "result": ["どうなったか1", "どうなったか2"],
  "tech": ["C#", "SQL"],
  "duration": "約1週間",
  "visibility": "public",
  "featured": false,
  "publishedAt": "2026-01-15"
}
```

`category` は `system` / `document` / `creative`、
`visibility` は `public` / `limited` / `private` から選びます。
`order` は小さいほど先に表示されます。

### 画像を付ける

管理画面ならドラッグ＆ドロップで完了します。手で書く場合は:

1. 画像を `src/assets/` の下（どのフォルダでも可）へ置く
2. JSON に次を追加する

```json
"thumbnail": { "src": "/src/assets/works/my-image.png", "alt": "説明" }
```

`gallery` は同じ形の配列です。パスは `/src/assets/` から始まる形で書いてください。

**`thumbnail` を省略すると**、カテゴリに合わせたカバーイラストが自動生成されます
（システム→コード画面、資料→書類、制作→アートボード）。壊れた画像は出ません。

イラストの種類を指定したいときは `coverStyle` を足してください。

```json
"coverStyle": "neutral"
```

`neutral` は集計・一覧をあらわすグラフ図、`ai` は AI 活用をあらわす図です。
同じ slug なら常に同じ絵になるため、更新のたびに見た目が変わることはありません。

画像は `astro:assets` によりビルド時に webp へ変換され、複数幅が出力されます。
元画像は大きいままで構いません。

### 非公開にする

`visibility: 'private'` にすると、その実績はビルド出力から完全に除外されます（詳細ページも生成されません）。
`'limited'` は掲載しつつ「内容の一部を伏せて掲載しています」と表示します。

> 実在する企業の機密情報や本業の情報は掲載しないでください。
> 同梱のデータはすべて差し替え前提のサンプルです。

---

## 6. 商品を追加する

管理画面（[0章](#0-管理画面)）から追加できます。
ファイルを直接編集する場合は、`src/data/products/<slug>.json` を 1 つ足します。

```json
{
  "order": 100,
  "slug": "my-product",
  "name": "商品名",
  "catch": "カードに出る短いコピー",
  "description": "詳細ページの説明",
  "price": 1200,
  "salePrice": 900,
  "contents": ["内容物1", "内容物2"],
  "formats": ["PNG", "PDF"],
  "environment": "対応環境",
  "license": {
    "scope": "利用範囲の説明",
    "commercial": true,
    "modify": true,
    "redistribute": false,
    "credit": "不要"
  },
  "updatedAt": "2026-01-15",
  "purchaseUrl": "https://...",
  "featured": false,
  "category": "design",
  "status": "onSale",
  "tags": ["タグ1", "タグ2"]
}
```

| 項目 | 選べる値 |
| --- | --- |
| `category` | `design` / `stream` / `ai` / `tool` / `template` |
| `status` | `onSale` / `preparing` / `soldOut` |
| `license.credit` | `不要` / `任意` / `必須` |

`salePrice` は任意です（入れると通常価格に取り消し線が付きます）。
`purchaseUrl` が空なら購入ボタンは出ません。
`redistribute` は素材そのものの再配布可否で、通常は `false` のままにします。

プレビュー画像は実績と同じ形式です。

```json
"preview": { "src": "/src/assets/works/my-image.png", "alt": "説明" }
```

省略するとカバーイラストが自動生成されます（`coverStyle` で種類を指定できます）。

### 販売準備中のあいだ

`purchaseUrl` が空、または `status` が `onSale` 以外のとき、購入ボタンの代わりに
「販売開始を知らせてもらう」「この商品について問い合わせる」が表示されます。
このボタンからご相談フォームへ進むと、**商品名が自動で本文に入ります**
（`/contact?product=<slug>&topic=notify`）。

実績の詳細ページの「似た内容を相談する」も同じ仕組みで、
実績名と相談分野がフォームへ引き継がれます（`/contact?work=<slug>`）。

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
| `mailto` | 利用者のメールソフトを開き、入力内容が入ったメールを作成する | `site.ts` の `contact.email` |
| `formspree` | Formspree 互換サービスへ multipart で POST | `PUBLIC_FORMSPREE_ENDPOINT` |
| `endpoint` | 自前の API へ POST | `PUBLIC_CONTACT_ENDPOINT` |
| `mock` | 送信せず成功扱い。画面に注意書きが出る | なし（開発用） |

**`PUBLIC_CONTACT_PROVIDER` を書かなくても切り替わります。** 次の順で判定します。

1. `PUBLIC_FORMSPREE_ENDPOINT` があれば → `formspree`
2. `PUBLIC_CONTACT_ENDPOINT` があれば → `endpoint`
3. `site.ts` の `contact.emailConfigured` が `true` なら → `mailto`
4. どれも無ければ → `mock`

つまり **Formspree を使う場合、設定する変数は URL 1 つだけ** です。

### いちばん早く動かす方法（外部サービス不要）

`src/data/site.json` の 2 行を変えるだけです（管理画面からも変えられます）。

```json
"contact": {
  "email": "あなたのアドレス@example.com",
  "emailConfigured": true
}
```

これだけで、フォームの送信ボタンが利用者のメールソフトを開き、
氏名・分野・相談内容・見積もり結果が本文に入った状態でメールが作成されます。
最後に利用者自身が送信します。画面にもその旨を案内します。

| 長所 | 短所 |
| --- | --- |
| 契約も設定も不要。すぐ動く | ファイルを直接添付できない（ファイル名だけ伝え、メールに添付してもらう） |
| 迷惑メールに埋もれにくい | 利用者の環境にメールソフトが必要 |
| 個人情報が第三者を経由しない | 送信されたかを運営側で確認できない |

本格的にフォームで受け取りたくなったら、下記の Formspree などへ切り替えてください。

### Formspree を使う場合（フォームで受け取る／推奨）

メールアドレスをサイト上に出さずに受け取れます。無料枠は月 50 件です。

**手順（5 分ほど）**

1. <https://formspree.io/> に登録し、**New Form** を作成する
   （受信先には、通知を受け取りたいメールアドレスを指定します）
2. 表示される **エンドポイント URL** をコピーする
   （`https://formspree.io/f/xxxxxxxx` の形です）
3. その URL を設定する

   **ローカルで確認する場合** — `.env` に 1 行:

   ```bash
   PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
   ```

   **GitHub Pages で公開する場合** — リポジトリの
   **Settings → Secrets and variables → Actions → Variables → New repository variable** で

   | Name | Value |
   | --- | --- |
   | `PUBLIC_FORMSPREE_ENDPOINT` | `https://formspree.io/f/xxxxxxxx` |

   を追加し、`main` へ push（またはワークフローを手動実行）します。
   ワークフロー側はすでに対応済みなので、他に変更は要りません。

4. 公開後、実際にフォームから 1 件送ってみて、受信を確認する
   （Formspree は初回送信時に確認メールを送ります）

API キーやシークレットは不要です。エンドポイント URL のみで動きます。

> `PUBLIC_` 変数はブラウザから見える値です。Formspree のエンドポイント URL は
> 公開前提の値なので問題ありませんが、秘密鍵は絶対に入れないでください。

**送信される項目**: お名前 / email / 相談分野 / 依頼内容 / 希望納期 / ご予算 /
参考URL / 希望する連絡方法 / 補足 / 簡易見積もり / 添付ファイル

送信に失敗した場合は、確認画面を保ったままエラーを表示し、
**「もう一度送信する」で入力し直さずに再送**できます。

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

各商品の `purchaseUrl` に、外部販売ページの URL を入れるだけです。
管理画面の「商品」から設定できます（ファイルなら `src/data/products/<slug>.json`）。

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

管理画面（[0章](#0-管理画面)）の **「ページの文言 → 法的表記」** から編集できます。
ファイルは **`src/data/legal.json`** です。

> ⚠ 同梱の文章は **雛形** です。法律上の判断を確定させたものではありません。
> 公開前に実際の運営内容へ合わせて見直し、必要に応じて専門家へご確認ください。

| 定数 | 対応ページ |
| --- | --- |
| `tokushoho` | `/legal/tokushoho`（特定商取引法に基づく表記） |
| `privacySections` | `/privacy`（プライバシーポリシー） |
| `termsSections` | `/terms`（利用規約） |
| `legalUpdatedAt` | 各ページの最終更新日 |

氏名・住所・電話番号などは、勝手な仮の値を入れていません。
値が空のままの項目はサイト上に **「要入力」** と黄色く表示され、
ページ上部にも注意書きが出ます。公開前に必ず埋めてください。

---

## 12. 本番公開前のチェックリスト

`src/config/` を上から順に見ていけば終わります。

- [ ] サイト基本情報 — `name` / `owner` を実際のものにする
- [ ] サイト基本情報 — `contact.email` を実アドレスにし、`contact.emailConfigured` を `true` にする
- [ ] サイト基本情報 — `social` のリンクを実際のアカウントにする（不要なら配列から削除）
- [ ] サイト基本情報 — `seo.twitterHandle` を設定する（任意）
- [ ] 自己紹介 — 自己紹介・経歴・スキル・使用ツールを自分の内容にする
- [ ] 実績 — サンプル実績を実際の実績に差し替える（**機密情報は載せない**）
- [ ] 商品 — サンプル商品を差し替え、`purchaseUrl` と `status` を設定する
- [ ] `pricing.ts` — 金額と加算率を自分の相場に合わせる
- [ ] 法的表記 — 「要入力」の項目をすべて埋め、内容を確認する
- [ ] `.env` — `SITE_URL` / `BASE_PATH` を公開先に合わせる
- [ ] 問い合わせが届く状態にする（Formspree のエンドポイント URL を設定するか、
      `site.ts` にメールを書いて `emailConfigured: true` にする）。**必ず一度送信テストをする**
- [ ] `.env` — 応援チップのリンクを設定する（使う場合）
- [ ] `public/og-image.png` を必要なら差し替える
- [ ] 管理画面から 1 件編集して、公開サイトに反映されることを確認する
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
│   ├── admin/                管理画面（index.html + config.yml）
│   ├── favicon.svg
│   ├── og-image.png
│   └── apple-touch-icon.png
└── src/
    ├── data/                 ★ サイトの内容（管理画面が読み書きします）
    │   ├── works/*.json        実績（1件 = 1ファイル）
    │   ├── products/*.json     商品（1件 = 1ファイル）
    │   ├── site.json           サイト名・ファーストビュー・連絡先・SEO
    │   ├── services.json       よくある相談・できること
    │   ├── flow.json           依頼の流れ・お約束
    │   ├── about.json          自己紹介・スキル
    │   ├── faq.json            FAQ
    │   ├── contact.json        フォームの文言と選択肢
    │   ├── support.json        応援チップの文言
    │   └── legal.json          法的表記（雛形）
    ├── config/               data に型を付けて画面へ渡す層
    │   ├── nav.ts              ナビゲーション
    │   ├── pricing.ts          見積もりの選択肢と料金ルール（管理画面では扱いません）
    │   └── （他は data/*.json の読み込み）
    ├── lib/
    │   ├── images.ts         データの画像パスを最適化画像へ変換
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
