let addToy = false
const toysUrl = "http://localhost:3000/toys"

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
  })

function fetchToys() {
  fetch(toysUrl)
  .then(resp => resp.json())
  .then(json => displayToys(json))
}

function displayToys(json){
  for (const object of json) {
    appendToyToDiv(object)
  }
}

function appendToyToDiv(object){
  const toys = document.getElementById('toy-collection')
  let  cards = document.createElement('div')
    cards.className = 'card'

    let  h2 = document.createElement('h2')
    h2.innerHTML = object.name

    const toyImg = document.createElement('IMG')
    toyImg.className = 'toy-avatar';
    toyImg.setAttribute("src", object.image)

    let likes = document.createElement('p')
    likes.innerHTML = `Likes ${object.likes}`


    let likeButton = document.createElement('button')
    likeButton.className = 'like-btn'
    likeButton.innerHTML = 'Like'

    likeButton.onclick = function(){
      updateLikesInServer(object, increaseToyLikes(likes))

    }

    cards.appendChild(h2)
    cards.appendChild(toyImg)
    cards.appendChild(likes)
    cards.appendChild(likeButton)
    toys.appendChild(cards)

}

function increaseToyLikes(likes){
  likesNumber = parseInt(likes.innerHTML.split(" ")[1])
  likes.innerHTML = ++likesNumber
  return likesNumber
}

function updateLikesInServer(object, newLikes){
  objectUrl = `http://localhost:3000/toys/${object.id}`

  let formData = {
    likes: newLikes
  }

  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

fetch(objectUrl, configObj)
  .then(function(response) {
    return response.json()
  })
}

  fetchToys()

let form =  document.getElementById("toy-form")
form.addEventListener("submit", function(event){
  event.preventDefault()
  addToyToList();
  document.getElementById('form-container').style.display = 'none'
})


function addToyToList() {
  let toyName = document.getElementById("toy-name").value;
  let toyUrl = document.getElementById("toy-url").value;

  let formData = {
    name: toyName,
    image: toyUrl,
    likes: 0
  }

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

fetch(toysUrl, configObj)
  .then(function(response) {
    return response.json()
  })
  .then(function(object) {
    appendToyToDiv(object)
  })
  // .catch(function(error) {
  //   appendErrorToDom(error)
  // })
}

})
