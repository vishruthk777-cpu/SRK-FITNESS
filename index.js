/**
 * SRK Fitness Club - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Sticky Header on Scroll
    ========================================= */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Check initial scroll position
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    /* =========================================
       Mobile Navigation Menu
    ========================================= */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        // Change menu icon based on state
        const icon = mobileMenuBtn.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    /* =========================================
       Smooth Scrolling for Anchor Links
    ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust scroll position for fixed header
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /* =========================================
       Active Navigation Tracking
    ========================================= */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Offset for header
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
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

    /* =========================================
       Gallery Lightbox Functionality
    ========================================= */
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryItems = document.querySelectorAll('.lightbox-trigger');

    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('href');
            lightboxImg.src = imgSrc;
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling when open
        });
    });

    // Close Lightbox functions
    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    if(lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    // Close if clicking outside the image
    window.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightbox();
        }
    });

    /* =========================================
       Contact Form Submission
    ========================================= */
    const contactForm = document.getElementById('contactForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent page reload/hanging
            
            // Simulate form submission delay
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Show success message
                formSuccessMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Restore button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccessMessage.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    /* =========================================
       Scroll Reveal Animations
    ========================================= */
    const revealElements = document.querySelectorAll('.section-title, .program-card, .about-image, .about-content, .gallery-item, .review-card, .info-item, .contact-form-container, .facility-card, .transform-card');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => {
            el.classList.add('reveal-hidden');
            revealObserver.observe(el);
        });
    } else {
        revealElements.forEach(el => el.classList.add('revealed'));
    }

});
