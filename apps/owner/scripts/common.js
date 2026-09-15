export const API=(window.BO_CONFIG?.API_BASE||localStorage.getItem('bo_api')||'https://boxoffice-platform-production.up.railway.app').replace(/\/$/,'');
export const token=()=>localStorage.getItem('bo_token')||sessionStorage.getItem('bo_token');
export function currentUser(){try{return JSON.parse(localStorage.getItem('bo_user')||sessionStorage.getItem('bo_user')||'null')}catch{return null}}
export function logout(){localStorage.removeItem('bo_token');localStorage.removeItem('bo_user');sessionStorage.removeItem('bo_token');sessionStorage.removeItem('bo_user');location.href='login.html'}
export function init(){if(currentUser()?.role!=='owner'){location.href='login.html';return false}document.querySelectorAll('[data-logout]').forEach(b=>b.onclick=e=>{e.preventDefault();logout()});return true}
export async function api(path,opt={}){const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),10000);try{const headers={'Content-Type':'application/json',...(opt.headers||{})};const t=token();if(t)headers.Authorization=`Bearer ${t}`;const r=await fetch(API+path,{...opt,headers,signal:opt.signal||controller.signal});const raw=await r.text();let d={};
try{d=raw?JSON.parse(raw):{}}catch{}
if(!r.ok)throw new Error(d.error||`Request failed (${r.status})`);
return d}catch(e){if(e.name==='AbortError')throw new Error('Request timed out');throw e}finally{clearTimeout(timer)}}
export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const initials=n=>String(n||'?').trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();
