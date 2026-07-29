/**
 * 簡易見積もりの設定。
 *
 * 料金に関わる数値は、すべてこのファイルだけで完結しています。
 * 計算そのものは src/lib/estimate.ts の純関数 1 つが行い、
 * 画面側には金額の条件分岐を置いていません。
 *
 * ▼ 価格を変えたいとき
 *   - 依頼内容ごとの基準額 …… fields[].tasks[].base
 *   - 規模による増減      …… scaleOptions[].multiplier
 *   - 追加条件の加算率    …… extraQuestions[].options[].rate
 *   - 最低金額 / 丸め単位 …… rules
 */

export type FieldKey = 'system' | 'document' | 'design' | 'ai' | 'unknown';

export type AccentKey = 'system' | 'document' | 'creative' | 'ai' | 'neutral';

/** 金額レンジ（円） */
export type Range = [min: number, max: number];

export interface TaskOption {
  id: string;
  label: string;
  /** 基準金額レンジ（規模・追加条件を掛ける前の値） */
  base: Range;
  /** 基準の作業日数レンジ */
  days: Range;
  /** 見積もり結果に出る「想定内容」 */
  summary: string;
}

export interface EstimateField {
  key: FieldKey;
  label: string;
  description: string;
  accent: AccentKey;
  tasks: TaskOption[];
  /** 依頼内容で「その他 / まだ分からない」を選んだときの既定値 */
  fallback: { base: Range; days: Range; summary: string };
}

export interface ScaleOption {
  id: string;
  label: string;
  description: string;
  /** 基準額に掛ける倍率（min 側 / max 側） */
  multiplier: Range;
  /** 日数に掛ける倍率 */
  dayMultiplier: Range;
}

export interface ExtraOption {
  id: string;
  label: string;
  /** 金額への加算率（0.3 なら +30%） */
  rate?: number;
  /** 日数への倍率（未指定なら 1） */
  dayFactor?: number;
  /** 結果に添える一言 */
  note?: string;
  /** true なら金額を出さず「要相談」にする */
  requiresQuote?: boolean;
}

export interface ExtraQuestion {
  id: string;
  label: string;
  help?: string;
  type: 'select' | 'number';
  /** type: 'select' のとき */
  options?: ExtraOption[];
  /** type: 'number' のとき */
  min?: number;
  max?: number;
  defaultValue?: string | number;
  /** 数量 1 点あたりの加算率（type: 'number' のときのみ使用） */
  perUnitRate?: number;
  /** 見積もりに影響せず、相談時の参考として聞く項目 */
  informational?: boolean;
}

/* ================================================================
   ステップ1・2: 分野と依頼内容
   ================================================================ */

