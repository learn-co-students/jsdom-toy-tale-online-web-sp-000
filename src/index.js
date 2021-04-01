let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector("#toy-collection")

  fetch("http://localhost:3000/toys")
  .then(r =>  r.json())
  .then(toys => {
    let toyCard = toys.map(function(toy) {
      return  `
      <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button data-id="${toy.id}" class="like-btn">Like <3</button>
    </div>
  `
    })
    toyCollection.innerHTML = toyCard.join('')
  })

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  toyFormContainer.addEventListener("submit", function(e){
    e.preventDefault()
    const toyName = e.target.name.value
    const toyImage = e.target.image.value

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers:  {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify( {
        name: toyName,
        image: toyImage,
        likes: 0
      })
    })
    .then(r => r.json())
    .then(newToy => {
      let newToyHTML = `
      <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes} Likes </p>
        <button data-id="${newToy.id}" class="like-btn">Like <3</button>
    </div>
  `
      toyCollection.innerHTML += newToyHTML
      e.target.reset
    })
  });

  toyCollection.addEventListener("click", (e) => {
    if (e.target.className === "like-btn") {
      let currentLike = parseInt(e.target.previousElementSibling.innerText)
      let newLike = currentLike + 1 
      e.target.previousElementSibling.innerText = newLike +  "Likes"

      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": newLike
            })
      })
    } 

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
