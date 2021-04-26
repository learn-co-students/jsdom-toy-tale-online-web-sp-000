const addBtn = document.querySelector("#new-toy-btn")
const toyFormContainer = document.querySelector(".container")
let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector("#toy-collection")

  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then(toys => {
    let toysHTML = toys.map(function(toy){
      return `
      <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button data-id="${toy.id}" class="like-btn">Like <3</button>
      <button data-id="${toy.id}" class="delete-btn">Clean Up Time</button>
      </div>
      `
    })
    toyCollection.innerHTML =
    toysHTML.join(" ")
  })

  toyFormContainer.addEventListener("submit", function(e){
    e.preventDefault()

    // Grab the inputs from the form
    const toyName = e.target.name.value
    const toyImage = e.target.image.value

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 99
      })
    })
    .then(r => r.json())
    .then( newToy => {
     let newToyHTML = `
      <div class="card">
      <h2>${newToy.name}</h2>
      <img src=${newToy.image} class="toy-avatar" />
      <p>${newToy.likes} Likes </p>
      <button data-id="${newToy.id}" class="like-btn">Like <3</button>
      </div>
      `
      toyCollection.innerHTML += newToyHTML
    })
  })

  toyCollection.addEventListener("click", (e) => {
    console.log(e.target)
    if (e.target.className === "like-btn") {
       let currentLikes = parseInt(e.target.previousElementSibling.innerText)
       let newLikes = currentLikes + 1
       e.target.previousElementSibling.innerText = newLikes + " likes"

       fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
         method: "PATCH",
         headers: {
           "Content-Type": "application/json",
           "Accept": "application/json"
         },
         body: JSON.stringify({
           likes: newLikes
         })
       })
    }
    if (e.target.className === "delete-btn"){
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "DELETE"
      })
      .then(r => {
        e.target.parentElement.remove()
      })
    }
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy; //this is a toggle syntax
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
