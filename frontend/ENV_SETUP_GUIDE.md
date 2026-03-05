# Secure Environment Variables Configuration

## 🔒 Environment Variable Setup

### Location
Create `.env.local` file in the **root directory** of the frontend project:
```
frontend/
├── .env.local          ← HERE (root level)
├── .env.local.example
├── package.json
└── app/
    ├── api/
    └── ...
```

### Required Environment Variables

```env
# Hugging Face AI API Key - SECURE (Backend Only)
HUGGINGFACE_API_KEY=your_actual_api_key_here

# Backend API URL - PUBLIC (Can be exposed to frontend)
NEXT_PUBLIC_API_URL=https://learning-management-system-2-fjlm.onrender.com/api
```

---

## ⚠️ Security Rules

### ✅ DO:
- Store API keys in `.env.local` at root level
- Use `process.env.HUGGINGFACE_API_KEY` in backend API routes only
- Add `.env*.local` to `.gitignore`
- Use `NEXT_PUBLIC_` prefix ONLY for variables that need frontend access

### ❌ DON'T:
- NEVER hardcode API keys in source code
- NEVER use `NEXT_PUBLIC_HUGGINGFACE_API_KEY` (exposes to browser)
- NEVER commit `.env.local` to Git
- NEVER access secure keys in client components

---

## 🔐 How It Works

### Backend API Route (Secure)
```typescript
// app/api/ai/route.ts
export async function POST(request: NextRequest) {
  const apiKey = process.env.HUGGINGFACE_API_KEY; // ✅ Secure - server-side only
  
  // Call external API with key
  const response = await fetch('https://api-inference.huggingface.co/...', {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  });
  
  return Response.json({ result });
}
```

### Frontend Component (No Access)
```typescript
// components/AiChat/index.tsx
const response = await fetch('/api/ai', {  // ✅ Calls our own API
  method: 'POST',
  body: JSON.stringify({ prompt })
});
// ❌ Cannot access process.env.HUGGINGFACE_API_KEY
```

---

## 📝 .gitignore Configuration

Ensure your `.gitignore` includes:

```gitignore
# local env files
.env*.local

# production
.env.production.local
.env.local
```

This prevents sensitive data from being committed to Git.

---

## 🚀 Vercel Deployment Instructions

### Step 1: Add Environment Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your LMS project
3. Navigate to **Settings → Environment Variables**
4. Click **"Add New"**

### Step 2: Configure Variables

| Name | Value | Environments |
|------|-------|--------------|
| `HUGGINGFACE_API_KEY` | `hf_xxxxxxxxxxxx` | ✅ Preview ✅ Development ✅ Production |
| `NEXT_PUBLIC_API_URL` | `https://...onrender.com/api` | ✅ Preview ✅ Development ✅ Production |

### Step 3: Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click on latest deployment
3. Click **"Redeploy"** button
4. Wait for deployment to complete (~2-3 minutes)

**⚠️ IMPORTANT:** Changes to environment variables require redeployment!

---

## ✅ Verification Checklist

- [ ] `.env.local` is in frontend root directory (not in app/ or components/)
- [ ] `HUGGINGFACE_API_KEY` does NOT have `NEXT_PUBLIC_` prefix
- [ ] `.env.local` is listed in `.gitignore`
- [ ] API route accesses key via `process.env.HUGGINGFACE_API_KEY`
- [ ] Frontend components call `/api/ai` endpoint (not external API directly)
- [ ] Environment variables added to Vercel dashboard
- [ ] Project redeployed after adding variables

---

## 🛡️ Security Architecture

```
┌─────────────────┐
│   Frontend      │
│   (Browser)     │
│                 │
│  fetch('/api/ai')│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Next.js API    │
│  Route          │
│  /api/ai        │
│                 │
│  Uses:          │
│  process.env.   │
│  HUGGINGFACE_   │
│  API_KEY        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Hugging Face   │
│  External API   │
│                 │
│  Bearer Token   │
│  Auth           │
└─────────────────┘
```

**Key Points:**
- Frontend never sees the API key
- All external API calls happen server-side
- Next.js acts as a secure proxy
- Keys stored securely in environment variables

---

## 🆘 Troubleshooting

### "AI service not configured" error
**Cause:** Missing `HUGGINGFACE_API_KEY`  
**Fix:** Add to `.env.local` and redeploy

### "NEXT_PUBLIC_HUGGINGFACE_API_KEY is undefined"
**Good!** This means you're NOT exposing it. Use `process.env.HUGGINGFACE_API_KEY` in API route instead.

### Changes not taking effect
**Fix:** Redeploy the application in Vercel

---

**Your API keys are now properly secured! 🔒**
