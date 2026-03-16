let currentLanguage = 'pt'; // Padrão: Português
let translations = {};
let translationsLoaded = false;

async function loadTranslations() {
    if (translationsLoaded) {
        console.log('✓ Traduções já estavam carregadas');
        return;
    }
    
    try {
        console.log('📥 Carregando traduções...');
        const response = await fetch('./src/js/translations.json');
        translations = await response.json();
        translationsLoaded = true;
        console.log('✓ Traduções carregadas com sucesso!', {
            idiomas: Object.keys(translations),
            total: Object.keys(translations).length
        });
        return true;
    } catch (error) {
        console.error('✗ Erro ao carregar traduções:', error);
        translationsLoaded = false;
        return false;
    }
}

function setLanguage(lang) {
    if (!translationsLoaded) {
        console.warn('⚠️ Traduções ainda não carregadas, aguardando...');
        loadTranslations().then(() => {
            console.log('✓ Traduções carregadas, alterando idioma para:', lang);
            setLanguage(lang);
        });
        return;
    }
    
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    console.log('✓ Idioma alterado para:', lang);
    
    // Small delay to ensure smooth transition
    setTimeout(() => {
        updatePageLanguage();
        updateLanguageButtons();
    }, 50);
}

function updatePageLanguage() {
    console.log('🔄 Atualizando página para idioma:', currentLanguage);

    // Small delay to ensure all elements are ready
    setTimeout(() => {
        const elements = document.querySelectorAll('[data-i18n]');
        let translatedCount = 0;
        let failedCount = 0;

        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getTranslation(key);

            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (Array.isArray(translation)) {
                    element.innerHTML = translation.map(item => `<li>${item}</li>`).join('');
                } else {
                    element.innerHTML = translation;
                }
                translatedCount++;
            } else {
                console.warn(`✗ Tradução não encontrada para: ${key}`);
                failedCount++;
            }
        });

        console.log(`✓ ${translatedCount} elementos traduzidos | ✗ ${failedCount} elementos sem tradução`);
    }, 100);
}

function getTranslation(key) {
    try {
        if (!translations || !translations[currentLanguage]) {
            console.warn(`Idioma ${currentLanguage} não encontrado em translations`);
            return null;
        }
        const keys = key.split('.');
        let value = translations[currentLanguage];
        
        for (let k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return null;
            }
        }
        
        return value;
    } catch (error) {
        console.warn(`Erro ao obter tradução para chave "${key}":`, error);
        return null;
    }
}

function updateLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === currentLanguage) {
            btn.classList.add('active');
        }
    });
}

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

const projectSliders = {
    'churrasquinho-slider': {
        images: Array.from({length: 17}, (_, i) => './src/images/Churrasquinho/' + (i + 1) + '.png'),
        currentIndex: 0,
        interval: null,
        autoplayDelay: 2000
    },
    
    'minibiblioteca-slider': {
        images: Array.from({length: 9}, (_, i) => './src/images/MiniBiblioteca/' + (i + 1) + '.jpg'),
        currentIndex: 0,
        interval: null,
        autoplayDelay: 2000
    },
    
    'miniecommerce-slider': {
        images: Array.from({length: 6}, (_, i) => './src/images/MiniEcommerce/' + (i + 1) + '.jpg'),
        currentIndex: 0,
        interval: null,
        autoplayDelay: 2000
    },

    'financeiro-slider': {
        images: Array.from({length: 7}, (_, i) => './src/images/SistemaFinanceiroMonitor/' + (i + 1) + '.png'),
        currentIndex: 0,
        interval: null,
        autoplayDelay: 2000
    }
};

// ===== SCROLL EFFECTS =====
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            })
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

function updateFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function applyTheme(theme) {
    if (theme === 'light') document.body.classList.add('light-mode');
    else document.body.classList.remove('light-mode');
    const icon = document.querySelector('#theme-toggle i');
    if (icon) icon.className = theme === 'light' ? 'bx bx-sun' : 'bx bx-moon';
    // update mobile browser theme color meta
    const meta = document.querySelector('meta[name=\"theme-color\"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#ffffff' : '#0ef');
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const current = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
}

function setupThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    btn.addEventListener('click', toggleTheme);
    const stored = localStorage.getItem('theme');
    if (stored) applyTheme(stored);
    else {
        const prefers = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        applyTheme(prefers);
    }
}

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form, .projects-subtitle', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

ScrollReveal().reveal('.experience-item', { 
    origin: 'bottom',
    distance: '50px',
    duration: 1500,
    delay: 300,
    interval: 200
});

ScrollReveal().reveal('.project-card', { 
    origin: 'bottom',
    distance: '60px',
    duration: 1500,
    delay: 300,
    interval: 200
});

ScrollReveal().reveal('.view-more', { 
    origin: 'bottom',
    distance: '40px',
    duration: 1500,
    delay: 400
});

