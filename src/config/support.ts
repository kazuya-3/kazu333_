/**
 * 応援チップ（任意の支援）。
 *
 * ▼ 文言の編集
 *   見出しや説明文は src/data/support.json にあります。
 *   管理画面（/admin/）の「応援チップ」から編集できます。
 *
 * ▼ 決済リンクの設定
 *   URL は .env で設定します（管理画面では扱いません）。
 *     PUBLIC_TIP_URL_300=https://buy.stripe.com/xxxx
 *     PUBLIC_TIP_URL_500=...
 *     PUBLIC_TIP_URL_1000=...
 *     PUBLIC_TIP_URL_CUSTOM=...   （金額自由入力ページの URL）
 *
 *   未設定の項目はボタンを出さず、すべて未設定なら「準備中」と表示します。
 */

import supportData from '../data/support.json';

const env = import.meta.env;

export interface TipOption {
  amount: number | null;
  label: string;
  url: string;
}

export interface SupportText {
  heading: string;
  lead: string;
  note: string;
  preparingText: string;
}

export const support = supportData as SupportText;

export const tipOptions: TipOption[] = [
  { amount: 300, label: '300円', url: env.PUBLIC_TIP_URL_300 ?? '' },
  { amount: 500, label: '500円', url: env.PUBLIC_TIP_URL_500 ?? '' },
  { amount: 1000, label: '1,000円', url: env.PUBLIC_TIP_URL_1000 ?? '' },
  { amount: null, label: '自由入力', url: env.PUBLIC_TIP_URL_CUSTOM ?? '' },
];

/** 1 つでもリンクが設定されているか */
export const hasTipLinks = tipOptions.some((t) => t.url.length > 0);

/** 実際に表示するリンクだけを抜き出したもの */
export const availableTips = tipOptions.filter((t) => t.url.length > 0);
