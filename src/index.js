let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById("toy-collection");
  const toyForm = document.querySelector(".add-toy-form");
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault();
        postToy(event.target.name.value, event.target.image.value);
        toyForm.reset();
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
 

  function fetchToys() {
    return fetch('http://localhost:3000/toys')
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      makeToys(json);
    });
  }

  function makeToys(toys) {
    for (const toy of toys) {
      const div = document.createElement("div");
      div.setAttribute("class", "card");
      toyCollection.appendChild(div);

      const h2 = document.createElement("h2");
      h2.innerText = toy.name;
      const img = document.createElement("img");
      img.setAttribute("src", toy.image);
      img.setAttribute("alt", "picture of toy");
      img.setAttribute("class", "toy-avatar");
      const p = document.createElement("p");
      p.innerText = `${toy.likes} Likes `;
      const button = document.createElement("button");
      button.setAttribute("class", "like-btn");
      button.innerText = "Like <3";

      button.addEventListener('click', event => {
        toy.likes++
        p.innerText = `${toy.likes} Likes `;
        patchLikes(toy.likes, toy.id);
      })

      div.append(h2, img, p, button);
    }
  }
  
  function patchLikes(numLikes, id){
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        likes: numLikes
      })
    })
  }

  function postToy(name, image) {
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        name: name,
        image: image,
        likes: 0
      })
    })
    .then(function(response) {
      return response.json()
    })
    .then(function(object) {
      const arr = [];
      arr.push(object);
      //to prevent an iteration error
      makeToys(arr);
    })
  }

  fetchToys();


});
