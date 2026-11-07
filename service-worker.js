// Bok Bok Spil - Service Worker for PWA
const CACHE_NAME = 'bokbok-v2';
const OFFLINE_URL = '/bokbok/';

// Self-update: Change this version when you update the app
const APP_VERSION = '2.0.0';
const urlsToCache = [
  '/bokbok/',
  '/bokbok/index.html',
  '/bokbok/style.css',
  '/bokbok/script.js',
  '/bokbok/manifest.json',
  '/bokbok/icon-192x192.png',
  '/bokbok/icon-512x512.png'
];

// Install service worker and cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Cache failed:', error);
      })
  );
});

// Fetch from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached response if available
        if (response) {
          return response;
        }
        // Otherwise fetch from network
        return fetch(event.request);
      })
      .catch((error) => {
        console.error('Fetch failed:', error);
      })
  );
});

// Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Send a message to all clients that a new version is ready
  event.waitUntil(
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({ type: 'NEW_VERSION_AVAILABLE', version: APP_VERSION });
      });
    })
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
