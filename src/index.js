const maybePluralize = (count, noun, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;
  
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

  loadToys();
  const submitBtn = document.getElementsByClassName('submit')[0];
  submitBtn.addEventListener('click', submitToy);



});

function loadToys() {
  const toyData = "http://localhost:3000/toys";
  fetch(toyData)
  .then(resp => resp.json())
  .then(json => renderCards(json));
}

function renderCards(json) {
  json.forEach(obj => {
    renderCard(obj)
  })
}

function renderCard(obj) {
  const toyCollection = document.getElementById('toy-collection'); 
  const card = document.createElement('div');
  const h2 = document.createElement('h2');
  const img = document.createElement('img');
  const p = document.createElement('p');
  const button = document.createElement('button');
  card.className = 'card';
  h2.innerText = obj.name; 
  img.className = 'toy-avatar'; 
  img.src = obj.image;
  p.innerText = maybePluralize(obj.likes, "Like");
  button.className = 'like-btn';
  button.innerText = 'Like';
  button.id = obj.id; 
  button.addEventListener('click', updateLikes)
  card.appendChild(h2);
  card.appendChild(img);
  card.appendChild(p);
  card.appendChild(button); 
  toyCollection.appendChild(card); 
}

function submitToy(event) {
  event.preventDefault();
  const name = document.querySelector('.add-toy-form').name.value;
  const image = document.querySelector('.add-toy-form').image.value;
  document.querySelector('.add-toy-form').name.value = '';
  document.querySelector('.add-toy-form').image.value = '';

  let formData = {
    name, 
    image,
    "likes": 0
  };

  let configObj = {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  return fetch("http://localhost:3000/toys", configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(obj) {
      renderCard(obj);
    })
    .catch(function(error) {
      alert(error.message); 
    });
}

function updateLikes(event) {
  const p = event.target.parentElement.querySelector('p');
  const likes = parseInt(p.innerText.split(" ")[0]) + 1; 
  p.innerText = maybePluralize(likes, "Like");

  let likeData = {
    likes
  };

  let configObj = {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(likeData)
  };

  return fetch(`http://localhost:3000/toys/${event.target.id}`, configObj)
    .then(function(response) {
      return response.json();
    })
    .catch(function(error) {
      alert(error.message); 
    });
}