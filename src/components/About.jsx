import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".about-fade-up", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">
        
        <div className="about-grid">
          
          <div className="about-left about-fade-up">
            <h2 className="about-title">ABOUT THE DEVELOPER</h2>
            <div className="about-status">
              <span className="status-dot"></span> OPEN TO WORK
            </div>
          </div>

          <div className="about-right about-fade-up">
            <p className="about-paragraph">
              I am a full stack developer with 3 years of experience building practical web applications with React, Node, Express, and MongoDB.
            </p>
            <p className="about-paragraph">
              I like working on products that combine clean interfaces with useful logic: dashboards, finance tools, AI-assisted workflows, and web apps that feel sharp from the first click.
            </p>
            <p className="about-paragraph">
              Currently, I am focused on building stronger full-stack projects, improving frontend motion, and looking for roles where I can ship reliable user-facing products.
            </p>
            
            <div className="about-stats-grid">
              <div className="stat-box">
                <span className="stat-label">LOCATION</span>
                <span className="stat-value">Mumbai, IND</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">EXPERIENCE</span>
                <span className="stat-value">3 Years</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">ROLE</span>
                <span className="stat-value">Full Stack Developer</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">CURRENTLY</span>
                <span className="stat-value">Open to opportunities</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
