/* ========================================
   UTILITÁRIOS - EQLIVE
   ======================================== */

// Estado global do Quiz
let quizState = {
    selectedSymptoms: [],
    duration: null
};

// Inicializar ícones Lucide
function initIcons() {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

// Scroll suave para topo
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Scroll suave para elemento específico
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Verificar se elemento está visível
function isElementInViewport(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Adicionar classe com delay
function addClassWithDelay(element, className, delay = 0) {
    if (!element) return;
    setTimeout(() => element.classList.add(className), delay);
}

// Remover classe com delay
function removeClassWithDelay(element, className, delay = 0) {
    if (!element) return;
    setTimeout(() => element.classList.remove(className), delay);
}

// Toggle classe com condição
function toggleClassConditionally(element, className, condition) {
    if (!element) return;
    if (condition) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}

// Debounce para funções
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle para funções
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Validar email
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Copiar para clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        console.log('Texto copiado!');
    }).catch(err => {
        console.error('Erro ao copiar:', err);
    });
}

// Formatador de telefone
function formatPhone(phone) {
    return phone
        .replace(/\D/g, '')
        .replace(/^(\d{0,2})/, '($1')
        .replace(/\)(\d{0,5})/, ')$1')
        .replace(/(\d{4})(\d)/, '$1-$2');
}

// Formatar moeda
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Detectar dispositivo
function getDeviceType() {
    const userAgent = navigator.userAgent;
    if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
        return 'mobile';
    } else if (/tablet|ipad/i.test(userAgent)) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}

// Sleep (esperar X segundos)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
