import {API} from './common.js';
const f=document.getElementById('login'),remember=document.getElementById('rememberMe'),submit=f?.querySelector('button[type=submit]');
const saved=localStorage.getItem('bo_owner_login_email');if(saved&&f?.email){f.email.value=saved;remember.checked=true}
f?.addEventListener('submit',async e=>{e.preventDefault();if(submit.disabled)return;submit.disabled=true;submit.textContent='Signing in…';const msg=document.getElementById('msg');msg.textContent='';try{const r=await fetch(API+'/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:f.email.value.trim(),password:f.password.value,role:'owner'})});
const raw=await r.text();let d={};try{d=raw?JSON.parse(raw):{}}catch{}
if(!r.ok)throw new Error(d.error||`Login failed (${r.status})`);
const accessToken=d.token||d.accessToken||d.access_token;
if(!accessToken)throw new Error('Login succeeded but no access token was returned by the server.');const target=remember.checked?localStorage:sessionStorage,targetOther=remember.checked?sessionStorage:localStorage;target.setItem('bo_token',accessToken);target.setItem('bo_user',JSON.stringify(d.user));targetOther.removeItem('bo_token');targetOther.removeItem('bo_user');if(remember.checked)localStorage.setItem('bo_owner_login_email',f.email.value.trim());else localStorage.removeItem('bo_owner_login_email');location.href='index.html'}catch(x){msg.textContent=x.message||'Login failed';submit.disabled=false;submit.textContent='Login Now'}});
