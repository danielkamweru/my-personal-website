
document.addEventListener('DOMContentLoaded', function() {
    // Theme switching functionality
    const themeButtons = document.querySelectorAll('.theme-btn'); // Get all theme buttons
    const body = document.body; // Reference to body element

    // Set default theme to dark
    body.classList.add('theme-dark');
    
    // Add click event listeners to theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme; // Get theme from data attribute

            // Remove all theme classes
            body.classList.remove('theme-light', 'theme-dark', 'theme-forest', 'theme-sunshine', 'theme-purple');

            // Add selected theme
            body.classList.add(`theme-${theme}`);

            // Update active button
            themeButtons.forEach(btn => btn.classList.remove('active')); // Remove active from all
            button.classList.add('active'); // Add active to clicked button

            // Store theme preference in localStorage
            localStorage.setItem('theme', theme);
        });
    });
    
    // Load saved theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.classList.add(`theme-${savedTheme}`); // Apply saved theme
    document.querySelector(`[data-theme="${savedTheme}"]`).classList.add('active'); // Mark button as active

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link'); // Get all nav links
    
    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            const targetId = this.getAttribute('href'); // Get target section ID
            const targetSection = document.querySelector(targetId); // Find target element

            if (targetSection) {
                // Smooth scroll to target section
                targetSection.scrollIntoView({
                    behavior: 'smooth' // Smooth scrolling animation
                });
            }
        });
    });

    // Typewriter effect for about section
    const animatedTexts = document.querySelectorAll('.animated-text'); // Get all animated text elements
    let currentTextIndex = 0; // Track current text being typed

    // Function to type text with typewriter effect
    function typeText(element, text, callback) {
        element.textContent = ''; // Clear existing text
        element.style.borderRight = '2px solid var(--color-text-primary)'; // Add cursor

        let i = 0;
        const words = text.split(' '); // Split text into words

        function typeWord() {
            if (i < words.length) {
                // Add word with space (except for first word)
                element.textContent += (i > 0 ? ' ' : '') + words[i];
                i++;
                // Variable typing speed based on word length
                setTimeout(typeWord, words[i-1]?.length > 8 ? 150 : 100);
            } else {
                element.style.borderRight = 'none'; // Remove cursor when done
                if (callback) callback(); // Call callback if provided
            }
        }

        typeWord(); // Start typing
    }
    
    // Function to start typewriter effect for next text
    function startTypewriter() {
        if (currentTextIndex < animatedTexts.length) {
            const element = animatedTexts[currentTextIndex]; // Get current text element
            const text = element.getAttribute('data-text'); // Get text from data attribute

            // Type the text, then move to next after delay
            typeText(element, text, () => {
                currentTextIndex++; // Increment index
                setTimeout(startTypewriter, 300); // Start next text after delay
            });
        }
    }

    // Intersection Observer for animations - triggers when sections come into view
    const observerOptions = {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger area
    };
    
    // Create Intersection Observer instance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Element is in viewport
                const sectionId = entry.target.id; // Get section ID

                // Animate skill bars when skills section comes into view
                if (sectionId === 'skills') {
                    animateSkillBars();
                }

                // Start typewriter effect when about section comes into view (only once)
                if (sectionId === 'about' && currentTextIndex === 0) {
                    startTypewriter();
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections for intersection events
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section); // Start observing each section
    });

    // Function to animate skill progress bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress'); // Get all progress bars
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress'); // Get target progress percentage
            if (progress) {
                setTimeout(() => {
                    bar.style.width = `${progress}%`; // Animate width to target percentage
                }, 100); // Small delay for smooth animation
            }
        });
    }
    
    // Flip card functionality for learning section
    const flipCards = document.querySelectorAll('.flip-card'); // Get all flip cards
    flipCards.forEach(card => {
        // Toggle flip state on click
        card.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            card.classList.toggle('flipped'); // Toggle flipped class
        });

        // Auto-flip back after 5 seconds
        card.addEventListener('click', () => {
            if (card.classList.contains('flipped')) {
                setTimeout(() => {
                    card.classList.remove('flipped'); // Remove flipped class after delay
                }, 5000); // 5 second delay
            }
        });
    });
    
    // Enhanced project card interactions
    const projectCards = document.querySelectorAll('.project-card'); // Get all project cards
    projectCards.forEach(card => {
        // Lift card on mouse enter
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)'; // Move up
        });

        // Reset position on mouse leave
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)'; // Move back down
        });
    });

    // Flip project cards on button click
    const flipButtons = document.querySelectorAll('.flip-btn');
    flipButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = button.closest('.project-card');
            card.classList.toggle('flipped');
        });
    });

    // Pause floating animation on profile photo hover
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused'; // Pause animation
        });

        profilePhoto.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running'; // Resume animation
        });
    }

    // Scroll-based parallax effect for profile photo
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset; // Get scroll position
        const parallax = document.querySelector('.profile-photo');

        if (parallax) {
            const speed = scrolled * 0.5; // Calculate parallax speed
            parallax.style.transform = `translateY(${speed}px)`; // Apply transform
        }
    });
    
    // Notification system for user feedback
    function showNotification(message) {
        const notification = document.createElement('div'); // Create notification element
        notification.className = 'notification'; // Add class for styling
        notification.textContent = message; // Set notification text
        notification.style.cssText = `
            position: fixed; /* Fixed positioning */
            bottom: 20px; /* Position from bottom */
            right: 20px; /* Position from right */
            background: var(--color-accent-primary); /* Dynamic background */
            color: var(--color-bg-primary); /* Dynamic text color */
            padding: 15px 20px; /* Padding */
            border-radius: 5px; /* Rounded corners */
            z-index: 10000; /* High z-index */
            opacity: 0; /* Start invisible */
            transition: opacity 0.3s ease; /* Fade transition */
        `;

        document.body.appendChild(notification); // Add to DOM

        // Fade in notification
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 100);

        // Fade out and remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification); // Remove from DOM
            }, 300);
        }, 3000);
    }
    
    // Show notifications when theme changes
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const themeName = button.dataset.theme; // Get theme name
            // Capitalize first letter and show notification
            showNotification(`Theme changed to ${themeName.charAt(0).toUpperCase() + themeName.slice(1)}`);
        });
    });

    // WhatsApp comment functionality - global function for onclick
    window.sendComment = function() {
        const comment = document.getElementById('comment')?.value.trim(); // Get and trim comment
        const sendButton = document.querySelector('.whatsapp-btn'); // Get send button

        // Validate comment is not empty
        if (!comment || comment === '') {
            showNotification('Please type a comment first!');
            return;
        }

        if (sendButton) sendButton.disabled = true; // Disable button during send

        const phoneNumber = '254723832126'; // WhatsApp phone number
        // Encode message for URL
        const encodedMessage = encodeURIComponent(`Hello Daniel! 👋\n\nHere's my comment from your portfolio:\n"${comment}"`);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`; // WhatsApp URL

        window.open(url, '_blank'); // Open WhatsApp in new tab

        // Clear comment field
        const commentField = document.getElementById('comment');
        if (commentField) commentField.value = '';

        showNotification('Opening WhatsApp...'); // Show success notification

        // Re-enable button after delay
        setTimeout(() => {
            if (sendButton) sendButton.disabled = false;
        }, 2000);
    };
});