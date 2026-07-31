/**
 * 法的ページの記載内容。
 *
 * ▼ 内容の編集
 *   実データは src/data/legal.json にあります。
 *   管理画面（/admin/）の「法的表記」から編集できます。
 *
 * ⚠ 重要
 *   同梱の文章は「雛形」です。法律上の判断を確定させたものではありません。
 *   公開前に、実際の運営実態に合わせて必ず内容を見直し、
 *   必要に応じて専門家（弁護士・行政書士等）へご確認ください。
 *
 *   氏名・住所・電話番号などは、勝手な仮の値を入れていません。
 *   値が空のままの項目は、サイト上に「要入力」と表示されます。
 */

import legalData from '../data/legal.json';

export interface LegalEntry {
  label: string;
  /** 値。空文字のままだと画面に「要入力」と表示されます。 */
  value: string;
  /** 補足説明 */
  note?: string;
}

export interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalData {
  updatedAt: string;
  tokushoho: LegalEntry[];
  privacySections: LegalSection[];
  termsSections: LegalSection[];
}

const data = legalData as LegalData;

/** 最終更新日 */
export const legalUpdatedAt = data.updatedAt;

/** 特定商取引法に基づく表記 */
export const tokushoho = data.tokushoho;

/** プライバシーポリシー */
export const privacySections = data.privacySections;

/** 利用規約 */
export const termsSections = data.termsSections;

/** 未入力の項目が残っているか（画面の注意表示に使用） */
export function hasUnfilledEntries(entries: LegalEntry[]): boolean {
  return entries.some((e) => e.value.trim() === '');
}
