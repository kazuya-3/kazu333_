/**
 * 問い合わせ送信アダプターの選択。
 *
 * .env の PUBLIC_CONTACT_PROVIDER に応じて送信先を切り替えます。
 * 設定が無い・不完全な場合は必ず安全な方へ落として、画面が壊れないようにしています。
 *
 * 拡張するときは:
 *   1. types.ts の ContactAdapter を満たすファイルを追加
 *   2. この switch に 1 行足す
 *   3. .env.example へ設定例を追記
 */

import { contactConfig } from '../../config/contact';
import { site } from '../../config/site';
import { mockAdapter } from './mock';
import { createMailtoAdapter } from './mailto';
import { createFormspreeAdapter } from './formspree';
import { createEndpointAdapter } from './endpoint';
import type { ContactAdapter } from './types';

export function getContactAdapter(): ContactAdapter {
  switch (contactConfig.provider) {
    case 'formspree':
      return createFormspreeAdapter(contactConfig.formspreeEndpoint);
    case 'endpoint':
      return createEndpointAdapter(contactConfig.customEndpoint);
    case 'mailto':
      return createMailtoAdapter(site.contact.email);
    case 'mock':
    default:
      return mockAdapter;
  }
}

export type { ContactAdapter, ContactPayload, SendResult, AdapterKind } from './types';
