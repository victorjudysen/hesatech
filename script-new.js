/* =========================================
   HESATECH CONSTRUCTION LOADER JAVASCRIPT
   Interactive Construction Experience
   ========================================= */

// Construction Loader System
class HesatechConstructionLoader {
    constructor() {
        this.progress = 0;
        this.isLoading = true;
        this.statusMessages = [
            'Initializing construction site...',
            'Setting up safety protocols...',
            'Positioning heavy machinery...',
            'Coordinating construction teams...',
            'Installing scaffolding systems...',
            'Preparing building materials...',
            'Activating crane operations...',
            'Implementing quality controls...',
            'Finalizing site preparations...',
            'Construction site ready!'
        ];
        this.currentStatusIndex = 0;
        
        this.initializeLoader();
    }

    initializeLoader() {
        // Start the construction loading sequence
        this.updateProgress();
        this.animateStatusIcons();
        this.updateStatusMessages();
        
        // Auto-complete after 8 seconds
        setTimeout(() => {
            this.completeConstruction();
        }, 8000);
    }

    updateProgress() {
        const progressFill = document.getElementById('progress-fill');
        const progressPercentage = document.getElementById('progress-percentage');
        const milestones = document.querySelectorAll('.milestone');
        
        if (!progressFill || !progressPercentage) return;

        const interval = setInterval(() => {
            if (this.progress >= 100) {
                clearInterval(interval);
                return;
            }

            this.progress += Math.random() * 3 + 1; // Random increment between 1-4
            
            if (this.progress > 100) this.progress = 100;
            
            // Update visual progress
            progressFill.style.width = this.progress + '%';
            progressPercentage.textContent = Math.floor(this.progress);
            
            // Update milestones
            milestones.forEach((milestone) => {
                const milestoneValue = parseInt(milestone.dataset.milestone);
                if (this.progress >= milestoneValue) {
                    milestone.classList.add('active');
                }
            });
            
            // Update status message based on progress
            const statusIndex = Math.floor((this.progress / 100) * (this.statusMessages.length - 1));
            if (statusIndex !== this.currentStatusIndex && statusIndex < this.statusMessages.length) {
                this.currentStatusIndex = statusIndex;
                this.updateStatusText();
            }
            
        }, 100);
    }

    updateStatusMessages() {
        const statusText = document.getElementById('loading-status');
        if (!statusText) return;

        const messageInterval = setInterval(() => {
            if (this.progress >= 100) {
                clearInterval(messageInterval);
                return;
            }
            
            if (this.currentStatusIndex < this.statusMessages.length - 1) {
                statusText.textContent = this.statusMessages[this.currentStatusIndex];
            }
        }, 800);
    }

    updateStatusText() {
        const statusText = document.getElementById('loading-status');
        if (statusText && this.currentStatusIndex < this.statusMessages.length) {
            statusText.textContent = this.statusMessages[this.currentStatusIndex];
        }
    }

    animateStatusIcons() {
        const statusIcons = document.querySelectorAll('.status-icon');
        if (!statusIcons.length) return;

        let currentIcon = 0;
        
        const iconInterval = setInterval(() => {
            if (this.progress >= 100) {
                clearInterval(iconInterval);
                // Activate all icons when complete
                statusIcons.forEach(icon => icon.classList.add('active'));
                return;
            }
            
            // Remove active class from all icons
            statusIcons.forEach(icon => icon.classList.remove('active'));
            
            // Add active class to current icon
            if (statusIcons[currentIcon]) {
                statusIcons[currentIcon].classList.add('active');
            }
            
            currentIcon = (currentIcon + 1) % statusIcons.length;
        }, 1500);
    }

