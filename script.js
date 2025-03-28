/*
* Date: 12/03/2025 - 25/03/2025
* Author: Aniket Mishra
* Purpose: JavaScript functionality for portfolio website
* Copyright © 2025 Aniket Mishra. All rights reserved.
* This code may not be used without explicit permission and proper attribution.
*/

// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    // Safety wrapper to prevent script errors from breaking the page
    try {
        // Initialize the portfolio website with performance optimizations
        initPortfolio();
        
        // Ensure page is visible
        document.body.style.visibility = 'visible';
        
        // Ensure critical sections are visible
        ensureSectionsVisible();
        
        // Hide loading screen in case it wasn't already hidden
        setTimeout(() => {
            const loadingScreen = document.querySelector('.loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                loadingScreen.style.display = 'none';
            }
        }, 300);
    } catch (error) {
        console.error('Initialization error:', error);
        // Ensure content is visible even if there's an error
        document.body.style.visibility = 'visible';
        hideLoadingScreen();
        ensureSectionsVisible();
    }
});

// Initialize the portfolio website with performance optimizations
(function() {
    try {
        // Show content immediately
        document.body.style.opacity = 1;
        
        // Initialize core functionality first
        initTheme();
        
        // Defer particle initialization which is resource-intensive
        requestIdleCallback(() => {
            initParticles();
        }, { timeout: 1000 });
        
        // Initialize visible UI elements
        initMobileNav();
        initScrollProgress();
        
        // Use requestAnimationFrame for smoother loading
        requestAnimationFrame(() => {
            // Initialize UI enhancements with staggered timing
            setTimeout(() => {
                initSkillBars();
            }, 200);
            
            setTimeout(() => {
                initEventListeners();
            }, 500);
            
            // Any additional non-critical initializations
            console.log("Portfolio fully initialized!");
        });
    } catch (error) {
        console.error("Initialization error:", error);
        // Make sure the page is still visible even if initialization fails
        document.body.style.opacity = 1;
    }
})();

// Initialize theme based on stored preference or system preference
function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme');
    
    // Apply stored theme preference or use system preference
    if (storedTheme) {
        document.body.setAttribute('data-theme', storedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.body.setAttribute('data-theme', 'light');
    }
    
    // Ensure the bulb icon has the right state initially
    if (themeToggleBtn) {
        // Apply initial animation based on current theme
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        if (currentTheme === 'light') {
            themeToggleBtn.style.opacity = '0';
            setTimeout(() => {
                themeToggleBtn.style.opacity = '1';
            }, 300);
        }
    }
    
    // Update particle colors based on theme
    updateParticleColors();
    
    // Add theme toggle button functionality
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
}

// Toggle between light and dark themes
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Add animation effect for the toggle button
    if (themeToggleBtn) {
        themeToggleBtn.classList.add('theme-transitioning');
        
        // Flash effect for bulb turning on/off
        if (newTheme === 'light') {
            // Turning on animation
            themeToggleBtn.animate([
                { transform: 'scale(1)', opacity: 0.7 },
                { transform: 'scale(1.2)', opacity: 1 },
                { transform: 'scale(1)', opacity: 1 }
            ], {
                duration: 300,
                easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
            });
        } else {
            // Turning off animation
            themeToggleBtn.animate([
                { filter: 'brightness(1)', opacity: 1 },
                { filter: 'brightness(1.3)', opacity: 0.9 },
                { filter: 'brightness(0.7)', opacity: 0.8 }
            ], {
                duration: 300,
                easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)'
            });
        }
        
        // Remove transition class after animation completes
        setTimeout(() => {
            themeToggleBtn.classList.remove('theme-transitioning');
        }, 350);
    }
    
    // Apply new theme
    document.body.setAttribute('data-theme', newTheme);
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
    
    // Update particle colors
    updateParticleColors();
}

