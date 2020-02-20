const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", function() {
  let createButton = document.getElementById('create-button')
  createButton.addEventListener('click', clickHandler)
  getFetch()
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// OR HERE!
function getFetch() {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then( json => {
    json.forEach( toy => {
      render(toy)
    })
  })
}

function render(toy) {
  let toyCollection = document.getElementById('toy-collection')
  let div = document.createElement('div')
  div.className = 'card'
  let h2El = document.createElement('h2')
  let imageEl = document.createElement('img')
  imageEl.className = 'toy-avatar'
  let pEl = document.createElement('p')
  pEl.id = `p-tag-${toy.id}`
  let likeButton = document.createElement('button')
  likeButton.id = `like-${toy.id}`

  toyCollection.appendChild(div)
  div.appendChild(h2El)
  div.appendChild(imageEl)
  div.appendChild(pEl)
  div.appendChild(likeButton)

  likeButton.addEventListener('click', likeButtonHandler)

  h2El.innerText = toy.name
  imageEl.src = toy.image
  pEl.innerText = `${toy.likes} Likes`
  likeButton.innerText = 'Like <3'

  // let renderData =
  //   `<div class="card">
  //   <h2>${toy.name}</h2>
  //   <img src=${toy.image} class="toy-avatar">
  //   <p>${toy.likes} Likes <p>
  //   <button id='like-${toy.id}' class="like-btn like-1">Like <3</button>
  //   </div>`
  // document.getElementById('toy-collection').innerHTML += renderData
}

function clickHandler(event) {
  event.preventDefault()
  let inputName = document.getElementById('input-name').value
  let inputUrl = document.getElementById('input-url').value
  let numberOfLikes = 0
  postFetch(inputName, inputUrl, numberOfLikes)
}

function postFetch(name, image, likes) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: name,
      image: image,
      likes: likes
    })
  })
  .then(response => response.json())
  .then(json => {
    // console.log(json)
    render(json)
  })
}

function likeButtonHandler(event) {
  // console.log(event.target)
  // console.log(event.target.parentNode)
  let id = event.target.id.split('-')[1]
  let likesNumber = event.target.parentNode.querySelector('p').innerText.split(' ')[0]
  let likes = parseInt(likesNumber) + 1
  // debugger
  patchFetch(likes, id)
}

function patchFetch(likes, id) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: likes
    })
  })
  .then(response => response.json())
  .then(json => {
     let updateLikes = document.getElementById(`p-tag-${id}`)
     console.log(updateLikes)
     updateLikes.innerHTML = `${likes} Likes`
     // debugger
  })
  // .catch(err => console.log(err))
}
