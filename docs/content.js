//DOM Elements
const euContent = document.getElementById("eucontent");
const nonEuContent = document.getElementById("noneucontent");

const euButton = document.getElementById("eu");
const nonEuButton = document.getElementById("noneu");

//Event Listeners
euButton.addEventListener("click", euSelected);
nonEuButton.addEventListener("click", nonEuSelected);

console.log("WORKING")

function euSelected(){
    //Show the EU Content, hide the non EU Content
    euContent.style.display = "";
    nonEuContent.style.display = "none";

    //Change styling for the buttons
    euButton.classList.add("active");
    nonEuButton.classList.add("inactive");
    euButton.classList.remove("inactive");
    nonEuButton.classList.remove("active");
    console.log("EU");
}

function nonEuSelected(){
    //Show the Non EU Content, hide the EU Content
    euContent.style.display = "none";
    nonEuContent.style.display = "";

    //Change styling for the buttons
    nonEuButton.classList.add("active");
    euButton.classList.add("inactive");
    nonEuButton.classList.remove("inactive");
    euButton.classList.remove("active");
    console.log("NONEU");
}
