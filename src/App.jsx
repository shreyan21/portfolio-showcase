import { useEffect, useState } from 'react';
import ArrowDown from 'lucide-react/dist/esm/icons/arrow-down.mjs';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right.mjs';
import Box from 'lucide-react/dist/esm/icons/box.mjs';
import Check from 'lucide-react/dist/esm/icons/check.mjs';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right.mjs';
import Cloud from 'lucide-react/dist/esm/icons/cloud.mjs';
import Code2 from 'lucide-react/dist/esm/icons/code-2.mjs';
import Copy from 'lucide-react/dist/esm/icons/copy.mjs';
import Database from 'lucide-react/dist/esm/icons/database.mjs';
import GitBranch from 'lucide-react/dist/esm/icons/git-branch.mjs';
import Layers3 from 'lucide-react/dist/esm/icons/layers-3.mjs';
import Mail from 'lucide-react/dist/esm/icons/mail.mjs';
import MapPin from 'lucide-react/dist/esm/icons/map-pin.mjs';
import Menu from 'lucide-react/dist/esm/icons/menu.mjs';
import ShieldCheck from 'lucide-react/dist/esm/icons/shield-check.mjs';
import Terminal from 'lucide-react/dist/esm/icons/terminal.mjs';
import X from 'lucide-react/dist/esm/icons/x.mjs';
import portfolio from './data/portfolio.json';

const { profile, experience, certifications, skills, education } = portfolio;
const repository = `${profile.github}/CI-CD-project`;
const stages = [
  {
    title: 'Code', label: 'GitHub', icon: GitBranch,
    command: 'git push origin master',
    description: 'A commit to master starts the delivery workflow. Every change has a history.',
  },
  {
    title: 'Test & build', label: 'GitHub Actions', icon: Terminal,
    command: 'npm test → docker build',
    description: 'The workflow tests the backend health endpoint, then builds the frontend and backend images.',
  },
  {
    title: 'Package', label: 'Amazon ECR', icon: Box,
    command: 'docker push → Amazon ECR',
    description: 'Tagged application images are published to Amazon ECR, ready for the deployment step.',
  },
  {
    title: 'Deploy', label: 'Amazon EC2', icon: Cloud,
    command: 'SSM → EC2 → Docker Compose',
    description: 'Systems Manager tells EC2 to pull the images, update the containers and run database migrations.',
  },
];
const skillGroups = [
  { title: 'Cloud', caption: 'The infrastructure', icon: Cloud, categories: ['Cloud'] },
  { title: 'Systems & delivery', caption: 'The operating toolkit', icon: Terminal, categories: ['Systems', 'Containers', 'Version Control'] },
  { title: 'Applications & data', caption: 'What runs on top', icon: Database, categories: ['Backend', 'Data', 'APIs'] },
];
const projectTags = ['AWS', 'Docker', 'GitHub Actions', 'Node.js', 'PostgreSQL'];

