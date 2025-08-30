
const CACHE_NAME = 'helpdesk-v1';
const ASSETS = ['./','./index.html','./data.json','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
    const clone=res.clone();
    caches.open(CACHE_NAME).then(c=>c.put(e.request, clone));
    return res;
  }).catch(()=>cached)));
});
