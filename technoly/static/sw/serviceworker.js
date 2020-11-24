const nombreCache = 'pwa-v1';

self.addEventListener("install", function(event){
    event.waitUntil(
        caches.open(nombreCache)
        .then(function(cacheEncontrada){
            return cacheEncontrada.addAll([
                '/',
                '/home/',
                '/agregar/',
                '/static/css/bootstrap.min.css',
                '/static/js/jquery-3.5.1.slim.min.js',
                '/static/js/bootstrap.bundle.min.js',
                '/manifest.json'
            ]);
        })
    );
});

self.addEventListener("fetch", function(event){
    event.respondWith(
        caches.match(event.request)
        .then(function(cacheEncontrada){
            if(cacheEncontrada){
                return cacheEncontrada;
            }
            return fetch(event.request)
            .then(function(peticion){
                return peticion;
                // return caches.open(nombreCache)
                // .then(function(cacheEncontrada){
                //     cacheEncontrada.put(event.request, peticion.clone());
                // });
            });
        })
    )
});