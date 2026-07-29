/**
 * ショップの商品データ。
 *
 * ▼ 商品を追加するには
 *   1. この配列へ 1 件追加する
 *   2. プレビュー画像を src/assets/works/ などに置いて import する
 *      （画像を用意していない場合は preview を省略。抽象カバーが自動描画されます）
 *   3. purchaseUrl に外部販売ページの URL を入れる
 *
 * ▼ 購入 URL について
 *   Stripe Payment Links / BOOTH / ココナラ など、外部の販売ページ URL を貼るだけです。
 *   このサイトは決済処理を持ちません（MVP では独自カート・会員機能を作りません）。
 *   purchaseUrl が空のときは購入ボタンを出さず、status に応じた案内を表示します。
 */

import type { ImageMetadata } from 'astro';

import iconFrameDemo05 from '../assets/works/icon-frame-demo-05.png';
import iconFrameDemo02 from '../assets/works/icon-frame-demo-02.png';
import iconFrame03 from '../assets/works/icon-frame-03.png';
import iconFrame04 from '../assets/works/icon-frame-04.png';
import iconFrame05 from '../assets/works/icon-frame-05.png';
import iconFrame07 from '../assets/works/icon-frame-07.png';
import iconFrame08 from '../assets/works/icon-frame-08.png';

export type ProductCategory = 'design' | 'stream' | 'ai' | 'tool' | 'template';

export type ProductStatus = 'onSale' | 'preparing' | 'soldOut';

export interface ProductImage {
  src: ImageMetadata;
  alt: string;
}

export interface Product {
  slug: string;
  name: string;
  /** 短いキャッチコピー（カードに出ます） */
  catch: string;
  /** 詳細ページの説明 */
  description: string;
  /** 税込価格（円） */
  price: number;
  /** セール価格（円）。設定すると通常価格に取り消し線が付きます。 */
  salePrice?: number;
  preview?: ProductImage;
  /**
   * preview が無いときに描くイラストの種類。
   * 省略するとカテゴリから決まります。
   */
  coverStyle?: 'system' | 'document' | 'creative' | 'ai' | 'neutral';
  gallery?: ProductImage[];
  /** 内容物 */
  contents: string[];
  /** ファイル形式 */
  formats: string[];
  /** 対応環境 */
  environment: string;
  license: {
    /** 利用範囲の説明 */
    scope: string;
    /** 商用利用の可否 */
    commercial: boolean;
    /** 加工の可否 */
    modify: boolean;
    /** 再配布（素材そのままの配布）は一律禁止 */
    redistribute: false;
    /** クレジット表記の要否 */
    credit: '不要' | '任意' | '必須';
  };
  /** 更新日 */
  updatedAt: string;
  /** 外部販売ページの URL。未設定なら購入ボタンを出しません。 */
  purchaseUrl?: string;
  featured: boolean;
  category: ProductCategory;
  status: ProductStatus;
  tags: string[];
}

export const productCategoryLabel: Record<ProductCategory, string> = {
  design: 'デザイン素材',
  stream: '配信素材',
  ai: 'AI・プロンプト',
  tool: '小型ツール',
  template: 'ドキュメント雛形',
};

