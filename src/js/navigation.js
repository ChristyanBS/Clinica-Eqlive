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
    const target = document.getElementById(pageId);
    if (!target) {
        const normalizedPath = window.location.pathname.replace(/\\/g, '/');
        let basePath = 'index.html';

        if (normalizedPath.includes('/condicoes/')) {
            basePath = '../index.html';
        } else if (normalizedPath.includes('/pages/')) {
            const parts = normalizedPath.split('/');
            const pagesIndex = parts.indexOf('pages');
            if (pagesIndex !== -1) {
                const depth = Math.max(0, parts.length - pagesIndex - 2);
                basePath = '../'.repeat(depth + 1) + 'index.html';
            } else {
                basePath = '../index.html';
            }
        }

        const hash = pageId ? `#${pageId}` : '';
        const extra = scrollToElement ? `:${scrollToElement}` : '';
        window.location.href = `${basePath}${hash}${extra}`;
        return;
    }

    const isInitialRender = document.documentElement && document.documentElement.hasAttribute('data-spa-target');

    const current = document.querySelector('.page-section.active');
    const isAlreadyOnPage = current && current.id === pageId && !scrollToElement;

    // Sempre faz scroll para o topo (apenas dentro da SPA)
    if (typeof scrollToTop === 'function') {
        scrollToTop();
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Se já está na página, apenas faz o scroll e retorna
    if (isAlreadyOnPage) {
        return;
    }
    
    // Esconde todas as seções
    document.querySelectorAll('.page-section').forEach(section => {
        if (section.id === pageId) return;
        section.classList.remove('active', 'is-visible');
        section.classList.add('is-hidden');
    });

    // Mostra a seção alvo
    target.classList.remove('is-hidden');
    target.classList.add('is-visible');
    target.classList.add('active');

    if (document.documentElement && document.documentElement.hasAttribute('data-spa-target')) {
        document.documentElement.removeAttribute('data-spa-target');
    }

    if (typeof initIcons === 'function') {
        initIcons();
    }
    if (typeof initCounters === 'function') {
        initCounters();
    }
    animatePageReveal(target);

    if (scrollToElement) {
        setTimeout(() => {
            const element = document.getElementById(scrollToElement);
            if (element) {
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - 100,
                    behavior: 'smooth'
                });
            }
        }, 500);
    }
}

function collectRevealItems(root) {
    const selectors = 'h1,h2,h3,h4,p,li,button,a,img';
    return Array.from(root.querySelectorAll(selectors)).filter((el) => {
        if (el.closest('nav')) return false;
        if (el.closest('footer')) return false;
        if (el.classList.contains('no-reveal')) return false;
        return true;
    });
}

function animatePageReveal(root) {
    if (!root) return;
    const items = collectRevealItems(root);
    if (!items.length) return;

    const maxItems = 26;
    items.slice(0, maxItems).forEach((el, index) => {
        el.classList.remove('reveal-in', 'reveal-left', 'reveal-right', 'reveal-item');
        el.classList.add('reveal-item');
        el.classList.add(index % 2 === 0 ? 'reveal-left' : 'reveal-right');
        el.style.setProperty('--reveal-delay', `${Math.min(index * 40, 320)}ms`);
    });

    requestAnimationFrame(() => {
        items.slice(0, maxItems).forEach((el) => el.classList.add('reveal-in'));
    });
}

