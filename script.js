// Simplified and Fixed Theme Switching
document.addEventListener('DOMContentLoaded', function() {
  const themeButtons = document.querySelectorAll('.theme-btn');
  
  // Check for saved theme preference or default to light
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Apply theme immediately
  applyTheme(currentTheme);
  
  // Update active theme button
  updateActiveThemeButton(currentTheme);
  
  // Add click event to theme buttons
  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const theme = button.dataset.theme;
      applyTheme(theme);
      updateActiveThemeButton(theme);
      localStorage.setItem('theme', theme);
      showNotification(`Theme changed to ${theme}`);
    });
  });
  
  // Function to apply theme - Simplified and More Reliable
  function applyTheme(theme) {
    // Remove all theme classes
    document.body.classList.remove('theme-light', 'theme-dark', 'theme-forest', 'theme-sunshine', 'theme-purple');
    // Add the new theme class
    document.body.classList.add(`theme-${theme}`);
    
    // Force style recalculation
    void document.body.offsetWidth;
  }
  
  // Function to update active theme button
  function updateActiveThemeButton(theme) {
    themeButtons.forEach(button => {
      if (button.dataset.theme === theme) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
        updateActiveDot(targetId.substring(1));
      }
    });
  });
  
  // Touch/Swipe navigation
  let touchStartX = 0;
  let touchEndX = 0;
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];
  let currentSectionIndex = 0;
  
  // Add touch event listeners
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
        targetSection.scrollIntoView({ behavior: 'smooth' });
        updateActiveDot(sections[index]);
      }
    }
  }
  
  // Update active navigation dot
  function updateActiveDot(sectionId) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
      if (dot.dataset.section === sectionId) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    // Update current section index
    currentSectionIndex = sections.indexOf(sectionId);
  }
  
  // Navigation dots click handler
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const sectionId = dot.dataset.section;
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        updateActiveDot(sectionId);
      }
    });
  });
  
  // Update active dot on scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach((sectionId, index) => {
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          updateActiveDot(sectionId);
        }
      }
    });
  });
  
  // Add animation to elements when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Animate skill bars when skills section is visible
        if (entry.target.id === 'skills') {
          animateSkillBars();
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections
  const allSections = document.querySelectorAll('.section');
  allSections.forEach(section => {
    observer.observe(section);
  });
  
  // Back to top button functionality
  const backToTopButton = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      navigateToSection(currentSectionIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      navigateToSection(currentSectionIndex - 1);
    }
  });
});

// WhatsApp comment function
function sendComment() {
  const comment = document.getElementById("comment").value.trim();
  if (comment === "") {
    showNotification("Please type a comment first!");
    return;
  }

  const phoneNumber = "254723832126";
  const encodedMessage = encodeURIComponent(`Hello Daniel! 👋\n\nHere's my comment:\n"${comment}"`);
  const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Open WhatsApp chat with pre-filled message
  window.open(url, "_blank");
  
  // Clear the comment field
  document.getElementById("comment").value = "";
  
  // Show success notification
  showNotification("Opening WhatsApp...");
}

// Custom notification function
function showNotification(message) {
  // Remove existing notification if any
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.width = `${progress}%`;
  });
}

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
  .animate-in {
    animation: fadeInUp 0.6s ease forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);