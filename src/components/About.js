import React, { useEffect, useState } from 'react';

const About = () => {
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    const typewriterTexts = [
      "I'm passionate about software development and eager to create solutions that solve real-world problems — especially in agriculture and trading technology.",
      "My journey into tech is driven by a desire to build functional and scalable applications. I thrive on challenges and believe that the best code is clean, efficient, and easy to maintain.",
      "Currently, I'm deep into Full Stack Development at Moringa School, mastering both client-side interactivity with JavaScript/React and robust server-side architecture with Python and Flask.",
      "I'm constantly looking for ways to merge my technical skills with my sector interests, aiming to develop platforms that bring innovation to the agricultural and financial trading spaces."
    ];
    
    const typeWriter = (elementId, text, index = 0) => {
      const element = document.getElementById(elementId);
      if (!element) return;
      
      if (index < text.length) {
        element.textContent = text.substring(0, index + 1);
        setTimeout(() => typeWriter(elementId, text, index + 1), 50);
      } else {
        element.style.borderRight = 'none';
        setFlippedCards(prev => ({...prev, [`typing${elementId.split('-')[1]}`]: true}));
      }
    };
    
    const startTypewriter = () => {
      const typeNext = (index) => {
        if (index < typewriterTexts.length) {
          const elementId = `typewriter-${index + 1}`;
          typeWriter(elementId, typewriterTexts[index]);
          setTimeout(() => typeNext(index + 1), typewriterTexts[index].length * 50 + 1000);
        }
      };
      setTimeout(() => typeNext(0), 500);
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'about') {
          startTypewriter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) observer.observe(aboutSection);
    
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="section">
      <h2>About Me</h2>
      <div style={{maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '50px', alignItems: 'flex-start'}}>
        <div style={{flex: 2}}>
          <div style={{marginBottom: '30px'}}>
            <p id="typewriter-1" style={{minHeight: '25px', borderRight: flippedCards['typing1'] ? 'none' : '2px solid var(--color-accent-primary)', fontSize: '1.1em', lineHeight: 1.6}}></p>
            <p id="typewriter-2" style={{minHeight: '25px', borderRight: flippedCards['typing2'] ? 'none' : '2px solid var(--color-accent-primary)', fontSize: '1.1em', lineHeight: 1.6, marginTop: '20px'}}></p>
            <p id="typewriter-3" style={{minHeight: '25px', borderRight: flippedCards['typing3'] ? 'none' : '2px solid var(--color-accent-primary)', fontSize: '1.1em', lineHeight: 1.6, marginTop: '20px'}}></p>
            <p id="typewriter-4" style={{minHeight: '25px', borderRight: flippedCards['typing4'] ? 'none' : '2px solid var(--color-accent-primary)', fontSize: '1.1em', lineHeight: 1.6, marginTop: '20px'}}></p>
          </div>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', margin: '40px 0'}}>
            <div style={{padding: '15px 20px', backgroundColor: 'var(--color-bg-secondary)', borderLeft: '4px solid var(--color-accent-primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '15px'}}>
              <i className="fas fa-graduation-cap" style={{color: 'var(--color-accent-secondary)', fontSize: '1.5em'}}></i>
              <div>
                <strong>Education</strong>
                <div style={{fontSize: '0.9em', color: 'var(--color-text-secondary)'}}>Full Stack Development at Moringa School</div>
              </div>
            </div>
            <div style={{padding: '15px 20px', backgroundColor: 'var(--color-bg-secondary)', borderLeft: '4px solid var(--color-accent-primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '15px'}}>
              <i className="fas fa-map-marker-alt" style={{color: 'var(--color-accent-secondary)', fontSize: '1.5em'}}></i>
              <div>
                <strong>Location</strong>
                <div style={{fontSize: '0.9em', color: 'var(--color-text-secondary)'}}>Nairobi, Kenya</div>
              </div>
            </div>
            <div style={{padding: '15px 20px', backgroundColor: 'var(--color-bg-secondary)', borderLeft: '4px solid var(--color-accent-primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '15px'}}>
              <i className="fas fa-code" style={{color: 'var(--color-accent-secondary)', fontSize: '1.5em'}}></i>
              <div>
                <strong>Focus</strong>
                <div style={{fontSize: '0.9em', color: 'var(--color-text-secondary)'}}>Full Stack Web Development</div>
              </div>
            </div>
            <div style={{padding: '15px 20px', backgroundColor: 'var(--color-bg-secondary)', borderLeft: '4px solid var(--color-accent-primary)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '15px'}}>
              <i className="fas fa-heart" style={{color: 'var(--color-accent-secondary)', fontSize: '1.5em'}}></i>
              <div>
                <strong>Passion</strong>
                <div style={{fontSize: '0.9em', color: 'var(--color-text-secondary)'}}>AgriTech & Trading Solutions</div>
              </div>
            </div>
          </div>
          
          <div style={{marginTop: '40px', display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
            <a href="cv.pdf" download className="cta-button primary">
              <i className="fas fa-download"></i> Download CV
            </a>
            <span className="cta-button secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
              <i className="fas fa-envelope"></i> Get In Touch
            </span>
          </div>
        </div>
        
        <div style={{flex: 1, textAlign: 'center', position: 'relative'}}>
          <div style={{position: 'relative', width: '300px', height: '300px', margin: '0 auto', animation: 'float 4s ease-in-out infinite'}}>
            <img src="profile.jpg" alt="Daniel Kamweru" style={{width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', borderRadius: '50%', border: '8px double var(--color-accent-primary)', boxShadow: '0 10px 30px var(--color-shadow), 0 0 0 10px var(--color-bg-secondary)', transition: 'transform 0.3s'}} />
          </div>
          
          <div style={{marginTop: '30px', padding: '20px', backgroundColor: 'var(--color-card-bg)', borderRadius: '10px', boxShadow: '0 4px 10px var(--color-shadow)'}}>
            <h4 style={{color: 'var(--color-accent-primary)', marginBottom: '15px'}}>My Journey Stats</h4>
            <div style={{display: 'flex', justifyContent: 'space-around', textAlign: 'center'}}>
              <div>
                <div style={{fontSize: '1.5em', fontWeight: 'bold', color: 'var(--color-accent-primary)'}}>Aug 2025</div>
                <div style={{fontSize: '0.8em', color: 'var(--color-text-secondary)'}}>Started Coding</div>
              </div>
              <div>
                <div style={{fontSize: '1.5em', fontWeight: 'bold', color: 'var(--color-accent-primary)'}}>6+</div>
                <div style={{fontSize: '0.8em', color: 'var(--color-text-secondary)'}}>Technologies</div>
              </div>
              <div>
                <div style={{fontSize: '1.5em', fontWeight: 'bold', color: 'var(--color-accent-primary)'}}>AgriTech</div>
                <div style={{fontSize: '0.8em', color: 'var(--color-text-secondary)'}}>Focus Area</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;