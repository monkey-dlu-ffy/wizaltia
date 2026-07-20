import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'HR Solutions', path: '/hr-solutions' },
  { label: 'Learning Solutions', path: '/learning-solutions' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
            <img
              src="/logo.png"
              alt="Wizaltia HR Solutions"
              className="navbar-logo-img"
            />
            <span className="logo-text">
              <span className="logo-primary">Wizaltia</span>
              <span className="logo-sub">HR Solutions</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `navbar-link${isActive ? ' active' : ''}`
                  }
                  end={link.path === '/'}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link to="/contact" className="btn btn-primary navbar-cta" onClick={handleLinkClick}>
            Get in Touch
          </Link>

          {/* Animated Morphing Hamburger */}
          <button
            className={`navbar-burger${menuOpen ? ' is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="burger-line burger-line--top" />
            <span className="burger-line burger-line--mid" />
            <span className="burger-line burger-line--bot" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Mobile menu header */}
            <div className="mobile-menu-header">
              <img src="/logo.png" alt="Wizaltia" className="mobile-logo-img" />
            </div>

            <ul>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.path}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `mobile-link${isActive ? ' active' : ''}`
                    }
                    end={link.path === '/'}
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <div className="mobile-menu-footer">
              <Link to="/contact" className="btn btn-primary" onClick={handleLinkClick}>
                Get in Touch
              </Link>
              <div className="mobile-contact-info">
                <a href="tel:7845740611">+91 78457 40611</a>
                <a href="mailto:info@wizaltia.com">info@wizaltia.com</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
