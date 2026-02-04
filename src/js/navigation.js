/* ========================================
   NAVEGAÇÃO SPA - EQLIVE
   ======================================== */

// Menu Mobile
function setupMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    const closeBtn = document.getElementById('mobile-menu-close');
    const openMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        mobileOverlay?.classList.remove('hidden');
        mobileOverlay?.classList.add('opacity-100');
        mobileOverlay?.classList.remove('opacity-0');
        document.body.classList.add('menu-open');
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        setTimeout(() => mobileMenu.classList.add('hidden'), 500);
        mobileOverlay?.classList.add('opacity-0');
        mobileOverlay?.classList.remove('opacity-100');
        setTimeout(() => mobileOverlay?.classList.add('hidden'), 500);
        document.body.classList.remove('menu-open');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
    };

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            if (mobileMenu.classList.contains('hidden')) {
                openMenu();
            } else {
                closeMenu();
            }
        });
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMenu);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            closeMenu();
        }
    });

    document.addEventListener('click', (event) => {
        if (!mobileMenu || mobileMenu.classList.contains('hidden')) return;
        const target = event.target;
        if (mobileMenu.contains(target) || menuBtn?.contains(target)) return;
        closeMenu();
    });
}

// Navegação Mobile
window.mobileNav = function(pageId) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileMenu) {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        setTimeout(() => mobileMenu.classList.add('hidden'), 500);
        mobileOverlay?.classList.add('opacity-0');
        mobileOverlay?.classList.remove('opacity-100');
        setTimeout(() => mobileOverlay?.classList.add('hidden'), 500);
        document.body.classList.remove('menu-open');
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }
    window.navigateTo(pageId);
}

// Navegação SPA com suporte a âncoras
window.navigateTo = function(pageId, scrollToElement = null) {
    const current = document.querySelector('.page-section.active');
    if (current && current.id === pageId && !scrollToElement) {
        return;
    }
    if (typeof scrollToTop === 'function') {
        scrollToTop();
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Esconde todas as seções
    document.querySelectorAll('.page-section').forEach(section => {
        if (section.id === pageId) return;
        if (section.classList.contains('active')) {
            section.classList.remove('active');
            section.classList.add('is-visible');
            setTimeout(() => {
                section.classList.add('is-hidden');
                section.classList.remove('is-visible');
            }, 350);
        } else {
            section.classList.add('is-hidden');
            section.classList.remove('is-visible');
        }
    });

    // Mostra a seção alvo
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.remove('is-hidden');
        target.classList.add('is-visible');
        
        requestAnimationFrame(() => {
            target.classList.add('active');
            if (typeof initIcons === 'function') {
                initIcons();
            }
            if (typeof initCounters === 'function') {
                initCounters();
            }
            
            // Se há um elemento alvo, scroll para ele após a página estar renderizada
            if (scrollToElement) {
                setTimeout(() => {
                    const element = document.getElementById(scrollToElement);
                    if (element) {
                        // Calcula a posição do elemento e faz scroll suave
                        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                        window.scrollTo({
                            top: elementPosition - 100, // 100px de offset do topo
                            behavior: 'smooth'
                        });
                    }
                }, 500); // Espera 500ms para garantir renderização completa
            }
        });
    } else {
        const isCondicoesPage = window.location.pathname.replace(/\\/g, '/').includes('/condicoes/');
        const basePath = isCondicoesPage ? '../index.html' : 'index.html';
        const hash = pageId ? `#${pageId}` : '';
        const extra = scrollToElement ? `:${scrollToElement}` : '';
        window.location.href = `${basePath}${hash}${extra}`;
    }
}

// Garantir Home visível ao carregar
function ensureHomeVisible() {
    const home = document.getElementById('home');
    if (home) {
        home.classList.remove('is-hidden');
        home.classList.add('is-visible');
        setTimeout(() => home.classList.add('active'), 10);
    }
}

// Carrossel/Carousel - INFINITO
function setupCarousel() {
    const track = document.getElementById('carousel-track');
    if (track) {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const prevBtnMob = document.getElementById('prev-btn-mobile');
        const nextBtnMob = document.getElementById('next-btn-mobile');
        
        console.log('Carousel Setup:', { track: !!track, prevBtn: !!prevBtn, nextBtn: !!nextBtn, prevBtnMob: !!prevBtnMob, nextBtnMob: !!nextBtnMob });
        
        // Duplicar cards para criar efeito infinito
        const cards = Array.from(track.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
        
        let scrollAmount = 0;
        const cardWidth = 340 + 24; // Largura do card + gap
        const totalCards = cards.length;

        const scrollCarousel = (direction) => {
            if (direction === 'next') {
                scrollAmount += cardWidth;
                track.style.transform = `translateX(-${scrollAmount}px)`;
                
                // Se chegou no final, reinicia do começo sem perceber
                setTimeout(() => {
                    if (scrollAmount >= cardWidth * totalCards) {
                        track.style.transition = 'none';
                        scrollAmount = 0;
                        track.style.transform = `translateX(0)`;
                        setTimeout(() => {
                            track.style.transition = 'transform 500ms ease-out';
                        }, 50);
                    }
                }, 500);
            } else {
                scrollAmount -= cardWidth;
                
                // Se estava no começo, vai pro final
                if (scrollAmount < 0) {
                    track.style.transition = 'none';
                    scrollAmount = cardWidth * totalCards;
                    track.style.transform = `translateX(-${scrollAmount}px)`;
                    setTimeout(() => {
                        track.style.transition = 'transform 500ms ease-out';
                        scrollAmount -= cardWidth;
                        track.style.transform = `translateX(-${scrollAmount}px)`;
                    }, 50);
                } else {
                    track.style.transform = `translateX(-${scrollAmount}px)`;
                }
            }
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                console.log('Prev button clicked');
                scrollCarousel('prev');
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                console.log('Next button clicked');
                scrollCarousel('next');
            });
        }
        if (prevBtnMob) {
            prevBtnMob.addEventListener('click', () => {
                console.log('Prev mobile button clicked');
                scrollCarousel('prev');
            });
        }
        if (nextBtnMob) {
            nextBtnMob.addEventListener('click', () => {
                console.log('Next mobile button clicked');
                scrollCarousel('next');
            });
        }
    } else {
        console.log('Carousel track not found');
    }
}

// Inicializar navegação ao carregar
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initIcons === 'function') {
        initIcons();
    }
    if (typeof initCounters === 'function') {
        initCounters();
    }
    setupMobileMenu();
    const rawHash = window.location.hash.replace('#', '').trim();
    const hashLower = rawHash.toLowerCase();
    const hashToPage = {
        specialties: 'specialties',
        especialidades: 'specialties',
        home: 'home',
        about: 'about',
        essence: 'essence',
        blog: 'blog',
        faq: 'faq',
        location: 'location'
    };
    if (rawHash) {
        const [hashPage, hashTarget] = rawHash.split(':');
        const pageId = hashToPage[hashLower] || hashPage;
        window.navigateTo(pageId, hashTarget || null);
        if (document.getElementById(pageId)) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'auto' });
            }, 10);
        }
    } else {
        ensureHomeVisible();
    }
    setupCarousel();
});
