const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

document.addEventListener("DOMContentLoaded", fillToyCollection());

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
});

document.querySelector("form.add-toy-form").addEventListener('submit', function(form){
  form.preventDefault();
  let toyName = document.querySelectorAll("form.add-toy-form input")[0].value;
  let imageUrl = document.querySelectorAll("form.add-toy-form input")[1].value;
  submitData(toyName, imageUrl)
});

function createAllCards(allToysObj){
  for(const toy of allToysObj){
    createCard(toy);
  }
}

function createCard(toy){
  const toyContainer = document.getElementById('toy-collection')

  let Card = document.createElement('div');
  Card.className = 'card';
  Card.appendChild(createElementWithInnerHTML('h2', toy.name));

  Card.appendChild(createImageElementWithSource(toy.image));

  Card.appendChild(createElementWithInnerHTML('p', toy.likes));

  Card.appendChild(createLikeButton(toy.id, toy.likes))

  toyContainer.appendChild(Card);
}

function createElementWithInnerHTML(elementType, innerHTML){
  let element = document.createElement(elementType);
  element.innerHTML = innerHTML;
  return element;
}

function createImageElementWithSource(imageSrc){
  let image = document.createElement('img');
  image.src = imageSrc;
  image.className = 'toy-avatar';
  return image;
}

function createLikeButton(toyId, likes){
  let button = document.createElement('button');
  button.class = 'like-btn';
  button.innerHTML = 'Like <3';
  button.addEventListener('click', function(event){
    updateLikes(toyId, likes)
  });
  return button;
}

function fillToyCollection(){
  fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json()
  })
  .then(function(object){
    createAllCards(object)
  })
  .catch(function(error){
    console.log(error.message)
  });
}

function updateLikes(toyId, likes){

  let formData = {
    'likes': (likes + 1)
  }

  let config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  }

  fetch(`http://localhost:3000/toys/${toyId}`, config)
  .then(function(response){
    return response.json();
  })
  .then(function(object){
    console.log(object);
  })
}

function submitData(toyName, imageUrl){

  let formData = {
    'name': toyName,
    'image': imageUrl,
    'likes': 0
  }

  let config = {
    method: "POST",
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  }

  fetch('http://localhost:3000/toys', config)
  .then(function(response){
    return response.json();
  })
  .then(function(object){
    createCard(object);
  })
  .catch(function(error){
    console.log(error.message)
  });
}
// OR HERE!
