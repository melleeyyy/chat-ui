# AI Chat UI - Hosting & Security Setup

This guide wires your OpenRouter key into `index.html` and gets it hosted **without exposing the key** to visitors.

## Files in this bundle

| File | What it is |
|------|------------|
| `index.html` | Your chat UI, now with a **Settings** panel (gear icon) and a real OpenRouter call. Replaces the old mock-only flow. |
| `worker.js` | Cloudflare Worker proxy. Holds the key server-side. **Recommended.** |
| `api/chat.js` | Vercel Edge Function proxy (same idea, for Vercel). |
| `manifest.json` | Web app manifest - makes the UI installable as an app. |
| `sw.js` | Service worker - offline app shell + install requirement. |
| `icons/` | App icons (192, 512, maskable, apple-touch). |
| `SETUP.md` | This guide. |

## What changed in index.html

- A **gear button** in the header opens a **Settings** modal.
- Three connection modes:
  - **Proxy** (default) - the page calls a serverless function that holds the key. **Use this for anything public.**
  - **Direct** - the page calls OpenRouter directly with a key typed into Settings and saved in this browser's `localStorage`. Only for local/personal testing.
  - **Demo / mock** - the original random mock replies, no API call.
- No key is ever hardcoded in the file. You type it at runtime (Direct) or it lives on the server (Proxy).
- Real streaming responses (token by token), Markdown + code blocks still work.

---

## Option A - Proxy mode (recommended, key stays secret)

The browser talks to your function; the function talks to OpenRouter. A visitor can open View Source all day and still never see the key.

### A1. Deploy the proxy on Cloudflare Workers (free tier is plenty)

```bash
npm install -g wrangler
wrangler login
# from the folder that contains worker.js:
wrangler secret put OPENROUTER_API_KEY     # paste sk-or-v1-... when prompted
wrangler secret put ALLOWED_ORIGIN         # e.g. https://yourname.github.io
wrangler secret put SITE_URL               # e.g. https://yourname.github.io
wrangler secret put SITE_NAME              # e.g. My Chat
# optional guardrails:
wrangler secret put MODEL                  # e.g. openai/gpt-4o-mini  (forces the model)
wrangler secret put MAX_TOKENS             # e.g. 1024               (caps reply length)
wrangler deploy
```

Wrangler prints a URL like `https://ai-chat-proxy.your-name.workers.dev`.

### A2. Point the UI at it

Open your site, click the **gear** icon, set:

- Connection mode: **Proxy (recommended)**
- Proxy URL: `https://ai-chat-proxy.your-name.workers.dev`
- Model: `openai/gpt-4o-mini` (or any OpenRouter model id)

Save. Done.

> The key only ever lives in the Worker's encrypted secrets - never in the repo, never in the page.

### A1-alt. Vercel instead

Put `api/chat.js` at `api/chat.js` in your project, add env vars in the Vercel dashboard (`OPENROUTER_API_KEY`, `ALLOWED_ORIGIN`, optional `MODEL` / `MAX_TOKENS`), redeploy, then set Proxy URL to `/api/chat` (same origin) in Settings.

---

## Option B - Direct mode (local / personal only)

1. Open the page **locally** (double-click the file, or a local server).
2. Gear icon -> Connection mode: **Direct from browser**.
3. Paste your key -> Save. It is stored in `localStorage` for that browser only.

Do **not** ship a public site in Direct mode: anyone using that browser (or anyone who gets the file with your key baked in) can spend your credit. If you must, keep the key out of the committed file and enter it each session.

---

## Hosting the front-end (static)

`index.html` is a single static file, so any static host works:

- **GitHub Pages** - push `index.html` to your repo, Settings -> Pages -> deploy from branch. Live at `https://<user>.github.io/<repo>/`.
- **Cloudflare Pages** or **Netlify** - drag-and-drop the folder, or connect the repo.

Whichever you pick, set `ALLOWED_ORIGIN` on the proxy to that exact origin so other sites can't use your function.

---

## Security checklist

- [ ] **Rotate the key you shared in the screenshot.** It was visible in full, so treat it as compromised. OpenRouter -> Keys -> create a new key, delete the old one.
- [ ] **Set a low credit limit** on the key (OpenRouter lets you cap each key). The onboarding key shown had a $100 cap - lower it if this is a toy project.
- [ ] **Never commit the key.** Add a `.gitignore` and keep secrets in env vars / Worker secrets only. If a key ever lands in a commit, revoke it - deleting the line is not enough, it stays in history.
- [ ] **Lock CORS** with `ALLOWED_ORIGIN` so only your site can call the proxy.
- [ ] **Pin the model and cap `MAX_TOKENS`** on the server (`MODEL`, `MAX_TOKENS`) so a client can't switch to a pricey model or request huge replies.
- [ ] **Consider rate limiting.** An open proxy can be abused. Cloudflare gives you a free rate-limiting rule, or put the Worker behind Cloudflare Access if it's just for you.
- [ ] **Serve over HTTPS** (all the hosts above do this by default) so the key/response isn't sent in the clear.

---

## Testing it

1. Local check, no backend: open `index.html`, leave mode on **Demo / mock** - you should get the original mock replies.
2. Direct check: switch to **Direct**, paste your key, send a message. If you see a red "Connection error" bubble, the message tells you the HTTP status.
3. Proxy check: deploy `worker.js`, set the URL, send a message. In your browser's Network tab, the request to your Worker must **not** contain any `Authorization` header - only the Worker adds it.

## Install it as an app (PWA)

The UI is now a Progressive Web App: it can be installed to a phone or desktop home screen and opens full-screen without the browser chrome.

- **Android / Chrome / Edge:** open the site - an **install icon appears in the header** (next to the gear) when the app is installable. Tap it, or use the browser menu -> *Install app* / *Add to Home screen*.
- **iOS Safari:** tap **Share -> Add to Home Screen**. (iOS does not show the in-page install button - the Share sheet is the only route.)
- **Desktop Chrome/Edge:** an install icon appears in the address bar, or use the header icon.

Requirements and notes:

- It must be served over **HTTPS** (GitHub Pages, Cloudflare Pages, Netlify all do this). Installing from `file://` does not work.
- Relative paths are used throughout, so it works fine from a sub-path like `https://<user>.github.io/chat-ui/`.
- **Offline:** the app shell (page, icons, Markdown renderer) is cached, so it opens offline. Sending messages still needs the network.
- The service worker only ever caches **same-origin GETs**. Your API POSTs - both the `/api/chat` proxy and a direct OpenRouter call - are never cached or served stale.
- **After you edit `index.html`**, bump `VERSION` at the top of `sw.js` (e.g. `v1` -> `v2`) so installed clients pull the new shell instead of the cached one.

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `Connection error ... 401` | Bad/expired key, or Direct mode with an empty key. |
| `Connection error ... 402` | OpenRouter credit limit reached. |
| CORS error in console | `ALLOWED_ORIGIN` on the proxy doesn't match your site's origin. |
| `Server not configured` | `OPENROUTER_API_KEY` secret/env var not set on the proxy. |
| Blank / no stream | Proxy returned non-SSE; check `Content-Type` is `text/event-stream`. |
| No install option appears | Not on HTTPS, or the manifest/SW didn't load. Check DevTools -> Application -> Manifest and Service Workers. |
| Installed app shows the old UI | Bump `VERSION` in `sw.js` and redeploy. |
