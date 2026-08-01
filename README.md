# 🤖 Free AI API

A **free AI text-generation & chat API** — no API key required. Open-source and easy to self-host or deploy for free.

> Powered by [Pollinations.ai](https://pollinations.ai) — a free, no-auth AI service.

## ✨ Features
- 🔓 **No API key needed** — anyone can use it
- 💬 **Chat completions** (OpenAI-compatible)
- ✍️ **Text generation** from a prompt
- 🌐 **CORS enabled** — works from the browser
- ⚡ **Minimal dependencies**

## 🚀 Quick Start
```bash
npm install
npm start
# Server runs on http://localhost:3000
```

## 📡 Endpoints

### Generate text
```bash
curl "http://localhost:3000/generate?prompt=Say+hello+in+3+languages"
```

### Chat (OpenAI-compatible)
```bash
curl -X POST http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Hello!"}]}'
```

## ☁️ Free Deployment
Deploy free on [Render](https://render.com), [Railway](https://railway.app), or [Vercel](https://vercel.com).

## 📄 License
MIT — free for everyone.
