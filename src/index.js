const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const toyDiv = document.getElementById("toy-collection");
let addToy = false;

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function() {
  fetchToys();
});

function fetchToys() {
  const toyUrl = "http://localhost:3000/toys";
  fetch(toyUrl)
    .then(resp => resp.json())
    .then(json => {
      console.log(json);
      displayToys(json);
    });
}

function displayToys(json) {
  for (let i = 0; i < json.length; i++) {
    appendToy(json[i]);
  }
}

function appendToy(toy){
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  const nameEl = document.createElement("h2"); //name element
  nameEl.innerHTML = toy.name;
  cardDiv.appendChild(nameEl);

  const imgEl = document.createElement("img"); //image element
  imgEl.src = toy.image;
  imgEl.className = "toy-avatar";
  cardDiv.appendChild(imgEl);

  const likesEl = document.createElement("p"); //likes element
  likesEl.innerHTML = `${toy.likes} likes`;
  cardDiv.appendChild(likesEl);

  const buttonEl = document.createElement("button"); //likes button element
  buttonEl.className = "like-btn";
  buttonEl.innerHTML = "Like <3";
  buttonEl.addEventListener("click", function(e){
    let likes = toy.likes + 1;
    let bodyObj = {
      "likes": likes
    };

    let configObject = {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(bodyObj)
    };

    fetch(`http://localhost:3000/toys/${toy.id}`, configObject)
    .then(resp => resp.json())
    .then(json => likesEl.innerHTML = `${json.likes} likes`)
    .catch(error => console.log(error));
  });
  cardDiv.appendChild(buttonEl);
    
  toyDiv.appendChild(cardDiv);
}

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

// OR HERE!
toyForm.addEventListener("submit", function(e){
  let toyData = {
    name: e.srcElement[0].value,
    image: e.srcElement[1].value,
    likes: 0
  }

  let configObject = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyData)
  };

  fetch("http://localhost:3000/toys", configObject)
    .then(resp => resp.json())
    .then(json => appendToy(json))
    .catch(error => console.log(error));

  e.preventDefault();
});