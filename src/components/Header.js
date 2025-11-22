import React from 'react';

const Header = ({ currentTheme, handleThemeChange }) => {
  return (
    <header className="header">
      <div className="logo">DKW</div>
      <h1>Hello Viewer! 👋</h1>
      <h2>I'm <span className="highlight">Daniel Kamweru</span></h2>
      <div className="theme-switcher">
        <button className={`theme-btn ${currentTheme === 'light' ? 'active' : ''}`} onClick={() => handleThemeChange('light')}>☀️</button>
        <button className={`theme-btn ${currentTheme === 'dark' ? 'active' : ''}`} onClick={() => handleThemeChange('dark')}>🌙</button>
        <button className={`theme-btn ${currentTheme === 'forest' ? 'active' : ''}`} onClick={() => handleThemeChange('forest')}>🌲</button>
        <button className={`theme-btn ${currentTheme === 'sunshine' ? 'active' : ''}`} onClick={() => handleThemeChange('sunshine')}>🌅</button>
        <button className={`theme-btn ${currentTheme === 'purple' ? 'active' : ''}`} onClick={() => handleThemeChange('purple')}>🔮</button>
      </div>
    </header>
  );
};

export default Header;