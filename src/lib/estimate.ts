/**
 * 簡易見積もりの計算。
 *
 * 料率・金額はすべて src/config/pricing.ts にあり、
 * ここには「どう組み合わせるか」だけを書いています。
 * 画面側（EstimateWizard）は、この関数の戻り値を表示するだけです。
 *
 * 計算の流れ:
 *   1. 依頼内容から基準レンジ（金額・日数）を取得
 *   2. 規模の倍率を掛ける
 *   3. 数量による加算率を求める（点数に比例させず、逓減させる）
 *   4. 追加条件の加算率を合計する（上限あり）
 *   5. 金額へ適用し、最低額・丸め単位を適用
 *   6. しきい値を超えたら金額を出さず「要見積もり」にする
 *   7. 納期を算出する
 */

import {
  estimateFields,
  extraQuestions,
  rules,
  scaleOptions,
  tax,
  type EstimateField,
  type ExtraOption,
  type FieldKey,
  type Range,
  type TaskOption,
} from '../config/pricing';

export interface EstimateInput {
  field: FieldKey | null;
  taskId: string | null;
  scaleId: string | null;
  /** 追加条件。キーは extraQuestions の id、値は option id か数値 */
  extras: Record<string, string | number>;
}

export interface EstimateResult {
  /** 金額を提示できるか。false なら「要見積もり」 */
  quotable: boolean;
  /** 概算金額（円・税込）。quotable が false なら null */
  price: { min: number; max: number } | null;
  /** 想定納期（日） */
  days: { min: number; max: number };
  /** 納期が長すぎて提示できない場合 true */
  daysOverflow: boolean;
  /** 想定内容の要約 */
  summary: string;
  /** 選択内容のラベル一覧（確認表示・フォーム引き継ぎに使用） */
  selections: { label: string; value: string }[];
  /** 加算・補足の説明 */
  notes: string[];
  /** 要見積もりになった理由 */
  quoteReason: string | null;
  /** 税表示ラベル */
  taxLabel: string;
}

export const emptyExtras = (): Record<string, string | number> => {
  const result: Record<string, string | number> = {};
  for (const q of extraQuestions) {
    if (q.defaultValue !== undefined) result[q.id] = q.defaultValue;
  }
  return result;
};

export const emptyInput = (): EstimateInput => ({
  field: null,
  taskId: null,
  scaleId: null,
  extras: emptyExtras(),
});

export function getField(key: FieldKey | null): EstimateField | undefined {
  return estimateFields.find((f) => f.key === key);
}

export function getTask(key: FieldKey | null, taskId: string | null): TaskOption | undefined {
  return getField(key)?.tasks.find((t) => t.id === taskId);
}

/** 表示用の金額整形 */
export function formatYen(value: number): string {
  return `${value.toLocaleString('ja-JP')}円`;
}

