let addToy = false;
let toysDiv = document.querySelector("#toy-collection");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault();
        postToy(event.target);
        event.target.reset();
      });
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
});

function getToys() {
  return fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => {
      displayToys(toy);
    })
  });
}

function postToy(toyData) {
  let toyObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyData.name.value,
      image: toyData.image.value,
      likes: 0
    })
  };
  return fetch('http://localhost:3000/toys', toyObj)
    .then(response => response.json())
    .then((toy) => {
      displayToys(toy);
    });
}

function addLikes(event) {
  event.preventDefault();
  let updatedLikes = parseInt(event.target.previousElementSibling.innerText) + 1;
  
  return fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: updatedLikes
    })
  })
    .then(response => response.json())
    .then((likesObj => {
      event.target.previousElementSibling.innerText = `${likesObj.likes} likes`;
    }));
}

function displayToys(toy) {
  let h2 = document.createElement("h2");
  h2.innerText = toy.name;

  let img = document.createElement("img");
  img.setAttribute('src', toy.image);
  img.setAttribute('class', 'toy-avatar');

  let p = document.createElement("p");
  p.innerText = `${toy.likes} likes`;

  let btn = document.createElement("button");
  btn.setAttribute('class', 'like-btn');
  btn.setAttribute('id', toy.id);
  btn.innerText = 'Like';
  btn.addEventListener('click', event => {
    // console.log(event.target);
    // console.log(parseInt(event.target.previousElementSibling.innerText) + 1);
    addLikes(event);
  });

  let divCard = document.createElement("div");
  divCard.setAttribute("class", "card");
  divCard.append(h2, img, p, btn);
  toysDiv.append(divCard);
}


