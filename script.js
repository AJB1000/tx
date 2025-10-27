if ('serviceWorker' in navigator) {
    // Détection du scope actuel
    const scope = new URL('./', window.location).pathname;
    console.log('Scope actuel:', scope);

    navigator.serviceWorker.register('./sw.js')
        .then(registration => {
            console.log('✅ SW enregistré avec succès:', registration);

            // Vérifier l'état
            if (registration.installing) {
                console.log('SW en installation');
            } else if (registration.waiting) {
                console.log('SW en attente');
            } else if (registration.active) {
                console.log('SW actif');
            }
        })
        .catch(error => {
            console.log('❌ Échec enregistrement SW:', error);
        });

    // Écouter les messages du SW
    navigator.serviceWorker.addEventListener('message', event => {
        console.log('Message du SW:', event.data);
    });
}

// Test mode offline
function testOffline() {
    if (!navigator.onLine) {
        console.log('📴 Mode hors ligne détecté');
    }
}
window.addEventListener('offline', testOffline);


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


// https://ajb1000.github.io/test/index.html?lat=5tttpp1&lon=35