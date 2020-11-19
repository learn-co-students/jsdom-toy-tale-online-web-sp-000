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
  container.appendChild(newDiv)
  appendHeading(toy, container);
}

function appendHeading(toy, container){
  const newHeading = document.createElement("h2");
  newHeading.innerHTML = toy.name
  container.appendChild(newHeading)
}



