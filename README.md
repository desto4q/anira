Absolutely ✅ — here’s the **final polished `README.md`** version with a **dedicated section about Consumet API** (including the repo link, how to self-host it, and how to connect Anira to it) 👇

---

# Anira

> 🌸 A modern anime streaming web app built with React Router, SSR, and Vite.

[Live Site](https://anira-five.vercel.app) · [GitHub](https://github.com/desto4q/anira)

---

## ✨ Features

* ⚡ **SSR with React Router** — SEO-friendly and performant
* 🌀 **HLS Anime Streaming** with adaptive quality playback
* 🔍 Anime search, episode listing, and streaming
* 🧭 Fast routing and smooth navigation
* 🎨 **Tailwind CSS** responsive design
* 🧩 Modular route-based architecture
* 🐳 **Docker-ready** deployment
* 🛡️ Optional proxy backend to bypass CORS and protect source URLs
* 🔗 Powered by [Consumet API](https://github.com/consumet/api.consumet.org)

---

## 🧰 Tech Stack

| Category           | Technology                        |
| ------------------ | --------------------------------- |
| Frontend           | React, TypeScript                 |
| Styling            | Tailwind CSS                      |
| Routing / SSR      | React Router v7                   |
| Build Tool         | Vite                              |
| Video Playback     | HLS (via HTML5 / `video.js`)      |
| Data Source        | Consumet API                      |
| Deployment         | Vercel / Docker                   |
| Backend (Optional) | Express / Flask / Cloud Functions |

---

## 🚀 Getting Started

### Prerequisites

* Node.js 16+
* npm or pnpm
* (Optional) Docker

---

## 📥 Installation

```bash
git clone https://github.com/desto4q/anira.git
cd anira
pnpm install
```

### Development

```bash
pnpm dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Production Build

```bash
pnpm build
pnpm start
```

```
build/
├── client/    # Static assets
└── server/    # SSR server
```

---

## 🐳 Docker Deployment

```bash
docker build -t anira .
docker run -p 3000:3000 anira
```

Visit `http://localhost:3000`

---

## 🧾 Environment Variables

You can configure API URLs and ports via a `.env` file at the project root.

Example `.env`:

```env
PORT=3000
# Main anime API (Consumet)
VITE_API_URL=https://api-consumet-org-********.app/
# Optional proxy backend (for CORS bypass / stream protection)
API_BASE_URL=https://your-backend-proxy.com
```

* `VITE_API_URL` → URL of your Consumet API instance *(or public one)*
* `API_BASE_URL` → Optional proxy backend for stream URLs
* `PORT` → Server port in production

Access in code:

```ts
import.meta.env.VITE_API_URL;
import.meta.env.VITE_API_BASE_URL;
```

---

## 🧠 About Consumet API

This project uses the [Consumet API](https://github.com/consumet/api.consumet.org) to fetch anime metadata, episodes, and streaming sources.

### 🏗️ Self-Hosting Consumet

You can deploy your own Consumet instance for better performance and reliability:

```bash
git clone https://github.com/consumet/api.consumet.org.git
cd api.consumet.org
pnpm install
pnpm dev
```

By default it runs on `http://localhost:3000`.
You can also deploy it to:

* 🆓 Vercel
* Railway
* Render
* VPS / Cloud hosting

Then in your `.env` of Anira:

```env
VITE_API_URL=https://your-consumet-instance.vercel.app/
```

---

## 📂 Project Structure

```
anira/
├── app/
│   ├── routes/                 # Pages and loaders
│   ├── components/             # Reusable UI
│   └── hooks/                  # Custom hooks (e.g. player)
├── public/
├── react-router.config.ts
├── vite.config.ts
├── Dockerfile
└── package.json
```

---

## 📺 Streaming & Player API Usage

Anira uses Consumet endpoints to retrieve streaming sources (m3u8) and plays them with an HTML5 HLS player.

### Example API Response

```json
[
  {
    "qualityLabel": "1080p",
    "url": "https://proxy.yourdomain.com/stream/1080p"
  },
  {
    "qualityLabel": "720p",
    "url": "https://proxy.yourdomain.com/stream/720p"
  }
]
```

Frontend fetch example:

```ts
const api = import.meta.env.VITE_API_URL;
const res = await fetch(`${api}/anime/gogoanime/one-piece-episode-1`);
const data = await res.json();
```

---

## 🧰 Optional Proxy Backend

> ⚠️ Directly fetching CDN links may cause CORS issues or expose real source URLs.
> ✅ A proxy backend lets you relay the stream securely.

### Example using Express (Node.js)

```js
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

app.get("/proxy", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("Missing url");

  const response = await fetch(url);
  res.set("Content-Type", response.headers.get("content-type") || "video/mp2t");
  response.body.pipe(res);
});

app.listen(4000, () => console.log("Proxy running on port 4000"));
```

Set in `.env`:

```env
API_BASE_URL=http://localhost:4000
```

Frontend usage:

```ts
const sourceUrl = `${import.meta.env.VITE_API_BASE_URL}/proxy?url=${encodeURIComponent(realSourceUrl)}`;
```

✅ Benefits:

* Bypasses CORS
* Hides real streaming URL
* Add caching, headers, or authentication
* Deployable on Vercel Functions, Railway, Render, Fly.io, or a VPS

---

## 🛡️ Optional Enhancements

* 🔐 Add JWT / token auth to your proxy
* 🧠 Use Cloudflare Workers or Edge Functions for global performance
* 📈 Add request logging and caching to save bandwidth

---

## 🛠️ Available Scripts

| Command        | Description          |
| -------------- | -------------------- |
| `pnpm dev`     | Start dev server     |
| `pnpm build`   | Build for production |
| `pnpm start`   | Run built server     |
| `docker build` | Build Docker image   |
| `docker run`   | Run app in container |

---

## 🤝 Contributing

1. Fork the repo
2. Create a branch `git checkout -b feature/xyz`
3. Commit & push changes
4. Open a Pull Request 🚀

---

## 📜 License

MIT License © 2025 — [@desto4q](https://github.com/desto4q)

---

✅ **Final Notes:**

* `VITE_API_URL` points to your **Consumet API instance**.
* `API_BASE_URL` is optional if you want to **proxy streaming URLs**.
* You can self-host or use the public instance of Consumet.
* This architecture allows for flexible, low-latency anime streaming with control over your backend.

<!--Would you like me to also generate a **`docker-compose.yml`** that runs both **Anira + Consumet** together in one stack (so setup is one command)? 🐳✨-->
