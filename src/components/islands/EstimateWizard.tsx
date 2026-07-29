import { useCallback, useEffect, useMemo, useRef, useState } from 'preact/hooks';
import {
  estimateFields,
  extraQuestions,
  scaleOptions,
  estimateNote,
  tax,
} from '../../config/pricing';
import type { FieldKey } from '../../config/pricing';
import {
  ESTIMATE_STORAGE_KEY,
  calculateEstimate,
  emptyInput,
  estimateToText,
  formatYen,
  getField,
  type EstimateInput,
  type StoredEstimate,
} from '../../lib/estimate';
import './EstimateWizard.css';

interface Props {
  /** 問い合わせページの URL（base 付き） */
  contactUrl: string;
}

const STEPS = [
  { id: 1, label: '分野', hint: 'どの分野のご相談ですか' },
  { id: 2, label: '依頼内容', hint: '近いものをお選びください' },
  { id: 3, label: '規模', hint: 'だいたいの分量を教えてください' },
  { id: 4, label: '条件', hint: '分かる範囲で大丈夫です' },
] as const;

const TOTAL_STEPS = STEPS.length;

/** 数値をなめらかに変化させる（reduced-motion のときは即時反映） */
function useCountUp(target: number, active: boolean): number {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);

  useEffect(() => {
    if (!active) {
      setValue(target);
      return;
    }
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(target);
      fromRef.current = target;
      return;
    }

    const from = fromRef.current;
    const start = performance.now();
    const duration = 520;
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);

  return value;
}

function readStored(): { input: EstimateInput; step: number } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(ESTIMATE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredEstimate & { step?: number };
    if (!parsed?.input) return null;
    return { input: { ...emptyInput(), ...parsed.input }, step: parsed.step ?? 1 };
  } catch {
    return null;
  }
}

