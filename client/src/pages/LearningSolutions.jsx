import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCode, FiZap, FiTrendingUp, FiCheckCircle,
  FiArrowRight, FiPhone, FiMail
} from 'react-icons/fi';
import './LearningSolutions.css';

// Use absolute backend URL in production to avoid ad blocker blocks on relative /api/* paths
const API_BASE = import.meta.env.VITE_API_URL || '';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: d, ease: [0.25, 0.1, 0.25, 1] } })
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

const programs = [
  {
    id: 'react',
    num: '01',
    title: 'React',
    category: 'Frontend',
    color: '#61dafb',
    desc: 'Build modern, scalable interfaces with React components, hooks, state management, and routing covered through real project work.',
    topics: ['JSX & component model', 'Hooks & custom hooks', 'State with Context & Zustand', 'React Router & lazy loading', 'Full project build'],
  },
  {
    id: 'javascript',
    num: '02',
    title: 'JavaScript',
    category: 'Core Language',
    color: '#FCD517',
    desc: "A deep, practical journey through modern JavaScript from ES6+ fundamentals to async patterns and browser APIs you'll actually use.",
    topics: ['ES6+ features & syntax', 'Promises & async/await', 'DOM & event handling', 'Modules & bundling', 'Project-based learning'],
  },
  {
    id: 'nodejs',
    num: '03',
    title: 'Node.js',
    category: 'Backend',
    color: '#68a063',
    desc: 'Move to the server side with Node.js and Express, REST APIs, database integration, auth, and deployment from scratch.',
    topics: ['Node core modules', 'Express.js & REST APIs', 'MongoDB / SQL integration', 'Auth & JWT', 'Environment & deployment'],
  },
  {
    id: 'svelte',
    num: '04',
    title: 'Svelte',
    category: 'Frontend',
    color: '#ff6b35',
    desc: "Learn Svelte's compiler-first approach, reactive, lightweight apps with far less code than traditional frameworks.",
    topics: ['Svelte reactivity model', 'Components & lifecycle', 'Stores & state', 'SvelteKit routing', 'Build & deploy'],
  },
  {
    id: 'vibecoding',
    num: '05',
    title: 'Vibe Coding',
    category: 'Modern Dev',
    color: '#a855f7',
    desc: "Learn to build with AI as your co-pilot, ship faster, debug smarter, and get comfortable in the AI-native development workflow.",
    topics: ['AI-assisted dev workflow', 'Prompt-driven generation', 'Reviewing AI output', 'Productivity tooling', 'AI pair programming'],
  },
  {
    id: 'prompt',
    num: '06',
    title: 'Prompt Engineering',
    category: 'AI Skills',
    color: '#ec4899',
    desc: 'Master the craft of writing effective prompts, get consistent, high-quality output from LLMs for work, business, and development.',
    topics: ['How LLMs work', 'Prompt patterns & structures', 'Chain-of-thought prompting', 'AI workflow automation', 'Real-world use cases'],
  },
  {
    id: 'sales',
    num: '07',
    title: 'Sales & Marketing',
    category: 'Business',
    color: '#22d3ee',
    desc: 'Practical skills in B2B/B2C selling, digital marketing, and customer psychology, for people who want results, not theory.',
    topics: ['Sales psychology', 'B2B prospecting & pipeline', 'Digital marketing basics', 'Content & personal branding', 'Negotiation & closing'],
  },
];

const whoItems = [
  { label: 'Students & fresh graduates', sub: 'Final year or recently out, build what employers actually want to see.' },
  { label: 'Working professionals', sub: 'Upskill on the side or pivot into a new tech or sales role.' },
  { label: 'Entrepreneurs & founders', sub: 'Understand AI, digital marketing, and modern dev to make sharper decisions.' },
  { label: 'Career changers', sub: 'Transitioning into software development, sales, or AI-related work.' },
];

const methodPoints = [
  { title: 'Start with the real thing', body: "No 'hello world' for weeks. We introduce real tools and real patterns from day one." },
  { title: 'Build while you learn', body: "Projects aren't homework, they're the main event. You learn by building something that works." },
  { title: 'Curriculum that matches jobs', body: "Topics are pulled from actual job requirements, so you're learning what companies hire for." },
  { title: 'Instructors who have done it', body: 'Sessions are led by people who have shipped real products, not just taught about them.' },
];

