let toyCollection = document.querySelector('#toy-collection')
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
});

function initialize() {
  // GET Request here
  // For Each Toy, cardMaker, and addToDiv

  fetch("http://localhost:3000/toys")
    .then(function (response) {
      return response.json();
    })
    .then(function (toys) {
      toys.forEach(toy => {
        cardMaker(toy);
      });
    });
}

const form = document.getElementsByClassName("add-toy-form");
form[0].addEventListener("submit", (event) => {
  console.log("SUBMIT!!")
  postToy(event)
})

function postToy(toy) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy.target.name.value,
      "image": toy.target.image.value,
      "likes": 0

    })
  })
    .then(function (response) {
      response.json();
    })
    .then(function (toy) {
      cardMaker(toy);
    })
}

function patchToy(number) {
  e.preventDefault()

  let id = e.target.previousElementSibling.id
  let currentLikes = e.target.previousElementSibling.innerText.split(" ")[0]
  let updated = parseInt(currentLikes) + 1

  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "likes": `${updated}`
    })
  })
    .then(resp => resp.json())
    .then(object => {
      e.target.previousElementSibling.innerText = `${updated} likes`;
    })
}

function cardMaker(toy) {
  // div CLASS is card
  // h2 name
  // img src image class=toy-avatar
  // p number of likes
  // button class like-btn
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let button = document.createElement('button')
  button.className = "like-btn"
  button.innerText = "like"

  button.addEventListener("click", (e) => {
    let increase = toy.likes++
    p.innerText = `${increase} likes`
    patchToys(e)
  })

  let card = document.createElement('div')
  card.className = "card"
  card.append(h2, img, p, button)
  toyCollection.append(card)
}


initialize();

