/**
 * 「よくある相談」と「対応できること」。
 *
 * ▼ 内容の編集
 *   実データは src/data/services.json にあります。
 *   管理画面（/admin/）の「できること・よくある相談」から編集できます。
 *
 * 技術名ではなく、利用者の困りごとの言葉で書いてください。
 */

import servicesData from '../data/services.json';

export type CategoryKey = 'system' | 'document' | 'creative';

export interface ServiceCategory {
  key: CategoryKey;
  /** 英字ラベル（カードの上に小さく出ます） */
  label: string;
  title: string;
  description: string;
  /** 対応できることの一覧 */
  items: string[];
  /** 目安の価格帯 */
  priceHint: string;
  icon: 'system' | 'document' | 'creative';
}

export interface Concern {
  text: string;
  category: CategoryKey;
}

interface ServicesData {
  commonConcerns: Concern[];
  categories: ServiceCategory[];
  fallbackNote: string;
}

const data = servicesData as ServicesData;

/** よくある相談。困りごとの言葉のまま並べます。 */
export const commonConcerns = data.commonConcerns;

export const serviceCategories = data.categories;

/** 一覧にない依頼への案内文 */
export const serviceFallbackNote = data.fallbackNote;
