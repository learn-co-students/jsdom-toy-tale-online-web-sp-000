let addToy = false;

const allToys = "http://localhost:3000/toys"
const toyColl = document.querySelector("#toy-collection")

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  fetch(allToys, {method: "GET"})
    .then(function(response) {
      return response.json()
    })
    .then(toys => {
      toys.forEach((function(toy) {
        toyColl.innerHTML += `
                              <div class="card">
                              <h2>${toy.name}</h2>
                              <img src="${toy.image}" class="toy-avatar" />
                              <p>${toy.likes} Likes </p>
                              <button id="${toy.id}" class="like-btn">Like <3</button>
                            </div>
                            `
      }))
    })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      const toyForm = document.querySelector('.add-toy-form')
      toyForm.addEventListener('submit', function(e) {
        e.preventDefault()
        console.log("submitted form");

        const toyName = document.querySelector('#new-name')
        const toyImage = document.querySelector('#new-image')

        fetch( allToys, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },

          body: JSON.stringify({
            "name": toyName.value,
            "image": toyImage.value,
            "likes": 0
          })
        })
        .then( r => r.json())
        .then (newToy => {
          toyColl.innerHTML += `
                                <div class="card">
                                <h2>${newToy.name}</h2>
                                <img src="${newToy.image}" class="toy-avatar" />
                                <p>${newToy.likes} Likes </p>
                                <button id="${newToy.id}" class="like-btn">Like <3</button>
                                </div>
                              `
        })
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyColl.addEventListener("click", function(e) {
    let clickedToyId = e.target.id
    let pTag = e.target.previousElementSibling
    let likeNum = parseInt(pTag.innerText)
    pTag.innerText = `${likeNum + 1} Likes`

    fetch (`http://localhost:3000/toys/${clickedToyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": ++likeNum
      })
    })
  })

});


