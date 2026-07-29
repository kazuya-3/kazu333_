/**
 * 応援チップ（任意の支援）。
 *
 * ▼ 設定方法
 *   .env に外部決済リンクを設定します。
 *     PUBLIC_TIP_URL_300=https://buy.stripe.com/xxxx
 *     PUBLIC_TIP_URL_500=...
 *     PUBLIC_TIP_URL_1000=...
 *     PUBLIC_TIP_URL_CUSTOM=...   （金額自由入力ページの URL）
 *
 *   Stripe Payment Links、PayPal.me、Buy Me a Coffee など、
 *   金額ごとのページ URL を貼るだけで動きます。
 *   未設定の項目はボタンを出さず、「準備中」と表示します。
 */

const env = import.meta.env;

export interface TipOption {
  amount: number | null;
  label: string;
  url: string;
}

export const support = {
  heading: '活動を応援する',
  lead: '制作や新しいツール開発を応援していただけると、とても励みになります。',
  note: '特典や個別対応を伴わない、任意の応援です。ご依頼や商品購入とは関係ありません。',
  preparingText: '応援の受け付けは準備中です。もう少しお待ちください。',
};

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
