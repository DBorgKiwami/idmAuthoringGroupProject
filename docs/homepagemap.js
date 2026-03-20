let map = L.map("map").setView([53.33977105427492, -6.2949987583892755], 5);
let markers = []
let hospitalTimes = []
let userLocation
const currentTime = new Date()
const timestamp = (currentTime.getHours() * 100) + (currentTime.getMinutes())

console.log(timestamp)

const button = document.getElementById("emergency");

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
        hospitalTimes.push([data.hospitals[i].hours.opening, data.hospitals[i].hours.closing])
    }
})

button.addEventListener("click", findNearestHospital);

function findNearestHospital(){
    if(userLocation){
        findClosest()
    }
    else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        return
    }
}

function success(position) {
  console.log(position.coords.latitude, position.coords.longitude);
  userLocation = [position.coords.latitude, position.coords.longitude]
  findClosest()
}

function findClosest(){
    let indexOfClosest, distanceOfClosest
    distanceOfClosest = Infinity
    for(let i = 0; i < markers.length; i++){
        console.log(markers[i]._latlng)
        let distance = Math.abs(userLocation[0] - markers[i]._latlng.lat) + Math.abs(userLocation[1] - markers[i]._latlng.lng)
        if(distance < distanceOfClosest && timestamp > hospitalTimes[i][0] && timestamp < hospitalTimes[i][1] ){
            indexOfClosest = i;
            distanceOfClosest = distance;
        }
    }
    map.panTo(markers[indexOfClosest]._latlng)
    markers[indexOfClosest].openPopup()
}

function error() {
  alert("Sorry, no position available.");
}