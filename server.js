/**
 * ローカル開発用 API サーバー（AI・メール）
 * npm run dev で Vite と同時に起動します。本番は Vercel の /api/* を使用
 */
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
let env = {};
try {
  const envPath = join(__dirname, '.env');
  const content = readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
} catch (_) {}

const PORT = Number(process.env.PORT) || 3001;

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function handleChat(req, res, body) {
  cors(res);
  const key = process.env.ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY;
  if (!key) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set' }));
  }
  const { model = 'claude-sonnet-4-20250514', max_tokens = 1000, messages, system } = body;
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({ model, max_tokens, messages, ...(system && { system }) }),
  });
  const data = await resp.json();
  res.writeHead(resp.status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

async function handleSendEmail(req, res, body) {
  cors(res);
  const key = process.env.RESEND_API_KEY || env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  if (!key) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'RESEND_API_KEY not set' }));
  }
  const { to, subject, html, text } = body;
  if (!to || !subject) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'to and subject required' }));
  }
  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html: html || text || '',
      text: text || (html ? html.replace(/<[^>]+>/g, '') : ''),
    }),
  });
  const data = await resp.json();
  res.writeHead(resp.status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    cors(res);
    res.writeHead(204);
    return res.end();
  }
  if (req.method !== 'POST' || (!req.url.startsWith('/api/chat') && !req.url.startsWith('/api/send-email'))) {
    res.writeHead(404);
    return res.end();
  }
  let raw = '';
  req.on('data', (ch) => (raw += ch));
  req.on('end', () => {
    let body = {};
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch (_) {}
    if (req.url.startsWith('/api/chat')) return handleChat(req, res, body);
    if (req.url.startsWith('/api/send-email')) return handleSendEmail(req, res, body);
    res.writeHead(404);
    res.end();
  });
});

server.listen(PORT, () => console.log(`[API] http://localhost:${PORT} (chat, send-email)`));
