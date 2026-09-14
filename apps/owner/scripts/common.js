import {getLang,setLang,t,languageOptions} from '../shared/i18n/translations.js';
export const API=(window.BO_CONFIG?.API_BASE||localStorage.getItem('bo_api')||'/api').replace(/\/$/,'');
export const token=()=>localStorage.getItem('bo_token')||sessionStorage.getItem('bo_token');
export const user=JSON.parse(localStorage.getItem('bo_user')||sessionStorage.getItem('bo_user')||'null');

function svgIcon(name){
  const icons={
    home:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    admins:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 19c.7-3 2.5-4.6 5.5-4.6s4.8 1.6 5.5 4.6M16 7.5a2.5 2.5 0 1 1 0 5M16.5 14.7c2.2.4 3.5 1.8 4 4.3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    clients:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3.5 19c.7-3 2.5-4.6 5.5-4.6s4.8 1.6 5.5 4.6M15.5 10h5M18 7.5v5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    orders:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 8h8M8 12h8M8 16h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    messages:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5h16v11H9l-5 3v-14Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 10h8M8 13h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    settings:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m19 13.5 1.3 1-.1 1.8-1.7 1.1-1.8-.7-1.2.8-.3 1.9-1.7.8-1.6-1.1-.2-1.8-1.5-.6-1.7.8-1.6-1-0.1-1.8 1.3-1.1-.2-1.5-1.4-1.1.1-1.9 1.7-.8 1.6.7 1.2-.8.3-1.9 1.7-.8 1.6 1.1.2 1.8 1.5.6 1.7-.8 1.6 1 .1 1.8-1.3 1.1.2 1.5 1.4 1.1-.1 1.9-1.7.8-1.6-.7-1.2.8-.3 1.9-1.7.8-1.6-1.1-.2-1.8-1.5-.6-1.7.8-1.6-1-.1-1.8 1.3-1.1-.2-1.5-1.4-1.1.1-1.9 1.7-.8 1.6.7 1.2-.8.3-1.9 1.7-.8 1.6 1.1.2 1.8 1.5.6 1.7-.8 1.6 1-.1 1.8-1.3 1.1.2 1.5Z" fill="none" stroke="currentColor" stroke-width="0.9" stroke-linejoin="round"/></svg>'
  };
  return icons[name]||icons.home;
}
function mountMobileNav(role){
  if(document.getElementById('mobileNav')) return;
  const path=location.pathname.toLowerCase();
  const page=path.endsWith('admins')||path.includes('/admins')||path.endsWith('admins.html')?'admins':
    path.endsWith('clients')||path.includes('/clients')||path.endsWith('clients.html')?'clients':
    path.endsWith('orders')||path.includes('/orders')||path.endsWith('orders.html')?'orders':
    path.endsWith('messages')||path.includes('/messages')||path.endsWith('messages.html')?'messages':
    path.endsWith('settings')||path.includes('/settings')||path.endsWith('settings.html')?'settings':'home';
  const items=role==='owner'
    ? [['home','index.html','Overview'],['admins','admins.html','Admins'],['clients','clients.html','Clients'],['orders','orders.html','Orders'],['settings','settings.html','Settings']]
    : [['home','index.html','Dashboard'],['clients','clients.html','Clients'],['orders','orders.html','Orders'],['messages','messages.html','Messages'],['settings','settings.html','Settings']];
  const host=document.createElement('div');host.id='mobileNav';
  host.innerHTML=`<nav class="bottom-nav admin-mobile-nav" aria-label="Primary navigation">${items.map(([k,href,label])=>`<a class="${page===k?'active':''}" href="${href}"><span class="icon">${svgIcon(k)}</span><span>${label}</span></a>`).join('')}</nav>`;
  document.body.appendChild(host);
}

export function init(){if(!user||user.role!=='owner'){location.href='login.html';return false}document.querySelectorAll('[data-lang]').forEach(e=>{e.innerHTML=languageOptions();e.onchange=x=>setLang(x.target.value)});document.querySelectorAll('[data-t]').forEach(e=>e.textContent=t(e.dataset.t));document.querySelectorAll('[data-logout]').forEach(e=>e.onclick=()=>{localStorage.removeItem('bo_token');localStorage.removeItem('bo_user');sessionStorage.removeItem('bo_token');sessionStorage.removeItem('bo_user');location.href='login.html'});mountMobileNav('owner');return true}
export async function api(path,opt={}){const auth=token();const r=await fetch(API+path,{...opt,headers:{'Content-Type':'application/json',...(opt.headers||{}),...(auth?{Authorization:`Bearer ${auth}`}:{})}});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||'Request failed');return d}
