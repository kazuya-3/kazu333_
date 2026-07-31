/**
 * データファイル（src/data/*.json）に書かれた画像パスを、
 * Astro が最適化できる画像データへ変換します。
 *
 * 管理画面から画像をアップロードすると、JSON には
 *   "/src/assets/uploads/xxxx.png"
 * のような文字列が入ります。その文字列を実際の画像へ結び付けるのがここです。
 *
 * これにより、管理画面から追加した画像も webp へ自動変換され、
 * 複数サイズが書き出されます（表示速度のため）。
 */

import type { ImageMetadata } from 'astro';

/** src/assets 配下の画像をすべて読み込んでおく（ビルド時に解決されます） */
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/**/*.{png,jpg,jpeg,webp,avif,gif}',
  { eager: true },
);

/** JSON に保存されている画像の形 */
export interface ImageRef {
  src: string;
  alt?: string;
}

/** 画面で使う画像の形 */
export interface ResolvedImage {
  src: ImageMetadata;
  alt: string;
}

/** パス文字列から画像データを取り出す。見つからなければ undefined。 */
export function resolveImage(src: string | undefined | null): ImageMetadata | undefined {
  if (!src) return undefined;
  // 先頭のスラッシュ有無や ./ 表記のゆらぎを吸収する
  const key = src.startsWith('/') ? src : `/${src.replace(/^\.\//, '')}`;
  return files[key]?.default;
}

/**
 * JSON の画像参照を画面用へ変換する。
 * ファイルが見つからない場合は undefined を返し、
 * 呼び出し側は代わりにカバーイラストを描きます（壊れた画像を出さないため）。
 */
export function resolveImageRef(ref: ImageRef | undefined | null): ResolvedImage | undefined {
  const meta = resolveImage(ref?.src);
  if (!meta) return undefined;
  return { src: meta, alt: ref?.alt ?? '' };
}

/** 配列版。解決できなかったものは取り除きます。 */
export function resolveImageRefs(refs: ImageRef[] | undefined | null): ResolvedImage[] {
  if (!refs?.length) return [];
  return refs
    .map((r) => resolveImageRef(r))
    .filter((r): r is ResolvedImage => r !== undefined);
}

/** 開発時の気づき用: データに書かれているのに存在しない画像を列挙する */
export function findMissingImages(refs: (ImageRef | undefined)[]): string[] {
  return refs
    .filter((r) => r?.src && !resolveImage(r.src))
    .map((r) => r!.src);
}
