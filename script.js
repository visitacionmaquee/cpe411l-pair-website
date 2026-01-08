let currentLanguage = localStorage.getItem('language') || 'en';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if (!header) return;

    let lastY = window.pageYOffset;
    let ticking = false;
    const threshold = 6;

    const onScroll = () => {
        const current = window.pageYOffset;
        const delta = current - lastY;

        if (Math.abs(delta) > threshold) {
            if (current > lastY && current > 80) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            lastY = current;
        }
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    });

    initLanguage();
});

function initLanguage() {
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
    setupLanguageSwitcher();
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    const page = getCurrentPage();
    const pageTranslations = translations[lang][page] || {};
    const navTranslations = translations[lang].nav || {};

    translateElements(navTranslations, 'nav');
    translateElements(pageTranslations, page);
    updateLanguageSwitcher(lang);
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/' || path.endsWith('/')) return 'index';
    if (path.includes('about.html')) return 'about';
    if (path.includes('services.html')) return 'services';
    if (path.includes('credentials.html')) return 'credentials';
    if (path.includes('contact.html')) return 'contact';
    return 'index';
}

function translateElements(translations, prefix) {
    Object.keys(translations).forEach(key => {
        const elements = document.querySelectorAll(`[data-i18n="${prefix}.${key}"]`);
        elements.forEach(el => {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[key];
            } else {
                el.textContent = translations[key];
            }
        });
    });
}

function setupLanguageSwitcher() {
    const switcher = document.querySelector('.language-switcher');
    if (!switcher) return;

    switcher.addEventListener('click', (e) => {
        if (e.target.classList.contains('lang-option')) {
            const lang = e.target.dataset.lang;
            setLanguage(lang);
        }
    });
}

function updateLanguageSwitcher(activeLang) {
    const options = document.querySelectorAll('.lang-option');
    options.forEach(opt => {
        opt.classList.remove('active');
        if (opt.dataset.lang === activeLang) {
            opt.classList.add('active');
        }
    });
}

function switchLanguage(lang) {
    setLanguage(lang);
}