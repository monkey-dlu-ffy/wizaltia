# Wizaltia HR Solutions — Official Website

Production-ready, multi-page React website for **Wizaltia HR Solutions**.

## Project Structure

```
wizaltia/
├── client/          # React + Vite frontend  →  Deploy to Vercel
└── server/          # Node.js + Express backend  →  Deploy to Render
```

## Getting Started (Local Development)

### 1. Backend Setup

```bash
cd server
cp .env.example .env
# Fill in your SMTP credentials in .env
npm install
npm run dev
```

> Server runs on **http://localhost:5000**

### 2. Frontend Setup

```bash
cd client
npm install
npm run dev
```

> Frontend runs on **http://localhost:5173**  
> API calls to `/api/*` are automatically proxied to `localhost:5000`

---

## 🚀 Deployment

### Frontend → Vercel

1. Push the repository to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Select your repository → set **Root Directory** to `client`
4. Framework preset: **Vite**
5. Build command: `npm run build`
6. Output directory: `dist`
7. Add Environment Variable:
   - `VITE_API_URL` = `https://wizaltia-server.onrender.com`
8. Click **Deploy**

> The `client/vercel.json` handles SPA routing automatically (direct URL navigation works).

---

### Backend → Render

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repository
3. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Node Version**: 18 or 20
4. Add Environment Variables:

   | Key | Value |
   |-----|-------|
   | `PORT` | `10000` |
   | `NODE_ENV` | `production` |
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `587` |
   | `SMTP_SECURE` | `false` |
   | `SMTP_USER` | `your-gmail@gmail.com` |
   | `SMTP_PASS` | `your-16-char-app-password` |
   | `RECIPIENT_EMAIL` | `info@wizaltia.com` |
   | `ALLOWED_ORIGINS` | `https://your-app.vercel.app` |

5. Click **Create Web Service**

> Alternatively, Render will auto-detect `server/render.yaml` — just connect the repo and it handles configuration.

---

### Post-Deployment

After both services are live:

1. Update `client/vercel.json` — replace `https://wizaltia-server.onrender.com` with your actual Render URL
2. Update `server/.env` — add your Vercel app URL to `ALLOWED_ORIGINS`
3. Redeploy both services

---

## Email Configuration (SMTP)

The backend uses Nodemailer. Configure SMTP in `server/.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password    # Use Gmail App Password, not account password
RECIPIENT_EMAIL=info@wizaltia.com
```

**For Gmail:** Enable 2-Step Verification → Generate an App Password at:  
`Google Account → Security → 2-Step Verification → App Passwords`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router v7, Framer Motion, React Icons |
| Styling | Vanilla CSS3 (no Bootstrap/Tailwind) |
| Backend | Node.js + Express |
| Email | Nodemailer |
| Font | Inter (Google Fonts) |
| Deployment | Vercel (frontend) + Render (backend) |

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/hr-solutions` | HR Solutions |
| `/learning-solutions` | Learning Solutions |
| `/contact` | Contact |
| `*` | 404 Not Found |

## API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/contact` | HR Solutions enquiry |
| POST | `/api/learning` | Learning Solutions enquiry |
| GET | `/api/health` | Health check |

## Contact Information

- **Phone:** +91 78457 40611 / +91 93802 42884
- **Email:** info@wizaltia.com
- **Address:** 77, Hasthampatti Main Rd, Subbarayan Layout, Hasthampatti, Salem, Tamil Nadu 636007
- **LinkedIn:** [wizaltiahrsolutions](https://in.linkedin.com/company/wizaltiahrsolutions)
