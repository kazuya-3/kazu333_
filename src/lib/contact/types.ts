/**
 * 問い合わせ送信の共通インターフェース。
 * 送信先を差し替えるときは、この型を満たすアダプターを追加するだけで済みます。
 */

export interface ContactPayload {
  name: string;
  email: string;
  field: string;
  message: string;
  deadline: string;
  budget: string;
  referenceUrl: string;
  replyMethod: string;
  note: string;
  /** 簡易見積もりからの引き継ぎ内容（なければ空文字） */
  estimate: string;
  /** 添付ファイル（1件まで） */
  file: File | null;
  /** ボット対策の隠しフィールド。値が入っていたら送信しない。 */
  honeypot: string;
}

export type SendResult =
  | { ok: true; mock?: boolean }
  | { ok: false; reason: 'network' | 'server' | 'validation' | 'unconfigured'; detail?: string };

export interface ContactAdapter {
  readonly name: string;
  /** 開発用のモック送信かどうか（画面に注意書きを出すために使用） */
  readonly isMock: boolean;
  send(payload: ContactPayload): Promise<SendResult>;
}
