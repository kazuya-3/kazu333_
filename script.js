document.addEventListener('DOMContentLoaded', () => {

    // --- スクロールアニメーション (Intersection Observer) ---
    // (オリジナル機能：セクションが画面に入ったら表示)
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 // 10%見えたらトリガー
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => {
        observer.observe(section);
    });

    
    // --- スムーススクロール (移植機能：メニュークリックで移動) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // --- スマホ用ナビゲーションメニューの制御 (オリジナル機能) ---
    // メニュー項目をクリックしたらメニューを閉じる
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // スムーススクロールが実行された後にメニューを閉じる
            if (navToggle.checked) {
                // 少し遅延させてからチェックを外す（スクロールと競い合わないよう）
                setTimeout(() => {
                    navToggle.checked = false;
                }, 300); // 0.3秒
            }
        });
    });

});