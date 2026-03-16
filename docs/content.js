const euContent = document.getElementById("eucontent");
const nonEuContent = document.getElementById("noneucontent");

const euButton = document.getElementById("eu");
const nonEuButton = document.getElementById("noneu");

euButton.addEventListener("click", euSelected);
nonEuButton.addEventListener("click", nonEuSelected);

console.log("WORKING")

function euSelected(){
    euContent.style.display = "";
    nonEuContent.style.display = "none";

    euButton.classList.add("active");
    nonEuButton.classList.add("inactive");
    euButton.classList.remove("inactive");
    nonEuButton.classList.remove("active");
    console.log("EU");
}

function nonEuSelected(){
    euContent.style.display = "none";
    nonEuContent.style.display = "";

    nonEuButton.classList.add("active");
    euButton.classList.add("inactive");
    nonEuButton.classList.remove("inactive");
    euButton.classList.remove("active");
    console.log("NONEU");
}