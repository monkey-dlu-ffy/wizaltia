import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowRight } from 'react-icons/fi';
import './NotFound.css';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-glow" />
      <div className="container not-found-content">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="not-found-inner"
        >
          <motion.div
            className="not-found-number"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            404
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Page not found
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </motion.p>
          <motion.div
            className="not-found-actions"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link to="/" className="btn btn-primary btn-lg">
              <FiHome /> Go to Homepage
            </Link>
            <Link to="/contact" className="btn btn-ghost btn-lg">
              Contact Us <FiArrowRight />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
