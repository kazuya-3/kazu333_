/**
 * サイト全体の基本情報。
 *
 * ▼ 内容の編集
 *   実データは src/data/site.json にあります。
 *   管理画面（/admin/）の「サイト基本情報」から編集できます。
 *
 * ▼ 本番公開前に必ず変えるところ
 *   - owner            : 運営者名
 *   - contact.email    : 連絡先メールアドレス
 *   - contact.emailConfigured : 実アドレスにしたら true
 *   - social           : SNS リンク
 */

import siteData from '../data/site.json';

export interface SocialLink {
  label: string;
  url: string;
  handle?: string;
}

export interface Site {
  /** サイト名。候補: KAZU WORKS / Small Fix Studio / KAZUYA Creative Lab */
  name: string;
  /** 英字ロゴの表示（ヘッダー・フッター） */
  nameEn: string;
  tagline: string;
  /** 運営者名 */
  owner: string;
  ownerRole: string;
  /** トップのメッセージ群 */
  message: {
    main: string;
    sub: string;
    support: string;
    world: string;
  };
  /** ファーストビュー */
  hero: {
    headline: string;
    body: string;
    points: string[];
  };
  contact: {
    email: string;
    /** 実運用のアドレスにしたか。false の間はサイト上に出しません。 */
    emailConfigured: boolean;
    replyTime: string;
  };
  availability: {
    hours: string;
    note: string;
    style: string;
  };
  social: SocialLink[];
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    description: string;
    /** OGP 画像。public/ 配下のパス */
    ogImage: string;
    locale: string;
    /** X カードの @ アカウント。未設定なら出力しません。 */
    twitterHandle: string;
  };
  currency: string;
}

export const site = siteData as Site;
