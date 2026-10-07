// Vercel Edge Function - OpenRouter proxy
// Place this file at  api/chat.js  in your project.
// The browser calls  /api/chat  and your key stays on Vercel.
//
// Setup:
//   1. Put this project on Vercel (or run `vercel`).
//   2. Project Settings -> Environment Variables, add:
//        OPENROUTER_API_KEY = sk-or-v1-...
//        ALLOWED_ORIGIN     = https://your-site.vercel.app
//   3. Redeploy.
//
// Then in the chat UI Settings -> Connection mode = "Proxy", Proxy URL = /api/chat

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const cors = {
    'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  };

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405, cors);

  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return json({ error: 'Server not configured: OPENROUTER_API_KEY missing' }, 500, cors);

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return json({ error: 'Invalid JSON body' }, 400, cors);
  }

  if (process.env.MODEL) body.model = process.env.MODEL;
  if (process.env.MAX_TOKENS) {
    const cap = Number(process.env.MAX_TOKENS);
    body.max_tokens = Math.min(Number(body.max_tokens) || cap, cap);
  }

  const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + key,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.SITE_URL || 'https://example.com',
      'X-Title': process.env.SITE_NAME || 'AI Chat UI',
    },
    body: JSON.stringify(body),
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      ...cors,
      'Content-Type': upstream.headers.get('content-type') || 'text/event-stream',
      'Cache-Control': 'no-store',
    },
  });
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}
