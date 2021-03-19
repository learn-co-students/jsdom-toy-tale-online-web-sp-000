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

  addToys();
  addFormSubmitEvent();
});

function addToys() {
  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(function(json){
    for (const toy of json) {
      addNewToy(toy);
    }
  });
}

function addNewToy(toyAttributes) {
    const toyCollectionDiv = document.getElementById('toy-collection');

    const newToyDiv = document.createElement('div');
    newToyDiv.className = 'card';
    newToyDiv.id = `toy_${toyAttributes.id}`;
    toyCollectionDiv.appendChild(newToyDiv);

    addToyAttributes(newToyDiv, toyAttributes);
}

function addToyAttributes(toyDiv, toyAttributes) {
  const h2 = document.createElement('h2');
  h2.innerText = toyAttributes.name;

  const img = document.createElement('img');
  img.setAttribute('src', toyAttributes.image);
  img.className = 'toy-avatar';

  const p = document.createElement('p');
  p.innerText = `${toyAttributes.likes} likes`;

  const button = document.createElement('button');
  button.className = 'like-btn';
  button.innerText = "Like <3";
  button.addEventListener('click', function() {
    incrementLikes(toyDiv);
  })

  toyDiv.append(h2, img, p, button);
}

function incrementLikes(toyDiv) {
  const toyId = toyDiv.id.replace("toy_", "");
  const likesP = toyDiv.getElementsByTagName('p')[0];
  const currentLikes = parseInt(likesP.innerText.replace(" likes", ""));
  
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
        likes: currentLikes + 1
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
    updateToyLikes(object, toyDiv);
  });
}

function updateToyLikes(toyAttributes, toyDiv) {
  const likesP = toyDiv.getElementsByTagName('p')[0];
  likesP.innerText = `${toyAttributes.likes} likes`;
}

function addFormSubmitEvent() {
  const form = document.getElementsByTagName('form')[0];
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementsByName('name')[0].value;
    const imageUrl = document.getElementsByName('image')[0].value;

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
         name: name,
         image: imageUrl,
         likes: 0
      })
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      addNewToy(object);
    });
  })
}