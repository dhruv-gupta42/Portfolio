import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import '../styles/navbar.css';

const links = [
  { title: "HOME", href: "#" },
  { title: "ABOUT", href: "#about" },
  { title: "PROJECTS", href: "#projects" },
  { title: "CONTACT", href: "#contact" }
];

const MagneticButton = ({ children, onClick, isOpen }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.4, y: y * 0.4 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className="navbar-toggle"
      onClick={onClick}
      data-cursor="pointer"
    >
      <div className="navbar-toggle-inner">
        <motion.span 
          animate={{ top: isOpen ? "-100%" : "0%" }} 
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="navbar-toggle-text"
        >
          MENU
        </motion.span>
        <motion.span 
          animate={{ top: isOpen ? "0%" : "100%" }} 
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="navbar-toggle-text navbar-toggle-close"
        >
          CLOSE
        </motion.span>
      </div>
    </motion.button>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
  }, [isOpen]);

  const handleLinkEnter = (e) => {
    gsap.to(e.currentTarget.querySelector('.nav-link-title'), {
      x: 30,
      fontStyle: 'italic',
      color: 'var(--red)',
      duration: 0.4,
      ease: 'power3.out'
    });
    gsap.to(e.currentTarget.querySelector('.nav-link-index'), {
      x: 10,
      color: 'var(--cream)',
      duration: 0.4
    });
  };

  const handleLinkLeave = (e) => {
    gsap.to(e.currentTarget.querySelector('.nav-link-title'), {
      x: 0,
      fontStyle: 'normal',
      color: 'var(--coffee)',
      duration: 0.4,
      ease: 'power3.out'
    });
    gsap.to(e.currentTarget.querySelector('.nav-link-index'), {
      x: 0,
      color: 'var(--warm-grey)',
      duration: 0.4
    });
  };

  const onLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      if (window.lenis) {
        window.lenis.scrollTo(href, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 800); // wait for menu close animation
  };

  const menuVars = {
    initial: { clipPath: 'inset(0% 0% 100% 0%)' },
    animate: { 
      clipPath: 'inset(0% 0% 0% 0%)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    exit: { 
      clipPath: 'inset(100% 0% 0% 0%)',
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  const linkVars = {
    initial: { y: "100%", rotate: 5 },
    animate: (i) => ({
      y: "0%",
      rotate: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 + (i * 0.05) }
    }),
    exit: (i) => ({
      y: "-100%",
      rotate: -5,
      transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: i * 0.05 }
    })
  };

  return (
    <>
      {/* FIXED TOP BAR */}
      <div className="navbar-container">
        <a href="#" className="navbar-logo" data-cursor="pointer">
          Dhruv Gupta ©
        </a>
        
        <MagneticButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      </div>

      {/* FULL SCREEN MENU OVERLAY */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            className="navbar-menu-overlay"
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="navbar-menu-inner">
              <div className="navbar-links">
                {links.map((link, i) => (
                  <div className="nav-link-wrapper" key={i}>
                    <motion.a 
                      href={link.href}
                      className="nav-link"
                      onClick={(e) => onLinkClick(e, link.href)}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                      custom={i}
                      variants={linkVars}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      data-cursor="pointer"
                    >
                      <span className="nav-link-index">0{i + 1}</span>
                      <span className="nav-link-title">{link.title}</span>
                    </motion.a>
                  </div>
                ))}
              </div>

              <motion.div 
                className="navbar-footer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.8 } }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
              >
                <span>AVAILABLE FOR WORK</span>
                <span>MUMBAI, IND</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
