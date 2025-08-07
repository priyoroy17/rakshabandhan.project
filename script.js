/**
 * Raksha Bandhan Website Interactive JavaScript
 * Premium experience with smooth animations and particle effects
 */

class RakshaBandhanExperience {
    constructor() {
        this.isRevealed = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupInitialState();
        this.createParticleSystem();
    }

    bindEvents() {
        const rakhiButton = document.getElementById('rakhiThread');
        if (rakhiButton) {
            rakhiButton.addEventListener('click', this.handleRakhiClick.bind(this));
            rakhiButton.addEventListener('mouseenter', this.handleButtonHover.bind(this));
            rakhiButton.addEventListener('mouseleave', this.handleButtonLeave.bind(this));
        }

        // Add scroll listener for additional animations
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Add resize listener for responsive particles
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    setupInitialState() {
        const contentSection = document.getElementById('contentSection');
        if (contentSection) {
            contentSection.style.display = 'none';
            contentSection.classList.add('hidden');
        }

        // Add initial animation classes to quotes
        const quoteItems = document.querySelectorAll('.quote-item');
        quoteItems.forEach(item => {
            item.classList.add('quote-hidden');
        });

        // Add initial state to image
        const imageContainer = document.querySelector('.image-container');
        if (imageContainer) {
            imageContainer.classList.add('image-hidden');
        }
    }

    handleRakhiClick(event) {
        if (this.isRevealed) return;

        event.preventDefault();
        this.isRevealed = true;

        // Add clicked state to button
        const rakhiButton = event.currentTarget;
        rakhiButton.classList.add('clicked');
        rakhiButton.style.pointerEvents = 'none';

        // Start the reveal sequence
        this.startRevealSequence();
    }

    handleButtonHover(event) {
        if (this.isRevealed) return;

        const button = event.currentTarget;
        button.classList.add('hover-glow');

        // Add extra bounce animation
        this.addBounceEffect(button);
    }

    handleButtonLeave(event) {
        if (this.isRevealed) return;

        const button = event.currentTarget;
        button.classList.remove('hover-glow');
    }

    addBounceEffect(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'gentleBounce 3s ease-in-out infinite, extraBounce 0.6s ease-out';
        }, 10);
    }

    startRevealSequence() {
        // Phase 1: Curtain effect and show content
        this.createCurtainEffect(() => {
            this.revealContent();
        });
    }

    createCurtainEffect(callback) {
        // Create curtain overlay
        const curtain = document.createElement('div');
        curtain.className = 'curtain-overlay';
        curtain.innerHTML = `
      <div class="curtain-left"></div>
      <div class="curtain-right"></div>
    `;

        document.body.appendChild(curtain);

        // Animate curtains opening
        setTimeout(() => {
            const leftCurtain = curtain.querySelector('.curtain-left');
            const rightCurtain = curtain.querySelector('.curtain-right');

            leftCurtain.style.transform = 'translateX(-100%)';
            rightCurtain.style.transform = 'translateX(100%)';

            // Remove curtain after animation
            setTimeout(() => {
                curtain.remove();
                callback();
            }, 1000);
        }, 100);
    }

    revealContent() {
        const contentSection = document.getElementById('contentSection');
        if (!contentSection) return;

        // Show and animate content section
        contentSection.style.display = 'block';
        contentSection.classList.remove('hidden');

        setTimeout(() => {
            contentSection.classList.add('revealed');
            this.animateContentElements();
            this.createHeartParticles();
        }, 100);

        // Smooth scroll to content
        setTimeout(() => {
            contentSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 500);
    }

    animateContentElements() {
        // Animate image with delay
        setTimeout(() => {
            const imageContainer = document.querySelector('.image-container');
            if (imageContainer) {
                imageContainer.classList.add('image-revealed');
                imageContainer.classList.remove('image-hidden');
            }
        }, 300);

        // Animate quotes with staggered delay
        const quoteItems = document.querySelectorAll('.quote-item');
        quoteItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('quote-revealed');
                item.classList.remove('quote-hidden');

                // Add extra sparkle effect
                this.addSparkleEffect(item);
            }, 600 + (index * 200));
        });

        // Animate story paragraph
        setTimeout(() => {
            const storyParagraph = document.querySelector('.story-paragraph');
            if (storyParagraph) {
                storyParagraph.classList.add('story-revealed');
            }
        }, 400);
    }

    addSparkleEffect(element) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle-effect';
        sparkle.innerHTML = '✨';

        element.style.position = 'relative';
        element.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }

    createHeartParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'heart-particles';
        document.body.appendChild(particleContainer);

        const heartEmojis = ['💖', '🌸', '🌺', '💕', '🌼', '💐'];

        // Create multiple heart particles
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                this.createSingleHeart(particleContainer, heartEmojis);
            }, i * 200);
        }

        // Remove particle container after animation
        setTimeout(() => {
            particleContainer.remove();
        }, 8000);
    }

    createSingleHeart(container, emojis) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        // Random starting position
        const startX = Math.random() * window.innerWidth;
        const endX = startX + (Math.random() - 0.5) * 200;
        const duration = 3000 + Math.random() * 2000;

        heart.style.left = startX + 'px';
        heart.style.bottom = '0px';

        container.appendChild(heart);

        // Animate heart
        heart.animate([
            {
                transform: 'translateY(0) scale(0) rotate(0deg)',
                opacity: 0
            },
            {
                transform: 'translateY(-50px) scale(1) rotate(180deg)',
                opacity: 1,
                offset: 0.1
            },
            {
                transform: `translateY(-${window.innerHeight}px) translateX(${endX - startX}px) scale(0.5) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        // Remove heart after animation
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, duration);
    }

    createParticleSystem() {
        // Create ambient floating petals
        const ambientContainer = document.createElement('div');
        ambientContainer.className = 'ambient-particles';
        document.body.appendChild(ambientContainer);

        // Continuously create subtle floating particles
        setInterval(() => {
            if (!this.isRevealed && Math.random() > 0.7) {
                this.createAmbientPetal(ambientContainer);
            }
        }, 3000);
    }

    createAmbientPetal(container) {
        const petal = document.createElement('div');
        petal.className = 'ambient-petal';

        const side = Math.random() > 0.5 ? 'left' : 'right';
        const size = 6 + Math.random() * 8;

        petal.style.width = size + 'px';
        petal.style.height = size + 'px';
        petal.style[side] = '-10px';
        petal.style.top = Math.random() * window.innerHeight + 'px';

        container.appendChild(petal);

        const endX = side === 'left' ? window.innerWidth + 50 : -50;
        const duration = 8000 + Math.random() * 4000;

        petal.animate([
            {
                transform: 'translateX(0) rotate(0deg)',
                opacity: 0.3
            },
            {
                transform: `translateX(${endX}px) translateY(${-50 + Math.random() * 100}px) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'linear'
        });

        setTimeout(() => {
            if (petal.parentNode) {
                petal.remove();
            }
        }, duration);
    }

    handleScroll() {
        // Add scroll-based animations for quotes
        const quoteItems = document.querySelectorAll('.quote-item.quote-revealed');

        quoteItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                item.classList.add('in-viewport');
            }
        });
    }

    handleResize() {
        // Adjust particle system for new viewport size
        const ambientPetals = document.querySelectorAll('.ambient-petal');
        ambientPetals.forEach(petal => {
            if (petal.offsetLeft > window.innerWidth) {
                petal.remove();
            }
        });
    }
}

