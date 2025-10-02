const staticCacheName = "pwa-cache-v1";
const assets = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  // Add other necessary assets here
];

// Install event – cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); // Activate the service worker immediately
});

// Activate event – clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== staticCacheName)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim(); // Take control immediately
});

// Fetch event – serve from cache or fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Serve from cache, or fetch from network if not found
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          // If offline and resource not in cache, fallback
          if (event.request.mode === "navigate") {
            return caches.match("/index.html");
          }
        })
      );
    })
  );
});
