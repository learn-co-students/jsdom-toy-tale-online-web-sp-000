// const { response } = require("express");

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

  fetch("http://localhost:3000/toys")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    console.log(json);
    addToys(json);
  })

  function addToys(json) {
    let collection = document.getElementById('toy-collection')
    for (const toyObj of json) {
      div = document.createElement('div');
      div.setAttribute('class', 'card');
      addAttributes(toyObj);
      collection.appendChild(div);
    }
  }

  function addAttributes(toyObj) {
    let name = document.createElement('h2');
    name.textContent = toyObj.name;
    let image = document.createElement('img');
    image.src = toyObj.image;
    let likes = document.createElement('p');
    likes.textContent = `${toyObj.likes} likes`;
    let button = document.createElement('button');
    button.setAttribute('class', 'like-btn')
    button.textContent = 'Like <3'
    button.setAttribute('id', toyObj.id)
    button.addEventListener('click', function(event) {
      console.log(event.target.previousSibling.textContent.replace(' likes', ''));
      addLikes(event);
    });
    div.appendChild(name);
    div.appendChild(image);
    div.appendChild(likes);
    div.appendChild(button);
  }

  function addLikes(event) {
    event.preventDefault();
    let prevLikes = event.target.previousSibling.textContent.replace(' likes', '')
    let newLikes = (parseInt(prevLikes) + 1).toString();

    let likeData = {
      "likes": newLikes 
    }

    fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json", 
        "Accept": "application/json"
      },
      body: JSON.stringify(likeData)
    })
    .then(function(response) {
    return response.json();
    })
    .then(function(json) {
    event.target.previousSibling.textContent = `${newLikes} likes`;
    })
  }
    
  function submitData(toyData) {
    let formData = {
      "name": toyData.name, 
      "image": toyData.image,
      "likes": 0
    };

    let configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json', 
      },
      body: JSON.stringify(formData)
    };
    
    fetch("http://localhost:3000/toys", configObj) 
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      console.log(object);
    })
  }

  let form = document.getElementsByClassName('add-toy-form')[0]
  
  form.addEventListener("submit", function(event) {
    event.preventDefault();
    submitData(form);
  })



});
