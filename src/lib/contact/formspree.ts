/**
 * 外部フォームサービス（Formspree 互換）への送信。
 *
 * .env:
 *   PUBLIC_CONTACT_PROVIDER=formspree
 *   PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxx
 *
 * multipart/form-data で送るため、添付ファイルもそのまま送信できます。
 * API キーは不要です（エンドポイント URL のみ。秘密情報は扱いません）。
 */

import type { ContactAdapter, ContactPayload, SendResult } from './types';

export function createFormspreeAdapter(endpoint: string): ContactAdapter {
  return {
    name: 'formspree',
    kind: 'remote',
    supportsAttachment: true,
    async send(payload: ContactPayload): Promise<SendResult> {
      if (!endpoint) {
        return { ok: false, reason: 'unconfigured' };
      }
      if (payload.honeypot) {
        return { ok: true };
      }

      const body = new FormData();
      body.append('お名前', payload.name);
      body.append('email', payload.email);
      body.append('相談分野', payload.field);
      body.append('依頼内容', payload.message);
      body.append('希望納期', payload.deadline);
      body.append('ご予算', payload.budget);
      body.append('参考URL', payload.referenceUrl);
      body.append('希望する連絡方法', payload.replyMethod);
      body.append('補足', payload.note);
      body.append('簡易見積もり', payload.estimate);
      if (payload.file) body.append('添付ファイル', payload.file, payload.file.name);

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body,
        });
        if (res.ok) return { ok: true };
        return { ok: false, reason: 'server', detail: `HTTP ${res.status}` };
      } catch {
        return { ok: false, reason: 'network' };
      }
    },
  };
}
