/*
* Date: 24/03/2025
* Author: Aniket Mishra
* Purpose: Enhanced animations and interactions for portfolio website
* Copyright © 2025 Aniket Mishra. All rights reserved.
* This code may not be used without explicit permission and proper attribution.
* 
* Inspired by studio.ca.ey.com and flyhyer.com
*/

// Wait for DOM to load before initializing animations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Hide loading screen after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Initialize AOS animations after loading screen disappears
            AOS.init({
                duration: 800,
                easing: 'ease-out',
                once: false,
                mirror: true
            });
        }, 1500);
    });
    
    // Initialize smooth scrolling with Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        smartphone: {
            smooth: true
        },
        tablet: {
            smooth: true
        }
    });
    
    // Initialize GSAP animations
    initGSAPAnimations();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Track scroll progress
    trackScrollProgress();
});

// Initialize GSAP animations
function initGSAPAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate headings on scroll
    gsap.utils.toArray('h2').forEach(heading => {
        gsap.from(heading, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: heading,
                start: "top 80%"
            }
        });
    });
    
    // Stagger skill cards
    gsap.utils.toArray('.skill-card').forEach((card, index) => {
        gsap.from(card, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%"
            }
        });
    });
    
    // Text reveal animation for section paragraphs
    gsap.utils.toArray('section > p').forEach(para => {
        gsap.from(para, {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: para,
                start: "top 85%"
            }
        });
    });
}

// Custom cursor that follows mouse pointer
function initCustomCursor() {
    const cursor = document.querySelector('.cursor-follower');
    
    // Only initialize on non-touch devices
    if (window.matchMedia("(hover: hover)").matches) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
        });
        
        // Enlarge cursor when hovering over links and buttons
        const interactiveElements = document.querySelectorAll('a, button, .gallery-item, .skill-card, .certification-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    }
}

// Mobile navigation functionality
function initMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Toggle mobile navigation
    mobileNavToggle.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });
    
    // Close navigation when link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
}

// Track scroll progress for the scroll indicator
function trackScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    });
}

// Parallax effect for gallery images
document.addEventListener('mousemove', (e) => {
    const gallery = document.querySelector('.photo-gallery');
    
    if (gallery && window.innerWidth > 768) {
        const galleryItems = document.querySelectorAll('.gallery-item-inner');
        
        galleryItems.forEach(item => {
            const moving = item.querySelector('img');
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            gsap.to(moving, {
                x: x,
                y: y,
                duration: 1,
                ease: "power2.out"
            });
        });
    }
}); 