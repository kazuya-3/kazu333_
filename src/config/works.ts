/**
 * 制作・開発実績。
 *
 * ▼ 実績を追加するには
 *   1. この配列の末尾に 1 件オブジェクトを追加する
 *   2. 画像を使う場合は src/assets/works/ に置き、上部で import する
 *   3. 保存すれば一覧・詳細ページ・sitemap に自動で反映されます
 *
 * ▼ 画像を用意していない場合
 *   thumbnail を省略してください。カテゴリ色の抽象カバーが自動で描画されます。
 *
 * ▼ 注意
 *   ここに掲載しているのはすべて仮のサンプルです。
 *   実在する企業の機密情報・本業の情報は掲載しないでください。
 *   visibility を 'private' にすると、その実績はビルド出力から除外されます。
 */

import type { ImageMetadata } from 'astro';
import type { CategoryKey } from './services';

import iconFrameDemo01 from '../assets/works/icon-frame-demo-01.png';
import iconFrameDemo02 from '../assets/works/icon-frame-demo-02.png';
import iconFrameDemo03 from '../assets/works/icon-frame-demo-03.png';
import iconFrameDemo04 from '../assets/works/icon-frame-demo-04.png';
import iconFrameDemo05 from '../assets/works/icon-frame-demo-05.png';
import iconFrameDemo06 from '../assets/works/icon-frame-demo-06.png';
import iconFrameDemo07 from '../assets/works/icon-frame-demo-07.png';
import iconFrame01 from '../assets/works/icon-frame-01.png';
import iconFrame02 from '../assets/works/icon-frame-02.png';
import iconFrame04 from '../assets/works/icon-frame-04.png';
import iconFrame05 from '../assets/works/icon-frame-05.png';
import iconFrame06 from '../assets/works/icon-frame-06.png';
import iconFrame07 from '../assets/works/icon-frame-07.png';
import iconFrame08 from '../assets/works/icon-frame-08.png';

export interface WorkImage {
  src: ImageMetadata;
  alt: string;
}

export interface WorkLink {
  label: string;
  url: string;
}

export interface Work {
  /** URL に使う識別子。半角英数とハイフン。 */
  slug: string;
  title: string;
  category: CategoryKey;
  /** カード用の一覧向け一言 */
  summary: string;
  /** サムネイル。省略すると抽象カバーを自動生成します。 */
  thumbnail?: WorkImage;
  /** 課題 → 対応 → 結果 */
  challenge: string;
  solution: string[];
  result: string[];
  /** 使用技術・ツール */
  tech: string[];
  /** 制作期間 */
  duration: string;
  /** 詳細ページのギャラリー */
  gallery?: WorkImage[];
  /** 外部リンク */
  links?: WorkLink[];
  /**
   * public  : 公開
   * limited : 公開するが、内容をぼかしている旨を表示
   * private : サイトに出さない（ページも生成しない）
   */
  visibility: 'public' | 'limited' | 'private';
  featured: boolean;
  /** 掲載日（並び順に使用） */
  publishedAt: string;
}