export const estimateFields: EstimateField[] = [
  {
    key: 'system',
    label: 'システム・データ',
    description: 'ツールの修正、データの整理や抽出、動作確認など',
    accent: 'system',
    tasks: [
      {
        id: 'csharp-fix',
        label: 'C#の軽微な修正',
        base: [8000, 15000],
        days: [3, 7],
        summary: '既存コードの確認と軽微な修正、動作確認まで',
      },
      {
        id: 'bug-investigation',
        label: '不具合調査',
        base: [8000, 18000],
        days: [3, 7],
        summary: '再現確認と原因の切り分け、調査結果の報告',
      },
      {
        id: 'sql',
        label: 'SQL作成・修正',
        base: [5000, 12000],
        days: [2, 5],
        summary: '条件の整理、SQL作成、結果の突き合わせ確認',
      },
      {
        id: 'excel-csv',
        label: 'Excel・CSV整理',
        base: [5000, 12000],
        days: [2, 5],
        summary: 'データの整形・集計と、手順のまとめ',
      },
      {
        id: 'data-convert',
        label: 'データ変換',
        base: [6000, 14000],
        days: [2, 6],
        summary: '変換ルールの確認、変換作業、結果の検証',
      },
      {
        id: 'automation',
        label: '小規模自動化',
        base: [12000, 25000],
        days: [5, 12],
        summary: '現在の手順の整理、自動化の実装、操作手順の作成',
      },
      {
        id: 'web-fix',
        label: 'Webページ修正',
        base: [5000, 12000],
        days: [2, 5],
        summary: '表示・文言・レイアウトの修正と表示確認',
      },
      {
        id: 'qa-test',
        label: '動作確認・テスト',
        base: [6000, 15000],
        days: [3, 7],
        summary: '確認項目の作成、動作確認、結果の記録',
      },
      {
        id: 'other',
        label: 'その他・まだ分からない',
        base: [5000, 15000],
        days: [3, 7],
        summary: '内容を伺ったうえで、対応できる範囲をご提案します',
      },
    ],
    fallback: {
      base: [5000, 15000],
      days: [3, 7],
      summary: '内容を伺ったうえで、対応できる範囲をご提案します',
    },
  },
  {
    key: 'document',
    label: '資料・ドキュメント',
    description: 'マニュアル、仕様書、手順書、情報の整理など',
    accent: 'document',
    tasks: [
      {
        id: 'manual',
        label: '操作マニュアル',
        base: [10000, 22000],
        days: [5, 10],
        summary: '構成の設計、画面の説明、手順の記載',
      },
      {
        id: 'spec',
        label: '仕様書',
        base: [12000, 28000],
        days: [5, 12],
        summary: '内容の聞き取り、項目整理、仕様書としてのまとめ',
      },
      {
        id: 'design-doc',
        label: '設計書',
        base: [12000, 30000],
        days: [6, 14],
        summary: '構成の整理と、設計内容の文書化',
      },
      {
        id: 'test-case',
        label: 'テスト項目書',
        base: [8000, 18000],
        days: [4, 8],
        summary: '確認観点の洗い出しと、項目書としての整理',
      },
      {
        id: 'procedure',
        label: '手順書',
        base: [8000, 16000],
        days: [3, 7],
        summary: '作業手順の聞き取りと、迷わず読める形への整理',
      },
      {
        id: 'flow',
        label: '業務フロー',
        base: [10000, 20000],
        days: [4, 9],
        summary: '現状の流れの可視化と、図としての整理',
      },
      {
        id: 'research',
        label: '調査レポート',
        base: [8000, 20000],
        days: [4, 9],
        summary: '調べる範囲の確認、調査、結果のまとめ',
      },
      {
        id: 'restructure',
        label: '既存資料の整理',
        base: [6000, 15000],
        days: [3, 7],
        summary: '既存資料の読み込みと、構成の組み直し',
      },
      {
        id: 'other',
        label: 'その他・まだ分からない',
        base: [8000, 18000],
        days: [4, 9],
        summary: '内容を伺ったうえで、対応できる範囲をご提案します',
      },
    ],
    fallback: {
      base: [8000, 18000],
      days: [4, 9],
      summary: '内容を伺ったうえで、対応できる範囲をご提案します',
    },
  },
  {
    key: 'design',
    label: 'デザイン・SNS素材',
    description: 'アイコン、投稿画像、バナー、配信素材など',
    accent: 'creative',
    tasks: [
      {
        id: 'icon-frame',
        label: 'アイコンフレーム',
        base: [3000, 8000],
        days: [2, 5],
        summary: '雰囲気の確認、フレーム制作、透過での書き出し',
      },
      {
        id: 'sns-cover',
        label: '投稿カバー',
        base: [4000, 9000],
        days: [2, 5],
        summary: '構成の確認と、カバー画像の制作',
      },
      {
        id: 'banner',
        label: 'バナー',
        base: [5000, 12000],
        days: [3, 6],
        summary: '掲載場所に合わせた構成とバナー制作',
      },
      {
        id: 'announce',
        label: '告知画像',
        base: [5000, 11000],
        days: [2, 6],
        summary: '記載項目の整理と、告知画像の制作',
      },
      {
        id: 'thumbnail',
        label: 'サムネイル',
        base: [4000, 9000],
        days: [2, 5],
        summary: '目を引く構成の検討と、サムネイル制作',
      },
      {
        id: 'stream-assets',
        label: '配信素材',
        base: [8000, 20000],
        days: [4, 10],
        summary: '世界観の整理と、配信画面用素材の制作',
      },
      {
        id: 'set',
        label: '複数点セット',
        base: [12000, 30000],
        days: [5, 12],
        summary: '共通ルールの設計と、複数点をまとめて制作',
      },
      {
        id: 'other',
        label: 'その他・まだ分からない',
        base: [4000, 12000],
        days: [3, 7],
        summary: '内容を伺ったうえで、対応できる範囲をご提案します',
      },
    ],
    fallback: {
      base: [4000, 12000],
      days: [3, 7],
      summary: '内容を伺ったうえで、対応できる範囲をご提案します',
    },
  },
  {
    key: 'ai',
    label: 'AI活用・プロンプト',
    description: 'AI画像、プロンプト設計、企画の整理、文章の確認など',
    accent: 'ai',
    tasks: [
      {
        id: 'ai-image',
        label: 'AI画像生成',
        base: [4000, 10000],
        days: [2, 5],
        summary: 'イメージの言語化、生成、選定と調整',
      },
      {
        id: 'prompt-create',
        label: 'プロンプト作成',
        base: [5000, 12000],
        days: [2, 6],
        summary: '目的の整理と、繰り返し使える形での作成',
      },
      {
        id: 'prompt-improve',
        label: 'プロンプト改善',
        base: [4000, 10000],
        days: [2, 5],
        summary: '現状の出力の確認と、効いている要素の切り分け',
      },
      {
        id: 'planning',
        label: '企画・構成整理',
        base: [8000, 18000],
        days: [3, 8],
        summary: 'やりたいことの分解と、作業できる単位への整理',
      },
      {
        id: 'text-review',
        label: '文章の確認・修正',
        base: [4000, 10000],
        days: [2, 5],
        summary: '内容の確認、事実関係の見直し、読みやすさの調整',
      },
      {
        id: 'ai-usage',
        label: 'AI活用方法の整理',
        base: [6000, 15000],
        days: [3, 7],
        summary: '使いどころの整理と、進め方の提案',
      },
      {
        id: 'other',
        label: 'その他・まだ分からない',
        base: [5000, 12000],
        days: [3, 6],
        summary: '内容を伺ったうえで、対応できる範囲をご提案します',
      },
    ],
    fallback: {
      base: [5000, 12000],
      days: [3, 6],
      summary: '内容を伺ったうえで、対応できる範囲をご提案します',
    },
  },
  {
    key: 'unknown',
    label: 'どれか分からない',
    description: '困っていることはあるけれど、分類が分からないとき',
    accent: 'neutral',
    tasks: [
      {
        id: 'small-fix',
        label: '小さな困りごとを相談したい',
        base: [3000, 10000],
        days: [2, 6],
        summary: '状況を伺い、できることとできないことを整理します',
      },
      {
        id: 'organize-idea',
        label: '頭の中のアイデアを整理したい',
        base: [5000, 15000],
        days: [3, 8],
        summary: 'お話を伺い、進められる形へ分解します',
      },
      {
        id: 'other',
        label: 'まだ分からない',
        base: [3000, 15000],
        days: [3, 8],
        summary: 'まずお話を伺うところから始めます',
      },
    ],
    fallback: {
      base: [3000, 15000],
      days: [3, 8],
      summary: 'まずお話を伺うところから始めます',
    },
  },
];

