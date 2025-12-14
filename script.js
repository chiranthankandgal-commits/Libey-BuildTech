// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const service = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !service || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// Service card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Portfolio item click handlers
document.addEventListener('DOMContentLoaded', () => {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            const image = item.querySelector('.portfolio-bg-image').src;
            
            // Create modal for portfolio item
            showPortfolioModal(title, description, image);
        });
    });
});

// Add parallax effect to hero image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-bg-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add floating animation to service icons
document.addEventListener('DOMContentLoaded', () => {
    const serviceIcons = document.querySelectorAll('.service-icon');
    
    serviceIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('floating');
    });
});

// Add typewriter effect to hero title
function typeWriter(element, text, speed = 100) {
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

document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Add hover effect to interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Add subtle hover effect
            el.style.transform = 'translateY(-2px)';
            el.style.transition = 'all 0.3s ease';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translateY(0)';
        });
    });
});



// Add particle effect to hero section
function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(251, 191, 36, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: float 6s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 6000);
    }
}

// Create particles periodically - less frequent
setInterval(createParticle, 800);



// Add CSS for particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Portfolio modal
function showPortfolioModal(title, description, image) {
    const modal = document.createElement('div');
    modal.className = 'portfolio-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-image">
                    <img src="${image}" alt="${title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;">
                </div>
                <div class="modal-body">
                    <p>${description}</p>
                    <p>This project showcases our expertise in BIM solutions. Contact us to learn more about similar projects and how we can help with your specific needs.</p>
                </div>
                <div class="modal-footer">
                    <a href="#contact" class="cta-button">Get Quote</a>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .portfolio-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }
        .modal-overlay {
            background: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .modal-content {
            background: white;
            border-radius: 15px;
            max-width: 500px;
            width: 100%;
            animation: slideInUp 0.3s ease-out;
        }
        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-header h3 {
            margin: 0;
            color: #1f2937;
        }
        .modal-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
        }
        .modal-body {
            padding: 1.5rem;
            color: #6b7280;
            line-height: 1.6;
        }
        .modal-footer {
            padding: 1.5rem;
            border-top: 1px solid #e5e7eb;
            text-align: center;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', () => modal.remove());
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            modal.remove();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.remove();
        }
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Add loading class to elements
    const elements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content');
    elements.forEach((el, index) => {
        el.classList.add('loading');
        setTimeout(() => {
            el.classList.add('loaded');
        }, index * 200);
    });
});

// Preloader
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    // Add loading animation to stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px)';
        setTimeout(() => {
            stat.style.transition = 'all 0.6s ease';
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0)';
        }, index * 300);
    });
});

// Enhanced scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            entry.target.classList.add('animate-in');
            
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.service-icon, .service-image, .portfolio-image, .contact-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '0';
                    child.style.transform = 'translateY(20px)';
                    child.style.transition = 'all 0.6s ease';
                    
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Background particles system - more subtle
function createParticles(containerId, count = 8) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 12 + 's';
        particle.style.animationDuration = (Math.random() * 6 + 10) + 's';
        container.appendChild(particle);
    }
}

// Smooth section transitions
function addSectionTransitions() {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.transition = 'all 0.8s ease';
        
        // Add subtle background animation on scroll
        window.addEventListener('scroll', () => {
            const rect = section.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                section.style.transform = `translateY(${progress * 10}px)`;
                section.style.opacity = 0.8 + (progress * 0.2);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize scroll animations
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content, .scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        scrollObserver.observe(el);
    });
    
    // Create background particles - more subtle
    createParticles('services-particles', 10);
    createParticles('about-particles', 8);
    createParticles('portfolio-particles', 12);
    createParticles('contact-particles', 10);
    
    // Add section transitions
    addSectionTransitions();
    
    // Add parallax effect to background elements
    const parallaxElements = document.querySelectorAll('.hero-bg-image, .service-bg-image, .portfolio-bg-image');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Floating quote button functionality
    const floatingQuoteBtn = document.getElementById('floating-quote-btn');
    if (floatingQuoteBtn) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Show floating button when user scrolls to 80% of the page
            if (scrollPosition > (documentHeight - windowHeight) * 0.8) {
                floatingQuoteBtn.classList.add('show');
            } else {
                floatingQuoteBtn.classList.remove('show');
            }
        });
    }
    
    // Chat box functionality
    initializeChatBox();
    
    // Initialize careers modal
    initializeCareersModal();
});

