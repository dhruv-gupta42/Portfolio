import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/intro.css';

export default function Intro({ isVisible, onComplete }) {
  useEffect(() => {
    if (!isVisible) return;

    const timer = window.setTimeout(() => {
      onComplete();
    }, 4200);

    return () => window.clearTimeout(timer);
  }, [isVisible, onComplete]);

  const wordVars = {
    hidden: { y: '110%', opacity: 0 },
    visible: (i) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.25 + i * 0.12,
        ease: [0.19, 1, 0.22, 1],
      },
    }),
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          className="intro-screen"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="intro-noise" aria-hidden="true"></div>

          <motion.div
            className="intro-count"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            00 / DHRUV GUPTA
          </motion.div>

          <div className="intro-center">
            <p className="intro-kicker">PORTFOLIO EXPERIENCE</p>

            <h1 className="intro-title" aria-label="Creative developer">
              {['CREATIVE', 'DEVELOPER'].map((word, i) => (
                <span className="intro-title-mask" key={word}>
                  <motion.span
                    custom={i}
                    variants={wordVars}
                    initial="hidden"
                    animate="visible"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="intro-subtitle"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Building polished web interfaces with motion, clarity, and thoughtful engineering.
            </motion.p>

            <motion.button
              className="intro-enter"
              onClick={onComplete}
              data-cursor="ENTER"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.25 }}
            >
              Enter Portfolio
            </motion.button>
          </div>

          <div className="intro-footer">
            <span>MUMBAI, IND</span>
            <span>FULL-STACK / FRONTEND / CREATIVE WEB</span>
          </div>

          <motion.div
            className="intro-progress"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3.4, delay: 0.35, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.section>
      )}
    </AnimatePresence>
  );
}
