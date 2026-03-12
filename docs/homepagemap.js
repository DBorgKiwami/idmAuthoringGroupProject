let map = L.map("map").setView([53.33977105427492, -6.2949987583892755], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 20,
    minZoom: 12,
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

//St James Hospital
var marker = L.marker([53.33977105427492, -6.2949987583892755]).addTo(map);
marker.bindPopup("<b>St James' Hospital</b><br>Opening Hours Here.").openPopup();