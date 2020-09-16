let addToy = false;
const url = "http://localhost:3000/toys"
const container = document.getElementById("toy-collection")

document.addEventListener("DOMContentLoaded", () => {
  getToys();
  
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block"
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        addNewToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getToys() {
  fetch(url)
  .then(resp => resp.json())
  .then(toys => {
    toys.forEach(toy => {
      renderToys(toy)
    })
  })
}

function renderToys(toy) {
  let h2 = document.createElement("h2")
  h2.innerText = toy.name

  let img = document.createElement("img")
  img.setAttribute("src", toy.image)
  img.setAttribute("class", "toy-avatar")

  let p = document.createElement("p")
  p.innerText = `${toy.likes} Likes`

  let btn = document.createElement("button")
  btn.setAttribute("class", "like-btn")
  btn.setAttribute("id", toy.id)
  btn.innerText = "like" 
  //attach like listener
  btn.addEventListener('click', (event) => {
    console.log(event.target.id)
    likes(event)
  })

  let toyCardDiv = document.createElement('div')
  toyCardDiv.setAttribute("class", "card")
  toyCardDiv.append(h2, img, p, btn)
  container.appendChild(toyCardDiv);
}

function addNewToy(toy_data) {
  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "image": toy_data.image.value,
      "likes": 0

    })
  })
  .then(resp => resp.json())
  .then((obj_toy) => {
    console.log(obj_toy)
    let new_toy = renderToys(obj_toy)
    container.append(new_toy)
  })
}

function likes(event) {
  event.preventDefault()
  let newNumber = parseInt(event.target.previousElementSibling.innerText) + 1
  let id = event.target.id
  fetch(url +`/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "likes": newNumber
    })
  })
  .then(resp => resp.json())
  .then((like_obj => {
    event.target.previousElementSibling.innerText = `${newNumber} likes`
  }))
  .then
}