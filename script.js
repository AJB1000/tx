// // Supprime tous les Service Workers enregistrés
// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.getRegistrations().then(registrations => {
//         for (let registration of registrations) {
//             registration.unregister();
//             console.log('[SW] Désenregistré:', registration.scope);
//         }
//     });
// }

// const swUrl = `sw.js?v=${Date.now()}`; // ou un hash de contenu

// navigator.serviceWorker.register(swUrl)
//     .then(reg => console.log('[SW] Enregistré:', reg.scope))
//     .catch(err => console.error('[SW] Erreur:', err));

// // --- Lecture des paramètres URL ---
// function getParams() {
//     const params = new URLSearchParams(window.location.search);
//     const lat = params.get('lat');
//     const lon = params.get('lon');
//     return { lat, lon };
// }

// // --- Mise à jour du contenu ---
// function updatePage() {
//     const { lat, lon } = getParams();
//     const el = document.getElementById('info');

//     if (lat && lon) {
//         el.textContent = `📍 Latitude : ${lat}, Longitude : ${lon}`;
//     } else {
//         el.textContent = `Aucune position reçue.`;
//     }
// }

// window.addEventListener('popstate', updatePage);
// updatePage();

// // --- Réception des messages du SW ---
// navigator.serviceWorker.addEventListener('message', event => {
//     if (event.data && event.data.type === 'NAVIGATE') {
//         const newUrl = event.data.url;
//         console.log('🔁 Navigation interceptée :', newUrl);
//         if (window.location.href !== newUrl) {
//             window.location.href = newUrl;
//         }
//     }
// });


// --- Enregistrement du Service Worker ---
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('✅ SW enregistré', reg.scope))
        .catch(err => console.error('❌ Erreur SW', err));
}

// --- Lecture des paramètres URL ---
function getParams() {
    const params = new URLSearchParams(window.location.search);
    const lat = params.get('lat');
    const lon = params.get('lon');
    return { lat, lon };
}

// --- Mise à jour du contenu ---
function updatePage() {
    const { lat, lon } = getParams();
    const el = document.getElementById('info');

    if (lat && lon) {
        el.textContent = `📍 Latitude : ${lat}, Longitude : ${lon}`;
    } else {
        el.textContent = `Aucune position reçue.`;
    }
}

window.addEventListener('popstate', updatePage);
updatePage();

// --- Réception des messages du SW ---
navigator.serviceWorker.addEventListener('message', event => {
    if (event.data && event.data.type === 'NAVIGATE') {
        const newUrl = event.data.url;
        console.log('🔁 Navigation interceptée :', newUrl);
        if (window.location.href !== newUrl) {
            window.location.href = newUrl;
        }
    }
});
