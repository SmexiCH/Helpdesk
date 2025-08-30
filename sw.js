
const CACHE='helpdesk-final-v1';
const ASSETS=['./','./index.html','./data.json','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));self.clients.claim();});
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(cc=>cc.put(e.request,c));return r;}).catch(()=>h)));});
