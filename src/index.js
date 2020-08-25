let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const addToyForm = document.querySelector(".add-toy-form");
  const toyFormContainer = document.querySelector(".container");
  const toyCollectionDiv = document.querySelector("#toy-collection");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  addToyForm.addEventListener("submit", () => {
    let formData = {
      name: addToyForm.elements[0].value,
      image: addToyForm.elements[1].value,
      likes: 0
    };
    let configurationObject = {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json"},
      body: JSON.stringify(formData)
    };
    fetch("http://localhost:3000/toys", configurationObject);
  })
  fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json()
    })
    .then(function(toys) {
      for (const toy of toys) {
        const div = document.createElement('div')
        div.classList.add("card")
        toyCollectionDiv.appendChild(div)
        const h2 = document.createElement('h2')
        h2.textContent = toy.name
        div.appendChild(h2)
        const img = document.createElement('img')
        img.src = toy.image
        img.classList.add("toy-avatar")
        div.appendChild(img)
        const p = document.createElement('p')
        p.textContent = toy.likes + " Likes";
        div.appendChild(p)
        const button = document.createElement("button")
        button.classList.add("like-btn")
        button.textContent = "Like <3"
        div.appendChild(button)
        button.addEventListener("click", function () {
          let configurationObject = {
            method: "PATCH",
            headers: { "Content-Type": "application/json", "Accept": "application/json"},
            body: JSON.stringify({
              likes: toy.likes + 1
            })
          };
          fetch(`http://localhost:3000/toys/${toy.id}`, configurationObject)
          .then(function(response) {
            return response.json()
          })
          .then(function(json) {
            debugger
            p.textContent = json.likes + " Likes";
          });
    })
      }
    })
});
