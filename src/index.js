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

  fetchToys();  

});



const toys = []

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => collectToys(json));
};

function collectToys(json) {
  for (const element of json) {
    toys.push(element)
  };
  renderToys(toys);
}

let toyCollection = document.getElementById('toy-collection')

function renderToys(json) {
  for (const element of json) {
    let toyDiv = document.createElement('div');
    toyDiv.classList.add("card");
    let toyName = document.createElement('h2');
    toyName.textContent = element.name;
    toyDiv.appendChild(toyName);
    let toyImage = document.createElement('img');
    toyImage.src = element.image;
    toyImage.classList.add("toy-avatar");
    toyDiv.appendChild(toyImage);
    let toyLikes = document.createElement('p');
    toyLikes.textContent = `${element.likes} likes`;
    toyDiv.appendChild(toyLikes);
    let button = document.createElement("button");
    button.innerHTML = "Like <3";
    button.classList.add("like-btn");
    button.setAttribute('id', element.id);
    button.addEventListener("click", (event) => {
      submitLike(event);
    });
    toyDiv.appendChild(button);
    toyCollection.appendChild(toyDiv);
  }
}

function submitLike(event) {
  let increase = parseInt(event.target.previousElementSibling.textContent) + 1

  return fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": increase
      })
  })
      .then(function(response) {
          return response.json();
        })
        .then(function(object) {
          event.target.previousElementSibling.textContent = `${object.likes} likes`;
        })
        .catch(function(error) {
          document.body.innerHTML += error.message;
      
      });
}

let form  = document.querySelector('.add-toy-form');

form.addEventListener('submit', event => {
  submitData(event.target)
})

function submitData(data) {
  return fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": data.name.value,
        "image": data.image.value,
        "likes": 0
      })
  })
      .then(function(response) {
          return response.json();
        })
        .then(function(object) {
          toys.push(object);
        })
        .catch(function(error) {
          document.body.innerHTML += error.message;
      
      });
}