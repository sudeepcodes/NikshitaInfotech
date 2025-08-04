// Animations JavaScript for Nikshitha Infotech Website

// Animation Classes and Effects
class AnimationManager {
    constructor() {
        this.animatedElements = [];
        this.parallaxElements = [];
        this.counterElements = [];
        this.init();
    }

    init() {
        this.setupAnimations();
        this.setupParallax();
        this.setupCounters();
        this.setupTypingEffect();
        this.setupScrollTriggers();
    }

    setupAnimations() {
        // Add animation classes to elements
        const elements = document.querySelectorAll('.service-card, .feature-card, .client-placeholder, .vm-card');
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.transitionDelay = `${index * 0.1}s`;
            
            this.animatedElements.push(element);
        });
    }

    setupParallax() {
        // Parallax effect for hero section
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            this.parallaxElements.push(heroBackground);
        }

        // Parallax for other sections
        const parallaxSections = document.querySelectorAll('.section');
        parallaxSections.forEach(section => {
            if (section.classList.contains('hero') || section.classList.contains('contact')) {
                this.parallaxElements.push(section);
            }
        });
    }

    setupCounters() {
        // Counter animation for statistics
        const counterElements = document.querySelectorAll('[data-counter]');
        counterElements.forEach(element => {
            this.counterElements.push(element);
        });
    }

    setupTypingEffect() {
        // Typing effect for hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            this.createTypingEffect(heroTitle, heroTitle.textContent);
        }
    }

    setupScrollTriggers() {
        // Intersection Observer for scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animated elements
        this.animatedElements.forEach(element => {
            observer.observe(element);
        });

        // Observe counter elements
        this.counterElements.forEach(element => {
            observer.observe(element);
        });
    }

    animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        element.classList.add('animated');
    }

    createTypingEffect(element, text) {
        element.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 500);
    }

    animateCounters() {
        this.counterElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-counter'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
    }
}

// Parallax Scrolling Effect
class ParallaxManager {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        this.setupParallaxElements();
        this.bindEvents();
    }

    setupParallaxElements() {
        // Hero background parallax
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            this.elements.push({
                element: heroBackground,
                speed: 0.5,
                direction: 'y'
            });
        }

        // Scroll indicator parallax
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            this.elements.push({
                element: scrollIndicator,
                speed: 0.3,
                direction: 'y'
            });
        }
    }

    bindEvents() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach(item => {
            const yPos = -(scrolled * item.speed);
            item.element.style.transform = `translateY(${yPos}px)`;
        });
    }

    handleResize() {
        // Recalculate positions on resize
        this.handleScroll();
    }
}

// Interactive Hover Effects
class HoverEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupServiceCardHovers();
        this.setupFeatureCardHovers();
        this.setupButtonHovers();
        this.setupIconHovers();
    }

    setupServiceCardHovers() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleServiceCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleServiceCardLeave.bind(this));
        });
    }

    handleServiceCardHover(e) {
        const card = e.currentTarget;
        const icon = card.querySelector('.service-icon i');
        
        // Animate icon
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        }

        // Add glow effect
        card.style.boxShadow = '0 20px 40px rgba(30, 60, 114, 0.3)';
    }

    handleServiceCardLeave(e) {
        const card = e.currentTarget;
        const icon = card.querySelector('.service-icon i');
        
        // Reset icon
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }

        // Remove glow effect
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    }

    setupFeatureCardHovers() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleFeatureCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleFeatureCardLeave.bind(this));
        });
    }

    handleFeatureCardHover(e) {
        const card = e.currentTarget;
        const icon = card.querySelector('.feature-icon i');
        
        if (icon) {
            icon.style.transform = 'scale(1.1)';
            icon.style.color = 'var(--accent-color)';
        }
    }

    handleFeatureCardLeave(e) {
        const card = e.currentTarget;
        const icon = card.querySelector('.feature-icon i');
        
        if (icon) {
            icon.style.transform = 'scale(1)';
            icon.style.color = 'var(--primary-color)';
        }
    }

    setupButtonHovers() {
        const buttons = document.querySelectorAll('.cta-button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', this.handleButtonHover.bind(this));
            button.addEventListener('mouseleave', this.handleButtonLeave.bind(this));
        });
    }

    handleButtonHover(e) {
        const button = e.currentTarget;
        button.style.transform = 'translateY(-2px)';
        button.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    }

    handleButtonLeave(e) {
        const button = e.currentTarget;
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    }

    setupIconHovers() {
        const icons = document.querySelectorAll('.feature-icon i, .service-icon i');
        
        icons.forEach(icon => {
            icon.addEventListener('mouseenter', this.handleIconHover.bind(this));
            icon.addEventListener('mouseleave', this.handleIconLeave.bind(this));
        });
    }

    handleIconHover(e) {
        const icon = e.currentTarget;
        icon.style.transform = 'scale(1.1) rotate(5deg)';
    }

    handleIconLeave(e) {
        const icon = e.currentTarget;
        icon.style.transform = 'scale(1) rotate(0deg)';
    }
}

