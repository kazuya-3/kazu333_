/**
 * 作品リスト
 * ここに新しい作品を追加していけばOKです
 */
const worksData = [
    {
        category: 'FRAME',
        title: 'The Phantom Glitch',
        description: 'デジタルノイズと崩壊美。サイバーパンクな世界観を演出。',
        imageUrl: 'assets/frame_glitch.jpg',
        downloadUrl: 'assets/frame_glitch.jpg',
        downloadText: 'Download'
    },
    {
        category: 'FRAME',
        title: 'Zero-Gravity Aqua',
        description: '無重力の水流。癒やしと透明感を与えるアクアブルー。',
        imageUrl: 'assets/frame_water.jpg',
        downloadUrl: 'assets/frame_water.jpg',
        downloadText: 'Download'
    },
    {
        category: 'FRAME',
        title: 'The Sonic Ring',
        description: '音に反応する光。配信者や音楽好きのためのビジュアライザー。',
        imageUrl: 'assets/frame_sound.jpg',
        downloadUrl: 'assets/frame_sound.jpg',
        downloadText: 'Download'
    },
    {
        category: 'FRAME',
        title: 'Nebula Gate',
        description: '銀河の入り口。壮大なストーリーを感じさせる宇宙デザイン。',
        imageUrl: 'assets/frame_nebula.jpg',
        downloadUrl: 'assets/frame_nebula.jpg',
        downloadText: 'Download'
    },
    {
        category: 'FRAME',
        title: 'Celestial Crown',
        description: '天上の王冠。カリスマ性と品格を高めるラグジュアリー装飾。',
        imageUrl: 'assets/frame_crown.jpg',
        downloadUrl: 'assets/frame_crown.jpg',
        downloadText: 'Download'
    },
    {
        category: 'FRAME',
        title: 'Crystalline Matrix',
        description: '結晶構造。知的な強さと繊細さを併せ持つ幾何学デザイン。',
        imageUrl: 'assets/frame_poly.jpg',
        downloadUrl: 'assets/frame_poly.jpg',
        downloadText: 'Download'
    },
    {
        category: 'FRAME',
        title: 'Aero-Silver',
        description: '流線型の銀。シンプルを極めた究極の機能美。',
        imageUrl: 'assets/frame_silver.jpg',
        downloadUrl: 'assets/frame_silver.jpg',
        downloadText: 'Download'
    },
    {
        category: 'FRAME',
        title: 'Liquid Glass',
        description: '液状ガラス。静けさと動きが同居するアーティスティックな円環。',
        imageUrl: 'assets/frame_glass.jpg',
        downloadUrl: 'assets/frame_glass.jpg',
        downloadText: 'Download'
    },
    // TikTokなどの外部リンク用
    {
        category: 'TIKTOK',
        title: 'Official TikTok',
        description: '最新の動くフレームや制作過程はTikTokでチェック！',
        imageUrl: null, 
        imageEmoji: '🎵',
        downloadUrl: 'https://www.tiktok.com/@kazu333_?lang=ja-JP',
        downloadText: 'Visit TikTok'
    }
];

// ページ読み込み完了時の処理
document.addEventListener('DOMContentLoaded', () => {
    
    // --- WORKSセクションの生成 ---
    const worksGrid = document.querySelector('.works-grid');
    
    if (worksGrid) {
        worksData.forEach(work => {
            // 画像がある場合は画像、なければ絵文字
            const imageHtml = work.imageUrl
                ? `<img src="${work.imageUrl}" alt="${work.title}" class="work-image-file">`
                : `<div class="work-image">${work.imageEmoji || '✨'}</div>`;

            // リンク判定: #やhttpで始まる場合はダウンロード属性を外す
            const downloadFileName = work.downloadUrl.split('/').pop();
            const isLink = work.downloadUrl.startsWith('http') || work.downloadUrl.startsWith('#');
            const downloadAttr = isLink ? '' : `download="${downloadFileName}"`;
            const targetAttr = work.downloadUrl.startsWith('http') ? 'target="_blank" rel="noopener"' : '';

            const cardHtml = `
                <article class="work-card">
                    <div class="work-image">
                        ${imageHtml}
                    </div>
                    <div class="work-content">
                        <span class="work-category">${work.category}</span>
                        <h3 class="work-title">${work.title}</h3>
                        <p class="work-description">${work.description}</p>
                        <a href="${work.downloadUrl}" ${downloadAttr} ${targetAttr} class="download-button">
                            ${work.downloadText}
                        </a>
                    </div>
                </article>
            `;
            worksGrid.innerHTML += cardHtml;
        });
    }

    // --- フェードインアニメーション ---
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // --- スマホメニュー制御 ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (navToggle && navLinks) {
        navLinks.addEventListener('click', () => {
            navToggle.checked = false;
        });
    }
});
