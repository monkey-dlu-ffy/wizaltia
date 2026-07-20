import { Link } from 'react-router-dom';
import {
  FiPhone, FiMail, FiMapPin, FiLinkedin,
  FiArrowRight
} from 'react-icons/fi';
import './Footer.css';

const services = [
  { label: 'General Staffing', path: '/hr-solutions#staffing' },
  { label: 'Permanent Recruitment', path: '/hr-solutions#recruitment' },
  { label: 'HR Outsourcing & RPO', path: '/hr-solutions#rpo' },
  { label: 'Payroll & Compliance', path: '/hr-solutions#payroll' },
];

const learning = [
  { label: 'React & JavaScript', path: '/learning-solutions#react' },
  { label: 'Node.js', path: '/learning-solutions#nodejs' },
  { label: 'Prompt Engineering', path: '/learning-solutions#prompt' },
  { label: 'Sales & Marketing', path: '/learning-solutions#sales' },
];

const company = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'HR Solutions', path: '/hr-solutions' },
  { label: 'Learning Solutions', path: '/learning-solutions' },
  { label: 'Contact', path: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/logo.png" alt="Wizaltia HR Solutions" className="footer-logo-img" />
              <span className="logo-text">
                <span className="logo-primary">Wizaltia</span>
                <span className="logo-sub">HR Solutions</span>
              </span>
            </Link>
            <p className="footer-tagline">
              Large Talent Pool · Transforming Workforce Acquisition ·
              Your Reliable Strategic Partner in Elite Recruitment Solutions.
            </p>
            <div className="footer-contact-info">
              <a href="tel:7845740611" className="footer-contact-item">
                <FiPhone size={14} />
                <span>+91 78457 40611</span>
              </a>
              <a href="tel:9380242884" className="footer-contact-item">
                <FiPhone size={14} />
                <span>+91 93802 42884</span>
              </a>
              <a href="mailto:info@wizaltia.com" className="footer-contact-item">
                <FiMail size={14} />
                <span>info@wizaltia.com</span>
              </a>
              <div className="footer-contact-item">
                <FiMapPin size={14} />
                <span>77, Hasthampatti Main Rd, Salem, TN 636007</span>
              </div>
            </div>
            <div className="footer-social">
              <a
                href="https://in.linkedin.com/company/wizaltiahrsolutions"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wizaltia HR Solutions on LinkedIn"
                className="social-icon"
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div className="footer-links-col">
            <h4>Company</h4>
            <ul>
              {company.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>
                    <FiArrowRight size={12} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* HR Services */}
          <div className="footer-links-col">
            <h4>HR Services</h4>
            <ul>
              {services.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>
                    <FiArrowRight size={12} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Solutions */}
          <div className="footer-links-col">
            <h4>Learning Solutions</h4>
            <ul>
              {learning.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>
                    <FiArrowRight size={12} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {year} Wizaltia HR Solutions. All rights reserved.</span>
          <span>Salem, Tamil Nadu, India</span>
        </div>
      </div>
    </footer>
  );
}
