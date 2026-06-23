/* ============================================
   CV - MOHAMMAD ABDUWLOH
   Donghua Theme Interactive Animations
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initScrollAnimations();
    initTypingEffect();
    initInteractiveElements();
    initFloatingElements();
});

/* ============================================
   Particle System - Spiritual Energy Effect
   ============================================ */
function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.id = 'particles';
    document.body.appendChild(particleContainer);

    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer, particles);
    }

    // Animate particles
    function animateParticles() {
        particles.forEach((particle, index) => {
            particle.y += particle.speedY;
            particle.x += particle.speedX;
            particle.opacity -= particle.fadeSpeed;

            // Reset particle when it fades out
            if (particle.opacity <= 0 || particle.y > window.innerHeight) {
                resetParticle(particle);
            }

            // Update particle position
            particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
            particle.element.style.opacity = particle.opacity;
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

function createParticle(container, particles) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const speedY = Math.random() * 0.5 + 0.2;
    const speedX = (Math.random() - 0.5) * 0.5;
    const opacity = Math.random() * 0.5 + 0.3;
    const fadeSpeed = Math.random() * 0.002 + 0.001;
    const hue = Math.random() > 0.5 ? '45' : '35'; // Gold variations

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, hsla(${hue}, 70%, 60%, ${opacity}) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 ${size * 2}px hsla(${hue}, 70%, 60%, ${opacity * 0.5});
    `;

    container.appendChild(particle);

    particles.push({
        element: particle,
        x: startX,
        y: startY,
        speedY: speedY,
        speedX: speedX,
        opacity: opacity,
        fadeSpeed: fadeSpeed
    });
}

function resetParticle(particle) {
    particle.x = Math.random() * window.innerWidth;
    particle.y = -10;
    particle.opacity = Math.random() * 0.5 + 0.3;
    particle.speedY = Math.random() * 0.5 + 0.2;
    particle.speedX = (Math.random() - 0.5) * 0.5;
}

/* ============================================
   Scroll Animations - Cultivation Ascension
   ============================================ */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add special effect for education items
                if (entry.target.classList.contains('education-item')) {
                    createAscensionEffect(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });

    // Observe education items
    document.querySelectorAll('.education-item').forEach(item => {
        item.classList.add('animate-on-scroll');
        observer.observe(item);
    });

    // Observe skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.classList.add('animate-on-scroll');
        observer.observe(item);
    });
}

function createAscensionEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Create ascending light particles
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createAscendingParticle(centerX, centerY);
        }, i * 100);
    }
}

function createAscendingParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(212, 168, 83, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        box-shadow: 0 0 10px rgba(212, 168, 83, 0.6);
    `;

    document.body.appendChild(particle);

    const duration = 1000;
    const startTime = Date.now();
    const startY = y;
    const endY = y - 100;

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress < 1) {
            const currentY = startY + (endY - startY) * progress;
            const opacity = 1 - progress;
            const scale = 1 + progress * 0.5;

            particle.style.top = `${currentY}px`;
            particle.style.opacity = opacity;
            particle.style.transform = `scale(${scale})`;

            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }

    animate();
}

/* ============================================
   Typing Effect for Title
   ============================================ */
function initTypingEffect() {
    const titleElement = document.querySelector('.title');
    if (!titleElement) return;

    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    titleElement.style.opacity = '1';

    let charIndex = 0;
    const typingSpeed = 100;

    function typeChar() {
        if (charIndex < originalText.length) {
            titleElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, typingSpeed);
        }
    }

    // Start typing after a delay
    setTimeout(typeChar, 1500);
}

/* ============================================
   Interactive Elements - Qi Energy
   ============================================ */
function initInteractiveElements() {
    // Add ripple effect to education items
    document.querySelectorAll('.education-item').forEach(item => {
        item.addEventListener('mouseenter', function(e) {
            createRipple(e, this);
        });
    });

    // Add glow effect to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.animation = 'pulseGlow 1s ease-in-out infinite';
        });

        item.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });

    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const clouds = document.querySelector('.clouds');
        const mountain = document.querySelector('.mountain-bg');

        if (clouds) {
            clouds.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        if (mountain) {
            mountain.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Add click effect to avatar
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('click', function() {
            createBurstEffect(this);
        });

        avatar.style.cursor = 'pointer';
    }
}

