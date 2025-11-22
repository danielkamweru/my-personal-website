import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Apply dark theme immediately
    document.body.classList.add('theme-dark');
    
    // Initialize after component mounts
    setTimeout(() => {
      const themeButtons = document.querySelectorAll('.theme-btn');
      const backToTopButton = document.getElementById('back-to-top');
      const navigationDots = document.querySelectorAll('.dot');
      
      const sections = ['home', 'about', 'skills', 'timeline', 'learning', 'projects', 'contact'];
      let currentSectionIndex = 0;
      const allSections = document.querySelectorAll('.section');
      let skillAnimationRun = false;
      let typewriterRun = false;
  
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
      
      const currentTheme = 'dark';
      
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
          document.body.classList.remove('theme-light', 'theme-dark', 'theme-forest', 'theme-sunshine', 'theme-purple');
          document.body.classList.add(`theme-${theme}`);
      }
      
      function updateActiveThemeButton(theme) {
          themeButtons.forEach(button => {
              button.classList.toggle('active', button.dataset.theme === theme);
          });
      }
  
      const navBar = document.querySelector('.nav-bar');
      const navBarOffset = navBar ? navBar.offsetHeight : 80;
  
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
  
      const observerOptions = {
          root: null,
          rootMargin: '0px 0px -50px 0px', 
          threshold: 0.3 
      };
      
      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const sectionId = entry.target.id;
                  
                  entry.target.style.opacity = '1';
                  entry.target.style.transition = 'opacity 0.8s ease-out';
                  
                  if (sectionId === 'skills' && !skillAnimationRun) {
                      animateSkillBars();
                      skillAnimationRun = true; 
                  }
  
                  if (sectionId === 'about' && !typewriterRun) {
                    runSequentialTypewriter();
                  }
                  
                  updateActiveDot(sectionId);
              }
          });
      }, observerOptions);
      
      allSections.forEach(section => {
          observer.observe(section);
      });
      
      function animateSkillBars() {
          const skillBars = document.querySelectorAll('.skill-progress');
          skillBars.forEach(bar => {
              const progress = bar.getAttribute('data-progress');
              
              requestAnimationFrame(() => {
                  requestAnimationFrame(() => {
                      bar.style.width = `${progress}%`;
                  });
              });
          });
      }
  
      window.addEventListener('scroll', () => {
          if (backToTopButton) {
              backToTopButton.classList.toggle('visible', window.scrollY > 300);
          }
      });
      
      if (backToTopButton) {
          backToTopButton.addEventListener('click', () => {
              window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
              });
          });
      }
      
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
            navigateToSection(currentSectionIndex + 1);
          } else {
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
  
      document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }
        
        if (e.key === 'ArrowRight') {
          navigateToSection(currentSectionIndex + 1);
        } else if (e.key === 'ArrowLeft') {
          navigateToSection(currentSectionIndex - 1);
        }
      });
  
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
  
      window.sendComment = function() {
        const comment = document.getElementById("comment")?.value.trim();
        const sendButton = document.querySelector('.dk-button');
      
        if (!comment || comment === "") {
          showNotification("Please type a comment first!");
          return;
        }
        
        if (sendButton) sendButton.disabled = true;
      
        const phoneNumber = "254723832126";
        const encodedMessage = encodeURIComponent(`Hello Daniel! 👋\n\nHere's my comment from your portfolio:\n"${comment}"`);
        const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
        window.open(url, "_blank");
        
        const commentField = document.getElementById("comment");
        if (commentField) commentField.value = "";
        
        showNotification("Opening WhatsApp...");
        
        setTimeout(() => {
          if (sendButton) sendButton.disabled = false;
        }, 2000); 
      };
    }, 100);
  }, []);

  return (
    <div dangerouslySetInnerHTML={{
      __html: `
        <header class="header">
          <div class="logo">DKW</div>
          <h1>Hello Viewer! 👋</h1>
          <h2>I'm <span class="highlight">Daniel Kamweru</span></h2>
          <div class="theme-switcher">
            <button class="theme-btn" data-theme="light">☀️</button>
            <button class="theme-btn active" data-theme="dark">🌙</button>
            <button class="theme-btn" data-theme="forest">🌲</button>
            <button class="theme-btn" data-theme="sunshine">🌅</button>
            <button class="theme-btn" data-theme="purple">🔮</button>
          </div>
        </header>

        <nav class="nav-bar">
          <a href="#home" class="nav-link">Home</a>
          <a href="#about" class="nav-link">About</a>
          <a href="#skills" class="nav-link">Skills</a>
          <a href="#timeline" class="nav-link">Experience</a>
          <a href="#learning" class="nav-link">Learning</a> 
          <a href="#projects" class="nav-link">Projects</a>
          <a href="#contact" class="nav-link">Contact</a>
        </nav>

        <main>
          <section id="home" class="section">
            <div class="home-background">
              <div class="home-content">
                <div class="home-text">
                  <div class="welcome-message">
                    <div class="welcome-icon">🚀</div>
                    <h3 class="welcome-text">Welcome to my digital space!</h3>
                    <p class="welcome-subtitle">Where creativity meets code and ideas come to life</p>
                  </div>
                  
                  <h1 class="animate-text">
                    I'M A
                    <span class="role">
                      <div class="role-words">
                        <span>CODER</span>
                        <span>DEVELOPER</span>
                        <span>PROGRAMMER</span>
                      </div>
                    </span>
                  </h1>
                  <p class="home-description">Crafting digital solutions with passion and precision</p>
                  
                  <div class="intro-stats">
                    <div class="stat-item">
                      <span class="stat-number">2+</span>
                      <span class="stat-label">Projects Built</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-number">100%</span>
                      <span class="stat-label">Passion Driven</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-number">24/7</span>
                      <span class="stat-label">Learning Mode</span>
                    </div>
                  </div>
                  
                  <div class="cta-buttons">
                    <a href="#projects" class="cta-button primary">View My Work</a> 
                    <a href="#contact" class="cta-button secondary">Get In Touch</a>
                  </div>
                </div>
                
                <div class="home-image">
                  <div class="developer-illustration">
                    <img src="profile.jpg" alt="Daniel Kamweru - Software Engineer" class="engineer-photo">
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="about" class="section">
            <h2>About Me</h2>
            <div class="about-content">
              <div class="about-text">
                <div class="about-text-content">
                    <p class="animated-text" data-text="I'm passionate about software development and eager to create solutions that solve real-world problems — especially in agriculture and trading."></p>
                    <p class="animated-text" data-text="My journey into tech is driven by a desire to build functional and scalable applications. I thrive on challenges and believe that the best code is clean, efficient, and easy to maintain."></p>
                    <p class="animated-text" data-text="Currently, I'm deep into Full Stack Development at Moringa School, mastering both client-side interactivity with JavaScript/React and robust server-side architecture with Python and Python Flask. I'm constantly looking for ways to merge my technical skills with my sector interests, aiming to develop platforms that bring innovation to the agricultural and financial trading spaces."></p>
                </div>

                <div class="about-details">
                  <div class="detail-item">
                    <i class="fas fa-graduation-cap"></i>
                    <span>Full Stack Development Student</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>Nairobi, Kenya</span>
                  </div>
                  <div class="detail-item">
                    <i class="fas fa-heart"></i>
                    <span>Passionate about modern Tech</span>
                  </div>
                </div>
                <div class="download-cv">
                  <a href="cv.pdf" download class="cta-button primary">
                    <i class="fas fa-download"></i> Download CV
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="skills" class="section">
            <h2>My Skills</h2>
            <div class="skills-container">
              <div class="skill-item">
                <div class="skill-icon"><i class="fab fa-html5"></i></div>
                <h3>HTML</h3>
                <div class="skill-bar"><div class="skill-progress" data-progress="90"></div></div>
                <span class="skill-percentage">90%</span>
              </div>
              <div class="skill-item">
                <div class="skill-icon"><i class="fab fa-css3-alt"></i></div>
                <h3>CSS</h3>
                <div class="skill-bar"><div class="skill-progress" data-progress="85"></div></div>
                <span class="skill-percentage">85%</span>
              </div>
              <div class="skill-item">
                <div class="skill-icon"><i class="fab fa-js"></i></div>
                <h3>JavaScript</h3>
                <div class="skill-bar"><div class="skill-progress" data-progress="80"></div></div>
                <span class="skill-percentage">80%</span>
              </div>
              <div class="skill-item">
                <div class="skill-icon"><i class="fab fa-react"></i></div>
                <h3>React</h3>
                <div class="skill-bar"><div class="skill-progress" data-progress="75"></div></div>
                <span class="skill-percentage">75%</span>
              </div>
              <div class="skill-item">
                <div class="skill-icon"><i class="fab fa-python"></i></div>
                <h3>Python</h3>
                <div class="skill-bar"><div class="skill-progress" data-progress="70"></div></div>
                <span class="skill-percentage">70%</span>
              </div>
            </div>
          </section>
          
          <section id="timeline" class="section">
            <h2>My Journey</h2>
            <div class="timeline-container">
              <div class="timeline-item">
                <div class="timeline-date">Aug 2025 - Present</div>
                <div class="timeline-content">
                  <h3>🎓 Full Stack Development at Moringa School</h3>
                  <p>Intensive bootcamp focusing on modern web technologies including HTML5, CSS3, JavaScript ES6+, React, Python, and Flask. Building real-world projects and collaborating with fellow developers.</p>
                  <div class="timeline-skills">
                    <span class="skill-tag">JavaScript</span>
                    <span class="skill-tag">React</span>
                    <span class="skill-tag">Python</span>
                    <span class="skill-tag">Flask</span>
                  </div>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-date">Oct 2025</div>
                <div class="timeline-content">
                  <h3>💻 First Web Development Projects</h3>
                  <p>Created my first interactive web applications including a typing test game and collaborative group projects. Learned version control with Git and deployed applications to live servers.</p>
                  <div class="timeline-skills">
                    <span class="skill-tag">HTML/CSS</span>
                    <span class="skill-tag">JavaScript</span>
                    <span class="skill-tag">Git</span>
                    <span class="skill-tag">Deployment</span>
                  </div>
                </div>
              </div>
              
              <div class="timeline-item">
                <div class="timeline-date">Aug 2025</div>
                <div class="timeline-content">
                  <h3>🌱 Started Coding Journey</h3>
                  <p>Discovered my passion for programming and decided to pursue a career in software development. Began learning the fundamentals of web development and problem-solving through code.</p>
                  <div class="timeline-skills">
                    <span class="skill-tag">Problem Solving</span>
                    <span class="skill-tag">Logic Building</span>
                    <span class="skill-tag">Web Basics</span>
                  </div>
                </div>
              </div>
              
              <div class="timeline-item future">
                <div class="timeline-date">2026+</div>
                <div class="timeline-content">
                  <h3>🚀 Future Goals</h3>
                  <p>Seeking internship and junior developer opportunities to apply my skills in real-world projects. Excited to contribute to innovative solutions in agriculture and trading technology.</p>
                  <a href="#contact" class="cta-button primary">Let's Connect</a>
                </div>
              </div>
            </div>
          </section>
          
          <section id="learning" class="section">
            <h2>Current Learning at Moringa 🧑💻</h2>
            <p>I am actively expanding my Full Stack capabilities with the following technologies and concepts:</p>
            <div class="learning-container">
              <div class="learning-item flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <i class="fab fa-html5"></i>
                    <h3>HTML5</h3>
                  </div>
                  <div class="flip-card-back">
                    <h4>🏗️ Structure Master</h4>
                    <p>Building semantic, accessible web foundations with modern HTML5 elements and best practices.</p>
                    <span class="skill-level">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
              <div class="learning-item flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <i class="fab fa-css3-alt"></i>
                    <h3>CSS3</h3>
                  </div>
                  <div class="flip-card-back">
                    <h4>🎨 Style Wizard</h4>
                    <p>Crafting responsive designs, animations, and modern layouts with Flexbox & Grid.</p>
                    <span class="skill-level">⭐⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
              <div class="learning-item flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <i class="fab fa-js"></i>
                    <h3>JavaScript</h3>
                  </div>
                  <div class="flip-card-back">
                    <h4>⚡ Logic Engine</h4>
                    <p>ES6+, async/await, DOM manipulation, and interactive web experiences.</p>
                    <span class="skill-level">⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
              <div class="learning-item flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <i class="fab fa-python"></i>
                    <h3>Python / Flask</h3>
                  </div>
                  <div class="flip-card-back">
                    <h4>🐍 Backend Builder</h4>
                    <p>Creating lightweight APIs, web services, and server-side applications.</p>
                    <span class="skill-level">⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
              <div class="learning-item flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <i class="fas fa-database"></i>
                    <h3>PostgreSQL</h3>
                  </div>
                  <div class="flip-card-back">
                    <h4>🗄️ Data Architect</h4>
                    <p>Designing efficient schemas, queries, and managing relational data structures.</p>
                    <span class="skill-level">⭐⭐⭐</span>
                  </div>
                </div>
              </div>
              <div class="learning-item flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <i class="fab fa-react"></i>
                    <h3>React</h3>
                  </div>
                  <div class="flip-card-back">
                    <h4>⚛️ Component Creator</h4>
                    <p>Building dynamic UIs with hooks, state management, and modern React patterns.</p>
                    <span class="skill-level">⭐⭐⭐⭐</span>
                  </div>
                </div>
              </div>
              <div class="learning-item flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <i class="fas fa-cloud"></i>
                    <h3>Deployment</h3>
                  </div>
                  <div class="flip-card-back">
                    <h4>🚀 Launch Specialist</h4>
                    <p>Deploying applications to cloud platforms like Vercel, Netlify, and Heroku.</p>
                    <span class="skill-level">⭐⭐⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section id="projects" class="section">
            <h2>Projects</h2>
            <p>I've completed several projects using HTML, CSS, and JavaScript. Hover over a card to see the details!</p>
            <div class="project-cards">
              <div class="project-card">
                <div class="project-card-inner">
                  <div class="project-card-front">
                    <div class="project-image">
                      <img src="https://picsum.photos/seed/groupproject/400/250.jpg"  alt="Typing Test Project">
                    </div>
                    <div class="project-content">
                      <h3>Typing Test</h3>
                      <p>A web application to test and improve typing speed and accuracy.</p>
                      <div class="project-tech">
                        <span class="tech-tag">HTML</span>
                        <span class="tech-tag">CSS</span>
                        <span class="tech-tag">JavaScript</span>
                      </div>
                    </div>
                  </div>
                  <div class="project-card-back">
                    <h3>Typing Test Details ⌨️</h3>
                    <p>
                      **Concept:** Real-time DOM manipulation and pure JavaScript event handling. 
                      <br>
                      **Key Skill:** Demonstrated proficiency in vanilla JavaScript logic, state management, and WPM calculation.
                    </p>
                    <div class="project-links-group">
                      <a href="https://danielkamweru.github.io/my-typing-test-project/" target="_blank" class="cta-button primary project-link">
                        Live App <i class="fas fa-external-link-alt"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="project-card">
                <div class="project-card-inner">
                  <div class="project-card-front">
                    <div class="project-image">
                      <img src="https://picsum.photos/seed/projecttracker/400/250.jpg" alt="Project Tracker">
                    </div>
                    <div class="project-content">
                      <h3>Phase 2 Group Project</h3>
                      <p>Collaborative project showcasing teamwork and front-end development skills.</p>
                      <div class="project-tech">
                        <span class="tech-tag">HTML</span>
                        <span class="tech-tag">CSS</span>
                        <span class="tech-tag">JavaScript</span>
                      </div>
                    </div>
                  </div>
                  <div class="project-card-back">
                    <h3>Group Project Overview 🤝</h3>
                    <p>
                      **Concept:** Built a fully functional application with a team of developers.
                      <br>
                      **Key Skill:** Mastery of Git/GitHub workflows, effective component separation, and seamless API consumption.
                    </p>
                    <div class="project-links-group">
                      <a href="https://phase-2-group-project-swart.vercel.app" target="_blank" class="cta-button primary project-link">
                        Live App <i class="fas fa-external-link-alt"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" class="section">
            <h2>Contact Me</h2>
            <div class="socials">
              <a href="https://github.com/danielkamweru" target="_blank" class="social-link">
                <i class="fab fa-github"></i> GitHub
              </a>
              <a href="https://www.linkedin.com/in/daniel-kamweru-68670938b"  target="_blank" class="social-link">
                <i class="fab fa-linkedin"></i> LinkedIn
              </a>
              <a href="https://x.com/@KamweruDan47536" target="_blank" class="social-link">
                <i class="fab fa-x-twitter"></i> X (Twitter)
              </a>
              <a href="https://wa.me/254723832126?text=Hello%20Daniel!%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect." 
                 target="_blank" class="social-link">
                <i class="fab fa-whatsapp"></i> WhatsApp
              </a>
              <a href="mailto:kamwerudaniel5@gmail.com" class="social-link">
                <i class="fas fa-envelope"></i> Email
              </a>
            </div>
            
            <div class="comment-section">
              <h3>Leave a Comment 💬</h3>
              <p>Write your feedback or message below — it will open directly in my WhatsApp chat!</p>
              <textarea id="comment" placeholder="Type your comment here..." class="dk-input" rows="4"></textarea>
              <button class="dk-button" onclick="sendComment()">Send via WhatsApp</button>
            </div>
          </section>
        </main>

        <button id="back-to-top" class="back-to-top">
          <i class="fas fa-arrow-up"></i>
        </button>

        <div class="navigation-dots">
          <span class="dot active" data-section="home"></span>
          <span class="dot" data-section="about"></span>
          <span class="dot" data-section="skills"></span>
          <span class="dot" data-section="timeline"></span> 
          <span class="dot" data-section="learning"></span> 
          <span class="dot" data-section="projects"></span>
          <span class="dot" data-section="contact"></span>
        </div>

        <footer class="footer">
          <p>&copy; 2025 Daniel Kamweru. All rights reserved.</p>
          <div class="footer-socials">
            <a href="https://github.com/danielkamweru" target="_blank"><i class="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/daniel-kamweru-68670938b" target="_blank"><i class="fab fa-linkedin"></i></a>
            <a href="https://x.com/@KamweruDan47536" target="_blank"><i class="fab fa-x-twitter"></i>X</a>
            <a href="https://wa.me/254723832126" target="_blank"><i class="fab fa-whatsapp"></i></a>
            <a href="mailto:kamwerudaniel5@gmail.com"><i class="fas fa-envelope"></i></a>
          </div>
        </footer>
      `
    }} />
  );
}

export default App;