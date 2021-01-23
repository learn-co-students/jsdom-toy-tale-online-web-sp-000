let addToy = false;
let divCollection = document.querySelector('#toy-collection')
let toyForm = document.querySelector('.container')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        newToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  createToys()
});


function createToys (){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(results => {
    results.forEach(element => {
      let divCard = document.createElement('div')
      divCard.setAttribute('class', 'card')
      let h2El = document.createElement('h2')
      h2El = element.name
      let imgEl = document.createElement('img')
      imgEl.setAttribute('class', 'toy-avatar')
      imgEl.setAttribute('src', 'toy_img_url')
      imgEl.src = element.image
      let pEl = document.createElement('p')
      pEl = `${element.likes}`
      let buttonEl = document.createElement('button')
      buttonEl.setAttribute('class', 'like-btn')
      buttonEl.innerText = "like <3"
      buttonEl.addEventListener('click', () => {
        addLikes(element.likes, element.id)
      })
      divCard.append(h2El, imgEl, pEl, buttonEl)
      divCollection.appendChild(divCard)
    })
  })
}

function newToy (toyInfo) {
  fetch('http://localhost:3000/toys', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    "name": toyInfo.name.value,
    "image": toyInfo.image.value,
    "likes": 0
  })
})
.then(res => res.json())
.then((results) => {
  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  let h2El = document.createElement('h2')
  h2El = results.name
  let imgEl = document.createElement('img')
  imgEl.setAttribute('class', 'toy-avatar')
  imgEl.setAttribute('src', 'toy_img_url')
  imgEl.src = results.image
  let pEl = document.createElement('p')
  pEl = `${results.likes}`
  let buttonEl = document.createElement('button')
  buttonEl.setAttribute('class', 'like-btn')
  buttonEl.innerText = "like <3"
  buttonEl.addEventListener('click', () => {
    addLikes(results.likes, results.id)
  })
  divCard.append(h2El, imgEl, pEl, buttonEl)
  divCollection.append(newToy)
})
}

function addLikes(likeAmount, id){
  likeAmount = likeAmount + 1;
  fetch(`http://localhost:3000/toys/${id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify({
    "likes": likeAmount
  })
  })
  .then(res => res.json())
  .then(results => {
    results = `${likeAmount} likes`;
  })
}






