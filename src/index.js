let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  grabToys() // Insert our function to execute before the DOM loads
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => { // Add another event listener to catch the user submitting their toy info
        event.preventDefault() // This function essentially prevents the page from loading again after the user clicks 'submit'
        createToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function addToys(toy) {
  const toyCollection = document.getElementById("toy-collection") // In our first section, we define all of our element in the toy card.
  const h2 = document.createElement("h2")
  const div = document.createElement("div")
  let img = document.createElement("img")
  let p = document.createElement("p")
  let button = document.createElement("button")

  h2.innerText = toy.name // In the 2nd section, we assign the different attributes of the 'toys' array to our previously defined elements.
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')
  p.innerText = toy.likes
  button.setAttribute('class', 'like-btn')
  button.innerText = "Like"
  div.setAttribute('class', 'card')

  button.addEventListener('click', event => { // We add in our even listener that catches when a user clicks the 'like' button
    likeToy(toy, event)
  })

  div.append(h2, img, p, button) // We then append these elements and their assigned values to our 'div' tag...
  toyCollection.append(div) //...then append that to our toy collection div.
} 

function grabToys() {
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(json => {
    json.forEach(toy => {
      addToys(toy)
    })
  })
}

function createToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = addToys(obj_toy)
      toyCollection.append(new_toy)
    })
}

function likeToy(toy, event){
  const likeToy = parseInt(event.target.previousSibling.innerHTML, 10) + 1
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likeToy
    })
  })
  .then(res => res.json())
  .then(likedObject => {
    event.target.previousSibling.innerHTML = likedObject.likes
  })
}
