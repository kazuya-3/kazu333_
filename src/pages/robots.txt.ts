/**
 * robots.txt を site 設定から生成します。
 * SITE_URL / BASE_PATH を変更しても sitemap の URL が自動で追従します。
 */

import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const sitemapUrl = site ? new URL(`${base}/sitemap-index.xml`, site).href : '/sitemap-index.xml';

  const adminPath = `${base}/admin/`;

  const body = `User-agent: *
Allow: /
Disallow: ${adminPath}

Sitemap: ${sitemapUrl}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
