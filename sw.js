var staticCacheName = 'restaurant-static-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        'index.html',
        'restaurant.html',
        'js/main.js',
        'js/restaurant_info.js',
        'css/styles.css',
        'img/*',
        'js/sw_registration.js',
      ]).catch(error =>{
        console.log('Cache Failed: Errors - ' + error);
      });
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch',function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    if (response !== undefined) {
      return response;
    }
    else {
      return fetch(event.request).then(function(response) {
        var responseClone = response.clone();
        caches.open(staticCacheName).then(
          function (cache) {
            cache.put(event.request, responseClone);
          });
        return response;
      });
    }
  }));
});
