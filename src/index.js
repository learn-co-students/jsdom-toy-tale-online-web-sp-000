  
let addToy = false;
let toysURL = "http://localhost:3000/toys"
const form = document.querySelector("form");
const toyCollection = document.getElementById("toy-collection")
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

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

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    let name = document.querySelector("input[name='name']").value
    let image = document.querySelector("input[name='image']").value
    fetchNewToy(name, image)
  });
});

function getToys(){
  const configObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };
  fetch(toysURL, configObj)
  .then(resp => resp.json())
  .then(resp => resp.forEach(createCards))
};

function createCards(toy){
  let toyCard = document.createElement("DIV");
  let toyName = document.createElement("H2");
  toyName.innerText = toy.name;
  toyCard.appendChild(toyName);
  let toyImage = document.createElement("IMG");
  toyImage.setAttribute('class','toy-avatar');
  toyImage.src = toy.image;
  toyCard.appendChild(toyImage);
  let toyCount = document.createElement("P");
  toyCount.innerText = toy.likes + " Likes";
  toyCard.appendChild(toyCount);
  let button = document.createElement("BUTTON");
  button.setAttribute('class','like-btn');
  button.innerText = "Like ♥️";
  toyCard.appendChild(button);
  toyCollection.appendChild(toyCard);
  likeToy(button, toyCount, toy.id)
};

function fetchNewToy(name, image, likes = 0){
  let formData = {
    name: name,
    image: image,
    likes: likes
  };

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch(toysURL, configObj)
    .then(resp => resp.json())
    .then(resp => createCards(resp))
  form.reset();
};

function fetchLike(num, toyId){
  let formData = {
    id: toyId,
    likes: num
  }
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData),
  };
    fetch(`http://localhost:3000/toys/${toyId}`, configObj)
  
}
function likeToy(button, toyCount, toyId ){
  button.addEventListener("click", (e) => {
    let num = parseInt(toyCount.innerText.split(" ")[0]) + 1
    toyCount.innerText = `${num} Likes`
    fetchLike(num, toyId)
  })
}