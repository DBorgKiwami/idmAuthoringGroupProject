const nameel = document.getElementById("name");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const website = document.getElementById("website");
const hours = document.getElementById("hours");

const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);

const id = searchParams.get("hospital_id")

console.log(searchParams)

fetch("./hospitals.json").then((response) => {
        return response.json()
    }).then(data => {
        nameel.innerHTML = data.hospitals[id].name
        address.innerHTML = data.hospitals[id].lat + " " + data.hospitals[id].lon
        website.innerHTML = data.hospitals[id].website
        hours.innerHTML = data.hospitals[id].hours.opening + " - " + data.hospitals[id].hours.closing
})