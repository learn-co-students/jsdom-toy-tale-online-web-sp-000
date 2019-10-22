const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

const toyContainer = document.querySelector('div#toy-collection');
const newToyForm = document.querySelector('form.add-toy-form');

addBtn.addEventListener('click', () => { toggleForm() });

function toggleForm() {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
}

newToyForm.addEventListener('submit', (event) => {
  event.preventDefault();
  postToy(event.target);
});

function postToy(form) {
  const formData = {
    name: form.name.value,
    image: form.image.value,
    likes: 0
  }
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  return fetch("http://localhost:3000/toys", configObj).then((response) => { return response.json() }).then((json) => {
    buildToyCard(json);
    form.name.value = '';
    form.image.value = '';
    toggleForm();
  });
}

function patchLike(toy) {
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify( {likes: toy.likes + 1 } )
  };

  fetch(`http://localhost:3000/toys/${toy.id}`, configObj).then((response) => { return response.json() }).then((json) => {});
  return toy.likes + 1
}

function buildToyCard(toy) {
  const card = document.createElement("div");
  card.setAttribute("class", "card")
  card.innerHTML = 
    `<h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar">
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like <3</button>`
  toyContainer.append(card)
  card.querySelector('.like-btn').addEventListener('click', (event) => { 
    toy.likes = patchLike(toy);
    card.querySelector('p').innerText = `${toy.likes} Likes`
  });
  return card
}

function loadToys(url) {
  return fetch(url).then((response) => { return response.json() }).then((json) => {
    for (const toy of json) {
      buildToyCard(toy);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => { 
  
  loadToys('http://localhost:3000/toys');
  
});
