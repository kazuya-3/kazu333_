/**
 * 開発用のモック送信。
 * 実際には送信せず、少し待ってから成功を返します。
 * 個人情報はログへ出しません（件名相当の情報だけを出します）。
 */

import type { ContactAdapter, ContactPayload, SendResult } from './types';

export const mockAdapter: ContactAdapter = {
  name: 'mock',
  kind: 'mock',
  supportsAttachment: true,
  async send(payload: ContactPayload): Promise<SendResult> {
    if (payload.honeypot) {
      // ボットの可能性が高い。成功を返して静かに握りつぶす。
      return { ok: true };
    }
    await new Promise((resolve) => setTimeout(resolve, 700));
    if (import.meta.env.DEV) {
      // 入力内容そのものは出力しない
      console.info('[contact:mock] 送信をシミュレートしました', {
        field: payload.field,
        hasFile: payload.file !== null,
        hasEstimate: payload.estimate.length > 0,
      });
    }
    return { ok: true };
  },
};
