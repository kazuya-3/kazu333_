/**
 * FAQ。
 *
 * ▼ 内容の編集
 *   実データは src/data/faq.json にあります。
 *   管理画面（/admin/）の「よくある質問」から編集できます。
 *
 * ここに書いた内容は、検索エンジン向けの構造化データ（FAQPage）にも使われます。
 */

import faqData from '../data/faq.json';

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = (faqData as { items: FaqItem[] }).items;