// Initialize particles.js with optimized configuration for better performance
function initParticles() {
    if (!window.particlesJS) {
        console.error('particles.js not loaded!');
        return;
    }

    try {
        // Check device capabilities for appropriate optimization
        const isLowEndDevice = window.navigator.hardwareConcurrency <= 4 || 
                             !window.matchMedia("(min-width: 768px)").matches;
        
        // Configure particles based on device capability
        const isDarkTheme = document.body.getAttribute('data-theme') !== 'light';
        const particleColor = isDarkTheme ? "#64ffda" : "#0a192f";
        
        // Device-specific configurations
        let particleConfig;
        
        if (isLowEndDevice) {
            // Ultra-light configuration for mobile/low-end devices
            particleConfig = {
                "particles": {
                    "number": {
                        "value": 15, // Very few particles
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": particleColor
                    },
                    "shape": {
                        "type": "circle"
                    },
                    "opacity": {
                        "value": 0.3,
                        "random": false
                    },
                    "size": {
                        "value": 2,
                        "random": true,
                        "anim": {
                            "enable": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": particleColor,
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 1,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": false
                        },
                        "onclick": {
                            "enable": false
                        },
                        "resize": true
                    }
                },
                "retina_detect": false
            };
        } else {
            // Standard configuration for better devices
            particleConfig = {
                "particles": {
                    "number": {
                        "value": 30,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": particleColor
                    },
                    "shape": {
                        "type": "circle"
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": particleColor,
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 2,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": false
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 0.8
                            }
                        }
                    }
                },
                "retina_detect": true
            };
        }
        
        // Initialize particles with optimized configuration
        particlesJS('particles-js', particleConfig);
        
        // Store the current theme to detect changes
        window.currentParticleTheme = isDarkTheme ? 'dark' : 'light';
        
    } catch (error) {
        console.error('Particles initialization error:', error);
        
        // Hide particles container on error to prevent visual issues
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.style.display = 'none';
        }
    }
}

// Update particle colors when theme changes
function updateParticleColors() {
    const isDarkTheme = document.body.getAttribute('data-theme') !== 'light';
    const newTheme = isDarkTheme ? 'dark' : 'light';
    
    // Only reinitialize if theme actually changed
    if (window.currentParticleTheme !== newTheme) {
        window.currentParticleTheme = newTheme;
        
        // Defer reinitialization to prevent UI blocking
        setTimeout(() => {
            initParticles();
        }, 100);
    }
}

// Initialize event listeners for interactive elements
function initEventListeners() {
    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const mobileNav = document.querySelector('.mobile-nav');
                const hamburger = document.querySelector('.hamburger');
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
    
    // Add photo gallery modal functionality
    initGalleryModal();
    
    // Initialize custom cursor follower
    initCursorFollower();
}

// Initialize skill progress bars with performance optimizations
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    if (!skillBars.length) return;
    
    // Create a single observer for all skill bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the progress bar and progress value
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                const progressBar = bar.querySelector('.progress');
                
                // Set initial width to 0
                progressBar.style.width = '0%';
                
                // Schedule animation in next animation frame for better performance
                requestAnimationFrame(() => {
                    // Add transition in a separate animation frame to ensure it applies
                    progressBar.style.transition = 'width 0.8s ease-out';
                    
                    // Slight delay before animating to ensure transition is applied
                    setTimeout(() => {
                        progressBar.style.width = `${progress}%`;
                    }, 50);
                });
                
                // Stop observing after animation starts
                observer.unobserve(bar);
            }
        });
    }, { 
        threshold: 0.1, // Lower threshold for earlier triggering
        rootMargin: '20px' // Slightly expand the intersection area
    });
    
    // Process skill bars in batches for better performance
    let index = 0;
    const batchSize = 5; // Process 5 bars at a time
    
    function processBatch() {
        const currentBatch = Array.from(skillBars).slice(index, index + batchSize);
        if (currentBatch.length === 0) return;
        
        // Process current batch
        currentBatch.forEach(bar => {
            // Initially set to 0 width
            const progressBar = bar.querySelector('.progress');
            progressBar.style.width = '0%';
            
            // Start observing
        observer.observe(bar);
    });
        
        // Schedule next batch
        index += batchSize;
        if (index < skillBars.length) {
            setTimeout(processBatch, 100);
        }
    }
    
    // Start processing in batches
    processBatch();
}

// Mobile navigation functionality
function initMobileNav() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const hamburger = document.querySelector('.hamburger');
    
    if (mobileNavToggle && mobileNav && hamburger) {
        mobileNavToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

// Initialize scroll progress indicator
function initScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
        });
    }
}

