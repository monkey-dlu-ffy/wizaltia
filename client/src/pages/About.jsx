import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiEye, FiTarget, FiHeart, FiCheckCircle,
  FiArrowRight, FiLayers
} from 'react-icons/fi';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: 'easeOut' } })
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const coreValues = [
  { icon: <FiCheckCircle />, title: 'Integrity First', desc: 'We operate with transparency and honesty with clients, candidates, and each other, in every interaction.' },
  { icon: <FiTarget />, title: 'Outcome-Oriented', desc: 'Every hire we make is tied to a business result. We don\'t just fill roles; we solve talent problems.' },
  { icon: <FiHeart />, title: 'People-Centric', desc: 'Behind every JD is a human being. We treat every candidate\'s career with the respect it deserves.' },
  { icon: <FiLayers />, title: 'Structured Excellence', desc: 'Great hires don\'t happen by accident. We apply proven frameworks to make recruitment predictable.' },
];

const approachSteps = [
  { num: '01', title: 'Intake Mapping', desc: 'We begin by understanding not just the role, but the outcome it must deliver, the team it joins, and what success looks like in 90 days.' },
  { num: '02', title: 'Targeted Sourcing', desc: 'Using a curated blend of sourcing strategies, we reach both active and passive candidates from a large talent pool across India.' },
  { num: '03', title: 'Rigorous Screening', desc: 'Every profile undergoes two structured screening rounds before it reaches your inbox, eliminating noise and protecting your time.' },
  { num: '04', title: 'Accountable Delivery', desc: 'We manage offers, negotiate on your behalf, support onboarding, and stay ready with backups, because a dropout isn\'t an option.' },
];

const whyChoose = [
  'Role clarity before every search begins',
  'Two structured screening rounds per profile',
  'Ready backups to prevent dropout disruption',
  'Multi-channel sourcing: active & passive candidates',
  'End-to-end support from search to onboarding',
  'Dedicated recruiter per engagement',
];

export default function About() {
  return (
    <main className="about-page page-enter">
      {/* ── PAGE HERO ── */}
      <section className="page-hero-section">
        <div className="page-hero-glow" />
        <div className="page-hero-grid" />
        <div className="container page-hero-content">
          <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            About Wizaltia
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            We solve <span className="text-yellow">people challenges</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Wizaltia HR Solutions is a Salem-based talent and workforce firm committed to
            making hiring easier, more structured, and more reliable, one successful placement at a time.
          </motion.p>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="section">
        <div className="container">
          <div className="about-overview-grid">
            <motion.div
              className="about-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
            >
              <motion.span className="eyebrow" variants={fadeUp}>Company Overview</motion.span>
              <motion.h2 variants={fadeUp} custom={0.1}>
                Committed to making hiring <span className="text-yellow">predictable</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={0.2}>
                At Wizaltia, we help our partner clients overcome their people challenges. The talent
                acquisition landscape is more demanding than ever, riddled with irrelevant profiles,
                tricky scheduling, and the constant juggling of interviews and follow-ups.
              </motion.p>
              <motion.p variants={fadeUp} custom={0.25}>
                From screening to negotiation, offer management, and onboarding, the process can get
                overwhelming fast. We know a dropout can throw everything off, so we're always
                ready with timely backups.
              </motion.p>
              <motion.p variants={fadeUp} custom={0.3}>
                We make it a point to truly understand every job requirement, down to the last detail.
                Our recruiters aren't just trained, they're immersed in sourcing techniques tailored
                for each open role. We use a smart blend of strategies to reach both active and passive
                jobseekers, making sure only the most suitable candidates land on your desk.
              </motion.p>
              <motion.p variants={fadeUp} custom={0.35}>
                Every profile is carefully vetted through two rounds of screening before it reaches
                your inbox. This thorough, hands-on approach means fewer dropouts, better matches,
                and ultimately, significant savings in time and cost for our clients.
              </motion.p>
            </motion.div>

            <motion.div
              className="about-mission-vision"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
            >
              <motion.div className="mv-card" variants={fadeUp}>
                <div className="mv-icon"><FiEye size={22} /></div>
                <h3>Our Vision</h3>
                <p>
                  To be the most trusted talent partner in the region, known for structured, reliable hiring
                  that consistently delivers the right people, not just the available ones.
                </p>
              </motion.div>
              <motion.div className="mv-card" variants={fadeUp} custom={0.1}>
                <div className="mv-icon"><FiTarget size={22} /></div>
                <h3>Our Mission</h3>
                <p>
                  To simplify and strengthen the hiring process for every organisation we work with,                 through structured frameworks, deep candidate engagement, and genuine accountability
                  from search to onboarding.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="section values-section">
        <div className="container">
          <motion.div
            className="section-title center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span className="eyebrow" variants={fadeUp}>What We Stand For</motion.span>
            <motion.h2 variants={fadeUp} custom={0.1}>
              Our <span className="text-yellow">core values</span>
            </motion.h2>
          </motion.div>
          <motion.div
            className="grid-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {coreValues.map((val) => (
              <motion.div key={val.title} className="card value-card" variants={fadeUp}>
                <div className="icon-box">{val.icon}</div>
                <h3>{val.title}</h3>
                <p>{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── OUR APPROACH ── */}
      <section className="section approach-section">
        <div className="container">
          <motion.div
            className="section-title center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span className="eyebrow" variants={fadeUp}>Our Approach</motion.span>
            <motion.h2 variants={fadeUp} custom={0.1}>
              Structure before <span className="text-yellow">sourcing</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={0.2}>
              Most hiring fails because the role was never clearly defined. We fix that at the start.
            </motion.p>
          </motion.div>
          <motion.div
            className="approach-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {approachSteps.map((step, i) => (
              <motion.div key={step.num} className="approach-card" variants={fadeUp} custom={i * 0.08}>
                <div className="approach-number">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── WHY WIZALTIA ── */}
      <section className="section why-businesses-section">
        <div className="container">
          <div className="why-businesses-grid">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
            >
              <motion.span className="eyebrow" variants={fadeUp}>Why Businesses Choose Us</motion.span>
              <motion.h2 variants={fadeUp} custom={0.1}>
                Making hiring easier —{' '}
                <span className="text-yellow">one placement at a time</span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={0.2}>
                Whether you're a startup filling your first 10 hires or an established company
                managing high-volume recruitment, we bring the same standard of structured,
                thorough, and accountable delivery.
              </motion.p>
            </motion.div>
            <motion.div
              className="why-checklist"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              {whyChoose.map((item) => (
                <motion.div key={item} className="check-item" variants={fadeUp}>
                  <FiCheckCircle size={18} />
                  <span>{item}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-sm">
        <div className="container">
          <motion.div
            className="cta-banner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-banner-content">
              <h2>Ready to work with us?</h2>
              <p>Get in touch to discuss your hiring needs or explore how we can add value to your team.</p>
            </div>
            <div className="cta-banner-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Contact Us <FiArrowRight />
              </Link>
              <Link to="/hr-solutions" className="btn btn-ghost btn-lg">View Services</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
