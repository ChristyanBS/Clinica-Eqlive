/* ========================================
   NAVEGAÇÃO SPA - EQLIVE
   ======================================== */

// Menu Mobile
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (!mobileMenu.classList.contains('hidden')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Navegação Mobile
window.mobileNav = function(pageId) {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    window.navigateTo(pageId);
}

// Navegação SPA
window.navigateTo = function(pageId) {
    scrollToTop();
    
    // Esconde todas as seções
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
        setTimeout(() => {
            if (!section.classList.contains('active')) {
                section.classList.add('hidden');
                section.style.display = 'none';
            }
        }, 300);
    });

    // Mostra a seção alvo
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.remove('hidden');
        target.style.display = 'block';
        
        setTimeout(() => {
            target.classList.add('active');
            initIcons();
        }, 50);
    }
}

// Garantir Home visível ao carregar
function ensureHomeVisible() {
    const home = document.getElementById('home');
    if (home) {
        home.style.display = 'block';
        home.classList.remove('hidden');
        setTimeout(() => home.classList.add('active'), 10);
    }
}

// Carrossel/Carousel
function setupCarousel() {
    const track = document.getElementById('carousel-track');
    if (track) {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const prevBtnMob = document.getElementById('prev-btn-mobile');
        const nextBtnMob = document.getElementById('next-btn-mobile');
        
        let scrollAmount = 0;
        const cardWidth = 340 + 24; // Largura do card + gap

        const scrollCarousel = (direction) => {
            const containerWidth = track.parentElement.offsetWidth;
            const trackWidth = track.scrollWidth;
            const maxScroll = trackWidth - containerWidth;
            
            if (direction === 'next') {
                scrollAmount += cardWidth;
                if (scrollAmount > maxScroll) scrollAmount = maxScroll;
            } else {
                scrollAmount -= cardWidth;
                if (scrollAmount < 0) scrollAmount = 0;
            }
            
            track.style.transform = `translateX(-${scrollAmount}px)`;
        };

        if (prevBtn) prevBtn.addEventListener('click', () => scrollCarousel('prev'));
        if (nextBtn) nextBtn.addEventListener('click', () => scrollCarousel('next'));
        if (prevBtnMob) prevBtnMob.addEventListener('click', () => scrollCarousel('prev'));
        if (nextBtnMob) nextBtnMob.addEventListener('click', () => scrollCarousel('next'));
    }
}

// Inicializar navegação ao carregar
document.addEventListener('DOMContentLoaded', () => {
    initIcons();
    setupMobileMenu();
    ensureHomeVisible();
    setupCarousel();
});
