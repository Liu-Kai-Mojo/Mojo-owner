import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const apiBase = String(process.env.BO_API_BASE || '').trim().replace(/\/$/, '');

if (apiBase && !/^https:\/\//i.test(apiBase) && apiBase !== '/api') {
  throw new Error('BO_API_BASE must be an HTTPS URL or /api');
}

const config = `// Generated at build time. Do not store secrets here.\nwindow.__BO_API_BASE__ = ${JSON.stringify(apiBase || '/api')};\n`;
fs.writeFileSync(path.join(root, 'config.js'), config, 'utf8');
console.log(`BoxOffice build prepared. API base: ${apiBase || '/api'}`);
