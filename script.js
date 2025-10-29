// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(registration => {
            console.log('✅ Service Worker enregistré:', registration);
        })
        .catch(error => {
            console.log('❌ Erreur Service Worker:', error);
        });
}

// Fonction pour extraire les paramètres d'URL
function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const lon = urlParams.get('lon');
    const lat = urlParams.get('lat');

    return { lon, lat };
}

// Fonction pour afficher les coordonnées
function displayCoords(lon, lat) {
    document.getElementById('lon').textContent = lon || 'Non défini';
    document.getElementById('lat').textContent = lat || 'Non défini';
    document.getElementById('time').textContent = new Date().toLocaleTimeString();

    // Sauvegarder dans le stockage local pour le offline
    if (lon && lat) {
        localStorage.setItem('lastCoords', JSON.stringify({ lon, lat, timestamp: Date.now() }));
    }
}

// Fonction pour gérer le statut de connexion
function updateConnectionStatus() {
    const statusElement = document.getElementById('status');
    if (navigator.onLine) {
        statusElement.textContent = 'En ligne';
        statusElement.className = 'status online';
    } else {
        statusElement.textContent = 'Hors ligne';
        statusElement.className = 'status offline';
    }
}

// Au chargement de la page
window.addEventListener('load', () => {
    updateConnectionStatus();

    // Récupérer les paramètres d'URL
    const { lon, lat } = getUrlParams();

    if (lon && lat) {
        // Afficher les nouveaux paramètres d'URL
        displayCoords(lon, lat);
    } else {
        // Essayer de récupérer les dernières coordonnées sauvegardées
        const lastCoords = localStorage.getItem('lastCoords');
        if (lastCoords) {
            const { lon: savedLon, lat: savedLat } = JSON.parse(lastCoords);
            displayCoords(savedLon, savedLat);
        }
    }
});

// Écouter les changements de connexion
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

// Écouter les changements d'URL (pour les PWA déjà ouvertes)
window.addEventListener('focus', () => {
    const { lon, lat } = getUrlParams();
    if (lon && lat) {
        displayCoords(lon, lat);
    }
});