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

// const submitButton = document.querySelector('input[name="submit"]')
// submitButton.addEventListener("click", postToy())

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
  var divCollect = document.querySelector('#toy-collection')
  const h2 = document.createElement('h2')
    h2.innerHTML = toy.name
  let img = document.createElement('img')
    img.src = toy.image
  let p = document.createElement('p')
    p.innerHTML = toy.likes
  let button = document.createElement('button')
  newDiv.classList.add = "card"
  button.classList.add("like-btn")
  img.class = "toy-avatar"
  newDiv.append(h2, img, p, button)
  divCollect.append(newDiv)
}

function postToy(toy, event) {
  event.preventDefault() //this makes it so that event can happen on submit WITHOUT page reloading
  fetch("http://localhost:3000/toys"), {
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
  likeCount = //likes object, incremented by 1
  fetch(`http://localhost:3000/toys/${toy.target.id}`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes:" likeCount
    })
  }
  .then(res => res.json())
  .then(likedObject => {
    ///likeCount?
  })
}