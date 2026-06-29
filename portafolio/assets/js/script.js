document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initNavbarScroll();
    initTypewriter();
    initScrollSpy();
});

/* --- Mobile Nav --- */
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });
}

/* --- Navbar Scroll --- */
function initNavbarScroll() {
    const navbarWrapper = document.querySelector('.navbar-wrapper');
    if (!navbarWrapper) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbarWrapper.classList.add('scrolled');
        } else {
            navbarWrapper.classList.remove('scrolled');
        }
    });
}

/* --- Typewriter --- */
function initTypewriter() {
    const target = document.getElementById('typewriter');
    if (!target) return;

    const words = [
        "Desarrolladora Full Stack Junior",
        "Software Developer",
        "Backend & Frontend Developer en Formación"
    ];
    let i = 0, j = 0, isDeleting = false;

    function type() {
        const word = words[i];
        target.textContent = word.substring(0, j);
        if (!isDeleting && j < word.length) {
            j++;
        } else if (isDeleting && j > 0) {
            j--;
        } else if (!isDeleting && j === word.length) {
            isDeleting = true;
            setTimeout(type, 1500);
            return;
        } else if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % words.length;
        }
        setTimeout(type, isDeleting ? 50 : 100);
    }
    type();
}

/* --- Scroll Spy --- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(section => observer.observe(section));
}
