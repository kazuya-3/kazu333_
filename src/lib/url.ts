/**
 * BASE_PATH（例: /kazu333_）を考慮した URL を作るヘルパー。
 * 内部リンクは必ずこの関数を通してください。
 */

const BASE = import.meta.env.BASE_URL || '/';

/** サイト内のパスへ base を付ける。`/works` → `/kazu333_/works` */
export function url(path: string): string {
  if (!path) return BASE;
  // ハッシュのみ、外部URL、mailto などはそのまま返す
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('#')) {
    return path;
  }
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const rest = path.startsWith('/') ? path : `/${path}`;
  return `${base}${rest}` || '/';
}

/** 絶対 URL（OGP・canonical・JSON-LD 用） */
export function absoluteUrl(path: string, siteUrl: string | URL | undefined): string {
  const origin = siteUrl ? String(siteUrl).replace(/\/$/, '') : '';
  return `${origin}${url(path)}`;
}

/** 現在のパスがそのリンクと一致するか（ナビの現在地表示に使用） */
export function isCurrent(currentPath: string, href: string): boolean {
  if (href.includes('#')) return false;
  const target = url(href).replace(/\/$/, '');
  const current = currentPath.replace(/\/$/, '');
  if (target === url('/').replace(/\/$/, '')) return current === target;
  return current === target || current.startsWith(`${target}/`);
}

/** 外部リンクかどうか */
export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}