document.addEventListener('DOMContentLoaded', function() {
    try {
        Object.keys(projectSliders).forEach(sliderId => {
            initializeSlider(sliderId);
        });
    } catch (error) {
        console.error('Error initializing sliders:', error);
    }

    setupProjectFilters();

    updateFooterYear();
    setupThemeToggle();

    const pre = document.getElementById('preloader');
    if (pre) {
        pre.style.opacity = 0;
        setTimeout(() => pre.remove(), 600);
    }

    const scrollBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (scrollBtn) {
            if (window.scrollY > 400) scrollBtn.classList.add('show');
            else scrollBtn.classList.remove('show');
        }
    });
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const dx = (x - cx) / cx;
            const dy = (y - cy) / cy;
            card.style.transform = `rotateY(${dx * 10}deg) rotateX(${ -dy * 10}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // register service worker for caching
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./src/js/sw.js')
          .then(reg => console.log('SW registered'))
          .catch(err => console.log('SW registration failed', err));
    }

    const contactForm = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showFeedback('Por favor, preencha todos os campos.', 'error');
                return;
            }

            if (!/\S+@\S+\.\S+/.test(email)) {
                showFeedback('E-mail inválido.', 'error');
                return;
            }

            // EmailJS config (mantive suas chaves atuais)
            emailjs.init('_t7v6N_HcOIQP2GCQ');
            emailjs.send('service_w9p7k19', 'template_vrrftrw', {
                from_name: name,
                from_email: email,
                message: message,
                to_name: 'Bruno Gonçalves'
            })
            .then(() => {
                showFeedback('Mensagem enviada com sucesso!', 'success');
                contactForm.reset();
            })
            .catch(() => {
                showFeedback('Erro ao enviar mensagem. Tente novamente.', 'error');
            });
        });
    }

    function showFeedback(message, type) {
        feedback.textContent = message;
        feedback.className = `form-feedback ${type}`;
        setTimeout(() => feedback.textContent = '', 5000);
    }

    loadTranslations().then(() => {
        updatePageLanguage();
        updateLanguageButtons();
        
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                console.log('Clicado em botão de idioma:', lang);
                setLanguage(lang);
            });
        });
    }).catch(error => {
        console.error('Erro ao carregar traduções na inicialização:', error);
    });
});

function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue.substring(1))) {
                    card.classList.remove('hidden');
                    card.setAttribute('aria-hidden', 'false');
                } else {
                    card.classList.add('hidden');
                    card.setAttribute('aria-hidden', 'true');
                }
            });
        });
    });
}

function initializeSlider(sliderId) {
    const sliderElement = document.getElementById(sliderId);
    if (!sliderElement) return;

    const config = projectSliders[sliderId];
    const container = sliderElement.querySelector('.slider-container');
    const dotsContainer = sliderElement.querySelector('.slider-dots');

    const loading = document.createElement('div');
    loading.className = 'slider-loading';
    loading.innerHTML = `
        <div style="text-align: center; color: var(--text-color);">
            <div style="font-size: 14px; margin-bottom: 8px;">Carregando imagens...</div>
        </div>
    `;
    container.appendChild(loading);

    let loadedImages = 0;
    const totalImages = config.images.length;

    config.images.forEach((imageSrc, index) => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.loading = 'lazy';
        img.alt = `Screenshot ${index + 1} - ${sliderId.replace('-slider','')}`;
        img.classList.add('slider-image');
        if (index === 0) img.classList.add('active');
        
        img.onload = () => {
            loadedImages++;
            if (loadedImages === totalImages) {
                loading.remove();
            }
        };
        
        img.onerror = function() {
            loadedImages++;
            this.style.display = 'none';
            console.warn(`Imagem não encontrada: ${imageSrc}`);
            if (loadedImages === totalImages) {
                loading.remove();
            }
        };
        
        container.appendChild(img);
    });

    config.images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(sliderId, index));
        dotsContainer.appendChild(dot);
    });

    startAutoplay(sliderId);
    sliderElement.addEventListener('mouseenter', () => stopAutoplay(sliderId));
    sliderElement.addEventListener('mouseleave', () => startAutoplay(sliderId));
}

function changeSlide(sliderId, direction) {
    const config = projectSliders[sliderId];
    goToSlide(sliderId, (config.currentIndex + direction + config.images.length) % config.images.length);
}

function goToSlide(sliderId, index) {
    const config = projectSliders[sliderId];
    const sliderElement = document.getElementById(sliderId);
    if (!sliderElement) return;

    const images = sliderElement.querySelectorAll('.slider-image');
    const dots = sliderElement.querySelectorAll('.dot');

    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (images[index]) images[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');

    config.currentIndex = index;
}

function startAutoplay(sliderId) {
    const config = projectSliders[sliderId];
    if (config.interval) clearInterval(config.interval);
    config.interval = setInterval(() => changeSlide(sliderId, 1), config.autoplayDelay);
}

function stopAutoplay(sliderId) {
    const config = projectSliders[sliderId];
    if (config.interval) {
        clearInterval(config.interval);
        config.interval = null;
    }
}

function startAutoplay(sliderId) {
    const config = projectSliders[sliderId];
    if (config.interval) clearInterval(config.interval);
    config.interval = setInterval(() => changeSlide(sliderId, 1), config.autoplayDelay);
}

function stopAutoplay(sliderId) {
    const config = projectSliders[sliderId];
    if (config.interval) {
        clearInterval(config.interval);
        config.interval = null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en' || savedLanguage === 'es')) {
        currentLanguage = savedLanguage;
    }

    // Initialize project filters
    setupProjectFilters();

    Object.keys(projectSliders).forEach(sliderId => {
        initializeSlider(sliderId);
    });

    loadTranslations().then(() => {
        updatePageLanguage();
        updateLanguageButtons();
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
});
