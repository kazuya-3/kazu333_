/**
 * 自前の API エンドポイントへの送信（将来の拡張用）。
 *
 * .env:
 *   PUBLIC_CONTACT_PROVIDER=endpoint
 *   PUBLIC_CONTACT_ENDPOINT=https://api.example.com/contact
 *
 * サーバー側でメール送信・保存・スパム判定などを行う想定です。
 * 認証が必要な API を使う場合でも、鍵をブラウザへ埋め込まないでください。
 * （サーバー側で受けてから、そのサーバーが秘密鍵を使う構成にします）
 */

import type { ContactAdapter, ContactPayload, SendResult } from './types';

export function createEndpointAdapter(endpoint: string): ContactAdapter {
  return {
    name: 'endpoint',
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
      body.append('name', payload.name);
      body.append('email', payload.email);
      body.append('field', payload.field);
      body.append('message', payload.message);
      body.append('deadline', payload.deadline);
      body.append('budget', payload.budget);
      body.append('referenceUrl', payload.referenceUrl);
      body.append('replyMethod', payload.replyMethod);
      body.append('note', payload.note);
      body.append('estimate', payload.estimate);
      if (payload.file) body.append('file', payload.file, payload.file.name);

      try {
        const res = await fetch(endpoint, { method: 'POST', body });
        if (res.ok) return { ok: true };
        if (res.status >= 400 && res.status < 500) {
          return { ok: false, reason: 'validation', detail: `HTTP ${res.status}` };
        }
        return { ok: false, reason: 'server', detail: `HTTP ${res.status}` };
      } catch {
        return { ok: false, reason: 'network' };
      }
    },
  };
}
