const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/css/style.css',
  '/src/js/script.js',
  'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
  'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});