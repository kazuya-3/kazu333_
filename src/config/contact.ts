/**
 * 問い合わせフォームの設定。
 *
 * 送信方法は .env の PUBLIC_CONTACT_PROVIDER で切り替えます。
 *   mailto   : 利用者のメールソフトを開いて送ってもらう（外部サービス不要）
 *   formspree: Formspree などの外部フォームサービスへ POST
 *   endpoint : 自前の API エンドポイントへ POST
 *   mock     : 送信せず成功扱い（開発用）
 *
 * ▼ 既定の動作（PUBLIC_CONTACT_PROVIDER を書かなくても切り替わります）
 *   1. PUBLIC_FORMSPREE_ENDPOINT が設定されていれば → formspree
 *   2. PUBLIC_CONTACT_ENDPOINT が設定されていれば   → endpoint
 *   3. site.ts の contact.emailConfigured が true なら → mailto
 *   4. どれも無ければ                                → mock
 *
 *   つまり Formspree を使う場合は、エンドポイント URL を 1 つ設定するだけで有効になります。
 *   PUBLIC_CONTACT_PROVIDER を明示した場合は、そちらが優先されます。
 *
 * 設定が不完全なときは必ず安全な方へ落とすため、サイトが壊れることはありません。
 * 実装は src/lib/contact/ を参照してください。
 */

import { site } from './site';

const env = import.meta.env;

export type ContactProvider = 'mock' | 'mailto' | 'formspree' | 'endpoint';

function resolveProvider(): ContactProvider {
  const raw = (env.PUBLIC_CONTACT_PROVIDER ?? '').trim().toLowerCase();
  const hasFormspree = Boolean(env.PUBLIC_FORMSPREE_ENDPOINT?.trim());
  const hasEndpoint = Boolean(env.PUBLIC_CONTACT_ENDPOINT?.trim());

  // 明示指定があり、必要な設定も揃っている場合はそれを使う
  if (raw === 'mock') return 'mock';
  if (raw === 'formspree' && hasFormspree) return 'formspree';
  if (raw === 'endpoint' && hasEndpoint) return 'endpoint';
  if (raw === 'mailto' && site.contact.emailConfigured) return 'mailto';

  // 未指定、または指定はあるが設定が足りないとき。
  // 送信先の URL があればそれを使い、無ければメール、それも無ければモック。
  if (hasFormspree) return 'formspree';
  if (hasEndpoint) return 'endpoint';
  return site.contact.emailConfigured ? 'mailto' : 'mock';
}

export const contactConfig = {
  provider: resolveProvider(),
  formspreeEndpoint: env.PUBLIC_FORMSPREE_ENDPOINT ?? '',
  customEndpoint: env.PUBLIC_CONTACT_ENDPOINT ?? '',
  upload: {
    maxMb: Number(env.PUBLIC_UPLOAD_MAX_MB ?? 10),
    accept:
      env.PUBLIC_UPLOAD_ACCEPT ??
      '.png,.jpg,.jpeg,.gif,.pdf,.zip,.xlsx,.csv,.txt,.docx,.pptx',
  },
};

/** フォーム上部の案内文 */
export const contactIntro = {
  heading: 'ご相談フォーム',
  lead: 'まだ内容がまとまっていなくても大丈夫です。“こういうことはできる？”という段階から、一緒に整理します。',
  replyNote: 'お返事は2〜3日以内を目安にしています（平日夜・土日を中心に確認しています）。',
};

/** 相談分野の選択肢。見積もりからの引き継ぎでも同じ値を使います。 */
export const contactFields = [
  { id: 'system', label: 'システム・データ' },
  { id: 'document', label: '資料・ドキュメント' },
  { id: 'design', label: 'デザイン・SNS素材' },
  { id: 'ai', label: 'AI活用・プロンプト' },
  { id: 'shop', label: 'ショップの商品について' },
  { id: 'unknown', label: 'まだ分からない・その他' },
];

export const deadlineOptions = [
  { id: 'flexible', label: '相談して決めたい' },
  { id: 'within1w', label: '1週間以内' },
  { id: 'within2w', label: '2週間以内' },
  { id: 'within1m', label: '1か月以内' },
  { id: 'later', label: '急いでいない' },
];

export const budgetOptions = [
  { id: 'under5000', label: '3,000円〜5,000円' },
  { id: 'under10000', label: '5,000円〜10,000円' },
  { id: 'under30000', label: '10,000円〜30,000円' },
  { id: 'over30000', label: '30,000円以上' },
  { id: 'unknown', label: '相場が分からない' },
  { id: 'consult', label: '相談したい' },
];

export const replyMethodOptions = [
  { id: 'email', label: 'メール' },
  { id: 'x', label: 'X（旧Twitter）のDM' },
  { id: 'either', label: 'どちらでもよい' },
];

/** 送信状態ごとのメッセージ */
export const contactMessages = {
  sending: '送信しています。少しお待ちください。',
  success: {
    title: 'ご相談を受け付けました',
    body: 'ありがとうございます。内容を確認のうえ、2〜3日以内にご連絡します。しばらくお待ちください。',
    note: '自動返信メールは送信していません。お手元に控えが必要な場合は、この画面をスクリーンショットで残してください。',
  },
  /** mailto 方式のときの完了画面 */
  successMailto: {
    title: 'メールの作成画面を開きました',
    body: 'ご入力いただいた内容が本文に入った状態で、メールが作成されます。最後にご自身で送信してください。',
    note: 'メールソフトが開かない場合は、お手数ですが下記のアドレス宛に直接お送りください。',
  },
  error: {
    title: '送信できませんでした',
    body: '通信の状態を確認して、もう一度お試しください。何度か試しても送れない場合は、お手数ですがメールでご連絡ください。',
  },
  mockNotice:
    '現在このフォームは開発用の設定（モック送信）です。実際には送信されません。送信先の設定方法は README をご覧ください。',
  mailtoNotice:
    '送信ボタンを押すと、お使いのメールソフトが起動し、入力内容が入ったメールが作成されます。最後にご自身で送信してください。',
  mailtoAttachmentNotice:
    'この方式ではファイルを直接添付できません。ファイル名だけをお伝えしますので、作成されたメールにそのまま添付してください。',
};
