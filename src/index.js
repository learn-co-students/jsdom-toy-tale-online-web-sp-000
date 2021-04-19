let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionDiv = document.getElementById("toy-collection");
  const newToyForm = document.querySelector('.add-toy-form');
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  newToyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementsByClassName('input-text')[0].value;
    const imageInput = document.getElementsByClassName('input-text')[1].value;
  })
  fetchToys();
});


function fetchToys() {
  return fetch('http://localhost:3000/toys')
  .then(response => response.json());
  .then(json => renderToys(json.message));
}

function renderToys(json) {
  json.forEach(toy => {
    addToyCard(toy);
  });
}


function addToyCard(toy) {
  let newCard = document.createElement('div')
  newCard.className = 'card'
  newCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar"></img>
    <p>${toy.likes}</p>
    <button class="like-btn" onclick="increaseLikes(${toy.id})">Like <3</button>
  `
  toyCollectionDiv.innerHTML += newCard;
}

function increaseLikes(toyID) {
  let likedToy;

  fetch(`http://localhost:3000/toys/${toyID}`)
  .then( response => response.json())
  .then ( resJson => likedToy = resJson )
  .then( () => {
    fetch(`http://localhost:3000/toys/${toyID}`) {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: likedToy.name,
        image: likedToy.image,
        likes: ++likedToy.likes
      })
    }.then( res => res.json() )
        .then( resJson => {
          console.log(resJson);
          const toyDivs = document.getElementsByClassName('card');
          const likedToyDiv = toyDivs[toyId - 1];
          likedToyDiv.querySelector('p').innerText = resJson.likes;
  })
}
