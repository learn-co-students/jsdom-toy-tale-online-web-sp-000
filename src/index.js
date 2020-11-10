let addToy = false;
const toyCollection = document.getElementById('toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', e => {
        e.preventDefault()
        postToy(e.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys()
});

function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(result => result.forEach(toy => {
      renderToy(toy)
    }));
};

function renderToy(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('class', 'toy-avatar')
  img.src = toy.image
  
  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let button = document.createElement('button')
  button.setAttribute('class', 'like-btn')
  button.setAttribute('id', toy.id)
  button.innerText = 'Like <3'
  button.addEventListener('click', e => {
    e.preventDefault()
    addLike(e)
  })
  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, button)
  toyCollection.append(divCard)
};

function postToy(toy) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": 0
    })
  })
    .then(resp => resp.json())
    .then(result => {
      let newToy = renderToy(result)
    })
};

function addLike(event) {
  event.preventDefault()
  let newNumber = parseInt(event.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'likes': newNumber
    })
  })
  .then(resp => resp.json())
  .then(toy => {
    event.target.previousElementSibling.innerText = `${newNumber} likes`
  })
};

 

