/**
 * サイト全体の基本情報。
 * サイト名・キャッチコピー・連絡先・SNS・SEO の既定値をここで管理します。
 *
 * ▼ よく変更する場所
 *   - name       : サイト名（ヘッダー・フッター・タイトルに反映）
 *   - owner      : 運営者名
 *   - contact    : メールアドレス
 *   - social     : SNS リンク
 */

export interface SocialLink {
  label: string;
  url: string;
  handle?: string;
}

export const site = {
  /** サイト名。候補: KAZU WORKS / Small Fix Studio / KAZUYA Creative Lab */
  name: 'KAZU WORKS',
  /** 英字ロゴの表示（ヘッダー・フッター） */
  nameEn: 'KAZU WORKS',
  /** ブラウザタブなどに出る短い説明 */
  tagline: 'IT・資料・デザインの“小さな困りごと”を、形にします。',

  /** 運営者名。本番公開前に実名または活動名へ差し替えてください。 */
  owner: 'KAZUYA',
  /** 肩書き */
  ownerRole: 'システムエンジニア / 個人制作',

  /** トップのメインメッセージ群 */
  message: {
    main: 'IT・資料・デザインの“小さな困りごと”を、形にします。',
    sub: 'システム修正、データ整理、資料作成、SNS素材まで。完全オンライン・固定報酬で、小さな相談から対応します。',
    support:
      'まだ依頼内容がまとまっていなくても大丈夫です。“こういうことはできる？”という段階から、一緒に整理します。',
    world: '見るだけでも、買うだけでも、相談だけでも。小さな困りごとやアイデアを、形にする入口。',
  },

  /** ファーストビューの見出し */
  hero: {
    headline: '小さな仕事ほど、頼める人が\n見つからない。',
    body: 'システム修正、データ整理、資料作成、SNS素材まで。完全オンライン・固定報酬で、小さな相談から対応します。',
    points: ['平日夜・土日対応', '小規模案件歓迎', 'オンライン完結', '固定報酬', '相談から対応可能'],
  },

  /** 連絡先。メールアドレスは本番公開前に実際のものへ差し替えてください。 */
  contact: {
    email: 'hello@example.com',
    /** メールアドレスを実運用のものへ変えたか。false の間はサイト上に「準備中」と表示します。 */
    emailConfigured: false,
    /** 返信までの目安 */
    replyTime: '2〜3日以内（平日夜・土日を中心に確認しています）',
  },

  /** 対応時間 */
  availability: {
    hours: '平日 20:00〜23:00 / 土日 10:00〜21:00',
    note: '本業と両立しているため、平日日中の連絡はお返事が遅れることがあります。',
    style: '完全オンライン・固定報酬・納品型',
  },

  /** SNS。不要な項目は配列から削除してください。 */
  social: [
    { label: 'X (Twitter)', url: 'https://x.com/', handle: '@your_account' },
    { label: 'BOOTH', url: 'https://booth.pm/' },
  ] as SocialLink[],

  /** SEO 既定値 */
  seo: {
    defaultTitle: 'KAZU WORKS｜IT・資料・デザインの小さな困りごとを形にします',
    titleTemplate: '%s｜KAZU WORKS',
    description:
      'システムの軽微な修正、Excel・CSVのデータ整理、SQL作成、操作マニュアルや仕様書づくり、SNS画像や配信素材の制作まで。完全オンライン・固定報酬で、小さな相談から個人が対応します。簡易見積もりもその場で確認できます。',
    /** OGP 画像。public/ 配下のパス（BASE_PATH は自動で付きます） */
    ogImage: '/og-image.png',
    locale: 'ja_JP',
    /** X カードの @ アカウント。未設定なら出力しません。 */
    twitterHandle: '',
  },

  /** 応援チップやショップで扱う通貨 */
  currency: 'JPY',
} as const;

export type Site = typeof site;
