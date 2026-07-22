const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const { sendMail } = require('../utils/mailer');

/* Strict rate limit for contact form — 5 per hour per IP */
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many submissions. Please try again in an hour.' }
});

/* Validation rules */
const validateContact = [
  body('fullName').trim().notEmpty().withMessage('Full name is required.').escape(),
  body('companyName').trim().notEmpty().withMessage('Company name is required.').escape(),
  body('email').trim().isEmail().withMessage('A valid email address is required.').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone number is required.').escape(),
  body('service').trim().notEmpty().withMessage('Please select a service.').escape(),
  body('message').trim().optional().isLength({ max: 2000 }).escape(),
];

/**
 * POST /api/contact
 * HR Solutions enquiry form
 */
router.post('/', contactLimiter, validateContact, async (req, res) => {
  /* Validation check */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array()[0].msg
    });
  }

  const { fullName, companyName, email, phone, service, message } = req.body;

  /* Build HTML email */
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: 'Inter', Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 32px auto; background: #000; border-radius: 12px; overflow: hidden; }
        .header { background: #000; padding: 28px 32px; border-bottom: 2px solid #FCD517; }
        .header-brand { display: flex; align-items: center; gap: 12px; }
        .logo-box { width: 36px; height: 36px; background: #FCD517; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 16px; color: #000; }
        .brand-name { color: #fff; font-size: 18px; font-weight: 800; }
        .brand-sub { color: rgba(255,255,255,0.5); font-size: 11px; }
        .badge { display: inline-block; background: #FCD517; color: #000; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 100px; margin-top: 16px; text-transform: uppercase; letter-spacing: 0.1em; }
        .body { padding: 32px; }
        .body h2 { color: #fff; font-size: 20px; margin-bottom: 4px; }
        .body p.sub { color: rgba(255,255,255,0.5); font-size: 13px; margin-bottom: 24px; }
        .field { margin-bottom: 18px; }
        .field label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); margin-bottom: 4px; }
        .field p { font-size: 15px; color: #fff; margin: 0; line-height: 1.6; }
        .field.highlight p { color: #FCD517; }
        .divider { height: 1px; background: rgba(255,255,255,0.08); margin: 20px 0; }
        .message-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; }
        .message-box p { color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.7; margin: 0; }
        .footer { padding: 20px 32px; background: rgba(255,255,255,0.03); border-top: 1px solid rgba(255,255,255,0.08); }
        .footer p { color: rgba(255,255,255,0.3); font-size: 12px; margin: 0; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <div class="header-brand">
            <div class="logo-box">W</div>
            <div>
              <div class="brand-name">Wizaltia HR Solutions</div>
              <div class="brand-sub">HR Solutions · Learning Solutions</div>
            </div>
          </div>
          <div class="badge">New HR Enquiry</div>
        </div>
        <div class="body">
          <h2>New HR Solutions Enquiry</h2>
          <p class="sub">Received from the website contact form</p>
          <div class="field">
            <label>Full Name</label>
            <p>${fullName}</p>
          </div>
          <div class="field">
            <label>Company Name</label>
            <p>${companyName}</p>
          </div>
          <div class="field">
            <label>Email Address</label>
            <p><a href="mailto:${email}" style="color:#FCD517">${email}</a></p>
          </div>
          <div class="field">
            <label>Phone Number</label>
            <p><a href="tel:${phone}" style="color:#FCD517">${phone}</a></p>
          </div>
          <div class="field highlight">
            <label>Service Interested In</label>
            <p>${service}</p>
          </div>
          <div class="divider"></div>
          <div class="field">
            <label>Message</label>
            <div class="message-box">
              <p>${message || '(No message provided)'}</p>
            </div>
          </div>
        </div>
        <div class="footer">
          <p>Submitted via wizaltia.com · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await sendMail({
      to: process.env.RECIPIENT_EMAIL || 'info@wizaltia.com',
      subject: `[HR Enquiry] ${fullName} — ${service}`,
      html,
    });

    return res.status(200).json({
      success: true,
      message: 'Your enquiry has been sent successfully. We\'ll be in touch within 24 hours.'
    });
  } catch (err) {
    console.error('[Contact Route Error] SMTP failed:', err.message, '| code:', err.code, '| response:', err.response);
    return res.status(500).json({
      success: false,
      message: 'Unable to send your enquiry right now. Please try emailing us directly at info@wizaltia.com'
    });
  }
});

module.exports = router;