    completeConstruction() {
        this.progress = 100;
        this.isLoading = false;
        
        // Update final UI state
        const progressFill = document.getElementById('progress-fill');
        const progressPercentage = document.getElementById('progress-percentage');
        const statusText = document.getElementById('loading-status');
        
        if (progressFill) progressFill.style.width = '100%';
        if (progressPercentage) progressPercentage.textContent = '100';
        if (statusText) statusText.textContent = 'Construction site ready!';
        
        // Activate all milestones and status icons
        document.querySelectorAll('.milestone').forEach(milestone => {
            milestone.classList.add('active');
        });
        
        document.querySelectorAll('.status-icon').forEach(icon => {
            icon.classList.add('active');
        });
        
        // Add completion effects
        this.addCompletionEffects();
        
        // Transition to main site after 2 seconds
        setTimeout(() => {
            this.transitionToMainSite();
        }, 2000);
    }

    addCompletionEffects() {
        const welcomeCenter = document.querySelector('.welcome-command-center');
        if (welcomeCenter) {
            welcomeCenter.style.animation = 'completionPulse 1s ease-in-out 2';
        }
        
        // Add completion animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes completionPulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.02); }
            }
        `;
        document.head.appendChild(style);
    }

    transitionToMainSite() {
        const loader = document.querySelector('.construction-loader');
        if (loader) {
            loader.style.animation = 'fadeOutLoader 1s ease-out forwards';
            
            // Add fade out animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeOutLoader {
                    0% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(1.1); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                loader.classList.add('loaded');
                // Show main content
                document.querySelector('.navbar').style.display = 'block';
                if (document.querySelector('main')) {
                    document.querySelector('main').style.display = 'block';
                }
                if (document.querySelector('footer')) {
                    document.querySelector('footer').style.display = 'block';
                }
            }, 1000);
        }
    }
}

// Enhanced Construction Site Animations
class ConstructionSiteAnimations {
    constructor() {
        this.initializeAnimations();
    }

    initializeAnimations() {
        this.animateWorkers();
        this.animateMachinery();
        this.animateConstruction();
        this.animateAtmosphere();
    }

    animateWorkers() {
        const workers = document.querySelectorAll('.worker');
        workers.forEach((worker, index) => {
            const randomDelay = Math.random() * 2000;
            setTimeout(() => {
                this.createWorkerActivity(worker);
            }, randomDelay);
        });
    }

    createWorkerActivity(worker) {
        const activities = ['hammering', 'measuring', 'lifting', 'welding'];
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        worker.classList.add(randomActivity);
        
        setTimeout(() => {
            worker.classList.remove(randomActivity);
            // Restart activity after a short break
            setTimeout(() => {
                this.createWorkerActivity(worker);
            }, Math.random() * 3000 + 1000);
        }, Math.random() * 2000 + 1000);
    }

    animateMachinery() {
        // Enhanced excavator movements
        const excavators = document.querySelectorAll('.excavator-unit');
        excavators.forEach(excavator => {
            setInterval(() => {
                excavator.style.transform = `translateX(${Math.random() * 20 - 10}px)`;
            }, 3000);
        });

        // Concrete mixer drum rotation speed variation
        const mixers = document.querySelectorAll('.mixer-drum');
        mixers.forEach(mixer => {
            setInterval(() => {
                const speed = Math.random() * 2 + 1;
                mixer.style.animationDuration = speed + 's';
            }, 5000);
        });
    }

    animateConstruction() {
        // Building progress simulation
        const structures = document.querySelectorAll('.building-structure');
        structures.forEach((structure, index) => {
            setTimeout(() => {
                this.simulateBuildingProgress(structure);
            }, index * 1000);
        });
    }

    simulateBuildingProgress(structure) {
        const floors = structure.querySelectorAll('.floor');
        floors.forEach((floor, index) => {
            setTimeout(() => {
                floor.style.opacity = '1';
                floor.style.animation = 'floorConstruction 0.5s ease-out';
            }, index * 500);
        });
    }

    animateAtmosphere() {
        // Dynamic dust particles
        setInterval(() => {
            this.createDustParticle();
        }, 2000);

        // Weather effects
        this.createWeatherEffects();
    }

    createDustParticle() {
        const dustContainer = document.querySelector('.dust-particles');
        if (!dustContainer) return;

        const particle = document.createElement('div');
        particle.className = 'dust-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        dustContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 15000);
    }

    createWeatherEffects() {
        // Add sunlight intensity variation
        const sunrays = document.querySelectorAll('.sunray');
        setInterval(() => {
            sunrays.forEach(ray => {
                ray.style.opacity = Math.random() * 0.5 + 0.3;
            });
        }, 3000);
    }
}

// Skip Loader Functionality
function skipConstructionLoader() {
    const loader = document.querySelector('.construction-loader');
    if (loader) {
        loader.classList.add('loaded');
        
        // Show main content immediately
        document.querySelector('.navbar').style.display = 'block';
        if (document.querySelector('main')) {
            document.querySelector('main').style.display = 'block';
        }
        if (document.querySelector('footer')) {
            document.querySelector('footer').style.display = 'block';
        }
    }
}

// Quality Assurance Checks Animation
class QualityAssuranceSystem {
    constructor() {
        this.checks = document.querySelectorAll('.qa-check');
        this.animateChecks();
    }

    animateChecks() {
        this.checks.forEach((check, index) => {
            setTimeout(() => {
                check.style.animation = 'checkAnimation 0.6s ease-out';
                check.style.transform = 'scale(1.1)';
                
                setTimeout(() => {
                    check.style.transform = 'scale(1)';
                }, 300);
            }, index * 800 + 2000);
        });
    }
}

// Work Type Cards Interactive Effects
class WorkTypeShowcase {
    constructor() {
        this.cards = document.querySelectorAll('.work-type-card');
        this.initializeCardEffects();
    }

    initializeCardEffects() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', this.activateCard);
            card.addEventListener('mouseleave', this.deactivateCard);
        });
    }

    activateCard(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(-15px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(255, 215, 0, 0.3)';
        
        const animation = card.querySelector('.card-animation');
        if (animation) {
            animation.style.animationDuration = '1s';
        }
    }

    deactivateCard(event) {
        const card = event.currentTarget;
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'none';
        
        const animation = card.querySelector('.card-animation');
        if (animation) {
            animation.style.animationDuration = '4s';
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if construction loader exists
    if (document.querySelector('.construction-loader')) {
        // Initialize construction loader system
        new HesatechConstructionLoader();
        
        // Initialize construction site animations
        new ConstructionSiteAnimations();
        
        // Initialize quality assurance system
        new QualityAssuranceSystem();
        
        // Initialize work type showcase
        new WorkTypeShowcase();
        
        console.log('🏗️ Hesatech Construction Loader Initialized');
        console.log('🏢 Building Excellence, Delivering Dreams');
    }
});

// Additional CSS animations for enhanced effects
const additionalStyles = `
    @keyframes floorConstruction {
        0% { transform: scaleY(0); }
        100% { transform: scaleY(1); }
    }
    
    @keyframes checkAnimation {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(180deg); }
        100% { transform: scale(1) rotate(360deg); }
    }
    
    .worker.hammering {
        animation: hammering 0.8s ease-in-out infinite;
    }
    
    @keyframes hammering {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-3px) rotate(2deg); }
    }
    
    .worker.measuring {
        animation: measuring 1.5s ease-in-out infinite;
    }
    
    @keyframes measuring {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(5px); }
    }
    
    .worker.lifting {
        animation: lifting 1.2s ease-in-out infinite;
    }
    
    @keyframes lifting {
        0%, 100% { transform: translateY(0) scaleY(1); }
        50% { transform: translateY(-8px) scaleY(0.9); }
    }
    
    .worker.welding {
        animation: welding 0.3s ease-in-out infinite;
    }
    
    @keyframes welding {
        0%, 100% { filter: brightness(1); }
        50% { filter: brightness(1.5); }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
