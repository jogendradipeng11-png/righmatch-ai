# RigMatch AI — Autonomous Offshore Oil & Gas Job Matcher & Dispatcher

RigMatch AI connects experienced oil & gas rig professionals (Rig Mechanics, Top Drive Specialists, Chief Engineers, Solids Control Techs) directly with global drilling contractors (Shelf Drilling, Transocean, Halliburton, SLB, ONGC, Aramco, Noble) via intelligent resume matching, AI cover letter generation, a credential documents vault, and direct Gmail dispatch.

---

## 🚀 Fast GitHub & Vercel Deployment Guide

### Step 1: Push Code to Your GitHub Repository

1. **Create a new GitHub repository** at [github.com/new](https://github.com/new) (e.g. `rigmatch-ai`). Leave it empty (without initializing README or .gitignore).

2. **From your terminal or local copy of this project**, connect and push to GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/rigmatch-ai.git
   git push -u origin main
   ```
   *(If you are downloading as a ZIP from the AI Studio top-right settings menu, extract it, open terminal in that folder, and run the commands above).*

---

### Step 2: Deploy to Vercel (2-Minute Setup)

#### Option A: Via Vercel Dashboard (Recommended)
1. Go to **[vercel.com/new](https://vercel.com/new)** and log in with your GitHub account.
2. Select **Import** next to your `rigmatch-ai` repository.
3. Vercel automatically detects the configuration from `vercel.json`:
   - **Framework Preset**: Vite
   - **Build Command**: `vite build`
   - **Output Directory**: `dist`
4. Under **Environment Variables**, add:
   - `GEMINI_API_KEY`: Your Google Gemini API Key (from [Google AI Studio](https://aistudio.google.com/app/apikey)).
5. Click **Deploy**. Vercel will build both the frontend and the `/api` serverless functions.

#### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
# When asked to deploy to production:
vercel --prod
```

---

## 🛠️ Architecture & Vercel Compatibility

- **Frontend**: React 19 + Vite 6 + Tailwind CSS v4 + Lucide Icons + Motion
- **Backend / API**: Express.js with `/api` endpoints:
  - `/api/health`: Service & Gemini status check
  - `/api/match-job`: Rig qualification scoring & gap analysis
  - `/api/generate-cover-letter`: Gemini-tailored contractor cover letter
  - `/api/send-gmail-application`: RFC 2822 base64 multi-part email with credential attachments
  - `/api/linkedin-scrape`: Worldwide oil & gas multi-source crawler
- **Vercel Serverless Function**: Configured in `vercel.json` and `api/index.ts` to seamlessly route all `/api/*` traffic to the Express handler, while serving the static SPA for all web routes.

---

## 🔐 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Google AI Studio API key for rig matching & cover letter generation | Recommended (Fallback heuristic mode enabled if absent) |
| `NODE_ENV` | Environment mode (`production` or `development`) | Auto-set by Vercel |

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run development server (runs on port 3000)
npm run dev

# Build production bundle
npm run build

# Start production server
npm run start
```