export const products: Product[] = [
  {
    slug: 'icon-frame-set',
    name: 'アイコンフレームセット',
    catch: 'アイコンに重ねるだけで、印象が整う円形フレーム8種。',
    description:
      'プロフィール画像や配信画面のアイコンに重ねて使える、円形フレームのセットです。宝石・水・光・回路・植物など、雰囲気の違う8種類を同じ配色ルールで揃えているため、使い分けても並べたときに統一感が保たれます。背景は透過済みで、余白の規格も揃えてあります。',
    price: 1200,
    preview: {
      src: iconFrameDemo05,
      alt: 'アイコンに宝石と唐草模様のフレームを重ねた使用イメージ',
    },
    gallery: [
      { src: iconFrame03, alt: '金属質のリング型フレーム' },
      { src: iconFrame04, alt: '青い光が放射状に伸びるフレーム' },
      { src: iconFrame05, alt: '水の粒が舞う円形フレーム' },
      { src: iconFrame07, alt: '低ポリゴン調の青いリングフレーム' },
      { src: iconFrame08, alt: '銀色のリングフレーム' },
    ],
    contents: ['フレーム画像 8種（背景透過PNG / 1024×1024）', '重ね方の説明（PDF 1枚）'],
    formats: ['PNG（背景透過）', 'PDF'],
    environment: '画像を重ねられるアプリ全般（Photoshop / Canva / CLIP STUDIO など）',
    license: {
      scope: '個人・法人を問わず、ご自身のアイコンや配信画面へ使用できます。',
      commercial: true,
      modify: true,
      redistribute: false,
      credit: '不要',
    },
    updatedAt: '2025-11-24',
    purchaseUrl: '',
    featured: true,
    category: 'design',
    status: 'preparing',
    tags: ['アイコン', '透過PNG', '8種セット'],
  },
  {
    slug: 'sns-cover-template',
    name: 'SNS投稿カバーテンプレート',
    catch: '文字を差し替えるだけ。投稿1枚目が毎回そろいます。',
    description:
      'SNS投稿の1枚目に使うカバー画像のテンプレートです。「お知らせ」「作例紹介」「振り返り」の3パターンを用意し、それぞれ文字数の目安を決めた配置にしてあるため、長い見出しを入れてもレイアウトが崩れにくくなっています。',
    price: 1500,
    salePrice: 1200,
    preview: {
      src: iconFrameDemo02,
      alt: '青い水のフレームを使ったカバー画像の作例',
    },
    contents: ['カバーテンプレート 3種（正方形 / 横長 の2サイズ）', '使い方ガイド（PDF）'],
    formats: ['PSD', 'PNG', 'PDF'],
    environment: 'Photoshop（PSD） / 画像編集アプリ全般（PNG）',
    license: {
      scope: 'ご自身または自社の発信に使用できます。',
      commercial: true,
      modify: true,
      redistribute: false,
      credit: '不要',
    },
    updatedAt: '2025-11-12',
    purchaseUrl: '',
    featured: true,
    category: 'design',
    status: 'preparing',
    tags: ['SNS', 'テンプレート', '3パターン'],
  },
  {
    slug: 'stream-background-overlay',
    name: '配信背景・オーバーレイ',
    catch: '枠・背景・待機画面を、同じ色ルールでひとそろい。',
    description:
      '配信画面に使う背景とオーバーレイのセットです。枠、背景、待機画面を同じ配色ルールで作っているため、場面が切り替わっても雰囲気が途切れません。配信ソフトへそのまま読み込める解像度で書き出しています。',
    price: 2000,
    preview: {
      src: iconFrame04,
      alt: '青い光が放射状に広がる配信用オーバーレイ素材',
    },
    contents: ['背景 3種', 'オーバーレイ枠 2種', '待機画面 1種', '配置の目安ガイド'],
    formats: ['PNG（一部透過）', 'PDF'],
    environment: 'OBS Studio ほか配信ソフト全般（1920×1080 想定）',
    license: {
      scope: 'ご自身の配信活動に使用できます。',
      commercial: true,
      modify: true,
      redistribute: false,
      credit: '任意',
    },
    updatedAt: '2025-11-18',
    purchaseUrl: '',
    featured: false,
    category: 'stream',
    status: 'preparing',
    tags: ['配信', 'OBS', 'フルHD'],
  },
  {
    slug: 'event-announce-template',
    name: 'イベント告知テンプレート',
    catch: '日時と会場を入れれば、告知画像が完成します。',
    description:
      'イベント告知用の画像テンプレートです。タイトル、日時、場所、参加方法という必要項目があらかじめ配置されているため、情報を差し替えるだけで告知画像が作れます。',
    price: 1500,
    contents: ['告知テンプレート 4種', '記載項目のチェックリスト'],
    formats: ['PSD', 'PNG'],
    environment: 'Photoshop / 画像編集アプリ全般',
    license: {
      scope: 'ご自身または自社が主催・参加するイベントの告知に使用できます。',
      commercial: true,
      modify: true,
      redistribute: false,
      credit: '不要',
    },
    updatedAt: '2025-11-08',
    purchaseUrl: '',
    featured: false,
    category: 'design',
    status: 'preparing',
    tags: ['告知', 'イベント', '4種'],
  },
  {
    slug: 'ai-prompt-collection',
    name: 'AI画像生成用プロンプト集',
    catch: '狙った雰囲気を出すための、書き方の型をまとめました。',
    description:
      '画像生成AIで、思った雰囲気の絵を出すためのプロンプト集です。単語を並べるのではなく「用途・被写体・色・質感・構図」に分けて書く型と、その調整例をまとめています。そのまま使うことも、部分的に書き換えて使うこともできます。',
    price: 900,
    contents: ['プロンプト雛形 20種', '調整の考え方ガイド（PDF）', 'そのまま貼れるテキスト集'],
    formats: ['PDF', 'TXT'],
    environment: '主要な画像生成AIサービス全般',
    license: {
      scope: 'ご自身の制作に使用できます。生成した画像の利用は各AIサービスの規約に従ってください。',
      commercial: true,
      modify: true,
      redistribute: false,
      credit: '不要',
    },
    updatedAt: '2025-11-02',
    purchaseUrl: '',
    featured: true,
    category: 'ai',
    status: 'preparing',
    tags: ['AI', 'プロンプト', '20種'],
  },
  {
    slug: 'stream-comment-effects',
    name: '配信用コメント演出素材',
    catch: 'コメント周りに、さりげない動きを添える小さな素材集。',
    description:
      'コメント欄まわりに使う、小さな装飾と動きのある素材のセットです。主張しすぎない動きにしているため、配信の内容を邪魔しません。',
    price: 1800,
    preview: {
      src: iconFrame05,
      alt: '水の粒が舞う円形の演出素材',
    },
    contents: ['ループアニメーション 6種', '静止装飾 8種', '使い方ガイド'],
    formats: ['WebM（透過）', 'GIF', 'PNG'],
    environment: 'OBS Studio ほか配信ソフト全般',
    license: {
      scope: 'ご自身の配信活動に使用できます。',
      commercial: true,
      modify: true,
      redistribute: false,
      credit: '任意',
    },
    updatedAt: '2025-11-20',
    purchaseUrl: '',
    featured: false,
    category: 'stream',
    status: 'preparing',
    tags: ['配信', '透過WebM', 'ループ'],
  },
  {
    slug: 'excel-csv-mini-tool',
    name: 'Excel・CSV用小型ツール',
    catch: '毎回の整形作業を、ボタンひとつ分だけ短くします。',
    description:
      'CSVの読み込みと整形、重複行の確認、列の並べ替えといった、よく発生する小さな作業をまとめたツールです。使い方は手順書に沿って進められる形にしています。ご自身の環境に合わせた調整が必要な場合は、別途ご相談ください。',
    price: 2500,
    coverStyle: 'neutral',
    contents: ['ツール本体（マクロ有効ブック）', '操作手順書（PDF）', '設定シートの説明'],
    formats: ['XLSM', 'PDF'],
    environment: 'Microsoft Excel 2019 以降（Windows）',
    license: {
      scope: 'ご購入者と、その所属組織の業務で使用できます。',
      commercial: true,
      modify: true,
      redistribute: false,
      credit: '不要',
    },
    updatedAt: '2025-10-30',
    purchaseUrl: '',
    featured: false,
    category: 'tool',
    status: 'preparing',
    tags: ['Excel', 'CSV', '業務効率'],
  },
  {
    slug: 'test-case-template',
    name: 'テスト項目書テンプレート',
    catch: '書く項目に迷わない、確認漏れを減らすための雛形。',
    description:
      '動作確認の項目を書き出すためのテンプレートです。観点の一覧と記入例を付けているため、何を確認すべきか迷う時間を減らせます。小規模な改修の確認にも使いやすい分量にしています。',
    price: 1200,
    contents: ['テスト項目書テンプレート（Excel）', '観点チェックリスト', '記入例つきサンプル'],
    formats: ['XLSX', 'PDF'],
    environment: 'Microsoft Excel / Googleスプレッドシート',
    license: {
      scope: 'ご購入者と、その所属組織の業務で使用できます。',
      commercial: true,
      modify: true,
      redistribute: false,
      credit: '不要',
    },
    updatedAt: '2025-10-22',
    purchaseUrl: '',
    featured: false,
    category: 'template',
    status: 'preparing',
    tags: ['テスト', 'QA', 'Excel'],
  },
  {
    slug: 'manual-template',
    name: '操作マニュアルテンプレート',
    catch: '画面の説明が、順番どおりに書ける構成です。',
    description:
      '操作マニュアルを作るためのテンプレートです。目的、前提、手順、困ったときの確認先という並びを最初から用意しているので、書きながら構成に悩む時間が減ります。スクリーンショットの配置枠も含みます。',
    price: 1500,
    contents: ['マニュアルテンプレート（Word / PowerPoint）', '構成の考え方ガイド', '記入例'],
    formats: ['DOCX', 'PPTX', 'PDF'],
    environment: 'Microsoft Word / PowerPoint（Googleドキュメントでも利用可）',
    license: {
      scope: 'ご購入者と、その所属組織の業務で使用できます。',
      commercial: true,
      modify: true,
      redistribute: false,
      credit: '不要',
    },
    updatedAt: '2025-10-18',
    purchaseUrl: '',
    featured: false,
    category: 'template',
    status: 'preparing',
    tags: ['マニュアル', 'Word', '雛形'],
  },
];

