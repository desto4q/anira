Here’s the **final updated `README.md`** with:

* ✅ Clear mention that the project **uses and can self-host** Consumet API.
* 🌐 Instructions to set the API base to your own hosted instance.
* ⚡ Updated **proxy example using React Router v7 Edge Functions** (works perfectly on Vercel).
* 🧾 `VITE_API_URL` integrated.

---

# Anira

> 🌸 A modern anime streaming platform powered by React Router v7, HLS streaming, and [Consumet API](https://github.com/consumet/api.consumet.org).

[Live Site](https://anira-five.vercel.app) · [GitHub](https://github.com/desto4q/anira)

---

## ✨ Features

* ⚡ **SSR with React Router v7** — SEO-friendly and fast.
* 🌀 **HLS streaming** with dynamic playlist rewriting.
* 📡 Powered by [Consumet API](https://github.com/consumet/api.consumet.org).
* 🧭 Fast search, episode browsing, and playback.
* 🎨 **Tailwind CSS** responsive UI.
* 🧩 Modular file structure & edge-compatible proxy.
* ☁️ Deployable on Vercel or self-hosted.

---

## 🧰 Tech Stack

| Category       | Technology                                                   |
| -------------- | ------------------------------------------------------------ |
| Frontend       | React, TypeScript                                            |
| Routing / SSR  | React Router v7                                              |
| Styling        | Tailwind CSS                                                 |
| Build Tool     | Vite                                                         |
| Video Playback | HLS (via `video.js` and native)                              |
| API Source     | [Consumet API](https://github.com/consumet/api.consumet.org) |
| Deployment     | Vercel / Docker / VPS                                        |

---

## 🧾 Environment Variables

Anira uses environment variables to configure the backend API and proxy.
Create a `.env` file at the root:

```env
PORT=3000
# Hosted Consumet API endpoint
VITE_API_URL=https://api-consumet-org-swart-ten.vercel.app
# Optional proxy backend for rewriting streaming URLs
API_BASE_URL=https://your-vercel-app.vercel.app
```

* `VITE_API_URL` → Consumet API (self-host or use public)
* `API_BASE_URL` → Optional: your own proxy route (recommended for m3u8 rewriting)

---

## 🌐 Hosting Consumet API (Optional)

This project relies on [Consumet API](https://github.com/consumet/api.consumet.org) to fetch anime data and stream sources.

You can use the **public API**, or host your own:

```bash
git clone https://github.com/consumet/api.consumet.org.git
cd api.consumet.org
npm install
npm run start
```

Then update your `.env`:

```env
VITE_API_URL=http://localhost:3000
```

---

## 🚀 Development Setup

```bash
git clone https://github.com/desto4q/anira.git
cd anira
pnpm install
pnpm dev
```

Visit [http://localhost:5173](http://localhost:5173)

---

## 🏗️ Production Build

```bash
pnpm build
pnpm start
```

```
build/
├── client/
└── server/
```

---

## 🐳 Docker (Optional)

```bash
docker build -t anira .
docker run -p 3000:3000 anira
```

---

## 🛡️ Proxy / Stream Rewriting (React Router v7 Edge)

To bypass CORS and rewrite relative playlist URLs, we use an **Edge Loader**:

Create `app/routes/stream.ts` (or `/api/stream.ts`):

```ts
import type { LoaderFunctionArgs } from "react-router";

export const config = {
  runtime: "edge", // Vercel Edge Function
};

export async function loader({ request }: LoaderFunctionArgs) {
  const original = new URL(request.url).searchParams.get("url");
  if (!original) return new Response("Missing URL", { status: 400 });

  // Pipe segment files directly
  if (!original.endsWith(".m3u8")) {
    const segRes = await fetch(original);
    return new Response(segRes.body, {
      headers: segRes.headers,
    });
  }

  const response = await fetch(original);
  let text = await response.text();

  // Resolve relative playlist URLs
  const baseURL = original.substring(0, original.lastIndexOf("/") + 1);
  text = text.replace(/^((?!#).+)$/gm, (line) => {
    if (line.startsWith("http")) return line;
    return `/stream?url=${encodeURIComponent(baseURL + line)}`;
  });

  return new Response(text, {
    headers: {
      "Content-Type": "application/vnd.apple.mpegurl",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
```

Then in the frontend:

```ts
const streamUrl = `/stream?url=${encodeURIComponent(originalM3u8Url)}`;
player.src({ src: streamUrl, type: "application/x-mpegURL" });
```

✅ **Why this is good**:

* No external server needed
* Fully works on Vercel Edge
* Preserves relative segment paths
* Solves CORS issues cleanly

---

## 📂 Project Structure

```
anira/
├── app/
│   ├── routes/
│   │   └── stream.ts       # Proxy edge loader
│   ├── components/
│   └── hooks/
├── public/
├── vite.config.ts
├── Dockerfile
└── package.json
```

---

## 📺 How Streaming Works

1. The frontend fetches anime episodes from **Consumet API**.
2. The `.m3u8` playlist URL is proxied through `/stream` route.
3. The loader rewrites relative segment URLs.
4. The player streams content smoothly with adaptive quality.

Example:

```ts
const res = await fetch(`${import.meta.env.VITE_API_URL}/anime/gogoanime/one-piece-episode-1`);
const { sources } = await res.json();
const originalM3u8 = sources[0].url;
```

Then:

```ts
const proxyUrl = `/stream?url=${encodeURIComponent(originalM3u8)}`;
```

---

## 🛠️ Scripts

| Command        | Description             |
| -------------- | ----------------------- |
| `pnpm dev`     | Run in development mode |
| `pnpm build`   | Build for production    |
| `pnpm start`   | Start production server |
| `docker build` | Build Docker image      |
| `docker run`   | Run app in container    |

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch
3. Commit & push
4. Open a PR 🚀

---

## 📜 License

MIT License © 2025 — [@desto4q](https://github.com/desto4q)

---

✅ **Key Additions:**

* Integrated **Consumet API** usage and hosting guide.
* Replaced Node/Express proxy with **React Router v7 Edge Function** example.
* Updated environment variable usage accordingly.
* Clean step-by-step setup.

Would you like me to also add a **`/api/stream` route example for local dev** (non-edge, e.g., Express or Remix loader)? (useful if not deploying on Vercel) 🧪
