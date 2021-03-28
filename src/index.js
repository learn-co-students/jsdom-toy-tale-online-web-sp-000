let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", event => {
        event.preventDefault()
        newToy(event.target)
        event.target.reset()
        toyFormContainer.style.display = "none";
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => toys.forEach(toy => fillToyData(toy)))
}

function fillToyData(toyData){
  const toyCollection = document.getElementById("toy-collection");
  let toyDiv = document.createElement("div");
  toyDiv.classList.add("card");

  let h2 = document.createElement("h2");
  h2.innerText = toyData.name;

  let img = document.createElement("img");
  img.classList.add("toy-avatar");
  img.src = toyData.image;

  let p = document.createElement("p");
  p.innerHTML = `${toyData.likes} Likes`;

  let button = document.createElement("button");
  button.classList.add("like-btn");
  button.setAttribute('id', toyData.id);
  button.innerText = "Like <3";
  button.addEventListener("click", (event) => {
    addLike(event);
  })
  toyDiv.append(h2, img, p, button);
  toyCollection.appendChild(toyDiv);
};

function newToy(toy){
  fetch("http://localhost:3000/toys", {
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
  })
  .then(res => res.json())
  .then(toy => toy.fillToyData(toy))
}

function addLike(event) {
  event.preventDefault();
  let like = parseInt(event.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: like
    })
  })
  .then(res => res.json())
  .then((like_obj => {
    event.target.previousElementSibling.innerText = `${like} Likes`;
  }))
}
