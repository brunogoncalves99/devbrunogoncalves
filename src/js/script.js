let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// close mobile menu when a navigation link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

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

// ===== utility functions =====
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
    const meta = document.querySelector('meta[name="theme-color"]');
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
    // reset: true,
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

    // gsap animations if available
    if (window.gsap) {
        gsap.registerPlugin(ScrollTrigger);

        // fade in each section on scroll
        gsap.utils.toArray('section').forEach(sec => {
            gsap.from(sec, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                scrollTrigger: {
                    trigger: sec,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        });

        // hero image parallax
        gsap.to('.home-img', {
            y: 50,
            ease: 'none',
            scrollTrigger: {
                trigger: '.home',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

        // stagger project cards entrance
        gsap.from('.project-card', {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.projects',
                start: 'top 75%'
            }
        });
    }
        interval: null,
        autoplayDelay: 2000 
    },
    
    'minibiblioteca-slider': {
        images: Array.from({length: 9}, (_, i) => `src/images/MiniBiblioteca/${i + 1}.jpg`),
        currentIndex: 0,
        interval: null,
        autoplayDelay: 2000 
    },
    
    'miniecommerce-slider': {
        images: Array.from({length: 6}, (_, i) => `src/images/MiniEcommerce/${i + 1}.jpg`),
        currentIndex: 0,
        interval: null,
        autoplayDelay: 2000 
    },

    'financeiro-slider': {
        images: Array.from({length: 7}, (_, i) => `src/images/SistemaFinanceiroMonitor/${i + 1}.png`),
        currentIndex: 0,
        interval: null,
        autoplayDelay: 2000 
    }
};

document.addEventListener('DOMContentLoaded', function() {
    Object.keys(projectSliders).forEach(sliderId => {
        initializeSlider(sliderId);
    });
    updateFooterYear();
    setupThemeToggle();

    const pre = document.getElementById('preloader');
    if (pre) {
        pre.style.opacity = 0;
        setTimeout(() => pre.remove(), 600);
    }

    if (window.Typed) {
        new Typed('#typed', {
            strings: ['Desenvolvedor .NET', 'Especialista em Clean Architecture', 'Apaixonado por Programação'],
            typeSpeed: 60,
            backSpeed: 30,
            backDelay: 1500,
            loop: true
        });
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

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/src/js/sw.js')
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
});

function initializeSlider(sliderId) {
    const sliderElement = document.getElementById(sliderId);
    if (!sliderElement) return;

    const config = projectSliders[sliderId];
    const container = sliderElement.querySelector('.slider-container');
    const dotsContainer = sliderElement.querySelector('.slider-dots');

    config.images.forEach((imageSrc, index) => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.loading = 'lazy';
        img.alt = `Screenshot ${index + 1} - ${sliderId.replace('-slider','')}`;
        img.classList.add('slider-image');
        if (index === 0) img.classList.add('active');
        
        img.onerror = function() {
            this.style.display = 'none';
            console.warn(`Imagem não encontrada: ${imageSrc}`);
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
    const newIndex = (config.currentIndex + direction + config.images.length) % config.images.length;
    goToSlide(sliderId, newIndex);
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
    
    if (config.interval) {
        clearInterval(config.interval);
    }

    config.interval = setInterval(() => {
        changeSlide(sliderId, 1);
    }, config.autoplayDelay);
}

function stopAutoplay(sliderId) {
    const config = projectSliders[sliderId];
    if (config.interval) {
        clearInterval(config.interval);
        config.interval = null;
    }
}

document.addEventListener('keydown', function(e) {
    const activeSlider = document.querySelector('.project-images-slider:hover');
    if (!activeSlider) return;

    const sliderId = activeSlider.id;
    
    if (e.key === 'ArrowLeft') {
        changeSlide(sliderId, -1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(sliderId, 1);
    }
});