function createRipple(event, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(212, 168, 83, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        animation: rippleEffect 0.6s ease-out;
    `;

    element.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

function createBurstEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const particle = document.createElement('div');
        
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, rgba(240, 215, 140, 0.9) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            box-shadow: 0 0 15px rgba(212, 168, 83, 0.8);
        `;

        document.body.appendChild(particle);

        const distance = 100;
        const duration = 800;
        const startTime = Date.now();
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;

        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;

            if (progress < 1) {
                const currentX = centerX + (endX - centerX) * progress;
                const currentY = centerY + (endY - centerY) * progress;
                const opacity = 1 - progress;
                const scale = 1 - progress * 0.5;

                particle.style.left = `${currentX}px`;
                particle.style.top = `${currentY}px`;
                particle.style.opacity = opacity;
                particle.style.transform = `scale(${scale})`;

                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }

        animate();
    }
}

/* ============================================
   Floating Elements - Spiritual Aura
   ============================================ */
function initFloatingElements() {
    // Create floating symbols around the avatar
    const avatarContainer = document.querySelector('.avatar-container');
    if (!avatarContainer) return;

    const symbols = ['✦', '◆', '◇', '○', '★'];
    const floatingElements = [];

    for (let i = 0; i < 6; i++) {
        const element = document.createElement('div');
        element.className = 'floating-symbol';
        element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        const angle = (i / 6) * Math.PI * 2;
        const radius = 120;
        const duration = 4000 + Math.random() * 2000;
        const delay = i * 200;

        element.style.cssText = `
            position: absolute;
            color: rgba(212, 168, 83, 0.6);
            font-size: ${Math.random() * 10 + 15}px;
            pointer-events: none;
            animation: floatAround ${duration}ms ease-in-out ${delay}ms infinite;
            text-shadow: 0 0 10px rgba(212, 168, 83, 0.4);
        `;

        avatarContainer.appendChild(element);
        floatingElements.push({ element, angle, radius, duration });
    }

    // Add dynamic floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatAround {
            0%, 100% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0.3;
            }
            25% {
                transform: translate(10px, -15px) rotate(90deg);
                opacity: 0.7;
            }
            50% {
                transform: translate(0, -20px) rotate(180deg);
                opacity: 0.5;
            }
            75% {
                transform: translate(-10px, -15px) rotate(270deg);
                opacity: 0.7;
            }
        }

        @keyframes rippleEffect {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }

        .particle-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            overflow: hidden;
        }

        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .section.visible {
            animation: fadeInUp 0.8s ease-out;
        }

        .education-item.visible {
            animation: slideInLeft 0.6s ease-out;
        }

        .skill-item.visible {
            animation: scaleIn 0.5s ease-out;
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
    `;

    document.head.appendChild(style);
}

/* ============================================
   Smooth Scroll for Navigation
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ============================================
   Cursor Trail Effect - Qi Trail
   ============================================ */
let cursorTrailEnabled = true;
const trailElements = [];
const maxTrailLength = 10;

document.addEventListener('mousemove', function(e) {
    if (!cursorTrailEnabled) return;

    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 6px;
        height: 6px;
        background: radial-gradient(circle, rgba(212, 168, 83, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        box-shadow: 0 0 8px rgba(212, 168, 83, 0.4);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(trail);
    trailElements.push(trail);

    // Remove old trail elements
    if (trailElements.length > maxTrailLength) {
        const oldTrail = trailElements.shift();
        oldTrail.style.opacity = '0';
        setTimeout(() => oldTrail.remove(), 300);
    }

    // Fade out trail
    setTimeout(() => {
        trail.style.opacity = '0';
        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
            const index = trailElements.indexOf(trail);
            if (index > -1) {
                trailElements.splice(index, 1);
            }
        }, 300);
    }, 100);
});

// Disable cursor trail on mobile
if ('ontouchstart' in window) {
    cursorTrailEnabled = false;
}

/* ============================================
   Performance Optimization
   ============================================ */
// Throttle scroll events
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            // Scroll-based animations are handled here
            ticking = false;
        });
        ticking = true;
    }
});

// Reduce animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});

/* ============================================
   Console Easter Egg
   ============================================ */
console.log('%c✨ Welcome, Cultivator! ✨', 'color: #d4a853; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #d4a853;');
console.log('%cThis CV was forged with the spirit of Donghua', 'color: #f0d78c; font-size: 14px;');
console.log('%cMOHAMMAD ABDUWLOH - On the path to greatness', 'color: #d4a853; font-size: 12px;');