function Github({ size = 18 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.72.4-1.22.71-1.5-2.5-.28-5.12-1.25-5.12-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.72 10.72 0 0 1 5.61 0c2.14-1.45 3.08-1.15 3.08-1.15.62 1.55.23 2.7.12 2.98.72.79 1.15 1.79 1.15 3.02 0 4.32-2.62 5.28-5.13 5.56.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" /></svg>;
}

function Linkedin({ size = 19 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="4.5" r="2" /><path d="M3.2 8.5h3.6V21H3.2zM10 8.5h3.5v1.7c.5-1 1.6-2 3.5-2 3.3 0 4.2 2.1 4.2 5.4V21h-3.6v-6.6c0-1.8-.3-3-1.9-3-1.8 0-2.1 1.4-2.1 3V21H10Z" /></svg>;
}

function DeliveryMap() {
  const [selected, setSelected] = useState(0);
  const stage = stages[selected];
  return (
    <div className="delivery-map">
      <div className="map-heading">
        <span className="map-project"><GitBranch size={15} /> CI-CD-project</span>
        <span className="map-caption">DELIVERY MAP</span>
      </div>
      <div className="map-intro">
        <p>One commit.<br /><span>Four connected steps.</span></p>
        <span className="map-mark" aria-hidden="true"><Layers3 size={32} strokeWidth={1.2} /></span>
      </div>
      <div className="pipeline" role="group" aria-label="Explore the project delivery workflow">
        {stages.map(({ title, label, icon: Icon }, index) => (
          <button
            key={title}
            type="button"
            className={`pipeline-step ${selected === index ? 'selected' : ''}`}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
          >
            <span className="step-number">0{index + 1}</span>
            <span className="step-icon"><Icon size={25} strokeWidth={1.6} /></span>
            <span className="step-title">{title}</span>
            <span className="step-label">{label}</span>
            <ChevronRight className="step-arrow" size={15} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="map-explanation" aria-live="polite" aria-atomic="true">
        <div className="map-command"><span aria-hidden="true">↳</span><code>{stage.command}</code></div>
        <p>{stage.description}</p>
      </div>
      <div className="map-footer"><span className="map-dot" /> Select a step to see how it works <ArrowUpRight size={14} /></div>
    </div>
  );
}

function SkillGroup({ group }) {
  const { title, caption, icon: Icon, categories } = group;
  return (
    <article className="skill-group">
      <div className="skill-heading"><span className="skill-icon"><Icon size={23} strokeWidth={1.6} /></span><div><h3>{title}</h3><p>{caption}</p></div></div>
      <ul className="skill-items">
        {skills.filter((skill) => categories.includes(skill.category)).map((skill) => (
          <li key={skill.name}><span>{skill.name}</span><small>{skill.level}</small></li>
        ))}
      </ul>
    </article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [skillFilter, setSkillFilter] = useState('All');
  const [emailCopied, setEmailCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setEmailCopied(true);
      setCopyMessage('Email address copied.');
    } catch {
      setCopyMessage('Select the email address to open your email app.');
    }
  }

  const shownGroups = skillFilter === 'All' ? skillGroups : skillGroups.filter((group) => group.title === skillFilter);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="nav-shell wrap">
          <a className="brand" href="#top" aria-label="Utkarsh, back to top">utkarsh<span>.</span><small>CLOUD & DEVOPS</small></a>
          <button type="button" className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button>
          <nav id="primary-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
            <a href="#work" onClick={() => setMenuOpen(false)}>The work</a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
            <a href="#toolkit" onClick={() => setMenuOpen(false)}>Toolkit</a>
            <a href="#contact" className="nav-contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={16} /></a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero">
          <div className="hero-grid wrap">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> HELLO, I’M UTKARSH SINGH RAJAWAT</p>
              <p className="hero-role">Application Support Engineer <span>→ Cloud & DevOps</span></p>
              <h1>A support mindset.<br /><span>A cloud direction.</span></h1>
              <p className="hero-description">I troubleshoot the systems people depend on.<br className="desktop-break" /> Now I’m building the cloud skills to make them better.</p>
              <p className="hero-detail">Production support at RSAC. Former Cognizant trainee.<br />Linux, APIs, PostgreSQL — now AWS, Docker and CI/CD.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">Explore my work <ArrowDown size={17} /></a>
                <a className="button button-quiet" href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={15} /></a>
              </div>
              <div className="hero-location"><MapPin size={14} /><span>{profile.location}</span><span className="meta-divider" /><span>Open to relocation</span></div>
            </div>
            <DeliveryMap />
          </div>
          <div className="hero-bottom wrap"><span>SUPPORT EXPERIENCE. ENGINEERING CURIOSITY.</span><a href="#experience">A little about my journey <ArrowDown size={14} /></a></div>
        </section>

        <div className="stack-band" aria-label="Core technologies"><div className="wrap stack-inner"><span className="stack-label">THE EVERYDAY TOOLKIT</span><span><Terminal size={19} /> Linux</span><span><Cloud size={20} /> AWS</span><span><Box size={19} /> Docker</span><span><GitBranch size={19} /> GitHub Actions</span><span><Database size={19} /> PostgreSQL</span></div></div>

        <section id="work" className="section wrap work-section">
          <div className="section-heading"><div><p className="eyebrow">SELECTED WORK</p><h2>Learning is good.<br />Shipping is better.</h2></div><p>A hands-on project connecting the application,<br className="desktop-break" /> the infrastructure and the delivery process.</p></div>
          <article className="featured-project">
            <div className="project-preview" aria-label="Portfolio project architecture">
              <div className="preview-top"><span><span className="small-square" /> PROJECT / PORTFOLIO DELIVERY</span><GitBranch size={17} /></div>
              <div className="architecture">
                <div className="architecture-layer"><span className="architecture-icon"><Code2 size={27} strokeWidth={1.5} /></span><div><strong>React + Nginx</strong><span>The interface</span></div><span className="layer-index">WEB</span></div>
                <div className="architecture-link"><span /> HTTP / REST <ArrowDown size={13} /></div>
                <div className="architecture-layer"><span className="architecture-icon"><Layers3 size={27} strokeWidth={1.5} /></span><div><strong>Node.js + Express</strong><span>The application</span></div><span className="layer-index">API</span></div>
                <div className="architecture-link"><span /> SQL QUERIES <ArrowDown size={13} /></div>
                <div className="architecture-layer"><span className="architecture-icon"><Database size={27} strokeWidth={1.5} /></span><div><strong>PostgreSQL</strong><span>The data</span></div><span className="layer-index">DB</span></div>
              </div>
              <div className="preview-bottom"><Box size={15} /> Containerized with Docker <span>→</span> Delivered to AWS</div>
            </div>
            <div className="project-copy">
              <span className="project-type">FLAGSHIP PROJECT <span /> CLOUD & DELIVERY</span>
              <h3>From a portfolio<br />to a delivery pipeline.</h3>
              <p>A React, Express and PostgreSQL application, packaged with Docker and delivered to AWS through GitHub Actions. The code is only part of the work; understanding how it reaches a server is the other.</p>
              <ul className="project-points"><li><Check size={16} /> Backend health endpoint tests before image builds</li><li><Check size={16} /> GitHub OIDC authentication and ECR image publishing</li><li><Check size={16} /> EC2 deployment through SSM, with command results</li></ul>
              <div className="project-tags">{projectTags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <a className="text-link" href={repository} target="_blank" rel="noopener noreferrer">Explore the source <ArrowUpRight size={18} /></a>
              <p className="project-note">Diagram shows the original full-stack project. This showcase runs independently.</p>
            </div>
          </article>
          <div className="work-footnote"><ShieldCheck size={18} /><span>Built to understand the whole path: write, test, package, deploy, verify.</span><a href={`${repository}/actions`} target="_blank" rel="noopener noreferrer">See the workflow <ArrowUpRight size={15} /></a></div>
        </section>

        <section id="experience" className="experience-section">
          <div className="wrap experience-layout">
            <div className="experience-intro"><p className="eyebrow">THE JOURNEY</p><h2>Where I learned<br />to ask “why?”</h2><p>Production support teaches you to follow the evidence. A log, a request, a query — each one helps explain what’s happening underneath.</p><div className="experience-note"><span className="note-symbol">↳</span><span>My approach<br /><strong>Reproduce. Investigate.<br />Fix. Verify.</strong></span></div></div>
            <div className="timeline">
              {experience.map((item, index) => (
                <article className={`experience-item ${index === 0 ? 'current-role' : ''}`} key={`${item.company}-${item.role}`}>
                  <div className="timeline-dot" />
                  <div className="experience-meta"><span>{item.period}</span>{index === 0 ? <span className="current-label">CURRENT</span> : <span>{index === 2 ? 'INTERNSHIP' : 'EARLY CAREER'}</span>}</div>
                  <h3>{item.role}</h3>{item.focus ? <p className="role-focus">{item.focus}</p> : null}<p className="company">{item.company}</p><p className="role-location"><MapPin size={12} />{item.location}</p>
                  <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="toolkit" className="section wrap toolkit-section">
          <div className="section-heading"><div><p className="eyebrow">THE TOOLKIT</p><h2>Tools with a purpose.</h2></div><p>What I work with, what I’m learning,<br className="desktop-break" /> and where it fits.</p></div>
          <div className="skill-filters" role="group" aria-label="Filter skills by area">{['All', ...skillGroups.map((group) => group.title)].map((filter) => <button key={filter} type="button" aria-pressed={skillFilter === filter} onClick={() => setSkillFilter(filter)}>{filter}</button>)}</div>
          <div className={`skills-layout ${shownGroups.length === 1 ? 'single-group' : ''}`} aria-live="polite">{shownGroups.map((group) => <SkillGroup key={group.title} group={group} />)}</div>
        </section>

        <section className="learning-section wrap" aria-labelledby="learning-title">
          <div className="learning-intro"><p className="eyebrow">STILL LEARNING</p><h2 id="learning-title">Curiosity is<br />part of the job.</h2><p>Courses, credentials and the next chapter.</p><div className="education"><h3>Education</h3>{education.map((item) => <div className="education-item" key={item.degree}><strong>{item.degree}</strong><span>{item.school}</span><small>{item.period}</small></div>)}</div></div>
          <ul className="credentials">{certifications.map((item) => { const inProgress = item.status === 'In progress'; return <li key={item.title}><span className={`credential-icon ${inProgress ? 'in-progress' : ''}`}>{inProgress ? <Cloud size={19} /> : <ShieldCheck size={19} />}</span><div className="credential-info">{item.url ? <a className="credential-title" href={item.url} target="_blank" rel="noopener noreferrer">{item.title}<ArrowUpRight size={13} /></a> : <span className="credential-title">{item.title}</span>}<small>{item.issuer}{item.issued ? ` · ${item.issued}` : ''}</small></div><span className={`credential-state ${inProgress ? 'learning' : ''}`}>{inProgress ? 'IN PROGRESS' : 'COMPLETED'}</span></li>; })}</ul>
        </section>

        <section id="contact" className="contact-section">
          <div className="wrap contact-layout"><div><p className="eyebrow">LET’S CONNECT</p><h2>The next chapter<br />starts with a hello<span>.</span></h2><p>I’m interested in cloud support and early-career DevOps opportunities.<br className="desktop-break" /> If that sounds like your team, I’d love to talk.</p><a className="button contact-button" href={`mailto:${profile.email}`}>Say hello <ArrowUpRight size={19} /></a></div><div className="contact-details"><span className="contact-label">FIND ME HERE</span><a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={19} /><span>LinkedIn<small>Experience & connections</small></span><ArrowUpRight size={18} /></a><a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={19} /><span>GitHub<small>Code & the work behind it</small></span><ArrowUpRight size={18} /></a><div className="email-row"><Mail size={19} /><a href={`mailto:${profile.email}`}>{profile.email}</a><button type="button" onClick={copyEmail} aria-label={emailCopied ? 'Email address copied' : 'Copy email address'}>{emailCopied ? <Check size={16} /> : <Copy size={16} />}</button></div><p className="copy-message" role="status">{copyMessage}</p></div></div>
          <footer className="wrap footer"><a className="footer-brand" href="#top">utkarsh<span>.</span></a><p>© {new Date().getFullYear()} {profile.name}</p><a href="#top">Back to top <ArrowUpRight size={14} /></a></footer>
        </section>
      </main>
    </>
  );
}

export default App;
