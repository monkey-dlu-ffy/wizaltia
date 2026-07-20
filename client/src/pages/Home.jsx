import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiUsers, FiSearch, FiGlobe, FiFileText,
  FiArrowRight, FiCheckCircle, FiTrendingUp,
  FiShield, FiZap, FiTarget, FiLayers,
  FiCode, FiBook
} from 'react-icons/fi';
import { AnimatedText } from '../components/AnimatedText';
import './Home.css';

/* ── Animation helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' }
  })
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

/* ── Data ── */
const hrServices = [
  {
    icon: <FiUsers />,
    title: 'General Staffing',
    desc: 'Rapidly deploy skilled contract and temporary professionals across functions without compromising on quality or speed.',
    link: '/hr-solutions#staffing'
  },
  {
    icon: <FiSearch />,
    title: 'Permanent Recruitment',
    desc: 'End-to-end talent acquisition, from sourcing to onboarding, focused on capability, culture fit, and long-term value.',
    link: '/hr-solutions#recruitment'
  },
  {
    icon: <FiGlobe />,
    title: 'HR Outsourcing & RPO',
    desc: 'Embed our recruitment specialists inside your business or outsource your entire hiring function with measurable outcomes.',
    link: '/hr-solutions#rpo'
  },
  {
    icon: <FiFileText />,
    title: 'Payroll & Compliance',
    desc: 'Accurate payroll processing, statutory compliance management, and employee records, handled with precision and confidentiality.',
    link: '/hr-solutions#payroll'
  }
];

const learningPrograms = [
  { icon: <FiCode />, title: 'React & JavaScript' },
  { icon: <FiCode />, title: 'Svelte' },
  { icon: <FiCode />, title: 'Node.js' },
  { icon: <FiZap />, title: 'Vibe Coding' },
  { icon: <FiTarget />, title: 'Prompt Engineering' },
  { icon: <FiTrendingUp />, title: 'Sales & Marketing' },
];

const whyChoose = [
  {
    number: '01',
    title: 'Structured Hiring Approach',
    desc: 'We define roles by outcome, not just title. Our Intake Mapping method ensures every hire is anchored in business impact.'
  },
  {
    number: '02',
    title: 'Large, Curated Talent Pool',
    desc: 'Broad reach across active and passive candidates, with two rounds of rigorous screening before any profile reaches your desk.'
  },
  {
    number: '03',
    title: 'Speed Without Compromise',
    desc: 'Fast turnarounds on shortlists, backed by structured evaluation, not gut-feel, so your decisions are both fast and confident.'
  },
  {
    number: '04',
    title: 'End-to-End Partnership',
    desc: 'From screening and negotiation to offer management and onboarding backup, we stay accountable through the full hiring journey.'
  }
];

const industries = [
  'Information Technology', 'Healthcare', 'Banking & Finance',
  'Manufacturing', 'Logistics & Supply Chain', 'Education',
  'Retail & FMCG', 'Real Estate', 'Pharmaceuticals', 'Startups'
];

const process = [
  { step: '01', title: 'Understand', desc: 'Deep-dive into your role requirements, team culture, and success metrics.' },
  { step: '02', title: 'Source', desc: 'Multi-channel outreach to active and passive candidates from a large, curated talent pool.' },
  { step: '03', title: 'Screen', desc: 'Two rounds of structured evaluation, we send only the most relevant, job-ready profiles.' },
  { step: '04', title: 'Deliver', desc: 'Manage offers, negotiate, and support onboarding, with ready backups if needed.' }
];

