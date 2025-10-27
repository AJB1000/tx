
// Enregistrement avec le bon chemin
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/test/sw.js')
        .then(registration => console.log('SW enregistré:', registration))
        .catch(error => console.log('Échec SW:', error));
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
