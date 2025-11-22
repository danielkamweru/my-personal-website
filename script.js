document.addEventListener('DOMContentLoaded', function() {
    // Theme switching functionality
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    
    // Set default theme to dark
    body.classList.add('theme-dark');
    
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            
            // Remove all theme classes
            body.classList.remove('theme-light', 'theme-dark', 'theme-forest', 'theme-sunshine', 'theme-purple');
            
            // Add selected theme
            body.classList.add(`theme-${theme}`);
            
            // Update active button
            themeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Store theme preference
            localStorage.setItem('theme', theme);
        });
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(`theme-${savedTheme}`);
    document.querySelector(`[data-theme="${savedTheme}"]`).classList.add('active');
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typewriter effect for about section
    const animatedTexts = document.querySelectorAll('.animated-text');
    let currentTextIndex = 0;
    
    function typeText(element, text, callback) {
        element.textContent = '';
        element.style.borderRight = '2px solid var(--color-text-primary)';
        
        let i = 0;
        const words = text.split(' ');
        
        function typeWord() {
            if (i < words.length) {
                element.textContent += (i > 0 ? ' ' : '') + words[i];
                i++;
                setTimeout(typeWord, words[i-1]?.length > 8 ? 150 : 100);
            } else {
                element.style.borderRight = 'none';
                if (callback) callback();
            }
        }
        
        typeWord();
    }
    
    function startTypewriter() {
        if (currentTextIndex < animatedTexts.length) {
            const element = animatedTexts[currentTextIndex];
            const text = element.getAttribute('data-text');
            
            typeText(element, text, () => {
                currentTextIndex++;
                setTimeout(startTypewriter, 300);
            });
        }
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Animate skill bars
                if (sectionId === 'skills') {
                    animateSkillBars();
                }
                
                // Start typewriter effect for about section
                if (sectionId === 'about' && currentTextIndex === 0) {
                    startTypewriter();
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
    
    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            if (progress) {
                setTimeout(() => {
                    bar.style.width = `${progress}%`;
                }, 100);
            }
        });
    }
    
    // Flip card functionality
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.toggle('flipped');
        });
        
        // Auto-flip back after 5 seconds
        card.addEventListener('click', () => {
            if (card.classList.contains('flipped')) {
                setTimeout(() => {
                    card.classList.remove('flipped');
                }, 5000);
            }
        });
    });
    
    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add floating animation to profile photo
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        profilePhoto.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
    
    // Add scroll-based animations
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.profile-photo');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Add notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--color-accent-primary);
            color: var(--color-bg-primary);
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Show theme change notifications
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const themeName = button.dataset.theme;
            showNotification(`Theme changed to ${themeName.charAt(0).toUpperCase() + themeName.slice(1)}`);
        });
    });
    
    // WhatsApp comment functionality
    window.sendComment = function() {
        const comment = document.getElementById('comment')?.value.trim();
        const sendButton = document.querySelector('.whatsapp-btn');
        
        if (!comment || comment === '') {
            showNotification('Please type a comment first!');
            return;
        }
        
        if (sendButton) sendButton.disabled = true;
        
        const phoneNumber = '254723832126';
        const encodedMessage = encodeURIComponent(`Hello Daniel! 👋\n\nHere's my comment from your portfolio:\n"${comment}"`);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(url, '_blank');
        
        const commentField = document.getElementById('comment');
        if (commentField) commentField.value = '';
        
        showNotification('Opening WhatsApp...');
        
        setTimeout(() => {
            if (sendButton) sendButton.disabled = false;
        }, 2000);
    };
});