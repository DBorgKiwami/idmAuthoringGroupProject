//Script for filling individual hospital page.
//Get DOM Elements
const nameel = document.getElementById("name");
const address = document.getElementById("address");
const phone = document.getElementById("phone");
const website = document.getElementById("website");
const hours = document.getElementById("hours");
const image = document.getElementById("hospital-img");

//Get INDEX from URL
const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);

const id = searchParams.get("hospital_id")

console.log(searchParams)

//Get information of the hospitals and retrieve specific hospital at given index in URL
fetch("./hospitals.json").then((response) => {
        return response.json()
    }).then(data => {
        nameel.innerHTML = data.hospitals[id].name
        address.innerHTML = data.hospitals[id].address
        website.innerHTML = data.hospitals[id].website
        hours.innerHTML = "Monday - Friday: " + data.hospitals[id].hours.opening + " - " + data.hospitals[id].hours.closing
        console.log("images/"+data.hospitals[id].image)
        image.src = "images/"+data.hospitals[id].image
})
