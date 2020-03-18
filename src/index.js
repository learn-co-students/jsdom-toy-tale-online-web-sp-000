let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
  });
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => {
    json.forEach(toy => {
      addToys(toy)
    })
  })
}

function addToys(toy) {
  const newDiv = document.createElement('div')
  const divCollect = document.querySelector('#toy-collection')
  const h2 = document.createElement('h2')
    h2.innerHTML = toy.name
  let img = document.createElement('img')
    img.src = toy.image
  let p = document.createElement('p')
    p.innerHTML = toy.likes
  let button = document.createElement('button')
  newDiv.classList.add = "card"
  button.classList.add("like-btn")
  button.innerText = "like"
  button.addEventListener('click', event => {
    likes(toy, event)
  })
  img.class = "toy-avatar"
  newDiv.append(h2, img, p, button)
  divCollect.append(newDiv)
}

function postToy(toy, event) {
  event.preventDefault() //this makes it so that event can happen on submit WITHOUT page reloading
  fetch("http://localhost:3000/toys/:id"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes" : 0
    })
  }
  .then(res => res.json())
  .then((toy_object) => {
    const newToy = addToys(toy_object)
    divCollect.append
  })
  const submitButton = document.querySelector('input[name="submit"]')
  submitButton.addEventListener("click", postToy())
}

function likes(toy, event) {
  event.preventDefault()
  const likeCount = parseInt(event.target.previousSibling.innerHTML, 10) + 1 //likes object, incremented by 1
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
  .then(res => res.json())
  .then(likedObject => {
    console.log(likedObject)
    event.target.previousSibling.innerHTML = likedObject.likes
  })
}