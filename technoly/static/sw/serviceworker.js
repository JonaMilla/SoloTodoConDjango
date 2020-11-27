const nombreCache = 'services-v1';

self.addEventListener("install", function(event){
    console.log("SW se esta instalando...");
    event.waitUntil(
        caches.open(nombreCache)
        .then(function(cacheEncontrada){
            return cacheEncontrada.addAll([
                '/',
                '/home/',
                '/static/css/bootstrap.min.css',
                '/static/css/materialize.min.css',
                '/static/js/materialize.min.js',
                '/static/js/jquery-3.5.1.slim.min.js',
                '/static/js/bootstrap.bundle.min.js',
                '/static/js/bootstrap.min.js',
                '/manifest.json'
            ]);
        })
    );
});

self.addEventListener("fetch", function(event){
    console.log("El navegador esta pidiendo la pagina.. " + event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(function(cacheEncontrada){
            if(cacheEncontrada){
                return cacheEncontrada;
            }
            return fetch(event.request)
            .then(function(peticion){
                return peticion;
            });
        })
    )
});


