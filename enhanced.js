/*
* Date: 12/03/2025 - 25/03/2025
* Author: Aniket Mishra
* Purpose: Enhanced JavaScript functionality for portfolio website
* Copyright © 2025 Aniket Mishra. All rights reserved.
* This code may not be used without explicit permission and proper attribution.
* 
* Inspired by studio.ca.ey.com and flyhyer.com
*/

// Wait for DOM to load before initializing animations
document.addEventListener('DOMContentLoaded', () => {
    // Make sure content is visible first
    showContent();
    
    // Initialize loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen immediately
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
    
    // Try to initialize animations only after loading is complete
    initializeAnimations();
});

// Function to ensure content is visible regardless of script errors
function showContent() {
    // Make all content visible immediately
    document.body.style.visibility = 'visible';
    
    // Remove loading class if exists
    document.body.classList.remove('loading');
    
    // Show all initially hidden elements
    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach(el => {
        el.classList.add('visible');
        el.style.opacity = 1;
        el.style.transform = 'translateY(0)';
    });
    
    // Explicitly show our key sections
    ['#skills', '#education', '#experience', '#certifications'].forEach(selector => {
        const section = document.querySelector(selector);
        if (section) {
            section.style.visibility = 'visible';
            section.style.opacity = '1';
            section.style.display = 'block';
            
            // Also make sure all content within the section is visible
            section.querySelectorAll('*').forEach(el => {
                el.style.visibility = 'visible';
                el.style.opacity = '1';
                
                // Preserve appropriate display types
                if (el.classList.contains('skills-grid') || 
                    el.classList.contains('timeline') || 
                    el.classList.contains('certifications-grid')) {
                    el.style.display = 'grid';
                } else if (el.tagName === 'UL' || el.tagName === 'OL') {
                    el.style.display = 'block';
                }
            });
        }
    });
    
    // Force display for specific elements that might be hidden
    ['.skill-card', '.timeline-item', '.certification-card', 
     '.skills-grid', '.timeline', '.certifications-grid'].forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            if (selector.includes('grid') || selector.includes('timeline')) {
                el.style.display = 'grid';
            } else {
                el.style.display = 'block';
            }
            el.style.visibility = 'visible';
            el.style.opacity = '1';
        });
    });
    
    // Initialize advanced skill card effects
    initAdvancedSkillCards();
}

// Function to safely initialize all animations with performance optimization
function initializeAnimations() {
    try {
        // Check if device is low-end (for performance optimization)
        const isLowEndDevice = window.navigator.hardwareConcurrency <= 4 || 
                              !window.matchMedia("(min-width: 768px)").matches;
        
        // Initialize AOS if available, with optimized settings
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 600, // Faster animations
                easing: 'ease-out',
                once: true,
                mirror: false,
                disable: isLowEndDevice // Disable completely on low-end devices
            });
        }
        
        // Only initialize animation libraries if the device is capable
        if (!isLowEndDevice) {
            // Initialize smooth scrolling if LocomotiveScroll is available
            initLocomotiveScroll();
            
            // Initialize GSAP animations if available
            if (typeof gsap !== 'undefined') {
                initGSAPAnimations();
            }
            
            // Initialize custom cursor
            initCustomCursor();
        }
        
        // Always initialize essential functionality
        initMobileNav();
        trackScrollProgress();
        
        // Project hover effects - simplified for performance
        initSimplifiedProjectHoverEffects();
    } catch (error) {
        console.warn('Error initializing animations:', error);
    }
}

// Initialize LocomotiveScroll with error handling
function initLocomotiveScroll() {
    if (typeof LocomotiveScroll !== 'undefined') {
        try {
            const scrollContainer = document.querySelector('[data-scroll-container]');
            
            // Only initialize if the container exists
            if (scrollContainer) {
                const scroll = new LocomotiveScroll({
                    el: scrollContainer,
                    smooth: true,
                    smoothMobile: false,
                    smartphone: {
                        smooth: false // Disable on mobile for better performance
                    },
                    tablet: {
                        smooth: false // Disable on mobile for better performance
                    }
                });
                
                // Update scroll on window resize
                window.addEventListener('resize', () => {
                    scroll.update();
                });
                
                // Expose scroll to window for debugging
                window.locoScroll = scroll;
            }
        } catch (error) {
            console.warn('LocomotiveScroll initialization failed:', error);
        }
    }
}

