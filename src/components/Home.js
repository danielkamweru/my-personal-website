import React from 'react';
import profileImage from '../../public/profile.jpg';

const Home = () => {
  return (
    <section id="home" className="section">
      <div className="home-content">
        <div className="home-text">
          <div style={{marginBottom: '30px'}}>
            <div style={{fontSize: '2em', marginBottom: '10px'}}>🚀</div>
            <h3>Welcome to my digital space!</h3>
            <p>Where creativity meets code and ideas come to life</p>
          </div>
          
          <h1 className="animate-text">
            I'M A
            <span className="role">
              <div className="role-words">
                <span>CODER</span>
                <span>DEVELOPER</span>
                <span>PROGRAMMER</span>
              </div>
            </span>
          </h1>
          <p style={{fontSize: '1.2em', margin: '20px 0', fontWeight: 300}}>Crafting digital solutions with passion and precision</p>
          
          <div style={{display: 'flex', gap: '20px', margin: '30px 0', flexWrap: 'wrap'}}>
            <div style={{textAlign: 'center'}}>
              <span style={{fontSize: '2em', fontWeight: 'bold', color: 'var(--color-accent-primary)'}}>2+</span>
              <div>Projects Built</div>
            </div>
            <div style={{textAlign: 'center'}}>
              <span style={{fontSize: '2em', fontWeight: 'bold', color: 'var(--color-accent-primary)'}}>100%</span>
              <div>Passion Driven</div>
            </div>
            <div style={{textAlign: 'center'}}>
              <span style={{fontSize: '2em', fontWeight: 'bold', color: 'var(--color-accent-primary)'}}>24/7</span>
              <div>Learning Mode</div>
            </div>
          </div>
          
          <div>
            <span className="cta-button primary">View My Work</span>
            <span className="cta-button secondary">Get In Touch</span>
          </div>
        </div>
        
        <div className="home-image">
          <div className="developer-illustration">
            <img src={profileImage} alt="Daniel Kamweru - Software Engineer" className="engineer-photo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;