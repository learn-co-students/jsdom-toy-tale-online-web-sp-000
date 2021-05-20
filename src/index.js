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
});

window.onload = () => {
  fetchToyCards()
}

function fetchToyCards() {
  fetch("http://localhost:3000/toys")
    .then(resource => resource.json())
    .then(obj => {
      obj.forEach((toy) => {
        createToyCard(toy)
      })
    })
}

function createToyCard(toyObj) {
  let container = document.getElementById("toy-collection")
  let toyCard = document.createElement("div")
  toyCard.class = "card"
  let likeBtn = document.createElement("button")
  likeBtn.innerText = "Like <3"
  likeBtn.id = toyObj.id

  let name = document.createElement("h2")
  let img = document.createElement("img")
  let likes = document.createElement("p")

  name.innerText = toyObj.name
  img.src = toyObj.image
  likes.innerText = `${toyObj.likes} likes`

  toyCard.appendChild(name)
  toyCard.appendChild(img)
  toyCard.appendChild(likes)
  toyCard.appendChild(likeBtn)

  container.appendChild(toyCard)
}
setTimeout(() => {
  document.querySelectorAll("div#toy-collection button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      console.log('clicked')
      addLikes(button.id)
    })
  })
}, 3000)

function addLikes(id) {
  const currentLikes = parseInt(document.getElementById(id).previousSibling.innerText)
  const likeUpdate = {
    method: "PATCH",
    headers:
    {
      "content-type": "application/json",
      "accept": "application/json"
    },

    body: JSON.stringify({
      "likes": currentLikes + 1
    })
  }
  fetch(`http://localhost:3000/toys/${id}`, likeUpdate)
    .then(response => response.json())
    .then(toy => {
      document.querySelectorAll("div#toy-collection p")[1].innerText = `${toy.likes} likes`
    })
}

document.querySelector(".add-toy-form").addEventListener("submit", (e) => {
  e.preventDefault()
  const nameInput = document.querySelector("input[name='name']")
  const imgInput = document.querySelector("input[name='image']")
  const toyData = {
    name: nameInput.value,
    image: imgInput.value,
    likes: 0
  }
  const newToy = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept": "application/json"
    },
    body: JSON.stringify(toyData)
  }

  fetch("http://localhost:3000/toys", newToy)
    .then(response => response.json())
    .then(json => {

      newToy.name = json["name"]
      newToy.image = json["image"]
      newToy.likes = 0

      createToyCard(newToy)
      alert("Toy created")
      nameInput.value = ""
      imgInput.value = ""
    })
})