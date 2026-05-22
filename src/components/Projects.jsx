import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import financeTrackerPreview from '../assets/finance-tracker-preview.svg';
import resumeInterviewerPreview from '../assets/resume-interviewer-preview.svg';
import '../styles/projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    no: '01',
    name: 'FINANCE TRACKER',
    role: 'Solo Full-Stack Developer',
    description: 'A personal finance dashboard for tracking income, expenses, balances, and category-wise spending with a clean interface and useful analytics.',
    stack: ['Vite', 'React', 'MongoDB', 'Render'],
    highlights: ['Clean dashboard UI', 'Transaction management', 'Spending analytics'],
    live: 'https://financeetrackerr.netlify.app/',
    github: 'https://github.com/dhruv-gupta42/Finance-Tracker',
    img: financeTrackerPreview,
    accent: 'green',
  },
  {
    no: '02',
    name: 'AI RESUME INTERVIEWER',
    role: 'Solo Full-Stack Developer',
    description: 'An AI-powered interview preparation app that reads a user resume, asks tailored interview questions, and helps users practice with structured results.',
    stack: ['Vite', 'React', 'Render', 'Netlify', 'MongoDB'],
    highlights: ['Resume-based interview questions', 'Saved practice results', 'Downloadable results'],
    live: 'https://resumeinterviewer.netlify.app/',
    github: 'https://github.com/dhruv-gupta42/Resume-Interviewer',
    img: resumeInterviewerPreview,
    accent: 'red',
  },
];

export default function Projects() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.project-reveal', {
        y: 80,
        opacity: 0,
        stagger: 0.16,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 72%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="awwwards-projects-section" id="projects" ref={containerRef}>
      
      <div className="awwwards-header project-reveal">
        <h2>SELECTED WORKS</h2>
        <p>[ {projects.length.toString().padStart(2, '0')} / 02 ]</p>
      </div>

      <div className="awwwards-list">
        {projects.map((proj, i) => (
          <div 
            className={`awwwards-row accent-${proj.accent} project-reveal`}
            key={proj.no}
          >
            <img className="awwwards-bg-img" src={proj.img} alt="" aria-hidden="true" />
            <div className="awwwards-bg-overlay" aria-hidden="true"></div>

            <div className="awwwards-row-content">
              <span className="awwwards-no">({proj.no})</span>
              <div className="awwwards-main">
                <h3 className="awwwards-title">{proj.name}</h3>
                <p className="awwwards-description">{proj.description}</p>
              </div>
              <span className="awwwards-role">{proj.role}</span>
            </div>

            <div className="awwwards-details">
              <div className="awwwards-meta">
                <span>STACK</span>
                <p>{proj.stack.join(' / ')}</p>
              </div>
              <div className="awwwards-meta">
                <span>HIGHLIGHTS</span>
                <p>{proj.highlights.join(' / ')}</p>
              </div>
              <div className="awwwards-actions">
                <a href={proj.live} target="_blank" rel="noreferrer" data-cursor="OPEN">
                  Live Site
                </a>
                <a href={proj.github} target="_blank" rel="noreferrer" data-cursor="CODE">
                  GitHub
                </a>
              </div>
            </div>
            
            {/* Mobile-only Image Fallback */}
            <div className="awwwards-mobile-img">
              <img src={proj.img} alt={proj.name} />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