export const featuredProducts = products.filter((p) => p.featured);

/** 購入できる状態かどうか（購入URLが設定済み かつ 販売中） */
export function isPurchasable(product: Product): boolean {
  return product.status === 'onSale' && Boolean(product.purchaseUrl);
}

export const productStatusLabel: Record<ProductStatus, string> = {
  onSale: '販売中',
  preparing: '準備中',
  soldOut: '販売終了',
};

/** 購入できる商品が 1 つでもあるか（販売準備中の案内を出すかの判定に使用） */
export const hasPurchasableProduct = products.some((p) => isPurchasable(p));

/** すべて準備中のときに、ショップ上部へ出す案内 */
export const shopPreparingNotice = {
  title: '現在、販売の準備を進めています',
  body: '掲載している内容は決まっていますが、販売ページの用意がまだ整っていません。気になる商品があれば、各商品ページの「販売開始を知らせてもらう」からお知らせください。準備ができ次第ご連絡します。',
};

/** ショップ全体の注意書き */
export const shopNotes = [
  'すべて完成済みのデータです。ご購入後すぐにお使いいただけます。',
  '決済と配布は外部の販売サービス上で行います。このサイトではクレジットカード情報をお預かりしません。',
  '素材そのものの再配布・再販売はご遠慮ください。',
  '「こういう形で使いたい」というご相談は、購入前でもお気軽にどうぞ。',
];