/* ================================================================
   ステップ3: 規模
   ================================================================ */

export const scaleOptions: ScaleOption[] = [
  {
    id: 'small',
    label: '小さな修正・単品',
    description: '1か所の修正、または1点の制作',
    multiplier: [0.7, 0.85],
    dayMultiplier: [0.7, 0.9],
  },
  {
    id: 'standard',
    label: '標準',
    description: '一般的な分量。数か所の修正や、1つのまとまった成果物',
    multiplier: [1, 1],
    dayMultiplier: [1, 1],
  },
  {
    id: 'multi',
    label: '複数の作業・複数点',
    description: '複数の作業がまとまっている、または複数点の制作',
    // 点数そのものはステップ4の「数量」で加算されるため、ここは控えめにしています
    multiplier: [1.5, 1.8],
    dayMultiplier: [1.35, 1.6],
  },
  {
    id: 'unknown',
    label: '内容がまだ分からない',
    description: '分量が読めない場合。幅を広めに出します',
    multiplier: [0.7, 1.7],
    dayMultiplier: [0.8, 1.6],
  },
];

/* ================================================================
   ステップ4: 追加条件
   ================================================================ */

export const extraQuestions: ExtraQuestion[] = [
  {
    id: 'deadline',
    label: '希望納期',
    type: 'select',
    defaultValue: 'flexible',
    options: [
      { id: 'flexible', label: '相談して決めたい', rate: 0 },
      { id: 'relaxed', label: '2週間以上でよい', rate: -0.05, dayFactor: 1.2 },
      { id: 'normal', label: '1〜2週間ほど', rate: 0 },
      {
        id: 'rush',
        label: '1週間以内に必要',
        rate: 0.2,
        dayFactor: 0.7,
        note: '短納期のため、割り増しを含んでいます',
      },
      {
        id: 'urgent',
        label: '3日以内に必要',
        rate: 0.4,
        dayFactor: 0.5,
        note: 'お急ぎの対応です。受けられるかは空き状況によります',
      },
    ],
  },
  {
    id: 'quantity',
    label: '数量（点数・ファイル数）',
    help: '画像の点数、資料の本数など。分からなければ 1 のままで大丈夫です。',
    type: 'number',
    min: 1,
    max: 30,
    defaultValue: 1,
    perUnitRate: 0.45,
  },
  {
    id: 'sourceData',
    label: '元データはありますか',
    help: '既存のファイル、コード、資料など',
    type: 'select',
    defaultValue: 'yes',
    options: [
      { id: 'yes', label: 'ある', rate: 0 },
      { id: 'partial', label: '一部ある', rate: 0.05 },
      { id: 'no', label: 'ない・分からない', rate: 0.1, note: '状況の確認から始めます' },
    ],
  },
  {
    id: 'needsSpec',
    label: '仕様や要件の整理は必要ですか',
    type: 'select',
    defaultValue: 'unknown',
    options: [
      { id: 'no', label: '決まっている', rate: 0 },
      { id: 'unknown', label: '分からない・一緒に決めたい', rate: 0.1 },
      { id: 'yes', label: '整理からお願いしたい', rate: 0.2 },
    ],
  },
  {
    id: 'commercial',
    label: '商用利用の予定',
    type: 'select',
    defaultValue: 'personal',
    options: [
      { id: 'personal', label: '個人利用のみ', rate: 0 },
      { id: 'business', label: '業務・商用で使う', rate: 0.1 },
      {
        id: 'wide',
        label: '広告や再販など、広い範囲で使う',
        rate: 0,
        requiresQuote: true,
        note: '利用範囲が広い場合は、内容を伺ってから個別にご相談します',
      },
    ],
  },
  {
    id: 'sourceDelivery',
    label: '元データ（編集可能ファイル）の納品',
    type: 'select',
    defaultValue: 'no',
    options: [
      { id: 'no', label: '不要', rate: 0 },
      { id: 'yes', label: '希望する', rate: 0.15 },
    ],
  },
  {
    id: 'revisions',
    label: '修正回数の希望',
    type: 'select',
    defaultValue: 'standard',
    options: [
      { id: 'standard', label: '2回まで（標準）', rate: 0 },
      { id: 'three', label: '3回まで', rate: 0.08 },
      { id: 'more', label: 'もう少し多めに希望', rate: 0.15 },
    ],
  },
  {
    id: 'reference',
    label: '参考資料・見本はありますか',
    type: 'select',
    defaultValue: 'no',
    informational: true,
    options: [
      { id: 'yes', label: 'ある' },
      { id: 'no', label: 'ない' },
    ],
  },
  {
    id: 'budget',
    label: 'ご予算の目安',
    help: '見積もり金額には影響しません。ご相談の参考として伺っています。',
    type: 'select',
    defaultValue: 'unknown',
    informational: true,
    options: [
      { id: 'under5000', label: '3,000円〜5,000円' },
      { id: 'under10000', label: '5,000円〜10,000円' },
      { id: 'under30000', label: '10,000円〜30,000円' },
      { id: 'over30000', label: '30,000円以上' },
      { id: 'unknown', label: '相場が分からない' },
      { id: 'consult', label: '相談したい' },
    ],
  },
];

