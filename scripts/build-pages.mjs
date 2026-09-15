import fs from 'node:fs';
import path from 'node:path';
const app=process.argv[2]||'owner';if(app!=='owner')throw new Error('This package builds the Owner frontend only');
const root=process.cwd(),src=path.join(root,'apps',app),target=path.join(root,'dist');
for(const required of [src,path.join(src,'index.html'),path.join(src,'login.html')])if(!fs.existsSync(required))throw new Error(`Missing required path: ${required}`);
fs.rmSync(target,{recursive:true,force:true});fs.mkdirSync(target,{recursive:true});fs.cpSync(src,target,{recursive:true});fs.cpSync(path.join(root,'assets'),path.join(target,'assets'),{recursive:true});
for(const file of ['_headers','_redirects']){const f=path.join(root,file);if(fs.existsSync(f))fs.copyFileSync(f,path.join(target,file))}
fs.writeFileSync(path.join(target,'404.html'),'<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="styles/app.css"><title>404</title></head><body class="auth-page"><main class="auth-layout"><section class="auth-box"><h1 class="auth-title">404</h1><p class="auth-sub">Page not found.</p><a class="btn" href="login.html">Return to Login</a></section></main></body></html>');
fs.copyFileSync(path.join(src,'index.html'),path.join(target,'dashboard.html'));console.log('Owner build prepared.');
