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

const divCollect = document.querySelector("#toy-collection");

function getToys(){
  return fetch("http://localhost:3000/toys")
    .then(function(response) {
      return response.json()
  })
}

function postToy(toy_info) {
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      "Content-Type": "applicaton/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": toy_info.name.value,
      "image": toy_info.image.valu,
      "likes": 0 
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(toy_object) {
    displayToys(toy_object);
  })
}

function displayToys(toy) {
  let h2 = document.createElement("h2");
  h2.innerText = toy.name 

  let img = document.createElement("img");
  img.setAttribute("src", toy.image);
  img.setAttribute("class", 'toy-avatar');

  let p = document.createElement("p");
  p.innerText = `${toy.likes} likes`;

  let btn = document.createElement("button");
  btn.setAttribute("class", 'like-btn');
  btn.setAttribute("id", toy.id);
  btn.innerText = "like"
  btn.addEventListener("click", function(e) {
    console.log(e.target.dataset);
    likes(e);
  })

  let divCard = document.createElement("div");
  divCard.setAttribute("class", "card");
  divCard.append(h2, img, p, btn);
  divCollect.append(divCard);
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

getToys().then(function(toys) {
  toys.forEach(function(toy) {
    displayToys(toy);
  })
})