function roundTo(value: number, unit: number): number {
  return Math.max(unit, Math.round(value / unit) * unit);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** 数量による加算率。点数に単純比例させず、増えるほど 1 点あたりを緩やかにする。 */
function quantityRate(quantity: number, perUnitRate: number): number {
  if (quantity <= 1) return 0;
  let rate = 0;
  for (let i = 2; i <= quantity; i += 1) {
    // 2点目は perUnitRate、以降は少しずつ逓減（最低 30%）
    rate += perUnitRate * Math.max(0.3, 1 - (i - 2) * 0.06);
  }
  return rate;
}

export function calculateEstimate(input: EstimateInput): EstimateResult {
  const field = getField(input.field);
  const task = getTask(input.field, input.taskId);
  const scale = scaleOptions.find((s) => s.id === input.scaleId) ?? scaleOptions[1];

  const source = task ?? field?.fallback;
  const base: Range = source ? [...source.base] : [3000, 15000];
  const baseDays: Range = source ? [...source.days] : [3, 7];
  const summary = source?.summary ?? '内容を伺ったうえで、対応できる範囲をご提案します';

  const selections: { label: string; value: string }[] = [];
  const notes: string[] = [];
  let requiresQuote = false;
  let quoteReason: string | null = null;

  if (field) selections.push({ label: '分野', value: field.label });
  if (task) selections.push({ label: '依頼内容', value: task.label });
  selections.push({ label: '規模', value: scale.label });

  // --- 追加条件の集計 ---
  let extraRate = 0;
  let dayFactorMin = 1;
  let dayFactorMax = 1;
  let quantity = 1;

  for (const question of extraQuestions) {
    const value = input.extras[question.id];
    if (value === undefined || value === '') continue;

    if (question.type === 'number') {
      const num = clamp(Number(value) || 1, question.min ?? 1, question.max ?? 30);
      if (question.id === 'quantity') quantity = num;
      if (question.perUnitRate) extraRate += quantityRate(num, question.perUnitRate);
      if (num > 1) selections.push({ label: question.label, value: `${num}点` });
      continue;
    }

    const option: ExtraOption | undefined = question.options?.find((o) => o.id === value);
    if (!option) continue;

    selections.push({ label: question.label, value: option.label });

    if (question.informational) continue;

    extraRate += option.rate ?? 0;
    if (option.dayFactor) {
      dayFactorMin *= option.dayFactor;
      dayFactorMax *= option.dayFactor;
    }
    if (option.note) notes.push(option.note);
    if (option.requiresQuote) {
      requiresQuote = true;
      quoteReason = option.note ?? '内容を確認したうえで、個別にご案内します';
    }
  }

  // 数量が多いと日数も伸びる（金額ほどは伸ばさない）
  if (quantity > 1) {
    const qDay = 1 + (quantity - 1) * 0.08;
    dayFactorMin *= qDay;
    dayFactorMax *= qDay;
  }

  extraRate = clamp(extraRate, -0.2, rules.maxTotalRate);

  // --- 金額 ---
  const rawMin = base[0] * scale.multiplier[0] * (1 + extraRate);
  const rawMax = base[1] * scale.multiplier[1] * (1 + extraRate);

  let priceMin = roundTo(Math.max(rules.minimumFee, rawMin), rules.roundTo);
  let priceMax = roundTo(Math.max(priceMin + rules.roundTo, rawMax), rules.roundTo);

  if (!requiresQuote && priceMax > rules.quoteThreshold) {
    requiresQuote = true;
    quoteReason =
      '想定される作業量が大きいため、内容を確認したうえで個別にお見積もりします。範囲を分けて進めることもできます。';
  }

  // --- 納期 ---
  const dayMin = Math.max(
    rules.minDays,
    Math.round(baseDays[0] * scale.dayMultiplier[0] * dayFactorMin),
  );
  const dayMax = Math.max(dayMin + 1, Math.round(baseDays[1] * scale.dayMultiplier[1] * dayFactorMax));
  const daysOverflow = dayMax > rules.maxDays;

  if (extraRate > 0.8) {
    notes.push('条件が多いため、幅を広めに出しています。実際の内容に応じて調整できます。');
  }

  return {
    quotable: !requiresQuote,
    price: requiresQuote ? null : { min: priceMin, max: priceMax },
    days: { min: dayMin, max: Math.min(dayMax, rules.maxDays) },
    daysOverflow,
    summary,
    selections,
    notes: [...new Set(notes)],
    quoteReason,
    taxLabel: tax.label,
  };
}

/** 見積もり結果を、問い合わせフォームへ引き継ぐためのテキストに変換する */
export function estimateToText(result: EstimateResult): string {
  const lines: string[] = [];
  for (const s of result.selections) {
    lines.push(`${s.label}: ${s.value}`);
  }
  if (result.price) {
    lines.push(
      `概算: ${formatYen(result.price.min)}〜${formatYen(result.price.max)}（${result.taxLabel}）`,
    );
  } else {
    lines.push('概算: 要見積もり');
  }
  lines.push(
    result.daysOverflow
      ? '想定納期: 要相談'
      : `想定納期: ${result.days.min}〜${result.days.max}日`,
  );
  lines.push(`想定内容: ${result.summary}`);
  return lines.join('\n');
}

/** sessionStorage のキー（見積もり → フォームの引き継ぎと入力保持に使用） */
export const ESTIMATE_STORAGE_KEY = 'kazuworks.estimate.v1';

export interface StoredEstimate {
  input: EstimateInput;
  text: string;
  fieldKey: FieldKey | null;
  savedAt: number;
}