// Additional CSS classes for JavaScript animations (to be added to CSS)
const additionalStyles = `
/* JavaScript Animation Classes */
.clicked {
  animation: clickPulse 0.8s ease-out !important;
}

@keyframes clickPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1.1); }
}

.hover-glow {
  filter: drop-shadow(0 0 20px rgba(255, 215, 0, 0.8));
}

@keyframes extraBounce {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-15px) scale(1.05); }
}

.curtain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  pointer-events: none;
}

.curtain-left, .curtain-right {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, #FFE5D9, #FFCAD4);
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.curtain-left {
  left: 0;
  transform-origin: left;
}

.curtain-right {
  right: 0;
  transform-origin: right;
}

.image-hidden {
  opacity: 0;
  transform: scale(0.8) translateY(50px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.image-revealed {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.quote-hidden {
  opacity: 0;
  transform: translateX(-50px) scale(0.9);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.quote-revealed {
  opacity: 1;
  transform: translateX(0) scale(1);
}

.story-revealed {
  animation: storyReveal 1s ease-out;
}

@keyframes storyReveal {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sparkle-effect {
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1.2rem;
  animation: sparkleFloat 2s ease-out;
  pointer-events: none;
}

@keyframes sparkleFloat {
  0% {
    opacity: 0;
    transform: scale(0) translateY(0);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) translateY(-20px);
  }
  100% {
    opacity: 0;
    transform: scale(0.8) translateY(-40px);
  }
}

.heart-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 500;
}

.floating-heart {
  position: absolute;
  font-size: 1.5rem;
  pointer-events: none;
  user-select: none;
}

.ambient-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.ambient-petal {
  position: absolute;
  background: radial-gradient(circle, #F8AD9D, #F4A6CD);
  border-radius: 50% 0 50% 0;
  opacity: 0.3;
}

.in-viewport {
  animation: viewportPulse 2s ease-in-out;
}

@keyframes viewportPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .floating-heart {
    font-size: 1.2rem;
  }
  
  .sparkle-effect {
    font-size: 1rem;
  }
}
`;

