/*
* Date: 24/03/2025
* Author: Aniket Mishra
* Purpose: Interactive functionality for portfolio website
* Copyright © 2025 Aniket Mishra. All rights reserved.
* This code may not be used without explicit permission and proper attribution.
*/

// Theme toggle functionality
// Manages switching between light and dark modes with localStorage persistence
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme in localStorage
// Applies previously selected theme on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    updateToggleText();
}

// Theme toggle event
// Changes theme and updates related UI elements when button is clicked
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleText();
    
    // Reinitialize particles with new theme
    setTimeout(() => {
        initParticles();
    }, 300);
});

// Updates button text based on current theme
// Ensures button always shows the opposite theme as an option
function updateToggleText() {
    const currentTheme = body.getAttribute('data-theme');
    themeToggle.textContent = currentTheme === 'light' ? 'Dark Mode' : 'Light Mode';
}

// Scroll animations
// Intersection Observer setup to trigger animations when elements come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Apply observer to all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(section => {
    observer.observe(section);
});

// Scroll Progress Bar
// Creates and manages a progress indicator at the top of the page
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

// Update scroll progress bar width based on scroll position
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
});

// Typing Effect
// Creates a typewriter animation for text elements
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect for intro text
// Applies animation to the main introduction paragraph
const introText = document.querySelector('.intro-text');
if (introText) {
    setTimeout(() => {
        typeWriter(introText, introText.getAttribute('data-text'));
    }, 2500); // Delay to wait for loading screen to disappear
}

// Initialize typing effect for profile description
// Applies animation to the job title/description in the side panel
const typingText = document.querySelector('.typing-text');
if (typingText) {
    setTimeout(() => {
        typeWriter(typingText, typingText.getAttribute('data-text'), 60);
    }, 3000); // Further delay after intro text
}

// Skill Progress Animation
// Manages the animated skill level indicators
const skillBars = document.querySelectorAll('.skill-progress-bar');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-progress');
        bar.style.width = targetWidth + '%';
    });
};

// Animate skills when they come into view
// Uses Intersection Observer to trigger skill bar animations
const skillsSection = document.querySelector('.skills-grid');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    skillsObserver.observe(skillsSection);
}

// Smooth Scroll for Navigation Links
// Adds smooth scrolling behavior to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Use locomotive scroll if available
            if (typeof scroll !== 'undefined') {
                scroll.scrollTo(target);
            } else {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Initialize particles with current theme
// Setup for the interactive background particles
initParticles();

// Function to initialize particles based on current theme
// Creates and configures the particle background effect
function initParticles() {
    const currentTheme = body.getAttribute('data-theme');
    const particleColor = currentTheme === 'light' ? '#0a192f' : '#64ffda';
    const particleOpacity = currentTheme === 'light' ? 0.2 : 0.5;
    const linkOpacity = currentTheme === 'light' ? 0.2 : 0.4;
    
    // Clear existing particles
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window['pJSDom'] = [];
    }
    
    // Initialize particles with theme-appropriate settings
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: particleColor
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: particleOpacity,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: particleColor,
                opacity: linkOpacity,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
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
    });
}

// Photo Gallery Modal
// Creates and manages lightbox functionality for portfolio images
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Get image data from the clicked item
        const img = item.querySelector('img');
        
        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="close-modal">&times;</div>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;
        document.body.appendChild(modal);

        // Disable scrolling on body when modal is open
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation with GSAP if available
        if (typeof gsap !== 'undefined') {
            gsap.from(modal, {
                opacity: 0,
                scale: 0.9,
                duration: 0.4,
                ease: "power2.out"
            });
        }

        // Close modal functionality
        const closeModal = () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(modal, {
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.3,
                    ease: "power2.in",
                    onComplete: () => {
                        modal.remove();
                        document.body.style.overflow = '';
                    }
                });
            } else {
                modal.style.opacity = '0';
                setTimeout(() => {
                    modal.remove();
                    document.body.style.overflow = '';
                }, 300);
            }
        };

        // Event listeners for closing the modal
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function modalKeydown(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', modalKeydown);
            }
        });
    });
});
