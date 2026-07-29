/**
 * メールソフトを開いて送信してもらう方式。
 *
 * 外部サービスの契約もサーバーも要らず、
 * src/config/site.ts の contact.email を設定するだけで問い合わせが届くようになります。
 * 小規模な受注窓口では、これで十分に運用できます。
 *
 * 制約:
 *   - 添付ファイルは送れません（画面で案内し、後から返信に添付してもらいます）
 *   - mailto の URL には長さの上限があるため、長文は末尾を省略します
 *   - 送信は利用者のメールソフト側で完了させる必要があります
 *
 * きちんとフォームで受け取りたくなったら、.env で formspree / endpoint に切り替えてください。
 */

import type { ContactAdapter, ContactPayload, SendResult } from './types';

/** mailto の URL 長の上限（余裕を持たせた値）。超える分は本文末尾を省略します。 */
const MAX_URL_LENGTH = 1800;

function buildBody(payload: ContactPayload): string {
  const lines = [
    `お名前・活動名: ${payload.name}`,
    `メールアドレス: ${payload.email}`,
    `相談分野: ${payload.field}`,
    `希望納期: ${payload.deadline}`,
    `ご予算: ${payload.budget}`,
    `希望する連絡方法: ${payload.replyMethod}`,
  ];

  if (payload.referenceUrl) lines.push(`参考URL: ${payload.referenceUrl}`);

  lines.push('', '── ご相談内容 ──', payload.message);

  if (payload.note) lines.push('', '── 補足 ──', payload.note);
  if (payload.estimate) lines.push('', '── 簡易見積もりの内容 ──', payload.estimate);
  if (payload.file) {
    lines.push(
      '',
      '── 添付について ──',
      `「${payload.file.name}」を添付したいと考えています。このメールに直接添付してお送りください。`,
    );
  }

  return lines.join('\n');
}

export function createMailtoAdapter(email: string): ContactAdapter {
  return {
    name: 'mailto',
    kind: 'mailto',
    supportsAttachment: false,
    async send(payload: ContactPayload): Promise<SendResult> {
      if (!email) {
        return { ok: false, reason: 'unconfigured' };
      }
      if (payload.honeypot) {
        return { ok: true };
      }

      const subject = `【ご相談】${payload.field}／${payload.name}`;
      let body = buildBody(payload);

      // URL が長くなりすぎるとメールソフトが開けないため、本文の末尾を省略する
      const overhead = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=`.length;
      while (encodeURIComponent(body).length + overhead > MAX_URL_LENGTH && body.length > 200) {
        body = body.slice(0, Math.floor(body.length * 0.9));
      }
      if (encodeURIComponent(body).length + overhead > MAX_URL_LENGTH) {
        body = `${body}\n\n（本文が長いため、ここで省略されています。続きを書き足してください）`;
      }

      const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      try {
        window.location.href = href;
        return { ok: true };
      } catch {
        return { ok: false, reason: 'network' };
      }
    },
  };
}
