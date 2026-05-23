import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import financeTrackerPreview from '../assets/finance-tracker-preview.svg';
import resumeInterviewerPreview from '../assets/resume-interviewer-preview.svg';
import cyberlabPreview from '../assets/cyberlab-preview.svg';
import '../styles/projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    no: '01',
    name: 'FINANCE TRACKER',
    role: 'Solo Full-Stack Developer',
    description: 'A personal finance dashboard for tracking income, expenses, balances, and category-wise spending with a clean interface and useful analytics.',
    problem: 'Managing income, expenses, and category-level spending needs a dashboard that is quick to read and easy to update.',
    build: 'Built a full-stack finance tracker with transaction management, balance summaries, spending breakdowns, and a clean analytics-focused interface.',
    stack: ['Vite', 'React', 'MongoDB', 'Render'],
    highlights: ['Clean dashboard UI', 'Transaction management', 'Spending analytics'],
    live: 'https://financeetrackerr.netlify.app/',
    github: 'https://github.com/dhruv-gupta42/Finance-Tracker',
    img: financeTrackerPreview,
    accent: 'green',
    titleClass: 'title-boost',
  },
  {
    no: '02',
    name: 'AI RESUME INTERVIEWER',
    role: 'Solo Full-Stack Developer',
    description: 'An AI-powered interview preparation app that reads a user resume, asks tailored interview questions, and helps users practice with structured results.',
    problem: 'Generic interview practice often misses the exact skills and experience listed on a candidate resume.',
    build: 'Built an AI resume interviewer that generates resume-based questions, stores practice sessions, and lets users download their results.',
    stack: ['Vite', 'React', 'Render', 'Netlify', 'MongoDB'],
    highlights: ['Resume-based interview questions', 'Saved practice results', 'Downloadable results'],
    live: 'https://resumeinterviewer.netlify.app/',
    github: 'https://github.com/dhruv-gupta42/Resume-Interviewer',
    img: resumeInterviewerPreview,
    accent: 'red',
  },
  {
    no: '03',
    name: 'CYBERLAB SCANNER',
    role: 'Solo Full-Stack Developer',
    description: 'A cybersecurity dashboard for real-time network and port scanning, local device discovery, scan history, risk analytics, and downloadable security reports.',
    problem: 'Network scan results can be hard to review when terminal output, risk level, history, and reports live in separate places.',
    build: 'Built a cybersecurity dashboard that runs Nmap-powered scans, discovers local devices, ranks risk, tracks history, and exports security reports.',
    stack: ['Vite', 'React', 'MongoDB', 'Render', 'Netlify'],
    highlights: ['Nmap-powered scanning', 'Local network device discovery', 'Downloadable security reports'],
    live: 'https://cyberlabscanner.netlify.app/',
    github: 'https://github.com/dhruv-gupta42/CyberLab',
    img: cyberlabPreview,
    accent: 'cyan',
  },
];

export default function Projects() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.project-panel');
      gsap.from('.project-reveal', {
        y: 70,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });

      panels.forEach((panel) => {
        const bg = panel.querySelector('.project-panel-bg');
        const content = panel.querySelector('.project-panel-content');

        gsap.fromTo(
          bg,
          { yPercent: -12, scale: 1.12 },
          {
            yPercent: 12,
            scale: 1.04,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );

        gsap.from(content, {
          y: 70,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 68%',
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-parallax-section" id="projects" ref={containerRef}>
      
      <div className="projects-parallax-header project-reveal">
        <h2>SELECTED WORKS</h2>
        <p>[ {projects.length.toString().padStart(2, '0')} / 03 ]</p>
      </div>

      <div className="projects-parallax-list">
        {projects.map((proj, i) => (
          <article
            className={`project-panel accent-${proj.accent} project-reveal`}
            key={proj.no}
          >
            <img className="project-panel-bg" src={proj.img} alt="" aria-hidden="true" />
            <div className="project-panel-overlay" aria-hidden="true"></div>

            <div className="project-panel-content">
              <div className="project-panel-top">
                <span className="project-panel-no">({proj.no})</span>
                <span className="project-panel-role">{proj.role}</span>
              </div>

              <div className="project-panel-main">
                <div>
                  <h3 className={`project-panel-title ${proj.titleClass || ''}`}>{proj.name}</h3>
                  <p className="project-panel-description">{proj.description}</p>
                </div>
              </div>

              <div className="project-panel-bottom enhanced">
                <div className="project-panel-meta">
                  <span>PROBLEM</span>
                  <p>{proj.problem}</p>
                </div>
                <div className="project-panel-meta">
                  <span>WHAT I BUILT</span>
                  <p>{proj.build}</p>
                </div>
                <div className="project-panel-meta">
                  <span>STACK</span>
                  <p>{proj.stack.join(' / ')}</p>
                </div>
                <div className="project-panel-meta">
                  <span>KEY FEATURES</span>
                  <p>{proj.highlights.join(' / ')}</p>
                </div>

                <div className="project-panel-actions">
                  <a href={proj.live} target="_blank" rel="noreferrer" data-cursor="OPEN">
                    Live Site
                  </a>
                  <a href={proj.github} target="_blank" rel="noreferrer" data-cursor="CODE">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}
