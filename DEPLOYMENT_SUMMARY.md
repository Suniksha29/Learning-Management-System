# 🎓 LMS - Complete Setup & Deployment Guide

## 📋 Table of Contents

1. [Project Structure](#project-structure)
2. [Environment Variables Setup](#environment-variables-setup)
3. [Security Guidelines](#security-guidelines)
4. [Landing Page Flow](#landing-page-flow)
5. [AI Tutor Integration](#ai-tutor-integration)
6. [Deployment Instructions](#deployment-instructions)
7. [Troubleshooting](#troubleshooting)

---

## 🏗️ Project Structure

```
Learning-Management-System/
├── backend/                          # Node.js + Express Backend
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/                # Authentication module
│   │   │   ├── subjects/            # Course management
│   │   │   ├── videos/              # Video content
│   │   │   └── progress/            # Progress tracking
│   │   ├── middleware/              # Auth, validation, error handling
│   │   ├── scripts/                 # Database migrations & seeding
│   │   └── server.ts                # Entry point
│   ├── .env                         # Backend environment (DB credentials)
│   └── render.yaml                  # Render deployment config
│
└── frontend/                         # Next.js 14 Frontend
    ├── app/
    │   ├── api/
    │   │   └── ai/
    │   │       └── route.ts         # Secure AI API route
    │   ├── ai-tutor/
    │   │   └── page.tsx             # AI Tutor page
    │   ├── auth/
    │   │   ├── login/
    │   │   └── register/
    │   ├── subjects/
    │   ├── page.tsx                 # Landing page ✨ NEW
    │   └── dashboard.tsx            # User dashboard
    ├── components/
    │   └── AiChat/
    │       └── index.tsx            # AI chat component ✨ NEW
    ├── .env.local                   # Frontend env (SECURE!)
    ├── .env.local.example           # Template
    └── vercel.json                  # Vercel deployment config
```

---

## 🔐 Environment Variables Setup

### **CRITICAL: Location Matters!**

Create `.env.local` in the **ROOT** of the `frontend/` directory:

```
frontend/
├── .env.local          ← HERE (NOT inside app/ or components/)
├── package.json
└── app/
```

### Required Variables

```env
# 🔒 SECURE - Backend Only (NO NEXT_PUBLIC prefix!)
HUGGINGFACE_API_KEY=hf_your_actual_api_key_here

# 🌍 PUBLIC - Can be exposed to frontend (needs NEXT_PUBLIC_ prefix)
NEXT_PUBLIC_API_URL=https://learning-management-system-2-fjlm.onrender.com/api
```

### Where to Get API Keys

1. **Hugging Face API Key**:
   - Visit: https://huggingface.co/settings/tokens
   - Click "New token"
   - Name: "LMS AI Tutor"
   - Permission: Read
   - Copy the generated token

2. **Backend API URL**:
   - Your Render backend URL after deployment
   - Format: `https://your-app.onrender.com/api`

---

## 🛡️ Security Guidelines

### ✅ **DO:**
- Store `.env.local` at root level of frontend
- Use `process.env.HUGGINGFACE_API_KEY` in API routes only
- Add `.env*.local` to `.gitignore`
- Use `NEXT_PUBLIC_` prefix ONLY for variables that need browser access

### ❌ **DON'T:**
- NEVER hardcode API keys in source code
- NEVER use `NEXT_PUBLIC_HUGGINGFACE_API_KEY` (exposes to browser!)
- NEVER commit `.env.local` to Git
- NEVER access secure keys in client components (`'use client'`)

### How Security Works

```typescript
// ✅ CORRECT - Server-side API route
// app/api/ai/route.ts
export async function POST(request: NextRequest) {
  const apiKey = process.env.HUGGINGFACE_API_KEY; // Secure!
  
  const response = await fetch('https://api.huggingface.co/...', {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  });
  
  return Response.json({ result });
}

// ✅ CORRECT - Frontend calls our API
// components/AiChat/index.tsx
const response = await fetch('/api/ai', {
  method: 'POST',
  body: JSON.stringify({ prompt })
});
// Frontend never sees the API key!
```

---

## 🎨 Landing Page Flow

### User Journey

1. **Landing Page** (`/`)
   - Beautiful animated hero section
   - Feature highlights
   - Stats display
   - CTA buttons: "Start Learning Free" & "Try AI Tutor"
   - Minimalist gradient design

2. **Authentication**
   - Click "Get Started" → `/auth/register`
   - Click "Sign In" → `/auth/login`
   - Username required for registration

3. **Dashboard** (`/dashboard`)
   - Shows enrolled courses
   - Access to all subjects
   - AI Tutor button in header
   - Progress tracking

4. **AI Tutor** (`/ai-tutor`)
   - Accessible from landing page OR dashboard
   - Chat interface for study help
   - Powered by Mistral-7B
   - Conversation history support

### Pages Overview

| Page | Path | Access | Description |
|------|------|--------|-------------|
| Landing | `/` | Public | Animated homepage with features |
| Login | `/auth/login` | Public | User authentication |
| Register | `/auth/register` | Public | New user registration |
| Dashboard | `/dashboard` | Protected | Course overview |
| Subjects | `/subjects/[id]` | Protected | Course details |
| Videos | `/subjects/[id]/video/[id]` | Protected | Video player |
| AI Tutor | `/ai-tutor` | Public | AI-powered tutor |

---

## 🤖 AI Tutor Integration

### Features

✅ **Secure Backend Integration**
- API key stored server-side only
- No exposure to frontend
- Hugging Face Mistral-7B-Instruct-v0.1 model

✅ **Smart Conversation**
- Maintains conversation history
- Context-aware responses
- Educational focus

✅ **Beautiful UI**
- Clean chat interface
- Loading animations
- Error handling
- Mobile responsive

### Configuration

Edit parameters in `app/api/ai/route.ts`:

```typescript
const payload = {
  inputs: systemPrompt,
  parameters: {
    max_new_tokens: 200,    // Response length
    temperature: 0.7,        // Creativity (0-1)
    top_p: 0.95,            // Nucleus sampling
  }
};
```

### Example Prompts Students Can Ask

- "Explain quantum computing simply"
- "What's the difference between mitosis and meiosis?"
- "How do I solve quadratic equations?"
- "Give me Python learning tips"
- "Explain supply and demand in economics"

---

## 🚀 Deployment Instructions

### Vercel Frontend Deployment

#### Step 1: Push to GitHub
```bash
cd c:\Users\Lenovo\Downloads\LMS
git add -A
git commit -m "Your message"
git push origin master
```

#### Step 2: Configure Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Import: `Suniksha29/Learning-Management-System`
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend` ⚠️ **IMPORTANT**
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

#### Step 3: Add Environment Variables

In Vercel Dashboard → Settings → Environment Variables:

| Name | Value | Environments |
|------|-------|--------------|
| `HUGGINGFACE_API_KEY` | `hf_xxxxxxxx` | ✅ Preview ✅ Development ✅ Production |
| `NEXT_PUBLIC_API_URL` | `https://...onrender.com/api` | ✅ Preview ✅ Development ✅ Production |

#### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for build (~2-3 minutes)
3. **Redeploy** if you change environment variables!

### Render Backend Deployment

Already deployed at: `https://learning-management-system-2-fjlm.onrender.com`

If redeploying:

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your backend service
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `node dist/server.js`

---

## 🔧 Troubleshooting

### "AI service not configured"

**Problem**: Missing `HUGGINGFACE_API_KEY`  
**Fix**: 
1. Add to `.env.local`: `HUGGINGFACE_API_KEY=hf_xxxxx`
2. Also add to Vercel environment variables
3. Redeploy

### "Model is warming up"

**Problem**: Hugging Face model loading (first request)  
**Fix**: Wait 20-30 seconds and try again

### CORS errors on registration

**Problem**: Backend CORS not allowing Vercel domain  
**Fix**: Already fixed! Backend now allows all `vercel.app` domains

### Registration still failing

**Check**:
1. Backend is running: Visit `/api/health`
2. Network tab shows correct API URL
3. Browser console for errors
4. Try clearing cache (Ctrl+Shift+R)

### Changes not taking effect

**Fix**: Redeploy in Vercel
1. Go to Deployments tab
2. Click latest deployment
3. Click "Redeploy"

---

## 📊 Verification Checklist

Before going live, verify:

- [ ] `.env.local` exists in `frontend/` root
- [ ] `HUGGINGFACE_API_KEY` has NO `NEXT_PUBLIC_` prefix
- [ ] `.env.local` is in `.gitignore`
- [ ] API route uses `process.env.HUGGINGFACE_API_KEY`
- [ ] Frontend calls `/api/ai` (not external API directly)
- [ ] Landing page loads at `/`
- [ ] Login/Register work
- [ ] Dashboard shows courses
- [ ] AI Tutor responds
- [ ] Vercel environment variables set
- [ ] Backend CORS allows Vercel
- [ ] Application redeployed after env changes

---

## 🎯 Quick Start Commands

### Local Development

```bash
# Backend
cd backend
npm install
npm run dev  # Runs on port 5000

# Frontend (new terminal)
cd frontend
npm install
npm run dev  # Runs on port 3000
```

### Build & Test

```bash
cd frontend
npm run build
npm start
```

### Git Workflow

```bash
git add -A
git commit -m "Description of changes"
git push origin master
```

---

## 📚 Documentation Files

- `ENV_SETUP_GUIDE.md` - Detailed security setup
- `AI_TUTOR_README.md` - AI Tutor usage guide
- `README.md` - General project info
- `DEPLOYMENT_SUMMARY.md` - This file

---

## 🔗 Important Links

- **GitHub Repo**: https://github.com/Suniksha29/Learning-Management-System
- **Backend (Render)**: https://learning-management-system-2-fjlm.onrender.com
- **Frontend (Vercel)**: https://your-app.vercel.app
- **Hugging Face**: https://huggingface.co/settings/tokens
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Render Dashboard**: https://dashboard.render.com

---

## 🎉 Success!

Your LMS is now fully configured with:
- ✅ Beautiful animated landing page
- ✅ Secure authentication flow
- ✅ AI-powered tutor integration
- ✅ Proper environment variable security
- ✅ Production-ready deployment

**Happy teaching! 🎓✨**
