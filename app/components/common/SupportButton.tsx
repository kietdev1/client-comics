"use client"
import SupportButtonProps from '@/app/models/common/SupportButtonProps';
import { setHistory } from '@/app/utils/HelperFunctions';
import React, { useState, useEffect, useRef } from 'react';

const SupportButton: React.FC<SupportButtonProps> = ({ prevLink, nextLink }) => {
  const [showControls, setShowControls] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [marginLeft, setMarginLeft] = useState('20px'); // Khởi tạo margin

  const previousBtnRef = useRef<any>(null);
  const nextBtnRef = useRef<any>(null);

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const handleScroll = () => {
    const threshold = 20;
    const distanceFromBottom = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
    setIsVisible(window.scrollY > threshold && distanceFromBottom > 2800);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        previousBtnRef.current?.click();
        break;
      case 'ArrowRight':
        nextBtnRef.current?.click();
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        const newMargin = `${window.innerWidth * 0.2}px`;
        if (window.innerWidth > 1000)
        {
          setMarginLeft(newMargin);
        }
      }
    };

    // Chỉ thêm event listener nếu window đã định nghĩa
    if (typeof window !== "undefined") {
      window.addEventListener('scroll', handleScroll);
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('resize', handleResize);

      handleResize(); // Để thiết lập giá trị ban đầu

      return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (showControls && !event.target) {
        setShowControls(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showControls]);

  return (
    <div style={{ position: 'fixed', bottom: '80px', left: marginLeft, zIndex: 999 }}>
      <div style={{ display: 'flex' }}>
        <button
          onClick={() => {
            setHistory(prevLink);
            window.location.href = prevLink;
          }}
          ref={isVisible && prevLink != null ? previousBtnRef : null}
          style={{
            display: (showControls && prevLink != null) ? 'inline-block' : 'none',
            background: 'var(--color-primary)',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '22px',
            cursor: 'pointer',
            transition: 'right 0.3s ease-in-out',
            zIndex: '999',
            marginRight: '10px'
          }}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <button
          onClick={() => {
            setHistory(nextLink);
            window.location.href = nextLink;
          }}
          ref={isVisible && nextLink != null ? nextBtnRef : null}
          style={{
            display: (showControls && nextLink != null) ? 'inline-block' : 'none',
            background: 'var(--color-primary)',
            color: 'white',
            padding: '10px 15px',
            border: 'none',
            borderRadius: '22px',
            cursor: 'pointer',
            transition: 'right 0.3s ease-in-out',
            zIndex: '999'
          }}
        >
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>
      <button
        id="scrollBtn"
        onClick={toggleControls}
        style={{
          display: isVisible ? 'block' : 'none',
          position: 'fixed',
          bottom: '20px',
          left: marginLeft,  // Sử dụng margin theo tỷ lệ pixel
          background: 'var(--color-primary)',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '22px',
          cursor: 'pointer',
          transition: 'right 0.3s ease-in-out',
          zIndex: '999'
        }}
      >
        <i className="far fa-life-ring"></i>
      </button>
    </div>
  );
};

export default SupportButton;