const CACHE_NAME = 'whov1.1';
var urlsToCache = [
	'/',
	'/manifest.json',
	'/nav.html',
	'/index.html',
	'/pages/home.html',
	'/pages/about.html',
	'/pages/contact.html',
	'/pages/funfact.html',
	'/image/me.png',
	'/image/babi.jpg',
	'/image/nezuko.jpg',
	'/image/tanjidor.jpg',
	'/image/zenitsu.jpg',
	'/icon.png',
	'/css/materialize.min.css',
	'/js/materialize.min.js',
	'/js/nav.js'
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  )
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request, { cacheName: CACHE_NAME })
      .then(response => {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
         console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
         return fetch(event.request);
      })
  )
});