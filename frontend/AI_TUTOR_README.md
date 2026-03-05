# 🤖 AI Tutor Integration Guide

## Overview

This Learning Management System now includes an AI Tutor powered by **Mistral-7B-Instruct-v0.1** from Hugging Face. The AI tutor helps students understand concepts, answer questions, and provide study assistance.

---

## 📁 Folder Structure

```
frontend/
├── app/
│   ├── api/
│   │   └── ai/
│   │       └── route.ts          # Backend API route for AI requests
│   └── ai-tutor/
│       └── page.tsx              # AI Tutor page
├── components/
│   └── AiChat/
│       └── index.tsx             # Reusable AI chat component
├── .env.local                    # Environment variables (DO NOT COMMIT)
└── .env.local.example            # Example environment template
```

---

## 🔑 Setup Instructions

### Step 1: Get Hugging Face API Key

1. Visit [Hugging Face](https://huggingface.co/)
2. Sign up or log in to your account
3. Go to [Settings → Tokens](https://huggingface.co/settings/tokens)
4. Click **"New token"**
5. Give it a name (e.g., "LMS AI Tutor")
6. Select **"Read"** permission
7. Copy the generated token

### Step 2: Configure Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```bash
cp frontend/.env.local.example frontend/.env.local
```

Edit `frontend/.env.local` and add your API key:

```env
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_API_URL=https://learning-management-system-2-fjlm.onrender.com/api
```

### Step 3: Install Dependencies (if needed)

The AI integration uses built-in Next.js APIs, so no additional dependencies are required!

---

## 🚀 Usage

### Accessing the AI Tutor

Navigate to: `http://localhost:3000/ai-tutor`

Or integrate the component anywhere in your app:

```tsx
import AiChat from '@/components/AiChat';

function MyPage() {
  return (
    <div>
      <AiChat />
    </div>
  );
}
```

### Features

✅ **Smart Conversation Context** - Remembers conversation history  
✅ **Error Handling** - Gracefully handles API errors and model loading  
✅ **Loading States** - Shows animated typing indicator  
✅ **Clean UI** - Beautiful Tailwind CSS design  
✅ **Mobile Responsive** - Works on all screen sizes  
✅ **Clear Chat** - Reset conversation anytime  
✅ **Safe API Key** - Never exposed to frontend  

---

## 🔒 Security

### API Key Protection

- ✅ API key is stored **server-side only** in environment variables
- ✅ Frontend never has access to the API key
- ✅ All AI requests go through secure Next.js API route
- ✅ CORS protection enabled

### Best Practices

1. **Never commit** `.env.local` to Git
2. Use `.env.local.example` as a template
3. Store production keys in Vercel environment variables
4. Rotate keys periodically

---

## 🌐 Deployment to Vercel

### Add Environment Variable in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Click **"Add New"**
4. Add:
   - **Name**: `HUGGINGFACE_API_KEY`
   - **Value**: Your Hugging Face API key
   - **Environments**: ✅ Preview ✅ Development ✅ Production
5. Click **Save**
6. Redeploy your application

### Verify Deployment

After deployment, test the AI tutor at your production URL:
`https://your-app.vercel.app/ai-tutor`

---

## ⚙️ Configuration Options

You can customize the AI behavior by modifying parameters in `app/api/ai/route.ts`:

```typescript
const payload = {
  inputs: systemPrompt,
  parameters: {
    max_new_tokens: 200,        // Max response length (50-500)
    temperature: 0.7,           // Creativity (0.0-1.0)
    top_p: 0.95,                // Nucleus sampling (0.0-1.0)
    return_full_text: false,    // Return only new text
    do_sample: true,            // Enable sampling
  },
};
```

### Parameter Explanations

| Parameter | Range | Default | Description |
|-----------|-------|---------|-------------|
| `max_new_tokens` | 50-500 | 200 | Maximum length of response |
| `temperature` | 0.0-1.0 | 0.7 | Creativity level (higher = more creative) |
| `top_p` | 0.0-1.0 | 0.95 | Nucleus sampling threshold |
| `do_sample` | boolean | true | Enable random sampling |

---

## 🛠️ Troubleshooting

### Issue: "AI service not configured"

**Solution**: Make sure `HUGGINGFACE_API_KEY` is set in your `.env.local` file

### Issue: "Model is warming up"

**Solution**: The Mistral model needs ~20-30 seconds to load on first use. Wait a moment and try again.

### Issue: "Failed to get AI response"

**Solutions**:
1. Check your internet connection
2. Verify API key is valid
3. Check Hugging Face API status
4. Try reducing `max_new_tokens` value

### Issue: Slow responses

**Solutions**:
1. Reduce `max_new_tokens` to 100-150
2. The free tier has rate limits - consider upgrading
3. Model may be under heavy load

---

## 📊 Rate Limits

### Hugging Face Free Tier

- **Rate Limit**: ~100 requests/day (varies)
- **Max Tokens**: Limited by model
- **Speed**: May be slower during peak times

For production use with many students, consider:
- Hugging Face Pro plan ($9/month)
- Dedicated inference endpoints
- Caching common responses

---

## 💡 Example Prompts

Students can ask:

- "Explain quantum computing in simple terms"
- "What's the difference between mitosis and meiosis?"
- "How do I solve quadratic equations?"
- "Give me tips for writing better essays"
- "What are the best practices for learning programming?"

---

## 🎨 Customization

### Change AI Personality

Modify the system prompt in `app/api/ai/route.ts`:

```typescript
const systemPrompt = `You are a friendly and encouraging AI tutor.
Your teaching style is:
- Patient and supportive
- Uses real-world examples
- Breaks down complex topics
- Asks follow-up questions to check understanding

User question: ${prompt}`;
```

### Styling

Edit `components/AiChat/index.tsx` to customize colors, layout, and animations.

---

## 📝 API Reference

### POST `/api/ai`

**Request Body:**
```json
{
  "prompt": "Explain photosynthesis",
  "conversationHistory": [
    { "role": "user", "content": "What is biology?" },
    { "role": "assistant", "content": "Biology is..." }
  ]
}
```

**Response (Success):**
```json
{
  "reply": "Photosynthesis is the process...",
  "success": true
}
```

**Response (Error):**
```json
{
  "error": "Model is warming up",
  "retry": true
}
```

---

## 🔗 Resources

- [Hugging Face Documentation](https://huggingface.co/docs/api-inference)
- [Mistral-7B Model Page](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/router-handlers)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Hugging Face API documentation
3. Check browser console for errors
4. Verify environment variables are set correctly

---

**Enjoy your AI-powered Learning Management System! 🎓✨**
