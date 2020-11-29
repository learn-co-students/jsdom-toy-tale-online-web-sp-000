let addToy = false;
const toyBox = document.getElementById("toy-collection");

function collectToys() {
  return fetch('http://localhost:3000/toys')
    .then(function(response) {return response.json()})
    .then(function(data) {
      for (const checkToy in data) {
        console.log(data[checkToy]);
        console.log(data[checkToy].name);

        let card = document.createElement("div");
        card.setAttribute('class', 'card');
        
        let name = document.createElement("h2");
        name.textContent = data[checkToy].name;
        card.appendChild(name);
        
        let img = document.createElement("img");
        img.setAttribute('class', 'toy-avatar')
        img.src = data[checkToy].image;
        card.appendChild(img);

        let liked = document.createElement("p");
        liked.textContent = `${data[checkToy].likes} likes`;
        card.appendChild(liked);

        let button  = document.createElement("button");
        button.setAttribute('class', 'like-btn');
        button.textContent = `Like <3`;
        card.appendChild(button);

        toyBox.appendChild(card);
      }
      
      console.log(`Filled the toyBox`)
    });
  }

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
  collectToys();
});
