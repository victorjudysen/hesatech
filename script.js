// ===== MAIN APPLICATION INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initWelcomeLoader();
    initNavigation();
    initScrollEffects();
    initAnimations();
    initParallax();
    initCounters();
    initContactForm();
    initScrollToTop();
    initCursor();
    
    // Start reveal animations after a short delay
    setTimeout(() => {
        revealElements();
    }, 500);
}

// ===== CREATIVE WELCOME LOADER =====
function initWelcomeLoader() {
    const welcomeLoader = document.getElementById('welcome-loader');
    const progressFill = document.getElementById('progress-fill');
    const progressPercentage = document.getElementById('progress-percentage');
    const highlightItems = document.querySelectorAll('.highlight-item');
    const progressTruck = document.querySelector('.progress-truck');
    
    let progress = 0;
    let currentHighlight = 0;
    
    // Progress animation
    const progressInterval = setInterval(() => {
        progress += Math.random() * 3 + 1; // Random increment between 1-4
        
        if (progress > 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Complete loading after a short delay
            setTimeout(() => {
                completeLoading();
            }, 800);
        }
        
        // Update progress bar and percentage
        progressFill.style.width = progress + '%';
        progressPercentage.textContent = Math.floor(progress);
        
        // Move truck with progress
        progressTruck.style.left = Math.min(progress, 95) + '%';
        
    }, 150);
    
    // Feature highlights rotation
    const highlightInterval = setInterval(() => {
        // Remove active class from current highlight
        highlightItems[currentHighlight].classList.remove('active');
        
        // Move to next highlight
        currentHighlight = (currentHighlight + 1) % highlightItems.length;
        
        // Add active class to new highlight
        highlightItems[currentHighlight].classList.add('active');
        
        // Clear interval when loading is complete
        if (progress >= 100) {
            clearInterval(highlightInterval);
        }
    }, 1200);
    
    // Construction sound effects simulation (optional - can be removed if no audio)
    function playConstructionSounds() {
        // This is a placeholder for construction sound effects
        // You can add actual audio files if desired
        const sounds = ['crane', 'hammer', 'drilling', 'machinery'];
        // Implementation would go here for audio playback
    }
    
    function completeLoading() {
        // Final animation before hiding loader
        welcomeLoader.style.animation = 'loaderComplete 1s ease-in-out forwards';
        
        setTimeout(() => {
            welcomeLoader.classList.add('fade-out');
            
            // Remove loader from DOM after fade out
            setTimeout(() => {
                welcomeLoader.remove();
                
                // Trigger entrance animations for main content
                triggerMainContentAnimations();
            }, 800);
        }, 500);
    }
    
    function triggerMainContentAnimations() {
        // Add entrance animation classes to main content
        const mainContent = document.getElementById('main-content');
        const navbar = document.getElementById('navbar');
        
        if (mainContent) {
            mainContent.style.opacity = '0';
            mainContent.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                mainContent.style.transition = 'all 1s ease-out';
                mainContent.style.opacity = '1';
                mainContent.style.transform = 'translateY(0)';
            }, 100);
        }
        
        if (navbar) {
            navbar.style.opacity = '0';
            navbar.style.transform = 'translateY(-100%)';
            
            setTimeout(() => {
                navbar.style.transition = 'all 0.8s ease-out';
                navbar.style.opacity = '1';
                navbar.style.transform = 'translateY(0)';
            }, 300);
        }
    }
    
    // Enhanced loading experience with dynamic messages
    const loadingMessages = [
        "Preparing construction site...",
        "Loading building materials...",
        "Setting up construction equipment...",
        "Assembling professional team...",
        "Reviewing building plans...",
        "Quality checking processes...",
        "Finalizing project details...",
        "Welcome to Hesatech Investment Limited!"
    ];
    
    const progressLabel = document.querySelector('.progress-label');
    let messageIndex = 0;
    
    const messageInterval = setInterval(() => {
        if (messageIndex < loadingMessages.length && progress < 100) {
            progressLabel.textContent = loadingMessages[messageIndex];
            messageIndex++;
        } else if (progress >= 100) {
            progressLabel.textContent = "Welcome to Hesatech Investment Limited!";
            clearInterval(messageInterval);
        }
    }, 1000);
    
    // Add CSS animation for loader complete
    const style = document.createElement('style');
    style.textContent = `
        @keyframes loaderComplete {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
            100% { transform: scale(1.1); opacity: 0.7; }
        }
        
        #main-content {
            opacity: 0;
        }
        
        #navbar {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
}

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect with enhanced transitions
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10));

    // Mobile menu toggle with improved animations
    const mobileBreadcrumb = document.getElementById('mobile-breadcrumb');
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        if (mobileBreadcrumb) mobileBreadcrumb.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }

        const icon = mobileToggle.querySelector('i');
        if (icon) {
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                icon.style.transform = 'rotate(0deg)';
            }
        }
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) return;
        if (navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                if (mobileBreadcrumb) mobileBreadcrumb.classList.remove('active');
                document.body.classList.remove('menu-open'); // Remove body scroll prevention

                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (mobileBreadcrumb) mobileBreadcrumb.classList.remove('active');
            document.body.classList.remove('menu-open'); // Remove body scroll prevention

            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                smoothScrollTo(targetPosition, 800);
            }
        });
    });

    // Active nav link highlighting
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const offset = navbar.offsetHeight + 100;

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - offset) && scrollY < (sectionTop + sectionHeight - offset)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== SMOOTH SCROLLING UTILITY =====
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    window.addEventListener('scroll', throttle(function() {
        revealElements();
        updateParallax();
    }, 20));
}

// ===== ADVANCED REVEAL ANIMATIONS =====
function revealElements() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = revealPoint;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// ===== ANIMATIONS INITIALIZATION =====
function initAnimations() {
    // Stagger animations for cards
    staggerAnimations('.service-card', 100);
    staggerAnimations('.project-card', 150);
    staggerAnimations('.credential-card', 120);
    staggerAnimations('.stat-card', 80);

    // Hero text typing effect
    initTypingEffect();
    
    // Floating elements
    createFloatingElements();
    
    // Particle system for hero
    initParticleSystem();
}

function staggerAnimations(selector, delay) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        element.style.animationDelay = `${index * delay}ms`;
        element.classList.add('fade-in-up');
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    // Typewriter effect disabled - keeping title static
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    // Just ensure the title is visible without any typing animation
    heroTitle.style.opacity = '1';
}

// ===== FLOATING ELEMENTS =====
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-elements';
    
    for (let i = 0; i < 6; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 6 + 's';
        element.style.animationDuration = (Math.random() * 4 + 4) + 's';
        floatingContainer.appendChild(element);
    }
    
    hero.appendChild(floatingContainer);
}

// ===== PARTICLE SYSTEM =====
function initParticleSystem() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function updateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            
            ctx.globalAlpha = particle.opacity;
            ctx.fillStyle = '#3399FF';
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(updateParticles);
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create initial particles
    for (let i = 0; i < 50; i++) {
        particles.push(createParticle());
    }
    
    updateParticles();
}

// ===== PARALLAX EFFECTS =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', throttle(updateParallax, 10));
}

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// ===== COUNTER ANIMATIONS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.7
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = element.textContent;
    const isNumber = !isNaN(target);
    
    if (!isNumber) return;
    
    const targetNum = parseInt(target);
    const duration = 2000;
    const step = targetNum / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= targetNum) {
            current = targetNum;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('unified-contact-form');
    if (!form) {
        console.error('Contact form not found!');
        return;
    }

    console.log('Contact form initialized successfully');

    // Ensure all form fields are interactive
    const formFields = form.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        // Make sure each field is properly interactive
        field.style.pointerEvents = 'auto';
        field.style.position = 'relative';
        field.style.zIndex = '10';
        
        // Add test click handler to verify interaction
        field.addEventListener('click', function() {
            console.log('Field clicked:', field.id || field.name);
        });
        
        field.addEventListener('focus', function() {
            console.log('Field focused:', field.id || field.name);
            this.parentElement.classList.add('focused');
            // Remove any error states
            this.parentElement.classList.remove('error');
        });
        
        field.addEventListener('blur', function() {
            console.log('Field blurred:', field.id || field.name);
            if (!this.value.trim()) {
                this.parentElement.classList.remove('focused');
            }
            
            // Real-time validation
            validateField(this);
        });
        
        // For input and textarea, also listen to input events
        if (field.type !== 'select-one') {
            field.addEventListener('input', function() {
                console.log('Field input:', field.id || field.name, 'Value:', this.value);
            });
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        // Add loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon i');
        const originalText = btnText.textContent;
        const originalIcon = btnIcon.className;
        
        btnText.textContent = 'Sending...';
        btnIcon.className = 'fas fa-spinner fa-spin';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const project = formData.get('project');
        const message = formData.get('message');
        
        console.log('Form data:', { name, email, phone, project, message });
        
        // Basic validation
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            resetSubmitButton();
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            resetSubmitButton();
            return;
        }
        
        // Simulate form submission with realistic delay
        setTimeout(() => {
            // Create detailed success message
            let projectTypeText = project ? getProjectTypeText(project) : 'general inquiry';
            let successMessage = `Thank you, ${name}! Your ${projectTypeText} consultation request has been received. Our professional team will contact you within 24 hours to discuss your project requirements.`;
            
            showNotification(successMessage, 'success');
            
            // Reset form and button
            this.reset();
            resetSubmitButton();
            
            // Remove focused states from form groups
            const formGroups = form.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('focused');
            });
            
            // Optional: Send confirmation email (would need backend integration)
            console.log('Form submitted:', {
                name, email, phone, project, message,
                timestamp: new Date().toISOString()
            });
            
        }, 2000);
        
        function resetSubmitButton() {
            btnText.textContent = originalText;
            btnIcon.className = originalIcon;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
        
        function getProjectTypeText(projectType) {
            const projectTypes = {
                'residential': 'residential construction',
                'commercial': 'commercial development',
                'civil': 'civil engineering',
                'renovation': 'renovation/remodeling',
                'consultation': 'professional consultation',
                'other': 'construction services'
            };
            return projectTypes[projectType] || 'construction';
        }
    });

    // Real-time field validation and formatting
    const phoneField = form.querySelector('#phone');
    if (phoneField) {
        phoneField.addEventListener('input', function() {
            // Format phone number as user types
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    this.value = value;
                } else if (value.length <= 6) {
                    this.value = value.slice(0, 3) + '-' + value.slice(3);
                } else {
                    this.value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
                }
            }
        });
    }
    
    // Real-time field validation
    function validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');
        
        let isValid = true;
        let errorMessage = '';
        
        if (isRequired && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (fieldType === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (fieldType === 'tel' && value) {
            const phoneRegex = /^[\d\-\s\+\(\)]+$/;
            if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 9) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // Update field appearance
        if (!isValid) {
            field.parentElement.classList.add('error');
            showFieldError(field, errorMessage);
        } else {
            field.parentElement.classList.remove('error');
            hideFieldError(field);
        }
        
        return isValid;
    }
    
    function showFieldError(field, message) {
        let errorElement = field.parentElement.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    function hideFieldError(field) {
        const errorElement = field.parentElement.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '400px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
    });
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #3b82f6, #2563eb)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===== SCROLL TO TOP BUTTON =====
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', throttle(() => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }, 100));
    
    scrollToTopBtn.addEventListener('click', () => {
        smoothScrollTo(0, 800);
    });
}

// ===== CUSTOM CURSOR =====
function initCursor() {
    if (window.innerWidth <= 768) return; // Skip on mobile

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Simple hover detection for links and buttons
    const hoverElements = document.querySelectorAll('a, button');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}// ===== MOUSE PARALLAX EFFECT =====
function initMouseParallax() {
    const parallaxElements = document.querySelectorAll('.service-icon, .credential-icon');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        parallaxElements.forEach(element => {
            const speed = 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function throttle(func, wait) {
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

// ===== PERFORMANCE OPTIMIZATION =====
function initPerformanceOptimizations() {
    // Lazy load images when they come into view
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
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
    }
}

// ===== RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
    // Recalculate any size-dependent calculations
    updateParallax();
}, 250));

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const mobileToggle = document.getElementById('mobile-toggle');

            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open'); // Remove body scroll prevention
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// ===== CSS ANIMATIONS VIA JAVASCRIPT =====
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
    }
    
    .skip-link:focus {
        top: 6px;
    }
    
    .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .focused {
        transform: scale(1.02);
    }
`;
document.head.appendChild(style);
