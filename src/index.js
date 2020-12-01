let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.getElementById('toy-collection')
  const form = document.querySelector('form');
  
  function appendToy(newToy) {
    let toy = document.createElement('div')
    let name = `<h2>name: ${newToy.name} </h2>`
    let image = `<img src="${newToy.image}" class="toy-avatar"/>`
    let likes = `<p>likes: ${newToy.likes}</p>`
    let button = `<button class="like-btn">Like <3</button>`
    let id = `<p class="id" hidden>${newToy.id}</p>`
    toy.innerHTML = name + image + likes + button + id
    toyCollection.appendChild(toy)
    
    toy.querySelector('.like-btn').addEventListener('click', function() {
      let updatedLikes = parseInt(toy.querySelector('p').innerHTML.split(" ")[1]) + 1
      let id = parseInt(toy.querySelector('.id').innerText)
      toy.querySelector('p').innerHTML = `likes: ${updatedLikes}`

      let configObj = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": updatedLikes
        })
      }

      fetch(`http://localhost:3000/toys/${id}`, configObj)
      .then(function(response) {
        return response.json();
      })

    })
  }

  fetch('http://localhost:3000/toys')
  .then(function(response) {
    return response.json();
  })
  .then(function(toys) {    
    for (let i = 0; i < toys.length; i++) {
      appendToy(toys[i])
    }
  })

  form.addEventListener("submit", function(event) {
    event.preventDefault()

    let name = document.querySelector('input[name="name"]').value
    let image = document.querySelector('input[name="image"]').value
    
    let toyData = {
      name: name,
      image: image,
      likes: 0
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
        "Accept":  "application/JSON"
      },
      body: JSON.stringify(toyData)
    }

    fetch('http://localhost:3000/toys', configObj)
    .then(function(response) {
      return response.json();
    })
    .then(function(object) {
      appendToy(object)
    })
  })
  
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