// Chat Box Functionality
function initializeChatBox() {
    const chatBox = document.getElementById('chat-box');
    const chatToggle = document.getElementById('chat-toggle');
<<<<<<< HEAD
=======
    const chatMaximize = document.getElementById('chat-maximize');
>>>>>>> dfd6706c19f4ab8001515f71c543b6671db8ab58
    const chatHeader = document.getElementById('chat-header');
    const chatInput = document.getElementById('chat-input-field');
    const chatSendBtn = document.getElementById('chat-send-btn');
    const chatMessages = document.getElementById('chat-messages');
    
<<<<<<< HEAD
=======
    let autoMinimizeTimer;
    const AUTO_MINIMIZE_DELAY = 5000; // 5 seconds
    
>>>>>>> dfd6706c19f4ab8001515f71c543b6671db8ab58
    // Chat responses
    const chatResponses = {
        'hello': 'Hello! Welcome to Libey BuildTech! 🏗️ I\'m here to help you with our premium BIM services. We\'ve completed 100+ BIM models and 800+ automation projects with 100% client satisfaction. What service interests you today?',
        'hi': 'Hi there! 👋 Ready to transform your AEC projects with cutting-edge BIM solutions? We specialize in BIM Modelling, Automation, Coordination, and 3D Visualization. Which area would you like to explore?',
        'services': 'We offer comprehensive BIM solutions that can revolutionize your workflow! 🚀\n\n• BIM Modelling: Turn sketches/CAD into detailed 3D models\n• BIM Automation: Custom Dynamo/Python scripts to save 80% time\n• BIM Coordination: Navisworks clash detection & multi-discipline coordination\n• Quantities & Costing: Accurate estimates from BIM models\n• 3D Visualization: Stunning renders for presentations\n\nWhich service would you like to learn more about? I can help you get a quote!',
        'pricing': 'Great question! 💰 Our pricing is competitive and varies based on your project scope. We offer flexible packages starting from:\n\n• BIM Modelling: $X per sq ft/meter\n• BIM Automation: $X per script/task\n• 3D Visualization: $X per render\n\nWant an exact quote? Click the "Get Quote" button or tell me about your project, and I\'ll guide you through our pricing calculator!',
        'bim modelling': 'Excellent choice! 🏢 Our BIM Modelling service transforms your ideas into construction-ready 3D models. We accept sketches, CAD files, PDFs, and images.\n\n✅ What we deliver:\n• Detailed 3D BIM models\n• All file formats supported\n• Construction-ready documentation\n• 100% accuracy guarantee\n\nReady to get started? Click "Get Quote" and select BIM Modelling to see our competitive pricing!',
        'automation': 'Smart choice! 🤖 Our BIM Automation can save you 80% of repetitive work time. We create custom Dynamo and Python scripts for:\n\n✅ Automation benefits:\n• Streamlined workflows\n• Reduced errors\n• Time savings\n• Custom solutions\n\nWe\'ve completed 800+ automation projects successfully. Want to see how much you can save? Get a quote now!',
        'coordination': 'Perfect! 🔧 Our BIM Coordination ensures seamless project integration using Navisworks:\n\n✅ What we provide:\n• Clash detection & resolution\n• Multi-discipline coordination\n• Coordination models\n• Detailed reports\n\nAvoid costly construction delays! Get a quote for your coordination needs.',
        'costing': 'Smart planning! 💡 Our Quantities & Costing service extracts accurate estimates from BIM models:\n\n✅ Benefits:\n• Precise quantity takeoffs\n• Cost estimates\n• Better project planning\n• Budget optimization\n\nGet accurate estimates for your project. Click "Get Quote" to start!',
        'visualization': 'Stunning visuals! 🎨 Our 3D Visualization creates compelling presentations:\n\n✅ What we deliver:\n• High-quality renders\n• Walkthrough animations\n• Marketing materials\n• Client presentations\n\nMake your projects stand out! Get a quote for visualization services.',
        'contact': 'Ready to get started? 📞 Contact us:\n\n📧 Email: info@libeybuildtech.com\n📱 Phone: +91 6361892045\n📍 Location: Chandra Layout, Bangalore\n\nWe\'re here to help bring your BIM vision to life! Would you like to get a quote or schedule a consultation?',
        'portfolio': 'Check out our impressive work! 🏆 View our portfolio: https://www.behance.net/gallery/231824797/BIM-Architect-and-Automation-Portfolio\n\nWe\'ve delivered 100+ BIM models and 800+ automation projects. See the quality and variety of our work!\n\nReady to start your project? Get a quote now!',
        'quote': 'Perfect! 💰 Let\'s get you a detailed quote:\n\n1️⃣ Click the "Get Quote" button\n2️⃣ Select your service\n3️⃣ Provide project details\n4️⃣ Get instant pricing\n5️⃣ Pay 10% advance to start\n\nOur quote calculator is user-friendly and gives you accurate estimates. What service are you interested in?',
        'experience': 'We\'re BIM experts! 🎯 Our track record:\n\n✅ 100+ BIM models completed\n✅ 800+ automation projects\n✅ 100% client satisfaction\n✅ NIT architecture background\n✅ 5+ years industry experience\n\nWe bridge the technology gap in AEC. Ready to work with experts? Get a quote!',
        'price': 'Great question about pricing! 💰 Our rates are competitive and project-based:\n\n• BIM Modelling: Starting at $X per sq ft\n• Automation: $X per script\n• Visualization: $X per render\n• Coordination: $X per project\n\nWant exact pricing? Use our quote calculator or tell me about your project!',
        'cost': 'Cost-effective BIM solutions! 💡 We offer:\n\n• Flexible pricing packages\n• No hidden costs\n• 10% advance payment\n• Transparent pricing\n\nOur services save you time and money in the long run. Get a quote to see your exact costs!',
        'quality': 'Quality is our priority! ⭐ We guarantee:\n\n• 100% accuracy in models\n• Professional standards\n• Client satisfaction\n• Revisions included\n• On-time delivery\n\nSee our portfolio for quality examples. Ready to experience our quality? Get a quote!',
        'time': 'Fast turnaround times! ⚡ We deliver:\n\n• BIM Models: 3-7 days\n• Automation: 1-3 days\n• Visualization: 2-5 days\n• Coordination: 1-2 days\n\nNeed it faster? We offer rush services. Get a quote with your timeline!',
        'deadline': 'We meet deadlines! 📅 Our delivery times:\n\n• Standard projects: 3-7 days\n• Rush projects: 1-3 days\n• Complex projects: 7-14 days\n\nWe\'ll work with your schedule. Tell us your deadline when you get a quote!',
        'file': 'We accept all file formats! 📁\n\n• CAD files (.dwg, .dxf)\n• Sketch files\n• PDFs\n• Images\n• Point clouds\n• Any BIM format\n\nJust upload your files when you get a quote. We handle everything!',
        'format': 'All formats welcome! 📄 We work with:\n\n• AutoCAD files\n• Revit files\n• SketchUp\n• PDFs\n• Images\n• Point clouds\n• Any CAD/BIM format\n\nNo format conversion needed. Get a quote and upload your files!',
        'default': 'I\'m your BIM assistant! 🏗️ I can help you with:\n\n• Service information\n• Pricing details\n• Portfolio showcase\n• Contact information\n• Quote requests\n\nWe\'ve completed 100+ BIM models and 800+ automation projects. What would you like to know? Get a quote to start your project!'
    };
    
<<<<<<< HEAD
=======
    // Auto-minimize function
    function startAutoMinimizeTimer() {
        clearTimeout(autoMinimizeTimer);
        autoMinimizeTimer = setTimeout(() => {
            if (!chatBox.classList.contains('minimized')) {
                chatBox.classList.add('minimized');
            }
        }, AUTO_MINIMIZE_DELAY);
    }
    
    // Reset auto-minimize timer on user interaction
    function resetAutoMinimizeTimer() {
        clearTimeout(autoMinimizeTimer);
        if (!chatBox.classList.contains('minimized')) {
            startAutoMinimizeTimer();
        }
    }
    
>>>>>>> dfd6706c19f4ab8001515f71c543b6671db8ab58
    // Toggle chat box
    chatToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        chatBox.classList.toggle('minimized');
<<<<<<< HEAD
    });
    
    chatHeader.addEventListener('click', () => {
        chatBox.classList.remove('minimized');
=======
        if (!chatBox.classList.contains('minimized')) {
            resetAutoMinimizeTimer();
        }
    });
    
    // Maximize chat box
    chatMaximize.addEventListener('click', (e) => {
        e.stopPropagation();
        chatBox.classList.remove('minimized');
        resetAutoMinimizeTimer();
    });
    
    chatHeader.addEventListener('click', () => {
        if (chatBox.classList.contains('minimized')) {
            chatBox.classList.remove('minimized');
            resetAutoMinimizeTimer();
        }
>>>>>>> dfd6706c19f4ab8001515f71c543b6671db8ab58
    });
    
    // Send message function
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';
            
