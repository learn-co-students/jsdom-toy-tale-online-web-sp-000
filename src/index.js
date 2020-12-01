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

      toy.innerHTML = name + image + likes + button
      toyCollection.appendChild(toy)
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
