#!/usr/bin/env node
// QIS-Skills Studio — a private, local control room for what the public site shows.
//
//   node tools/studio.mjs        → http://127.0.0.1:8421
//
// Reads and writes studio/catalog.json (git-ignored) and runs the publisher.
// Listens on 127.0.0.1 only and rejects cross-site requests.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DEFAULT_CATALOG, ROOT, loadCatalog, validate, publish, formatSummary } from './publish-skills.mjs';

const PORT = Number(process.env.STUDIO_PORT || 8421);
const HOST = '127.0.0.1';
const UI = path.join(path.dirname(fileURLToPath(import.meta.url)), 'studio.html');
const BACKUPS = path.join(path.dirname(DEFAULT_CATALOG), 'backups');
const ALLOWED_HOSTS = new Set([`127.0.0.1:${PORT}`, `localhost:${PORT}`]);

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (c) => { data += c; if (data.length > 2_000_000) reject(new Error('Body too large')); });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function backup() {
  if (!fs.existsSync(DEFAULT_CATALOG)) return;
  fs.mkdirSync(BACKUPS, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  fs.copyFileSync(DEFAULT_CATALOG, path.join(BACKUPS, `catalog-${stamp}.json`));
  const old = fs.readdirSync(BACKUPS).filter((f) => f.startsWith('catalog-')).sort();
  old.slice(0, Math.max(0, old.length - 25)).forEach((f) => fs.rmSync(path.join(BACKUPS, f)));
}

const server = http.createServer(async (req, res) => {
  // DNS-rebinding and cross-site protection: only our own origin may talk to us.
  if (!ALLOWED_HOSTS.has(req.headers.host || '')) return send(res, 403, { error: 'Forbidden host' });
  const origin = req.headers.origin;
  if (req.method !== 'GET' && origin && !ALLOWED_HOSTS.has(origin.replace(/^https?:\/\//, ''))) {
    return send(res, 403, { error: 'Forbidden origin' });
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  try {
    if (req.method === 'GET' && url.pathname === '/') {
      return send(res, 200, fs.readFileSync(UI, 'utf8'), 'text/html; charset=utf-8');
    }
    if (req.method === 'GET' && url.pathname === '/api/catalog') {
      return send(res, 200, loadCatalog());
    }
    if (req.method === 'PUT' && url.pathname === '/api/catalog') {
      if (!(req.headers['content-type'] || '').includes('application/json')) return send(res, 415, { error: 'Expected JSON' });
      const catalog = JSON.parse(await readBody(req));
      validate(catalog);
      backup();
      fs.writeFileSync(DEFAULT_CATALOG, JSON.stringify(catalog, null, 2) + '\n');
      return send(res, 200, { ok: true });
    }
    if (req.method === 'GET' && url.pathname === '/api/plan') {
      const date = url.searchParams.get('date') || undefined;
      return send(res, 200, publish({ date, dryRun: true }));
    }
    if (req.method === 'POST' && url.pathname === '/api/publish') {
      const result = publish();
      console.log('\n' + formatSummary(result, false));
      return send(res, 200, result);
    }
    send(res, 404, { error: 'Not found' });
  } catch (e) {
    send(res, 400, { error: e.message });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`QIS-Skills Studio → http://${HOST}:${PORT}`);
  console.log(`Catalog: ${path.relative(ROOT, DEFAULT_CATALOG)} (private, git-ignored)`);
  console.log('Press Ctrl+C to stop.');
});
