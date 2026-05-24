import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/contact.css';

gsap.registerPlugin(ScrollTrigger);

// Awwwards-style Magnetic Button Interaction
const MagneticEmail = () => {
  const wrapRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    
    // Elastic physics using quickTo for buttery smooth movement
    const xTo = gsap.quickTo(wrap, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(wrap, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const xTextTo = gsap.quickTo(textRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTextTo = gsap.quickTo(textRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const mouseMove = (e) => {
      if (window.innerWidth <= 768) return; // Disable on mobile
      const { clientX, clientY } = e;
      const { height, width, left, top } = wrap.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Wrap pulls strongly to mouse
      xTo(x * 0.4);
      yTo(y * 0.4);
      // Text pulls slightly less to create a 3D parallax effect inside the button
      xTextTo(x * 0.15);
      yTextTo(y * 0.15);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
      xTextTo(0);
      yTextTo(0);
    };

    wrap.addEventListener("mousemove", mouseMove);
    wrap.addEventListener("mouseleave", mouseLeave);
    
    return () => {
      wrap.removeEventListener("mousemove", mouseMove);
      wrap.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return (
    <a href="mailto:dhruvguptaa42@gmail.com" className="magnetic-email" ref={wrapRef}>
      <span className="magnetic-email-text" ref={textRef}>dhruvguptaa42@gmail.com</span>
    </a>
  );
};

export default function Contact() {
  const containerRef = useRef(null);
  const [time, setTime] = useState('');

  // Live Clock (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istTime = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: true });
      setTime(`${istTime} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Staggered Character Reveal & Massive Footer Parallax
  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Staggered characters for "LET'S CREATE TOGETHER"
      gsap.from(".contact-char", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.02,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      // 2. Subtle reveal for the footer signoff
      gsap.from(".contact-signoff", {
        y: 40,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".contact-signoff",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Pure React text splitting to avoid buggy GSAP plugins
  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="contact-char" style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section className="contact-section" id="contact" ref={containerRef}>
      
      <div className="contact-main">
        <h2 className="contact-huge-title">
          <div className="contact-line-mask">{splitText("LET'S")}</div>
          <div className="contact-line-mask italic-red indent">{splitText("CREATE")}</div>
          <div className="contact-line-mask">{splitText("TOGETHER.")}</div>
        </h2>
      </div>

      <div className="contact-bottom">
        
        <div className="contact-email-wrapper">
          <MagneticEmail />
        </div>

        <div className="contact-footer">
          <div className="footer-col">
            <span className="footer-label">LOCAL TIME</span>
            <span className="footer-value">{time}</span>
          </div>
          
          <div className="footer-col socials">
            <a href="https://www.instagram.com/dhruvaintguilty?igsh=MWpmMzMwZW1zanp1NA==#" target="_blank" rel="noreferrer">INSTAGRAM ↗</a>
            <a href="https://www.linkedin.com/in/dhruv-gupta-b921a9376?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
            <a href="https://github.com/dhruv-gupta42" target="_blank" rel="noreferrer">GITHUB ↗</a>
          </div>

          <div className="footer-col right">
            <span className="footer-label">BASED IN</span>
            <span className="footer-value">MUMBAI, IND</span>
          </div>
        </div>

      </div>

      <div className="contact-signoff">
        <div className="signoff-brand">
          <h3>DHRUV GUPTA</h3>
          <p>Creative Developer based in Mumbai</p>
        </div>

        <div className="signoff-availability">
          <span>AVAILABLE FOR WORK</span>
          <p>Full-time roles and freelance projects</p>
        </div>

        <div className="signoff-links">
          <a href="https://github.com/dhruv-gupta42" target="_blank" rel="noreferrer" data-cursor="OPEN">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/dhruv-gupta-b921a9376" target="_blank" rel="noreferrer" data-cursor="OPEN">
            LinkedIn
          </a>
          <a href="mailto:dhruv.gupta@gmail.com" data-cursor="EMAIL">
            Email
          </a>
        </div>
      </div>

    </section>
  );
}
