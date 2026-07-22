require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const contactRouter = require('./routes/contact');
const learningRouter = require('./routes/learning');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy — required for Render / Railway / Heroku
app.set('trust proxy', 1);

/* ── Middleware ── */
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// CORS — allow frontend dev server + production domain
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://wizaltia.com',
  'https://www.wizaltia.com',
  // Vercel deployments (main + preview)
  'https://wizaltia.vercel.app',
  'https://www.wizaltia.vercel.app',
  ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()) : []),
];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
  credentials: true,
}));

// Global rate limiter — 30 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api', globalLimiter);

/* ── Routes ── */
app.use('/api/contact', contactRouter);
app.use('/api/learning', learningRouter);

/* ── Root ── */
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Wizaltia API server is running. Visit https://wizaltia.com for the website.' });
});

/* ── Health Check ── */
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ── 404 for unknown API routes ── */
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found.' });
});

/* ── Global Error Handler ── */
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`Wizaltia server running on port ${PORT}`);
});
