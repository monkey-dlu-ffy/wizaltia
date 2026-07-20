import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiUsers, FiSearch, FiGlobe, FiFileText,
  FiCheckCircle, FiArrowRight, FiZap
} from 'react-icons/fi';
import './HRSolutions.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: 'easeOut' } })
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const services = [
  {
    id: 'staffing',
    icon: <FiUsers size={28} />,
    label: 'General Staffing',
    headline: 'The right talent, exactly when you need it',
    overview: `General staffing is about speed and reliability without sacrificing quality. Whether you
      need to scale a team rapidly for a project phase, cover a sudden vacancy, or bring in specialists
      for defined deliverables, Wizaltia deploys skilled contract and temporary professionals
      across functions, quickly and efficiently.`,
    benefits: [
      'Rapid deployment of pre-vetted talent',
      'Flexible contract durations to suit project timelines',
      'Reduced hiring overhead and administrative burden',
      'Access to a large, curated talent pool across industries',
      'Consistent quality through structured pre-screening',
    ],
    process: [
      { step: '01', title: 'Requirement Intake', desc: 'We deep-dive into role requirements, timeline, and skill expectations.' },
      { step: '02', title: 'Targeted Sourcing', desc: 'Multi-channel outreach to active and passive candidates matching your criteria.' },
      { step: '03', title: 'Two-Round Screening', desc: 'Every profile is screened twice before it reaches your desk.' },
      { step: '04', title: 'Deployment Support', desc: 'Onboarding assistance and backups ready if needed.' },
    ]
  },
  {
    id: 'recruitment',
    icon: <FiSearch size={28} />,
    label: 'Permanent Recruitment',
    headline: 'Building teams that grow with your business',
    overview: `Permanent recruitment is not just about filling a vacancy, it's about investing in
      your organisation's long-term capability. Wizaltia's approach to permanent hiring is built
      on outcome clarity, rigorous capability assessment, and cultural alignment, ensuring the
      people who join your team have the potential to become your future leaders.`,
    benefits: [
      'Outcome-mapped job descriptions and success criteria',
      'Capability-based evaluation, not just credential-matching',
      'Cultural fit assessment alongside technical screening',
      'Offer management and negotiation support',
      'Onboarding guidance and dropout backup',
    ],
    process: [
      { step: '01', title: 'Role Design', desc: 'Translate your business goal into a clear, outcome-based role definition.' },
      { step: '02', title: 'Talent Mapping', desc: 'Identify and engage candidates who match on skills, culture, and ambition.' },
      { step: '03', title: 'Structured Evaluation', desc: 'Scorecard-driven screening with capability evidence over claims.' },
      { step: '04', title: 'Offer & Onboard', desc: 'Full support through offer, negotiation, and joining confirmation.' },
    ]
  },
  {
    id: 'rpo',
    icon: <FiGlobe size={28} />,
    label: 'HR Outsourcing & RPO',
    headline: 'Your recruitment function, fully managed',
    overview: `Recruitment Process Outsourcing (RPO) means Wizaltia takes ownership of your
      entire hiring function or specific parts of it, acting as an embedded extension of
      your HR team. From sourcing strategy to interview coordination, offer management, and
      hiring analytics, we deliver measurable outcomes without the overhead of a large in-house
      recruitment team.`,
    benefits: [
      'Scalable recruitment capacity without fixed headcount cost',
      'Dedicated recruiters embedded in your processes',
      'Structured hiring frameworks reducing friction and delay',
      'Consistent quality across all roles and levels',
      'Hiring analytics and reporting on request',
    ],
    process: [
      { step: '01', title: 'Scope Definition', desc: 'Agree on which parts of the hiring process we own vs. collaborate on.' },
      { step: '02', title: 'Team Integration', desc: 'Our recruiters align with your tools, culture, and stakeholders.' },
      { step: '03', title: 'Continuous Delivery', desc: 'Ongoing sourcing, screening, and interview coordination at scale.' },
      { step: '04', title: 'Review & Optimise', desc: 'Regular reporting and process improvement cycles.' },
    ]
  },
  {
    id: 'payroll',
    icon: <FiFileText size={28} />,
    label: 'Payroll & Compliance Management',
    headline: 'Accurate payroll. Zero compliance risk.',
    overview: `Managing payroll and statutory compliance is complex, time-sensitive, and
      non-negotiable. A single error can impact employee trust and attract regulatory attention.
      Wizaltia's payroll and compliance management service handles the full lifecycle from
      monthly payroll processing to PF, ESI, PT, TDS, and labour law compliance with precision
      and confidentiality.`,
    benefits: [
      'Accurate, on-time salary processing',
      'Full statutory compliance: PF, ESI, PT, TDS and more',
      'Secure and confidential employee records management',
      'Audit-ready documentation and filing support',
      'Compliance alerts and regulatory updates',
    ],
    process: [
      { step: '01', title: 'Data Collection', desc: 'Securely gather employee attendance, leave, and compensation data.' },
      { step: '02', title: 'Payroll Processing', desc: 'Calculate salaries, deductions, and reimbursements accurately.' },
      { step: '03', title: 'Compliance Filing', desc: 'Manage all statutory filings and payments on time.' },
      { step: '04', title: 'Reporting & Records', desc: 'Payslips, Form 16, and compliance documentation delivered securely.' },
    ]
  }
];

