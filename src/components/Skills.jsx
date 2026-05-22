import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/skills.css';

gsap.registerPlugin(ScrollTrigger);

const stackGroups = [
  {
    title: 'FRONTEND',
    items: ['React', 'Vite', 'JavaScript'],
  },
  {
    title: 'BACKEND',
    items: ['Node', 'Express', 'MongoDB'],
  },
  {
    title: 'DEPLOYMENT',
    items: ['Netlify', 'Render'],
  },
  {
    title: 'FOCUS',
    items: ['Full-stack apps', 'Dashboards', 'AI tools'],
  },
];

const principles = [
  'Interfaces should feel direct, fast, and useful.',
  'Animations should support the product, not distract from it.',
  'Full-stack thinking makes frontend decisions sharper.',
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-reveal', {
        y: 70,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="skills-header skills-reveal">
        <span>(03)</span>
        <h2>STACK / METHOD</h2>
      </div>

      <div className="skills-grid">
        {stackGroups.map((group) => (
          <div className="skill-card skills-reveal" key={group.title}>
            <span>{group.title}</span>
            <div>
              {group.items.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="principles-strip">
        {principles.map((principle, index) => (
          <p className="skills-reveal" key={principle}>
            <span>0{index + 1}</span>
            {principle}
          </p>
        ))}
      </div>
    </section>
  );
}
