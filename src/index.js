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

  const toyCollectionDiv = document.getElementById('toy-collection')
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => createToyCards(json))

  function createToyCards(toys) {
    toys.forEach(toy => {
      let toyId = toy["id"]
      let toyName = toy["name"]
      let toyImageUrl = toy["image"]
      let toyLikes = toy["likes"]

      let toyDiv = document.createElement('div')
      toyDiv.setAttribute('class', 'card')

      let toyImage = document.createElement('img')
      toyImage.setAttribute('src', toyImageUrl)
      toyImage.setAttribute('class', 'toy-avatar')
      toyImage.setAttribute('width', '75px')

      let toyDescription = document.createElement('h2')
      toyDescription.innerHTML = toyName

      let toyLikesP = document.createElement('p')
      toyLikesP.innerHTML = `${toyLikes}`

      let likeButton = document.createElement('button')
      likeButton.setAttribute('class', 'like-btn')
      likeButton.setAttribute('id', toyId)
      likeButton.innerHTML = 'Like'

      toyDiv.appendChild(toyImage)
      toyDiv.appendChild(toyDescription)
      toyDiv.appendChild(toyLikesP)
      toyDiv.appendChild(likeButton)

      toyCollectionDiv.appendChild(toyDiv)
      likeButton.addEventListener('click', increaseLikes(toyId))
    })
  }

  function increaseLikes(id) {
    let currentLikes = document.getElementById(`${id}`)
    let likeNumber = currentLikes.previousSibling.innerText
    let configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": `${parseInt(likeNumber, 10) + 1}`
      })
    }
    fetch(`http://localhost:3000/${id}`, configObject)
    .then(resp => resp.json())
    .then(json => console.log(json))
    .catch(error => console.log(error.message))

    likeNumber = likeNumber + 1
  }

  const addToyForm = document.getElementsByClassName('add-toy-form')

  addToyForm[0].addEventListener('submit', event => {
    let configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": event.target.name.value,
        "image": event.target.image.value,
        "likes": 0
      })
    }
    event.preventDefault()
    fetch('http://localhost:3000/toys', configObject)
    .then(resp => resp.json())
    .then(json => {
      let array = [json]
      createToyCards(array)
    })
    .catch(error => console.log(error.message))
  })
});