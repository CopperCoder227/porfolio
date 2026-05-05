// ── YouTube IFrame API for Background Video ─────────────────────────────────────────────────

let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('backgroundVideo', {
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    // Set playback rate to 0.85x (15% slower)
    event.target.setPlaybackRate(0.85);
}

// Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

document.addEventListener('DOMContentLoaded', () => {
    // ── Scroll Animation Observer ──────────────────────────────────────────
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('float-animate');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with animation trigger class
    document.querySelectorAll('.float-animate-trigger').forEach(el => {
        animationObserver.observe(el);
    });

    // ── About Carousel ───────────────────────────────────────────────────
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    // Auto-advance every 10 seconds
    let carouselInterval = setInterval(nextSlide, 10000);

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            clearInterval(carouselInterval);
            carouselInterval = setInterval(nextSlide, 10000);
        });
    });

    // Initialize first slide
    showSlide(currentSlide);

});


// ── Back to Top Button ────────────────────────────────────────
const backToTopBtn = document.getElementById('backToTopBtn');

if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
