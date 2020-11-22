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
  // make a 'GET' request to fetch all the toy objects
  let destUrl = "http://localhost:3000/toys";
  let toyData = {
    id: "",
    name: "",
    image: "",
    likes: ""
  };
  let configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyData)
  }
  fetch(destUrl)
    .then(response => response.json())
    .then(json => renderToys(json));
});

function renderToys(json) {
  const toyCollection = document.querySelector("#toy-collection");
  json.forEach(toy => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `${toy.name}`;
    toyCollection.appendChild(card);
  })
}
