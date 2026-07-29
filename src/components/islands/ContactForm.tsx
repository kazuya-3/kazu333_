import { useEffect, useMemo, useRef, useState } from 'preact/hooks';
import {
  budgetOptions,
  contactConfig,
  contactFields,
  contactMessages,
  deadlineOptions,
  replyMethodOptions,
} from '../../config/contact';
import { getContactAdapter } from '../../lib/contact';
import { errorFor, validateContact, type FieldError } from '../../lib/validate';
import { ESTIMATE_STORAGE_KEY, type StoredEstimate } from '../../lib/estimate';
import './ContactForm.css';

interface Props {
  privacyUrl: string;
  estimateUrl: string;
}

type Phase = 'input' | 'confirm' | 'sending' | 'success' | 'error';

interface FormState {
  name: string;
  email: string;
  field: string;
  message: string;
  deadline: string;
  budget: string;
  referenceUrl: string;
  replyMethod: string;
  note: string;
  agree: boolean;
}

const initialState: FormState = {
  name: '',
  email: '',
  field: '',
  message: '',
  deadline: 'flexible',
  budget: 'unknown',
  referenceUrl: '',
  replyMethod: 'email',
  note: '',
  agree: false,
};

/** 分野キー（見積もり）→ フォームの相談分野 */
const FIELD_MAP: Record<string, string> = {
  system: 'system',
  document: 'document',
  design: 'design',
  ai: 'ai',
  unknown: 'unknown',
};

