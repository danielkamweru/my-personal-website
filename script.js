document.addEventListener('DOMContentLoaded', function() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const backToTopButton = document.getElementById('back-to-top');
    const navigationDots = document.querySelectorAll('.dot');
    
    // List of all section IDs including the new 'timeline'
    const sections = ['home', 'about', 'skills', 'timeline', 'learning', 'projects', 'contact'];
    let currentSectionIndex = 0;
    const allSections = document.querySelectorAll('.section');
    let skillAnimationRun = false; // Flag to ensure skill animation runs only once
    let typewriterRun = false; // Flag to ensure typewriter animation runs only once

    // --- 0. SEQUENTIAL TYPEWRITER ANIMATION LOGIC ---

    // Get all paragraphs that need animation
    const animatedParagraphs = document.querySelectorAll('.about-text-content .animated-text');
    let currentParagraphIndex = 0;

    function typeWords(element, words, wordIndex = 0) {
        if (wordIndex < words.length) {
            element.textContent += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
            setTimeout(() => typeWords(element, words, wordIndex + 1), 
                words[wordIndex].length > 8 ? 150 : 100);
        } else {
            element.style.borderRight = 'none';
            currentParagraphIndex++;
            setTimeout(() => runSequentialTypewriter(), 300);
        }
    }

    function runSequentialTypewriter() {
        if (typewriterRun || currentParagraphIndex >= animatedParagraphs.length) {
            if (currentParagraphIndex >= animatedParagraphs.length) typewriterRun = true;
            return;
        }
        
        const element = animatedParagraphs[currentParagraphIndex];
        const text = element.getAttribute('data-text');
        const words = text.split(' ');
        
        element.textContent = '';
        element.style.borderRight = '2px solid var(--color-text-primary)';
        
        typeWords(element, words);
    }
    
    // --- 1. THEME SWITCHING LOGIC ---
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    applyTheme(currentTheme);
    updateActiveThemeButton(currentTheme);
    
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.dataset.theme;
            applyTheme(theme);
            updateActiveThemeButton(theme);
            localStorage.setItem('theme', theme);
            showNotification(`Theme changed to ${theme}`);
        });
    });
    
    function applyTheme(theme) {
        document.body.classList.remove('theme-dark', 'theme-forest', 'theme-sunshine', 'theme-purple');
        
        if (theme !== 'light') {
             document.body.classList.add(`theme-${theme}`);
        }
    }
    
    function updateActiveThemeButton(theme) {
        themeButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.theme === theme);
        });
    }

    // --- 2. SMOOTH SCROLLING & NAVIGATION ---
    
    const navBar = document.querySelector('.nav-bar');
    const navBarOffset = navBar ? navBar.offsetHeight : 80;

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - navBarOffset, 
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navigation dots click handler
    navigationDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const sectionId = dot.dataset.section;
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                 window.scrollTo({
                    top: targetSection.offsetTop - navBarOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    function updateActiveDot(sectionId) {
        navigationDots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.section === sectionId);
        });
        currentSectionIndex = sections.indexOf(sectionId);
    }

    // --- 3. SCROLL, ANIMATION & OBSERVER LOGIC (OPTIMIZED) ---
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', 
        threshold: 0.3 
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Animate Section Fade-in 
                entry.target.style.opacity = '1';
                entry.target.style.transition = 'opacity 0.8s ease-out';
                
                // Animate skill bars when skills section is visible (only once)
                if (sectionId === 'skills' && !skillAnimationRun) {
                    animateSkillBars();
                    skillAnimationRun = true; 
                }

                // Run sequential typewriter when about section is visible (only once)
                if (sectionId === 'about' && !typewriterRun) {
                  runSequentialTypewriter();
                }
                
                // Update navigation dots
                updateActiveDot(sectionId);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    allSections.forEach(section => {
        observer.observe(section);
    });
    
    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            
            // Use requestAnimationFrame for smooth visual update
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    bar.style.width = `${progress}%`;
                });
            });
        });
    }

    // Back to top button functionality
    window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('visible', window.scrollY > 300);
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // --- 4. TOUCH/KEYBOARD NAVIGATION ---
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    function handleTouchStart(e) {
      touchStartX = e.changedTouches[0].screenX;
    }
    
    function handleTouchEnd(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }
    
    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swipe left - next section
          navigateToSection(currentSectionIndex + 1);
        } else {
          // Swipe right - previous section
          navigateToSection(currentSectionIndex - 1);
        }
      }
    }
    
    function navigateToSection(index) {
      if (index >= 0 && index < sections.length) {
        currentSectionIndex = index;
        const targetSection = document.getElementById(sections[index]);
        if (targetSection) {
          window.scrollTo({ top: targetSection.offsetTop - navBarOffset, behavior: 'smooth' });
          updateActiveDot(sections[index]);
        }
      }
    }

    // Keyboard navigation (Left/Right Arrows)
    document.addEventListener('keydown', (e) => {
      // Prevent navigation if an input field is focused (like the comment box)
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
          return;
      }
      
      if (e.key === 'ArrowRight') {
        navigateToSection(currentSectionIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        navigateToSection(currentSectionIndex - 1);
      }
    });

    // --- 5. FLIP CARD TOUCH FUNCTIONALITY ---
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            card.classList.toggle('flipped');
        });
        
        card.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            card.classList.toggle('flipped');
        });
    });
});

// --- GLOBAL FUNCTIONS (Must be defined outside DOMContentLoaded) ---

// WhatsApp comment function (OPTIMIZED with button disabling)
function sendComment() {
  const comment = document.getElementById("comment").value.trim();
  const sendButton = document.querySelector('.dk-button');

  if (comment === "") {
    showNotification("Please type a comment first!");
    return;
  }
  
  sendButton.disabled = true; // Disable button to prevent double-clicks/spam

  const phoneNumber = "254723832126";
  const encodedMessage = encodeURIComponent(`Hello Daniel! 👋\n\nHere's my comment from your portfolio:\n"${comment}"`);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Open WhatsApp chat with pre-filled message
  window.open(url, "_blank");
  
  // Clear the comment field
  document.getElementById("comment").value = "";
  
  // Show success notification
  showNotification("Opening WhatsApp...");
  
  // Re-enable the button after a short delay
  setTimeout(() => {
    sendButton.disabled = false;
  }, 2000); 
}

// Custom notification function
function showNotification(message) {
  let notification = document.querySelector('.notification');
  
  if (!notification) {
      notification = document.createElement('div');
      notification.className = 'notification';
      document.body.appendChild(notification);
  }

  notification.textContent = message;
  notification.classList.remove('show');
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}