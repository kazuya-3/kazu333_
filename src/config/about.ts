/**
 * 自己紹介・スキル・経歴・使用ツール。
 *
 * ▼ 内容の編集
 *   実データは src/data/about.json にあります。
 *   管理画面（/admin/）の「自己紹介」から編集できます。
 *
 * 経歴やスキルは、本番公開前にご自身の内容へ差し替えてください。
 */

import aboutData from '../data/about.json';

export interface SkillGroup {
  label: string;
  accent: 'system' | 'document' | 'creative';
  items: string[];
}

export interface AboutValue {
  title: string;
  body: string;
}

export interface CareerRow {
  period: string;
  body: string;
}

interface AboutData {
  heading: string;
  paragraphs: string[];
  values: AboutValue[];
  career: CareerRow[];
  skillGroups: SkillGroup[];
  tools: string[];
}

const data = aboutData as AboutData;

export const about = {
  heading: data.heading,
  paragraphs: data.paragraphs,
  values: data.values,
};

export const career = data.career;
export const skillGroups = data.skillGroups;
export const tools = data.tools;
