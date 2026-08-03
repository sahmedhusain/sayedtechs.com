const CACHE_NAME = 'sayedtechs-coming-soon-v3';
const APP_SHELL = [
  './',
  './index.html',
  './src/css/main.css',
  './src/css/variables.css',
  './src/css/base.css',
  './src/css/layout.css',
  './src/css/components/coming-soon.css',
  './src/js/main.js',
  './SayedTech-Logo-System/SVG/icon-badge.svg',
  './SayedTech-Logo-System/SVG/logo-horizontal-black.svg',
  './SayedTech-Logo-System/SVG/logo-horizontal-reversed.svg',
  './favicon.ico',
  './favicon.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(APP_SHELL);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Only cache same-origin resources
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        });
      })
    );
  }
});
