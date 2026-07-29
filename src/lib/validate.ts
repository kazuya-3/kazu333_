/**
 * フォームの入力検証。
 * エラー文は「利用者を責めない言い方」に統一しています。
 */

export interface FieldError {
  field: string;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface ContactFormValues {
  name: string;
  email: string;
  field: string;
  message: string;
  referenceUrl: string;
  agree: boolean;
  file: File | null;
}

export interface UploadLimits {
  maxMb: number;
  accept: string;
}

export function validateContact(
  values: ContactFormValues,
  limits: UploadLimits,
): FieldError[] {
  const errors: FieldError[] = [];

  if (!values.name.trim()) {
    errors.push({ field: 'name', message: 'お名前または活動名をご記入ください。ニックネームでも大丈夫です。' });
  } else if (values.name.trim().length > 80) {
    errors.push({ field: 'name', message: 'お名前は80文字まででご記入ください。' });
  }

  if (!values.email.trim()) {
    errors.push({ field: 'email', message: 'ご返信先のメールアドレスをご記入ください。' });
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.push({ field: 'email', message: 'メールアドレスの形式をもう一度ご確認ください。' });
  }

  if (!values.field) {
    errors.push({ field: 'field', message: '相談分野をお選びください。迷う場合は「まだ分からない・その他」で大丈夫です。' });
  }

  if (!values.message.trim()) {
    errors.push({
      field: 'message',
      message: 'ご相談の内容を、分かる範囲でご記入ください。短くても大丈夫です。',
    });
  } else if (values.message.trim().length > 4000) {
    errors.push({ field: 'message', message: 'ご相談内容は4,000文字まででご記入ください。' });
  }

  if (values.referenceUrl.trim()) {
    const value = values.referenceUrl.trim();
    if (!/^https?:\/\/\S+$/.test(value)) {
      errors.push({
        field: 'referenceUrl',
        message: '参考URLは https:// から始まる形でご記入ください。',
      });
    }
  }

  if (values.file) {
    const maxBytes = limits.maxMb * 1024 * 1024;
    if (values.file.size > maxBytes) {
      errors.push({
        field: 'file',
        message: `ファイルは${limits.maxMb}MBまで添付できます。分割するか、共有リンクをご記入ください。`,
      });
    }
    const allowed = limits.accept
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const name = values.file.name.toLowerCase();
    if (allowed.length > 0 && !allowed.some((ext) => name.endsWith(ext))) {
      errors.push({
        field: 'file',
        message: `この形式のファイルは添付できません。対応形式: ${limits.accept}`,
      });
    }
  }

  if (!values.agree) {
    errors.push({
      field: 'agree',
      message: 'プライバシーポリシーをご確認のうえ、チェックをお願いします。',
    });
  }

  return errors;
}

export function errorFor(errors: FieldError[], field: string): string | undefined {
  return errors.find((e) => e.field === field)?.message;
}