export default function EstimateWizard({ contactUrl }: Props) {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState<EstimateInput>(() => emptyInput());
  const [ready, setReady] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const headingRef = useRef<HTMLParagraphElement>(null);
  const isFirstRender = useRef(true);

  // --- 復元（再読み込み・戻る操作でも入力を保つ） ---
  useEffect(() => {
    const stored = readStored();
    const params = new URLSearchParams(window.location.search);
    const fieldParam = params.get('field') as FieldKey | null;
    const validField = estimateFields.some((f) => f.key === fieldParam);

    if (stored) {
      setInput(stored.input);
      setStep(Math.min(Math.max(stored.step, 1), TOTAL_STEPS + 1));
    } else if (fieldParam && validField) {
      setInput((prev) => ({ ...prev, field: fieldParam }));
      setStep(2);
    }
    setReady(true);
  }, []);

  const result = useMemo(() => calculateEstimate(input), [input]);
  const showResult = step > TOTAL_STEPS;

  // --- 保存 ---
  useEffect(() => {
    if (!ready) return;
    try {
      const payload: StoredEstimate & { step: number } = {
        input,
        step,
        text: estimateToText(result),
        fieldKey: input.field,
        savedAt: Date.now(),
      };
      window.sessionStorage.setItem(ESTIMATE_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // sessionStorage が使えない環境でも動作は継続する
    }
  }, [input, step, ready, result]);

  // --- ステップ移動時のフォーカスと読み上げ ---
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus();
    setAnnouncement(
      showResult
        ? '見積もり結果を表示しました'
        : `ステップ${step} / ${TOTAL_STEPS}：${STEPS[step - 1].label}`,
    );
  }, [step, showResult]);

  const field = getField(input.field);
  const tasks = field?.tasks ?? [];

  const canProceed = useMemo(() => {
    if (step === 1) return input.field !== null;
    if (step === 2) return input.taskId !== null;
    if (step === 3) return input.scaleId !== null;
    return true;
  }, [step, input]);

  const goNext = useCallback(() => {
    setStep((s) => Math.min(s + 1, TOTAL_STEPS + 1));
  }, []);

  const goBack = useCallback(() => {
    setStep((s) => Math.max(1, s - 1));
  }, []);

  const reset = useCallback(() => {
    setInput(emptyInput());
    setStep(1);
    try {
      window.sessionStorage.removeItem(ESTIMATE_STORAGE_KEY);
    } catch {
      /* noop */
    }
  }, []);

  const selectField = (key: FieldKey) => {
    // 分野を変えたら、依頼内容は選び直しになる
    setInput((prev) => (prev.field === key ? prev : { ...prev, field: key, taskId: null }));
  };

  const priceMin = useCountUp(result.price?.min ?? 0, showResult);
  const priceMax = useCountUp(result.price?.max ?? 0, showResult);

  const toContact = () => {
    // 結果を保存してから遷移する（フォーム側が sessionStorage から読み取る）
    try {
      const payload: StoredEstimate = {
        input,
        text: estimateToText(result),
        fieldKey: input.field,
        savedAt: Date.now(),
      };
      window.sessionStorage.setItem(ESTIMATE_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* noop */
    }
    window.location.href = `${contactUrl}?from=estimate`;
  };

  const progress = showResult ? 100 : ((step - 1) / TOTAL_STEPS) * 100;

  return (
    <div class="wiz">
      <p class="visually-hidden" role="status" aria-live="polite">
        {announcement}
      </p>

      {/* --- ステップ表示 --- */}
      <div class="wiz__progress">
        <ol class="wiz__steps">
          {STEPS.map((s) => {
            const state = showResult || step > s.id ? 'done' : step === s.id ? 'current' : 'todo';
            return (
              <li key={s.id} class={`wiz__step is-${state}`}>
                <span class="wiz__step-num" aria-hidden="true">
                  {state === 'done' ? '✓' : s.id}
                </span>
                <span class="wiz__step-label">{s.label}</span>
              </li>
            );
          })}
        </ol>
        <div class="wiz__bar" role="presentation">
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div class="wiz__panel">
        {!showResult && (
          <>
            <p class="wiz__heading" tabIndex={-1} ref={headingRef}>
              <span class="wiz__heading-step">
                ステップ {step} / {TOTAL_STEPS}
              </span>
              <span class="wiz__heading-hint">{STEPS[step - 1].hint}</span>
            </p>

            {/* ステップ1: 分野 */}
            {step === 1 && (
              <fieldset class="wiz__fieldset">
                <legend class="wiz__legend">どの分野のご相談ですか？</legend>
                <div class="wiz__options wiz__options--field">
                  {estimateFields.map((f) => (
                    <label key={f.key} class={`opt opt--${f.accent}`}>
                      <input
                        type="radio"
                        name="field"
                        value={f.key}
                        checked={input.field === f.key}
                        onChange={() => selectField(f.key)}
                      />
                      <span class="opt__body">
                        <span class="opt__label">{f.label}</span>
                        <span class="opt__desc">{f.description}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {/* ステップ2: 依頼内容 */}
            {step === 2 && (
              <fieldset class="wiz__fieldset">
                <legend class="wiz__legend">
                  内容として近いものはどれですか？
                  <span class="wiz__legend-sub">
                    ぴったり合うものがなければ「その他」で大丈夫です。
                  </span>
                </legend>
                <div class="wiz__options wiz__options--task">
                  {tasks.map((task) => (
                    <label key={task.id} class="opt opt--compact">
                      <input
                        type="radio"
                        name="task"
                        value={task.id}
                        checked={input.taskId === task.id}
                        onChange={() => setInput((prev) => ({ ...prev, taskId: task.id }))}
                      />
                      <span class="opt__body">
                        <span class="opt__label">{task.label}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {/* ステップ3: 規模 */}
            {step === 3 && (
              <fieldset class="wiz__fieldset">
                <legend class="wiz__legend">
                  どのくらいの分量になりそうですか？
                  <span class="wiz__legend-sub">
                    正確でなくて大丈夫です。あとから調整できます。
                  </span>
                </legend>
                <div class="wiz__options wiz__options--field">
                  {scaleOptions.map((scale) => (
                    <label key={scale.id} class="opt">
                      <input
                        type="radio"
                        name="scale"
                        value={scale.id}
                        checked={input.scaleId === scale.id}
                        onChange={() => setInput((prev) => ({ ...prev, scaleId: scale.id }))}
                      />
                      <span class="opt__body">
                        <span class="opt__label">{scale.label}</span>
                        <span class="opt__desc">{scale.description}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {/* ステップ4: 追加条件 */}
            {step === 4 && (
              <div class="wiz__extras">
                <p class="wiz__legend">
                  最後に、いくつか条件を教えてください
                  <span class="wiz__legend-sub">
                    すべて任意です。分からない項目はそのままで構いません。
                  </span>
                </p>

                <div class="extras__grid">
                  {extraQuestions.map((q) => {
                    const id = `extra-${q.id}`;
                    return (
                      <div class="extra" key={q.id}>
                        <label class="extra__label" for={id}>
                          {q.label}
                          {q.informational && <span class="extra__badge">参考</span>}
                        </label>
                        {q.help && (
                          <p class="extra__help" id={`${id}-help`}>
                            {q.help}
                          </p>
                        )}
                        {q.type === 'number' ? (
                          <input
                            id={id}
                            class="extra__input"
                            type="number"
                            inputMode="numeric"
                            min={q.min}
                            max={q.max}
                            value={String(input.extras[q.id] ?? q.defaultValue ?? 1)}
                            aria-describedby={q.help ? `${id}-help` : undefined}
                            onInput={(e) => {
                              const raw = Number((e.target as HTMLInputElement).value);
                              const safe = Number.isFinite(raw) ? raw : 1;
                              setInput((prev) => ({
                                ...prev,
                                extras: { ...prev.extras, [q.id]: safe },
                              }));
                            }}
                          />
                        ) : (
                          <select
                            id={id}
                            class="extra__input"
                            value={String(input.extras[q.id] ?? q.defaultValue ?? '')}
                            aria-describedby={q.help ? `${id}-help` : undefined}
                            onChange={(e) => {
                              const value = (e.target as HTMLSelectElement).value;
                              setInput((prev) => ({
                                ...prev,
                                extras: { ...prev.extras, [q.id]: value },
                              }));
                            }}
                          >
                            {q.options?.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div class="wiz__nav">
              {step > 1 ? (
                <button type="button" class="btn btn--quiet" onClick={goBack}>
                  ← 前へ戻る
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                class="btn btn--primary"
                onClick={goNext}
                disabled={!canProceed}
                aria-disabled={!canProceed}
              >
                {step === TOTAL_STEPS ? '概算を見る' : '次へ進む'}
              </button>
            </div>
            {!canProceed && (
              <p class="wiz__hint">ひとつ選ぶと、次へ進めます。</p>
            )}
          </>
        )}

        {/* --- 結果 --- */}
        {showResult && (
          <div class="result" role="status">
            <p class="wiz__heading" tabIndex={-1} ref={headingRef}>
              <span class="wiz__heading-step">概算のご案内</span>
              <span class="wiz__heading-hint">選んでいただいた内容をもとにした目安です</span>
            </p>

            <div class="result__price">
              {result.price ? (
                <>
                  <p class="result__price-label">概算</p>
                  <p class="result__price-value">
                    <span class="result__num">{priceMin.toLocaleString('ja-JP')}</span>
                    <span class="result__unit">円</span>
                    <span class="result__tilde">〜</span>
                    <span class="result__num">{priceMax.toLocaleString('ja-JP')}</span>
                    <span class="result__unit">円</span>
                  </p>
                  <p class="result__tax">{tax.label}／正式な料金は内容確認後にご案内します</p>
                </>
              ) : (
                <>
                  <p class="result__price-label">概算</p>
                  <p class="result__price-value result__price-value--quote">要見積もり</p>
                  <p class="result__tax">{result.quoteReason}</p>
                </>
              )}
            </div>

            <dl class="result__meta">
              <div>
                <dt>想定納期</dt>
                <dd>
                  {result.daysOverflow
                    ? '要相談'
                    : `${result.days.min}〜${result.days.max}日`}
                </dd>
              </div>
              <div>
                <dt>想定内容</dt>
                <dd>{result.summary}</dd>
              </div>
            </dl>

            <div class="result__selections">
              <h3 class="result__sub">選んだ内容</h3>
              <ul>
                {result.selections.map((s) => (
                  <li key={`${s.label}-${s.value}`}>
                    <span>{s.label}</span>
                    <strong>{s.value}</strong>
                  </li>
                ))}
              </ul>
            </div>

            {result.notes.length > 0 && (
              <ul class="result__notes">
                {result.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            )}

            <p class="result__disclaimer">{estimateNote}</p>

            <div class="result__actions">
              <button type="button" class="btn btn--primary btn--lg" onClick={toContact}>
                この内容で相談する
              </button>
              <button type="button" class="btn btn--ghost" onClick={() => setStep(TOTAL_STEPS)}>
                条件を調整して相談する
              </button>
              <button type="button" class="btn btn--quiet" onClick={reset}>
                最初からやり直す
              </button>
            </div>

            <p class="result__handoff">
              「この内容で相談する」を押すと、選んだ内容と概算がフォームへ引き継がれます。
            </p>
          </div>
        )}
      </div>

      <noscript>
        <p class="wiz__noscript">
          簡易見積もりのご利用にはJavaScriptが必要です。
          ご利用が難しい場合は、ご相談フォームから直接お問い合わせください。料金の目安はページ下部に掲載しています。
        </p>
      </noscript>
    </div>
  );
}

export { formatYen };
