let addToy = false;

const toysDiv = document.getElementById("toy-collection")
const newToyForm = document.querySelector("form")

newToyForm.addEventListener("submit", (e) => {
  newToy(e)
})

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  fetchToys()
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

function fetchToys(){
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(toy => {
      displayToy(toy)
    })
  })
}

function displayToy(json){
  const div = document.createElement("div")
  div.setAttribute("id", json.id)
  div.classList.add("card")
  const nameElem = document.createElement("h2")
  nameElem.textContent = json.name
  const likes = document.createElement("p")
  likes.textContent = `${json["likes"]} Likes`
  const toyImage = document.createElement("img")
  toyImage.setAttribute("src", json.image)
  toyImage.classList.add("toy-avatar")
  const likeButton = document.createElement("button")
  likeButton.classList.add("like-btn")
  likeButton.textContent = "Like"

  likeButton.addEventListener("click", (e)=> {
    increaseLikes(e)
  })

  div.appendChild(nameElem)
  div.appendChild(toyImage)
  div.appendChild(likes)
  div.appendChild(likeButton)

  toysDiv.appendChild(div)
}

function increaseLikes(e){
  e.preventDefault()
  const parent = e.target.parentElement
  const likes = parent.querySelector("p")
  const currentLikes = parseInt(likes.innerText, 10)
  const newLikes = currentLikes + 1

  const configObject = {
    method: "PATCH",
    headers: {
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      "likes": newLikes
    })
  }

  fetch(`http://localhost:3000/toys/${parent.id}`, configObject)

  likes.innerText = `${newLikes} Likes`
}

function newToy(e){
  e.preventDefault()
  const configObject = {
    method: "POST",
    headers: {
      "Content-Type" : "application/json",
      "Accept" : "application/json"
    },
    body: JSON.stringify({
      "name" : e.target.name.value,
      "image" : e.target.image.value,
      "likes" : 0
    })
  }

  fetch("http://localhost:3000/toys", configObject)
  .then(resp => resp.json())
  .then(json => displayToy(json))
}