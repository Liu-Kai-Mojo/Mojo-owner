const DEFAULT_API='https://boxoffice-platform-production.up.railway.app';
const isLocal=['localhost','127.0.0.1'].includes(location.hostname);
const localOverride=isLocal?String(localStorage.getItem('bo_api')||'').trim():'';
const apiBase=(localOverride||DEFAULT_API).replace(/\/+$/,'');
window.BO_CONFIG=Object.freeze({API_BASE:apiBase});