export default function ContactForm({ privacyUrl, estimateUrl }: Props) {
  const [values, setValues] = useState<FormState>(initialState);
  const [file, setFile] = useState<File | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [phase, setPhase] = useState<Phase>('input');
  const [estimate, setEstimate] = useState('');
  const [errorDetail, setErrorDetail] = useState('');
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const submittedAt = useRef(0);

  const adapter = useMemo(() => getContactAdapter(), []);

  // --- 見積もりからの引き継ぎ ---
  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(ESTIMATE_STORAGE_KEY);
      if (!raw) return;
      const stored = JSON.parse(raw) as StoredEstimate;
      if (!stored?.text) return;
      setEstimate(stored.text);
      const mapped = stored.fieldKey ? FIELD_MAP[stored.fieldKey] : undefined;
      if (mapped) {
        setValues((prev) => (prev.field ? prev : { ...prev, field: mapped }));
      }
    } catch {
      // 読み取れなくてもフォームは通常どおり使える
    }
  }, []);

  // 状態が変わったら、その領域へフォーカスを移して読み上げる
  useEffect(() => {
    if (phase === 'success' || phase === 'error') statusRef.current?.focus();
    if (phase === 'confirm') statusRef.current?.focus();
  }, [phase]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    // 入力し直したら、その項目のエラーは消す
    setErrors((prev) => prev.filter((e) => e.field !== key));
  };

  const runValidation = (): boolean => {
    const found = validateContact(
      {
        name: values.name,
        email: values.email,
        field: values.field,
        message: values.message,
        referenceUrl: values.referenceUrl,
        agree: values.agree,
        file,
      },
      contactConfig.upload,
    );
    setErrors(found);
    if (found.length > 0) {
      // エラーの要約へ移動して、何を直せばよいか分かるようにする
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return false;
    }
    return true;
  };

  const handleReview = (event: Event) => {
    event.preventDefault();
    if (!runValidation()) return;
    setPhase('confirm');
  };

  const handleSend = async () => {
    // 二重送信の防止（連打・戻ってからの再送信も含む）
    const now = Date.now();
    if (phase === 'sending' || now - submittedAt.current < 1500) return;
    submittedAt.current = now;
    setPhase('sending');
    setErrorDetail('');

    const result = await adapter.send({
      name: values.name.trim(),
      email: values.email.trim(),
      field: labelOf(contactFields, values.field),
      message: values.message.trim(),
      deadline: labelOf(deadlineOptions, values.deadline),
      budget: labelOf(budgetOptions, values.budget),
      referenceUrl: values.referenceUrl.trim(),
      replyMethod: labelOf(replyMethodOptions, values.replyMethod),
      note: values.note.trim(),
      estimate,
      file,
      honeypot,
    });

    if (result.ok) {
      setPhase('success');
      try {
        window.sessionStorage.removeItem(ESTIMATE_STORAGE_KEY);
      } catch {
        /* noop */
      }
    } else {
      setPhase('error');
      setErrorDetail(
        result.reason === 'unconfigured'
          ? '送信先が設定されていません。お手数ですが、しばらくしてからお試しください。'
          : '',
      );
    }
  };

  // --- 送信完了 ---
  if (phase === 'success') {
    return (
      <div class="cf__result cf__result--ok" tabIndex={-1} ref={statusRef} role="status">
        <span class="cf__result-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path
              d="m5 12.5 4.5 4.5L19 7.5"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <h2 class="cf__result-title">{contactMessages.success.title}</h2>
        <p class="cf__result-body">{contactMessages.success.body}</p>
        {adapter.isMock && <p class="cf__mock">{contactMessages.mockNotice}</p>}
        <p class="cf__result-note">{contactMessages.success.note}</p>
        <div class="cf__result-actions">
          <a class="btn btn--ghost" href="/">
            トップへ戻る
          </a>
          <a class="btn btn--quiet" href={estimateUrl}>
            別の内容を見積もる
          </a>
        </div>
      </div>
    );
  }

  const disabled = phase === 'sending';

  return (
    <div class="cf">
      {adapter.isMock && (
        <p class="cf__mock cf__mock--top">{contactMessages.mockNotice}</p>
      )}

      {estimate && (
        <section class="cf__estimate" aria-labelledby="cf-estimate-title">
          <h2 class="cf__estimate-title" id="cf-estimate-title">
            見積もりの内容を引き継ぎました
          </h2>
          <pre class="cf__estimate-body">{estimate}</pre>
          <div class="cf__estimate-actions">
            <a class="cf__estimate-link" href={estimateUrl}>
              条件を選び直す
            </a>
            <button type="button" class="cf__estimate-link" onClick={() => setEstimate('')}>
              引き継ぎを外す
            </button>
          </div>
        </section>
      )}

      {errors.length > 0 && (
        <div class="cf__errors" tabIndex={-1} ref={errorSummaryRef} role="alert">
          <p class="cf__errors-title">入力内容をご確認ください</p>
          <ul>
            {errors.map((e) => (
              <li key={e.field}>
                <a href={`#cf-${e.field}`}>{e.message}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {phase === 'error' && (
        <div class="cf__errors cf__errors--send" tabIndex={-1} ref={statusRef} role="alert">
          <p class="cf__errors-title">{contactMessages.error.title}</p>
          <p>{errorDetail || contactMessages.error.body}</p>
        </div>
      )}

      {/* --- 確認画面 --- */}
      {phase === 'confirm' || phase === 'sending' ? (
        <div class="cf__confirm" tabIndex={-1} ref={statusRef}>
          <h2 class="cf__confirm-title">この内容で送信します</h2>
          <p class="cf__confirm-lead">内容をご確認のうえ、送信してください。</p>

          <dl class="cf__confirm-list">
            <Row label="お名前・活動名" value={values.name} />
            <Row label="メールアドレス" value={values.email} />
            <Row label="相談分野" value={labelOf(contactFields, values.field)} />
            <Row label="依頼内容" value={values.message} multiline />
            <Row label="希望納期" value={labelOf(deadlineOptions, values.deadline)} />
            <Row label="ご予算" value={labelOf(budgetOptions, values.budget)} />
            {values.referenceUrl && <Row label="参考URL" value={values.referenceUrl} />}
            <Row label="希望する連絡方法" value={labelOf(replyMethodOptions, values.replyMethod)} />
            {values.note && <Row label="補足" value={values.note} multiline />}
            {file && <Row label="添付ファイル" value={file.name} />}
            {estimate && <Row label="簡易見積もり" value={estimate} multiline />}
          </dl>

          {phase === 'sending' && (
            <p class="cf__sending" role="status">
              <span class="cf__spinner" aria-hidden="true" />
              {contactMessages.sending}
            </p>
          )}

          <div class="cf__confirm-actions">
            <button
              type="button"
              class="btn btn--primary btn--lg"
              onClick={handleSend}
              disabled={disabled}
              aria-disabled={disabled}
            >
              {disabled ? '送信中…' : 'この内容で送信する'}
            </button>
            <button
              type="button"
              class="btn btn--quiet"
              onClick={() => setPhase('input')}
              disabled={disabled}
            >
              内容を修正する
            </button>
          </div>
        </div>
      ) : (
        /* --- 入力画面 --- */
        <form class="cf__form" onSubmit={handleReview} noValidate>
          {/* ボット対策。人には見えず、読み上げ対象からも外す */}
          <div class="cf__hp" aria-hidden="true">
            <label for="cf-company">会社名（入力しないでください）</label>
            <input
              id="cf-company"
              name="company"
              type="text"
              tabIndex={-1}
              autocomplete="off"
              value={honeypot}
              onInput={(e) => setHoneypot((e.target as HTMLInputElement).value)}
            />
          </div>

          <Field
            id="cf-name"
            label="お名前 または 活動名"
            required
            error={errorFor(errors, 'name')}
          >
            <input
              id="cf-name"
              type="text"
              autocomplete="name"
              value={values.name}
              onInput={(e) => set('name', (e.target as HTMLInputElement).value)}
              aria-invalid={errorFor(errors, 'name') ? 'true' : undefined}
              aria-describedby={errorFor(errors, 'name') ? 'cf-name-error' : undefined}
            />
          </Field>

          <Field
            id="cf-email"
            label="メールアドレス"
            required
            hint="ご返信先としてお伺いしています。"
            error={errorFor(errors, 'email')}
          >
            <input
              id="cf-email"
              type="email"
              autocomplete="email"
              inputMode="email"
              value={values.email}
              onInput={(e) => set('email', (e.target as HTMLInputElement).value)}
              aria-invalid={errorFor(errors, 'email') ? 'true' : undefined}
              aria-describedby={errorFor(errors, 'email') ? 'cf-email-error' : 'cf-email-hint'}
            />
          </Field>

          <Field id="cf-field" label="相談分野" required error={errorFor(errors, 'field')}>
            <select
              id="cf-field"
              value={values.field}
              onChange={(e) => set('field', (e.target as HTMLSelectElement).value)}
              aria-invalid={errorFor(errors, 'field') ? 'true' : undefined}
              aria-describedby={errorFor(errors, 'field') ? 'cf-field-error' : undefined}
            >
              <option value="">選んでください</option>
              {contactFields.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id="cf-message"
            label="依頼内容・困っていること"
            required
            hint="短くても大丈夫です。決まっていない部分は「未定」で構いません。"
            error={errorFor(errors, 'message')}
          >
            <textarea
              id="cf-message"
              rows={7}
              value={values.message}
              placeholder={'例）Excelの集計を毎月手作業でしています。\n自動化できるか相談したいです。'}
              onInput={(e) => set('message', (e.target as HTMLTextAreaElement).value)}
              aria-invalid={errorFor(errors, 'message') ? 'true' : undefined}
              aria-describedby={
                errorFor(errors, 'message') ? 'cf-message-error' : 'cf-message-hint'
              }
            />
          </Field>

          <div class="cf__row">
            <Field id="cf-deadline" label="希望納期">
              <select
                id="cf-deadline"
                value={values.deadline}
                onChange={(e) => set('deadline', (e.target as HTMLSelectElement).value)}
              >
                {deadlineOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="cf-budget" label="ご予算">
              <select
                id="cf-budget"
                value={values.budget}
                onChange={(e) => set('budget', (e.target as HTMLSelectElement).value)}
              >
                {budgetOptions.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <details class="cf__more">
            <summary>詳しく伝える（任意）</summary>
            <div class="cf__more-body">
              <Field
                id="cf-referenceUrl"
                label="参考URL"
                hint="参考にしたいページや、共有フォルダのリンクなど。"
                error={errorFor(errors, 'referenceUrl')}
              >
                <input
                  id="cf-referenceUrl"
                  type="url"
                  inputMode="url"
                  placeholder="https://"
                  value={values.referenceUrl}
                  onInput={(e) => set('referenceUrl', (e.target as HTMLInputElement).value)}
                  aria-invalid={errorFor(errors, 'referenceUrl') ? 'true' : undefined}
                  aria-describedby={
                    errorFor(errors, 'referenceUrl')
                      ? 'cf-referenceUrl-error'
                      : 'cf-referenceUrl-hint'
                  }
                />
              </Field>

              <Field
                id="cf-file"
                label="ファイル添付"
                hint={`${contactConfig.upload.maxMb}MBまで／${contactConfig.upload.accept}`}
                error={errorFor(errors, 'file')}
              >
                <input
                  id="cf-file"
                  type="file"
                  accept={contactConfig.upload.accept}
                  onChange={(e) => {
                    const picked = (e.target as HTMLInputElement).files?.[0] ?? null;
                    setFile(picked);
                    setErrors((prev) => prev.filter((x) => x.field !== 'file'));
                  }}
                  aria-invalid={errorFor(errors, 'file') ? 'true' : undefined}
                  aria-describedby={errorFor(errors, 'file') ? 'cf-file-error' : 'cf-file-hint'}
                />
              </Field>

              <Field id="cf-replyMethod" label="希望する連絡方法">
                <select
                  id="cf-replyMethod"
                  value={values.replyMethod}
                  onChange={(e) => set('replyMethod', (e.target as HTMLSelectElement).value)}
                >
                  {replyMethodOptions.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field id="cf-note" label="補足">
                <textarea
                  id="cf-note"
                  rows={4}
                  value={values.note}
                  onInput={(e) => set('note', (e.target as HTMLTextAreaElement).value)}
                />
              </Field>
            </div>
          </details>

          <div class={`cf__agree${errorFor(errors, 'agree') ? ' is-error' : ''}`}>
            <label for="cf-agree">
              <input
                id="cf-agree"
                type="checkbox"
                checked={values.agree}
                onChange={(e) => set('agree', (e.target as HTMLInputElement).checked)}
                aria-invalid={errorFor(errors, 'agree') ? 'true' : undefined}
                aria-describedby={errorFor(errors, 'agree') ? 'cf-agree-error' : undefined}
              />
              <span>
                <a href={privacyUrl} target="_blank" rel="noopener noreferrer">
                  プライバシーポリシー
                </a>
                に同意します
                <span class="cf__required-mark">必須</span>
              </span>
            </label>
            {errorFor(errors, 'agree') && (
              <p class="cf__error" id="cf-agree-error">
                {errorFor(errors, 'agree')}
              </p>
            )}
          </div>

          <button type="submit" class="btn btn--primary btn--lg btn--full cf__submit">
            入力内容を確認する
          </button>
          <p class="cf__submit-note">
            この時点ではまだ送信されません。次の画面で内容を確認できます。
          </p>
        </form>
      )}
    </div>
  );
}

/* ---------------- 補助コンポーネント ---------------- */

function labelOf(options: { id: string; label: string }[], id: string): string {
  return options.find((o) => o.id === id)?.label ?? '';
}

function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: preact.ComponentChildren;
}) {
  return (
    <div class={`cf__field${error ? ' is-error' : ''}`}>
      <label class="cf__label" for={id}>
        {label}
        <span class={`cf__required-mark${required ? '' : ' is-optional'}`}>
          {required ? '必須' : '任意'}
        </span>
      </label>
      {hint && (
        <p class="cf__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p class="cf__error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

function Row({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div class="cf__confirm-row">
      <dt>{label}</dt>
      <dd class={multiline ? 'is-multiline' : undefined}>{value || '（未記入）'}</dd>
    </div>
  );
}
