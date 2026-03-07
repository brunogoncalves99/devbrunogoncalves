const CACHE_NAME = 'portfolio-v2';
const STATIC_CACHE = 'portfolio-static-v2';
const DYNAMIC_CACHE = 'portfolio-dynamic-v2';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/css/style.css',
  '/src/js/script.js',
  'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css',
  'https://unpkg.com/scrollreveal',
  'https://cdn.jsdelivr.net/npm/typed.js@2.0.12'
];

// Cache-first strategy for static assets
const cacheFirst = async (request) => {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Cache-first failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
};

// Network-first strategy for dynamic content
const networkFirst = async (request) => {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
};

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Cache static assets
  if (STATIC_ASSETS.some(asset => url.href.includes(asset))) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

  // Network first for API calls and dynamic content
  if (url.pathname.startsWith('/api/') || event.request.method !== 'GET') {
    event.respondWith(networkFirst(event.request));
    return;
  }

  // Default cache-first for other requests
  event.respondWith(cacheFirst(event.request));
});