function runPageReveal() {
    const activeSection = document.querySelector('.page-section.active');
    if (activeSection) {
        animatePageReveal(activeSection);
        return;
    }
    const mainContent = document.querySelector('main') || document.body;
    animatePageReveal(mainContent);
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

function ensureVisibleSection() {
    const activeSection = document.querySelector('.page-section.active');
    if (activeSection) {
        activeSection.classList.remove('is-hidden');
        activeSection.classList.add('is-visible');
        if (document.documentElement && document.documentElement.hasAttribute('data-spa-target')) {
            document.documentElement.removeAttribute('data-spa-target');
        }
        return;
    }
    ensureHomeVisible();
    if (document.documentElement && document.documentElement.hasAttribute('data-spa-target')) {
        document.documentElement.removeAttribute('data-spa-target');
    }
}

// Carrossel/Carousel - INFINITO
function setupCarousel() {
    const track = document.getElementById('carousel-track');
    const container = document.querySelector('.carousel-container');
    if (!track || !container) {
        return;
    }

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const prevBtnMob = document.getElementById('prev-btn-mobile');
    const nextBtnMob = document.getElementById('next-btn-mobile');

    if (!track.dataset.cloned) {
        const cards = Array.from(track.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
        track.dataset.cloned = 'true';
    }

    track.querySelectorAll('a').forEach((card) => {
        card.setAttribute('draggable', 'false');
    });

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const baseSpeed = prefersReducedMotion ? 0 : 0.35;
    let rafId = null;
    let isDragging = false;
    let isPointerDown = false;
    let wasDragging = false;
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let startScrollLeft = 0;
    const dragThreshold = 6;
    let isAutoEnabled = !prefersReducedMotion;

    const getCardStep = () => {
        const firstCard = track.children[0];
        if (!firstCard) return 300;
        const gap = parseFloat(getComputedStyle(track).gap || '0');
        return firstCard.getBoundingClientRect().width + gap;
    };

    const maxScroll = () => track.scrollWidth / 2;

    const normalizeScroll = () => {
        const limit = maxScroll();
        if (container.scrollLeft >= limit) {
            container.scrollLeft -= limit;
        } else if (container.scrollLeft < 0) {
            container.scrollLeft += limit;
        }
    };

    const tick = () => {
        if (isAutoEnabled && !isDragging) {
            container.scrollLeft += baseSpeed;
            normalizeScroll();
        }
        rafId = requestAnimationFrame(tick);
    };

    const startAuto = () => {
        if (!isAutoEnabled) return;
        if (rafId) return;
        rafId = requestAnimationFrame(tick);
    };

    const stopAuto = () => {
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    };

    const scrollByStep = (direction) => {
        const step = getCardStep();
        const offset = direction === 'next' ? step : -step;
        stopAuto();
        container.scrollBy({ left: offset, behavior: 'smooth' });
        setTimeout(() => startAuto(), 600);
    };

    if (prevBtn) prevBtn.addEventListener('click', () => scrollByStep('prev'));
    if (nextBtn) nextBtn.addEventListener('click', () => scrollByStep('next'));
    if (prevBtnMob) prevBtnMob.addEventListener('click', () => scrollByStep('prev'));
    if (nextBtnMob) nextBtnMob.addEventListener('click', () => scrollByStep('next'));

    container.addEventListener('pointerdown', (event) => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        isPointerDown = true;
        isDragging = false;
        wasDragging = false;
        pointerId = event.pointerId;
        startX = event.clientX;
        startY = event.clientY;
        startScrollLeft = container.scrollLeft;
        stopAuto();
    });

    container.addEventListener('pointermove', (event) => {
        if (!isPointerDown) return;
        const dx = event.clientX - startX;
        const dy = event.clientY - startY;
        if (!isDragging) {
            if (Math.abs(dx) < dragThreshold && Math.abs(dy) < dragThreshold) {
                return;
            }
            isDragging = true;
            container.classList.add('is-dragging');
            if (pointerId !== null) {
                container.setPointerCapture(pointerId);
            }
        }
        event.preventDefault();
        container.scrollLeft = startScrollLeft - dx;
        normalizeScroll();
    });

    const endDrag = (event) => {
        if (!isPointerDown) return;
        if (isDragging) {
            wasDragging = true;
        }
        isPointerDown = false;
        isDragging = false;
        container.classList.remove('is-dragging');
        if (pointerId !== null && container.hasPointerCapture(pointerId)) {
            container.releasePointerCapture(pointerId);
        }
        pointerId = null;
        startAuto();
    };

    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);
    container.addEventListener('mouseleave', () => {
        if (!isPointerDown) return;
        isPointerDown = false;
        isDragging = false;
        container.classList.remove('is-dragging');
        pointerId = null;
        startAuto();
    });

    container.addEventListener('click', (event) => {
        if (wasDragging) {
            wasDragging = false;
            event.preventDefault();
            event.stopPropagation();
        }
    });

    container.addEventListener('dragstart', (event) => {
        event.preventDefault();
    });

    startAuto();
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
        how: 'how',
        'como-funciona': 'how',
        essence: 'essence',
        blog: 'blog',
        faq: 'faq',
        location: 'location'
    };
    if (rawHash) {
        window.__initialHashNavigation = true;
        const [hashPage, hashTarget] = rawHash.split(':');
        const pageId = hashToPage[hashLower] || hashPage;
        window.navigateTo(pageId, hashTarget || null);
        if (document.getElementById(pageId)) {
            history.replaceState(null, '', window.location.pathname + window.location.search);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'auto' });
            }, 10);
            setTimeout(() => {
                window.__initialHashNavigation = false;
            }, 800);
        }
    } else {
        ensureVisibleSection();
    }
    runPageReveal();
    setupCarousel();
});

window.addEventListener('pageshow', () => {
    if (window.__initialHashNavigation) {
        return;
    }
    ensureVisibleSection();
    runPageReveal();
});
