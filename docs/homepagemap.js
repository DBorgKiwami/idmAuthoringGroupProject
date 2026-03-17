let map = L.map("map").setView([53.33977105427492, -6.2949987583892755], 5);
let markers = []

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 20,
    minZoom: 12,
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

fetch("./hospitals.json").then((response) => {
    return response.json()
}).then(data => {
    console.log(data)
    for(let i = 0; i < data.hospitals.length; i++){
        console.log(i)
        markers.push(L.marker([data.hospitals[i].lat, data.hospitals[i].lon]).addTo(map))
        markers[i].bindPopup("<b><a href='./hospital_page.html?hospital_id=" + i + "'>" + data.hospitals[i].name + "</a></b><br>" + data.hospitals[i].hours.opening + " - " + data.hospitals[i].hours.closing + "<br>" + data.hospitals[i].website).openPopup();
    }
})
