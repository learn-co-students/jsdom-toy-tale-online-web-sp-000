
let toyUrl = "http://localhost:3000/toys"
let toyCollection = document.getElementById("toy-collection")
let addToy = false;

function getToys() {
  return fetch (toyUrl)
  .then(resp => resp.json())
}

function postToys(toy_data) {
  return fetch (toyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then((toy_obj) => {
    let new_toy = renderToys(toy_obj)
    toyCollection.appendChild(new_toy)
  })
}

function renderToy(toy) {
  let h2 = document.createElement("h2")
  h2.innerHTML = toy.name

  let img = document.createElement("img")
  img.setAttribute = ("src", toy.image)
  img.setAttribute = ("class", "toy-avatar")

  let p = document.createElement('p')
  p.innerHTML = toy.likes

  let button = document.createElement("button")
  button.setAttribute = ("class", "like-btn")

  let card = document.createElement("div")
  card.setAttribute = ("class", "card")
  card.append(h2, img, p, button)
  toyCollection.append(card)
}

  document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyForm = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyForm.style.display = "block";
        toyForm.addEventListener("submit", event => {
          event.preventDefault() 
          postToy(event.target)
        })
      } else {
        toyForm.style.display = "none";
      }
    });
  });


getToys().then(toys => {toys.forEach(toy => {renderToys(toy)})})