export const works: Work[] = [
  {
    slug: 'csharp-business-app-improvement',
    title: 'C#業務アプリの動作改善',
    category: 'system',
    summary: '担当者が退職したあと、動かなくなっていた社内アプリを調査して直しました。',
    challenge:
      '前任者が個人で作った在庫管理アプリが、Windows更新のあとエラーで起動しなくなっていました。仕様書もソースの説明も残っておらず、社内では誰も中身を把握できていない状態でした。',
    solution: [
      'ソースコードを読み解き、処理の流れと外部依存を洗い出して簡易な構成図にまとめた',
      '起動時エラーの原因を特定（廃止されたAPI呼び出しと、参照ライブラリのバージョン不一致）',
      '影響範囲を確認したうえで、最小限の修正に留めて改修',
      '再発時に自分たちで確認できるよう、起動確認手順を1枚にまとめて添付',
    ],
    result: [
      '起動しなくなっていたアプリが元どおり使えるようになった',
      '中身が分かる資料が残り、次に困ったときの相談がしやすくなった',
      '作業は約1週間・固定報酬で完了',
    ],
    tech: ['C#', '.NET Framework', 'Windows Forms', 'Visual Studio'],
    duration: '約1週間',
    visibility: 'limited',
    featured: true,
    publishedAt: '2025-11-10',
  },
  {
    slug: 'datagridview-ui-refine',
    title: 'DataGridViewの表示改善',
    category: 'system',
    summary: '一覧画面が見づらいという声に対して、表示のルールを整理し直しました。',
    challenge:
      '業務アプリの一覧画面で、行数が増えると目的の情報を探しにくいという相談でした。「見づらい」以上の具体的な要望はまだ言葉になっていない状態からのスタートでした。',
    solution: [
      '実際の操作を見せてもらい、どの列を最初に見ているかを聞き取って優先度を整理',
      '列幅・並び順・書式（日付、金額、区分）を見直し',
      '状態を色だけで示していた箇所に短いテキストを併記し、判別しやすく調整',
      '行数が多いときの表示速度を確認し、描画まわりを軽く調整',
    ],
    result: [
      '目的の行を探す操作が減り、日常の確認作業が短くなった',
      '「なんとなく見づらい」が、具体的な表示ルールとして残った',
    ],
    tech: ['C#', 'Windows Forms', 'DataGridView'],
    duration: '約4日',
    visibility: 'limited',
    featured: false,
    publishedAt: '2025-11-05',
  },
  {
    slug: 'sql-data-processing-sample',
    title: 'SQL・データ処理のサンプル整備',
    category: 'system',
    summary: '毎月の集計作業を、手作業からSQL1本にまとめました。',
    challenge:
      '毎月、複数のCSVをExcelで開いて手作業で集計しており、時間がかかるうえに数字が合わないことがある、という相談でした。',
    solution: [
      '現在の手順を1つずつ確認し、どこで判断が入っているかを整理',
      '集計条件をSQLへ落とし込み、結果が手作業と一致することを過去データで検証',
      '毎月同じ手順で実行できるよう、実行手順と確認ポイントを手順書にまとめた',
      '条件を変えたいときのために、変更しやすい形でクエリを分割',
    ],
    result: [
      '半日かかっていた集計が、実行と確認だけで終わるようになった',
      '集計条件が文書として残り、担当が代わっても引き継げる状態になった',
    ],
    tech: ['SQL Server', 'T-SQL', 'CSV', 'Excel'],
    duration: '約5日',
    visibility: 'public',
    featured: true,
    publishedAt: '2025-10-28',
  },
  {
    slug: 'kineweave-studio',
    title: 'KineWeave Studio（個人開発）',
    category: 'system',
    summary: '動きのある素材を、簡単な操作で組み立てられるようにする個人開発ツールです。',
    challenge:
      '配信やSNS向けの短い動きのある素材を作るたびに、同じ設定を毎回やり直していました。手順を毎回思い出す時間を減らしたいと考えたのが出発点です。',
    solution: [
      '繰り返し使う設定をプリセットとして保存できる構成を設計',
      '書き出し形式と解像度の組み合わせをテンプレート化',
      '操作画面は項目を絞り、迷わず選べる並びに調整',
    ],
    result: [
      '素材1点あたりの作業時間が短くなり、案件でも同じ手順を再利用できるようになった',
      '制作の型ができたことで、ご依頼時の納期を見積もりやすくなった',
    ],
    tech: ['TypeScript', 'Canvas', 'FFmpeg', 'Electron'],
    duration: '継続開発中',
    visibility: 'public',
    featured: false,
    publishedAt: '2025-10-15',
  },
  {
    slug: 'entry-impact-os',
    title: 'ENTRY IMPACT OS（企画・構成）',
    category: 'document',
    summary: '配信の入室演出まわりの考え方を、企画として整理したものです。',
    challenge:
      '配信イベントで「入ってきた瞬間に世界観を伝えたい」という要望がありましたが、具体的な形はまだ決まっていませんでした。',
    solution: [
      'やりたいことをヒアリングし、伝えたい印象を言葉にして分解',
      '演出の構成要素（音・動き・色・文字）を一覧化し、優先順位を設定',
      '素材の作成順と、当日の運用手順を1つの資料にまとめた',
    ],
    result: [
      '感覚的だったイメージが、作業できる単位まで分解された',
      '必要な素材の点数と作業量が見えたため、予算に合わせて範囲を調整できた',
    ],
    tech: ['企画設計', '構成案', 'Figma', 'Notion'],
    duration: '約1週間',
    visibility: 'public',
    featured: false,
    publishedAt: '2025-10-02',
  },
  {
    slug: 'cloud-recording-system',
    title: 'クラウド画録システムの構成整理',
    category: 'document',
    summary: '録画データの保存と共有の流れを、図と手順書にまとめました。',
    challenge:
      '録画データの置き場所と共有方法が担当者ごとにばらばらで、あとから探せなくなることがありました。',
    solution: [
      '現状の保存先と共有経路をすべて書き出し、重複と抜けを可視化',
      '保存ルール（命名・保存期間・アクセス範囲）を整理して提案',
      '運用フロー図と、迷ったときに見る1枚の早見表を作成',
    ],
    result: [
      '保存場所の判断に迷う時間が減った',
      '新しく参加した人へ渡せる資料ができた',
    ],
    tech: ['業務フロー設計', 'クラウドストレージ', '図解'],
    duration: '約6日',
    visibility: 'limited',
    featured: false,
    publishedAt: '2025-09-20',
  },
  {
    slug: 'icon-frame-collection',
    title: 'アイコンフレーム制作',
    category: 'creative',
    summary: 'アイコンの雰囲気に合わせた円形フレームを、シリーズで制作しました。',
    thumbnail: {
      src: iconFrameDemo05,
      alt: 'アイコンに装飾フレームを重ねた作例。青い宝石と唐草模様の縁取り',
    },
    challenge:
      'SNSや配信で使うアイコンに統一感を持たせたいが、毎回どんな装飾が合うか分からない、という相談でした。',
    solution: [
      '使いたい場面（プロフィール、配信画面、告知画像）を先に整理',
      '世界観の方向性を「宝石」「水」「回路」「植物」など複数案で提示',
      '同じ配色ルールで揃えたフレームをシリーズとして制作',
      '差し替えしやすいよう、背景透過と余白の規格を統一',
    ],
    result: [
      '場面ごとに使い分けても、並べたときに揃って見えるようになった',
      'フレームだけを差し替えられるため、季節やイベントに合わせて更新できる',
    ],
    tech: ['AI画像生成', 'プロンプト設計', 'Photoshop', 'PNG(透過)'],
    duration: '約5日',
    gallery: [
      { src: iconFrameDemo01, alt: '銀のリングフレームを合わせた作例' },
      { src: iconFrameDemo02, alt: '水しぶきをモチーフにしたフレームの作例' },
      { src: iconFrameDemo03, alt: '濃紺のブラシフレームの作例' },
      { src: iconFrameDemo04, alt: '青い花と葉の輪で囲んだフレームの作例' },
      { src: iconFrameDemo06, alt: '放射状に光が伸びるフレームの作例' },
      { src: iconFrameDemo07, alt: '回路模様を円形に配したフレームの作例' },
    ],
    visibility: 'public',
    featured: true,
    publishedAt: '2025-11-24',
  },
  {
    slug: 'stream-overlay-set',
    title: '配信素材の制作',
    category: 'creative',
    summary: '配信画面の枠・背景・切り替え素材を、ひとそろいで制作しました。',
    thumbnail: {
      src: iconFrame06,
      alt: '水をモチーフにした円形の配信用フレーム素材',
    },
    challenge:
      '配信を始めたものの、画面の見た目がばらばらで、素材ごとに雰囲気が違ってしまうという相談でした。',
    solution: [
      '配信の内容と伝えたい印象を聞き取り、色と形のルールを先に決定',
      '枠・背景・待機画面・切り替えを同じルールで制作',
      '配信ソフトへそのまま読み込める解像度とファイル形式で納品',
    ],
    result: [
      '画面全体の印象が揃い、配信の雰囲気が伝わりやすくなった',
      '素材を追加するときの基準ができた',
    ],
    tech: ['AI画像生成', 'Photoshop', 'OBS想定の書き出し'],
    duration: '約1週間',
    gallery: [
      { src: iconFrame04, alt: '青いリングが放射状に光る配信用フレーム' },
      { src: iconFrame05, alt: '水の粒が舞う円形フレーム素材' },
      { src: iconFrame07, alt: '低ポリゴン調の青いリング素材' },
      { src: iconFrame08, alt: '金属質のリングフレーム素材' },
    ],
    visibility: 'public',
    featured: true,
    publishedAt: '2025-11-18',
  },
  {
    slug: 'sns-cover-series',
    title: 'SNS投稿カバーの制作',
    category: 'creative',
    summary: '投稿の1枚目に使うカバー画像を、シリーズで揃えました。',
    thumbnail: {
      src: iconFrame01,
      alt: '白と銀の装飾を組み合わせた円形の飾り枠',
    },
    challenge:
      '投稿ごとにデザインを考える時間がなく、見た目が揃わないという相談でした。',
    solution: [
      '投稿の種類（お知らせ・作例紹介・振り返り）を3パターンに整理',
      'それぞれに文字量の目安を決めて、崩れにくい配置を設計',
      '差し替えるだけで使えるよう、文字と画像の位置を固定',
    ],
    result: [
      '毎回のデザイン検討がなくなり、投稿までの時間が短くなった',
      '並べたときに一目で同じ発信だと分かるようになった',
    ],
    tech: ['Photoshop', 'テンプレート設計', 'PNG / JPG'],
    duration: '約4日',
    gallery: [{ src: iconFrame02, alt: '深い青の宇宙をモチーフにした円形カバー素材' }],
    visibility: 'public',
    featured: false,
    publishedAt: '2025-11-12',
  },
  {
    slug: 'ai-image-prompt-design',
    title: 'AI画像・プロンプト設計',
    category: 'creative',
    summary: '狙った雰囲気の画像が出るまでの、指示の作り方を整理しました。',
    thumbnail: {
      src: iconFrameDemo06,
      alt: '青い光が放射状に広がるアイコンフレームの作例',
    },
    challenge:
      'AIで画像を作りたいが、思った通りの絵にならない。何をどう書けばよいか分からない、という相談でした。',
    solution: [
      '作りたい絵を「用途・被写体・色・質感・構図」に分けて言葉にする作業を一緒に実施',
      '要素ごとに書き分けたプロンプトの雛形を作成',
      '出力を比べながら、効いている語と効いていない語を切り分け',
      '次回から自分で調整できるよう、変更しやすい形にまとめて納品',
    ],
    result: [
      '同じ雰囲気の絵を、繰り返し出せるようになった',
      '調整したい部分だけを書き換えられるため、自分で試せる範囲が広がった',
    ],
    tech: ['画像生成AI', 'プロンプト設計', '出力比較・検証'],
    duration: '約3日',
    visibility: 'public',
    featured: false,
    publishedAt: '2025-11-02',
  },
];

/** 公開対象のみ（private を除外し、新しい順） */
export const publicWorks = works
  .filter((w) => w.visibility !== 'private')
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export const featuredWorks = publicWorks.filter((w) => w.featured);

export const visibilityLabel: Record<Work['visibility'], string | null> = {
  public: null,
  limited: '内容の一部を伏せて掲載しています',
  private: null,
};
