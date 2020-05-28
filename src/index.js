let addToy = false;

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

  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      makeToyCards(object);
    })
});

function makeToyCards(json) {
  let toyCollection = document.getElementById('toy-collection');
  for(const element of json) {
    let toy = document.createElement('div');
    toy.className = "card";
    toyCollection.appendChild(toy);
  }
}
