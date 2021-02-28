let addToy = false;
let toysDiv = document.querySelector("#toy-collection");

document.addEventListener("DOMContentLoaded", () => {
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
  getToys();
});

function getToys() {
  return fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => {
      displayToys(toy);
    })
  });
}

function displayToys(toy) {
  let divCard = document.createElement("div");
  divCard.setAttribute("class", "card");
  toysDiv.append(divCard);
}


