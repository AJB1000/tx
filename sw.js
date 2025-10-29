const CACHE_NAME = 'pwa-coords-v2';
const urlsToCache = [
    './',
    './index.html',
    './script.js',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png'
];

// Installation - mise en cache
self.addEventListener('install', event => {
    console.log('🛠️ Service Worker installation');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Mise en cache des fichiers');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('✅ Tous les fichiers sont en cache');
                return self.skipWaiting();
            })
    );
});

// Interception des requêtes
self.addEventListener('fetch', event => {
    // Pour les navigations, toujours servir index.html depuis le cache
    if (event.request.mode === 'navigate') {
        event.respondWith(
            caches.match('./index.html')
                .then(response => {
                    return response || fetch(event.request);
                })
        );
        return;
    }

    // Pour les autres ressources
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                // Pour les autres fichiers, retourner index.html en fallback
                if (event.request.destination === 'script' ||
                    event.request.destination === 'style' ||
                    event.request.url.includes('manifest.json')) {
                    return caches.match('./index.html');
                }
                return new Response('Offline');
            })
    );
});

// Activation
self.addEventListener('activate', event => {
    console.log('🎉 Service Worker activé');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Suppression ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});