// Initialize GSAP animations
function initGSAPAnimations() {
    try {
        // Register ScrollTrigger plugin if available
        if (gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Animate headings on scroll
            gsap.utils.toArray('h2').forEach(heading => {
                gsap.from(heading, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: heading,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });
            
            // Animate skill cards
            gsap.utils.toArray('.skill-card').forEach((card, index) => {
                gsap.from(card, {
                    y: 30,
                    opacity: 0,
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                });
            });
            
            // Animate timeline items
            gsap.utils.toArray('.timeline-item').forEach((item, index) => {
                gsap.from(item, {
                    x: -50,
                    opacity: 0,
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none none"
                    }
                });
            });
        }
    } catch (error) {
        console.warn('GSAP animation error:', error);
    }
}

// Custom cursor that follows mouse pointer (performance optimized)
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-follower');
    
    // Only initialize on non-touch devices and if cursor element exists
    if (cursor && window.matchMedia("(hover: hover)").matches) {
        try {
            // Make cursor visible
            cursor.style.display = 'block';
            
            // Track mouse position with RAF for smooth movement
            document.addEventListener('mousemove', (e) => {
                requestAnimationFrame(() => {
                    // Position directly follows mouse pointer
                    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
                });
            });
            
            // Add active class on interactive elements
            const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .skill-card, input, textarea');
            
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.width = '30px';
                    cursor.style.height = '30px';
                    cursor.style.opacity = '0.9';
                });
                
                el.addEventListener('mouseleave', () => {
                    cursor.style.width = '20px';
                    cursor.style.height = '20px';
                    cursor.style.opacity = '0.7';
                });
            });
            
            // Handle mouse leaving window
            document.addEventListener('mouseleave', () => {
                cursor.style.opacity = '0';
            });
            
            document.addEventListener('mouseenter', () => {
                cursor.style.opacity = '0.7';
            });
        } catch (error) {
            console.warn('Custom cursor initialization failed:', error);
            // Hide cursor if there's an error
            if (cursor) cursor.style.display = 'none';
        }
    } else if (cursor) {
        // Hide cursor on touch devices
        cursor.style.display = 'none';
    }
}

// Mobile navigation functionality
function initMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (!mobileNavToggle || !hamburger || !mobileNav) return;
    
    // Toggle mobile navigation
    mobileNavToggle.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('nav-open');
        
        // Prevent scrolling when nav is open
        if (mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close navigation when link is clicked
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('nav-open');
            document.body.style.overflow = '';
        });
    });
}

// Track scroll progress for the scroll indicator
function trackScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    
    if (scrollProgress) {
        // Use passive event listener for better scroll performance
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
            // Use transform instead of width for better performance
            scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
        }, { passive: true });
    }
}

// Simplified project hover effects for better performance
function initSimplifiedProjectHoverEffects() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (galleryItems.length === 0) return;
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) overlay.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.gallery-overlay');
            if (overlay) overlay.style.transform = 'translateY(100%)';
        });
    });
}

// Parallax effect for gallery images
document.addEventListener('mousemove', (e) => {
    const gallery = document.querySelector('.photo-gallery');
    
    if (gallery && window.innerWidth > 768 && typeof gsap !== 'undefined') {
        const galleryItems = document.querySelectorAll('.gallery-item-inner');
        
        galleryItems.forEach(item => {
            const moving = item.querySelector('img');
            if (!moving) return;
            
            // Calculate movement based on mouse position
            const x = (e.clientX / window.innerWidth - 0.5) * 10; // Reduced intensity
            const y = (e.clientY / window.innerHeight - 0.5) * 10;
            
            gsap.to(moving, {
                x: x,
                y: y,
                duration: 1,
                ease: "power2.out"
            });
        });
    }
}, { passive: true }); // Use passive event for better performance 

// ENHANCED SKILL CARDS - Inspired by Flyhyer & EY Studio
function initAdvancedSkillCards() {
    // Enhanced Skill Cards
    initCardEffects('.skill-card', 'skill-card-orb');
    
    // Enhanced Certification Cards
    initCardEffects('.certification-card', 'cert-card-orb');
    
    // Add magnetic effect to section headings
    initMagneticHeadings();
    
    // Add parallax floating effects for both sections
    initParallaxEffects();
}

