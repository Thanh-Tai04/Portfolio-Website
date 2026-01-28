/* ===========================
   SMOOTH SCROLLING & NAVIGATION
=========================== */

// Smooth scrolling for all anchor links
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

            // Close mobile menu if open
            navMenu.classList.remove('active');
            
            // Update active link
            updateActiveLink(this.getAttribute('href'));
        }
    });
});

// Update active navigation link
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

// Close menu when clicking outside
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

    // Add scrolled class when scrolling down
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
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
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
   FORM VALIDATION
=========================== */

const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formMessage = document.getElementById('formMessage');

// Real-time validation
nameInput.addEventListener('blur', () => validateField(nameInput, 'nameError', validateName));
emailInput.addEventListener('blur', () => validateField(emailInput, 'emailError', validateEmail));
messageInput.addEventListener('blur', () => validateField(messageInput, 'messageError', validateMessage));

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Clear previous messages
    clearErrors();
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    
    let isValid = true;
    
    // Validate all fields
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
        // Show success message
        formMessage.textContent = 'Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.';
        formMessage.classList.add('success');
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    } else {
        // Show error message
        formMessage.textContent = 'Vui lòng kiểm tra lại thông tin và thử lại.';
        formMessage.classList.add('error');
    }
});

// Validation functions
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

/* ===========================
   TYPING EFFECT (Optional Enhancement)
=========================== */

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing effect on hero subtitle
// window.addEventListener('load', () => {
//     const subtitle = document.querySelector('.hero-subtitle');
//     const originalText = subtitle.textContent;
//     typeWriter(subtitle, originalText, 100);
// });

/* ===========================
   LAZY LOADING IMAGES (If Added Later)
=========================== */

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
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

// Call if images with data-src are added
// lazyLoadImages();

/* ===========================
   CURSOR EFFECT (Optional Enhancement)
=========================== */

// Create custom cursor (optional - uncomment to enable)
/*
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});
*/

/* ===========================
   PRELOADER (Optional)
=========================== */

window.addEventListener('load', () => {
    // Hide preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

/* ===========================
   CONSOLE MESSAGE
=========================== */

console.log('%c👋 Xin chào!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cCảm ơn bạn đã ghé thăm portfolio của tôi!', 'font-size: 14px; color: #6b7280;');
console.log('%cNguyễn Thành Tài - Front-end Developer', 'font-size: 12px; color: #10b981;');

/* ===========================
   ANALYTICS (Optional - Add Later)
=========================== */

// Function to track page views
function trackPageView(page) {
    // Add your analytics code here
    console.log(`Page view tracked: ${page}`);
}

// Track initial page load
trackPageView(window.location.pathname);

/* ===========================
   UTILITY FUNCTIONS
=========================== */

// Debounce function for performance optimization
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

// Throttle function for scroll events
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

// Use throttle for scroll events if needed
// window.addEventListener('scroll', throttle(() => {
//     console.log('Scrolling...');
// }, 100));

/* ===========================
   KEYBOARD NAVIGATION
=========================== */

document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

/* ===========================
   PRINT STYLES TRIGGER
=========================== */

window.addEventListener('beforeprint', () => {
    console.log('Preparing to print...');
    // Add any print preparation logic here
});

window.addEventListener('afterprint', () => {
    console.log('Print completed');
    // Add any post-print logic here
});