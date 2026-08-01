import http from 'http';
import { URL } from 'url';

const PORT = process.env.PORT || 3000;

async function generateText(prompt) {
  const url = 'https://text.pollinations.ai/' + encodeURIComponent(prompt);
  const res = await fetch(url);
  return await res.text();
}

async function chat(messages) {
  const res = await fetch('https://text.pollinations.ai/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'openai', messages, seed: Math.floor(Math.random() * 1e9) })
  });
  return await res.json();
}

function send(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  const url = new URL(req.url, 'http://localhost');

  if (req.method === 'GET' && url.pathname === '/generate') {
    const prompt = url.searchParams.get('prompt') || 'Hello';
    try { return send(res, 200, { ok: true, result: await generateText(prompt) }); }
    catch (e) { return send(res, 500, { ok: false, error: e.message }); }
  }

  if (req.method === 'POST' && url.pathname === '/v1/chat/completions') {
    let body = '';
    for await (const chunk of req) body += chunk;
    try {
      const { messages } = JSON.parse(body);
      const result = await chat(messages);
      return send(res, 200, result);
    } catch (e) { return send(res, 500, { ok: false, error: e.message }); }
  }

  if (req.method === 'GET' && url.pathname === '/') {
    return send(res, 200, {
      name: 'Free AI API',
      endpoints: ['/generate?prompt=...', 'POST /v1/chat/completions'],
      free: true,
      noKey: true
    });
  }

  send(res, 404, { error: 'Not found' });
});

server.listen(PORT, () => console.log('Free AI API running on :' + PORT));
