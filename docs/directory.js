const address = document.getElementById("hospitaldirectory");

fetch("./hospitals.json").then((response) => {
        return response.json()
    }).then(data => {
        console.log(address)
        for(let i = 0; i < data.hospitals.length; i++){
            //Unga Bunga code
            console.log("<li><a href='./hospital_page.html?hospital_id=" + i + "'>" + data.hospitals[i].name + "</a></li>")
            address.innerHTML += "<li><a href='./hospital_page.html?hospital_id=" + i + "'>" + data.hospitals[i].name + "</a></li>"
        }
})
