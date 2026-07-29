// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';

/**
 * 公開 URL とベースパス。
 * GitHub Pages のプロジェクトページ（https://<user>.github.io/<repo>/）を既定にしています。
 * 独自ドメインへ移す場合は .env で SITE_URL=https://example.com / BASE_PATH=/ を指定してください。
 */
const SITE_URL = process.env.SITE_URL ?? 'https://kazuya-3.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/kazu333_';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  output: 'static',
  integrations: [preact({ compat: false }), sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // 実績・商品画像はビルド時に webp へ変換し、複数幅を出力します
    responsiveStyles: true,
  },
});
