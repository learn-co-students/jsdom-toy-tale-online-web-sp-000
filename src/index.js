let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
        toyFormContainer.addEventListener('submit', (e) => { 
          e.preventDefault()
          addToyFromUser(e.target)
        })
      } else {
        toyFormContainer.style.display = "none";
      }
    });
  });

let toysDiv = document.getElementById('toy-collection')

fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => addToysFromDb(json))

function addToysFromDb(toys) {
  for (const toy of toys) {
    makeCard(toy)
  }
}

function makeCard(toy) {
  let h2 = document.createElement('h2')
  h2.textContent = toy.name
  let img = document.createElement('img')
  img.className = 'toy-avatar'
  img.src = toy.image
  let p = document.createElement('p')
  p.textContent = `${toy.likes} likes`
  let btn = document.createElement('button')
  btn.className = 'like-btn'
  btn.id = toy.id
  btn.textContent = 'Like'
  btn.addEventListener('click', (e) => { addLike(e) })
  let card = document.createElement('div')
  card.className = 'card'
  card.append(h2, img, p, btn)
  toysDiv.appendChild(card)
}

function addLike(e) {
  let likes = e.target.previousElementSibling
  let num = parseInt(likes.textContent) + 1
  likes.textContent = `${num} likes`
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        'likes': num
      })
    })
}

function addToyFromUser(toyObj) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      'name': toyObj.name.value,
      'image': toyObj.image.value,
      'likes': 0
    })
  })
    .then(resp => resp.json())
    .then(obj => makeCard(obj))
    .catch(err => showError(err))
}

function showError(err) {
  let errDiv = document.createElement('div')
  errDiv.className = 'alert'
  errDiv.textContent = err.message
  document.body.appendChild(errDiv)
}