export default function HRSolutions() {
  return (
    <main className="hr-solutions-page page-enter">
      {/* ── PAGE HERO ── */}
      <section className="page-hero-section">
        <div className="page-hero-glow" />
        <div className="page-hero-grid" />
        <div className="container page-hero-content">
          <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            HR Solutions
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Workforce solutions built on <span className="text-yellow">structure</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            From general staffing to full HR outsourcing, Wizaltia designs the right model
            around your business and delivers with accountability.
          </motion.p>
          {/* Quick Nav */}
          <motion.div
            className="quick-nav"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {services.map((svc) => (
              <a key={svc.id} href={`#${svc.id}`} className="quick-nav-link">
                {svc.icon} {svc.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICE SECTIONS ── */}
      {services.map((svc, idx) => (
        <section
          key={svc.id}
          id={svc.id}
          className={`section service-section${idx % 2 !== 0 ? ' alt-bg' : ''}`}
        >
          <div className="container">
            <motion.div
              className={`service-block${idx % 2 !== 0 ? ' reversed' : ''}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={stagger}
            >
              {/* Content */}
              <div className="service-main">
                <motion.div className="service-header" variants={fadeUp}>
                  <div className="icon-box">{svc.icon}</div>
                  <div>
                    <span className="service-label">{svc.label}</span>
                    <h2>{svc.headline}</h2>
                  </div>
                </motion.div>
                <motion.p className="service-overview" variants={fadeUp} custom={0.1}>
                  {svc.overview}
                </motion.p>
                <motion.div variants={fadeUp} custom={0.15}>
                  <h4 className="list-heading">Key Benefits</h4>
                  <ul className="benefits-list">
                    {svc.benefits.map((b) => (
                      <li key={b}>
                        <FiCheckCircle size={14} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div variants={fadeUp} custom={0.2}>
                  <Link to="/contact" className="btn btn-primary">
                    Enquire About {svc.label} <FiArrowRight />
                  </Link>
                </motion.div>
              </div>

              {/* Process Panel */}
              <motion.div className="service-process-panel" variants={fadeUp} custom={0.1}>
                <div className="process-panel-header">
                  <FiZap size={16} />
                  <span>Our Process</span>
                </div>
                {svc.process.map((step) => (
                  <div key={step.step} className="process-step">
                    <div className="process-step-num">{step.step}</div>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      ))}

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
              <h2>Not sure which service fits your needs?</h2>
              <p>Let's have a conversation. We'll help you identify the right model for your situation.</p>
            </div>
            <div className="cta-banner-actions">
              <Link to="/contact" className="btn btn-primary btn-lg">
                Talk to Us <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
