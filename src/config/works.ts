/**
 * 制作・開発実績。
 *
 * ▼ 内容の編集
 *   実データは src/data/works.json にあります。
 *   管理画面（/admin/）から追加・編集・並べ替えができます。
 *   手で編集する場合も、JSON を直接書き換えれば反映されます。
 *
 * ▼ このファイルの役割
 *   JSON に型を付け、画像パスを実際の画像へ結び付けて画面へ渡します。
 *
 * ▼ 注意
 *   同梱しているのはすべて差し替え前提のサンプルです。
 *   実在する企業の機密情報・本業の情報は掲載しないでください。
 *   visibility を 'private' にすると、その実績はビルド出力から除外されます。
 */

import { resolveImageRef, resolveImageRefs, type ImageRef, type ResolvedImage } from '../lib/images';
import type { CategoryKey } from './services';

/** 1 実績 = 1 ファイル。管理画面から追加・削除できます。 */
const files = import.meta.glob<{ default: RawWork }>('/src/data/works/*.json', { eager: true });

export type WorkVisibility = 'public' | 'limited' | 'private';

export interface WorkLink {
  label: string;
  url: string;
}

export interface Work {
  /** URL に使う識別子。半角英数とハイフン。 */
  slug: string;
  title: string;
  category: CategoryKey;
  /** カード用の一覧向け一言 */
  summary: string;
  /** サムネイル。未設定ならカバーイラストを自動生成します。 */
  thumbnail?: ResolvedImage;
  /** thumbnail が無いときに描くイラストの種類 */
  coverStyle?: 'system' | 'document' | 'creative' | 'ai' | 'neutral';
  /** 課題 → 対応 → 結果 */
  challenge: string;
  solution: string[];
  result: string[];
  tech: string[];
  duration: string;
  gallery?: ResolvedImage[];
  links?: WorkLink[];
  visibility: WorkVisibility;
  featured: boolean;
  /** 掲載日（新しい順に並びます） */
  publishedAt: string;
}

/** JSON 側の形（画像はパス文字列） */
interface RawWork extends Omit<Work, 'thumbnail' | 'gallery'> {
  thumbnail?: ImageRef;
  gallery?: ImageRef[];
  /** 管理画面での並び順 */
  order?: number;
}

export const works: Work[] = Object.values(files)
  .map((m) => m.default)
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  .map((work) => ({
    ...work,
    thumbnail: resolveImageRef(work.thumbnail),
    gallery: resolveImageRefs(work.gallery),
  }));

/** 公開対象のみ（private を除外し、新しい順） */
export const publicWorks = works
  .filter((w) => w.visibility !== 'private')
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export const featuredWorks = publicWorks.filter((w) => w.featured);

export const visibilityLabel: Record<WorkVisibility, string | null> = {
  public: null,
  limited: '内容の一部を伏せて掲載しています',
  private: null,
};
