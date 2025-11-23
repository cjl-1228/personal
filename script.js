document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. 深色模式切換 (Dark Mode Toggle) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // 檢查 localStorage 或系統偏好
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        body.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️';
    }

    themeToggleBtn.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            body.removeAttribute('data-theme');
            themeToggleBtn.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            themeToggleBtn.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });

    // --- 2. 手機版漢堡選單 (Hamburger Menu) ---
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        
        // 簡單的漢堡按鈕動畫切換 (可選)
        const spans = hamburger.querySelectorAll('span');
        if (navLinksContainer.classList.contains('active')) {
            // 這裡可以加 CSS class 來做漢堡變叉叉的動畫，目前維持原樣
        }
    });

    // 點擊連結後自動收起選單
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinksContainer.classList.remove('active');
            }
        });
    });

    // --- 3. 導航列主動高亮 (Scroll Spy) ---
    const sections = document.querySelectorAll('section');
    
    const activeLinkHandler = () => {
        let current = '';
        const scrollPosition = window.scrollY + 150; // 調整偵測偏移量

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', activeLinkHandler);

    // --- 4. 平滑滾動 (Smooth Scroll with Offset) ---
    // 雖然 CSS 有 scroll-behavior，但 JS 可以更精準控制 header 遮擋的高度
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 90; // 預留導航列高度 + 一點緩衝
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5. 簡單的載入動畫觸發 (Intersection Observer) ---
    // 讓區塊進入視窗時才浮現 (Optional enhancement)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // 這裡將原本 CSS 的 fade-in 稍微改由 JS 控制，如果不想用 JS 控制可忽略此段
    // 目前 CSS 已經寫死 animation，這段是為了確保未來擴充性
});