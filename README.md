# Audivexa — High-Fidelity Video & YouTube to MP3 Converter

> A modern, production-ready, SaaS-style web platform that converts video files and YouTube video URLs into high-fidelity MP3 audio up to **320 kbps**.

![Audivexa Preview](https://raw.githubusercontent.com/audivexa/brand/main/preview-banner.png)

---

## 🌟 Key Features

- **Drag-and-Drop Video Upload**: High-performance local upload supporting large videos up to 250 MB.
- **Universal Codec & Container Support**: Native FFmpeg support for `.mp4`, `.mov`, `.webm`, `.avi`, `.mkv`, `.flv`, `.wmv`, `.m4v`, `.ts`, `.3gp`, and `.mpeg`.
- **YouTube Link Conversion**: Direct YouTube video URL inspection (title, thumbnail, duration) and audio extraction.
- **Audio Quality Selection**:
  - **320 kbps (Ultra Studio)**: Maximum acoustic depth & Constant Bitrate (CBR) stereo.
  - **192 kbps (High Quality)**: Optimized fidelity and compact file size.
  - **128 kbps (Standard)**: Lightweight audio suitable for speech, voice notes, and podcasts.
- **Real-Time Visualizer & Audio Player**: In-browser waveform playback with interactive scrubbing, play/pause, time tracker, and volume control before downloading.
- **Automatic Ephemeral Storage**: Uploaded video files are destroyed immediately upon audio extraction; converted MP3 files are automatically purged by a background daemon within 15 minutes.
- **Full Security Hardening**: Rate limiting (`express-rate-limit`), security headers (`helmet`), CORS isolation, and strict UUID sanitization to prevent path traversal.
- **Full Multi-Page Suite**:
  - Homepage with interactive Converter & Compliant Ad Placement zone.
  - How It Works guide (`/how-to-use`).
  - Supported Formats matrix (`/supported-formats`).
  - Searchable FAQ knowledge base (`/faq`).
  - Privacy Policy with GDPR/CCPA ephemeral compliance (`/privacy`).
  - Terms of Service & DMCA Guidelines (`/terms`).
  - Validated Contact Page (`/contact`).
  - Audivexa Pro comparison preview modal.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 6, Tailwind CSS, Lucide React, Canvas Confetti, React Router DOM |
| **Backend** | Node.js (ESM), Express.js, Multer, Helmet, CORS, Express Rate Limit |
| **Media Processing** | FFmpeg 6.1 (`fluent-ffmpeg`, `ffmpeg-static`, `ffprobe-static`) |
| **Extraction** | `@distube/ytdl-core` audio streaming pipeline |

---

## 📁 Repository Structure

```
Audivexa/
├── backend/
│   ├── src/
│   │   ├── config/           # App configuration and environment defaults
│   │   ├── controllers/      # Upload, YouTube, conversion, download controllers
│   │   ├── middleware/       # Multer upload, rate limiters, error handling
│   │   ├── routes/           # RESTful API routing (/api/convert, /api/health)
│   │   ├── services/         # FFmpeg transcoder, job queue, cleanup daemon
│   │   ├── utils/            # Sanitization, duration/size formatters, safe delete
│   │   └── server.js         # Express app entrypoint & scheduler bootstrapper
│   ├── .env.example          # Environment variables template
│   ├── .env                  # Local environment file
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── favicon.svg       # Waveform vector favicon
│   │   ├── robots.txt        # SEO bot directives
│   │   └── sitemap.xml       # Dynamic XML sitemap
│   ├── src/
│   │   ├── components/       # Converter, Navbar, Footer, Player, Dropzone, etc.
│   │   ├── pages/            # Home, HowToUse, Formats, FAQ, Privacy, Terms, Contact
│   │   ├── services/         # API client with upload progress
│   │   ├── App.jsx           # Router configuration & layout
│   │   └── index.css         # Tailwind directives & glassmorphism styling
│   ├── index.html            # Primary SEO meta tags & Google fonts
│   ├── vite.config.js        # Vite dev server with proxy to backend
│   ├── tailwind.config.js    # Custom dark navy & violet color tokens
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (Tested on Node v24)
- **npm**: v9.0.0 or higher
- *Note*: You **do not** need to manually install FFmpeg on your operating system; `ffmpeg-static` automatically resolves pre-compiled binaries for Windows, Linux, and macOS.

### 2. Backend Setup
```bash
cd backend
npm install
```

Configure your `.env` file (copied from `.env.example`):
```env
PORT=5050
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MAX_FILE_SIZE_MB=250
JOB_TIMEOUT_MS=300000
CLEANUP_INTERVAL_MINUTES=5
FILE_MAX_AGE_MINUTES=15
```

Start the backend API server:
```bash
npm run dev
# Server will start on http://localhost:5050
```

Verify backend health:
```bash
curl http://localhost:5050/api/health
```

### 3. Frontend Setup
In a new terminal window:
```bash
cd frontend
npm install
npm run dev
# Frontend will be live at http://localhost:5173
```

Visit **`http://localhost:5173`** in your browser.

---

## 🔒 Security & Data Privacy

1. **Ephemeral File Lifecycles**:
   - Uploaded videos are immediately deleted the moment FFmpeg transcoding completes.
   - Converted MP3 audio files are stored in `backend/outputs` and are permanently deleted after **15 minutes**.
2. **Path Traversal Prevention**:
   - Files are stripped of control characters, null bytes, and path delimiters (`/`, `\`, `..`).
   - Temporary file paths utilize random UUID v4 strings.
3. **Shell Injection Protection**:
   - FFmpeg is executed via direct binary execution with discrete arguments array instead of unescaped shell strings.
4. **Rate Limiting**:
   - General API endpoints are limited to 200 requests per 15 minutes.
   - File uploads and YouTube transcoding are limited to 30 requests per 15 minutes per IP.

---

## 🚢 Deployment Guide

### Option A: Full-Stack Docker Deployment (Recommended)
Create a `Dockerfile` in the root:
```dockerfile
FROM node:20-bullseye-slim

# Install system dependencies
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Copy frontend build
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install && npm run build

COPY backend/ ./backend/
EXPOSE 5050

CMD ["node", "backend/src/server.js"]
```

### Option B: Separate Frontend & Backend Hosts
- **Frontend**: Deploy `frontend/dist` to **Vercel**, **Netlify**, or **Cloudflare Pages**. Update `VITE_API_BASE` or rewrites to point to your backend.
- **Backend**: Deploy `backend/` to **Render.com**, **Railway.app**, or **Fly.io** (with persistent disk or ephemeral container with FFmpeg).

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
