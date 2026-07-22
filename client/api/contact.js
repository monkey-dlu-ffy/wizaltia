import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limit (resets on cold start — good enough for serverless)
const submissions = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const max = 5;
  const key = `${ip}`;
  const entry = submissions.get(key) || [];
  const recent = entry.filter((t) => now - t < windowMs);
  if (recent.length >= max) return true;
  recent.push(now);
  submissions.set(key, recent);
  return false;
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  // Rate limit
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ success: false, message: 'Too many submissions. Please try again in an hour.' });
  }

  const { fullName, companyName, email, phone, service, message } = req.body || {};

  // Validation
  if (!fullName?.trim()) return res.status(422).json({ success: false, message: 'Full name is required.' });
  if (!companyName?.trim()) return res.status(422).json({ success: false, message: 'Company name is required.' });
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(422).json({ success: false, message: 'A valid email address is required.' });
  if (!phone?.trim()) return res.status(422).json({ success: false, message: 'Phone number is required.' });
  if (!service?.trim()) return res.status(422).json({ success: false, message: 'Please select a service.' });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .wrapper { max-width: 600px; margin: 32px auto; background: #000; border-radius: 12px; overflow: hidden; }
        .header { background: #000; padding: 28px 32px; border-bottom: 2px solid #FCD517; }
        .logo-box { width: 36px; height: 36px; background: #FCD517; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-weight: 900; font-size: 16px; color: #000; vertical-align: middle; margin-right: 10px; }
        .brand-name { color: #fff; font-size: 18px; font-weight: 800; vertical-align: middle; }
        .badge { display: inline-block; background: #FCD517; color: #000; font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 100px; margin-top: 16px; text-transform: uppercase; letter-spacing: 0.1em; }
        .body { padding: 32px; }
        .body h2 { color: #fff; font-size: 20px; margin-bottom: 4px; }
        .sub { color: rgba(255,255,255,0.5); font-size: 13px; margin-bottom: 24px; }
        .field { margin-bottom: 18px; }
        .field-label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.4); margin-bottom: 4px; }
        .field-value { font-size: 15px; color: #fff; margin: 0; line-height: 1.6; }
        .highlight { color: #FCD517 !important; }
        .divider { height: 1px; background: rgba(255,255,255,0.08); margin: 20px 0; }
        .message-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; }
        .message-box p { color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.7; margin: 0; }
        .footer { padding: 20px 32px; background: rgba(255,255,255,0.03); border-top: 1px solid rgba(255,255,255,0.08); }
        .footer p { color: rgba(255,255,255,0.3); font-size: 12px; margin: 0; }
        a { color: #FCD517; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header">
          <span class="logo-box">W</span>
          <span class="brand-name">Wizaltia HR Solutions</span>
          <div class="badge">New HR Enquiry</div>
        </div>
        <div class="body">
          <h2>New HR Solutions Enquiry</h2>
          <p class="sub">Received from the website contact form</p>
          <div class="field"><span class="field-label">Full Name</span><p class="field-value">${fullName}</p></div>
          <div class="field"><span class="field-label">Company Name</span><p class="field-value">${companyName}</p></div>
          <div class="field"><span class="field-label">Email Address</span><p class="field-value"><a href="mailto:${email}">${email}</a></p></div>
          <div class="field"><span class="field-label">Phone Number</span><p class="field-value"><a href="tel:${phone}">${phone}</a></p></div>
          <div class="field"><span class="field-label">Service Interested In</span><p class="field-value highlight">${service}</p></div>
          <div class="divider"></div>
          <div class="field">
            <span class="field-label">Message</span>
            <div class="message-box"><p>${message?.trim() || '(No message provided)'}</p></div>
          </div>
        </div>
        <div class="footer">
          <p>Submitted via wizaltia.com &middot; ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: 'Wizaltia Website <onboarding@resend.dev>',
      to: process.env.RECIPIENT_EMAIL || 'info@wizaltia.com',
      replyTo: email,
      subject: `[HR Enquiry] ${fullName} — ${service}`,
      html,
    });

    return res.status(200).json({ success: true, message: "Your enquiry has been sent! We'll be in touch within 24 hours." });
  } catch (err) {
    console.error('[Contact] Resend error:', err?.message);
    return res.status(500).json({ success: false, message: 'Unable to send your enquiry right now. Please try emailing us directly at info@wizaltia.com' });
  }
}
