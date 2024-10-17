"use client"
import { useState, useEffect } from 'react';

const ScrollButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 1000);

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };

  const handleScroll = () => {
    const threshold = 20;
    setIsVisible(window.scrollY > threshold);
  };

  const handleResize = () => {
    setIsWideScreen(window.innerWidth > 1000);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <button
      id="scrollBtn"
      onClick={scrollToTop}
      style={{
        display: isVisible ? 'block' : 'none',
        position: 'fixed',
        bottom: '20px',
        right: isWideScreen ? '20%' : '20px',
        background: 'var(--color-primary)',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'right 0.3s ease-in-out',
        zIndex: '999'
      }}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default ScrollButton;
