let addToy = false;

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  fetchToys()
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  })
})

function fetchToys() {
  fetch ("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => {
    json.forEach(toy => {
      renderToys(toy)
    })
  })
}

function renderToys(toy) {
    const card = document.createElement("div")
    const toyCollection = document.getElementById("toy-collection")
    
    const h2 = document.createElement("h2")
    h2.innerHTML = toy.name

    const img = document.createElement("img")
    img.setAttribute = ("src", toy.image)
    img.setAttribute = ("class", "toy-avatar")

    const p = document.createElement('p')
    p.innerHTML = toy.likes

    let button = document.createElement("button")
    button.setAttribute = ("class", "like-btn")
    button.innerText = "like"
    button.addEventListener("click", event => {
      likes(toy, event)
    })

    card.setAttribute = ("class", "card")
    card.append(h2, img, p, button)
    toyCollection.append(card)      
 }


// ------------------------------
function postToys(toy, event) {
  event.preventDefault()
  return   fetch ("http://localhost:3000/toys"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": 0
    })
  }
  .then(res => res.json())
  .then((toy_obj) => {
    const newToy = renderToys(toy_obj)
    toyCollection.append
  })
  const submitButton = document.querySelector('input[name="submit"]')
  submitButton.addEventListener("click", postToys())
}

function likes(toy, event) {
  event.preventDefault()
  const likeCount = parseInt(event.target.previousSibling.innerHTML, 10) + 1
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likeCount
    })
  })
  .then(resp => resp.json())
  .then(likedToy => {
    event.target.previousSibling.innerHTML = likedToy.likes
  })
}