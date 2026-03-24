//Declare the Map
let map = L.map("map").setView([53.33977105427492, -6.2949987583892755], 5);
//Declare Icons
let openIcon = L.icon({
    iconUrl: 'images/open_location_logo.png',
    iconSize:     [80, 80], // size of the icon
    iconAnchor:   [45, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [1, -40]
})
let closedIcon = L.icon({
    iconUrl: 'images/close_location_logo.png',
    iconSize:     [80, 80], // size of the icon
    iconAnchor:   [34, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [1, -40]
})
//Declare array for markers and hospital times
let markers = []
let hospitalTimes = []
//User location variable
let userLocation
//Create timestamp in military time
const currentTime = new Date()
const timestamp = (currentTime.getHours() * 100) + (currentTime.getMinutes())

console.log(timestamp)

//DOM
const button = document.getElementById("emergency");

//Get map tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 20,
    minZoom: 12,
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

//Fetch hospital data
fetch("./hospitals.json").then((response) => {
    return response.json()
}).then(data => {
    console.log(data)
    //Loop through all hospitals
    for(let i = 0; i < data.hospitals.length; i++){
        console.log(i)
        //Add new marker to map with lat and lon of hospital. Change the icon depending on if hospital is open or closed.
        hospitalTimes.push([data.hospitals[i].hours.opening, data.hospitals[i].hours.closing])
        if(timestamp > hospitalTimes[i][0] && timestamp < hospitalTimes[i][1])
            markers.push(L.marker([data.hospitals[i].lat, data.hospitals[i].lon], {icon: openIcon}).addTo(map))
        else{
            markers.push(L.marker([data.hospitals[i].lat, data.hospitals[i].lon], {icon: closedIcon}).addTo(map))
        }
        //Create HTML for Popup (Link to hospital page whilst sending hospital index, display opening hours, hospital website.)
        markers[i].bindPopup("<b><a href='./hospital_page.html?hospital_id=" + i + "'>" + data.hospitals[i].name + "</a></b><br>" + data.hospitals[i].hours.opening + " - " + data.hospitals[i].hours.closing + "<br>" + data.hospitals[i].website).openPopup();
        //Add opening hours to seperate array, used for finding closest hospital.
        hospitalTimes.push([data.hospitals[i].hours.opening, data.hospitals[i].hours.closing])
    }
})

//Add event listener to button to find nearest hospital
button.addEventListener("click", findNearestHospital);

function findNearestHospital(){
    if(userLocation){
        //If we already have the user's location
        findClosest()
    }
    else if (navigator.geolocation) {
        //If we haven't recieved it yet
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        return
    }
}

function success(position) {
  console.log(position.coords.latitude, position.coords.longitude);
    //Save user's location and continue
  userLocation = [position.coords.latitude, position.coords.longitude]
  findClosest()
}

function findClosest(){
    let indexOfClosest, distanceOfClosest
    distanceOfClosest = Infinity
    //Loop through all markers
    for(let i = 0; i < markers.length; i++){
        console.log(markers[i]._latlng)
        //Get distance of hospital from user's location
        let distance = Math.abs(userLocation[0] - markers[i]._latlng.lat) + Math.abs(userLocation[1] - markers[i]._latlng.lng)
        //If the hospital is closer than all over hospitals found so far AND is open, set index and distance
        if(distance < distanceOfClosest && timestamp > hospitalTimes[i][0] && timestamp < hospitalTimes[i][1] ){
            indexOfClosest = i;
            distanceOfClosest = distance;
        }
    }
    //Pan map to closest hospital and open popup of relevant marker
    map.panTo(markers[indexOfClosest]._latlng)
    markers[indexOfClosest].openPopup()
}

function error() {
  alert("Sorry, no position available.");
}
