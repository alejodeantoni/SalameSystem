const CACHE = 'salamesystem-v10';
const ASSETS = [
  '/SalameSystem/',
  '/SalameSystem/index.html',
  '/SalameSystem/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Para Firebase y APIs externas siempre ir a la red
  if (e.request.url.includes('firebase') || e.request.url.includes('onrender')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
