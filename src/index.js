const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', createToy);
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener('DOMContentLoaded', getToys);

function getToys() {
  fetch('http://localhost:3000/toys').then(resp => resp.json()).then(function(json) {
    json.map(
      toy => makeToyCard(toy)
    );
  });
}

function makeToyCard(toy) {
  card = `<div class="card">
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes} likes</p>
    <button class="like-btn">Like <3</button>
  </div>`;
  document.querySelector('#toy-collection').innerHTML += card;
}

function createToy(e) {
  e.preventDefault();
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "name": e.name.value,
      "image": e.image.value,
      "likes": 0
    })
  }).then(resp => resp.json()).then(function(json) {
    makeToyCard(json);
  })
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  })
  .then(res => res.json())
  .then((like_obj => {
    e.target.previousElementSibling.innerText = `${more} likes`;
  }))
}