// Inject additional styles
function injectStyles() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
}

// Initialize the experience when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    injectStyles();
    new RakshaBandhanExperience();
});

// Advanced Features and Enhancements
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.init();
    }

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    playClickSound() {
        if (!this.audioContext) return;

        // Create a simple bell-like sound for rakhi click
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.3);

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }
}

// Enhanced particle effects
class AdvancedParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.isActive = false;
    }

    createFireworks(x, y) {
        const colors = ['#FFD700', '#FF69B4', '#FF6347', '#FFA500', '#FF1493'];

        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.position = 'absolute';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';

            this.container.appendChild(particle);

            const angle = (i / 12) * Math.PI * 2;
            const velocity = 50 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            setTimeout(() => particle.remove(), 1000);
        }
    }

    createMagicalTrail(element) {
        const trail = document.createElement('div');
        trail.className = 'magical-trail';
        trail.innerHTML = '✨';
        trail.style.position = 'absolute';
        trail.style.fontSize = '1rem';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '1000';

        const rect = element.getBoundingClientRect();
        trail.style.left = (rect.left + rect.width / 2) + 'px';
        trail.style.top = (rect.top + rect.height / 2) + 'px';

        document.body.appendChild(trail);

        trail.animate([
            {
                transform: 'translate(-50%, -50%) scale(0) rotate(0deg)',
                opacity: 0
            },
            {
                transform: 'translate(-50%, -50%) scale(1.5) rotate(180deg)',
                opacity: 1,
                offset: 0.5
            },
            {
                transform: 'translate(-50%, -50%) scale(0) rotate(360deg)',
                opacity: 0
            }
        ], {
            duration: 1500,
            easing: 'ease-out'
        });

        setTimeout(() => trail.remove(), 1500);
    }
}

// Loading and preloader
class LoadingManager {
    constructor() {
        this.loadedResources = 0;
        this.totalResources = 0;
        this.init();
    }

    init() {
        this.createPreloader();
        this.preloadImages();
    }

    createPreloader() {
        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        preloader.innerHTML = `
      <div class="preloader-content">
        <div class="rakhi-loader">
          <div class="loader-thread"></div>
          <div class="loader-ornament"></div>
        </div>
        <p class="loading-text">Preparing the celebration...</p>
        <div class="loading-bar">
          <div class="loading-progress" id="loadingProgress"></div>
        </div>
      </div>
    `;

        document.body.appendChild(preloader);
        this.addPreloaderStyles();
    }

