/**
 * ナビゲーション。パスは BASE_PATH が自動で付きます（src/lib/url.ts）。
 */

export interface NavItem {
  label: string;
  labelEn: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: 'できること', labelEn: 'Services', href: '/#services' },
  { label: '実績', labelEn: 'Works', href: '/works' },
  { label: '見積もり', labelEn: 'Estimate', href: '/estimate' },
  { label: 'ショップ', labelEn: 'Shop', href: '/shop' },
  { label: '自己紹介', labelEn: 'About', href: '/#about' },
  { label: '相談する', labelEn: 'Contact', href: '/contact' },
];

/** モバイル画面下部の固定アクションバー */
export const bottomBarNav: { label: string; href: string; icon: 'estimate' | 'contact' | 'shop' }[] =
  [
    { label: '見積もる', href: '/estimate', icon: 'estimate' },
    { label: '相談する', href: '/contact', icon: 'contact' },
    { label: 'ショップ', href: '/shop', icon: 'shop' },
  ];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'サービス',
    items: [
      { label: 'できること', labelEn: 'Services', href: '/#services' },
      { label: '依頼の流れ', labelEn: 'Flow', href: '/#flow' },
      { label: '簡易見積もり', labelEn: 'Estimate', href: '/estimate' },
      { label: 'よくある質問', labelEn: 'FAQ', href: '/#faq' },
    ],
  },
  {
    heading: '制作と商品',
    items: [
      { label: '制作実績', labelEn: 'Works', href: '/works' },
      { label: 'ショップ', labelEn: 'Shop', href: '/shop' },
      { label: '自己紹介', labelEn: 'About', href: '/#about' },
    ],
  },
  {
    heading: 'サイトについて',
    items: [
      { label: 'ご相談フォーム', labelEn: 'Contact', href: '/contact' },
      { label: 'プライバシーポリシー', labelEn: 'Privacy', href: '/privacy' },
      { label: '利用規約', labelEn: 'Terms', href: '/terms' },
      { label: '特定商取引法に基づく表記', labelEn: 'Legal', href: '/legal/tokushoho' },
    ],
  },
];
