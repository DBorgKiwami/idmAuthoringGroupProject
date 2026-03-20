//Fetching DOM elements
const searchbar = document.getElementById("search-bar")
const searchoutput = document.getElementById("search-output")
const searchtemplate = document.getElementById("search-result-template")

console.log(searchtemplate)

searchbar.addEventListener("input", searchHospital)

function searchHospital(){
    console.log(searchbar.value)
    //Clear any existing results in the search bar
    searchoutput.innerHTML = ""
    //Get the hospital JSON information
    fetch("./hospitals.json").then((response) => {
        return response.json()
    }).then(data => {
        if(searchbar.value != ""){
            //Loop through the hospitals
            for(let i = 0; i < data.hospitals.length; i++){
                console.log(i)
                //If the hospital name starts with the string included in the searchbar...
                if(data.hospitals[i].name.toLowerCase().startsWith(searchbar.value.toLowerCase())){
                    //Make a copy of the template included in the html page
                    let templateCopy = searchtemplate.content.cloneNode(true).children[0]
                    console.log(templateCopy)
                    //Set the text to the hospitals name
                    templateCopy.innerHTML = data.hospitals[i].name
                    //Set the href to a link to the hospital page with the value of the hospital's ID in the included link
                    templateCopy.href = "./hospital_page.html?hospital_id=" + i
                    //Add it to the search bar element
                    searchoutput.appendChild(templateCopy)
                }
            }
        }
    })
}
