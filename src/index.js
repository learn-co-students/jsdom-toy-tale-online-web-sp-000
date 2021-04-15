let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  fetchAndAddToys();

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

function fetchAndAddToys() {
  fetch("http://localhost:3000/toys")
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      json.forEach((element) => createNewToyDiv(element));
    });
}

function createNewToyDiv(element) {
  console.log(element);
  const toyCollection = document.querySelector("#toy-collection");
  const div = document.createElement("div");
  div.classList.add("card");
  div.setAttribute("id", element.id);
  addToyInfo(div, element);
  toyCollection.appendChild(div);
  // console.log(div);
}

function addToyInfo(div, element) {
  const h2 = document.createElement("h2");
  h2.innerHTML = element.name;
  div.appendChild(h2);

  const img = document.createElement("IMG");
  img.classList.add("toy-avatar");
  img.src = element.image;
  div.appendChild(img);

  const likesTag = displayLikes(div, element);

  const likeButton = document.createElement("button");
  likeButton.onclick = function () {
    incrementLikes(element, likesTag);
  };
  likeButton.classList.add("like-btn");
  likeButton.innerHTML = "Like <3";
  div.appendChild(likeButton);
}

function displayLikes(div, element) {
  const pTag = document.createElement("p");
  pTag.innerHTML = `${element.likes} Likes`;
  div.appendChild(pTag);
  return pTag;
}

const form = document.querySelector(".add-toy-form");

form.addEventListener("submit", createNewToy);

function createNewToy(event) {
  event.preventDefault();
  const toyName = form.querySelector("#add-toy-form-toy-name");
  const imageUrl = form.querySelector("#add-toy-form-toy-image-url");

  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: toyName.value,
      image: imageUrl.value,
      likes: 0,
    }),
  };

  fetch("http://localhost:3000/toys", configObj)
    .then(function (res) {
      return res.json();
    })
    .then(function (object) {
      createNewToyDiv(object);
    });
}

function incrementLikes(dbElement, likesTag) {
  const updateObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: dbElement.likes + 1,
      id: dbElement.id,
    }),
  };

  fetch(`http://localhost:3000/toys/${dbElement.id}`, updateObj)
    .then(function (res) {
      return res.json();
    })
    .then(function (object) {
      dbElement.likes = object.likes;
      likesTag.innerHTML = `${object.likes} Likes`;
    });
}
