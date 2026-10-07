// Cloudflare Worker - OpenRouter proxy
// Keeps your OpenRouter API key on the server. The browser never sees it.
//
// Deploy:
//   1. npm i -g wrangler
//   2. wrangler login
//   3. wrangler secret put OPENROUTER_API_KEY     (paste sk-or-v1-... when prompted)
//   4. wrangler secret put ALLOWED_ORIGIN        (e.g. https://yourname.github.io)
//   5. wrangler deploy
//
// Then in the chat UI Settings -> Connection mode = "Proxy",
// Proxy URL = https://<your-worker>.workers.dev

export default {
  async fetch(request, env) {
    const allowedOrigin = env.ALLOWED_ORIGIN || '*';
    const cors = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }
    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, cors);
    }
    if (!env.OPENROUTER_API_KEY) {
      return json({ error: 'Server not configured: OPENROUTER_API_KEY missing' }, 500, cors);
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return json({ error: 'Invalid JSON body' }, 400, cors);
    }

    // Optional server-side guardrails so a client cannot pick an expensive model
    // or request an unbounded reply. Set these as secrets/vars if you want them.
    if (env.MODEL) body.model = env.MODEL;
    if (env.MAX_TOKENS) {
      const cap = Number(env.MAX_TOKENS);
      body.max_tokens = Math.min(Number(body.max_tokens) || cap, cap);
    }

    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + env.OPENROUTER_API_KEY,
        'Content-Type': 'application/json',
        'HTTP-Referer': env.SITE_URL || 'https://example.com',
        'X-Title': env.SITE_NAME || 'AI Chat UI',
      },
      body: JSON.stringify(body),
    });

    // Stream the response straight back to the browser (works for SSE).
    return new Response(upstream.body, {
      status: upstream.status,
      headers: {
        ...cors,
        'Content-Type': upstream.headers.get('Content-Type') || 'text/event-stream',
        'Cache-Control': 'no-store',
      },
    });
  },
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}
