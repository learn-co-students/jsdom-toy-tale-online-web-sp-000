// JS MANTRA:
// When some event happens, I want to make what kind of request and then manipulate the DOM in what way?


let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys (){
  fetch ("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => toys.forEach(toy => appendDiv(toy)));
  // toys is the array of 8 toy objects
}

function appendDiv(toy){
  const container = document.querySelector("#toy-collection");
  const newDiv = document.createElement("div");
  newDiv.classList.add('card');
  container.appendChild(newDiv);
  appendHeading(toy, newDiv);
  appendImage(toy, newDiv);
  appendLike(toy, newDiv);
  appendButton(newDiv);
}

function appendHeading(toy, newDiv){
  const newHeading = document.createElement("h2");
  newHeading.innerHTML = toy.name
  newDiv.appendChild(newHeading);
}

function appendImage(toy, newDiv){
  const newImage = document.createElement("img");
  newImage.classList.add('toy-avatar');
  newImage.src = toy.image
  newDiv.appendChild(newImage);
}

function appendLike(toy, newDiv){
  const newLike = document.createElement("p");
  newLike.innerHTML = `${toy.likes} likes`
  newDiv.appendChild(newLike);
}

function appendButton(newDiv){
  const newButton = document.createElement("button");
  newButton.classList.add('like-btn');
  newButton.innerHTML = "like <3"
  newDiv.appendChild(newButton);
}

function postToy (){
  fetch("http://localhost:3000/toys",configObj)
}

const configObj = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(formData)
};

const addToyForm = document.querySelector(".add-toy-form");
addToyForm.addEventListener('submit', function(event) {
  event.preventDefault()
  const toyName = event.target.name.value
  const toyImage = event.target.image.value
  // console.log("toyForm", event.target.name.value)
})

// function collectData() {

const formData = {
  toyName: 
  
}