// Initialize custom cursor follower
function initCursorFollower() {
    // Only initialize on devices that support hover
    if (window.matchMedia('(hover: hover)').matches) {
        const cursor = document.querySelector('.cursor-follower');
        
        if (cursor) {
            // Make cursor visible
            cursor.style.display = 'block';
            
            // Use requestAnimationFrame for smoother cursor movement
            document.addEventListener('mousemove', (e) => {
                requestAnimationFrame(() => {
                    // Position directly follows mouse pointer
                    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
                });
            });
            
            // Add active class when hovering over interactive elements
            const interactives = document.querySelectorAll('a, button, .gallery-item, input, .skill-card');
            interactives.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    cursor.style.width = '30px';
                    cursor.style.height = '30px';
                    cursor.style.opacity = '0.9';
                });
                
                item.addEventListener('mouseleave', () => {
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
        }
    }
}

// Initialize gallery modal for portfolio items
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            try {
                // If the click was on or inside a project-link, don't create modal
                if (e.target.classList.contains('project-link') || e.target.closest('.project-link')) {
                    return; // Let the default link behavior happen
                }
                
                const imgSrc = this.querySelector('img').src;
                const caption = this.querySelector('h3').innerText;
                
                // Create modal
                const modal = document.createElement('div');
                modal.className = 'gallery-modal';
                
                // Create modal content
                const modalContent = document.createElement('div');
                modalContent.className = 'modal-content';
                
                // Create image
                const img = document.createElement('img');
                img.src = imgSrc;
                img.alt = caption;
                
                // Create close button
                const closeBtn = document.createElement('span');
                closeBtn.className = 'close-modal';
                closeBtn.innerHTML = '&times;';
                closeBtn.addEventListener('click', function() {
                    modal.remove();
                });
                
                // Assemble modal
                modalContent.appendChild(img);
                modalContent.appendChild(closeBtn);
                modal.appendChild(modalContent);
                document.body.appendChild(modal);
                
                // Close modal on click outside content
                modal.addEventListener('click', function(e) {
                    if (e.target === modal) {
                        modal.remove();
                    }
                });
                
                // Close modal on escape key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        modal.remove();
                    }
                });
            } catch (error) {
                console.error('Error creating modal:', error);
            }
        });
    });
}

// Helper function to hide loading screen
function hideLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 300);
    }
}

// Ensure critical sections are visible
function ensureSectionsVisible() {
    ['skills', 'education', 'certifications', 'experience'].forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.style.visibility = 'visible';
            section.style.opacity = '1';
            section.style.display = 'block';
            section.style.zIndex = '10';
            
            // Ensure grid layouts have correct display
            const grids = section.querySelectorAll('.skills-grid, .certifications-grid, .timeline');
            grids.forEach(grid => {
                grid.style.display = 'grid';
                grid.style.visibility = 'visible';
                grid.style.opacity = '1';
            });
        }
    });
}

// Polyfill for requestIdleCallback for browsers that don't support it
window.requestIdleCallback = window.requestIdleCallback || 
    function(callback, options) {
        const start = Date.now();
        return setTimeout(function() {
            callback({
                didTimeout: false,
                timeRemaining: function() {
                    return Math.max(0, 50 - (Date.now() - start));
                }
            });
        }, options?.timeout || 1);
    };

// Initialize the portfolio website with sequential loading for better performance
function initPortfolio() {
    // First, ensure critical UI is responsive
    initTheme();
    
    // Show main content immediately
    document.body.style.opacity = 1;
    
    // Progressively load features based on priority
    const initSequence = [
        // Essential UI first
        { fn: initMobileNav, delay: 0 },
        { fn: initScrollProgress, delay: 100 },
        
        // Content enhancements
        { fn: initSkillBars, delay: 300 },
        
        // Non-critical visual effects last
        { fn: initEventListeners, delay: 500 },
        { fn: initParticles, delay: 800 }
    ];
    
    // Execute initialization sequence
    initSequence.forEach(task => {
        setTimeout(() => {
            try {
                task.fn();
            } catch (error) {
                console.warn(`Error initializing ${task.fn.name}:`, error);
            }
        }, task.delay);
    });
}
