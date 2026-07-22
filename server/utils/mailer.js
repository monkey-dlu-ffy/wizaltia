const nodemailer = require('nodemailer');

/**
 * Create and return a Nodemailer transporter.
 * Uses environment variables for SMTP credentials.
 */
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Send an email using the configured transporter.
 * @param {object} options - { to, subject, html }
 */
async function sendMail({ to, subject, html }) {
  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: `"Wizaltia Website" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
  return info;
}

module.exports = { sendMail };