    addPreloaderStyles() {
        const styles = `
      #preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #FFE5D9, #FFCAD4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
      }
      
      .preloader-content {
        text-align: center;
        color: #5D4E75;
      }
      
      .rakhi-loader {
        width: 60px;
        height: 60px;
        margin: 0 auto 2rem;
        position: relative;
        animation: loaderSpin 2s linear infinite;
      }
      
      .loader-ornament {
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, #FFD700, #FF8C69);
        border-radius: 50%;
        margin: 10px auto;
        position: relative;
      }
      
      .loader-ornament::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 20px;
        height: 20px;
        background: #FFD700;
        border-radius: 50%;
      }
      
      .loader-thread {
        position: absolute;
        top: 50%;
        left: -20px;
        right: -20px;
        height: 3px;
        background: linear-gradient(90deg, transparent, #FFD700, transparent);
        border-radius: 2px;
      }
      
      .loading-text {
        font-family: 'Dancing Script', cursive;
        font-size: 1.2rem;
        margin-bottom: 1rem;
      }
      
      .loading-bar {
        width: 200px;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 2px;
        margin: 0 auto;
        overflow: hidden;
      }
      
      .loading-progress {
        height: 100%;
        background: linear-gradient(90deg, #FFD700, #FF8C69);
        border-radius: 2px;
        width: 0%;
        transition: width 0.3s ease;
      }
      
      @keyframes loaderSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    preloadImages() {
        const images = document.querySelectorAll('img');
        this.totalResources = images.length;

        if (this.totalResources === 0) {
            this.completeLoading();
            return;
        }

        images.forEach(img => {
            if (img.complete) {
                this.resourceLoaded();
            } else {
                img.addEventListener('load', () => this.resourceLoaded());
                img.addEventListener('error', () => this.resourceLoaded());
            }
        });
    }

    resourceLoaded() {
        this.loadedResources++;
        const progress = (this.loadedResources / this.totalResources) * 100;
        const progressBar = document.getElementById('loadingProgress');

        if (progressBar) {
            progressBar.style.width = progress + '%';
        }

        if (this.loadedResources >= this.totalResources) {
            setTimeout(() => this.completeLoading(), 500);
        }
    }

    completeLoading() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500);
        }
    }
}

// Enhanced main experience class with new features
const enhancedExperienceExtension = {
    initAdvancedFeatures() {
        this.audioManager = new AudioManager();
        this.particleSystem = new AdvancedParticleSystem(document.body);
        this.loadingManager = new LoadingManager();
        this.setupKeyboardControls();
        this.setupGestureControls();
        this.addAccessibilityFeatures();
    },

    setupKeyboardControls() {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space' || event.code === 'Enter') {
                if (!this.isRevealed) {
                    event.preventDefault();
                    const rakhiButton = document.getElementById('rakhiThread');
                    if (rakhiButton) {
                        rakhiButton.click();
                    }
                }
            }
        });
    },

    setupGestureControls() {
        let touchStartY = 0;

        document.addEventListener('touchstart', (event) => {
            touchStartY = event.touches[0].clientY;
        });

        document.addEventListener('touchend', (event) => {
            const touchEndY = event.changedTouches[0].clientY;
            const swipeDistance = touchStartY - touchEndY;

            if (swipeDistance > 50 && !this.isRevealed) {
                const rakhiButton = document.getElementById('rakhiThread');
                if (rakhiButton) {
                    rakhiButton.click();
                }
            }
        });
    },

    addAccessibilityFeatures() {
        // Add ARIA labels and roles
        const rakhiButton = document.getElementById('rakhiThread');
        if (rakhiButton) {
            rakhiButton.setAttribute('role', 'button');
            rakhiButton.setAttribute('aria-describedby', 'rakhi-description');

            // Add hidden description for screen readers
            const description = document.createElement('div');
            description.id = 'rakhi-description';
            description.className = 'sr-only';
            description.textContent = 'Click or press Enter to reveal the Raksha Bandhan celebration content. This will show beautiful images and quotes about sibling bonds.';
            document.body.appendChild(description);
        }

        // Add focus management
        this.setupFocusManagement();
    },

    setupFocusManagement() {
        const rakhiButton = document.getElementById('rakhiThread');
        if (rakhiButton) {
            rakhiButton.addEventListener('focus', () => {
                rakhiButton.style.outline = '3px solid #FFD700';
                rakhiButton.style.outlineOffset = '5px';
            });

            rakhiButton.addEventListener('blur', () => {
                rakhiButton.style.outline = 'none';
            });
        }
    },

    enhancedHandleRakhiClick(event) {
        // Call original method
        this.handleRakhiClick.call(this, event);

        // Add enhanced features
        this.audioManager.playClickSound();
        this.particleSystem.createFireworks(event.clientX, event.clientY);

        // Add magical trail effect
        setTimeout(() => {
            const quotes = document.querySelectorAll('.quote-item');
            quotes.forEach((quote, index) => {
                setTimeout(() => {
                    this.particleSystem.createMagicalTrail(quote);
                }, index * 300);
            });
        }, 1000);
    }
};

// Extend the original class with enhanced features
Object.assign(RakshaBandhanExperience.prototype, enhancedExperienceExtension);

// Screen reader only class
const srOnlyStyles = `
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    injectStyles();

    // Inject accessibility styles
    const accessibilityStyles = document.createElement('style');
    accessibilityStyles.textContent = srOnlyStyles;
    document.head.appendChild(accessibilityStyles);

    const experience = new RakshaBandhanExperience();
    experience.initAdvancedFeatures();

    // Override the original click handler with enhanced version
    const rakhiButton = document.getElementById('rakhiThread');
    if (rakhiButton) {
        rakhiButton.removeEventListener('click', experience.handleRakhiClick);
        rakhiButton.addEventListener('click', experience.enhancedHandleRakhiClick.bind(experience));
    }
});

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = {
            loadTime: 0,
            interactionTime: 0,
            animationFrameRate: 0
        };
        this.init();
    }

    init() {
        // Monitor page load time
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            console.log(`Raksha Bandhan site loaded in ${this.metrics.loadTime.toFixed(2)}ms`);
        });

        // Monitor animation performance
        this.monitorFrameRate();
    }

    monitorFrameRate() {
        let lastTime = performance.now();
        let frames = 0;

        const checkFrame = (currentTime) => {
            frames++;

            if (currentTime - lastTime >= 1000) {
                this.metrics.animationFrameRate = Math.round((frames * 1000) / (currentTime - lastTime));
                frames = 0;
                lastTime = currentTime;
            }

            requestAnimationFrame(checkFrame);
        };

        requestAnimationFrame(checkFrame);
    }

    getMetrics() {
        return this.metrics;
    }
}

// Initialize performance monitoring
const performanceMonitor = new PerformanceMonitor();

// Export for potential external use
window.RakshaBandhanExperience = RakshaBandhanExperience;
window.PerformanceMonitor = performanceMonitor;