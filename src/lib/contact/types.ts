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
  | { ok: true }
  | { ok: false; reason: 'network' | 'server' | 'validation' | 'unconfigured'; detail?: string };

/**
 * mock   : 実際には送らない（開発用）
 * mailto : 利用者のメールソフトを開いて、本人に送信してもらう
 * remote : 外部サービスや自前APIへ送信する
 *
 * kind によって、画面の案内文と完了画面の文言が変わります。
 */
export type AdapterKind = 'mock' | 'mailto' | 'remote';

export interface ContactAdapter {
  readonly name: string;
  readonly kind: AdapterKind;
  /** 添付ファイルを送れるか（mailto は送れないため、画面で案内します） */
  readonly supportsAttachment: boolean;
  send(payload: ContactPayload): Promise<SendResult>;
}
