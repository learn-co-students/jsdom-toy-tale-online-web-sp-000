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

function getToys() {
  fetch("http://localhost:3000/toys")
    .then(function (response) {
      return response.JSON;
    })
    .then((json) => {
      json.forEach((toy) => {
        getToys(toy);
      });
    });
}

function getToys(toy) {
  const createDv = document.createElement("div");

  const toyCollection = document.getElementById("toy-collection");

  const toyName = document.createElement("h2");
  h2.innerHTML = toy.name;

  const toyImg = document.createElement("img");
  toyImg.setAttribute("src", "toy.image");
  toyImg.setAttribute("class", "toy-avatar");

  const toyLikes = document.createElement("p");
  p.innerHTML = toy.likes;

  const toyBttn = document.createElement("button");
  toyBttn.setAttribute("class", "like-btn");
  button.innerText = "like";
  button.addEventListener("click", (event) => {
    likes(toy, event);
  });

  card.setAttribute = ("class", "card");
  card.append(h2, img, p, button);
  toyCollection.append(card);
}

function postToys(toy, event) {
  event.preventDefault();
  let data = { name: toy.name.value, image: toy.image.value, likes: 0 };
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  };

  return fetch("http://localhost:3000/toys", configObj)
    .then(function (resp) {
      return resp.JSON;
    })
    .then((toy_obj) => {
      const newToy = renderToys(toy_obj);
      toyCollection.append;
    });
  const submitButton = document.querySelector('input[name="submit"]');
  submitButton.addEventListener("click", postToys());
}

function likes(toy, event) {
  event.preventDefault();
  let patchData = {
    likes: 0,
  };
  let conObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(patchData),
  };
  const likeCount = parseInt(event.target.previousSibling.innerHTML, 10) + 1;
  fetch(`http://localhost:3000/toys/${toy.id}`, conObj)
    .then((resp) => resp.json())
    .then((likedToy) => {
      event.target.previousSibling.innerHTML = likedToy.likes;
    });
}