// Text Animation Effects
class TextAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupRevealAnimations();
        this.setupMarqueeEffect();
    }

    setupRevealAnimations() {
        const textElements = document.querySelectorAll('.section-title, .hero-subtitle');
        
        textElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(element);
        });
    }

    setupMarqueeEffect() {
        // Create marquee effect for any scrolling text
        const marqueeElements = document.querySelectorAll('.marquee');
        
        marqueeElements.forEach(element => {
            this.createMarquee(element);
        });
    }

    createMarquee(element) {
        const content = element.textContent;
        const clone = element.cloneNode(true);
        
        element.appendChild(clone);
        
        let position = 0;
        const speed = 1;
        
        function animate() {
            position -= speed;
            if (position <= -element.offsetWidth / 2) {
                position = 0;
            }
            element.style.transform = `translateX(${position}px)`;
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

// Loading Animations
class LoadingAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupPageTransitions();
        this.setupProgressBars();
    }

    setupPageTransitions() {
        // Add page transition effects
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add('page-loaded');
        });
    }

    setupProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar');
        
        progressBars.forEach(bar => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateProgressBar(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(bar);
        });
    }

    animateProgressBar(bar) {
        const progress = bar.getAttribute('data-progress') || 100;
        const fill = bar.querySelector('.progress-fill');
        
        if (fill) {
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.transition = 'width 1.5s ease';
                fill.style.width = `${progress}%`;
            }, 100);
        }
    }
}

// Particle System for Background Effects
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.animate();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'particle-canvas';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.appendChild(this.canvas);
            this.resizeCanvas();
        }
        
        this.ctx = this.canvas.getContext('2d');
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }

    resizeCanvas() {
        if (this.canvas) {
            this.canvas.width = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
        }
    }

    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(this.animate.bind(this));
    }
}

// Initialize all animation systems
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animation managers
    window.animationManager = new AnimationManager();
    window.parallaxManager = new ParallaxManager();
    window.hoverEffects = new HoverEffects();
    window.textAnimations = new TextAnimations();
    window.loadingAnimations = new LoadingAnimations();
    
    // Initialize particle system for hero section
    if (document.querySelector('.hero')) {
        window.particleSystem = new ParticleSystem();
    }
    
    // Add CSS for animations
    addAnimationStyles();
});

// Add CSS styles for animations
function addAnimationStyles() {
    const styles = `
        <style>
            /* Animation classes */
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            /* Loading animations */
            body {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            body.loaded {
                opacity: 1;
            }
            
            /* Hover animations */
            .service-card, .feature-card {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .service-card:hover, .feature-card:hover {
                transform: translateY(-10px);
            }
            
            /* Icon animations */
            .service-icon i, .feature-icon i {
                transition: transform 0.3s ease, color 0.3s ease;
            }
            
            /* Button animations */
            .cta-button {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            /* Back to top button */
            .back-to-top {
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            
            .back-to-top.visible {
                opacity: 1;
                visibility: visible;
            }
            
            /* Mobile menu animations */
            .nav-menu {
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            
            @media (max-width: 768px) {
                .nav-menu {
                    transform: translateX(100%);
                    opacity: 0;
                }
                
                .nav-menu.active {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            /* Progress bar animations */
            .progress-bar {
                background: rgba(255,255,255,0.2);
                border-radius: 10px;
                overflow: hidden;
                height: 8px;
            }
            
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, var(--accent-color), var(--accent-secondary));
                border-radius: 10px;
                transition: width 1.5s ease;
            }
            
            /* Particle canvas */
            .particle-canvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
} 