export default function Home() {
  return (
    <main className="home-page">
      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg-grid" />
        <div className="hero-glow" />
        <div className="container hero-inner">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.span className="eyebrow" variants={fadeUp} custom={0}>
              HR Solutions · Learning Solutions
            </motion.span>
            <motion.h1 variants={fadeUp} custom={0.1}>
              Building Teams That{' '}
              <span className="text-yellow">Drive Real Business</span>{' '}
              Outcomes
            </motion.h1>
            <motion.p className="hero-subtitle" variants={fadeUp} custom={0.2}>
              Wizaltia HR Solutions is your strategic workforce partner, delivering structured recruitment,
              HR outsourcing, payroll compliance, and industry-focused technology training from Salem, Tamil Nadu.
            </motion.p>
            <motion.div className="hero-actions" variants={fadeUp} custom={0.3}>
              <Link to="/hr-solutions" className="btn btn-primary btn-lg">
                Explore HR Services <FiArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-ghost btn-lg">
                Get in Touch
              </Link>
            </motion.div>
            <motion.div className="hero-tags" variants={fadeUp} custom={0.4}>
              {['General Staffing', 'Permanent Recruitment', 'RPO', 'Payroll', 'Tech Training'].map(tag => (
                <span key={tag} className="hero-tag"><FiCheckCircle size={12} /> {tag}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* Animated SVG Globe / Grid Decoration */}
          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-card-stack">
              <div className="hero-stat-card">
                <span className="stat-icon"><FiUsers size={20} /></span>
                <span className="stat-label">Active Talent Pool</span>
                <span className="stat-value text-yellow">Large &amp; Curated</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-icon"><FiLayers size={20} /></span>
                <span className="stat-label">Services Offered</span>
                <span className="stat-value text-yellow">HR + Learning</span>
              </div>
              <div className="hero-stat-card">
                <span className="stat-icon"><FiShield size={20} /></span>
                <span className="stat-label">Screening Rounds</span>
                <span className="stat-value text-yellow">2× Per Profile</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="scroll-dot" />
        </motion.div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="who-section">
        {/* Decorative background elements */}
        <div className="who-bg-orb who-bg-orb--left" />
        <div className="who-bg-orb who-bg-orb--right" />
        <div className="who-bg-grid" />

        <div className="who-inner">
          {/* ── LEFT: content column ── */}
          <motion.div
            className="who-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
          >
            <motion.span className="eyebrow" variants={fadeUp}>Who We Are</motion.span>

            {/* AnimatedText for the headline */}
            <motion.div variants={fadeUp} custom={0.05} className="who-headline-wrap">
              <AnimatedText
                text="People challenges"
                as="h2"
                textClassName="who-anim-text"
                underlineGradient="linear-gradient(90deg,#FCD517 0%,#ff9900 70%,transparent 100%)"
                underlineHeight="4px"
                underlineOffset="-4px"
                duration={0.035}
                delay={0.04}
              />
              <span className="who-headline-sub">are our <span className="text-yellow">specialty</span></span>
            </motion.div>

            <motion.p variants={fadeUp} custom={0.2} className="who-lead">
              At Wizaltia, we help partner clients overcome their people challenges.
              The talent acquisition landscape is more demanding than ever, riddled with irrelevant
              profiles, tricky scheduling, and the constant juggling of interviews and follow-ups.
            </motion.p>
            <motion.p variants={fadeUp} custom={0.28} className="who-body">
              From screening to negotiation, offer management, and onboarding, we stay accountable
              every step of the way. Dropout? We have a backup ready.
            </motion.p>
            <motion.p variants={fadeUp} custom={0.34} className="who-body">
              Our recruiters use a smart blend of sourcing strategies to reach both active and passive
              jobseekers, sending only the most suitable candidates to your desk.
            </motion.p>

            {/* Stat strip */}
            <motion.div variants={fadeUp} custom={0.42} className="who-stats">
              <div className="who-stat">
                <span className="who-stat-value">2×</span>
                <span className="who-stat-label">Screening rounds per profile</span>
              </div>
              <div className="who-stat-divider" />
              <div className="who-stat">
                <span className="who-stat-value">100%</span>
                <span className="who-stat-label">Backup-ready on every hire</span>
              </div>
              <div className="who-stat-divider" />
              <div className="who-stat">
                <span className="who-stat-value">E2E</span>
                <span className="who-stat-label">End-to-end hiring ownership</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} custom={0.5}>
              <Link to="/about" className="btn btn-secondary">
                Learn About Us <FiArrowRight />
              </Link>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: two bold vertical pillars ── */}
          <motion.div
            className="who-right"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {/* HR Solutions pillar */}
            <motion.div className="who-pillar who-pillar--hr" variants={fadeUp} custom={0.1}>
              <div className="who-pillar-inner">
                <div className="who-pillar-icon">
                  <FiUsers size={32} />
                </div>
                <div className="who-pillar-body">
                  <p className="who-pillar-eyebrow">Vertical 01</p>
                  <h3 className="who-pillar-title">Wizaltia<br />HR Solutions</h3>
                  <p className="who-pillar-desc">
                    General Staffing · Permanent Recruitment · HR Outsourcing & RPO · Payroll & Compliance
                  </p>
                  <Link to="/hr-solutions" className="who-pillar-link">
                    Explore Services <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>
              <div className="who-pillar-accent" />
            </motion.div>

            {/* Learning Solutions pillar */}
            <motion.div className="who-pillar who-pillar--learn" variants={fadeUp} custom={0.22}>
              <div className="who-pillar-inner">
                <div className="who-pillar-icon who-pillar-icon--learn">
                  <FiBook size={32} />
                </div>
                <div className="who-pillar-body">
                  <p className="who-pillar-eyebrow" style={{ color: '#a78bfa' }}>Vertical 02</p>
                  <h3 className="who-pillar-title">Wizaltia<br />Learning Solutions</h3>
                  <p className="who-pillar-desc">
                    React · Svelte · Node.js · Prompt Engineering · Vibe Coding · Sales & Marketing
                  </p>
                  <Link to="/learning-solutions" className="who-pillar-link who-pillar-link--learn">
                    Explore Programs <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>
              <div className="who-pillar-accent who-pillar-accent--learn" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── HR SERVICES ── */}
      <section className="section services-section">
        <div className="container">
          <motion.div
            className="section-title center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span className="eyebrow" variants={fadeUp}>What We Do</motion.span>
            <motion.h2 variants={fadeUp} custom={0.1}>
              HR solutions built for <span className="text-yellow">every stage of growth</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={0.2}>
              From contract staffing to full HR outsourcing, we design the engagement model around your needs.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid-2 services-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {hrServices.map((svc) => (
              <motion.div key={svc.title} className="service-card card" variants={fadeUp}>
                <div className="icon-box">{svc.icon}</div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <Link to={svc.link} className="card-link">
                  Learn more <FiArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY WIZALTIA ── */}
      <section className="section why-section">
        <div className="container">
          <motion.div
            className="section-title center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span className="eyebrow" variants={fadeUp}>Why Choose Us</motion.span>
            <motion.h2 variants={fadeUp} custom={0.1}>
              Hiring that works because it's <span className="text-yellow">structured</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="why-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {whyChoose.map((item) => (
              <motion.div key={item.number} className="why-card" variants={fadeUp}>
                <span className="why-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LEARNING SNAPSHOT ── */}
      <section className="section learning-snapshot-section">
        <div className="container">
          <div className="learning-snapshot-wrapper">
            <motion.div
              className="learning-snapshot-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
            >
              <motion.span className="eyebrow" variants={fadeUp}>Learning Solutions</motion.span>
              <motion.h2 variants={fadeUp} custom={0.1}>
                Industry-ready training for{' '}
                <span className="text-yellow">the modern workforce</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={0.2}>
                Wizaltia Learning Solutions delivers hands-on, career-focused programs in
                cutting-edge technologies and business skills. Real-world projects.
                Industry-aligned curriculum. Expert-led sessions.
              </motion.p>
              <motion.div className="learning-programs-grid" variants={fadeUp} custom={0.3}>
                {learningPrograms.map((prog) => (
                  <div key={prog.title} className="program-pill">
                    {prog.icon} {prog.title}
                  </div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} custom={0.4}>
                <Link to="/learning-solutions" className="btn btn-primary">
                  Explore Programs <FiArrowRight />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              className="learning-snapshot-deco"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="deco-grid">
                {['React', 'Svelte', 'JS', 'Node', 'AI', 'Sales'].map((tech) => (
                  <div key={tech} className="deco-cell">{tech}</div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section industries-section">
        <div className="container">
          <motion.div
            className="section-title center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span className="eyebrow" variants={fadeUp}>Industries We Serve</motion.span>
            <motion.h2 variants={fadeUp} custom={0.1}>
              Across <span className="text-yellow">diverse sectors</span>
            </motion.h2>
          </motion.div>
          <motion.div
            className="industries-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {industries.map((ind) => (
              <motion.div key={ind} className="industry-pill" variants={fadeUp}>
                {ind}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section process-section">
        <div className="container">
          <motion.div
            className="section-title center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span className="eyebrow" variants={fadeUp}>How We Work</motion.span>
            <motion.h2 variants={fadeUp} custom={0.1}>
              A process built for <span className="text-yellow">predictability</span>
            </motion.h2>
          </motion.div>
          <motion.div
            className="process-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {process.map((step, i) => (
              <motion.div key={step.step} className="process-card" variants={fadeUp} custom={i * 0.1}>
                <span className="process-number">{step.step}</span>
                <div className="process-line" />
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="section cta-banner-section">
        <div className="container">
          <motion.div
            className="cta-banner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-banner-content">
              <h2>Ready to build your ideal team?</h2>
              <p>
                Every engagement starts with listening. Tell us your people challenges
                and we'll design the right solution around your goals.
              </p>
            </div>
            <div className="cta-banner-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Start a Conversation <FiArrowRight />
              </Link>
              <Link to="/hr-solutions" className="btn btn-ghost btn-lg">
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
