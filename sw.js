var staticCacheName = "pwa-v1";

// Install Event: Cache assets
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/app.js",
        "/icons/icon-192.png",
        "icons/icon-512.png"
      ]);
    })
  );
});

// Fetch Event: Serve from Cache or Network
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