<<<<<<< HEAD
=======
            // Reset auto-minimize timer
            resetAutoMinimizeTimer();
            
>>>>>>> dfd6706c19f4ab8001515f71c543b6671db8ab58
            // Simulate typing delay
            setTimeout(() => {
                const response = getChatResponse(message);
                addMessage(response, 'assistant');
<<<<<<< HEAD
=======
                // Reset timer after assistant response
                resetAutoMinimizeTimer();
>>>>>>> dfd6706c19f4ab8001515f71c543b6671db8ab58
            }, 1000);
        }
    }
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Get chat response
    function getChatResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for exact matches first
        for (const [key, response] of Object.entries(chatResponses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        // Enhanced response system - try to understand context
        if (lowerMessage.includes('how') || lowerMessage.includes('what') || lowerMessage.includes('when') || lowerMessage.includes('where') || lowerMessage.includes('why')) {
            if (lowerMessage.includes('work') || lowerMessage.includes('process') || lowerMessage.includes('done')) {
                return 'Our process is simple and efficient! 🚀\n\n1️⃣ You select your service and get a quote\n2️⃣ Pay 20% advance to start\n3️⃣ Upload your files and requirements\n4️⃣ We work on your project\n5️⃣ Deliver high-quality results\n\nWe\'ve completed 100+ BIM models and 800+ automation projects. Ready to start yours? Get a quote now!';
            }
            if (lowerMessage.includes('long') || lowerMessage.includes('time') || lowerMessage.includes('duration')) {
                return 'Timeline depends on your project scope! ⏱️\n\n• BIM Models: 3-7 days\n• Automation: 1-3 days\n• Visualization: 2-5 days\n• Coordination: 1-2 days\n\nNeed it faster? We offer rush services! Get a quote with your timeline.';
            }
            if (lowerMessage.includes('cost') || lowerMessage.includes('expensive') || lowerMessage.includes('cheap')) {
                return 'Our pricing is competitive and value-driven! 💰\n\n• Transparent pricing with no hidden costs\n• 20% advance payment to start\n• Flexible packages for different budgets\n• Quality that saves you money long-term\n\nWant exact pricing? Use our quote calculator!';
            }
            return 'Great question! 🤔 I\'m here to help with all your BIM service needs. We offer BIM Modelling, Automation, Coordination, Quantities & Costing, and 3D Visualization. What specific information would you like?';
        }
        
        if (lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('excellent') || lowerMessage.includes('amazing')) {
            return 'Thank you! 🙏 We\'re passionate about delivering exceptional BIM solutions. Our team has 5+ years of experience and 100% client satisfaction. Ready to experience our quality? Get a quote today!';
        }
        
        if (lowerMessage.includes('bad') || lowerMessage.includes('poor') || lowerMessage.includes('terrible') || lowerMessage.includes('worst')) {
            return 'I\'m sorry to hear that! 😔 We\'re committed to excellence and would love to address any concerns. Our track record shows 100% client satisfaction with 100+ BIM models and 800+ automation projects completed. Let\'s discuss how we can help you!';
        }
        
        if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('assist')) {
            return 'I\'m here to help! 🆘\n\nI can assist with:\n• Service information and pricing\n• Project requirements and quotes\n• Technical questions about BIM\n• Portfolio and examples\n• Contact information\n\nWhat do you need help with?';
        }
        
        if (lowerMessage.includes('thanks') || lowerMessage.includes('thank you') || lowerMessage.includes('thx')) {
            return 'You\'re welcome! 😊 Happy to help with your BIM needs. If you have more questions or are ready to start your project, just let me know. We\'re here to make your BIM journey smooth and successful!';
        }
        
        if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || lowerMessage.includes('see you')) {
            return 'Goodbye! 👋 Thanks for chatting with me. Remember, we\'re here when you\'re ready to start your BIM project. Visit our quote page anytime to get started. Have a great day!';
        }
        
        // If no specific context found, provide a helpful response
        return 'I understand you\'re asking about BIM services! 🤖\n\nI can help you with:\n• Detailed service information\n• Pricing and quotes\n• Project examples\n• Technical questions\n• Getting started\n\nCould you be more specific about what you\'d like to know? Or would you like to get a quote for your project?';
    }
    
    // Event listeners
    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
<<<<<<< HEAD
=======
    
    // Add event listeners for user interaction to reset timer
    chatInput.addEventListener('input', resetAutoMinimizeTimer);
    chatInput.addEventListener('focus', resetAutoMinimizeTimer);
    chatMessages.addEventListener('scroll', resetAutoMinimizeTimer);
    
    // Start auto-minimize timer when chat box is opened
    chatBox.addEventListener('transitionend', () => {
        if (!chatBox.classList.contains('minimized')) {
            resetAutoMinimizeTimer();
        }
    });
    
    // Initialize chat box as minimized by default
    // No need to start timer since it starts minimized
>>>>>>> dfd6706c19f4ab8001515f71c543b6671db8ab58
}

// Careers Modal Functions
function openCareersModal() {
    const modal = document.getElementById('careers-modal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCareersModal() {
    const modal = document.getElementById('careers-modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function initializeCareersModal() {
    const modal = document.getElementById('careers-modal');
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCareersModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeCareersModal();
        }
    });
    
    // Handle form submission
    const careersForm = modal.querySelector('.careers-form');
    careersForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        const submitBtn = careersForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Application Submitted!';
        submitBtn.style.background = '#10b981';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            closeCareersModal();
        }, 2000);
    });
}

