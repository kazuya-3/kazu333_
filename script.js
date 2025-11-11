/**
 * ----------------------------------------------------------------
 * 作品データを管理する場所
 * ----------------------------------------------------------------
 * ここに作品を追加・編集・削除するだけで、
 * サイトのWORKSセクションが自動的に更新されます。
 *
 * [ プロパティの説明 ]
 * category: カテゴリ名 (GIFT, EMOTE, FRAME など)
 * title: 作品タイトル
 * description: 作品の説明文
 * imageEmoji: 作品画像の代わりに表示する絵文字 (例: 🎨)
 * imageUrl: (オプション) 実際の画像URL (例: 'assets/work1.png')
 * ※imageUrlを設定した場合、imageEmojiは無視されます。
 * downloadUrl: ダウンロードボタンのリンク先 (例: 'assets/sample-gift.mp4')
 * downloadText: (オプション) ダウンロードボタンのテキスト (デフォルト: 'Sample Download')
 */

const worksData = [
    {
        category: 'GIFT',
        title: 'Gift Animations',
        description: 'ギフト演出動画。華やかなエフェクトで特別な瞬間を演出。',
        imageEmoji: '🎨',
        imageUrl: null, // 例: 'assets/gift-animation.gif'
        downloadUrl: 'assets/sample-gift.mp4',
        downloadText: 'Sample Video'
    },
    {
        category: 'EMOTE',
        title: 'Animated Emotes',
        description: '動きのあるエモートスタンプ。感情を豊かに表現するアニメーション。',
        imageEmoji: '😊',
        imageUrl: null,
        downloadUrl: 'assets/sample-emote.gif',
        downloadText: 'Sample GIF'
    },
    {
        category: 'FRAME',
        title: 'Cyber Frames',
        description: 'サイバーパンクなアイコンフレーム。ネオンとグリッチエフェクトを融合。',
        imageEmoji: '🖼️',
        imageUrl: null, // 例: 'assets/frame.png'
        downloadUrl: 'assets/sample-frame.png',
        downloadText: 'Sample PNG'
    },
    {
        category: 'CHARA',
        title: 'Character Design',
        description: 'あなたの「æ」となる分身をデザインします。',
        imageEmoji: '👤',
        imageUrl: null,
        downloadUrl: 'assets/sample-chara.png',
        downloadText: 'Sample PNG'
    },
    {
        category: 'LINE',
        title: 'LINE Stamps',
        description: '日常で使えるオリジナルLINEスタンプ。',
        imageEmoji: '✍️',
        imageUrl: null,
        downloadUrl: 'assets/sample-line.png',
        downloadText: 'Sample PNG'
    },
    {
        category: 'WEB',
        title: 'Site Production',
        description: '簡易的なWebサイト制作（このサイトのような）も承ります。',
        imageEmoji: '🌐',
        imageUrl: null,
        downloadUrl: '#contact', // ページ内リンク
        downloadText: 'Contact Me'
    }
    // ▼▼▼ たくさん載せたい場合、この{...}のブロックをコピーして追加します ▼▼▼
    /*
    {
        category: 'NEW',
        title: '新しい作品',
        description: 'ここが説明文です。',
        imageEmoji: '✨',
        imageUrl: 'assets/my-new-work.jpg', // 実際の画像を使う場合
        downloadUrl: 'assets/my-new-work.jpg',
        downloadText: 'Download'
    }
    */
];


/**
 * ----------------------------------------------------------------
 * サイトの動作を制御するスクリプト
 * ----------------------------------------------------------------
 */

// ページの読み込みが完了したら実行
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. WORKSセクションの自動生成 ---
    const worksGrid = document.querySelector('.works-grid');
    
    // worksGridが見つからない場合は、エラーを防ぐために処理を中断
    if (worksGrid) {
        // worksData配列の各データ（work）に対して処理を実行
        worksData.forEach(work => {
            
            // 作品カードの画像部分のHTMLを決定
            // imageUrlが指定されていれば<img>タグを、なければ絵文字(imageEmoji)を使用
            const imageHtml = work.imageUrl
                ? `<img src="${work.imageUrl}" alt="${work.title}" class="work-image-file">`
                : `<div class="work-image">${work.imageEmoji}</div>`;

            // ダウンロードボタンのファイル名を決定
            // downloadUrlからファイル名を取得 (例: "assets/sample.gif" -> "sample.gif")
            const downloadFileName = work.downloadUrl.split('/').pop();

            // 作品カード全体のHTMLを組み立て
            const cardHtml = `
                <article class="work-card">
                    ${imageHtml}
                    <div class="work-content">
                        <span class="work-category">${work.category}</span>
                        <h3 class="work-title">${work.title}</h3>
                        <p class="work-description">${work.description}</p>
                        <a href="${work.downloadUrl}" download="${downloadFileName}" class="download-button">
                            ${work.downloadText || 'Sample Download'}
                        </a>
                    </div>
                </article>
            `;
            
            // 組み立てたHTMLをworksGridコンテナに追加
            worksGrid.innerHTML += cardHtml;
        });
    }

    // --- 2. スクロールアニメーション (フェードイン) ---
    const sections = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 一度表示したら監視を解除 (オプション)
                // observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 // 10%見えたら発動
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- 3. スマホ用ナビゲーション (メニュー開閉) ---
    // (変更なし)
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        const navLinks = document.querySelector('.nav-links');
        navLinks.addEventListener('click', () => {
            // リンクをクリックしたらメニューを閉じる
            navToggle.checked = false;
        });
    }

});
