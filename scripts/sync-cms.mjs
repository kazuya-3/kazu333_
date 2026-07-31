/**
 * 管理画面（Sveltia CMS）の本体を public/admin/ へコピーします。
 *
 * npm run dev / npm run build の前に自動で実行されます。
 * 外部CDNから読み込まず自前で配信するため、
 * CDNが落ちても管理画面が開けなくなることがありません。
 *
 * コピー先はリポジトリへ含めません（.gitignore 済み）。
 * バージョンを上げたいときは package.json の @sveltia/cms を更新してください。
 */

import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = resolve(root, 'node_modules/@sveltia/cms/dist/sveltia-cms.js');
const destDir = resolve(root, 'public/admin');
const dest = resolve(destDir, 'sveltia-cms.js');

if (!existsSync(src)) {
  console.warn(
    '[sync-cms] 管理画面の本体が見つかりません。`npm install` を実行してください。\n' +
      '           （管理画面以外のページは、このままでも問題なくビルドできます）',
  );
  process.exit(0);
}

mkdirSync(destDir, { recursive: true });
copyFileSync(src, dest);
console.log('[sync-cms] 管理画面を用意しました: public/admin/sveltia-cms.js');
