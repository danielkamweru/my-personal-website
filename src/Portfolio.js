import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';

const Portfolio = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [flippedCards, setFlippedCards] = useState({});

  useEffect(() => {
    const style = document.createElement('style');
    // Remove the problematic inlined CSS and use external CSS file instead
    // The CSS will be imported normally
    document.head.appendChild(style);

    document.body.className = `theme-${currentTheme}`;

    return () => {
      document.head.removeChild(style);
    };
  }, [currentTheme]);

  const handleThemeChange = (theme) => {
    setCurrentTheme(theme);
    document.body.className = `theme-${theme}`;
  };

  const toggleFlip = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const sendComment = () => {
    const comment = document.getElementById("comment")?.value.trim();
    if (!comment) {
      alert("Please type a comment first!");
      return;
    }
    const phoneNumber = "254723832126";
    const encodedMessage = encodeURIComponent(`Hello Daniel! 👋\n\nHere's my comment from your portfolio:\n"${comment}"`);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(url, "_blank");
    document.getElementById("comment").value = "";
  };

  return (
    <div>
      <Header currentTheme={currentTheme} handleThemeChange={handleThemeChange} />
      <Navigation />
      <main>
        <Home />
        <About />
        {/* Other sections will be added here */}
      </main>
    </div>
  );
};

export default Portfolio;