// sw.js — Cache minimal pour fonctionner hors ligne

const CACHE_NAME = 'pwa-coords-v6';
const urlsToCache = [
    '/',
    '/index.html',
    '/script.js',
    '/manifest.json'
];

// Installation : cache les ressources
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

// Activation : supprime les anciens caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Récupération : sert index.html pour toute requête racine
self.addEventListener('fetch', (event) => {
    // Lorsqu'on cherche une page HTML
    if (event.request.mode === "navigate") {
        // On renvoie à la page index.html
        event.respondWith(caches.match("/index.html"));
        return;
    }

    // Pour tous les autres types de requête
    event.respondWith(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(event.request.url);
            if (cachedResponse) {
                // On renvoie la réponse mise en cache si elle est disponible.
                return cachedResponse;
            }
            // On répond avec une réponse HTTP au statut 404.
            return new Response(null, { status: 404 });
        })(),
    );
});