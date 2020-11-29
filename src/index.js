let addToy = false;
const toyBox = document.getElementById("toy-collection");
let likebtn = document.querySelectorAll(".like-button");

function collectToys() {
  return fetch('http://localhost:3000/toys')
    .then(function(response) {return response.json()})
    .then(function(data) {
      for (const checkToy in data) {
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

        let button = document.createElement("button");
        button.setAttribute('class', 'like-btn');
        button.textContent = `Like <3`;
        button.setAttribute('data-id', `${data[checkToy].id}`);
        card.appendChild(button);
        
        // button.addEventListener("click", function(event) {
        //   event.preventDefault();
        //   console.log("I've been chosen");
        //   addLikeToToy(checkToy, data[checkToy].likes);
        // });

        toyBox.appendChild(card);
      }
      
      console.log(`Filled the toyBox`)
    });
}

function addNewToy(toyName, toyImage) {
  let formData = {
    name: toyName,
    image: toyImage,
    likes: 0
  };
   
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
   
  return fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    collectToys();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const newToy = document.getElementById("submit-new-toy");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }});
  newToy.addEventListener("click", function(event) {
    event.preventDefault();
    addNewToy(toyName.value, toyImage.value);
  });

  toyBox.addEventListener("click", (e) => {
    if(e.target.className === "like-btn"){
             
      console.log(e.target);
      let currentLikes = 
      parseInt(e.target.previousElementSibling.innerText);
      let newLikes = currentLikes + 1;
      e.target.previousElementSibling.innerText = newLikes + " likes"
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: newLikes
        })
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(object) {
      })
    }
  });
});
  
collectToys();

