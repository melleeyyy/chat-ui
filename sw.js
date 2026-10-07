/* AI Chat UI - service worker
 * Makes the app installable and gives it an offline app shell.
 * All paths are relative so it works under a sub-path (e.g. GitHub Pages /chat-ui/).
 */
const VERSION = 'v1';
const CACHE = 'ai-chat-' + VERSION;

// App shell - must be same-origin and relative.
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

// Third-party, optional. A failure here must never block install.
const OPTIONAL = [
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(CORE.map((url) => cache.add(url).catch(() => {})));
    await Promise.all(OPTIONAL.map((url) => cache.add(url).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) cache.put(request, fresh.clone()).catch(() => {});
    return fresh;
  } catch (e) {
    return cached || Response.error();
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Never touch anything that isn't a GET - this keeps the chat API (POST) live.
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Leave the proxy endpoint alone so replies are never served stale.
  if (url.origin === self.location.origin && url.pathname.endsWith('/api/chat')) return;

  // Page loads: try the network first so you always get the latest UI,
  // and fall back to the cached shell when offline.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put('./index.html', fresh.clone()).catch(() => {});
        return fresh;
      } catch (e) {
        const cache = await caches.open(CACHE);
        return (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
      }
    })());
    return;
  }

  // Everything else (icons, manifest, the CDN script): cache first.
  event.respondWith(cacheFirst(req));
});
