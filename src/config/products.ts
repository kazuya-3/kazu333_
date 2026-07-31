/**
 * ショップの商品。
 *
 * ▼ 内容の編集
 *   実データは src/data/products.json にあります。
 *   管理画面（/admin/）から追加・編集ができます。
 *
 * ▼ 購入 URL について
 *   Stripe Payment Links / BOOTH / ココナラ など、外部の販売ページ URL を貼るだけです。
 *   このサイトは決済処理を持ちません。
 *   purchaseUrl が空のときは購入ボタンを出さず、status に応じた案内を表示します。
 */

import { resolveImageRef, resolveImageRefs, type ImageRef, type ResolvedImage } from '../lib/images';

/** 1 商品 = 1 ファイル。管理画面から追加・削除できます。 */
const files = import.meta.glob<{ default: RawProduct }>('/src/data/products/*.json', {
  eager: true,
});

export type ProductCategory = 'design' | 'stream' | 'ai' | 'tool' | 'template';

export type ProductStatus = 'onSale' | 'preparing' | 'soldOut';

export interface Product {
  slug: string;
  name: string;
  /** 短いキャッチコピー（カードに出ます） */
  catch: string;
  description: string;
  /** 税込価格（円） */
  price: number;
  /** セール価格（円）。設定すると通常価格に取り消し線が付きます。 */
  salePrice?: number;
  preview?: ResolvedImage;
  /** preview が無いときに描くイラストの種類 */
  coverStyle?: 'system' | 'document' | 'creative' | 'ai' | 'neutral';
  gallery?: ResolvedImage[];
  contents: string[];
  formats: string[];
  environment: string;
  license: {
    scope: string;
    commercial: boolean;
    modify: boolean;
    /** 素材そのままの再配布は一律禁止 */
    redistribute: boolean;
    credit: string;
  };
  updatedAt: string;
  /** 外部販売ページの URL。未設定なら購入ボタンを出しません。 */
  purchaseUrl?: string;
  featured: boolean;
  category: ProductCategory;
  status: ProductStatus;
  tags: string[];
}

interface RawProduct extends Omit<Product, 'preview' | 'gallery'> {
  preview?: ImageRef;
  gallery?: ImageRef[];
  /** 管理画面での並び順 */
  order?: number;
}

export const products: Product[] = Object.values(files)
  .map((m) => m.default)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  .map((product) => ({
    ...product,
    preview: resolveImageRef(product.preview),
    gallery: resolveImageRefs(product.gallery),
  }));

export const productCategoryLabel: Record<ProductCategory, string> = {
  design: 'デザイン素材',
  stream: '配信素材',
  ai: 'AI・プロンプト',
  tool: '小型ツール',
  template: 'ドキュメント雛形',
};

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
