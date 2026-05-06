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
    const aboutCarousel = document.getElementById('aboutCarousel');
    if (aboutCarousel) {
        let currentSlideAbout = 0;
        const slidesAbout = aboutCarousel.querySelectorAll('.carousel-slide');
        const dotsAbout = aboutCarousel.querySelectorAll('.dot');
        const totalSlidesAbout = slidesAbout.length;

        function showSlideAbout(index) {
            slidesAbout.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dotsAbout.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextSlideAbout() {
            currentSlideAbout = (currentSlideAbout + 1) % totalSlidesAbout;
            showSlideAbout(currentSlideAbout);
        }

        // Auto-advance every 10 seconds
        let carouselIntervalAbout = setInterval(nextSlideAbout, 10000);

        // Dot click handlers
        dotsAbout.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlideAbout = index;
                showSlideAbout(currentSlideAbout);
                clearInterval(carouselIntervalAbout);
                carouselIntervalAbout = setInterval(nextSlideAbout, 10000);
            });
        });

        // Initialize first slide
        showSlideAbout(currentSlideAbout);
    }

    // ── Future Carousel ───────────────────────────────────────────────────
    const futureCarousel = document.getElementById('futureCarousel');
    if (futureCarousel) {
        let currentSlideFuture = 0;
        const slidesFuture = futureCarousel.querySelectorAll('.carousel-slide');
        const dotsFuture = futureCarousel.querySelectorAll('.dot');
        const totalSlidesFuture = slidesFuture.length;

        function showSlideFuture(index) {
            slidesFuture.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            dotsFuture.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextSlideFuture() {
            currentSlideFuture = (currentSlideFuture + 1) % totalSlidesFuture;
            showSlideFuture(currentSlideFuture);
        }

        // Auto-advance every 10 seconds
        let carouselIntervalFuture = setInterval(nextSlideFuture, 10000);

        // Dot click handlers
        dotsFuture.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlideFuture = index;
                showSlideFuture(currentSlideFuture);
                clearInterval(carouselIntervalFuture);
                carouselIntervalFuture = setInterval(nextSlideFuture, 10000);
            });
        });

        // Initialize first slide
        showSlideFuture(currentSlideFuture);
    }

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
