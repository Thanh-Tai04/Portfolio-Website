/* ===========================
   PRELOADER
=========================== */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        }, 1000);
    }
});

/* ===========================
   CUSTOM CURSOR
=========================== */
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorOutline.style.left = e.clientX + 'px';
            cursorOutline.style.top = e.clientY + 'px';
        }, 100);
    });

    document.querySelectorAll('a, button, .project-card, .skill-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

/* ===========================
   TYPING EFFECT
=========================== */
const typingText = document.getElementById('typingText');
if (typingText) {
    const texts = [
        'Front-end Developer',
        'React Enthusiast',
        'UI/UX Lover',
        'Web Designer',
        'Problem Solver'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

/* ===========================
   SMOOTH SCROLLING & NAVIGATION
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            navMenu.classList.remove('active');
            updateActiveLink(this.getAttribute('href'));
        }
    });
});

function updateActiveLink(href) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
}

/* ===========================
   MOBILE MENU TOGGLE
=========================== */
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

/* ===========================
   HEADER SCROLL EFFECT
=========================== */
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

/* ===========================
   ACTIVE SECTION HIGHLIGHT
=========================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ===========================
   SCROLL ANIMATIONS
=========================== */
const animateElements = document.querySelectorAll('[data-animate]');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

animateElements.forEach(element => {
    observer.observe(element);
});

/* ===========================
   SKILL BARS ANIMATION
=========================== */
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0%';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

/* ===========================
   STATS COUNTER ANIMATION
=========================== */
const statsNumbers = document.querySelectorAll('.stat-number');

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target;
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.floor(current);
                }
            }, 30);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

/* ===========================
   PROJECT FILTER
=========================== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

/* ===========================
   PARTICLES ANIMATION
=========================== */
const particles = document.getElementById('particles');
if (particles) {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5};
            animation: particleFloat ${15 + Math.random() * 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particles.appendChild(particle);
    }
}

/* ===========================
   FORM VALIDATION
=========================== */
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formMessage = document.getElementById('formMessage');

if (nameInput) nameInput.addEventListener('blur', () => validateField(nameInput, 'nameError', validateName));
if (emailInput) emailInput.addEventListener('blur', () => validateField(emailInput, 'emailError', validateEmail));
if (messageInput) messageInput.addEventListener('blur', () => validateField(messageInput, 'messageError', validateMessage));

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        clearErrors();
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        
        let isValid = true;
        
        if (!validateField(nameInput, 'nameError', validateName)) {
            isValid = false;
        }
        
        if (!validateField(emailInput, 'emailError', validateEmail)) {
            isValid = false;
        }
        
        if (!validateField(messageInput, 'messageError', validateMessage)) {
            isValid = false;
        }
        
        if (isValid) {
            formMessage.textContent = 'Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.';
            formMessage.classList.add('success');
            
            contactForm.reset();
            
            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000);
        } else {
            formMessage.textContent = 'Vui lòng kiểm tra lại thông tin và thử lại.';
            formMessage.classList.add('error');
        }
    });
}

function validateName(value) {
    return value.trim().length >= 2;
}

function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
}

function validateMessage(value) {
    return value.trim().length >= 10;
}

function validateField(input, errorId, validator) {
    const errorElement = document.getElementById(errorId);
    const value = input.value;
    
    if (!validator(value)) {
        input.style.borderColor = '#ef4444';
        
        let errorMessage = '';
        if (input.id === 'name') {
            errorMessage = 'Vui lòng nhập tên của bạn (ít nhất 2 ký tự)';
        } else if (input.id === 'email') {
            errorMessage = 'Vui lòng nhập địa chỉ email hợp lệ';
        } else if (input.id === 'message') {
            errorMessage = 'Tin nhắn phải có ít nhất 10 ký tự';
        }
        
        errorElement.textContent = errorMessage;
        return false;
    } else {
        input.style.borderColor = '#10b981';
        errorElement.textContent = '';
        return true;
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    
    document.querySelectorAll('input, textarea').forEach(el => {
        el.style.borderColor = '';
    });
}

/* ===========================
   BACK TO TOP BUTTON
=========================== */
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===========================
   PARALLAX EFFECT FOR HERO
=========================== */
window.addEventListener('scroll', () => {
    const heroShapes = document.querySelectorAll('.hero-shape');
    const scrolled = window.pageYOffset;
    
    heroShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

/* ===========================
   KEYBOARD NAVIGATION
=========================== */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

/* ===========================
   PROJECT CARD TILT EFFECT
=========================== */
const projectCards2 = document.querySelectorAll('.project-card');

projectCards2.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

/* ===========================
   CONSOLE MESSAGE
=========================== */
console.log('%c👋 Xin chào!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cCảm ơn bạn đã ghé thăm portfolio của tôi!', 'font-size: 14px; color: #6b7280;');
console.log('%cNguyễn Thành Tài - Front-end Developer', 'font-size: 12px; color: #10b981;');

/* ===========================
   SMOOTH REVEAL ON SCROLL
=========================== */
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.soft-skill-card, .skill-tag, .info-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});

/* ===========================
   ADD ACTIVE CLASS TO ELEMENTS
=========================== */
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .soft-skill-card,
    .skill-tag,
    .info-card {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .soft-skill-card.active,
    .skill-tag.active,
    .info-card.active {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(styleSheet);

/* ===========================
   LAZY LOAD IMAGES (If Needed)
=========================== */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

if (document.querySelectorAll('img[data-src]').length > 0) {
    lazyLoadImages();
}

/* ===========================
   UTILITY FUNCTIONS
=========================== */
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ===========================
   ENHANCED SCROLL PERFORMANCE
=========================== */
const efficientScroll = throttle(() => {
    // Scroll-based animations handled here
}, 100);

window.addEventListener('scroll', efficientScroll);

/* ===========================
   ANIMATED PAGE TRANSITIONS
=========================== */
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});