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


    loadCategory('./JSON/cake.JSON', 'clubs-container', 'loading-cakes');
    loadCategory('./JSON/cookies.JSON', 'clubs-containerA', 'loading-cookies');
    loadCategory('./JSON/other.JSON', 'clubs-containerB', 'loading-other');

    // ── Card loading only if container exists ─────────────────

    // Correct containers


    function loadCategory(file, containerId, loadingId) {
        const loading = document.getElementById(loadingId);

        if (loading) loading.style.display = 'block';

        fetch(file)
            .then(res => res.ok ? res.json() : [])
            .then(items => {
                const container = document.getElementById(containerId);
                if (!container) return;

                container.innerHTML = '';

                items.forEach(item => {
                    const col = document.createElement('div');
                    col.className = 'col';

                    col.innerHTML = `
                    <div class="club-card">
                        <img src="${item.image}" class="club-image" alt="${item.name}">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                `;

                    container.appendChild(col);
                });

                // ✅ HIDE loading when done
                if (loading) loading.style.display = 'none';
            })
            .catch(() => {
                const container = document.getElementById(containerId);
                if (container) {
                    container.innerHTML = '<p class="text-center">Failed to load items.</p>';
                }

                if (loading) loading.style.display = 'none';
            });
    }

    function getCurrentPageFilename() {
        const parts = window.location.pathname.split('/');
        return parts[parts.length - 1] || '';
    }

    function getPageLabel(page) {
        const map = {
            'index.html': 'Home',
            'insta.html': 'Creations',
            'buy.html': 'Purchase & Reviews',
        };
        return map[page] || (page ? page.replace('.html', '') : '');
    }

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": "&#39;" }[s]));
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
