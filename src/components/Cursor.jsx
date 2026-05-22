import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const textRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('VIEW');
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let outerPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.set(innerRef.current, { x: mouse.x, y: mouse.y });
    };

    const ticker = gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.08, gsap.ticker.deltaRatio());
      outerPos.x += (mouse.x - outerPos.x) * dt;
      outerPos.y += (mouse.y - outerPos.y) * dt;
      gsap.set(outerRef.current, { x: outerPos.x, y: outerPos.y });
    });

    const onMouseDown = () => gsap.to([outerRef.current, innerRef.current], { scale: 0.8, duration: 0.1 });
    const onMouseUp = () => gsap.to([outerRef.current, innerRef.current], { scale: 1, duration: 0.1 });

    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, [data-cursor]');
      if (target) {
        setIsHovered(true);
        const cursorVal = target.dataset.cursor;
        if (cursorVal && cursorVal !== 'pointer') {
          setCursorText(cursorVal.toUpperCase());
        } else {
          setCursorText('VIEW');
        }
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);

    // Watch body class for dark section overlay
    const checkTheme = () => {
      setIsLight(document.body.classList.contains('cursor-light'));
    };
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      gsap.ticker.remove(ticker);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isHovered) {
      gsap.to(outerRef.current, { width: 80, height: 80, duration: 0.3, ease: 'power2.out' });
      gsap.to(textRef.current, { opacity: 1, duration: 0.3 });
    } else {
      gsap.to(outerRef.current, { width: 40, height: 40, duration: 0.3, ease: 'power2.out' });
      gsap.to(textRef.current, { opacity: 0, duration: 0.3 });
    }
  }, [isHovered]);

  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 768) {
        gsap.set([outerRef.current, innerRef.current], { display: 'none' });
      } else {
        gsap.set([outerRef.current, innerRef.current], { display: 'flex' });
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const ringColor = isLight ? 'var(--cream)' : 'var(--red)';
  const dotColor = 'var(--red)';
  const textColor = isLight ? 'var(--cream)' : 'var(--red)';

  return (
    <>
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: `1px solid ${ringColor}`,
          mixBlendMode: 'difference',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'border-color 0.3s ease'
        }}
      >
        <span
          ref={textRef}
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: '9px',
            color: textColor,
            opacity: 0,
            pointerEvents: 'none',
            transition: 'color 0.3s ease'
          }}
        >
          {cursorText}
        </span>
      </div>
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: dotColor,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
