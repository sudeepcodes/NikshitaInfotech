// Main JavaScript for Nikshitha Infotech Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingScreen();
    initNavigation();
    initMobileMenu();
    initSmoothScrolling();
    initBackToTop();
    initServiceCards();
    initContactForm();
    initScrollAnimations();
});

// Loading Screen Management
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.classList.add('page-loaded');
            // Remove from DOM after animation
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });
}

// Navigation Functionality
function initNavigation() {
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
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
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Service Cards Interaction
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceButtons = document.querySelectorAll('.service-btn');
    
    // Add hover effects and click handlers
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // Service button click handlers
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.service-card');
            const serviceType = card.getAttribute('data-service');
            const serviceTitle = card.querySelector('h3').textContent;
            
            // Show service details modal or scroll to contact
            showServiceDetails(serviceType, serviceTitle);
        });
    });
}

// Service Details Modal
function showServiceDetails(serviceType, serviceTitle) {
    // Create modal content based on service type
    let modalContent = '';
    
    switch(serviceType) {
        case 'security':
            modalContent = `
                <h3>${serviceTitle}</h3>
                <p>Our comprehensive security services include:</p>
                <ul>
                    <li>Armed and unarmed security personnel</li>
                    <li>24/7 surveillance and monitoring</li>
                    <li>Access control and visitor management</li>
                    <li>Emergency response and crisis management</li>
                    <li>Security audits and risk assessment</li>
                </ul>
                <p>All our security personnel undergo rigorous training and background verification.</p>
            `;
            break;
        case 'facility':
            modalContent = `
                <h3>${serviceTitle}</h3>
                <p>Complete facility management solutions:</p>
                <ul>
                    <li>Professional housekeeping services</li>
                    <li>Maintenance and repair services</li>
                    <li>Waste management and disposal</li>
                    <li>Pest control and sanitization</li>
                    <li>Equipment maintenance and servicing</li>
                </ul>
                <p>We ensure your facility remains clean, safe, and well-maintained.</p>
            `;
            break;
        default:
            modalContent = `
                <h3>${serviceTitle}</h3>
                <p>For detailed information about our ${serviceTitle.toLowerCase()} services, please contact us.</p>
                <p>Our team will provide you with a customized solution tailored to your specific needs.</p>
            `;
    }
    
    // Show modal or redirect to contact
    showModal(modalContent);
}

// Modal Functionality
function showModal(content) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                <button class="cta-button primary" onclick="scrollToContact()">Get Quote</button>
                <button class="cta-button secondary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        <style>
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            .modal.show {
                opacity: 1;
            }
            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                transform: scale(0.7);
                transition: transform 0.3s ease;
            }
            .modal.show .modal-content {
                transform: scale(1);
            }
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1.5rem;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
            }
            .modal-close:hover {
                color: #333;
            }
            .modal-body {
                margin: 1rem 0;
            }
            .modal-body h3 {
                color: var(--primary-color);
                margin-bottom: 1rem;
            }
            .modal-body ul {
                margin: 1rem 0;
                padding-left: 1.5rem;
            }
            .modal-body li {
                margin: 0.5rem 0;
            }
            .modal-footer {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
                margin-top: 1.5rem;
            }
        </style>
    `;
    
    // Add to page
    document.head.insertAdjacentHTML('beforeend', modalStyles);
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    // Close on outside click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Close modal function
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Scroll to contact function
function scrollToContact() {
    closeModal();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = contactSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Contact Form Functionality
function initContactForm() {
    // Add click handlers for contact buttons
    const callButtons = document.querySelectorAll('a[href^="tel:"]');
    const emailButtons = document.querySelectorAll('a[href^="mailto:"]');
    
    callButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track call clicks (analytics)
            console.log('Call button clicked:', this.href);
        });
    });
    
    emailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Track email clicks (analytics)
            console.log('Email button clicked:', this.href);
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .feature-card, .client-placeholder');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Utility Functions
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

// Window resize handler
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments
    const navMenu = document.getElementById('nav-menu');
    const mobileMenuBtn = document.getElementById('mobile-menu');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
    }
}, 250));

// Performance optimization
window.addEventListener('load', function() {
    // Preload critical resources
    const criticalImages = document.querySelectorAll('img[data-src]');
    criticalImages.forEach(img => {
        img.src = img.dataset.src;
    });
}); 