/* ─── Form ─── */
function LearningForm() {
  const [form, setForm] = useState({ fullName: '', collegeName: '', email: '', phone: '', course: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch(`${API_BASE}/api/learning`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: controller.signal,
      });
      clearTimeout(timer);
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setForm({ fullName: '', collegeName: '', email: '', phone: '', course: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      clearTimeout(timer);
      setStatus('error');
      if (err.name === 'AbortError') {
        setErrorMsg('Request timed out. The server is taking too long — please try again.');
      } else {
        setErrorMsg('Unable to connect. Please try again or email us directly.');
      }
    }
  };

  return (
    <form className="ls-form" onSubmit={handleSubmit} noValidate>
      <div className="ls-form-row">
        <div className="ls-field">
          <label htmlFor="ls-fullName">Your name</label>
          <input id="ls-fullName" name="fullName" type="text" required placeholder="Full name"
            value={form.fullName} onChange={handleChange} />
        </div>
        <div className="ls-field">
          <label htmlFor="ls-collegeName">College / Institution <span className="optional">(optional)</span></label>
          <input id="ls-collegeName" name="collegeName" type="text" placeholder="Where you study or work"
            value={form.collegeName} onChange={handleChange} />
        </div>
      </div>
      <div className="ls-form-row">
        <div className="ls-field">
          <label htmlFor="ls-email">Email address</label>
          <input id="ls-email" name="email" type="email" required placeholder="you@email.com"
            value={form.email} onChange={handleChange} />
        </div>
        <div className="ls-field">
          <label htmlFor="ls-phone">Phone number</label>
          <input id="ls-phone" name="phone" type="tel" required placeholder="+91 9XXXXXXXXX"
            value={form.phone} onChange={handleChange} />
        </div>
      </div>
      <div className="ls-field">
        <label htmlFor="ls-course">Which program interests you?</label>
        <select id="ls-course" name="course" required value={form.course} onChange={handleChange}>
          <option value="">Pick a program</option>
          <option value="React">React</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Node.js">Node.js</option>
          <option value="Svelte">Svelte</option>
          <option value="Vibe Coding">Vibe Coding</option>
          <option value="Prompt Engineering">Prompt Engineering</option>
          <option value="Sales & Marketing">Sales & Marketing</option>
          <option value="Not sure yet">Not sure yet — help me choose</option>
        </select>
      </div>
      <div className="ls-field">
        <label htmlFor="ls-message">Anything you'd like us to know? <span className="optional">(optional)</span></label>
        <textarea id="ls-message" name="message" rows={3}
          placeholder="Your goals, questions, preferred schedule — anything helps."
          value={form.message} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary ls-submit" id="ls-submit" disabled={status === 'loading'}>
        {status === 'loading'
          ? <><span className="spinner" /> Sending…</>
          : <>Send my enquiry <FiArrowRight /></>}
      </button>
      {status === 'success' && (
        <div className="ls-alert ls-alert-ok" role="alert">
          <FiCheckCircle size={16} />
          <span>Done! We'll reach out within 24 hours to chat about the right program for you.</span>
        </div>
      )}
      {status === 'error' && (
        <div className="ls-alert ls-alert-err" role="alert">
          <span>⚠ {errorMsg}</span>
        </div>
      )}
    </form>
  );
}

/* ─── Page ─── */
export default function LearningSolutions() {
  const [active, setActive] = useState(programs[0].id);
  const activeProg = programs.find((p) => p.id === active);

  return (
    <main className="learning-page page-enter">

      {/* ── HERO ── */}
      <section className="ls-hero">
        <div className="ls-hero-glow" />
        <div className="ls-hero-grid" />
        <div className="container">
          <motion.div
            className="ls-hero-inner"
            initial="hidden" animate="visible" variants={stagger}
          >
            <motion.span className="ls-label" variants={fadeUp}>
              Wizaltia Learning Solutions
            </motion.span>
            <motion.h1 variants={fadeUp} custom={0.05}>
              Build skills that actually<br />
              <span className="text-yellow">get you hired</span>
            </motion.h1>
            <motion.p className="ls-hero-sub" variants={fadeUp} custom={0.1}>
              Hands-on training in technology and business taught by people who
              have worked in the industry, not just studied it.
            </motion.p>
            <motion.div className="ls-hero-chips" variants={fadeUp} custom={0.15}>
              {programs.map((p) => (
                <span key={p.id} className="ls-chip" style={{ '--c': p.color }}>
                  {p.title}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROGRAMS — tab + detail layout ── */}
      <section className="section ls-programs-section">
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.span className="eyebrow" variants={fadeUp}>Training Programs</motion.span>
            <motion.h2 className="ls-section-h2" variants={fadeUp} custom={0.05}>
              Seven programs. One place to start.
            </motion.h2>
          </motion.div>

          <motion.div
            className="ls-programs-layout"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Tab list */}
            <nav className="ls-tab-list" aria-label="Programs">
              {programs.map((p) => (
                <button
                  key={p.id}
                  className={`ls-tab${active === p.id ? ' ls-tab--active' : ''}`}
                  style={{ '--c': p.color }}
                  onClick={() => setActive(p.id)}
                  aria-selected={active === p.id}
                >
                  <span className="ls-tab-num">{p.num}</span>
                  <span className="ls-tab-title">{p.title}</span>
                  <span className="ls-tab-cat">{p.category}</span>
                </button>
              ))}
            </nav>

            {/* Detail panel */}
            <motion.div
              key={active}
              className="ls-detail"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              style={{ '--c': activeProg.color }}
            >
              <div className="ls-detail-top">
                <span className="ls-detail-num">{activeProg.num}</span>
                <div>
                  <span className="ls-detail-cat">{activeProg.category}</span>
                  <h3 className="ls-detail-title">{activeProg.title}</h3>
                </div>
              </div>
              <p className="ls-detail-desc">{activeProg.desc}</p>
              <div className="ls-topics">
                <span className="ls-topics-label">What you'll cover</span>
                <div className="ls-topics-list">
                  {activeProg.topics.map((t, i) => (
                    <div key={t} className="ls-topic-item">
                      <span className="ls-topic-idx">{String(i + 1).padStart(2, '0')}</span>
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <a href="#enquire" className="btn btn-primary ls-detail-cta">
                Enquire about {activeProg.title} <FiArrowRight />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── WHO SHOULD JOIN ── */}
      <section className="section ls-who-section">
        <div className="container">
          <div className="ls-who-layout">
            {/* Left: heading + profiles */}
            <motion.div
              initial="hidden" whileInView="visible"
              viewport={{ once: true, amount: 0.25 }} variants={stagger}
            >
              <motion.span className="eyebrow" variants={fadeUp}>Who Should Join</motion.span>
              <motion.h2 className="ls-section-h2" variants={fadeUp} custom={0.05}>
                These programs are<br />made for you if…
              </motion.h2>
              <motion.div className="ls-who-list" variants={stagger}>
                {whoItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="ls-who-item"
                    variants={fadeUp}
                    custom={i * 0.06}
                  >
                    <div className="ls-who-dot" />
                    <div>
                      <strong>{item.label}</strong>
                      <p>{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: methodology as prose */}
            <motion.div
              className="ls-method-col"
              initial="hidden" whileInView="visible"
              viewport={{ once: true, amount: 0.25 }} variants={stagger}
            >
              <motion.span className="eyebrow" variants={fadeUp}>How We Teach</motion.span>
              <motion.h2 className="ls-section-h2" variants={fadeUp} custom={0.05}>
                The way we run things
              </motion.h2>
              <motion.div className="ls-method-list" variants={stagger}>
                {methodPoints.map((m, i) => (
                  <motion.div key={m.title} className="ls-method-item" variants={fadeUp} custom={i * 0.07}>
                    <span className="ls-method-line" />
                    <div>
                      <h4>{m.title}</h4>
                      <p>{m.body}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ENROL ── */}
      <section className="section ls-enrol-section" id="enquire">
        <div className="container">
          <motion.div
            className="ls-enrol-layout"
            initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.15 }} variants={stagger}
          >
            {/* Left */}
            <div className="ls-enrol-left">
              <motion.span className="eyebrow" variants={fadeUp}>Enrol Today</motion.span>
              <motion.h2 className="ls-section-h2" variants={fadeUp} custom={0.05}>
                Interested? Let's talk.
              </motion.h2>
              <motion.p className="ls-enrol-body" variants={fadeUp} custom={0.1}>
                Drop us your details and we'll get back to you within a day to discuss
                the right program, timing, and format for where you are right now.
              </motion.p>
              <motion.div className="ls-enrol-reach" variants={fadeUp} custom={0.15}>
                <a href="tel:7845740611" className="ls-reach-item">
                  <FiPhone size={15} />
                  <span>+91 78457 40611</span>
                </a>
                <a href="tel:9380242884" className="ls-reach-item">
                  <FiPhone size={15} />
                  <span>+91 93802 42884</span>
                </a>
                <a href="mailto:info@wizaltia.com" className="ls-reach-item">
                  <FiMail size={15} />
                  <span>info@wizaltia.com</span>
                </a>
              </motion.div>
              <motion.p className="ls-enrol-note" variants={fadeUp} custom={0.2}>
                No spam. No automated replies. A real person from our team will be in touch.
              </motion.p>
            </div>

            {/* Right: form */}
            <motion.div className="ls-form-wrap" variants={fadeUp} custom={0.1}>
              <LearningForm />
            </motion.div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
