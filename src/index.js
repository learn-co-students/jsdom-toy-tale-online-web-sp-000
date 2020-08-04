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

  // BEGINNING OF MY CODE

  function fetchAllToys() {
    // Fetches all toys from db, calls createCard() and addCardToContainer() to display on page.
    const toyIndex = "http://localhost:3000/toys"
    fetch(toyIndex)
      .then(function(res) {
        return res.json()
      })
      .then(function(obj) {
        obj.forEach(toy => {
          addCardToContainer(createCard(toy))
        });
      });
  }

  function createCard(toy) {
    // Creates a card and fills with toy's info (MESSY BUT WORKS FINE)
    let toyCard = document.createElement("div")
    toyCard.className = "card"

    let name = document.createElement("h2")
    name.textContent = toy.name
    toyCard.appendChild(name)

    let image = document.createElement("img")
    image.src = toy.image
    image.className = "toy-avatar"
    toyCard.appendChild(image)

    let likes = document.createElement("p")
    likes.textContent = `${toy.likes} Likes`
    toyCard.appendChild(likes)

    let button = document.createElement("button")
    button.className = "like-btn"
    button.textContent = "Like <3"
    toyCard.appendChild(button)

    return toyCard
  }

  function addCardToContainer(card) {
    const toyCollection = document.querySelector("div#toy-collection")
    toyCollection.appendChild(card)
  }

  fetchAllToys() // Completed "Fetch Andy's Toys" and "Add Toy Info to the Card" !!!

// Add a New Toy functions below: 

function addNewToy(name, imgUrl) {
  // fetch request requires two args: the url and the object with method, headers, and request data
  // set const for each arg required
  const toyIndex = "http://localhost:3000/toys"
  const characterObj = {"name": name, "image": imgUrl, "likes": 0}
  const objData = {
    "method": "POST",
    "header": {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    "body": JSON.stringify(characterObj)
    }
    return fetch(toyIndex, objData)
    .then(function(res) {
      return res.json()
    })
    .then(function(json) {
      return json
    })
}

const createNewToyBtn = document.querySelector("form.add-toy-form").querySelector("input.submit")

createNewToyBtn.addEventListener("click", function(e) {
  let toyNameInput = document.querySelector("form.add-toy-form").querySelector("input").value
  let toyImageInput = document.querySelector("form.add-toy-form").querySelector("br").nextElementSibling.value
  if (toyNameInput && toyImageInput) {
    addNewToy(toyNameInput, toyImageInput)
  }
})
});
