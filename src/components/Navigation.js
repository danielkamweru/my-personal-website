import React from 'react';

const Navigation = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <nav className="nav-bar">
      <span className="nav-link" onClick={() => scrollToSection('home')}>Home</span>
      <span className="nav-link" onClick={() => scrollToSection('about')}>About</span>
      <span className="nav-link" onClick={() => scrollToSection('skills')}>Skills</span>
      <span className="nav-link" onClick={() => scrollToSection('timeline')}>Experience</span>
      <span className="nav-link" onClick={() => scrollToSection('learning')}>Learning</span>
      <span className="nav-link" onClick={() => scrollToSection('projects')}>Projects</span>
      <span className="nav-link" onClick={() => scrollToSection('contact')}>Contact</span>
    </nav>
  );
};

export default Navigation;