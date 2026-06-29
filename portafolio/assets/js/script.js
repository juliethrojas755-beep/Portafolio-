document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initCustomCursor();
    initMobileNav();
    initNavbarScroll();
    initTypewriter();
    initScrollReveal();
    initStatsCounter();
    initScrollSpy();
});

/**
 * 1. Premium Custom Cursor with Interpolation
 */
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');
    
    if (!cursor || !cursorDot) return;

    let mouseX = 0, mouseY = 0; // Target coordinates
    let cursorX = 0, cursorY = 0; // Current smooth coordinates
    let isMoving = false;

    // Listen to mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
        
        // Immediate movement for inner dot
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
        cursorDot.style.opacity = '1';
        cursor.style.opacity = '1';
    });

    // Handle cursor leaving viewport
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    // Smooth cursor interpolation loop
    function updateCursorPosition() {
        if (isMoving) {
            // Easing factor (0.15 makes it lag smoothly behind the mouse)
            const ease = 0.15;
            cursorX += (mouseX - cursorX) * ease;
            cursorY += (mouseY - cursorY) * ease;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
        }
        requestAnimationFrame(updateCursorPosition);
    }
    updateCursorPosition();

    // Hover effect on interactive elements
    const hoverables = document.querySelectorAll('a, button, .skill-card, .contact-card, .btn-project');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
        });
    });
}

/**
 * 2. Mobile Hamburger Toggle Menu & Accessibility
 */
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('open');
        
        // Toggle active visual states
        navToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        
        // Accessibility updates
        navToggle.setAttribute('aria-expanded', !isOpen);
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

/**
 * 3. Navbar background shift on scroll
 */
function initNavbarScroll() {
    const navbarWrapper = document.querySelector('.navbar-wrapper');
    if (!navbarWrapper) return;

    const handleNavbarStyle = () => {
        if (window.scrollY > 50) {
            navbarWrapper.classList.add('scrolled');
        } else {
            navbarWrapper.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavbarStyle);
    handleNavbarStyle(); // Check on init
}

/**
 * 4. Typewriter text rotation effect
 */
function initTypewriter() {
    const targetElement = document.getElementById('typewriter');
    if (!targetElement) return;

    const words = [
        "Desarrolladora Full Stack Junior",
        "Software Developer",
        "Backend & Frontend Developer en Formación"
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Delete character
            targetElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            // Write character
            targetElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Natural typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentWord.length) {
            // Fully typed, pause
            typingSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Fully erased, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Short pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    // Start effect
    setTimeout(type, 1000);
}

/**
 * 5. Scroll Reveal animations via Intersection Observer
 */
function initScrollReveal() {
    const animatedElements = document.querySelectorAll('.reveal-fade, .reveal-slide-up');
    
    if (animatedElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.10, // Trigger when 10% of element is in view
        rootMargin: '0px 0px -50px 0px' // Adjust triggers to slightly early
    });

    animatedElements.forEach(element => {
        revealObserver.observe(element);
    });
}

/**
 * 6. Animated Statistics Counters
 */
function initStatsCounter() {
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length === 0) return;

    const countTarget = (valueElement, targetValue) => {
        let currentCount = 0;
        const duration = 1500; // animation duration in ms
        const increment = targetValue / (duration / 16); // ~60fps refresh rate
        
        const updateCount = () => {
            currentCount += increment;
            if (currentCount >= targetValue) {
                valueElement.textContent = targetValue;
            } else {
                valueElement.textContent = Math.floor(currentCount);
                requestAnimationFrame(updateCount);
            }
        };
        
        requestAnimationFrame(updateCount);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statValue = entry.target.querySelector('.stat-value');
                if (statValue) {
                    const target = parseInt(statValue.getAttribute('data-target'), 10);
                    countTarget(statValue, target);
                }
                // Animate once
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    statCards.forEach(card => {
        statsObserver.observe(card);
    });
}

/**
 * 7. Navigation Scroll Spy (Highlight active item in viewport)
 */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        // High threshold for one-page highlights
        threshold: 0.35,
        rootMargin: '-80px 0px -40% 0px'
    });

    sections.forEach(section => {
        spyObserver.observe(section);
    });
}