// Optimized card effects with reduced calculations
function initCardEffects(cardSelector, orbClass) {
    const cards = document.querySelectorAll(cardSelector);
    
    // If no cards or mobile device, abort to save resources
    if (cards.length === 0 || window.innerWidth < 768) return;
    
    // Limit processing to a maximum of 12 cards for performance
    const processedCards = Array.from(cards).slice(0, 12);
    
    // Create a single IntersectionObserver for better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                
                // Create orb element only once
                if (!card.querySelector(`.${orbClass}`)) {
                    setupCardAnimation(card, orbClass);
                }
                
                // Add mouse event listeners
                card.addEventListener('mouseenter', handleCardMouseEnter);
                card.addEventListener('mouseleave', handleCardMouseLeave);
                
                // Stop observing once initialized
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe each card
    processedCards.forEach(card => observer.observe(card));
    
    // Mouse move is throttled to improve performance
    let ticking = false;
    document.addEventListener('mousemove', function(e) {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                processedCards.forEach(card => {
                    if (card._isHovered) updateCardTilt(e, card);
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Optimized magnetic headings with reduced calculations
function initMagneticHeadings() {
    const headings = document.querySelectorAll('h2, h3');
    
    // Early exit on mobile devices
    if (window.innerWidth < 768) return;
    
    // Throttled mousemove handler to reduce calculations
    let ticking = false;
    
    document.addEventListener('mousemove', function(e) {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                headings.forEach(heading => {
                    const rect = heading.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    
                    // Only process headings that are near the cursor (optimization)
                    const distance = Math.sqrt(
                        Math.pow(e.clientX - centerX, 2) + 
                        Math.pow(e.clientY - centerY, 2)
                    );
                    
                    // Only apply effect if cursor is within 150px
                    if (distance < 150) {
                        const moveX = (e.clientX - centerX) * 0.1;
                        const moveY = (e.clientY - centerY) * 0.1;
                        
                        heading.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    } else if (heading.style.transform) {
                        heading.style.transform = 'translate(0, 0)';
                    }
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Optimized parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    // Early return if no elements or mobile device
    if (parallaxElements.length === 0 || window.innerWidth < 768) return;
    
    // Use requestAnimationFrame for smoother animations
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallaxPositions(lastScrollY, parallaxElements);
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Update parallax positions with optimized calculations
function updateParallaxPositions(scrollY, elements) {
    elements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.1;
        const offset = scrollY * speed;
        element.style.transform = `translateY(${offset}px)`;
    });
}

// Add CSS for orb effects
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .skill-card-orb, .cert-card-orb {
            position: absolute;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
            filter: blur(20px);
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            pointer-events: none;
            z-index: 1;
            transform: scale(0);
            mix-blend-mode: screen;
        }
        
        .skill-card-orb {
            width: 120px;
            height: 120px;
        }
        
        .cert-card-orb {
            width: 80px;
            height: 80px;
        }
        
        .skill-card, .certification-card {
            transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
            transform-style: preserve-3d;
            will-change: transform;
        }
        
        .skill-card > *, .certification-card > * {
            position: relative;
            z-index: 2;
        }
        
        /* Add custom animation for certification cards */
        .certification-card h3 {
            position: relative;
            display: inline-block;
        }
        
        .certification-card h3::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary-color);
            transition: width 0.3s ease;
        }
        
        .certification-card:hover h3::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
});

// Main initialization function - optimized version
function initEnhancedEffects() {
    try {
        // Add CSS for orb effects
        addOrbStyles();
        
        // Use delayed progressive initialization to prevent freezing
        // Initialize critical elements immediately
        setTimeout(() => {
            // Initialize only necessary components based on device
            if (window.matchMedia("(min-width: 1024px)").matches) {
                // For desktop: progressive initialization with delays
                setTimeout(() => initAdvancedSkillCards(), 100);
                setTimeout(() => initMagneticHeadings(), 500);
                setTimeout(() => initParallaxEffects(), 1000);
            } else {
                // For mobile: only initialize basic card animations
                initBasicCardAnimations();
            }
            
            // Log success
            console.log('✨ Enhanced UI effects initialized successfully');
        }, 300); // Small delay to let critical page elements render first
    } catch (error) {
        console.error('Error initializing enhanced effects:', error);
    }
}

// Simple mobile-friendly animations
function initBasicCardAnimations() {
    const cards = document.querySelectorAll('.skill-card, .certification-card');
    
    // Simple intersection observer for basic animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Add basic CSS
    const style = document.createElement('style');
    style.textContent = `
        .skill-card, .certification-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .animated {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Observe cards
    cards.forEach(card => observer.observe(card));
}

// Helper to add orb styles to document
function addOrbStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .skill-orb, .cert-orb {
            position: absolute;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(100, 255, 218, 0.3) 0%, rgba(100, 255, 218, 0) 70%);
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            pointer-events: none;
            z-index: 0;
        }
    `;
    document.head.appendChild(style);
}

// Call initialization on page load with event listener cleanup
let initialized = false;
function onDOMContentLoaded() {
    if (!initialized) {
        initialized = true;
        initEnhancedEffects();
        // Remove event listener after initialization
        document.removeEventListener('DOMContentLoaded', onDOMContentLoaded);
    }
}
document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

// Fallback initialization if DOMContentLoaded already fired
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    onDOMContentLoaded();
} 