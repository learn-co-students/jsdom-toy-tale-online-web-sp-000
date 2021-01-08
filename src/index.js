let addToy = false;

// RETURNS an html card built from the supplied toy object
function createCard(toy) {
  let div = document.createElement("div");
  div.classList.add("card");

  let h2 = document.createElement("h2");
  h2.textContent = toy.name;
  
  let img = document.createElement("img");
  img.classList.add("toy-avatar");
  img.src = toy.image;

  let likesCount = document.createElement("p");
  likesCount.textContent = `${toy.likes} Likes`;
  
  // add event listener
  let likeButton = document.createElement("button")
  likeButton.classList.add("like-btn");
  likeButton.id = toy.id;
  likeButton.textContent = "like";

  likeButton.addEventListener("click", (e) => {
    let likesElement = e.target.parentElement.querySelector("p")
    let currentLikes = parseLikes(likesElement);
    let toy = toysObj[e.target.id];
    
    likesElement.textContent = `${currentLikes + 1} Likes`;
    likeToy(e.target.id, currentLikes);
  });
  
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(likesCount);
  div.appendChild(likeButton);
  return div
}

function parseLikes(p) {
  let likes = p.textContent.split(" ")[0];
  return parseInt(likes, 10)
}

function likeToy(id, currentLikes) {
  return fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": (currentLikes + 1)
    })
  })
}

// POSTS DATA TO SERVER TO ADD a 
function newToy(toyName, toyImageUrl, container)  {
  return fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toyName, 
      "image": toyImageUrl,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then((toy) => {
    toysObj[toy.id] = createCard(toy);
    renderToys(container)
  });
}

function renderToys(container) {
  for (const index in toysObj) {
    container.appendChild(toysObj[index]);
  }
}

function getToys(callback) {
    return fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then((data) => callback(data));
}

const toysObj = {};

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

  const toyCollection = document.getElementById("toy-collection");
  
  // INITIAL RENDER
  getToys((toys) => {
    for (const index in toys) {
      toysObj[index] = createCard(toys[index]);
      toyCollection.appendChild(toysObj[index])
    }
    // renderToys(toyCollection);
  });
  
  // adding a new toy
  let form = document.querySelector("form.add-toy-form");
  let nameInput = form.querySelector("input[name=name]");
  let imageInput = form.querySelector("input[name=image]");

  form.addEventListener("submit", (e) =>{
    let name = nameInput.value;
    let image = imageInput.value;

    newToy(name, image, toyCollection);

    nameInput.value = "";
    imageInput.value = "";
    
    e.preventDefault();
  });

});




