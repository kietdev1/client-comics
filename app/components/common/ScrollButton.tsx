"use client"
import { useState, useEffect } from 'react';

type ScrollButtonProps = {
  isContent?: boolean;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ isContent = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [marginRight, setMarginRight] = useState('20px');
  const [isContentInView, setIsContentInView] = useState(isContent);

  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };

  const handleScroll = () => {
    const threshold = 20;
    setIsVisible(window.scrollY > threshold);

    if (isContent) {
      const distanceFromBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      setIsContentInView(window.scrollY > threshold && distanceFromBottom > 2800);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const newMargin = `${(window.innerWidth * 0.2) * (window.innerWidth / 1200)}px`;
        if (window.innerWidth > 1000) {
          setMarginRight(newMargin);
        }
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <div
      id="scrollBtn"
      onClick={scrollToTop}
      style={{
        display: isVisible ? 'block' : 'none',
        position: 'fixed',
        bottom: '20px',
        right: isContentInView ? marginRight : '20px',
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
    </div>
  );
};

export default ScrollButton;