/* ================================================================
   計算ルール
   ================================================================ */

export const rules = {
  /** 最低受注金額（円） */
  minimumFee: 3000,
  /** 表示金額の丸め単位（円） */
  roundTo: 500,
  /** この金額を超える場合は金額を出さず「要見積もり」にする */
  quoteThreshold: 100000,
  /** 納期の下限（日） */
  minDays: 2,
  /** 納期の上限（日）。これを超える場合は「要相談」と表示 */
  maxDays: 45,
  /** 加算率の合計上限（青天井にしない） */
  maxTotalRate: 1.5,
};

/** 税の扱い。表示は一貫してこの設定に従います。 */
export const tax = {
  mode: 'included' as 'included' | 'excluded',
  label: '税込',
  note: '表示金額はすべて税込です。',
};

/** 見積もり結果に必ず添える注記 */
export const estimateNote =
  '簡易見積もりは目安です。内容や作業量に応じて調整可能です。予算が決まっている場合も、お気軽にご相談ください。';

/** トップページなどに出す料金の目安表 */
export const priceGuide = [
  { label: '小さな相談・軽微な作業', price: '3,000円〜', example: '表示の修正、短い確認作業' },
  { label: '小規模修正・単品制作', price: '5,000円〜', example: 'SQL1本、画像1点、Webの部分修正' },
  { label: '標準的な制作・資料作成', price: '10,000円〜', example: '操作マニュアル、テスト項目書' },
  { label: '複数作業・仕様整理込み', price: '20,000円〜', example: '自動化、素材一式、設計書' },
  { label: '大きな内容', price: '要見積もり', example: '範囲が広い場合は個別にご相談します' },
];
