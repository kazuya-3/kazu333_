/**
 * 問い合わせフォームの設定。
 *
 * ▼ 文言・選択肢の編集
 *   案内文、相談分野、納期・予算の選択肢、送信中／完了／失敗のメッセージは
 *   src/data/contact.json にあります。
 *   管理画面（/admin/）の「問い合わせフォーム」から編集できます。
 *
 * ▼ 送信先の設定（.env）
 *   PUBLIC_CONTACT_PROVIDER で切り替えます。
 *     mailto   : 利用者のメールソフトを開いて送ってもらう（外部サービス不要）
 *     formspree: Formspree などの外部フォームサービスへ POST
 *     endpoint : 自前の API エンドポイントへ POST
 *     mock     : 送信せず成功扱い（開発用）
 *
 *   書かなくても次の順で自動的に決まります。
 *     1. PUBLIC_FORMSPREE_ENDPOINT があれば → formspree
 *     2. PUBLIC_CONTACT_ENDPOINT があれば   → endpoint
 *     3. site.json の contact.emailConfigured が true なら → mailto
 *     4. どれも無ければ                    → mock
 *
 *   設定が不完全なときは必ず安全な方へ落とすため、サイトが壊れることはありません。
 *   実装は src/lib/contact/ を参照してください。
 */

import contactData from '../data/contact.json';
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

  // 未指定、または指定はあるが設定が足りないとき
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

export interface SelectOption {
  id: string;
  label: string;
}

interface ContactData {
  intro: { heading: string; lead: string; replyNote: string };
  fields: SelectOption[];
  deadlineOptions: SelectOption[];
  budgetOptions: SelectOption[];
  replyMethodOptions: SelectOption[];
  messages: {
    sending: string;
    success: { title: string; body: string; note: string };
    successMailto: { title: string; body: string; note: string };
    error: { title: string; body: string };
    mockNotice: string;
    mailtoNotice: string;
    mailtoAttachmentNotice: string;
  };
}

const data = contactData as ContactData;

/** フォーム上部の案内文 */
export const contactIntro = data.intro;

/** 相談分野の選択肢。見積もりからの引き継ぎでも同じ値を使います。 */
export const contactFields = data.fields;

export const deadlineOptions = data.deadlineOptions;
export const budgetOptions = data.budgetOptions;
export const replyMethodOptions = data.replyMethodOptions;

/** 送信状態ごとのメッセージ */
export const contactMessages = data.messages;
