/*
* Date: 24/03/2025
* Author: Aniket Mishra
* Purpose: Main JavaScript functionality for portfolio website
* Copyright Â© 2025 Aniket Mishra. All rights reserved.
* This code may not be used without explicit permission and proper attribution.
*/

// Wait for the DOM to be fully loaded before executing
document.addEventListener('DOMContentLoaded', function() {
    // Safety wrapper to prevent script errors from breaking the page
    try {
        // Initialize theme
        initTheme();
        
        // Initialize particle background
        initParticles();
        
        // Event listeners for interactive elements
        initEventListeners();
        
        // Initialize skill progress bars
        initSkillBars();
        
        // Mobile navigation setup
        initMobileNav();
        
        // Initialize scroll progress indicator
        initScrollProgress();
        
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

// Initialize particles.js with advanced configuration
function initParticles() {
    if (window.particlesJS) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#64ffda"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#64ffda",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
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
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
}

// Initialize particles.js with premium configuration inspired by Flyhyer and EY Studio
function initParticles() {
    if (window.particlesJS) {
        try {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 100,
                        "density": {
                            "enable": true,
                            "value_area": 1000
                        }
                    },
                    "color": {
                        "value": ["#64ffda", "#8892b0", "#3a506b"]
                    },
                    "shape": {
                        "type": ["circle", "triangle", "polygon"],
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 6
                        }
                    },
                    "opacity": {
                        "value": 0.3,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 0.8,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 4,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0.5,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#64ffda",
                        "opacity": 0.2,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 1.5,
                        "direction": "none",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": true,
                            "rotateX": 600,
                            "rotateY": 1200
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
                            "enable": true,
                            "mode": "repulse"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 180,
                            "line_linked": {
                                "opacity": 0.4
                            }
                        },
                        "bubble": {
                            "distance": 200,
                            "size": 6,
                            "duration": 2,
                            "opacity": 0.8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 1.5
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true,
                "config_demo": {
                    "hide_card": false,
                    "background_color": "#0a192f",
                    "background_image": "",
                    "background_position": "50% 50%",
                    "background_repeat": "no-repeat",
                    "background_size": "cover"
                }
            });
            
            // Add a mutation observer to update particles when theme changes
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'data-theme') {
                        // Update particle colors based on theme
                        if (document.body.getAttribute('data-theme') === 'light') {
                            window.pJSDom[0].pJS.particles.color.value = ['#0a192f', '#4a5568', '#1a202c'];
                            window.pJSDom[0].pJS.particles.line_linked.color = '#0a192f';
                        } else {
                            window.pJSDom[0].pJS.particles.color.value = ['#64ffda', '#8892b0', '#3a506b'];
                            window.pJSDom[0].pJS.particles.line_linked.color = '#64ffda';
                        }
                        
                        // Refresh particles
                        window.pJSDom[0].pJS.fn.particlesRefresh();
                    }
                });
            });
            
            // Start observing the body element for data-theme attribute changes
            observer.observe(document.body, { attributes: true });
        } catch (error) {
            console.warn('Error initializing particles:', error);
        }
    }
}

// Update particle colors based on current theme
function updateParticleColors() {
    if (typeof particlesJS !== 'undefined') {
        try {
            particlesJS('particles-js', getParticlesConfig());
        } catch (error) {
            console.warn('Error updating particles:', error);
        }
    }
}

// Get particles.js configuration based on current theme
function getParticlesConfig() {
    const isLightTheme = document.body.getAttribute('data-theme') === 'light';
    const particleColor = isLightTheme ? '#0a192f' : '#64ffda';
    const particleOpacity = isLightTheme ? 0.2 : 0.5;
    
    return {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: particleColor
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: particleOpacity,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: particleColor,
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    };
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

// Initialize progress bar animations for skill levels
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.getAttribute('data-progress');
                if (progress) {
                    bar.style.width = `${progress}%`;
                }
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => {
        // Reset width to 0 for animation
        bar.style.width = '0%';
        observer.observe(bar);
    });
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
            document.addEventListener('mousemove', (e) => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            });
            
            // Add active class when hovering over links or buttons
            const interactives = document.querySelectorAll('a, button, .gallery-item, input');
            interactives.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                    cursor.style.mixBlendMode = 'difference';
                });
                
                item.addEventListener('mouseleave', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursor.style.mixBlendMode = 'difference';
                });
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
        }
    });
}
