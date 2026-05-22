import React from 'react';
import { motion } from 'framer-motion';
import '../styles/hero.css';

export default function Hero() {
  const lineVars = {
    initial: { y: "100%", opacity: 0 },
    animate: (i) => ({
      y: "0%",
      opacity: 1,
      transition: { duration: 1.2, ease: [0.19, 1.0, 0.22, 1.0], delay: 0.1 * i }
    })
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        
        <h1 className="hero-heading">
          <div className="hero-line-mask">
            <motion.div className="hero-line" custom={1} variants={lineVars} initial="initial" animate="animate">
              FULL STACK DEVELOPER
            </motion.div>
          </div>
          <div className="hero-line-mask">
            <motion.div className="hero-line" custom={2} variants={lineVars} initial="initial" animate="animate">
              BUILDING <span className="hero-italic">CLEAN</span> WEB APPS
            </motion.div>
          </div>
          <div className="hero-line-mask">
            <motion.div className="hero-line" custom={3} variants={lineVars} initial="initial" animate="animate">
              WITH REACT, NODE & MONGODB.
            </motion.div>
          </div>
        </h1>

        <motion.p 
          className="hero-subtext"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Based in Mumbai. Focused on clean interfaces, reliable backend logic, and practical full-stack products.
        </motion.p>
        
      </div>
    </section>
  );
}
