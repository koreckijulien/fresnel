const C='rlc-v3',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','favicon.ico'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('rlc-')&&x!==C).map(x=>caches.delete(x)))));self.clients.claim();});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(fetch(e.request).then(r=>{
if(r.ok||r.type==='opaque'){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));}
return r;}).catch(async()=>{
const c=await caches.open(C);
return (await c.match(e.request,{ignoreSearch:true}))||(e.request.mode==='navigate'?(await c.match('index.html')||await c.match('./')):undefined)||Response.error();}));});
