const searchbar = document.getElementById("search-bar")
const searchoutput = document.getElementById("search-output")
const searchtemplate = document.getElementById("search-result-template")

console.log(searchtemplate)

searchbar.addEventListener("input", searchHospital)

function searchHospital(){
    console.log(searchbar.value)
    searchoutput.innerHTML = ""
    fetch("./hospitals.json").then((response) => {
        return response.json()
    }).then(data => {
        if(searchbar.value != ""){
            for(let i = 0; i < data.hospitals.length; i++){
                console.log(i)
                if(data.hospitals[i].name.toLowerCase().startsWith(searchbar.value.toLowerCase())){
                    let templateCopy = searchtemplate.content.cloneNode(true).children[0]
                    console.log(templateCopy)
                    templateCopy.innerHTML = data.hospitals[i].name
                    searchoutput.appendChild(templateCopy)
                }
            }
        }
    })
}