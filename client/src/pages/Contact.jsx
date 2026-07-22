import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiPhone, FiMail, FiMapPin, FiLinkedin,
  FiClock, FiCheckCircle, FiArrowRight
} from 'react-icons/fi';
import './Contact.css';

// Use absolute backend URL in production to avoid ad blocker blocks on relative /api/* paths
const API_BASE = import.meta.env.VITE_API_URL || '';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: d, ease: 'easeOut' } })
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

/* ── HR Solutions Form ── */
function HRForm() {
  const [form, setForm] = useState({
    fullName: '', companyName: '', email: '', phone: '', service: '', message: ''
  });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setForm({ fullName: '', companyName: '', email: '', phone: '', service: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Unable to connect to the server. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="contact-form" id="hr-inquiry-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="hr-fullName">Full Name *</label>
          <input id="hr-fullName" name="fullName" type="text" required placeholder="Your full name"
            value={form.fullName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="hr-companyName">Company Name *</label>
          <input id="hr-companyName" name="companyName" type="text" required placeholder="Your company"
            value={form.companyName} onChange={handleChange} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="hr-email">Email Address *</label>
          <input id="hr-email" name="email" type="email" required placeholder="you@company.com"
            value={form.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="hr-phone">Phone Number *</label>
          <input id="hr-phone" name="phone" type="tel" required placeholder="+91 9XXXXXXXXX"
            value={form.phone} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="hr-service">Service Interested In *</label>
        <select id="hr-service" name="service" required value={form.service} onChange={handleChange}>
          <option value="">Select a service</option>
          <option value="General Staffing">General Staffing</option>
          <option value="Permanent Recruitment">Permanent Recruitment</option>
          <option value="HR Outsourcing & RPO">HR Outsourcing & RPO</option>
          <option value="Payroll & Compliance Management">Payroll & Compliance Management</option>
          <option value="Not sure – I need guidance">Not sure – I need guidance</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="hr-message">Message</label>
        <textarea id="hr-message" name="message" rows={4} placeholder="Tell us about your hiring needs or any questions..."
          value={form.message} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary" id="hr-submit-btn" disabled={status === 'loading'}>
        {status === 'loading' ? (<><span className="spinner" /> Sending...</>) : (<>Send Enquiry <FiArrowRight /></>)}
      </button>
      {status === 'success' && (
        <div className="alert alert-success" role="alert"><FiCheckCircle /> Your enquiry has been sent! We'll be in touch within 24 hours.</div>
      )}
      {status === 'error' && (
        <div className="alert alert-error" role="alert">⚠ {errorMsg}</div>
      )}
    </form>
  );
}

export default function Contact() {
  const [activeTab, setActiveTab] = useState('hr');

  return (
    <main className="contact-page page-enter">
      {/* ── PAGE HERO ── */}
      <section className="page-hero-section">
        <div className="page-hero-glow" />
        <div className="page-hero-grid" />
        <div className="container page-hero-content">
          <motion.span className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            Contact Us
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            Let's start a <span className="text-yellow">conversation</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Whether you have a hiring need, a learning enquiry, or simply want to know more,
            we'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT INFO + MAP ── */}
      <section className="section">
        <div className="container">
          <div className="contact-top-grid">
            {/* Contact Info */}
            <motion.div
              className="contact-info-col"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={stagger}
            >
              <motion.div className="contact-info-card" variants={fadeUp}>
                <div className="info-icon"><FiPhone size={20} /></div>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:7845740611">+91 78457 40611</a>
                  <a href="tel:9380242884">+91 93802 42884</a>
                </div>
              </motion.div>
              <motion.div className="contact-info-card" variants={fadeUp}>
                <div className="info-icon"><FiMail size={20} /></div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:info@wizaltia.com">info@wizaltia.com</a>
                </div>
              </motion.div>
              <motion.div className="contact-info-card" variants={fadeUp}>
                <div className="info-icon"><FiMapPin size={20} /></div>
                <div>
                  <h4>Address</h4>
                  <address>
                    77, Hasthampatti Main Rd,<br />
                    Subbarayan Layout, Hasthampatti,<br />
                    Salem, Tamil Nadu 636007
                  </address>
                </div>
              </motion.div>
              <motion.div className="contact-info-card" variants={fadeUp}>
                <div className="info-icon"><FiClock size={20} /></div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                  <p>Saturday: 10:00 AM – 2:00 PM</p>
                  <p className="note">*Subject to change. Contact us to confirm.</p>
                </div>
              </motion.div>
              <motion.div className="contact-info-card social-card" variants={fadeUp}>
                <div className="info-icon"><FiLinkedin size={20} /></div>
                <div>
                  <h4>Follow Us</h4>
                  <a
                    href="https://in.linkedin.com/company/wizaltiahrsolutions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/company/wizaltiahrsolutions
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Google Map */}
            <motion.div
              className="map-col"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="map-wrapper">
                <iframe
                  title="Wizaltia HR Solutions Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.4853697827066!2d78.13!3d11.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDM5JzAwLjAiTiA3OMKwMDcnNDguMCJF!5e0!3m2!1sen!2sin!4v1000000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="map-caption">
                <FiMapPin size={14} />
                77, Hasthampatti Main Rd, Salem, Tamil Nadu 636007
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INQUIRY FORMS ── */}
      <section className="section inquiry-forms-section">
        <div className="container">
          <motion.div
            className="section-title center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.span className="eyebrow" variants={fadeUp}>Send Us a Message</motion.span>
            <motion.h2 variants={fadeUp} custom={0.1}>
              What can we <span className="text-yellow">help you with?</span>
            </motion.h2>
          </motion.div>

          {/* Tabs */}
          <div className="form-tabs">
            <button
              className={`form-tab${activeTab === 'hr' ? ' active' : ''}`}
              onClick={() => setActiveTab('hr')}
              id="tab-hr"
              aria-selected={activeTab === 'hr'}
            >
              HR Solutions Enquiry
            </button>
            <button
              className={`form-tab${activeTab === 'learning' ? ' active' : ''}`}
              onClick={() => setActiveTab('learning')}
              id="tab-learning"
              aria-selected={activeTab === 'learning'}
            >
              Learning Solutions Enquiry
            </button>
          </div>

          <motion.div
            className="form-panel"
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'hr' ? <HRForm /> : <LearningFormInline />}
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* ── Learning Inline Form (mirrors LearningSolutions form) ── */
function LearningFormInline() {
  const [form, setForm] = useState({ fullName: '', collegeName: '', email: '', phone: '', course: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/learning`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setForm({ fullName: '', collegeName: '', email: '', phone: '', course: '', message: '' });
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Unable to connect. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="contact-form" id="learning-inquiry-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ct-fullName">Full Name *</label>
          <input id="ct-fullName" name="fullName" type="text" required placeholder="Your full name"
            value={form.fullName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="ct-collegeName">College / Institution</label>
          <input id="ct-collegeName" name="collegeName" type="text" placeholder="Your college or institution"
            value={form.collegeName} onChange={handleChange} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ct-email">Email Address *</label>
          <input id="ct-email" name="email" type="email" required placeholder="you@email.com"
            value={form.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="ct-phone">Phone Number *</label>
          <input id="ct-phone" name="phone" type="tel" required placeholder="+91 9XXXXXXXXX"
            value={form.phone} onChange={handleChange} />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="ct-course">Course Interested In *</label>
        <select id="ct-course" name="course" required value={form.course} onChange={handleChange}>
          <option value="">Select a course</option>
          <option value="Svelte">Svelte</option>
          <option value="React">React</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Node.js">Node.js</option>
          <option value="Vibe Coding">Vibe Coding</option>
          <option value="Prompt Engineering">Prompt Engineering</option>
          <option value="Sales & Marketing">Sales & Marketing Training</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="ct-message">Message / Questions</label>
        <textarea id="ct-message" name="message" rows={4} placeholder="Tell us about your learning goals..."
          value={form.message} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary" id="learning-submit-btn" disabled={status === 'loading'}>
        {status === 'loading' ? (<><span className="spinner" /> Sending...</>) : (<>Submit Enquiry <FiArrowRight /></>)}
      </button>
      {status === 'success' && (
        <div className="alert alert-success" role="alert"><FiCheckCircle /> Enquiry sent! We'll be in touch within 24 hours.</div>
      )}
      {status === 'error' && (
        <div className="alert alert-error" role="alert">⚠ {errorMsg}</div>
      )}
    </form>
  );
}
