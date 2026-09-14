import fs from 'node:fs';
import path from 'node:path';

const app = process.argv[2] || 'owner';
const allowed = new Set(['client', 'admin', 'owner']);

if (!allowed.has(app)) {
  throw new Error(`Unknown app: ${app}`);
}

const root = process.cwd();
const appSource = path.join(root, 'apps', app);
const target = path.join(root, 'dist');

if (!fs.existsSync(appSource)) {
  throw new Error(`Missing apps/${app}/ directory`);
}

if (!fs.existsSync(path.join(appSource, 'index.html'))) {
  throw new Error(`Missing apps/${app}/index.html`);
}

fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(appSource, target, { recursive: true });

for (const file of ['_redirects', '_headers']) {
  const source = path.join(root, file);
  if (fs.existsSync(source)) fs.copyFileSync(source, path.join(target, file));
}

console.log(`Build complete: ${target}`);
console.log(`Application: ${app}`);
