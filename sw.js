var staticCacheName = 'restaurant-cahce-1';

let urlToCache = [
    '/',
    './restaurant.html',
    './css/styles.css',
    './data/restaurants.json',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './js/main.js',
    './js/restaurant_info.js',
    './js/dbhelper.js',
    'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'

];
// Install service workers
self.addEventListener("install", event => {
    event.waitUntil(
        caches
        .open(staticCacheName)
        .then(cache => cache.addAll(urlsToCache))
        .then(self.skipWaiting())
    );
});

// Activate service workers

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(cacheNames.map(cache => {
            if (cache !== staticCacheName) {
                console.log("[ServiceWorker] removing cached files from ", cache);
                return caches.delete(cache);
            }
        })))
    )
})

// Fetch service workers
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
