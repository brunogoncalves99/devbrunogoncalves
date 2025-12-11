let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

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


ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form, .projects-subtitle', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

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

const projectSliders = {
    'churrasquinho-slider': {
        images: Array.from({length: 17}, (_, i) => `src/images/Churrasquinho/${i + 1}.png`),
        currentIndex: 0,
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
    }
};

document.addEventListener('DOMContentLoaded', function() {
    Object.keys(projectSliders).forEach(sliderId => {
        initializeSlider(sliderId);
    });
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
        img.alt = `Screenshot ${index + 1}`;
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